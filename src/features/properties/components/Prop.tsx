import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

// SVG path data for each letter (clean sans-serif style, viewBox 0 0 ~7 9)
const letterPaths = {
    // "L"
    L: {
        d: "M-5.48363e-06 8.72728V6.67572e-06H1.05681V7.78978H5.11363V8.72728H-5.48363e-06Z",
        vw: "0 0 6 9",
        w: 6,
    },
    // "u"
    u: {
        d: "M5.72727 6.67572e-06H6.78409V5.77842C6.78409 6.37501 6.64346 6.90768 6.36221 7.37643C6.0838 7.84234 5.69034 8.21023 5.18181 8.48012C4.67329 8.74717 4.0767 8.88069 3.39204 8.88069C2.70738 8.88069 2.11079 8.74717 1.60227 8.48012C1.09374 8.21023 0.698858 7.84234 0.417608 7.37643C0.139199 6.90768 -5.48363e-06 6.37501 -5.48363e-06 5.77842V6.67572e-06H1.05681V5.69319C1.05681 6.11933 1.15056 6.49859 1.33806 6.83097C1.52556 7.16052 1.79261 7.42046 2.1392 7.6108C2.48863 7.7983 2.90624 7.89205 3.39204 7.89205C3.87784 7.89205 4.29545 7.7983 4.64488 7.6108C4.99431 7.42046 5.26136 7.16052 5.44602 6.83097C5.63352 6.49859 5.72727 6.11933 5.72727 5.69319V6.67572e-06Z",
        vw: "0 0 9.5 9",
        w: 9.5,
    },
    // "x"
    x: {
        d: "M1.24431 6.67572e-06L3.49431 3.63069H3.5625L5.8125 6.67572e-06H7.05681L4.3125 4.36364L7.05681 8.72728H5.8125L3.5625 5.16478H3.49431L1.24431 8.72728H-4.15742e-06L2.8125 4.36364L-4.15742e-06 6.67572e-06H1.24431Z",
        vw: "0 0 7 9",
        w: 7,
    },
    // "u" (second u in luxury)
    // reuse above

    ui: {
        d: "M5.72727 6.67572e-06H6.78409V5.77842C6.78409 6.37501 6.64346 6.90768 6.36221 7.37643C6.0838 7.84234 5.69034 8.21023 5.18181 8.48012C4.67329 8.74717 4.0767 8.88069 3.39204 8.88069C2.70738 8.88069 2.11079 8.74717 1.60227 8.48012C1.09374 8.21023 0.698858 7.84234 0.417608 7.37643C0.139199 6.90768 -5.48363e-06 6.37501 -5.48363e-06 5.77842V6.67572e-06H1.05681V5.69319C1.05681 6.11933 1.15056 6.49859 1.33806 6.83097C1.52556 7.16052 1.79261 7.42046 2.1392 7.6108C2.48863 7.7983 2.90624 7.89205 3.39204 7.89205C3.87784 7.89205 4.29545 7.7983 4.64488 7.6108C4.99431 7.42046 5.26136 7.16052 5.44602 6.83097C5.63352 6.49859 5.72727 6.11933 5.72727 5.69319V6.67572e-06Z",
        vw: "0 0 9.5 9",
        w: 9.5,
    },

    // "r"
    r: {
        d: "M-5.48363e-06 8.72728V6.67572e-06H2.94886C3.63068 6.67572e-06 4.19034 0.116484 4.62784 0.349438C5.06534 0.579552 5.3892 0.896313 5.59943 1.29972C5.80965 1.70313 5.91477 2.16194 5.91477 2.67614C5.91477 3.19035 5.80965 3.64631 5.59943 4.04404C5.3892 4.44177 5.06676 4.75427 4.6321 4.98154C4.19744 5.20597 3.64204 5.31819 2.9659 5.31819H0.57954V4.36364H2.93181C3.39772 4.36364 3.77272 4.29546 4.05681 4.1591C4.34374 4.02273 4.55113 3.82955 4.67897 3.57955C4.80965 3.32671 4.87499 3.02557 4.87499 2.67614C4.87499 2.32671 4.80965 2.02131 4.67897 1.75995C4.54829 1.49859 4.33948 1.29688 4.05255 1.15484C3.76562 1.00995 3.38636 0.937507 2.91477 0.937507H1.05681V8.72728H-5.48363e-06ZM4.10795 4.80682L6.25568 8.72728H5.0284L2.91477 4.80682H4.10795Z",
        vw: "0 0 4.5 9",
        w: 4.5,
    },
    // "y"
    y: {
        d: "M-5.52833e-06 6.67572e-06H1.21022L3.63068 4.07387H3.73295L6.1534 6.67572e-06H7.36363L4.21022 5.13069V8.72728H3.1534V5.13069L-5.52833e-06 6.67572e-06Z",
        vw: "0 0 7.5 9",
        w: 7.5,
    },
    // Space — no SVG, just gap
    // "L" (Living)
    // "i"
    i: {
        d: "M1.05681 6.67572e-06V8.72728H-5.48363e-06V6.67572e-06H1.05681Z",
        vw: "0 0 2 9",
        w: 2,
    },
    // "v"
    v: {
        d: "M1.10795 6.67572e-06L3.69886 7.3466H3.80113L6.39204 6.67572e-06H7.49999L4.29545 8.72728H3.20454L-5.52833e-06 6.67572e-06H1.10795Z",
        vw: "0 0 7 9",
        w: 7,
    },
    // "n"
    n: {
        d: "M6.92045 6.67572e-06V8.72728H5.89772L1.14204 1.87501H1.05681V8.72728H-5.48363e-06V6.67572e-06H1.02272L5.79545 6.86933H5.88068V6.67572e-06H6.92045Z",
        vw: "0 0 6 9",
        w: 6,
    },
    // "g"
    g: {
        d: "M6.30682 2.84659C6.21307 2.55966 6.08949 2.30255 5.93608 2.07528C5.78551 1.84517 5.60511 1.64914 5.39488 1.48721C5.1875 1.32528 4.9517 1.2017 4.6875 1.11647C4.42329 1.03125 4.13352 0.988633 3.81818 0.988633C3.30113 0.988633 2.83096 1.12216 2.40767 1.3892C1.98437 1.65625 1.64772 2.04971 1.39772 2.5696C1.14772 3.08949 1.02272 3.72727 1.02272 4.48295C1.02272 5.23863 1.14915 5.87642 1.40199 6.3963C1.65483 6.91619 1.99716 7.30966 2.42897 7.5767C2.86079 7.84375 3.34659 7.97727 3.88636 7.97727C4.38636 7.97727 4.8267 7.87074 5.20738 7.65767C5.59091 7.44176 5.8892 7.13778 6.10227 6.74574C6.31818 6.35085 6.42613 5.88636 6.42613 5.35227L6.75 5.42045H4.125V4.48295H7.44886V5.42045C7.44886 6.1392 7.29545 6.7642 6.98863 7.29545C6.68466 7.8267 6.2642 8.23863 5.72727 8.53125C5.19318 8.82102 4.57954 8.96591 3.88636 8.96591C3.11363 8.96591 2.43466 8.78409 1.84943 8.42045C1.26704 8.05682 0.812497 7.53977 0.485793 6.86932C0.161929 6.19886 -2.74181e-06 5.40341 -2.74181e-06 4.48295C-2.74181e-06 3.79261 0.0923268 3.17187 0.276986 2.62074C0.464486 2.06676 0.728691 1.59517 1.0696 1.20596C1.41051 0.816759 1.81392 0.518463 2.27983 0.311077C2.74574 0.10369 3.25852 -3.09944e-06 3.81818 -3.09944e-06C4.27841 -3.09944e-06 4.70738 0.0695992 5.10511 0.208804C5.50568 0.345167 5.86221 0.539769 6.17471 0.79261C6.49005 1.04261 6.75284 1.34233 6.96307 1.69176C7.17329 2.03835 7.31818 2.42329 7.39772 2.84659H6.30682Z",
        vw: "0 0 7 9",
        w: 7,
    },
};

