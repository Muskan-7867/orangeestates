import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BlogStatus, type BlogStoreState } from '../types/blogState.types'



export const useBlogStore = create<BlogStoreState>()(
    persist(
        (set) => ({
            title: "",
            slug: "",
            excerpt: "",
            categoryId: "",
            status: BlogStatus.DRAFT,
            featured: false,
            coverImage: "",
            categories: [],
            isSlugLocked: false,
            content: "",
            coverImageFile: null,
            actions: {
                setTitle: (data) => set({ title: data }),
                setSlug: (data) => set({ slug: data }),
                setExcerpt: (data) => set({ excerpt: data }),
                setCategoryId: (data) => set({ categoryId: data }),
                setStatus: (data) => set({ status: data }),
                setFeatured: (data) => set({ featured: data }),
                setCoverImage: (data) => set({ coverImage: data }),
                setCategories: (data) => set({ categories: data }),
                setIsSlugLocked: (data) => set({ isSlugLocked: data }),
                setContent: (data) => set({ content: data }),
                setCoverImageFile: (data) => set({ coverImageFile: data }),
            }
        }),
        {
            name: 'blog-storage',
            partialize: (state) => ({
                title: state.title,
                slug: state.slug,
                excerpt: state.excerpt,
                categoryId: state.categoryId,
                status: state.status,
                featured: state.featured,
                coverImage: state.coverImage,
                categories: state.categories,
                isSlugLocked: state.isSlugLocked,
                content: state.content
            }),
        },


    )
)
