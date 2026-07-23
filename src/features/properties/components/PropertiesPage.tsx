import { useState } from "react";

import { properties } from "#/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyFilters from "./PropertyFilters";
import PropHero from "./Prop";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { PropertyCard, PropertyCardSkeleton } from "#/components/shared/PropertyCard";
import type { PropertySearchParams } from "../types/filterSchema";

const ITEMS_PER_PAGE = 15;

export interface PropertiesPageProps {
  purpose?: "all" | "buy" | "rent" | "new-homes";
}

export default function PropertiesPage({ purpose: propPurpose }: PropertiesPageProps = {}) {
  // 1. Get search object without long inline destructuring
  const search = useSearch({ strict: false }) as PropertySearchParams;
  const navigate = useNavigate();

  // 2. Destructure with default fallback values on separate clean lines
  const {
    purpose = propPurpose || "all",
    country = "All",
    type = "All",
    priceRange = "All",
    minPrice = "All",
    maxPrice = "All",
    beds = "All",
    baths = "All",
    completion = "All",
    developer = "All",
    size = "All",
    area = "All",
    q = "",
    page: currentPage = 1,
  } = search;

  const [isLoading, setIsLoading] = useState(false);

  // Helper to update specific search params in URL
  const updateFilter = (newParams: Partial<PropertySearchParams>) => {
    navigate({
      to: ".",
      search: (prev: PropertySearchParams) => {
        const updated = {
          ...prev,
          ...newParams,
        };
        // Reset to page 1 whenever filters change unless changing page directly
        if (!("page" in newParams)) {
          updated.page = 1;
        }
        return updated;
      },
      replace: true,
    });
  };

  const countries = [
    "All",
    "Dubai",
    "India",
    "USA",
    "Canada",
    "Australia",
  ];

  // Helper filter parsers
  const parseNum = (str: string) => {
    const clean = str.replace(/[^0-9]/g, "");
    return clean ? parseInt(clean, 10) : 0;
  };

  // Developers & completion mock lists for fallback lookup
  const developers = ["Emaar", "Damac", "Sobha", "Nakheel", "Select Group", "Ellington", "Omniyat"];
  const completions = ["Ready", "Off-Plan", "Under Construction"];

  // Filter properties by buy/rent purpose
  const propertiesByPurpose =
    purpose === "all"
      ? properties
      : properties.filter((p) => p.purpose === purpose);

  // Apply all filters: Country, Search, Type, Price (Min/Max & Range), Beds, Baths, Completion, Developer, Size, Area
  const filteredProperties = propertiesByPurpose.filter((property) => {
    const propIdNum = parseInt(property.id, 10) || 1;

    // 1. Country filter
    if (country !== "All") {
      const originalIndex = properties.findIndex((p) => p.id === property.id);
      const propertyCountry =
        countries[(originalIndex % (countries.length - 1)) + 1];
      if (propertyCountry !== country) return false;
    }

    // 2. Search query filter
    if (q?.trim()) {
      if (!property.title.toLowerCase().includes(q.toLowerCase())) {
        return false;
      }
    }

    // 3. Type filter
    if (type !== "All") {
      const titleLower = property.title.toLowerCase();
      const typeLower = type?.toLowerCase();
      if (typeLower === "apartment") {
        if (!titleLower.includes("apartment") && !titleLower.includes("flat")) return false;
      } else if (typeLower === "penthouse") {
        if (!titleLower.includes("penthouse") && !titleLower.includes("heights")) return false;
      } else if (typeLower === "duplex") {
        if (!titleLower.includes("duplex")) return false;
      } else if (typeLower === "villa") {
        if (!titleLower.includes("villa") && !titleLower.includes("gardens") && !titleLower.includes("house")) return false;
      } else {
        if (!titleLower.includes(typeLower)) return false;
      }
    }

    // 4. Price range legacy filter
    const numPrice = parseNum(property.price);
    if (minPrice !== "All" || maxPrice !== "All" || priceRange !== "All") {
      const isRent = property.price.includes("month");
      if (isRent) {
        if (priceRange === "under-5m" && numPrice >= 5000) return false;
        if (priceRange === "5m-8m" && (numPrice < 5000 || numPrice > 7000)) return false;
        if (priceRange === "above-8m" && numPrice <= 7000) return false;
      } else {
        if (priceRange === "under-5m" && numPrice >= 5000000) return false;
        if (priceRange === "5m-8m" && (numPrice < 5000000 || numPrice > 8000000)) return false;
        if (priceRange === "above-8m" && numPrice <= 8000000) return false;
      }
    }

    // Min Price filter
    if (minPrice !== "All") {
      const minVal = parseInt(minPrice, 10);
      if (numPrice < minVal) return false;
    }

    // Max Price filter
    if (maxPrice !== "All") {
      const maxVal = parseInt(maxPrice, 10);
      if (numPrice > maxVal) return false;
    }

    // 5. Beds filter
    if (beds !== "All") {
      const minBeds = parseInt(beds, 10);
      if (property.beds < minBeds) return false;
    }

    // 6. Baths filter
    if (baths !== "All") {
      const minBaths = parseInt(baths, 10);
      if ((property.baths || 1) < minBaths) return false;
    }

    // 7. Completion filter
    if (completion !== "All") {
      const propCompletion =
        (property as any).completion ||
        (property.purpose === "new-homes"
          ? "Off-Plan"
          : completions[(propIdNum - 1) % completions.length]);
      if (propCompletion !== completion) return false;
    }

    // 8. Developer filter
    if (developer !== "All") {
      const propDeveloper =
        (property as any).developer ||
        developers[(propIdNum - 1) % developers.length];
      if (propDeveloper !== developer) return false;
    }

    // 9. Size filter
    if (size !== "All") {
      const numArea = parseNum(property.area);
      if (size === "under-1500" && numArea >= 1500) return false;
      if (size === "1500-3000" && (numArea < 1500 || numArea > 3000)) return false;
      if (size === "above-3000" && numArea <= 3000) return false;
    }

    // 10. Map Area filter
    if (area !== "All") {
      const propTitle = property.title.toLowerCase();
      const areaLower = area?.toLowerCase();

      const areaKeywords: Record<string, string[]> = {
        "Downtown Dubai": ["heights", "albert", "embankment", "downtown"],
        "Palm Jumeirah": ["crest", "penthouse", "palm"],
        "Dubai Marina": ["duplex", "hanover", "square", "marina"],
        "Business Bay": ["gardens", "bayswater", "business"],
        Mayfair: ["mayfair", "hanover"],
        Bayswater: ["bayswater", "craven"],
        "Albert Embankment": ["embankment", "albert"],
      };

      const keywords = areaKeywords[area] || [areaLower];
      const hasMatch = keywords.some((kw) => propTitle.includes(kw));
      if (!hasMatch) return false;
    }

    return true;
  });

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Show skeletons briefly when page / filters change
  const triggerLoad = (fn: () => void) => {
    setIsLoading(true);
    fn();
    const t = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(t);
  };

  const handleResetFilters = () => {
    triggerLoad(() => {
      navigate({
        to: ".",
        search: propPurpose && propPurpose !== "all" ? { purpose: propPurpose } : {},
        replace: true,
      });
    });
  };

  return (
    <main className="min-h-screen bg-bg pb-28">
      <section className="">
        <div className="w-full">
          {/* Gallery */}
          <div className="mb-2">
            <PropHero />
          </div>

          {/* Filter */}
          <PropertyFilters
            countries={countries}
            selectedCountry={country}
            setSelectedCountry={(country) =>
              triggerLoad(() => updateFilter({ country }))
            }
            selectedPurpose={purpose}
            setSelectedPurpose={(purpose) =>
              triggerLoad(() => updateFilter({ purpose: purpose as any }))
            }
            searchQuery={q}
            setSearchQuery={(query) =>
              triggerLoad(() => updateFilter({ q: query }))
            }
            selectedType={type}
            setSelectedType={(type) =>
              triggerLoad(() => updateFilter({ type }))
            }
            selectedPriceRange={priceRange}
            setSelectedPriceRange={(priceRange) =>
              triggerLoad(() => updateFilter({ priceRange }))
            }
            selectedMinPrice={minPrice}
            setSelectedMinPrice={(minPrice) =>
              triggerLoad(() => updateFilter({ minPrice }))
            }
            selectedMaxPrice={maxPrice}
            setSelectedMaxPrice={(maxPrice) =>
              triggerLoad(() => updateFilter({ maxPrice }))
            }
            selectedBeds={beds}
            setSelectedBeds={(beds) =>
              triggerLoad(() => updateFilter({ beds }))
            }
            selectedBaths={baths}
            setSelectedBaths={(baths) =>
              triggerLoad(() => updateFilter({ baths }))
            }
            selectedCompletion={completion}
            setSelectedCompletion={(completion) =>
              triggerLoad(() => updateFilter({ completion }))
            }
            selectedDeveloper={developer}
            setSelectedDeveloper={(developer) =>
              triggerLoad(() => updateFilter({ developer }))
            }
            selectedSize={size}
            setSelectedSize={(size) =>
              triggerLoad(() => updateFilter({ size }))
            }
            selectedArea={area}
            setSelectedArea={(area) =>
              triggerLoad(() => updateFilter({ area }))
            }
            onResetFilters={handleResetFilters}
          />

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 px-4 lg:px-18">
            {isLoading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))
              : paginatedProperties.length > 0
              ? paginatedProperties.map((property) => (
                  <PropertyCard key={property.title} property={property} />
                ))
              : (
                <div className="col-span-full py-16 text-center text-gray-500">
                  <p className="text-lg font-medium">No properties found</p>
                  <p className="text-sm mt-1">Try resetting or adjusting your search filters.</p>
                </div>
              )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() =>
                  triggerLoad(() =>
                    updateFilter({ page: Math.max(currentPage - 1, 1) })
                  )
                }
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded hover:border-black disabled:opacity-50 disabled:hover:border-gray-300 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-gray-700"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() =>
                    triggerLoad(() => updateFilter({ page: pageNum }))
                  }
                  className={`w-9 h-9 flex items-center justify-center text-sm border transition-all duration-300 cursor-pointer ${
                    pageNum === currentPage
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() =>
                  triggerLoad(() =>
                    updateFilter({ page: Math.min(currentPage + 1, totalPages) })
                  )
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded hover:border-black disabled:opacity-50 disabled:hover:border-gray-300 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-gray-700"
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
          
        </div>
      </section>
    </main>
  );
}