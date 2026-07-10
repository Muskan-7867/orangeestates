import { cn } from "#/lib/utils";
import { Link, useLocation } from "@tanstack/react-router";
import { Building2, BookOpen, Info, Home, Search, HomeIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Activity, useEffect, useRef, useState } from "react";

const mobileLinks = [
  { label: "Home", href: "/", icon: Home },

  { label: "Properties", href: "/properties", icon: Building2 },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "About", href: "/about", icon: Info },
  // { label: "Contact", href: "/contact", icon: MessageSquare },
];

export default function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "") || "/";
  const [isSearchIconClick, setIsSearchedClick] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSearchIconClick) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isSearchIconClick]);

  useEffect(() => {
    if (!window.visualViewport) return;

    const handleViewport = () => {
      const vv = window.visualViewport!;
      // offsetTop accounts for the viewport scrolling up when keyboard appears
      const keyboardHeight = window.innerHeight - (vv.height + vv.offsetTop);

      if (bottomNavRef.current) {
        bottomNavRef.current.style.bottom =
          keyboardHeight > 10 ? `${keyboardHeight}px` : "0px";
      }
    };

    window.visualViewport.addEventListener("resize", handleViewport);
    window.visualViewport.addEventListener("scroll", handleViewport);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleViewport);
      window.visualViewport?.removeEventListener("scroll", handleViewport);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div ref={bottomNavRef} className="lg:hidden fixed bottom-0  left-0 right-0 px-2 pb-6 z-50   bg-linear-to-b from-transparent to-white  flex flex-row gap-1">
        {
          isSearchIconClick && (
            <motion.button
              layoutId="left"
              onClick={() => setIsSearchedClick(false)}
              className="h-12 w-12 shrink-0  rounded-full bg-linear-to-b from bg-white/60 to-gray-200 backdrop-blur-lg border border-white 
      flex justify-center items-center">
              <motion.span layoutId="home-icon">
                <HomeIcon
                  size={18}
                  className={`transition-colors duration-300 shrink-0 text-primary
                        }`}
                />
              </motion.span>
            </motion.button>
          )
        }

        {!isSearchIconClick && (
          <motion.div
            layoutId="left"
            className="flex items-center justify-around gap-1 px-1 py-6 rounded-full bg-linear-to-b from bg-white/60 to-gray-200 backdrop-blur-lg border border-white shadow1 w-full h-12"
          >
            {mobileLinks.map((link, index) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(link.href);

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative flex  items-center justify-center cursor-pointer"
                >
                  {/* Active pill */}
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute inset-0 "
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}

                  {/* Content */}
                  <div
                    className={`relative z-10 flex flex-col items-center  transition-all duration-300 ${isActive ? "px-3 py-1.5" : "px-2.5 py-1.5"
                      }`}
                  >
                    <motion.span
                      layoutId={index === 0 ? "home-icon" : ""}
                      initial={{ opacity: index !== 0 ? 0 : 1 }}
                      animate={{ opacity: index !== 0 ? 1 : 1 }}
                      transition={{ duration: 1, delay: 0.2 }}
                    >
                      <Icon
                        size={18}
                        className={`transition-colors duration-300 shrink-0 ${isActive ? "text-primary" : ""
                          }`}
                      />
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className={cn(`text-[10px] whitespace-nowrap overflow-hidden `, isActive ? "text-primary" : "")}
                    >
                      {link.label}
                    </motion.span>

                  </div>
                </Link>


              );


            })}


          </motion.div>
        )}

        <motion.div
          layoutId="input"
          initial={{
            width: "48px"
          }}
          animate={{
            width: "100%",

          }}
          transition={{
            duration: 0.6
          }}

          className={cn(`shrink-0 flex-1 rounded-3xl bg-linear-to-b  from bg-white/60 to-gray-200 backdrop-blur-lg border border-white 
          flex justify-center items-center`, isSearchIconClick ? "w-full" : "w-12")}>
          <Activity mode={isSearchIconClick ? "visible" : "hidden"} >
            <input
              ref={inputRef}
              placeholder="search.."
              className="h-12 w-full px-3 bg-transparent outline-none border-none focus:outline-none focus:ring-0" />
          </Activity>



          <button
            onClick={() => setIsSearchedClick(true)}
            className="h-12 w-12 shrink-0   
          flex justify-center items-center">
            <motion.span
              layoutId="search-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >

              <Search size={18} />
            </motion.span>
          </button>

        </motion.div>


      </div>
    </AnimatePresence>
  );
}  