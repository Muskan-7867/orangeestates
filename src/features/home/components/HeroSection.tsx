import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        image.current,
        {
          scale: 1,
        },
        {
          scale: 0.8,
          ease: "power1.out",
          duration: 0.5,
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: false,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section ref={container} className="min-h-[80vh] p-8">
      <div
        ref={image}
        className="h-[80vh] overflow-hidden rounded-2xl w-full"
      >
        <img
          className="object-cover h-full w-full"
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
        />
      </div>
    </section>
  );
}