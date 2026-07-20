import { createServerFn } from '@tanstack/react-start'
import { db } from '#/db'
import { post, category, media, user } from '#/db/schema'
import { eq, desc } from 'drizzle-orm'
import { CategoryNameSchema, SavePostSchema } from '../schema/blog-schema'
import {
  CreateCategoryService,
  getCategoriesService,
  postBlogService,
  publishedBlogBySlug,
  updateBlog,
  uploadPostImageService
} from './blog.services.ts'
import { requireAdmin } from '../../../../middleware/auth.middleware.ts'
import { z } from 'zod'


export const getCategories = createServerFn({ method: 'GET' })
  .handler(async () => {
    const categories = await getCategoriesService();
    return categories
  })

export const CreateCategorySFN = createServerFn({ method: 'POST' })
  .validator(CategoryNameSchema)
  .middleware([requireAdmin])
  .handler(async ({ data: { name } }) => {
    const trimmed = name.trim()
    const newCategory = await CreateCategoryService({ name: trimmed })
    return newCategory
  })


export const getPost = createServerFn({ method: 'GET' })
  .validator((data: { id?: string; title?: string }) => data)
  .handler(async ({ data: { id, title } }) => {
    let foundPost = null
    if (id) {
      const found = await db
        .select()
        .from(post)
        .where(eq(post.id, id))
        .limit(1)
      foundPost = found[0] || null
    } else if (title) {
      const decodedTitle = decodeURIComponent(title)
      const found = await db
        .select()
        .from(post)
        .where(eq(post.title, decodedTitle))
        .limit(1)

      if (found.length > 0) {
        foundPost = found[0]
      } else {
        // Fallback: search by slug
        const foundSlug = await db
          .select()
          .from(post)
          .where(eq(post.slug, decodedTitle))
          .limit(1)
        foundPost = foundSlug[0] || null
      }
    }

    if (foundPost) {
      // Find linked cover image from media table
      const cover = foundPost.coverImage
        ? await db
            .select()
            .from(media)
            .where(eq(media.id, foundPost.coverImage))
            .limit(1)
        : []

      // Find linked category
      const cat = foundPost.category
        ? await db
            .select()
            .from(category)
            .where(eq(category.id, foundPost.category))
            .limit(1)
        : []

      // Find author name
      const authorUser = foundPost.authorId
        ? await db
            .select()
            .from(user)
            .where(eq(user.id, foundPost.authorId))
            .limit(1)
        : []

      return {
        ...foundPost,
        coverImage: cover[0]?.url || null,
        coverImageBlurUrl: cover[0]?.blurDataUrl || null,
        categoryName: cat[0]?.name || null,
        authorName: authorUser[0]?.name || 'Alexander Mercer',
      }
    }

    return null
  })

export const savePostSFN = createServerFn({ method: 'POST' })
  .validator(SavePostSchema)
  .middleware([requireAdmin])
  .handler(async ({ data, context }) => {

    let authorId = context.user.id

    if (!authorId) {
      throw new Error('Unauthorized: Author ID could not be determined')
    }

    let finalCategoryId = data.categoryId
    if (!finalCategoryId) {
      const existingCats = await db.select().from(category).limit(1)
      if (existingCats.length > 0) {
        finalCategoryId = existingCats[0].id
      } else {
        const [newCat] = await db.insert(category).values({ name: 'General' }).returning()
        finalCategoryId = newCat.id
      }
    }

    const postData = {
      title: data.title.trim(),
      slug: data.slug.trim(),
      excerpt: data.excerpt?.trim() || null,
      content: data.content,
      status: data.status,
      featured: data.featured,
      category: finalCategoryId,
      authorId: authorId,
      publishedAt: data.status === 'published' ? new Date() : null,
      updatedAt: new Date(),
    }

    if (data.id) {
      // Update
      const updatedBlog = updateBlog({ postData, id: data.id })

      return { success: true, post: updatedBlog }
    } else {
      // Insert
      let insertedImage: { id: string }
      try {
        insertedImage = await uploadPostImageService({
          imageId: data.imageId,
          name: data.name,
          url: data.url,
          thumbhash: data.thumbhash,
          blurDataUrl: data.blurDataUrl,
        })
      } catch (error) {
        throw new Error('Error while uploading image')
      }

      const insertedPost = await postBlogService({ postData, coverImageId: insertedImage.id })

      return { success: true, post: insertedPost }
    }
  })

export const getPublishedPosts = createServerFn({ method: 'GET' })
  .handler(async () => {
    const posts = await db
      .select({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        status: post.status,
        featured: post.featured,
        publishedAt: post.publishedAt,
        createdAt: post.createdAt,
        coverImageUrl: media.url,
        coverImageBlurUrl: media.blurDataUrl,
        coverImageThumbhash: media.thumbhash,
        coverImageId: media.imageId,
        categoryName: category.name,
      })
      .from(post)
      .leftJoin(media, eq(post.coverImage, media.id))
      .leftJoin(category, eq(post.category, category.id))
      .where(eq(post.status, 'published'))
      .orderBy(desc(post.publishedAt))

    return posts
  })

export const getPublishedPostBySlug = createServerFn({ method: 'GET' })
  .validator(z.string())
  .handler(async ({ data: slug }) => {
    const foundedBlog = await publishedBlogBySlug({ slug })
    return foundedBlog || null
  })
