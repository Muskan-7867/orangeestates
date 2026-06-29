import { useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { cn } from "#/lib/utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

useGSAP(() => {
    let lastScroll = 0;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",

      onUpdate(self) {
        const current = self.scroll();
        console.log("current", current)

        // Ignore tiny movements
        if (Math.abs(current - lastScroll) < 10) return;

        if (current > lastScroll && current > 1200) {
          // Scrolling down
          gsap.to(navbarRef.current, {
            y: -100,
            duration: 0.35,
            ease: "power2.out",
            overwrite: true,
          });
        } else {
          // Scrolling up
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
  }, []);

  return (
    <>
      {/* ── Top bar ── */}
      <nav ref={navbarRef} className={`h-16 w-full    ${open ? "" : "fixed top-0 z-50 px-4 py-2"}`}>


        <div className={cn(`flex items-center justify-between bg-black/70 backdrop-blur-md h-full w-full p-4 rounded-xl overflow-hidden `)}>

          {/* Logo */}
          <Link to="/" className="flex  flex-1 justify-start items-center gap-4 text-white no-underline">

            <div>
              <p className="text-2xl font-serif leading-none">Orange</p>
              <p className="text-[8px] tracking-[3px] uppercase text-gray-400 mt-0.5">
                Real Estate
              </p>
            </div>
          </Link>


          {/* Hamburger */}
          <div className=" flex flex-1 justify-end items-center">
            <button
              onClick={() => setOpen(!open)}
              aria-label="Open menu"
              className="text-white hover:opacity-70 transition-opacity"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>




      </nav>


    </>
  );
}