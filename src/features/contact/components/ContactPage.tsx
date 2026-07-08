import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {

  CheckCircle,

} from "lucide-react";
import OurOffices from "./OurOffices";
import ContactRight from "./ContactRight";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

const HERO_BLUR_URL = "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=20&q=10";


export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance */
      gsap.fromTo(
        heroRef.current?.children ? Array.from(heroRef.current.children) : [],
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      /* Form fields */
      gsap.fromTo(
        formRef.current?.querySelectorAll(".form-field") ?? [],
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 78%" },
        }
      );

      /* Office cards */
      gsap.fromTo(
        officesRef.current?.querySelectorAll(".office-card") ?? [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: officesRef.current, start: "top 80%" },
        }
      );
    });

    return () => ctx.revert();
  }, []);



  return (
    <main className="bg-bg overflow-x-hidden ">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden px-4 sm:px-16 "
        style={{ minHeight: "580px" }}
      >
        {/* Background image with blur placeholder */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${HERO_BLUR_URL})`,
              filter: "blur(12px)",
              transform: "scale(1.1)",
            }}
          />
          <img
            src="/contact-hero.jpg"
            alt="Contact hero background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/30 via-primary/20 to-primary/10" />


        {/* Content */}
        <div ref={heroRef} className="relative z-10 max-w-7xl  w-full px-4 sm:px-12 lg:px-20 pt-32 pb-20">

          <h1 className="font-serif text-4xl   text-white leading-tight mb-6">
            We'd Love to<br />Hear From You
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed">
            Whether you're searching for your dream home, listing a property,
            or simply exploring your options — our team is here to help.
          </p>

        </div>
      </section>

      {/* ── FORM + MAP GRID ──────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-12 lg:px-34">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* ── Contact Form ── */}
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#0B2A57] mb-2">
              Send Us a Message
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              Fill in the form and we'll get back to you within one business day.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <CheckCircle className="text-primary w-14 h-14" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl text-[#0B2A57]">Message Sent!</h3>
                <p className="text-gray-500 max-w-sm">
                  Thank you for reaching out. A member of our team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-sm text-primary underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <ContactForm formRef={formRef} setSubmitted={setSubmitted} />
            )}
          </div>

          {/* ── Info panel ── */}
          <ContactRight />

        </div>
      </section>

      {/* ── OFFICES ──────────────────────────────────────── */}
      <OurOffices officesRef={officesRef} />

    </main>
  );
}
