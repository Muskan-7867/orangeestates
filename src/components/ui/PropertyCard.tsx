"use client";

import type { properties } from "#/constants";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";


export function PropertyCard({ property }: { property: (typeof properties)[0] }) {
   const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };
  return (
    <article className="group bg-[#fafafa] ">
       <div className="relative overflow-hidden">
        <img
          src={property.images[current]}
          alt={property.title}
          className="h-[220px] sm:h-[300px] w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Favorite */}
        <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm">
          <Heart size={16} strokeWidth={1.5} />
        </button>

        {/* Image nav — always visible on touch, hover-only on desktop */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:opacity-100">
          <div className="flex items-center gap-3 rounded-md bg-black/50 px-3 py-1.5 backdrop-blur-md">
            <button onClick={prev} className="text-white/70 hover:text-white">
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1.5">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-full transition-all duration-300 ${
                    current === index
                      ? "h-1 w-6 bg-white"
                      : "h-1 w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button onClick={next} className="text-white/70 hover:text-white">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        {/* Tags */}
        <div className="flex gap-1.5 sm:gap-2">
          <span className="bg-gray-200 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] tracking-wider">
            FLAT
          </span>
          <span className="bg-gray-200 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] tracking-wider">
            SALE
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-2 sm:mt-3 font-serif text-lg sm:text-2xl leading-snug line-clamp-2">
          {property.title}
        </h3>

        {/* Details */}
        <div className="mt-2 sm:mt-4 grid grid-cols-2 gap-x-2 gap-y-1 text-xs sm:flex sm:items-center sm:gap-5 sm:text-sm text-gray-600">
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          <span className="col-span-2 sm:hidden">{property.area}</span>
          {/* Desktop separators + area */}
          <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />
          <span className="hidden sm:block">{property.baths} Bathrooms</span>
          <span className="hidden sm:block h-1 w-1 rounded-full bg-gray-300" />
          <span className="hidden sm:block">{property.area}</span>
        </div>

        {/* Divider */}
        <div className="my-2 sm:my-4 border-t border-gray-200" />

        {/* Price */}
        <p className="text-[10px] sm:text-sm uppercase tracking-wider text-gray-400">Price</p>
        <p className="mt-1 sm:mt-3 text-base sm:text-xl font-semibold text-[#001f4d]">
          {property.price}
        </p>
      </div>
    </article>
  );
}