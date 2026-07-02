import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";

const images = [
    {
        url: "https://www.knightfrank.co.uk/site-assets/image-library/homepage-property-carousel-thumbnails/new-homes_kf_cat-link.webp?width=166&rmode=crop&quality=80",
        name: "New homes",
    },
    {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        name: "Coastal",
    },
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        name: "With land",
    },
    {
        url: "https://www.knightfrank.co.uk/site-assets/image-library/homepage-property-carousel-thumbnails/new-homes_kf_cat-link.webp?width=166&rmode=crop&quality=80",
        name: "New homes",
    },
    {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        name: "Coastal",
    },
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        name: "With land",
    },
    {
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        name: "Coastal",
    },
    {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        name: "With land",
    },
];

const SCROLL_AMOUNT = 400;

export default function Images() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollDir, setScrollDir] = useState<"left" | "right" | null>(null);

    const onScroll = useCallback((direction: "left" | "right") => {
        const delta = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT;
        setScrollDir(direction);
        scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });

        // Reset the direction flag after the scroll animation completes
        setTimeout(() => setScrollDir(null), 500);
    }, []);

    // Track which cards are currently visible so we can animate them on scroll
    const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set());
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            (entries) => {
                setVisibleIndices((prev) => {
                    const next = new Set(prev);
                    entries.forEach((entry) => {
                        const idx = Number(
                            (entry.target as HTMLElement).dataset.index
                        );
                        if (entry.isIntersecting) {
                            next.add(idx);
                        } else {
                            next.delete(idx);
                        }
                    });
                    return next;
                });
            },
            { root: container, threshold: 0.3 }
        );

        cardRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-6 px-2 sm:p-8">
            <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth"
            >
                <motion.div
                    className="flex gap-4 min-w-max py-3 px-1"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ staggerChildren: 0.045 }}
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            data-index={index}
                            className="flex-shrink-0 w-[170px] text-center cursor-pointer"
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                            }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 14,
                                delay: index * 0.04,
                            }}
                            whileHover={{ y: -8, scale: 1.05 }}
                        >
                            {/* Image container */}
                            <div className="overflow-hidden rounded-xl w-full h-[98px] relative">
                                <motion.img
                                    src={image.url}
                                    alt={image.name}
                                    className="w-full h-full object-cover"
                                    // Smooth scale pulse when scroll direction changes
                                    animate={
                                        scrollDir && visibleIndices.has(index)
                                            ? {
                                                  scale: [1, 1.08, 1],
                                                  transition: {
                                                      duration: 0.5,
                                                      ease: "easeInOut",
                                                  },
                                              }
                                            : { scale: 1 }
                                    }
                                    whileHover={{
                                        scale: 1.15,
                                        transition: {
                                            duration: 0.45,
                                            ease: [0.25, 1, 0.5, 1],
                                        },
                                    }}
                                />
                                {/* Gradient overlay on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <motion.h3
                                className="mt-3 text-[18px] font-medium text-gray-800"
                                whileHover={{
                                    color: "#000",
                                    transition: { duration: 0.2 },
                                }}
                            >
                                {image.name}
                            </motion.h3>

                            {/* Animated underline on hover */}
                            <div className="flex justify-center mt-1">
                                <motion.div
                                    className="h-[2px] bg-black rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: 28 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-end mt-4">
                <div className="flex gap-3">
                    <motion.button
                        onClick={() => onScroll("left")}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="w-8 h-8 bg-white rounded-full border border-neutral-200 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <ChevronLeft size={20} />
                    </motion.button>

                    <motion.button
                        onClick={() => onScroll("right")}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                        }}
                        className="w-8 h-8 bg-white rounded-full border border-neutral-200 flex items-center justify-center cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <ChevronRight size={20} />
                    </motion.button>
                </div>
            </div>
            
        </section>
    );
}