// Word 1: L-u-x-u-r-y, Word 2: L-i-v-i-n-g
const word1Letters = [
    { key: "L1", ...letterPaths.L },
    { key: "u1", ...letterPaths.u },
    { key: "x1", ...letterPaths.x },
    { key: "u2", ...letterPaths.u },
    { key: "r1", ...letterPaths.r },
    { key: "y1", ...letterPaths.y },
];

const word2Letters = [
    { key: "L2", ...letterPaths.L },
    { key: "i1", ...letterPaths.i },
    { key: "v1", ...letterPaths.v },
    { key: "i2", ...letterPaths.i },
    { key: "n1", ...letterPaths.n },
    { key: "g1", ...letterPaths.g },
];

export default function PropHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRefs = useRef<(SVGPathElement | null)[]>([]);

    useGSAP(() => {
        const paths = pathRefs.current.filter(Boolean) as SVGPathElement[];
        if (!paths.length) return;

        paths.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
                fill: "transparent",
            });
        });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

        // Phase 1: Draw strokes
        tl.to(paths, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power2.inOut",
            stagger: 0.12,
        })
        // Phase 2: Fill white (overlaps with draw end)
        .to(
            paths,
            {
                fill: "#ffffff",
                duration: 1.5,
                ease: "power2.out",
                stagger: 0.1,
            },
            "-=1.5"
        )
        // Phase 3: Hold briefly, then fade fill back out
        .to(paths, {
            fill: "transparent",
            duration: 1.2,
            ease: "power2.in",
            stagger: { each: 0.08, from: "end" },
        }, "+=0.6")
        // Phase 4: Un-draw strokes (reverse stagger)
        .to(paths, {
            strokeDashoffset: (i: number, target: SVGPathElement) => target.getTotalLength(),
            duration: 2,
            ease: "power2.inOut",
            stagger: { each: 0.1, from: "end" },
        }, "-=0.8");
    }, { scope: containerRef });

    const allLetters = [...word1Letters, ...word2Letters];

    return (
        <div
            ref={containerRef}
            className="relative h-[80vh] w-full overflow-hidden"
        >
            <video
                className="h-full w-full object-cover"
                src="https://ik.imagekit.io/p8eiybmze/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4?updatedAt=1784177738994"
                autoPlay
                muted
                loop
                playsInline
            />

            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-16">
                {/* LUXURY */}
                <div className="flex items-end gap-0.5 sm:gap-1 md:gap-1.5">
                    {word1Letters.map((letter, idx) => (
                        <svg
                            key={letter.key}
                            className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                            viewBox={letter.vw}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d={letter.d}
                                ref={(el) => { pathRefs.current[idx] = el; }}
                                style={{
                                    stroke: "white",
                                    strokeWidth: "0.15",
                                    fill: "transparent",
                                }}
                            />
                        </svg>
                    ))}
                </div>

                {/* LIVING */}
                <div className="flex items-end gap-0.5 ">
                    {word2Letters.map((letter, idx) => (
                        <svg
                            key={letter.key}
                            className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20"
                            viewBox={letter.vw}
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d={letter.d}
                                ref={(el) => { pathRefs.current[word1Letters.length + idx] = el; }}
                                style={{
                                    stroke: "white",
                                    strokeWidth: "0.15",
                                    fill: "transparent",
                                }}
                            />
                        </svg>
                    ))}
                </div>
            </div>
        </div>
    );
}
