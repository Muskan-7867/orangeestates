import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "motion/react";

const images = [
    {
        url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=400",
        name: "New homes",
    },
    {
        url: "/4.jpg",
        name: "Coastal",
    },
    {
        url: "/5.jpg",
        name: "London commute",
    },
    {
        url: "/6.jpg",
        name: "Lateral living",
    },
    {
        url: "/7.jpg",
        name: "With land",
    },
    {
        url: "/bridge.png",
        name: "New homes",
    },
    {
        url: "/8.jpg",
        name: "Coastal",
    },
    {
        url: "/9.jpg",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400",
        name: "With land",
    },
    {
        url: "/about-hero.jpg",
        name: "Coastal",
    },
    {
        url: "/contact-hero.jpg",
        name: "London commute",
    },
    {
        url: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400",
        name: "Lateral living",
    },
    {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=400",
        name: "With land",
    },
];

const SCROLL_AMOUNT = 380;

export default function Images() {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Physics-based scroll — only x drives the track; no per-card animation
    const x = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 220, damping: 34, mass: 0.8, restDelta: 0.3 });

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

    const scroll = useCallback(
        (direction: "left" | "right") => {
            const delta = direction === "left" ? SCROLL_AMOUNT : -SCROLL_AMOUNT;
            const { min, max } = getBounds();
            const next = Math.min(max, Math.max(min, x.get() + delta));

            animate(x, next, {
                type: "spring",
                stiffness: 220,
                damping: 34,
                mass: 0.8,
            });
        },
        [x, getBounds],
    );

    return (
        <section className="py-6 px-4 sm:p-8">
            {/* Carousel track — draggable + spring-scrolled */}
            <div ref={containerRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
                <motion.div
                    ref={trackRef}
                    className="flex gap-4 min-w-max py-3 px-1"
                    style={{ x: springX, willChange: "transform" }}
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0.06}
                    dragTransition={{ bounceStiffness: 280, bounceDamping: 36 }}
                    onDragEnd={() => {
                        x.set(x.get()); // anchor spring to where drag landed
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="images-card shrink-0 w-42.5 text-center cursor-pointer select-none"
                        >
                            {/* Image container */}
                            <div className="images-img-wrap overflow-hidden  w-full h-24.5 relative bg-neutral-100">
                                <img
                                    src={image.url}
                                    alt={image.name}
                                    draggable={false}
                                    loading={index < 4 ? "eager" : "lazy"}
                                    className="images-img absolute inset-0 w-full h-full object-cover"
                                />
                                {/* Gradient overlay on hover */}
                                <div className="images-overlay absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none z-10" />
                            </div>

                            <h3 className="images-label mt-3 text-[18px] font-medium text-gray-800">
                                {image.name}
                            </h3>

                            {/* Animated underline on hover */}
                            {/* <div className="flex justify-center mt-1">
                                <div className="images-underline h-0.5 bg-black rounded-full" />
                            </div> */}
                        </div>
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
                        <ChevronLeft size={20} />
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
                        <ChevronRight size={20} />
                    </motion.button>
                </div>
            </div>

            <style>{`
                /* Card lift on hover — pure CSS, GPU composited */
                .images-card {
                    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: transform;
                }
                .images-card:hover {
                    transform: translateY(-8px) scale(1.05);
                }

                /* Image zoom on hover — CSS transition, no JS runtime */
                .images-img {
                    transition: transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: transform;
                }
                .images-img-wrap:hover .images-img {
                    transform: scale(1.15);
                }

                /* Gradient overlay fade on hover */
                .images-overlay {
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .images-img-wrap:hover .images-overlay {
                    opacity: 1;
                }

                /* Label colour on hover */
                .images-card:hover .images-label {
                    color: #000;
                }

                /* Underline expand on hover */
                .images-underline {
                    width: 0;
                    transition: width 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .images-card:hover .images-underline {
                    width: 28px;
                }
            `}</style>
        </section>
    );
}