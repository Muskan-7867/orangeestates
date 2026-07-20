//store types
export enum BlogStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived"
}

export type BlogStoreState = {
    title: string
    slug: string
    excerpt: string
    categoryId: string
    status: BlogStatus
    featured: boolean
    coverImage: string
    categories: string[]
    isSlugLocked: boolean
    content: string
    coverImageFile: File | null
    actions: BlogStoreActionState
}

export type BlogStoreActionState = {
    setTitle: (data: string) => void;
    setSlug: (data: string) => void;
    setExcerpt: (data: string) => void;
    setCategoryId: (data: string) => void;
    setStatus: (data: BlogStatus) => void;
    setFeatured: (data: boolean) => void;
    setCoverImage: (data: string) => void;
    setCategories: (data: string[]) => void;
    setIsSlugLocked: (data: boolean) => void;
    setContent: (data: string) => void
    setCoverImageFile: (data: File) => void
}

export type BlogCoverImageUpload = {
    imageId: string;
    name: string;
    url: string;
    thumbhash: string;
    blurDataUrl: string;
}

export type PostData = {
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    status: "draft" | "published" | "archived";
    featured: boolean;
    category: string;
    authorId: string;
    publishedAt: Date | null;
    updatedAt: Date;
}