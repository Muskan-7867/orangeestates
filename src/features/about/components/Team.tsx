import { Users } from "lucide-react";
import type { RefObject } from "react";
import BlurImage from "#/components/ui/BlurImage";


const team = [
  {
    name:"Anil Verma",
    role: "Founder & CEO",
    img: "/people2.webp",
  },
  {
    name: "Adam El Adam",
    role: "Founder & Managing Director",
    img: "/people1.webp",
  },

];

export default function Team({teamRef}: {teamRef:RefObject<HTMLDivElement | null> }) {

    
    return (
      <section className="py-20 sm:py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-20">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4">
              The People
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl ">
              Meet Our Channel Partners
            </h2>
          </div>

          <div ref={teamRef} className="flex justify-center  gap-6">
            {team.map((person) => (
              <div key={person.name} className="team-card group relative overflow-hidden">
                <div className="overflow-hidden h-80">
                  <BlurImage
                    src={person.img}
                    alt={person.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="bg-white px-5 py-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-base text-[#0B2A57]">{person.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 tracking-wide">{person.role}</p>
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white">
                    <Users size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}