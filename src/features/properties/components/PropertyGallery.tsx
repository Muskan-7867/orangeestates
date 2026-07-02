import { cn } from "#/lib/utils";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { Link } from "@tanstack/react-router";

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.95,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  }),
};

export default function PropertyGallery({ property }: { property: any }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const totalImages = property.images.length;

  const handlePrev = () => {
    setDirection(-1);
    setActiveImageIndex((prev) =>
      prev === 0 ? totalImages - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveImageIndex((prev) =>
      prev === totalImages - 1 ? 0 : prev + 1
    );
  };

  const selectImage = (index: number) => {
    setDirection(index > activeImageIndex ? 1 : -1);
    setActiveImageIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape" && isLightboxOpen) {
        setIsLightboxOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, isLightboxOpen, totalImages]);

  return (
    <section className="w-full p-2">
      {/* Breadcrumbs Navigation */}
      <div className="w-full px-4 md:px-12 lg:px-24 py-4 flex items-center justify-center gap-2 text-xs md:text-sm text-gray-500 font-sans">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <Link to="/properties" className="hover:text-primary transition-colors">
          Properties
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-800 font-medium truncate max-w-[200px] md:max-w-xs">
          {property.title}
        </span>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden">

        {/* Navigation Gestures Detector & Sliding Track */}
        <motion.div
          onPanEnd={(_, info) => {
            const swipeThreshold = 50;
            if (info.offset.x < -swipeThreshold) {
              handleNext();
            } else if (info.offset.x > swipeThreshold) {
              handlePrev();
            }
          }}
          className="w-full h-[45vh] md:h-[70vh] flex items-center overflow-hidden"
        >
          <motion.div
            className="flex items-center   w-full h-full"
            animate={{
              x: `calc(13% - ${activeImageIndex + 1} * (74%))`
            }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
          >
            {[
              property.images[totalImages - 1],
              ...property.images,
              property.images[0]
            ].map((img: { url: string; blurUrl: string }, idx: number) => {
              const isActive = idx === activeImageIndex + 1;
              const originalIndex = idx === 0
                ? totalImages - 1
                : idx === totalImages + 1
                  ? 0
                  : idx - 1;

              return (
                <motion.div
                  key={idx}
                  onClick={() => selectImage(originalIndex)}
                  className={cn(
                    "relative flex-shrink-0 cursor-pointer overflow-hidden select-none transition-shadow duration-300",
                    isActive ? "ring-1 ring-black/5" : ""
                  )}
                  style={{ width: "74%" }}
                  animate={{
                    scale: isActive ? 1 : 0.96,
                    opacity: isActive ? 1 : 0.75,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 26 }}
                >
                  {/* Blur placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${img.blurUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(12px)",
                      transform: "scale(1.1)",
                    }}
                  />
                  <img
                    src={img.url}
                    alt={`${property.title} - View ${originalIndex + 1}`}
                    className="absolute inset-0 w-full h-[40vh] md:h-[70vh] object-cover pointer-events-none select-none"
                  />
                  {/* Spacer to maintain height */}
                  <div className="w-full h-[40vh] md:h-[70vh]" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Left & Right Chevron Navigation overlaying the edges */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white pointer-events-auto transition-colors cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white pointer-events-auto transition-colors cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>



      {/* Interactive Thumbnails Track */}
      <div className="flex items-center justify-center gap-3 mt-4 overflow-x-auto py-2 px-1 scrollbar-hide max-w-full">
        {property.images.map((img: { url: string; blurUrl: string }, idx: number) => (
          <button
            key={idx}
            onClick={() => selectImage(idx)}
            className="relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border border-black/5 hover:border-black/10 focus:outline-none cursor-pointer transition-all duration-300"
          >
            {/* Blur placeholder */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${img.blurUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(8px)",
                transform: "scale(1.1)",
              }}
            />
            <img
              src={img.url}
              alt=""
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-500",
                activeImageIndex === idx ? "opacity-100 scale-105" : "opacity-60 hover:opacity-85"
              )}
            />
            {activeImageIndex === idx && (
              <motion.div
                layoutId="activeThumbHighlight"
                className="absolute inset-0 border-2 border-primary rounded-xl  pointer-events-none"
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Portal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
          >
            {/* Header controls */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20">
              <span className="text-sm font-semibold tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 select-none">
                {activeImageIndex + 1} / {totalImages}
              </span>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsLightboxOpen(false)}
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all cursor-pointer"
                title="Close Fullscreen"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Lightbox Main Stage */}
            <div className="relative w-full max-w-7xl h-[65vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeImageIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(_, { offset }) => {
                    const swipeThreshold = 80;
                    if (offset.x < -swipeThreshold) {
                      handleNext();
                    } else if (offset.x > swipeThreshold) {
                      handlePrev();
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  {/* Blur placeholder */}
                  <div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      backgroundImage: `url(${property.images[activeImageIndex].blurUrl})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      filter: "blur(16px)",
                      transform: "scale(1.05)",
                    }}
                  />
                  <img
                    src={property.images[activeImageIndex].url}
                    alt=""
                    className="relative max-w-full max-h-full object-contain rounded-xl select-none pointer-events-none shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Lightbox Side Buttons */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="absolute left-4 p-4 rounded-full bg-white/10 text-white transition-all border border-white/15 cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="absolute right-4 p-4 rounded-full bg-white/10 text-white transition-all border border-white/15 cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Lightbox Bottom Thumbnail List */}
            <div className="flex gap-2.5 mt-8 overflow-x-auto max-w-full px-6 py-2 scrollbar-hide">
              {property.images.map((img: { url: string; blurUrl: string }, idx: number) => (
                <button
                  key={idx}
                  onClick={() => selectImage(idx)}
                  className="relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border border-white/10 cursor-pointer"
                >
                  {/* Blur placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${img.blurUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(6px)",
                      transform: "scale(1.1)",
                    }}
                  />
                  <img
                    src={img.url}
                    alt=""
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                      idx === activeImageIndex ? "opacity-100" : "opacity-40 hover:opacity-60"
                    )}
                  />
                  {idx === activeImageIndex && (
                    <motion.div
                      layoutId="lightboxActiveThumbBorder"
                      className="absolute inset-0 border-2 border-primary rounded-lg"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}