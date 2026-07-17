"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  blurImage: string;
  accent: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Minimal Objects",
    subtitle: "EDITORIAL COLLECTION",
    description:
      "Designed to elevate contemporary interiors through sculptural forms, natural materials, and timeless craftsmanship.",
    image: "/9.jpg",
    blurImage:
      "https://robbreport.com/wp-content/uploads/2023/04/Studley-Royal-House-.jpg?w=1000&q=10",
    accent: "#F3EFE8",
    cta: "Discover Collection",
  },
  {
    id: 2,
    title: "Quiet Luxury",
    subtitle: "NEW SEASON",
    description:
      "Refined silhouettes and tactile materials create a balanced atmosphere between architecture and design.",
    image: "/bridge.png",
    blurImage:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=20&q=10",
    accent: "#ECE7E1",
    cta: "View Pieces",
  },
  {
    id: 3,
    title: "Modern Living",
    subtitle: "CURATED INTERIORS",
    description:
      "A curated collection of objects and spaces inspired by contemporary editorial aesthetics.",
    image: "/5.jpg",
    blurImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=20&q=10",
    accent: "#EAE4DB",
    cta: "Explore More",
  },
];

// ─── Image card: slides in from the side ────────────────────────────────────
const imageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 220 : -220,
    opacity: 0,
    scale: 1.08,
    rotateY: direction > 0 ? 8 : -8,
  }) as const,
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -220 : 220,
    opacity: 0,
    scale: 0.92,
    rotateY: direction > 0 ? -8 : 8,
    transition: {
      duration: 0.75,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

// ─── Text lines: clip-reveal stagger ────────────────────────────────────────
const textEnter = (delay: number) => ({
  y: "0%",
  opacity: 1,
  transition: {
    delay,
    duration: 0.85,
    ease: [0.22, 1, 0.36, 1],
  },
}) as const;

const textExit = (delay: number) => ({
  y: "-115%",
  opacity: 0,
  transition: {
    delay,
    duration: 0.45,
    ease: [0.76, 0, 0.24, 1],
  },
}) as const;

// ─── Background layer ────────────────────────────────────────────────────────
const bgVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 1.08,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 1.0, ease: "easeOut" },
      scale: { duration: 8, ease: "linear" },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: {
      opacity: { duration: 0.7, ease: "easeIn" },
      scale: { duration: 0.7, ease: "easeIn" },
    },
  },
};

// Shared will-change style to promote animated elements to GPU layers
const willChangeTransform: React.CSSProperties = {
  willChange: "transform, opacity",
  backfaceVisibility: "hidden",
};

