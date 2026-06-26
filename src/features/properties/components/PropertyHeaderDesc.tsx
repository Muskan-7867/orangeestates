import { Heart, Share2 } from "lucide-react";
import { useState } from "react";

export default function PropertyHeaderDesc({property}: {property: any}) {
      const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);


         const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      };
    
    return (
                <div className="bg-white p-6 sm:p-8 border border-gray-100 ">
            <div className="flex justify-between items-start gap-4 flex-wrap">
              <div>
                <span className="bg-primary/10 text-primary px-3 py-1 text-[10px] sm:text-xs tracking-wider uppercase font-semibold rounded-md">
                  Premium Listing
                </span>
                <h1 className="mt-4 font-serif text-2xl sm:text-4xl text-gray-900 leading-tight">
                  {property.title}
                </h1>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Save to favorites"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex h-11 w-11 items-center justify-center  border transition-all cursor-pointer ${isFavorite
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:border-gray-300"
                    }`}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  aria-label="Share listing link"
                  onClick={handleShare}
                  className="flex h-11 w-11 items-center justify-center  border border-gray-200 bg-white text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-all cursor-pointer relative"
                >
                  <Share2 size={20} />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-gray-100">
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 uppercase tracking-widest">Price</span>
                <span className="mt-1 text-xl sm:text-2xl font-semibold text-primary">{property.price}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 uppercase tracking-widest">Bedrooms</span>
                <span className="mt-1 text-xl sm:text-2xl font-medium text-gray-800">{property.beds} Beds</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 uppercase tracking-widest">Bathrooms</span>
                <span className="mt-1 text-xl sm:text-2xl font-medium text-gray-800">{property.baths} Baths</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-gray-400 uppercase tracking-widest">Area</span>
                <span className="mt-1 text-xl sm:text-2xl font-medium text-gray-800">{property.area}</span>
              </div>

            </div>

            {/* Description */}
            <div className="mt-8">
              <h3 className="font-serif text-xl font-medium text-gray-900 mb-4">About this Property</h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                Welcome to this exquisite luxury estate, representing the height of sophisticated living.
                Designed with a meticulous eye for detail, this stunning property merges classic architectural elements
                with clean, state-of-the-art modern comforts. The expansive layout features grand light-filled living spaces,
                soaring ceilings, and oversized windows showcasing picturesque surroundings. Every square inch has been styled
                using premium finishes and bespoke materials, promising a truly remarkable residential experience.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                Located in one of the most prestigious neighborhoods, residents will enjoy unparalleled safety, top-rated local amenities,
                and easy access to the heart of the city, perfectly blending a quiet, luxurious retreat with urban convenience.
              </p>
            </div>

          </div>
    )
}
