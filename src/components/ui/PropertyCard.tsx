"use client";

import type { properties } from "#/constants";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";

function getBlurImageUrl(url: string) {
  if (url.includes("unsplash.com")) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set("w", "20");
      urlObj.searchParams.set("q", "10");
      return urlObj.toString();
    } catch {
      return url;
    }
  }
  return url;
}

function PropertyCardImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  const blurUrl = getBlurImageUrl(src);

  return (
    <div className="relative h-55 sm:h-75 w-full overflow-hidden">
      {blurUrl && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${blurUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.05)",
          }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 cursor-pointer absolute inset-0 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

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
    <article className="group bg-[#fafafa] relative flex flex-col h-full border border-gray-100 ">
      <div className="relative overflow-hidden">
        <Link to="/properties/$id" params={{ id: property.id }} className="block">
          <PropertyCardImage
            src={property.images[current].url}
            alt={property.title}
          />
        </Link>

        {/* Favorite */}
        <button 
          type="button"
          aria-label="Save to favorites"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm hover:bg-gray-150 transition-colors"
        >
          <Heart size={16} strokeWidth={1.5} />
        </button>

        {/* Image nav — always visible on touch, hover-only on desktop */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:opacity-100">
          <div className="flex items-center gap-3 rounded-md bg-black/50 px-3 py-1.5 backdrop-blur-md">
            <button 
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prev();
              }} 
              className="text-white/70 hover:text-white cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>

            <div className="flex items-center gap-1.5">
              {property.images.map((_, index) => (
                <button
                  key={`${property.id}-dot-${index}`}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrent(index);
                  }}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    current === index
                      ? "h-1 w-6 bg-white"
                      : "h-1 w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>

            <button 
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                next();
              }} 
              className="text-white/70 hover:text-white cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <Link to="/properties/$id" params={{ id: property.id }} className="block group-hover:text-primary">
          {/* Tags */}
          <div className="flex gap-1.5 sm:gap-2">
            <span className="bg-gray-200 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] tracking-wider text-gray-800 font-medium">
              FLAT
            </span>
            <span className="bg-gray-200 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] tracking-wider text-gray-800 font-medium">
              SALE
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-2 sm:mt-3 font-serif text-lg sm:text-2xl leading-snug line-clamp-2 hover:underline transition-all">
            {property.title}
          </h3>
        </Link>

        {/* Details */}
        <div className=" sm:mt-4 grid grid-cols-2 gap-x-2 gap-y-1 text-xs sm:flex sm:items-center sm:gap-5 sm:text-sm text-gray-600 mt-auto">
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
        <div>
          <p className="text-[10px] sm:text-sm uppercase tracking-wider text-gray-400">Price</p>
          <p className="mt-1 sm:mt-3 text-base sm:text-xl font-semibold text-[#001f4d]">
            {property.price}
          </p>
        </div>
      </div>
    </article>
  );
}