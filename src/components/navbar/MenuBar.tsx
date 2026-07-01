
import { navLinks } from "#/constants";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react";

const variants = {
    open: {
        width: 420,
        height: 500,
        borderRadius: 16,
        top: -6,
        right: -6,

    } as const,
    closed: {
        width: 100,
        height: 32,
        borderRadius: 24,
        top: 0,
        right: 0,
        transition: {
            duration: 0.75,
            delay: 0.35,
            ease: [0.76, 0, 0.24, 1]
        }
    } as const,
};

const perspective = {
    initial: {
        opacity: 0,
        rotateX: 90,
        translateY: 80,
        translateX: -20

    } as const,
    enter: (i: number) => ({
        opacity: 1,
        rotateX: 0,
        translateY: 0,
        translateX: -0,
        transition: {
            duration: 0.65,
            opacity: { duration: 0.35 },
            delay: 0.5 + (i * 0.1),
            ease: [.215, .61, .355, 1]
        }
    }) as const,
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1]
        }
    } as const
}
export default function Menubar() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="relative   ">
            {/* <motion.div className="bg-pink-400 rounded-2xl absolute origin-center top-0 right-0"
          variants={variants}
          animate={isActive ? "open" : "closed"}
          initial="closed"
        >

        </motion.div> */}

            <div onClick={() => setIsActive(!isActive)} className="h-8 w-[100px] rounded-full cursor-pointer  overflow-hidden ">
                <motion.div
                    animate={{ top: isActive ? "-100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative"
                >

                    <div className="h-8 w-full text-sm  bg-white/90 border border-white backdrop-blur-sm shadow  hover:rotateX-90">
                        <Text label="Menu" />
                    </div>

                    <div className="absolute top-full h-8 w-full   bg-black text-white hover:rotateX-90">
                        <Text label="Close" />

                    </div>
                </motion.div>

            </div>

            <motion.div
                variants={variants}
                initial="closed"
                animate={isActive ? "open" : "closed"}
                transition={{
                    duration: 0.75,
                    ease: [0.76, 0, 0.24, 1],

                }}
                className="absolute top-0 right-0 bg-white/90 border border-white backdrop-blur-2xl shadow -z-10 overflow-hidden">
                <AnimatePresence>

                    {isActive && (
                        <div className="h-full w-full pt-24 px-18">
                            <div className="flex flex-col gap-4">
                                {
                                    navLinks.map((link, i) => {
                                        return (
                                            <div key={i} className="perspective-[120px] perspective-origin-bottom">
                                                <motion.div
                                                    custom={i}
                                                    variants={perspective}
                                                    animate="enter"
                                                    exit="exit"
                                                    initial="initial"
                                                >
                                                    <Link className="text-5xl font-serif font-medium decoration-0 " to={link.href} >{link.title}</Link>
                                                </motion.div>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>

                    )}

                </AnimatePresence>

            </motion.div>

        </div>
    )
}


function Text({ label }: { label: string }) {
    return (
        <div className="relative h-full w-full flex items-center justify-center perspective-[500px] overflow-hidden">
            <motion.div
                whileHover={{ rotateX: 90 }}
                transition={{
                    duration: 0.75,
                    ease: [0.76, 0, 0.24, 1],
                }}
                style={{
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full flex items-center justify-center"
            >
                <p className="absolute">{label}</p>

                <p
                    className="absolute"
                    style={{
                        transform: "rotateX(-90deg) translateY(9px)",
                        transformOrigin: "bottom",
                    }}
                >
                    {label}
                </p>
            </motion.div>
        </div>
    );
}