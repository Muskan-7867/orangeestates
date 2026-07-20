import { queryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "./query-constants";
import { getCategories, getPublishedPosts, getPublishedPostBySlug } from "#/features/admin/blog/server/blog.fn";

export const getCategoriesQueryOption = () =>
    queryOptions({
        queryKey: QUERY_KEYS.GET_CATEGORIES,
        queryFn: () => getCategories(),
        staleTime: 300000,
        gcTime: 1000 * 60 * 10,
    });

export const getPublishedPostsQueryOption = () =>
    queryOptions({
        queryKey: QUERY_KEYS.GET_PUBLISHED_POSTS,
        queryFn: () => getPublishedPosts(),
        staleTime: 300000,
        gcTime: 1000 * 60 * 10,
    });

export const getPublishedPostBySlugQueryOption = (slug: string) =>
    queryOptions({
        queryKey: [...QUERY_KEYS.GET_PUBLISHED_POST_BY_SLUG, slug],
        queryFn: () => getPublishedPostBySlug({ data: slug }),
        staleTime: 300000,
        gcTime: 1000 * 60 * 10,
    });