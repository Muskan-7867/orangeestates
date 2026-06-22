"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const properties = [
    {
        title: "A Landmark Art Deco Estate on St George's Hill",
        location: "Weybridge, Surrey",
        image:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop",
    },
    {
        title: "Luxury Penthouse in London",
        location: "London, England",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    },
    {
        title: "Modern Countryside House",
        location: "Surrey, England",
        image:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2000&auto=format&fit=crop",
    },
];

const tabs = [
    "SIGNATURE PROPERTIES",
    "FLATS",
    "PENTHOUSES",
    "HOUSES",
];

export default function Spotlight() {
    const [[active, direction], setActive] = useState([0, 0]);

    const next = () => {
        setActive(([prev]) => [
            prev === properties.length - 1 ? 0 : prev + 1,
            1,
        ]);
    };

    const prev = () => {
        setActive(([prev]) => [
            prev === 0 ? properties.length - 1 : prev - 1,
            -1,
        ]);
    };

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "30%" : "-30%",
    scale: 1.15,
    opacity: 0,
  }),

  center: {
    x: 0,
    scale: 1,
    opacity: 1,
  },

  exit: (direction: number) => ({
    x: direction > 0 ? "-30%" : "30%",
    scale: 0.9,
    opacity: 0,
  }),
};

    return (
        <section className=" py-10">
            <div className="w-full  px-18">
                <div className="text-xl mb-10 font-serif flex flex-col  justify-center items-center">
                    <h2 className="text-2xl font-medium">Global Reach, Local Expertise</h2>
                    <p className="mt-2 text-gray-400">
                        Offering exclusive access to exceptional properties and local experts – wherever, whenever.
                    </p>
                </div>
                {/* Top Row */}
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-3xl font-serif">
                        In the Spotlight
                    </h2>

                    <div className="hidden gap-8 text-xs tracking-wide text-gray-500 md:flex">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab}
                                className={`transition ${index === 0
                                    ? "text-black"
                                    : "hover:text-black"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div className="relative h-[500px]  overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.img
                            key={active}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                duration: 0.7,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                            src={properties[active].image}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </AnimatePresence>

                    {/* Left Button */}
                    <button
                        onClick={prev}
                        className="absolute left-5 top-1/2 -translate-y-1/2 text-white"
                    >
                        <ChevronLeft size={40} strokeWidth={1.5} />
                    </button>

                    {/* Right Button */}
                    <button
                        onClick={next}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-white"
                    >
                        <ChevronRight size={40} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Bottom Content */}
                <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h3 className="font-serif text-4xl leading-tight">
                                {properties[active].title}
                            </h3>

                            <p className="mt-2 text-gray-600">
                                {properties[active].location}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <button className="border border-black px-10 py-4 text-sm transition hover:bg-black hover:text-white">
                        View property
                    </button>
                </div>
            </div>
        </section>
    );
}