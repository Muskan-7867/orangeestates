"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Variants } from "motion/react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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
    image:
      "/4.jpg",
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
    // image:
    //   "https://images.unsplash.com/photo-1632860644196-e1e464596ea3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "/5.jpg",
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
    // image:
    //   "https://as1.ftcdn.net/v2/jpg/20/73/37/00/1000_F_2073370087_qAFZo1zBMYp42tipfSqBPjEQeTaICBr6.jpg",
    image: "/6.jpg",
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

export default function PremiumHero() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const slide = slides[index];
  const nextSlide = slides[(index + 1) % slides.length];
  const thirdSlide = slides[(index + 2) % slides.length];

  const paginate = (dir: number) => {
    setIndex(([prev]) => {
      const next = (prev + dir + slides.length) % slides.length;
      return [next, dir];
    });
  };

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
      className="relative h-[55vh] sm:h-[90vh]  overflow-hidden text-white  sm:px-28 select-none"
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
          style={{ willChange: "opacity, transform" }}
        >
          <div className="absolute inset-0 bg-black/15 z-10" />
          {/* Blur placeholder — tiny image scaled up with CSS blur */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${slide.blurImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />
          {/* Full-res image fades in on top once loaded */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
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
                    className="inline-flex items-center gap-3 border-b border-white pb-2 text-xs  uppercase tracking-[0.3em]"
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
            {/* Third slide preview */}
            <motion.div
              className="absolute right-0 top-1/2 h-40 w-30
               -translate-y-1/2 overflow-hidden rounded-[25px]
               opacity-60"
              animate={{
                x: 0,
                scale: 0.9,
              }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${thirdSlide.blurImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)",
                  transform: "scale(1.1)",
                }}
              />
              <img
                src={thirdSlide.image}
                alt={thirdSlide.title}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
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
                className="relative z-10 h-50 w-45
                 overflow-hidden rounded-[35px]
                "
              // style={{ willChange: "transform, opacity" }}
              >
                {/* Float animation lives on a stable inner wrapper so it
                    doesn't restart when imageVariants finishes */}
                <motion.div
                  className="h-full w-full relative"
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatType: "loop",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${nextSlide.blurImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(20px)",
                      transform: "scale(1.1)",
                    }}
                  />
                  <img
                    src={nextSlide.image}
                    alt={nextSlide.title}
                    className="absolute inset-0 h-full w-full object-cover scale-[1.06] transition-opacity duration-500"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* ── Mobile-only image cluster (bottom-right, above nav) ───── */}
      <div className="md:hidden absolute bottom-14 right-4 z-20" style={{ perspective: 800 }}>
        {/* Third slide peek */}
        <motion.div
          className="absolute right-0 bottom-0 h-27.5 w-20 overflow-hidden rounded-[18px] opacity-60"
          animate={{ x: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${thirdSlide.blurImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          />
          <img
            src={thirdSlide.image}
            alt={thirdSlide.title}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
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
          >
            <motion.div
              className="h-full w-full relative"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${nextSlide.blurImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)",
                  transform: "scale(1.1)",
                }}
              />
              <img
                src={nextSlide.image}
                alt={nextSlide.title}
                className="absolute inset-0 h-full w-full object-cover scale-[1.06] transition-opacity duration-500"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Navigation ──────────────────────────────────────────────── */}
      <div className="absolute bottom-2 left-0 right-0 z-30 flex justify-center">
        <div className="flex items-center gap-3  bg-black/50 px-3 py-1 backdrop-blur-md">

          {/* Prev */}
          <button
            onClick={() => paginate(-1)}
            className="flex h-7 w-7 items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </button>

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
                    width: i === index ? 24 : 6,
                    backgroundColor: i === index ? "#ffffff" : "rgba(255,255,255,0.45)",
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => paginate(1)}
            className="flex h-7 w-7 items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </button>

        </div>
      </div>
    </motion.section>
  );
}