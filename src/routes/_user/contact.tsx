import { createFileRoute } from "@tanstack/react-router";
import Navbar from "#/components/Navbar";
import StickyFooter from "#/components/ui/Footer";
import ContactPage from "#/features/contact/components/ContactPage";

export const Route = createFileRoute("/_user/contact")({ component: Contact });

function Contact() {
  return (
    <>
      {/* <Navbar /> */}
      <ContactPage />
      {/* <StickyFooter /> */}
    </>
  );
}
