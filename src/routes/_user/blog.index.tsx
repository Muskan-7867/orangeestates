import { createFileRoute } from "@tanstack/react-router";
import BlogPage from "#/features/blog/components/BlogPage";
import { getPublishedPosts, getCategories } from "#/features/admin/blog/server/blog.fn";

export const Route = createFileRoute("/_user/blog/")({
  loader: async () => {
    const [posts, categories] = await Promise.all([
      getPublishedPosts(),
      getCategories()
    ]);
    return { posts, categories };
  },
  component: Blog,
});

function Blog() {
  const { posts, categories } = Route.useLoaderData();
  return <BlogPage initialPosts={posts} initialCategories={categories} />;
}
