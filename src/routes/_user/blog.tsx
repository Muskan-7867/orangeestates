import { createFileRoute } from "@tanstack/react-router";
import BlogPage from "#/features/blog/components/BlogPage";

export const Route = createFileRoute("/_user/blog")({
  component: Blog,
});

function Blog() {
  return <BlogPage />;
}
