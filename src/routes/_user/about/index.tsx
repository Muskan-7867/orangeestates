import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "#/features/about/components/AboutPage";

export const Route = createFileRoute("/_user/about/")({ component: About });

function About() {
  return (
    <>
      <AboutPage />
    </>
  );
}
