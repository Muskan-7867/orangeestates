import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

/**
 * Returns `true` once the user has scrolled past the hero section threshold.
 * Mirrors the same logic already used in Navbar.tsx so they stay in sync.
 */
export function useHeroScrolled() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "") || "/";

  const hasDarkHero =
    pathname === "/" ||
    pathname === "/_user" ||
    pathname === "/_user/" ||
    pathname === "/about" ||
    pathname === "/_user/about" ||
    pathname === "/contact" ||
    pathname === "/_user/contact";

  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window === "undefined") return false;
    if (!hasDarkHero) return true;
    return window.scrollY > 100;
  });

  useEffect(() => {
    if (!hasDarkHero) {
      setIsScrolled(true);
      return;
    }

    const getThreshold = () => {
      if (pathname === "/" || pathname === "/_user" || pathname === "/_user/") {
        return window.innerHeight * 0.75;
      } else if (pathname.includes("/about")) {
        return window.innerHeight * 0.6;
      } else if (pathname.includes("/contact")) {
        return 300;
      }
      return 100;
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > getThreshold());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, hasDarkHero]);

  return isScrolled;
}
