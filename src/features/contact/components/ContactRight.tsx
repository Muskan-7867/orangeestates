import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function ContactRight(){
    return(
       <div className="flex flex-col gap-8">
            {/* Map embed placeholder */}
            <div className="w-full h-64 sm:h-72 bg-orange-50 relative overflow-hidden rounded-sm">
              <iframe
                title="Orange Estate London Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.0!2d-0.1462!3d51.5117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760534e6796e25%3A0x3c1b4aa91fbb53d8!2sBerkeley%20Square%2C%20Mayfair%2C%20London!5e0!3m2!1sen!2suk!4v1718000000000!5m2!1sen!2suk"
                className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-500"
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Quick contact info */}
            <div className="space-y-5">
              {[
                { icon: MapPin, label: "Head Office", value: "14 Berkeley Square, Mayfair, London W1J 6BS" },
                { icon: Phone, label: "Phone", value: "+44 20 7946 0958" },
                { icon: Mail, label: "Email", value: "hello@orangeestate.co.uk" },
                { icon: Clock, label: "Hours", value: "Monday – Friday, 9:00 – 18:00" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-primary mt-0.5">
                    <Icon size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
                    <p className="text-sm text-gray-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebook, href: "#" },
                  { icon: FaInstagram, href: "#" },
                  { icon: FaTwitter, href: "#" },
                  { icon: FaLinkedin, href: "#" },
                ].map(({ icon: Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="flex items-center justify-center w-9 h-9 border border-gray-200 text-gray-500 hover:border-primary hover:text-primary transition-colors duration-300"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

          </div>
    )
}