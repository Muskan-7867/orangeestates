

import { motion } from "motion/react"
import { Link } from "@tanstack/react-router"
import { X } from "lucide-react"
export const navLinks = [
  { label: "Home",       href: "/" },
  { label: "Properties", href: "/products" },
  { label: "About Us",   href: "/about" },
  { label: "Contact",    href: "/contact" },
];
export default function Sidebar({ setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

  
  return (
    <>
      <motion.div className="fixed top-0 right-0 z-[1000] h-screen w-full xs:w-80 sm:w-94 p-4 flex flex-col bg-white"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-8 right-8"
        >
          <X size={30} />
        </button>

        <div className="mt-24 space-y-4">
          {navLinks.map((link) => (
            <motion.div
              key={link.href}

            >
              <Link
                to={link.href}
                preload="intent"
                className="block text-4xl font-light px-4 py-2 duration-300 transition-all font-serif"
                activeProps={{
                  className: "bg-primary",
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>


      </motion.div>
    </>
  )
}