import { ChartColumnIncreasing, KeyRound, Landmark, Scale } from "lucide-react";

const reasons = [
    {
        icon: Landmark,
        title: "Established Expertise",
        description:
            "With over two decades navigating the UK property market, our advisors bring unrivalled local knowledge across London, Surrey, and beyond.",
    },
    {
        icon: KeyRound,
        title: "Exclusive Off-Market Access",
        description:
            "Gain privileged access to properties never listed publicly — from Mayfair penthouses to countryside estates, sourced through our private network.",
    },
    {
        icon: Scale,
        title: "End-to-End Legal Support",
        description:
            "From offer to completion, our in-house solicitors and conveyancers ensure a seamless, stress-free transaction every step of the way.",
    },
    {
        icon: ChartColumnIncreasing,
        title: "Data-Driven Valuations",
        description:
            "Our proprietary pricing models, backed by live market data, ensure you buy or sell at precisely the right price — never leaving money on the table.",
    },
];

const stats = [
    { value: "£4.2B+", label: "Property Sold" },
    { value: "12,000+", label: "Happy Clients" },
    { value: "40", label: "UK Offices" },
    { value: "25 Yrs", label: "In the Market" },
];

export default function WhyChooseUs() {
    return (
        <section className="py-12 bg-white">
            <div className="w-full px-6 lg:px-18 ">
                {/* Section label */}
                <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gray-400 text-center">
                    Why Choose Us
                </p>

                {/* Heading */}
                <h2 className="font-serif text-4xl md:text-5xl text-center text-black leading-tight max-w-2xl mx-auto">
                    The Gold Standard in UK Property
                </h2>

                <p className="mt-5 text-center text-gray-500 max-w-xl mx-auto leading-relaxed">
                    Trusted by buyers, sellers, and landlords across Britain for over
                    two decades. Here's what sets us apart.
                </p>

                {/* Main layout: image left, cards right */}
                <div className="mt-16 grid gap-8 lg:grid-cols-2 items-stretch">
                    {/* Left — image + stats overlay */}
                    <div className="relative rounded-2xl overflow-hidden min-h-[500px]">
                        <img
                            src="https://sothebysrealty.co.uk/cdn-cgi/image/format=auto,width=600,height=500,fit=cover,quality=75/https://uk-media.s3.amazonaws.com/Listing_s3/UK-S-07678_img_4243hero.jpg.jpeg"
                            alt="Luxury UK property"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                 

                   
                    </div>

                    {/* Right — reason cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {reasons.map((reason) => (
                            
                            <div
                                key={reason.title}
                                className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-[#fafafa] p-7 transition-all duration-300 "
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/8 text-black">
                                    <reason.icon size={22} strokeWidth={1.5} />
                                </div>

                                <h3 className="font-serif text-lg text-black leading-snug">
                                    {reason.title}
                                </h3>

                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {reason.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="bg-black text-white px-10 py-4 text-sm tracking-wide  transition rounded-sm">
                        Find Your Property
                    </button>
              
                </div>
            </div>
        </section>
    );
}
