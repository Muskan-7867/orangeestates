import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect personal information that you provide to us directly, such as your name, email address, phone number, and preferences when you register, request property details, book viewings, or communicate with our agents.",
    },
    {
      title: "2. How We Use Your Information",
      content:
        "Your data helps us personalize your property search experience, contact you regarding viewing schedules, send updates on listings that match your criteria, process transactions, and improve the overall functionality of Orange Estate.",
    },
    {
      title: "3. Cookies and Tracking Technologies",
      content:
        "We use cookies, web beacons, and similar tracking methods to store user preferences, analyze site traffic, and optimize performance. You can choose to disable cookies through your browser settings, though some site functions may become limited.",
    },
    {
      title: "4. Information Sharing and Disclosure",
      content:
        "Orange Estate does not sell or rent your personal information to third parties. We may share details with trusted financial institutions, legal advisors, or property developers strictly to facilitate transaction processes or comply with statutory requirements.",
    },
    {
      title: "5. Data Protection and Security",
      content:
        "We implement robust administrative, technical, and physical security measures designed to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission is 100% secure.",
    },
    {
      title: "6. Your Rights and Choices",
      content:
        "Depending on your location, you may have the right to access, update, correct, or request the deletion of your personal data. Please reach out to us using the contact details provided below to make a data request.",
    },
    {
      title: "7. Contact Our Data Officer",
      content:
        "For questions regarding our Privacy Policy or data handling practices, please contact us at: omegbazaarofficial@gmail.com or via telephone at 9501755756.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f5f7] py-16 md:py-28">
      {/* Premium Hero Banner */}
      <section
        className="relative w-full overflow-hidden  text-center "

      >



        <div className="relative z-10 w-full px-6">


          <h1
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Privacy Policy
          </h1>

          <p className="text-zinc-400 text-sm max-w-md mx-auto ">
            Last Updated: July 15, 2026. Please read this policy carefully to
            understand how we manage and safeguard your information.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className=" px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-zinc-600 text-base leading-relaxed mb-10 pb-8 border-b border-zinc-100">
            Welcome to Orange Estate. We are committed to protecting the privacy
            and confidentiality of our visitors, clients, and users. This
            Privacy Policy describes how we collect, store, use, and protect
            your personal information across our website and mobile platforms.
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
