import { Users } from "lucide-react";
import type { RefObject } from "react";


const team = [
  {
    name: "Eleanor Whitfield",
    role: "Chief Executive Officer",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "James Harrington",
    role: "Head of Acquisitions",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Sophia Chen",
    role: "Director of Client Relations",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
  },
];

export default function Team({teamRef}: {teamRef:RefObject<HTMLDivElement | null> }) {

    
    return (
      <section className="py-20 sm:py-28 bg-[#fff7ed]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-orange-400 mb-4">
              The People
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl ">
              Meet Our Leadership
            </h2>
          </div>

          <div ref={teamRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((person) => (
              <div key={person.name} className="team-card group relative overflow-hidden">
                <div className="overflow-hidden h-80">
                  <img
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