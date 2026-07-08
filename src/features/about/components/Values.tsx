import { Globe, Heart, Shield, Star } from "lucide-react";
import type { RefObject } from "react";

const values = [
    {
        icon: Shield,
        title: "Integrity First",
        desc: "Every transaction is guided by honesty, transparency, and unwavering ethical standards.",
    },
    {
        icon: Star,
        title: "Excellence",
        desc: "We pursue perfection in every detail — from first consultation to final handover.",
    },
    {
        icon: Heart,
        title: "Client Obsession",
        desc: "Your ambitions shape our strategy. We listen deeply and act decisively.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        desc: "Local expertise backed by an international network spanning 30 countries.",
    },
];


export default function Values({ valuesRef}: {valuesRef:RefObject<HTMLDivElement | null> } ) {

 return (




    <section className="bg-bg py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-32">
            <div className="text-center mb-14">
                <p className="text-xs uppercase tracking-[0.35em] text-orange-500 mb-4">
                    Our Values
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
                    Principles That Define Us
                </h2>
            </div>

            <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {values.map((v) => {
                    const Icon = v.icon;
                    return (
                        <div
                            key={v.title}
                            className=" bg-white p-7 border  border-gray-100  transition-all duration-300 "
                        >
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-50 text-orange-500 mb-5  transition-colors duration-300 mx-auto">
                                <div className="w-full h-full flex justify-center items-center">
                                    <Icon size={20} strokeWidth={1.5} />

                                </div>

                            </div>
                            <h3 className="font-serif text-lg mb-3 text-center">{v.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed text-center">{v.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
 )
 
}