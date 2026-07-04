import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Logo from "../ui/Logo";
import Menubar from "./MenuBar";
import { useLocation } from "@tanstack/react-router";
import MobileBottomNav from "./MobileBottomNav";
import { FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Navbar({ open }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const navbarRef = useRef(null)
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)

  const pathname = location.pathname.replace(/\/$/, "") || "/"
  const hasDarkHero =
    pathname === "/" ||
    pathname === "/_user" ||
    pathname === "/_user/" ||
    pathname === "/about" ||
    pathname === "/_user/about" ||
    pathname === "/contact" ||
    pathname === "/_user/contact";

  useEffect(() => {
    if (!hasDarkHero) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      let threshold = 100;
      if (pathname === "/" || pathname === "/_user" || pathname === "/_user/") {
        threshold = window.innerHeight * 0.75; // past HeroBannerCarousel (h-[85vh])
      } else if (pathname.includes("/about")) {
        threshold = window.innerHeight * 0.6; // past AboutPage parallax hero (h-[70vh])
      } else if (pathname.includes("/contact")) {
        threshold = 300; // past contact page top section
      }
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, hasDarkHero]);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useGSAP(() => {
    let lastScroll = 0;

    const getThreshold = () => {
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      if (path === "/" || path === "/_user" || path === "/_user/") {
        return window.innerHeight * 1;
      } else if (path.includes("/about")) {
        return window.innerHeight * 0.6;
      } else if (path.includes("/contact")) {
        return 300;
      }
      return 100;
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",

      onUpdate(self) {
        const current = self.scroll();
        const threshold = getThreshold();

        // Ignore tiny movements
        if (Math.abs(current - lastScroll) < 50) return;

        if (current < threshold) {
          // Near the top / hero area: soft gradient so hero content shows through
          gsap.to(navbarRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,

          });
        } else if (current > lastScroll) {
          // Scrolling down past hero: solid white so logo is always visible
          gsap.to(navbarRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,

          });
        } else {
          // Scrolling up past hero: solid white so logo is always visible
          gsap.to(navbarRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        }

        lastScroll = current;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [pathname]);

  return (
    <>
      {/* ── Top bar ── */}
      <nav ref={navbarRef} className={`w-full flex  items-center justify-between fixed top-0 z-50 py-2 px-2 sm:px-34`}>



        <Logo src={isScrolled ? "/blackestate.png" : "/estate.png"} />

        {/* WhatsApp Icon Link for Mobile */}
        <a
          href="https://wa.me/919501755756?text=Hello!%20I%20am%20interested%20in%20Orange%20Estate%20properties%20and%20would%20like%20to%20get%20more%20information."
          target="_blank"
          rel="noopener noreferrer"
          className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow hover:bg-[#20ba5a] active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Contact on WhatsApp"
        >
          <FaWhatsapp className="h-5.5 w-5.5" />
        </a>

        <Menubar />


      </nav>

      {/* ── Floating Mobile Navigation Bar ── */}
      <MobileBottomNav />
    </>
  );
}

