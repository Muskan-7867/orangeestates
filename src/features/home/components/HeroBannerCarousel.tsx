import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "@tanstack/react-router";
import { Search, Sparkles } from "lucide-react";
import { SLIDES } from "#/constants";

gsap.registerPlugin(ScrollTrigger);


export default function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // DOM Refs
  const heroRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInnerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Custom Cursor Refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);

  // Slide layers and videos
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // State refs
  const transitioning = useRef(false);
  const currentRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  // Navigation and Search State
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"buy" | "rent" | "sold" | "new-homes">("buy");
  const [searchMode, setSearchMode] = useState<"classic" | "ai">("classic");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const targetRoute = activeTab === "sold" ? "/properties" : `/properties/${activeTab}`;
    navigate({
      to: targetRoute as any,
      search: { q: searchQuery } as any,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // ── 1. CUSTOM CURSOR & MOUSE ROTATE 
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Custom cursor follow mouse
    const onMouseMove = (e: MouseEvent) => {
      // Normalize coordinate for rotate
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;

      const target = e.target as HTMLElement | null;

      // Disable custom cursor inside search content or outside hero
      if (!target?.closest("#hero") || target?.closest(".no-custom-cursor")) {
        gsap.set(dot, { opacity: 0 });
        gsap.set(ring, { opacity: 0 });
        document.body.style.cursor = "auto";
        return;
      }

      gsap.set(dot, { opacity: 1 });
      gsap.set(ring, { opacity: 1 });
      document.body.style.cursor = "none";

      // Track cursor position
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power2.out",
      });

      const isHoverable = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      if (isHoverable) {
        gsap.to(ring, {
          scale: 1.5,
          borderColor: "rgba(255, 255, 255, 0.8)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          duration: 0.2,
        });
        gsap.to(dot, {
          scale: 0,
          duration: 0.15,
        });
      } else {
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(255, 255, 255, 0.4)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          duration: 0.2,
        });
        gsap.to(dot, {
          scale: 1,
          duration: 0.15,
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Dynamic rotation of video based on mouse
    const rotateLoop = () => {
      // Interpolate towards target rotation
      mouseTarget.current.x += (mouse.current.x - mouseTarget.current.x) * 0.08;
      mouseTarget.current.y += (mouse.current.y - mouseTarget.current.y) * 0.08;

      if (videoContainerRef.current) {
        gsap.set(videoContainerRef.current, {
          rotateY: mouseTarget.current.x * 5,
          rotateX: -mouseTarget.current.y * 5,
          x: mouseTarget.current.x * 12,
          y: mouseTarget.current.y * 12,
        });
      }

      // Content follows cursor with a slight delay/lag
      if (contentRef.current) {
        gsap.set(contentRef.current, {
          x: mouseTarget.current.x * 20,
          y: mouseTarget.current.y * 15,
        });
      }

      requestAnimationFrame(rotateLoop);
    };
    const loopId = requestAnimationFrame(rotateLoop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(loopId);
    };
  }, []);

  // ── 2. INITIAL ENTRANCE ANIMATION 
  useGSAP(() => {
    // Setup initial positions
    layerRefs.current.forEach((layer, i) => {
      gsap.set(layer, { opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 });
    });
    gsap.set(videoRefs.current[0], { scale: 1.15 });

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => setIsReady(true),
    });

    // Fade-in background video and scale to normal
    tl.to(videoRefs.current[0], { scale: 1.05, duration: 2.2, ease: "power3.out" }, 0);
    tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0);

    // Stagger navigation items drop in
    tl.fromTo(navRef.current, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.4);

    // Fade-in and slide-up the central content
    if (contentInnerRef.current) {
      tl.fromTo(
        contentInnerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" },
        0.5
      );
    }


  }, []);

 // ── 4. DIAGONAL SLIDE CAROUSEL TRANSITION 
  const goTo = useCallback((nextIdx: number) => {
    if (transitioning.current || nextIdx === currentRef.current) return;
    transitioning.current = true;

    const prevIdx = currentRef.current;
    const prevLayer = layerRefs.current[prevIdx];
    const nextLayer = layerRefs.current[nextIdx];
    const prevVid = videoRefs.current[prevIdx];
    const nextVid = videoRefs.current[nextIdx];

    if (!prevLayer || !nextLayer) return;

    // Setup next layer in top-right diagonal position
    gsap.set(nextLayer, {
      opacity: 1,
      zIndex: 5,
      x: "100%",
      y: "-100%",
    });
    gsap.set(prevLayer, { zIndex: 4 });

    if (nextVid) {
      nextVid.currentTime = 0;
      gsap.set(nextVid, { scale: 1.15 });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        currentRef.current = nextIdx;
        setCurrent(nextIdx);
        gsap.set(prevLayer, { opacity: 0, zIndex: 1, x: "0%", y: "0%" });
        transitioning.current = false;

        if (prevVid) prevVid.pause();
        if (nextVid) nextVid.play().catch(() => { });

        // Re-reveal letters for the new slide title
        gsap.fromTo(
          ".char-fly",
          { opacity: 0, scale: 0.6, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.02 }
        );
      },
    });

    // Diagonally slide next layer in, slide prev layer out
    tl.to(nextLayer, { x: "0%", y: "0%", duration: 1.1, ease: "power4.inOut" }, 0);
    tl.to(prevLayer, { x: "-100%", y: "100%", duration: 1.1, ease: "power4.inOut" }, 0);

    // Settle next video scale
    if (nextVid) {
      tl.to(nextVid, { scale: 1.05, duration: 1.4, ease: "power3.out" }, 0.2);
    }
  }, []);

  const goNext = useCallback(() => goTo((currentRef.current + 1) % SLIDES.length), [goTo]);
  const goPrev = useCallback(() => goTo((currentRef.current - 1 + SLIDES.length) % SLIDES.length), [goTo]);
