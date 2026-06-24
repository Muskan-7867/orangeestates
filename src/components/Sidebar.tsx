

import { motion} from "motion/react"
import { navLinks } from "./Navbar"
import { Link } from "@tanstack/react-router"
import { X } from "lucide-react"
export default function Sidebar({ setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    return (
         <>
     

      <motion.div
        // initial={{
        //   clipPath: "inset(0 0 0 100%)",
        // }}
        // animate={{
        //   clipPath: "inset(0 0 0 0%)",
        // }}
        // exit={{
        //   clipPath: "inset(0 0 0 100%)",
        // }}
        // transition={{
        //   duration: 0.8,
        //   ease: [0.76, 0, 0.24, 1],
        // }}
        className="
          fixed
          top-0
          right-0
          z-[70]
          h-screen
       
          bg-white
          p-10
          flex
          flex-col
        "
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-8 right-8"
        >
          <X size={30} />
        </button>

        <div className="mt-24 space-y-6">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.href}
              // initial={{ y: 60, opacity: 0 }}
              // animate={{ y: 0, opacity: 1 }}
              // exit={{ y: 30, opacity: 0 }}
              // transition={{
              //   delay: i * 0.08,
              //   duration: 0.6,
              // }}
            >
              <Link
                to={link.href}
                className="block text-5xl font-light hover:pl-4 transition-all"
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