import { Clock, Mail, MapPin, Phone } from "lucide-react";


const offices = [
  {
    city: "London",
    country: "England",
    address: "14 Berkeley Square, Mayfair, London W1J 6BS",
    phone: "+44 20 7946 0958",
    email: "london@orangeestate.co.uk",
    hours: "Mon – Fri: 9:00 – 18:00",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=20&q=10",
  },
  {
    city: "Manchester",
    country: "England",
    address: "32 Deansgate, Manchester M3 4LY",
    phone: "+44 161 946 0321",
    email: "manchester@orangeestate.co.uk",
    hours: "Mon – Fri: 9:00 – 17:30",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=20&q=10",
  },
  {
    city: "Edinburgh",
    country: "Scotland",
    address: "18 Charlotte Square, Edinburgh EH2 4DF",
    phone: "+44 131 946 0512",
    email: "edinburgh@orangeestate.co.uk",
    hours: "Mon – Fri: 9:00 – 17:00",
    image: "https://images.unsplash.com/photo-1569681157374-92a0f9f7c30c?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1569681157374-92a0f9f7c30c?w=20&q=10",
  },
];
export default function OurOffices({officesRef}: {
  officesRef: React.RefObject<HTMLDivElement | null>;
}){
  
    return (
            <section className="py-16 sm:py-24 px-4 sm:px-12 lg:px-20 ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.35em] text-primary mb-3">Our Offices</p>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#0B2A57]">
                Find Us Across the UK
              </h2>
              <p className="text-sm text-gray-500 max-w-sm sm:text-right leading-relaxed">
                Visit any of our three offices or get in touch with your nearest team directly.
              </p>
            </div>
            <div className="mt-5 h-px bg-linear-to-r from-primary/40 via-primary/10 to-transparent" />
          </div>

          {/* Office cards */}
          <div ref={officesRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, idx) => (
              <div
                key={office.city}
                className="office-card group bg-white overflow-hidden  transition-shadow duration-500"
              >
                {/* City image */}
                <div className="relative h-48 overflow-hidden">
                  {/* Blur placeholder */}
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${office.blurUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "blur(12px)",
                      transform: "scale(1.1)",
                    }}
                  />
                  <img
                    src={office.image}
                    alt={`${office.city} skyline`}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0B2A57]/80 via-[#0B2A57]/20 to-transparent" />
                  {/* City label */}
                  <div className="absolute bottom-4 left-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-primary/90 mb-0.5">{office.country}</p>
                    <h3 className="font-serif text-2xl text-white">{office.city}</h3>
                  </div>
                  {/* Office number badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6">
                  <ul className="space-y-3.5 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <MapPin size={14} className="text-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{office.address}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone size={14} className="text-primary shrink-0" />
                      <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">
                        {office.phone}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail size={14} className="text-primary shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors break-all">
                        {office.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock size={14} className="text-primary shrink-0" />
                      <span>{office.hours}</span>
                    </li>
                  </ul>

                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(office.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-primary hover:gap-3 transition-all duration-300 font-medium"
                    >
                      <MapPin size={12} />
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>
    )
}