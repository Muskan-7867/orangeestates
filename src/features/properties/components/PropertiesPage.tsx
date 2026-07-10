
import { useState } from "react";
import { PropertyCard } from "#/components/ui/PropertyCard";
import { PropertyCardSkeleton } from "#/components/ui/PropertyCard";
import { properties } from "#/constants";
import PropertyHero from "./PropertyHero";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyFilters from "./PropertyFilters";

const ITEMS_PER_PAGE = 6;

export default function PropertiesPage() {
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const countries = [
    "All",
    "Dubai",
    "India",
    "USA",
    "Canada",
    "Australia",
  ];

  // 1. Filter by country
  const filteredByCountry =
    selectedCountry === "All"
      ? properties
      : properties.filter((_, index) => {
          const propertyCountry =
            countries[(index % (countries.length - 1)) + 1];

          return propertyCountry === selectedCountry;
        });

  // 2. Filter by search query
  const filteredProperties = filteredByCountry.filter((property) => {
    return property.title.toLowerCase().includes(searchQuery.toLowerCase());
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
    const t = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(t);
  };

  return (
    <main className="min-h-screen bg-bg">
      <section className="py-28">
        <div className="w-full px-4 lg:px-18">
          {/* Header */}
          <div className=" flex flex-col items-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Collection
            </p>

            <h2 className="mt-2 text-2xl md:text-6xl font-light font-serif text-gray-900 text-center">
              Featured Properties
            </h2>

            <p className="max-w-md mt-4 text-center text-gray-600 text-sm">
              Explore our handpicked collection of exceptional homes and
              investment properties.
            </p>
          </div>

          {/* Gallery */}
          <div className="mb-16">
            <PropertyHero />
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
            searchQuery={searchQuery}
            setSearchQuery={(query) =>
              triggerLoad(() => {
                setSearchQuery(query);
                setCurrentPage(1);
              })
            }
          />

          {/* Grid */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
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