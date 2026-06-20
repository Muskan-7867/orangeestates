import { cn } from "#/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const images = [
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
    { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { src: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914" },
    { src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" },
    { src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be" },
];

const blurLayers = [
    { blur: "16.0px", mask: "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 0%, #000 10%, rgba(0,0,0,0) 30%)" },
    { blur: "9.9px", mask: "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 10%, #000 20%, rgba(0,0,0,0) 40%)" },
    { blur: "5.8px", mask: "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 20%, #000 30%, rgba(0,0,0,0) 50%)" },
    { blur: "3.1px", mask: "linear-gradient(to right, rgba(0,0,0,0) 10%, #000 30%, #000 40%, rgba(0,0,0,0) 60%)" },
    { blur: "1.6px", mask: "linear-gradient(to right, rgba(0,0,0,0) 20%, #000 40%, #000 50%, rgba(0,0,0,0) 70%)" },
    { blur: "0.7px", mask: "linear-gradient(to right, rgba(0,0,0,0) 30%, #000 50%, #000 60%, rgba(0,0,0,0) 80%)" },
    { blur: "0.3px", mask: "linear-gradient(to right, rgba(0,0,0,0) 40%, #000 60%, #000 70%, rgba(0,0,0,0) 90%)" },
    { blur: "0.1px", mask: "linear-gradient(to right, rgba(0,0,0,0) 50%, #000 70%, #000 80%, rgba(0,0,0,0) 100%)" },
    { blur: "0.0px", mask: "linear-gradient(to right, rgba(0,0,0,0) 60%, #000 80%, #000 90%, rgba(0,0,0,0) 100%)" },
    { blur: "0.0px", mask: "linear-gradient(to right, rgba(0,0,0,0) 70%, #000 90%, #000 100%, rgba(0,0,0,0) 100%)" },
];

export default function ScrollImages() {
    const sectionref = useRef<HTMLDivElement>(null);
    const imagesref = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.to(imagesref.current, {
            x: "-50%",
            ease: "none",
            scrollTrigger: {
                trigger: sectionref.current,
                start: "top top",
                end: "+=2000",
                scrub: true,
                pin: true,
            },
        });
    });

    return (
        <section
            ref={sectionref}
            className="h-[80vh] w-full flex items-center relative overflow-hidden"
        >

            {/* <div className="absolute left-0 top-0 h-full w-[71%] flex items-center ps-20 pe-12 z-10 pointer-events-none">


   
                <div className="smooth-blur">
                    {blurLayers.map((layer, i) => (
                        <div
                            key={i}
                            style={
                                {
                                    "--blur": layer.blur,
                                    "--mask": layer.mask,
                                } as React.CSSProperties
                            }
                        />
                    ))}
                </div>
                <div className="absolute inset-0  h-full flex items-center ps-20 pe-12 z-10 pointer-events-none">
                    <h1 className="text-7xl text-nowrap font-extrabold leading-tight">
                        Lorem ipsum dolor <br /> sit amet.
                    </h1>
                </div>
            </div> */}

            {/* Left overlay */}
            <div className="absolute left-0 top-0 h-full w-[65%] z-20 flex items-center px-28">
                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" />

                {/* Progressive blur */}
                <div className="smooth-blur">
                    {blurLayers.map((layer, i) => (
                        <div
                            key={i}
                            style={
                                {
                                    "--blur": layer.blur,
                                    "--mask": layer.mask,
                                } as React.CSSProperties
                            }
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="relative max-w-3xl px-20 z-10 ">
                    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium tracking-wide uppercase">
                        Luxury Living
                    </span>

                    <h1 className="mt-6 text-7xl font-black leading-[0.95] tracking-tight text-black">
                        Find your
                        <br />
                        dream home.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-black/70">
                        Explore exclusive properties, modern architecture, and
                        beautiful spaces designed for contemporary living.
                    </p>

                    <div className="mt-10 flex gap-4">
                        <button className="rounded-full bg-black px-8 py-4 text-white font-medium transition hover:scale-105">
                            Explore Homes
                        </button>

                        <button className="rounded-full border border-black/20 bg-white/70 backdrop-blur px-8 py-4 font-medium transition hover:bg-white">
                            Learn More
                        </button>
                    </div>

                    <div className="mt-16 flex gap-12">
                        <div>
                            <h3 className="text-3xl font-bold">500+</h3>
                            <p className="text-black/60">Properties</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold">25+</h3>
                            <p className="text-black/60">Cities</p>
                        </div>

                        <div>
                            <h3 className="text-3xl font-bold">10k+</h3>
                            <p className="text-black/60">Happy Clients</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrolling images strip */}
            <div
                ref={imagesref}
                className="flex gap-4 h-full w-full py-24 items-center"
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={cn(
                            "w-[250px] h-[400px] shrink-0 overflow-hidden rounded-[28px]",
                            index % 2 === 0 ? "translate-y-12" : "-translate-y-12",
                            index === 0 ? "ml-200" : ""
                        )}
                    >
                        <img
                            src={image.src}
                            alt={`House ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-4/12 bg-gradient-to-b from-transparent to-black/80 flex items-end p-4">
                            <div>
                                <h4 className="text-white text-xl font-medium italic">
                                    Signal Bloom
                                </h4>
                                <p className="text-sm text-white/90">
                                    Lorem ipsum dolor sit amet.
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}