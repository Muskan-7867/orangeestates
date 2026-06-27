export default function CTA() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-12">
            {/* Background image */}
            <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop"
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Black overlay */}
            <div className="absolute inset-0 bg-black/60" />

            {/* Optional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/10 to-black/10" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <p className="mb-5 text-xs uppercase tracking-[0.4em] text-white/50">
                    Start Your Journey
                </p>

                <h2 className="font-serif text-4xl leading-tight text-white md:text-5xl">
                    Find the Home You've{" "}
                    <span className="italic text-white/70">
                        Always Imagined
                    </span>
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70">
                    Whether you're buying, selling, or letting — our expert
                    advisors are ready to guide you through every step of your
                    property journey across the UK.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <button className="w-full sm:w-auto rounded-sm bg-white px-10 py-4 text-sm font-semibold tracking-wide text-[#0a1628] transition hover:bg-white/90">
                        Browse Properties
                    </button>

                    <button className="w-full sm:w-auto rounded-sm border border-white/30 px-10 py-4 text-sm tracking-wide text-white transition hover:bg-white/10">
                        Speak to an Advisor
                    </button>
                </div>

                <p className="mt-10 text-xs tracking-wide text-white/40">
                    Trusted by over 12,000 clients across the UK · Est. 2001
                </p>
            </div>
        </section>
    );
}