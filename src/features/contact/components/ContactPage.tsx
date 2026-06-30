import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,

} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const offices = [
  {
    city: "London",
    country: "England",
    address: "14 Berkeley Square, Mayfair, London W1J 6BS",
    phone: "+44 20 7946 0958",
    email: "london@orangeestate.co.uk",
    hours: "Mon – Fri: 9:00 – 18:00",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
  },
  {
    city: "Manchester",
    country: "England",
    address: "32 Deansgate, Manchester M3 4LY",
    phone: "+44 161 946 0321",
    email: "manchester@orangeestate.co.uk",
    hours: "Mon – Fri: 9:00 – 17:30",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    city: "Edinburgh",
    country: "Scotland",
    address: "18 Charlotte Square, Edinburgh EH2 4DF",
    phone: "+44 131 946 0512",
    email: "edinburgh@orangeestate.co.uk",
    hours: "Mon – Fri: 9:00 – 17:00",
    image: "https://images.unsplash.com/photo-1569681157374-92a0f9f7c30c?w=800&q=80",
  },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const officesRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main className="bg-white overflow-x-hidden ">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "580px" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/contact-hero.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/20 to-primary/10" />
  

        {/* Content */}
        <div ref={heroRef} className="relative z-10 max-w-7xl  w-full px-6 sm:px-12 lg:px-20 pt-32 pb-20">
          
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
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-20 w-full mx-auto">
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name row */}
                <div className="form-field grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Eleanor"
                      className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-widest text-gray-400">
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Whitfield"
                      className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="eleanor@example.com"
                    className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                  />
                </div>

                {/* Phone */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+44 7700 000000"
                    className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300"
                  />
                </div>

                {/* Interest */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    I'm interested in…
                  </label>
                  <select
                    className="border border-gray-200 px-4 py-3 text-sm text-gray-500 focus:outline-none focus:border-primary transition-colors bg-white appearance-none"
                  >
                    <option>Buying a property</option>
                    <option>Selling a property</option>
                    <option>Renting / Lettings</option>
                    <option>Property valuation</option>
                    <option>General enquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="form-field flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-widest text-gray-400">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us how we can help…"
                    className="border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors placeholder-gray-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="form-field pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-white px-10 py-4 text-sm tracking-wide hover:bg-primary-dark transition-colors duration-300 disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    {loading ? "Sending…" : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Info panel ── */}
          <div className="flex flex-col gap-8">
            {/* Map embed placeholder */}
            <div className="w-full h-64 sm:h-72 bg-orange-50 relative overflow-hidden rounded-sm">
              <iframe
                title="Orange Estate London Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0!2d-0.1462!3d51.5117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760534e6796e25%3A0x3c1b4aa91fbb53d8!2sBerkeley%20Square%2C%20Mayfair%2C%20London!5e0!3m2!1sen!2suk!4v1718000000000!5m2!1sen!2suk"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Quick contact info */}
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Head Office", value: "14 Berkeley Square, Mayfair, London W1J 6BS" },
                { icon: Phone, label: "Phone", value: "+44 20 7946 0958" },
                { icon: Mail, label: "Email", value: "hello@orangeestate.co.uk" },
                { icon: Clock, label: "Hours", value: "Monday – Friday, 9:00 – 18:00" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-primary mt-0.5">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
                    <p className="text-sm text-gray-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebook, href: "#" },
                  { icon: FaInstagram, href: "#" },
                  { icon: FaTwitter, href: "#" },
                  { icon: FaLinkedin, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex items-center justify-center w-9 h-9 border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICES ──────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-6 sm:px-12 lg:px-20 bg-[#f9f6f2]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-primary mb-3">Our Offices</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0B2A57]">
                Find Us Across the UK
              </h2>
              <p className="text-sm text-gray-500 max-w-sm sm:text-right leading-relaxed">
                Visit any of our three offices or get in touch with your nearest team directly.
              </p>
            </div>
            <div className="mt-5 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
          </div>

          {/* Office cards */}
          <div ref={officesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, idx) => (
              <div
                key={office.city}
                className="office-card group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500"
              >
                {/* City image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={office.image}
                    alt={`${office.city} skyline`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A57]/80 via-[#0B2A57]/20 to-transparent" />
                  {/* City label */}
                  <div className="absolute bottom-4 left-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary/90 mb-0.5">{office.country}</p>
                    <h3 className="font-serif text-2xl text-white">{office.city}</h3>
                  </div>
                  {/* Office number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <ul className="space-y-3.5 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <MapPin size={14} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{office.address}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone size={14} className="text-primary flex-shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">
                        {office.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail size={14} className="text-primary flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors break-all">
                        {office.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock size={14} className="text-primary flex-shrink-0" />
                      <span>{office.hours}</span>
                    </li>
                  </ul>

                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:gap-3 transition-all duration-300 font-medium"
                    >
                      <MapPin size={12} />
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

       
        </div>
      </section>

    </main>
  );
}
