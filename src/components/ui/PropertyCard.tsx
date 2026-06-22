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
    <article className="group bg-[#fafafa]">
       <div className="relative overflow-hidden">
        <img
          src={property.images[current]}
          alt={property.title}
          className="h-[300px] w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Favorite */}
        <button className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm">
          <Heart size={18} strokeWidth={1.5} />
        </button>

        {/* Hover Indicator */}
        <div className="absolute bottom-5 left-1/2 translate-x-[-50%] opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-3 rounded-md bg-black/50 px-4 py-2 backdrop-blur-md">
            <button
              onClick={prev}
              className="text-white/70 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-full transition-all duration-300 ${
                    current === index
                      ? "h-1 w-8 bg-white"
                      : "h-1 w-2 bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="text-white/70 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        <div className="flex gap-2">
          <span className="bg-gray-200 px-3 py-1 text-[11px] tracking-wider">
            FLAT
          </span>

          <span className="bg-gray-200 px-3 py-1 text-[11px] tracking-wider">
            SALE
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-5 font-serif text-2xl leading-snug">
          {property.title}
        </h3>

        {/* Details */}
        <div className="mt-4 flex items-center gap-5 text-sm text-gray-600">
          <span>{property.beds} Bedrooms</span>

          <span className="h-1 w-1 rounded-full bg-gray-300" />

          <span>{property.baths} Bathrooms</span>

          <span className="h-1 w-1 rounded-full bg-gray-300" />

          <span>{property.area}</span>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200" />

        {/* Price */}
        <p className="text-sm uppercase tracking-wider text-gray-400">
          Price
        </p>

        <p className="mt-3 text-xl font-semibold text-[#001f4d]">
          {property.price}
        </p>
      </div>
    </article>
  );
}