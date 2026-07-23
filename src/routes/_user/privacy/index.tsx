import PrivacyPage from "#/features/privacy/components/Privacy";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/privacy/")({
  component: PrivacyPage,
});

