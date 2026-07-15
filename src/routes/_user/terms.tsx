import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/terms")({
  component: TermsPage,
});

function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing, browsing, or using the website of Orange Estate, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree to these terms, please discontinue use immediately.",
    },
    {
      title: "2. Accuracy of Listings and Descriptions",
      content:
        "While we strive to maintain accurate listing information, pricing, maps, and specifications, all materials are provided for informational purposes only. We advise all prospective clients to perform physical site visits and verify deeds independently before committing to transactions.",
    },
    {
      title: "3. User Accounts and Verification",
      content:
        "To access certain services or listings, you may be required to register. You agree to provide accurate, current, and complete details during registration. You are solely responsible for maintaining account confidentiality and security.",
    },
    {
      title: "4. Permitted Use and Restrictions",
      content:
        "You are granted a non-exclusive, non-transferable, revocable license to access our platform. You may not scrape, reverse engineer, spam, or copy property layouts and images for competing commercial ventures without written consent.",
    },
    {
      title: "5. Limitation of Liability",
      content:
        "Orange Estate and its agents, directors, or employees will not be held liable for any direct, indirect, incidental, or consequential damages resulting from transactions, errors in listings, or your inability to use this platform.",
    },
    {
      title: "6. Governing Law and Jurisdiction",
      content:
        "These Terms and Conditions are governed by the laws of Jalandhar, Punjab, India. Any disputes arising out of the use of our services or website will be subject to the exclusive jurisdiction of the competent courts of Jalandhar.",
    },
    {
      title: "7. Modifications to Terms",
      content:
        "We reserve the right to modify or replace these Terms and Conditions at any time. Changes become effective immediately upon posting. Your continued use of the website following changes denotes acceptance of the revised terms.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f7] py-16 md:py-28">
      {/* Premium Hero Banner */}
      <section
        className="relative w-full overflow-hidden text-center"
       
      >
       
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          

          <h1
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Terms & Conditions
          </h1>

          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Last Updated: July 15, 2026. Please read these terms carefully before
            using the website or scheduling viewings.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto  ">
          <p className="text-zinc-600 text-base leading-relaxed mb-10 pb-8 border-b border-zinc-100">
            Welcome to Orange Estate. These Terms and Conditions govern your
            relationship with Orange Estate, including the use of our website
            and communication platforms. By accessing our resources, you agree
            to comply with these rules.
          </p>

          <div className="space-y-10">
            {sections.map((sec) => (
              <div key={sec.title} className="space-y-3">
                <h2
                  className="text-xl font-bold text-zinc-900"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {sec.title}
                </h2>
                <p className="text-zinc-600 text-sm leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

      
        </div>
      </section>
    </main>
  );
}
