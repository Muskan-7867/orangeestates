import {  type RefObject } from "react";

const BLUR_URL = "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=20&q=10";

export default function AboutHero({
    heroRef,
    heroImgRef,
    heroTextRef
}:{
    heroRef:RefObject<HTMLDivElement | null>;
    heroImgRef:React.RefObject<HTMLDivElement | null>;
    heroTextRef:React.RefObject<HTMLDivElement | null>;
}){
    
    return (
            <section
                ref={heroRef}
                className="relative h-[70vh] flex items-end overflow-hidden px-2 sm:px-28"
              >
                {/* Parallax image */}
                <div ref={heroImgRef} className="absolute inset-0 scale-110">
                  {/* Blur placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${BLUR_URL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(12px)",
                      transform: "scale(1.1)",
                    }}
                  />
                  <img
                    src="/about-hero.jpg"
                    alt="Orange Estate luxury property"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />
                </div>
        
                {/* Text */}
                <div ref={heroTextRef} className="relative z-10 px-6   pb-16 sm:pb-20 max-w-5xl">
                  <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-orange-300 mb-4 font-medium">
                    Est. 1999 · London, UK
                  </p>
                  <h1 className="font-serif text-2xl sm:text-6xl text-white leading-none mb-6">
                    Crafting Legacies in Property
                  </h1>
                  <p className="text-white/75 text-xs sm:text-lg max-w-xl leading-relaxed">
                    For over two decades, Orange Estate has been the trusted partner
                    of those who demand more from their property journey.
                  </p>
                </div>
        
         
              </section>
        
    )
}
