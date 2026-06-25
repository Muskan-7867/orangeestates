import { createFileRoute } from "@tanstack/react-router";

import ContactPage from "#/features/contact/components/ContactPage";

export const Route = createFileRoute("/_user/contact")({ component: Contact });

function Contact() {
  return (
    <>
      <ContactPage />
    </>
  );
}
