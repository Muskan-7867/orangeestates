import { useState, useEffect } from "react";
import { PropertyCard } from "#/components/ui/PropertyCard";
import { PropertyCardSkeleton } from "#/components/ui/PropertyCard";
import { properties } from "#/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyFilters from "./PropertyFilters";
import PropHero from "./Prop";

const ITEMS_PER_PAGE = 15;

export default function PropertiesPage({ purpose = "all" }: { purpose?: "all" | "buy" | "rent" | "new-homes" }) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>(purpose);
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedMinPrice, setSelectedMinPrice] = useState("All");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("All");
  const [selectedBeds, setSelectedBeds] = useState("All");
  const [selectedBaths, setSelectedBaths] = useState("All");
  const [selectedCompletion, setSelectedCompletion] = useState("All");
  const [selectedDeveloper, setSelectedDeveloper] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("q") || "";
    }
    return "";
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedPurpose(purpose);
  }, [purpose]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const q = new URLSearchParams(window.location.search).get("q") || "";
      setSearchQuery(q);
    }
  }, [typeof window !== "undefined" ? window.location.search : ""]);
  const [isLoading, setIsLoading] = useState(false);

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
    selectedPurpose === "all"
      ? properties
      : properties.filter((p) => p.purpose === selectedPurpose);

  // Apply all filters: Country, Search, Type, Price (Min/Max & Range), Beds, Baths, Completion, Developer, Size, Area
  const filteredProperties = propertiesByPurpose.filter((property) => {
    const propIdNum = parseInt(property.id, 10) || 1;

    // 1. Country filter
    if (selectedCountry !== "All") {
      const originalIndex = properties.findIndex((p) => p.id === property.id);
      const propertyCountry =
        countries[(originalIndex % (countries.length - 1)) + 1];
      if (propertyCountry !== selectedCountry) return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      if (!property.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
    }

    // 3. Type filter
    if (selectedType !== "All") {
      const titleLower = property.title.toLowerCase();
      const typeLower = selectedType.toLowerCase();
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
    if (selectedPriceRange !== "All") {
      const isRent = property.price.includes("month");
      if (isRent) {
        if (selectedPriceRange === "under-5m" && numPrice >= 5000) return false;
        if (selectedPriceRange === "5m-8m" && (numPrice < 5000 || numPrice > 7000)) return false;
        if (selectedPriceRange === "above-8m" && numPrice <= 7000) return false;
      } else {
        if (selectedPriceRange === "under-5m" && numPrice >= 5000000) return false;
        if (selectedPriceRange === "5m-8m" && (numPrice < 5000000 || numPrice > 8000000)) return false;
        if (selectedPriceRange === "above-8m" && numPrice <= 8000000) return false;
      }
    }

    // Min Price filter
    if (selectedMinPrice !== "All") {
      const minVal = parseInt(selectedMinPrice, 10);
      if (numPrice < minVal) return false;
    }

    // Max Price filter
    if (selectedMaxPrice !== "All") {
      const maxVal = parseInt(selectedMaxPrice, 10);
      if (numPrice > maxVal) return false;
    }

    // 5. Beds filter
    if (selectedBeds !== "All") {
      const minBeds = parseInt(selectedBeds, 10);
      if (property.beds < minBeds) return false;
    }

    // 6. Baths filter
    if (selectedBaths !== "All") {
      const minBaths = parseInt(selectedBaths, 10);
      if ((property.baths || 1) < minBaths) return false;
    }

    // 7. Completion filter
    if (selectedCompletion !== "All") {
      const propCompletion =
        (property as any).completion ||
        (property.purpose === "new-homes"
          ? "Off-Plan"
          : completions[(propIdNum - 1) % completions.length]);
      if (propCompletion !== selectedCompletion) return false;
    }

    // 8. Developer filter
    if (selectedDeveloper !== "All") {
      const propDeveloper =
        (property as any).developer ||
        developers[(propIdNum - 1) % developers.length];
      if (propDeveloper !== selectedDeveloper) return false;
    }

    // 9. Size filter
    if (selectedSize !== "All") {
      const numArea = parseNum(property.area);
      if (selectedSize === "under-1500" && numArea >= 1500) return false;
      if (selectedSize === "1500-3000" && (numArea < 1500 || numArea > 3000)) return false;
      if (selectedSize === "above-3000" && numArea <= 3000) return false;
    }

    // 10. Map Area filter
    if (selectedArea !== "All") {
      const propTitle = property.title.toLowerCase();
      const areaLower = selectedArea.toLowerCase();

      const areaKeywords: Record<string, string[]> = {
        "Downtown Dubai": ["heights", "albert", "embankment", "downtown"],
        "Palm Jumeirah": ["crest", "penthouse", "palm"],
        "Dubai Marina": ["duplex", "hanover", "square", "marina"],
        "Business Bay": ["gardens", "bayswater", "business"],
        Mayfair: ["mayfair", "hanover"],
        Bayswater: ["bayswater", "craven"],
        "Albert Embankment": ["embankment", "albert"],
      };

      const keywords = areaKeywords[selectedArea] || [areaLower];
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
    const t = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(t);
  };

  const handleResetFilters = () => {
    triggerLoad(() => {
      setSelectedPurpose("all");
      setSelectedCountry("All");
      setSelectedType("All");
      setSelectedPriceRange("All");
      setSelectedMinPrice("All");
      setSelectedMaxPrice("All");
      setSelectedBeds("All");
      setSelectedBaths("All");
      setSelectedCompletion("All");
      setSelectedDeveloper("All");
      setSelectedSize("All");
      setSelectedArea("All");
      setSearchQuery("");
      setCurrentPage(1);
    });
  };

  return (
    <main className="min-h-screen bg-bg pb-28">
      <section className="">
        <div className="w-full  ">
          {/* Gallery */}
          <div className="mb-2 ">
            <PropHero />
          </div>

          {/* Filter */}
          <PropertyFilters
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={(country) =>
              triggerLoad(() => {
                setSelectedCountry(country);
                setCurrentPage(1);
              })
            }
            selectedPurpose={selectedPurpose}
            setSelectedPurpose={(purpose) =>
              triggerLoad(() => {
                setSelectedPurpose(purpose);
                setCurrentPage(1);
              })
            }
            searchQuery={searchQuery}
            setSearchQuery={(query) =>
              triggerLoad(() => {
                setSearchQuery(query);
                setCurrentPage(1);
              })
            }
            selectedType={selectedType}
            setSelectedType={(type) =>
              triggerLoad(() => {
                setSelectedType(type);
                setCurrentPage(1);
              })
            }
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={(price) =>
              triggerLoad(() => {
                setSelectedPriceRange(price);
                setCurrentPage(1);
              })
            }
            selectedMinPrice={selectedMinPrice}
            setSelectedMinPrice={(minPrice) =>
              triggerLoad(() => {
                setSelectedMinPrice(minPrice);
                setCurrentPage(1);
              })
            }
            selectedMaxPrice={selectedMaxPrice}
            setSelectedMaxPrice={(maxPrice) =>
              triggerLoad(() => {
                setSelectedMaxPrice(maxPrice);
                setCurrentPage(1);
              })
            }
            selectedBeds={selectedBeds}
            setSelectedBeds={(beds) =>
              triggerLoad(() => {
                setSelectedBeds(beds);
                setCurrentPage(1);
              })
            }
            selectedBaths={selectedBaths}
            setSelectedBaths={(baths) =>
              triggerLoad(() => {
                setSelectedBaths(baths);
                setCurrentPage(1);
              })
            }
            selectedCompletion={selectedCompletion}
            setSelectedCompletion={(completion) =>
              triggerLoad(() => {
                setSelectedCompletion(completion);
                setCurrentPage(1);
              })
            }
            selectedDeveloper={selectedDeveloper}
            setSelectedDeveloper={(developer) =>
              triggerLoad(() => {
                setSelectedDeveloper(developer);
                setCurrentPage(1);
              })
            }
            selectedSize={selectedSize}
            setSelectedSize={(size) =>
              triggerLoad(() => {
                setSelectedSize(size);
                setCurrentPage(1);
              })
            }
            selectedArea={selectedArea}
            setSelectedArea={(area) =>
              triggerLoad(() => {
                setSelectedArea(area);
                setCurrentPage(1);
              })
            }
            onResetFilters={handleResetFilters}
          />

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3 px-4 lg:px-18  ">
            {isLoading
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))
              : paginatedProperties.map((property) => (
                  <PropertyCard key={property.title} property={property} />
                ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <button
                onClick={() =>
                  triggerLoad(() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  )
                }
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded hover:border-black disabled:opacity-50 disabled:hover:border-gray-300 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer text-gray-700"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 flex items-center justify-center text-sm border transition-all duration-300 cursor-pointer ${
                    currentPage === page
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  triggerLoad(() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
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