// ── Swipe 
  const dragX = useRef<number | null>(null);
  const onPD = (e: React.PointerEvent) => { dragX.current = e.clientX; };
  const onPU = (e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const d = dragX.current - e.clientX;
    if (Math.abs(d) > 60) d > 0 ? goNext() : goPrev();
    dragX.current = null;
  };


  return (
    <div
      ref={heroRef}
      id="hero"
      className="relative overflow-hidden w-full select-none h-[75vh] md:h-[100vh] min-h-[580px] md:min-h-[750px]"
      style={{ background: "#060507" }}
      onPointerDown={onPD}
      onPointerUp={onPU}
    >
      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full flex items-center justify-center"
        style={{
          width: 44,
          height: 44,
          border: "1px solid rgba(255, 255, 255, 0.4)",
          transform: "translate(-50%, -50%)",
          zIndex: 999,
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      >
        <span
          ref={cursorTextRef}
          className="opacity-0 font-sans font-bold text-[8px] tracking-[0.2em] text-[#fff]"
        />
      </div>

      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full bg-[#f57b23]"
        style={{
          width: 6,
          height: 6,
          transform: "translate(-50%, -50%)",
          zIndex: 1000,
          willChange: "transform",
        }}
      />

      {/*  VIDEO BACKGROUND (ROTATES ON MOUSE)  */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 w-full h-full transform-gpu"
        style={{
          willChange: "transform",
          perspective: 1200,
        }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => { layerRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ opacity: 0, zIndex: 1 }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              src={s.video}
              autoPlay={i === 0}
              muted
              playsInline
              onEnded={goNext}
              preload={i === 0 ? "auto" : "metadata"}
              className="absolute inset-0 w-full h-full object-cover scale-[1.08]"
              style={{ willChange: "transform" }}
            />
          </div>
        ))}
      </div>


      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none bg-black"
        style={{ zIndex: 4, opacity: 0 }}
      />

      {/*  CENTRAL CONTENT CONTAINER (Glassy Search Bar + Headers) */}
      <div
        ref={contentRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none  no-custom-cursor"
        style={{ zIndex: 10 }}
      >
        <div
          ref={contentInnerRef}
          className="w-full max-w-5xl px-4 text-center pointer-events-auto mt-[-4vh]"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white mb-2 leading-tight">
            <span className="text-primary">Discover</span> where life begins
          </h1>

          <p className="text-sm sm:text-lg md:text-xl font-medium text-white/95 mb-6 md:mb-8 tracking-wide">
            Find exceptional homes crafted for every chapter of your life.
          </p>

          {/* Glassy Search Box */}
          <div className="w-full bg-[#030214]/65 backdrop-blur-xl border border-white/10  p-4 sm:p-5 md:p-6  flex flex-col gap-4 text-left">
            {/* Top Bar inside Search Box */}
            <div className="flex flex-row items-center justify-center border-b border-white/10 pb-3">
              {/* Tabs */}
              <div className="flex gap-4 sm:gap-6 md:gap-8">
                {(["buy", "rent", "new-homes", "sold"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative pb-2 text-xs sm:text-sm md:text-base font-semibold capitalize tracking-wide transition-colors cursor-pointer ${activeTab === tab ? "text-white" : "text-white/60 hover:text-white/80"
                      }`}
                  >
                    {tab === "new-homes" ? "new homes" : tab}
                    {activeTab === tab && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full transition-all duration-300" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Label */}
            <div className="text-white/90 text-xs sm:text-sm font-medium">
              {searchMode === "ai" ? (
                <span>Describe your dream home in plain English...</span>
              ) : (
                <span>Search properties to {activeTab}</span>
              )}
            </div>

            {/* Form Input Row */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-4 text-slate-400 pointer-events-none" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    searchMode === "ai"
                      ? "e.g., A 3-bed modern villa in Beverly Hills with a pool and sea view"
                      : activeTab === "buy"
                        ? "Bath, NW3, or Leeds station"
                        : activeTab === "rent"
                          ? "Enter city, postcode or area to rent..."
                          : "Enter location for sold prices..."
                  }
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 md:py-4 bg-white text-slate-900 placeholder-slate-400 focus:outline-none text-xs sm:text-sm md:text-base font-medium shadow-inner select-text cursor-text"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-primary/95 active:scale-[0.98] text-white font-bold px-6 sm:px-8 py-3 sm:py-3.5 md:py-4 transition-all shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base shrink-0 cursor-pointer"
              >
                {searchMode === "ai" && <Sparkles size={16} />}
                Search
              </button>
            </div>
          </div>
        </div>
      </div>




      {/* BOTTOM CONTROL STRIP (CIRCULAR SVG PROGRESS)
     */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end justify-between"
        style={{
          zIndex: 40,
          padding: "0 clamp(20px, 4vw, 52px) clamp(20px, 3.5vw, 36px)",
          pointerEvents: "none",
        }}
      >
        {/* Left: Navigation triggers */}
        <div />



        {/* Center: Slide indicator dots */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: i === current ? "#f57b23" : "rgba(255, 255, 255, 0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "background 0.3s",
              }}

            />
          ))}
        </div>

        {/* Right: SVG Circular Autoplay Progress */}
        <div />

      </div>
    </div>
  );
}
