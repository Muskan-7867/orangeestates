import { db } from "#/db"
import { category, media, post } from "#/db/schema"
import { eq } from "drizzle-orm"
import type { BlogCoverImageUpload, PostData } from "../types/blogState.types"


export const CreateCategoryService = async ({ name }: { name: string }) => {
    const existing = await db
        .select()
        .from(category)
        .where(eq(category.name, name))
        .limit(1)

    if (existing.length > 0) {
        throw new Error("Category already exists")
    }

    const [inserted] = await db
        .insert(category)
        .values({ name })
        .returning()

    return inserted
}


export const getCategoriesService = async () => {
    return await db.select().from(category)
}


export const uploadPostImageService = async ({
    imageId,
    name,
    url,
    thumbhash,
    blurDataUrl,
}: BlogCoverImageUpload): Promise<{ id: string }> => {

    const [data] = await db.insert(media).values({
        imageId,
        name,
        url,
        thumbhash,
        blurDataUrl,
    }).returning();

    return { id: data.id };
};

export const postBlogService = async ({
    postData,
    coverImageId
}: {
    postData: PostData
    coverImageId: string
}) => {
    const [insertedPost] = await db
        .insert(post)
        .values({
            ...postData,
            coverImage: coverImageId,
            createdAt: new Date(),
        })
        .returning()

    return insertedPost
}


export const updateBlog = async ({
    postData,
    id
}: {
    postData: PostData,
    id: string
}) => {
    const [updated] = await db
        .update(post)
        .set(postData)
        .where(eq(post.id, id))
        .returning();
    return updated
}


export const publishedBlogBySlug = async ({
    slug,

}: {
    slug: string,

}) => {
    const [foundedBlog] = await db
        .select({
            id: post.id,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            status: post.status,
            featured: post.featured,
            publishedAt: post.publishedAt,
            createdAt: post.createdAt,
            coverImageUrl: media.url,
            coverImageThumbHash: media.thumbhash,
            coverImageBlurDataUrl: media.blurDataUrl,
            coverImageId: media.imageId,
            categoryName: category.name,
        })
        .from(post)
        .leftJoin(media, eq(post.coverImage, media.id))
        .leftJoin(category, eq(post.category, category.id))
        .where(eq(post.slug, slug))
        .limit(1)

    return foundedBlog

}