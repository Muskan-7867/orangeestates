import { motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "919501755756"; // From Footer content (Jalandhar, Punjab phone: 9501755756)
  const message = "Hello! I am interested in Orange Estate properties and would like to get more information.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip text */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, x: 20, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}  
        whileHover={{ scale: 1.05 }}
        transition={{ delay: 1, duration: 0.3 }}
        className="group relative flex items-center justify-center"
      >
        {/* Hover/Pulsing Outer Glow Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
        
        {/* Pulsing Inner Shadow/Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/20 pointer-events-none animate-pulse" />

        {/* Hover Tooltip Card */}
        <div className="absolute right-18 top-1/2 -translate-y-1/2 bg-white text-zinc-800 text-xs font-semibold py-2 px-3 rounded-lg shadow-lg border border-zinc-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Chat with us on WhatsApp
        </div>

        {/* WhatsApp Icon Button Container */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300">
          <FaWhatsapp className="h-8 w-8 animate-bounce-[duration:2s]" />
        </div>
      </motion.a>
    </div>
  );
}
