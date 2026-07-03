import { useEffect, useRef } from "react";
import BlurImage from "#/components/ui/BlurImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  Award, Home, MapPin, TrendingUp,
} from "lucide-react";
import AboutMission from "./AboutMission";
import Values from "./Values";
import Team from "./Team";
import AboutHero from "./AboutHero";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ─── DATA ──────────────────────────────────────────────────────────── */

const stats = [
  { value: 25, suffix: "+", label: "Years of Excellence" },
  { value: 4.2, prefix: "£", suffix: "B+", label: "Property Sold" },
  { value: 12000, suffix: "+", label: "Happy Clients" },
  { value: 40, suffix: "", label: "Offices Across UK" },
];

/* ─── COMPONENT ─────────────────────────────────────────────────────── */

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Hero Parallax ── */
      gsap.to(heroImgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* ── Hero text entrance ── */
      const heroChildren = heroTextRef.current?.children;
      if (heroChildren) {
        gsap.fromTo(
          Array.from(heroChildren),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.18,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }

      /* ── Stats counter ── */
      const statEls = statsRef.current?.querySelectorAll(".stat-number");
      statEls?.forEach((el, i) => {
        const target = stats[i];
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target.value,
              duration: 2,
              ease: "power2.out",
              onUpdate() {
                const v = obj.val;
                const formatted =
                  v >= 1000
                    ? `${(v / 1000).toFixed(1)}k`
                    : Number.isInteger(target.value)
                      ? Math.round(v).toString()
                      : v.toFixed(1);
                el.textContent =
                  (target.prefix ?? "") + formatted + target.suffix;
              },
            });
          },
        });
      });

      /* ── Mission fade in ── */
      gsap.fromTo(
        missionRef.current?.children ? Array.from(missionRef.current.children) : [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 75%",
          },
        }
      );

      /* ── Value cards ── */
      gsap.fromTo(
        valuesRef.current?.querySelectorAll(".value-card") ?? [],
        { y: 60, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 78%",
          },
        }
      );

      /* ── Timeline items ── */
      const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");
      timelineItems?.forEach((item) => {
        gsap.fromTo(
          item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 82%",
            },
          }
        );
      });

      /* ── Timeline line draw ── */
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 75%",
          },
        }
      );

      /* ── Team cards ── */
      gsap.fromTo(
        teamRef.current?.querySelectorAll(".team-card") ?? [],
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: teamRef.current,
            start: "top 78%",
          },
        }
      );

      /* ── CTA section ── */
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-bg overflow-hidden ">

      {/* ── HERO ───────────────────────────────────────────── */}
      <AboutHero heroRef={heroRef} heroImgRef={heroImgRef} heroTextRef={heroTextRef} />

      {/* ── STATS ──────────────────────────────────────────── */}
      <section ref={statsRef} className=" py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span
                className="stat-number font-serif text-4xl sm:text-5xl text-orange-400 tabular-nums"
              >
                {(s.prefix ?? "") + "0" + s.suffix}
              </span>
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-black">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <AboutMission missionRef={missionRef} />

      <Values valuesRef={valuesRef} />


      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 w-full mx-auto">
        <div ref={missionRef} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Right image */}
          <div className="relative">
            <BlurImage
              src="/about-team.jpg"
              alt="Our team"
              className="w-full h-105 object-cover rounded-sm shadow-xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#0B2A57] text-white px-6 py-4 shadow-xl">
              <p className="font-serif text-2xl text-orange-400">25+</p>
              <p className="text-xs uppercase tracking-widest text-white/70 mt-1">Years Experience</p>
            </div>
            {/* Award badge */}
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full shadow-xl">
              <Award size={22} />
            </div>
          </div>
          {/* Left text */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-orange-500 mb-5">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Where Vision Meets Property Expertise
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              At Orange Estate, we believe a home is more than a transaction — it is
              the foundation of a life story. Our mission is to connect discerning
              clients with extraordinary properties, guided by deep market knowledge,
              personal attention, and an uncompromising commitment to excellence.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From historic country houses to contemporary city penthouses, we navigate
              every nuance of the UK property landscape so you don't have to.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { icon: Home, label: "10k+ Properties Listed" },
                { icon: MapPin, label: "40 UK Locations" },
                { icon: TrendingUp, label: "97% Client Satisfaction" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm"
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      <Team teamRef={teamRef} />

      {/* ── CTA ────────────────────────────────────────────── */}
      <section ref={ctaRef} className="py-24 sm:py-32 px-6 text-center ">
        <p className="text-xs uppercase tracking-[0.35em] text-orange-500 mb-5">
          Start Your Journey
        </p>
        <h2 className="font-serif text-4xl  max-w-2xl mx-auto leading-tight mb-6">
          Find Your Perfect Property Today
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto text-base leading-relaxed mb-10">
          Whether you're buying, selling, or investing, our team of experts is
          ready to guide you every step of the way.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="bg-primary text-white px-10 py-4 text-sm tracking-wide transition-colors duration-300"
          >
            Contact Us
          </a>
          <a
            href="/products"
            className="border border-primary px-10 py-4 text-sm tracking-wide  transition-colors duration-300"
          >
            Browse Properties
          </a>
        </div>
      </section>
    </main>
  );
}
