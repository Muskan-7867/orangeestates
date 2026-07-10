import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    // Desktop animated refs
    const sectionRef = useRef<HTMLDivElement>(null);
    const bridgeRef  = useRef<HTMLImageElement>(null);
    const w1 = useRef<HTMLSpanElement>(null);
    const w2 = useRef<HTMLSpanElement>(null);
    const w3 = useRef<HTMLSpanElement>(null);
    const w4 = useRef<HTMLSpanElement>(null);
    const w5 = useRef<HTMLSpanElement>(null);
    const w6 = useRef<HTMLSpanElement>(null);
    const w7 = useRef<HTMLSpanElement>(null);
    const w8 = useRef<HTMLSpanElement>(null);
    const w9 = useRef<HTMLSpanElement>(null);
    const btnRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        // gsap.matchMedia — only runs animation on desktop (≥640px)
        const mm = gsap.matchMedia();

        mm.add("(min-width: 640px)", () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=500%",
                        scrub: 1,
                        pin: true,
                        anticipatePin: 1,
                    },
                });

                tl.fromTo(bridgeRef.current,
                    { y: 300, opacity: 0, scale: 1.05 },
                    { y: 0, opacity: 1, scale: 1, ease: "power2.out", duration: 0.5 }, 0);

                tl.fromTo(w1.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.2 }, 0.5);
                tl.fromTo(w2.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.2 }, 0.65);
                tl.fromTo(w3.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.2 }, 0.80);

                tl.fromTo(w4.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 1.0);
                tl.fromTo(w5.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 1.2);
                tl.fromTo(w6.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 1.4);

                tl.fromTo(w7.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 1.65);
                tl.fromTo(w8.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 1.85);
                tl.fromTo(w9.current, { y: 90, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 2.05);

                tl.fromTo(btnRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, ease: "power3.out", duration: 0.25 }, 2.3);
            }, sectionRef);

            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    const wordStyle: React.CSSProperties = {
        display: "inline-block",
        opacity: 0,
        marginRight: "0.3em",
    };
    const goldWord: React.CSSProperties = {
        ...wordStyle,
        background: "linear-gradient(135deg, #C9976E 0%, #a07840 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap');

                /* ── Mobile layout ── */
                .hero-mobile  { display: flex; }
                .hero-desktop { display: none;  }

                @media (min-width: 640px) {
                    .hero-mobile  { display: none;  }
                    .hero-desktop { display: block; }
                }

                .hero-btn-desktop:hover {
                    transform: translateY(-2px) !important;
                    box-shadow: 0 14px 36px rgba(201,169,110,0.46) !important;
                }
            `}</style>

            {/* ══════════════════════════
                MOBILE  — static, stacked
            ══════════════════════════ */}
            <div
                className="hero-mobile"
                style={{
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    paddingTop: "2rem",
               
                }}
            >
                {/* Text block */}
                <div
                    style={{
                        textAlign: "center",
                        padding: "0 1.25rem 1.5rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "0.65rem",
                            letterSpacing: "0.38em",
                            textTransform: "uppercase",
                            color: "#c9a96e",
                            marginBottom: "0.75rem",
                            fontWeight: 400,
                        }}
                    >
                        Discover Exclusive Living
                    </p>

                    <h1
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontSize: "clamp(2rem, 8vw, 2.8rem)",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            color: "#1a1a1a",
                            margin: "0 0 1rem",
                        }}
                    >
                        Where London's Legacy
                        <br />
                        <span
                            style={{
                                background: "linear-gradient(135deg, #c9a96e 0%, #a07840 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Meets Luxury Living
                        </span>
                    </h1>

                    <a
                        href="/properties"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.45rem",
                            padding: "0.7rem 1.6rem",
                            background: "linear-gradient(135deg, #f57b23 0%, #f57b23 100%)",
                            color: "#fff",
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.85rem",
                            letterSpacing: "0.05em",
                            textDecoration: "none",
                            borderRadius: "4px",
                            boxShadow: "0 6px 20px rgba(201,169,110,0.28)",
                        }}
                    >
                        Explore Properties
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* Bridge image below text */}
                <img
                    className="imagemask"
                    src="/bridge1.png"
                    alt="Bridge"
                    style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        objectPosition: "center bottom",
                        display: "block",
                    }}
                />
            </div>

            {/* ══════════════════════════
                DESKTOP — GSAP animated
            ══════════════════════════ */}
            <div
                ref={sectionRef}
                className="hero-desktop"
                style={{
                    width: "100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <img
                    ref={bridgeRef}
                    className="imagemask"
                    src="/bridge1.png"
                    alt="Bridge"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "500px",
                        objectFit: "cover",
                        objectPosition: "center bottom",
                        pointerEvents: "none",
                        userSelect: "none",
                        zIndex: 1,
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: "500px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0 1.5rem",
                        zIndex: 2,
                    }}
                >
                    <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "clamp(0.7rem, 1.1vw, 0.9rem)",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        color: "#c9a96e",
                        marginBottom: "1rem",
                        fontWeight: 400,
                    }}>
                        <span ref={w1} style={wordStyle}>Discover</span>
                        <span ref={w2} style={wordStyle}>Exclusive</span>
                        <span ref={w3} style={{ ...wordStyle, marginRight: 0 }}>Living</span>
                    </p>

                    <h1 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        lineHeight: 1.08,
                        margin: "0 0 1.6rem",
                        padding: 0,
                    }}>
                        <span style={{ display: "block", fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#1a1a1a" }}>
                            <span ref={w4} style={wordStyle}>Where</span>
                            <span ref={w5} style={wordStyle}>London's</span>
                            <span ref={w6} style={{ ...wordStyle, marginRight: 0 }}>Legacy</span>
                        </span>
                        <span style={{ display: "block", fontSize: "clamp(2.4rem, 6vw, 4rem)" }}>
                            <span ref={w7} style={goldWord}>Meets</span>
                            <span ref={w8} style={goldWord}>Luxury</span>
                            <span ref={w9} style={{ ...goldWord, marginRight: 0 }}>Living</span>
                        </span>
                    </h1>

                    <a
                        ref={btnRef}
                        href="/properties"
                        className="hero-btn-desktop"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.82rem 2rem",
                            background: "linear-gradient(135deg, #f57b23 0%, #f57b23 100%)",
                            color: "#fff",
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            letterSpacing: "0.06em",
                            textDecoration: "none",
                            borderRadius: "4px",
                            boxShadow: "0 8px 28px rgba(201,169,110,0.3)",
                            opacity: 0,
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                    >
                        Explore Properties
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </>
    );
}