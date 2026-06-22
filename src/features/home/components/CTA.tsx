export default function CTA() {
    return (
        <section className="relative overflow-hidden bg-[#0A1628D3] py-24 lg:py-32">
            {/* Background image with overlay */}
            <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover opacity-20"
            />

            {/* Subtle gradient vignette */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/10 via-transparent to-[#0a1628]/40" /> */}

            {/* Decorative ring */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-white/5" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[900px] w-[900px] rounded-full border border-white/5" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                {/* Eyebrow */}
                <p className="mb-5 text-xs uppercase tracking-[0.4em] text-white/50">
                    Start Your Journey
                </p>

                {/* Heading */}
                <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">
                    Find the Home You've{" "}
                    <span className="italic text-white/70">Always Imagined</span>
                </h2>

                {/* Subtext */}
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60">
                    Whether you're buying, selling, or letting — our expert advisors are
                    ready to guide you through every step of your property journey across
                    the UK.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="w-full sm:w-auto bg-white text-[#0a1628] px-10 py-4 text-sm font-semibold tracking-wide transition hover:bg-white/90 rounded-sm">
                        Browse Properties
                    </button>
                    <button className="w-full sm:w-auto border border-white/30 text-white px-10 py-4 text-sm tracking-wide transition hover:bg-white/10 rounded-sm">
                        Speak to an Advisor
                    </button>
                </div>

                {/* Trust line */}
                <p className="mt-10 text-xs text-white/30 tracking-wide">
                    Trusted by over 12,000 clients across the UK &nbsp;·&nbsp; Est. 2001
                </p>
            </div>
        </section>
    );
}
