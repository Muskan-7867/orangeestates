import { useState } from "react";
import { CheckCircle, Calendar, Users } from "lucide-react";
import { motion } from "motion/react";

export default function PropertyBookingForm({ property, onClose }: { property: any; onClose?: () => void }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      if (onClose) onClose();
    }, 5000);
  };

  return (
    <div className="bg-white p-6 sm:p-8 border border-primary/10 shadow-sm">
      <div className="text-center pb-6 border-b border-gray-100">
        <h3 className="font-serif text-xl text-gray-950 font-semibold">Book a Stay / Visit</h3>
        <p className="text-xs text-gray-500 mt-1">Select your dates and number of guests below.</p>
      </div>

      {formSubmitted ? (
        <div className="py-10 text-center space-y-4 flex flex-col items-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <h4 className="font-serif text-lg font-semibold text-gray-900">Request Sent</h4>
          <p className="text-sm text-gray-600 text-center">
            Your booking request for {property.title} was submitted. We will contact you shortly to verify availability.
          </p>
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer mt-4"
            >
              Done
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleBook} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="check-in" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Calendar size={12} className="text-primary" />
                Check In
              </label>
              <input
                type="date"
                id="check-in"
                required
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-gray-55 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>

            <div>
              <label htmlFor="check-out" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
                <Calendar size={12} className="text-primary" />
                Check Out
              </label>
              <input
                type="date"
                id="check-out"
                required
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-gray-55 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
            </div>
          </div>

          <div>
            <label htmlFor="guests" className="block text-[11px] font-semibold text-gray-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Users size={12} className="text-primary" />
              Number of Guests
            </label>
            <div className="flex items-center gap-3 mt-1">
              <button
                type="button"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer font-bold animate-none"
              >
                -
              </button>
              <span className="w-16 text-center text-sm font-semibold select-none">
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </span>
              <button
                type="button"
                onClick={() => setGuests((g) => Math.min(10, g + 1))}
                className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer font-bold animate-none"
              >
                +
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#0c1e36] hover:bg-[#152e4f] text-white py-3.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors shadow-md cursor-pointer mt-4"
          >
            Request Booking
          </motion.button>
        </form>
      )}
    </div>
  );
}
