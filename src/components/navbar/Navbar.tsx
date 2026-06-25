import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";


export const navLinks = [
  { label: "Home",       href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "About Us",   href: "/about" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar({setOpen, open}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {

  const location = useLocation();



useEffect(() => {
  document.body.style.overflow = open ? "hidden" : "";
}, [open]);

  return (
    <>
      {/* ── Top bar ── */}
      <nav className={`h-16 bg-black flex items-center justify-between px-6 sm:px-10  w-full  shadow-sm ${open ? "" : "fixed top-0 z-50"}`}>

        {/* Desktop quick links */}
        <div className="hidden md:flex flex-1 justify-start items-center gap-6 text-sm text-white">
          {navLinks.slice(1).map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`hover:text-primary transition-colors ${
                location.pathname === l.href ? "text-primary font-medium" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link to="/" className="flex  flex-1 justify-center items-center gap-4 text-white no-underline">
          <div className="text-right leading-none">
            <p className="text-[11px] tracking-widest uppercase">United</p>
            <p className="text-[11px] tracking-widest uppercase">Kingdom</p>
          </div>
          <div className="h-10 w-px bg-gray-200" />
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
       

        {/* Mobile spacer (balances logo) */}
        <div className="w-6 md:hidden" />
      </nav>

      
    </>
  );
}