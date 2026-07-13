"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

const properties = [
    {
        category: "SIGNATURE PROPERTIES",
        title: "Luxury Penthouse in London",
        location: "London, England",
        image:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
        blurImage:
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=20&q=10",
    },
    {
        category: "PENTHOUSES",
        title: "A Landmark Art Deco Estate on St George's Hill",
        location: "Weybridge, Surrey",
        image:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2000&auto=format&fit=crop",
        blurImage:
            "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=20&q=10",
    },
    {
        category: "HOUSES",
        title: "Modern Countryside House",
        location: "Surrey, England",
        image:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2000&auto=format&fit=crop",
        blurImage:
            "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=20&q=10",
    },
];

const tabs = [
    "SIGNATURE PROPERTIES",
    "PENTHOUSES",
    "HOUSES",
];

export default function Spotlight() {
    const [[active, direction], setActive] = useState([0, 0]);
    const [activeTab, setActiveTab] = useState("SIGNATURE PROPERTIES");
    const filteredProperties =
        activeTab === "SIGNATURE PROPERTIES"
            ? properties
            : properties.filter((item) => item.category === activeTab);
    useEffect(() => {
        setActive([0, 0]);
    }, [activeTab]);
    const next = () => {
        if (filteredProperties.length <= 1) return;

        setActive(([prev]) => [
            prev === filteredProperties.length - 1 ? 0 : prev + 1,
            1,
        ]);
    };

    const prev = () => {
        if (filteredProperties.length <= 1) return;

        setActive(([prev]) => [
            prev === 0 ? filteredProperties.length - 1 : prev - 1,
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

    function SpotlightImage({ src, blurSrc }: { src: string; blurSrc: string }) {
        const [loaded, setLoaded] = useState(false);
        const imgRef = useRef<HTMLImageElement>(null);

        useEffect(() => {
            if (imgRef.current?.complete && imgRef.current?.naturalWidth > 0) {
                setLoaded(true);
            } else {
                setLoaded(false);
            }
        }, [src]);

        return (
            <>
                <img
                    ref={imgRef}
                    src={src}
                    onLoad={() => setLoaded(true)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                        }`}
                />
                {/* Blur placeholder on top */}
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                    style={{
                        backgroundImage: `url(${blurSrc})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(12px)",
                        transform: "scale(1.1)",
                        opacity: loaded ? 0 : 1,
                    }}
                />
            </>
        );
    }

    if (!filteredProperties.length) {
        return (
            <div className="h-125 flex items-center justify-center text-gray-500">
                No properties available.
            </div>
        );
    }

    return (
        <section className="py-10">
            <div className="w-full px-4 md:px-18">
                <div className="text-xl mb-6 md:mb-10 font-serif flex flex-col justify-center items-center text-center px-2">
                    <h1 className="text-2xl sm:text-4xl font-serif text-primary">Global Reach, Local Expertise</h1>
                    <p className="mt-2 text-sm text-gray-400 max-w-md">
                        Offering exclusive access to exceptional properties and local experts – wherever, whenever.
                    </p>
                </div>
                {/* Top Row */}
                <div className="mb-4 md:mb-6 flex items-center justify-between ">
                    <h2 className="text-2xl font-serif text-primary">
                        In the Spotlight
                    </h2>

                    <div className="hidden gap-8 text-xs tracking-wide text-gray-500 md:flex ">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`transition pb-1 cursor-pointer ${activeTab === tab
                                        ? "text-primary border-b border-primary"
                                        : "hover:text-primary"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div className="relative h-62.5 sm:h-95 md:h-125 overflow-hidden">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
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
                            className="absolute inset-0 h-full w-full"
                        >
                            <SpotlightImage
                                src={filteredProperties[active].image}
                                blurSrc={filteredProperties[active].blurImage}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Left Button */}
                    <button
                        onClick={prev}
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 text-white"
                    >
                        <ChevronLeft size={28} strokeWidth={1.5} className="sm:hidden" />
                        <ChevronLeft size={40} strokeWidth={1.5} className="hidden sm:block" />
                    </button>

                    {/* Right Button */}
                    <button
                        onClick={next}
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-white"
                    >
                        <ChevronRight size={28} strokeWidth={1.5} className="sm:hidden" />
                        <ChevronRight size={40} strokeWidth={1.5} className="hidden sm:block" />
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
                            <h3 className=" text-primary font-serif text-xl sm:text-2xl  leading-tight">
                                {filteredProperties[active].title}
                            </h3>

                            <p className="mt-2 text-sm sm:text-base text-gray-600">
                                {filteredProperties[active].location}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <button className="w-full md:w-auto bg-primary text-white px-4 py-3 md:px-6 md:py-4 text-sm transition cursor-pointer">
                        View property
                    </button>
                </div>

            </div>
        </section>
    );
}