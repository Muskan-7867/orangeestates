
import { navLinks } from "#/constants";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react"
import { useState, useEffect } from "react";

function getOpenWidth() {
    if (typeof window === "undefined") return 420;
    return Math.min(420, window.innerWidth - 32);
}

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
    const [openWidth, setOpenWidth] = useState(getOpenWidth);

    useEffect(() => {
        const handleResize = () => setOpenWidth(getOpenWidth());
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const variants = {
        open: {
            width: openWidth,
            height: openWidth < 360 ? 520 : 500,
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

    return (
        <div className="hidden lg:block relative">

            {/* ── Menu / Close pill button ── */}
            <div onClick={() => setIsActive(!isActive)} className="h-8 w-25 rounded-full cursor-pointer overflow-hidden shadow-2xl">
                <motion.div
                    animate={{ top: isActive ? "-100%" : "0%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative"
                >
                    <div className="h-8 w-full text-sm bg-white/90 border border-white backdrop-blur-sm shadow">
                        <Text label="Menu" />
                    </div>
                    <div className="absolute top-full h-8 w-full bg-black text-white">
                        <Text label="Close" />
                    </div>
                </motion.div>
            </div>

            {/* ── Expanding panel ── */}
            <motion.div
                variants={variants}
                initial="closed"
                animate={isActive ? "open" : "closed"}
                transition={{
                    duration: 0.75,
                    ease: [0.76, 0, 0.24, 1],
                }}
                className="absolute top-0 right-0 bg-white/90 border border-white backdrop-blur-2xl shadow -z-10 overflow-hidden"
            >
                <AnimatePresence>
                    {isActive && (
                        <div className="h-full w-full pt-16 sm:pt-20 px-8 sm:px-12 md:px-16">
                            <div className="flex flex-col gap-3 sm:gap-4">
                                {navLinks.map((link, i) => (
                                    <div key={i} className="perspective-[120px] perspective-origin-bottom">
                                        <motion.div
                                            custom={i}
                                            variants={perspective}
                                            animate="enter"
                                            exit="exit"
                                            initial="initial"
                                        >
                                            <Link
                                                className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium decoration-0"
                                                to={link.href}
                                                onClick={() => setIsActive(false)}
                                            >
                                                {link.title}
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
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
        <div className="relative h-full w-full flex items-center justify-center perspective-normal overflow-hidden">
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
                <p className="absolute text-xs font-semibold tracking-widest uppercase">{label}</p>

                <p
                    className="absolute text-xs font-semibold tracking-widest uppercase"
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