export default function HeroBannerCarousel() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const slide = slides[index];
  const nextSlide = slides[(index + 1) % slides.length];
  const thirdSlide = slides[(index + 2) % slides.length];

  // ── Stable paginate — never changes identity, safe for refs ──────────────
  const indexRef = useRef(index);
  indexRef.current = index;

  const paginate = useCallback((dir: number) => {
    setIndex(([prev]) => {
      const next = (prev + dir + slides.length) % slides.length;
      return [next, dir];
    });
  }, []);

  // ── Auto-scroll: stable interval, not recreated on every slide change ──────
  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]); // paginate is stable via useCallback — interval never restarts

  // ─── Swipe / drag handling (mouse + touch) ───────────────────────────────
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);
  const SWIPE_THRESHOLD = 50;

  const onDragStart = (clientX: number) => {
    dragStart.current = clientX;
    isDragging.current = false;
  };

  const onDragEnd = (clientX: number) => {
    if (dragStart.current === null) return;
    const delta = dragStart.current - clientX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      isDragging.current = true;
      paginate(delta > 0 ? 1 : -1);
    }
    dragStart.current = null;
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => onDragStart(e.clientX);
  const handleMouseUp = (e: React.MouseEvent) => onDragEnd(e.clientX);
  const handleMouseLeave = () => { dragStart.current = null; };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => onDragStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => onDragEnd(e.changedTouches[0].clientX);

  return (
    // motion.section lets us smoothly animate the background color
    <motion.section
      id="hero-carousel"
      className="relative h-[55vh] sm:h-[90vh] overflow-hidden text-white sm:px-28 select-none"
      animate={{ backgroundColor: slide.accent }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      // Mouse drag
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      // Touch swipe
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: "grab" }}
    >
      {/* ── Background image layer ──────────────────────────────────── */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={slide.id + "-bg"}
          className="absolute inset-0"
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={willChangeTransform}
        >
          <div className="absolute inset-0 z-10" />
          {/* Full-res hero image — highest fetch priority, no blur placeholder needed at bg level */}
          <img
            src={slide.image}
            alt={slide.title}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-10 bg-linear-to-r from-black/70 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Content grid ────────────────────────────────────────────── */}
      <div className="relative z-20 flex h-full items-center">
        <div className="grid w-full grid-cols-1 gap-8 px-5 sm:px-8 md:grid-cols-2 md:pl-8 md:pr-0">

          {/* Text column */}
          <div className="flex flex-col justify-center py-16 sm:py-12 md:py-0">
            <AnimatePresence mode="popLayout">
              <motion.div key={slide.id} className="space-y-5 sm:space-y-8">

                {/* Subtitle */}
                <div className="overflow-hidden">
                  <motion.p
                    className="text-xs tracking-[0.4em] text-white/70"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={textEnter(0)}
                    exit={textExit(0)}
                  >
                    {slide.subtitle}
                  </motion.p>
                </div>

                {/* Title */}
                <div className="overflow-hidden">
                  <motion.h1
                    className="max-w-xl font-serif text-4xl leading-none sm:text-5xl md:text-6xl mb-2"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={textEnter(0.1)}
                    exit={textExit(0.05)}
                  >
                    {slide.title}
                  </motion.h1>
                </div>

                {/* Description */}
                <div className="overflow-hidden">
                  <motion.p
                    className="max-w-md text-sm sm:text-base md:text-lg leading-relaxed text-white/80"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={textEnter(0.2)}
                    exit={textExit(0.02)}
                  >
                    {slide.description}
                  </motion.p>
                </div>

                {/* CTA */}
                <div className="overflow-hidden">
                  <motion.a
                    href="#"
                    className="inline-flex items-center gap-3 border-b border-white pb-2 text-xs uppercase tracking-[0.3em]"
                    initial={{ y: "115%", opacity: 0 }}
                    animate={textEnter(0.3)}
                    exit={textExit(0)}
                  >
                    {slide.cta}
                  </motion.a>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Product image column — hidden on mobile */}
          <div className="relative hidden md:flex items-center justify-end pr-16" style={{ perspective: 1000 }}>
            {/* Third slide preview — lazy loaded, no blur div */}
            <motion.div
              className="absolute right-0 top-1/2 h-40 w-30
               -translate-y-1/2 overflow-hidden rounded-[25px]
               opacity-60"
              animate={{ x: 0, scale: 0.9 }}
              transition={{ duration: 0.8 }}
              style={willChangeTransform}
            >
              <img
                src={thirdSlide.image}
                alt={thirdSlide.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/25 z-10" />
            </motion.div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={slide.id + "-image"}
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10 h-50 w-45 overflow-hidden rounded-[35px]"
                style={willChangeTransform}
              >
                {/* Float animation on a stable inner wrapper */}
                <motion.div
                  className="h-full w-full relative"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "loop",
                  }}
                  style={willChangeTransform}
                >
                  <img
                    src={nextSlide.image}
                    alt={nextSlide.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover scale-[1.06]"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── Mobile-only image cluster (bottom-right, above nav) ───── */}
      <div className="md:hidden absolute bottom-14 right-4 z-20" style={{ perspective: 800 }}>
        {/* Third slide peek — lazy, no blur div */}
        <motion.div
          className="absolute right-0 bottom-0 h-27.5 w-20 overflow-hidden rounded-[18px] opacity-60"
          animate={{ x: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          style={willChangeTransform}
        >
          <img
            src={thirdSlide.image}
            alt={thirdSlide.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/25 z-10" />
        </motion.div>

        {/* Main animated card */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id + "-mob-image"}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative z-10 h-35 w-27.5 overflow-hidden rounded-[22px]"
            style={willChangeTransform}
          >
            <motion.div
              className="h-full w-full relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
              style={willChangeTransform}
            >
              <img
                src={nextSlide.image}
                alt={nextSlide.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover scale-[1.06]"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────── */}
      <div className="absolute bottom-2 left-0 right-0 z-30 flex justify-center">
        <div className="flex items-center gap-3 bg-black/30 px-4 py-2 backdrop-blur-md rounded-full">

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {slides.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex([i, i > index ? 1 : -1])}
                aria-label={`Go to slide ${i + 1}`}
                className="cursor-pointer"
              >
                <motion.div
                  animate={{
                    backgroundColor: i === index ? "#ffffff" : "rgba(255,255,255,0.45)",
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="h-1.5 w-1.5 rounded-full"
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </motion.section>
  );
}