import TermsPage from "#/features/terms/components/terms";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/terms/")({
  component: TermsPage,
});


