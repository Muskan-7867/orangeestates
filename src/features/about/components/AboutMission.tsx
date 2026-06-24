import { Award, Home, MapPin, TrendingUp } from "lucide-react";
import { useRef } from "react";

export default function AboutMission() {
      const missionRef = useRef<HTMLDivElement>(null);
    
  return (
      <section className="py-20 sm:py-28 px-6 sm:px-12 lg:px-20 w-full mx-auto">
        <div ref={missionRef} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-orange-500 mb-5">
              Our Mission
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-6">
              Where Vision Meets Property Expertise
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              At Orange Estate, we believe a home is more than a transaction — it is
              the foundation of a life story. Our mission is to connect discerning
              clients with extraordinary properties, guided by deep market knowledge,
              personal attention, and an uncompromising commitment to excellence.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From historic country houses to contemporary city penthouses, we navigate
              every nuance of the UK property landscape so you don't have to.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { icon: Home, label: "10k+ Properties Listed" },
                { icon: MapPin, label: "40 UK Locations" },
                { icon: TrendingUp, label: "97% Client Satisfaction" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm"
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <img
              src="/about-team.jpg"
              alt="Our team"
              className="w-full h-[420px] object-cover rounded-sm shadow-xl"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 bg-[#0B2A57] text-white px-6 py-4 shadow-xl">
              <p className="font-serif text-2xl text-orange-400">25+</p>
              <p className="text-xs uppercase tracking-widest text-white/70 mt-1">Years Experience</p>
            </div>
            {/* Award badge */}
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full shadow-xl">
              <Award size={22} />
            </div>
          </div>
        </div>
      </section>

  )
}