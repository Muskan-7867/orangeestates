import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Logo from "../ui/Logo";
import Menubar from "./MenuBar";
import { useLocation } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger, useGSAP)


export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Blog", href: "/blog" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];



export default function Navbar({ setOpen, open }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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

  // useGSAP(() => {
  //   let lastScroll = 0;

  //   const trigger = ScrollTrigger.create({
  //     start: 0,
  //     end: "max",

  //     onUpdate(self) {
  //       const current = self.scroll();

  //       // Ignore tiny movements
  //       if (Math.abs(current - lastScroll) < 10) return;

  //       if (current > lastScroll && current > 1200) {
  //         // Scrolling down
  //         gsap.to(navbarRef.current, {
  //           y: -100,
  //           duration: 0.35,
  //           ease: "power2.out",
  //           overwrite: true,
  //         });
  //       } else {
  //         // Scrolling up
  //         gsap.to(navbarRef.current, {
  //           y: 0,
  //           duration: 0.35,
  //           ease: "power2.out",
  //           overwrite: true,
  //         });
  //       }

  //       lastScroll = current;
  //     },
  //   });

  //   return () => {
  //     trigger.kill();
  //   };
  // }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <nav ref={navbarRef} className={` w-full flex  items-center justify-between fixed top-6 z-50  px-4`}>



        <Logo src={isScrolled ? "/blackestate.png" : "/estate.png"} />



        <Menubar />


      </nav>


    </>
  );
}

