import { cn } from "#/lib/utils";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocation } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SearchBar() {
    const [isFocused, setIsFocused] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const location = useLocation();
    const pathname = location.pathname.replace(/\/$/, "") || "/";
    const isHomePage =
        pathname === "/" ||
        pathname === "/_user" ||
        pathname === "/_user/";

    // ── Outside-click ──
    useEffect(() => {
        function handleOutSideClick(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleOutSideClick);
        return () => document.removeEventListener("mousedown", handleOutSideClick);
    }, []);

    // ── GSAP: exit UP when scrolled past hero, return when scrolling back ──
    useGSAP(() => {
        if (!isHomePage || !wrapperRef.current) return;

        const el = wrapperRef.current;
        const threshold = window.innerHeight * 0.75;
        let isHidden = false;

        // Set initial state based on current scroll (e.g. on page refresh mid-scroll)
        if (window.scrollY > threshold) {
            gsap.set(el, { y: -60, opacity: 0, pointerEvents: "none" });
            isHidden = true;
        }

        const trigger = ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate(self) {
                const scrollPos = self.scroll();
                const shouldHide = scrollPos > threshold;
                if (shouldHide === isHidden) return;
                isHidden = shouldHide;

                if (shouldHide) {
                    // Fly the bar UP and out
                    gsap.to(el, {
                        y: -60,
                        opacity: 0,
                        duration: 0.45,
                        ease: "power2.in",
                        overwrite: true,
                        onComplete: () => {
                            gsap.set(el, { pointerEvents: "none" });
                        },
                    });
                } else {
                    // Fly back DOWN into navbar
                    gsap.set(el, { pointerEvents: "auto" });
                    gsap.to(el, {
                        y: 0,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power3.out",
                        overwrite: true,
                    });
                }
            },
        });

        return () => trigger.kill();
    }, [isHomePage, pathname]);

    return (
        <div ref={wrapperRef} className="hidden lg:block">
            <div
                onClick={() => setIsFocused(true)}
                className={cn(
                    "bg-linear-to-b from-white to-gray-200 rounded-full px-4 py-2 shadow1 backdrop-blur-2xl border border-white flex justify-between items-center",
                    isFocused ? "scale-105 transition-all duration-300" : ""
                )}
            >
                <input
                    placeholder="search properties...."
                    className="focus:outline-none text-black w-68 text-sm"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.489 17.5497C14.8753 18.922 12.7843 19.75 10.5 19.75C5.39137 19.75 1.25 15.6086 1.25 10.5C1.25 5.39137 5.39137 1.25 10.5 1.25C15.6086 1.25 19.75 5.39137 19.75 10.5C19.75 12.7843 18.922 14.8753 17.5497 16.489L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L16.489 17.5497ZM2.75 10.5C2.75 6.21979 6.21979 2.75 10.5 2.75C14.7802 2.75 18.25 6.21979 18.25 10.5C18.25 12.589 17.4235 14.485 16.0796 15.8788C16.0408 15.905 16.004 15.9353 15.9697 15.9697C15.9353 16.004 15.905 16.0408 15.8788 16.0796C14.485 17.4235 12.589 18.25 10.5 18.25C6.21979 18.25 2.75 14.7802 2.75 10.5Z" fill="currentColor" />
                </svg>
            </div>
        </div>
    );
}

export default SearchBar;