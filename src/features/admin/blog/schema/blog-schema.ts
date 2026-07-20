import z from "zod"

export const CategoryNameSchema = z.object({
    name: z.string().min(1).max(20)
})

export const SavePostSchema = z.object({
    id: z.uuid().optional(),
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    excerpt: z.string().nonempty("Excerpt is required"),
    content: z.string().min(1, "Content is required"),
    imageId: z.string().min(1, "Content is required"),
    name: z.string().min(1, "Content is required"),
    url: z.string().min(1, "Content is required"),
    thumbhash: z.string().min(1, "Content is required"),
    blurDataUrl: z.string().min(1, "Content is required"),
    status: z.enum(["draft", "published", "archived"]),
    featured: z.boolean().default(false),
    categoryId: z.uuid(),
})


export const BlogEditorSearchSchema = z.object({
    id: z.uuid().optional(),
    title: z.string().optional(),
})

export const BlogSlug = z.object({
    slug: z.string().min(1).max(100)
})