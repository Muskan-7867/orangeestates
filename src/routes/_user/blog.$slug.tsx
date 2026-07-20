import { createFileRoute } from "@tanstack/react-router";
import BlogDetailPage from "#/features/blog/components/BlogDetailPage";
import { getPublishedPostBySlug } from "#/features/admin/blog/server/blog.fn";
import { blogPosts, mapDbPostToBlogPost } from "#/features/blog/blog.utils";

export const Route = createFileRoute("/_user/blog/$slug")({
  loader: async ({ params }) => {
    const { slug } = params;

    // Check mock posts first
    const mockPost = blogPosts.find((p) => p.slug === slug);
    if (mockPost) {
      return { post: mockPost };
    }

    // Load from database by slug
    const dbPost = await getPublishedPostBySlug({ data: slug });
    if (!dbPost) {
      throw new Error("Post not found");
    }

    return { post: mapDbPostToBlogPost(dbPost) };
  },
  component: BlogDetail,
});

function BlogDetail() {
  const { post } = Route.useLoaderData();
  return <BlogDetailPage post={post} />;
}
