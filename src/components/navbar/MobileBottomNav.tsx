import { Link, useLocation } from "@tanstack/react-router";
import { Home, Building2, BookOpen, Info, MessageSquare } from "lucide-react";
import { motion } from "motion/react";

const mobileLinks = [
  // { label: "Home", href: "/", icon: Home },
  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: MessageSquare },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "") || "/";

  return (
    <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-32px)] max-w-[420px]">
      <div className="flex items-center justify-between px-3 py-2 bg-white/80 border border-white backdrop-blur-lg rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          // Exact match for home, startsWith for deep routes
          const isActive = link.href === "/" 
            ? currentPath === "/" 
            : currentPath.startsWith(link.href);

          return (
            <Link
              key={link.label}
              to={link.href}
              className="relative flex flex-col items-center justify-center flex-1 py-1 text-gray-500 hover:text-primary transition-colors cursor-pointer"
            >
              {/* Active indicator bubble */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute inset-0 bg-primary/10 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}

              {/* Icon & Label */}
              <div className="relative flex flex-col items-center z-10">
                <Icon
                  size={20}
                  className={`transition-transform duration-300 ${
                    isActive ? "text-primary scale-110" : "text-gray-500"
                  }`}
                />
                <span
                  className={`text-[10px] mt-0.5 font-medium transition-all duration-300 ${
                    isActive ? "text-primary font-semibold" : "text-gray-400"
                  }`}
                >
                  {link.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
