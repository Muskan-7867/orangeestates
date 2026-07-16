import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "motion/react";

const images = [
    {
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400",
        blurUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=20&q=10",
        name: "New homes",
    },
    {
        // url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400",
        url: "/4.jpg",
        blurUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=20&q=10",
        name: "Coastal",
    },
    {
        // url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400",
        url: "/5.jpg",

        blurUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=20&q=10",
        name: "London commute",
    },
    {
        // url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400",
        url: "/6.jpg",

        blurUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=20&q=10",
        name: "Lateral living",
    },
    {
        // url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400",
        url: "/7.jpg",

        blurUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=20&q=10",
        name: "With land",
    },
    {
        // url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400",
        url: "/bridge.png",

        blurUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=20&q=10",
        name: "New homes",
    },
    {
        // url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400",
        url: "/8.jpg",

        blurUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=20&q=10",
        name: "Coastal",
    },
    {
        // url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400",
        url: "/9.jpg",

        blurUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=20&q=10",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400",
        blurUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=20&q=10",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400",
        blurUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=20&q=10",
        name: "With land",
    },
    {
        // url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400",
        url: "/about-hero.jpg",

        blurUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=20&q=10",
        name: "Coastal",
    },
    {
        // url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400",
        url: "/contact-hero.jpg",

        blurUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=20&q=10",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400",
        blurUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=20&q=10",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400",
        blurUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=20&q=10",
        name: "With land",
    },
];

const SCROLL_AMOUNT = 380;

export default function Images() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollDir, setScrollDir] = useState<"left" | "right" | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // ─── Physics-based scroll ───────────────────────────────────────────────
    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 32, mass: 0.9, restDelta: 0.5 });

    const getBounds = useCallback(() => {
        if (!containerRef.current || !trackRef.current) return { min: 0, max: 0 };
        const min = -(trackRef.current.scrollWidth - containerRef.current.clientWidth);
        return { min, max: 0 };
    }, []);

    // Sync arrow disabled state with x position
    useEffect(() => {
        return x.on("change", (v) => {
            const { min } = getBounds();
            setCanScrollLeft(v < -1);
            setCanScrollRight(v > min + 1);
        });
    }, [x, getBounds]);

    const scroll = useCallback((direction: "left" | "right") => {
        setScrollDir(direction);
        const delta = direction === "left" ? SCROLL_AMOUNT : -SCROLL_AMOUNT;
        const { min, max } = getBounds();
        const next = Math.min(max, Math.max(min, x.get() + delta));

        animate(x, next, {
            type: "spring",
            stiffness: 200,
            damping: 32,
            mass: 0.9,
        });

        setTimeout(() => setScrollDir(null), 650);
    }, [x, getBounds]);

    return (
        <section className="py-6 px-4 sm:p-8">
            {/* Carousel track — draggable + spring-scrolled */}
            <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                <motion.div
                    ref={trackRef}
                    className="flex gap-4 min-w-max py-3 px-1"
                    style={{ x: springX }}
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0.07}
                    dragTransition={{ bounceStiffness: 280, bounceDamping: 36 }}
                    // Keep x in sync after drag ends
                    onDragEnd={(_) => {
                        x.set(x.get()); // anchor spring to where drag landed
                    }}
                >
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="shrink-0 w-42.5 text-center cursor-pointer select-none"
                            // ── Wave nudge when a button is pressed ──────────
                            animate={
                                scrollDir
                                    ? {
                                        x: [
                                            0,
                                            scrollDir === "right" ? -10 : 10,
                                            0,
                                        ],
                                    }
                                    : { x: 0 }
                            }
                            transition={
                                scrollDir
                                    ? {
                                        duration: 0.42,
                                        ease: [0.25, 1, 0.5, 1],
                                        delay: (index % 7) * 0.025, // stagger wave
                                    }
                                    : { duration: 0 }
                            }
                            whileHover={{ y: -8, scale: 1.05 }}
                        >
                            {/* Image container */}
                            <div className="overflow-hidden rounded-xl w-full h-24.5 relative bg-neutral-100">
                                {/* Blur placeholder */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `url(${image.blurUrl})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        filter: "blur(12px)",
                                        transform: "scale(1.1)",
                                    }}
                                />
                                <motion.img
                                    src={image.url}
                                    alt={image.name}
                                    draggable={false}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                                    whileHover={{
                                        scale: 1.15,
                                        transition: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                                    }}
                                />
                                {/* Gradient overlay on hover */}
                                <motion.div
                                    className="absolute inset-0 bg-linear-to-t from-black/25 to-transparent pointer-events-none z-10"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <motion.h3
                                className="mt-3 text-[18px] font-medium text-gray-800"
                                whileHover={{ color: "#000", transition: { duration: 0.2 } }}
                            >
                                {image.name}
                            </motion.h3>

                            {/* Animated underline on hover */}
                            <div className="flex justify-center mt-1">
                                <motion.div
                                    className="h-0.5 bg-black rounded-full"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: 28 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-end mt-4">
                <div className="flex gap-3">
                    {/* Left arrow */}
                    <motion.button
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        animate={{ opacity: canScrollLeft ? 1 : 0.3 }}
                        whileHover={{ scale: canScrollLeft ? 1.15 : 1 }}
                        whileTap={{ scale: 0.82 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center"
                    >
                        <motion.span
                            animate={scrollDir === "left" ? { x: [-4, 0] } : { x: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                            <ChevronLeft size={20} />
                        </motion.span>
                    </motion.button>

                    {/* Right arrow */}
                    <motion.button
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        animate={{ opacity: canScrollRight ? 1 : 0.3 }}
                        whileHover={{ scale: canScrollRight ? 1.15 : 1 }}
                        whileTap={{ scale: 0.82 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center"
                    >
                        <motion.span
                            animate={scrollDir === "right" ? { x: [4, 0] } : { x: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 20 }}
                        >
                            <ChevronRight size={20} />
                        </motion.span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
}