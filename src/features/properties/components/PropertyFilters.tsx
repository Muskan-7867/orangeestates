import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  Building2,
  Tag,
  Bed,
  Maximize2,
  RotateCcw,
  X,
  SlidersHorizontal,
  Globe,
  ChevronDown,
} from "lucide-react";

export interface PropertyFiltersProps {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType?: string;
  setSelectedType?: (type: string) => void;
  selectedPriceRange?: string;
  setSelectedPriceRange?: (price: string) => void;
  selectedBeds?: string;
  setSelectedBeds?: (beds: string) => void;
  selectedSize?: string;
  setSelectedSize?: (size: string) => void;
  onResetFilters?: () => void;
}

export default function PropertyFilters({
  countries,
  selectedCountry,
  setSelectedCountry,
  searchQuery,
  setSearchQuery,
  selectedType = "All",
  setSelectedType,
  selectedPriceRange = "All",
  setSelectedPriceRange,
  selectedBeds = "All",
  setSelectedBeds,
  selectedSize = "All",
  setSelectedSize,
  onResetFilters,
}: PropertyFiltersProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const propertyTypes = [
    { label: "All Types", value: "All" },
    { label: "Apartment", value: "Apartment" },
    { label: "Penthouse", value: "Penthouse" },
    { label: "Duplex", value: "Duplex" },
    { label: "Villa / House", value: "Villa" },
  ];

  const priceRanges = [
    { label: "All Prices", value: "All" },
    { label: "Under £5M / £5k mo", value: "under-5m" },
    { label: "£5M - £8M / £5k-£7k mo", value: "5m-8m" },
    { label: "Above £8M / £7k mo", value: "above-8m" },
  ];

  const bedOptions = [
    { label: "Any Bedrooms", value: "All" },
    { label: "1+ Bed", value: "1" },
    { label: "2+ Beds", value: "2" },
    { label: "3+ Beds", value: "3" },
    { label: "4+ Beds", value: "4" },
  ];

  const sizeOptions = [
    { label: "Any Size", value: "All" },
    { label: "Under 1,500 SQ.FT.", value: "under-1500" },
    { label: "1,500 - 3,000 SQ.FT.", value: "1500-3000" },
    { label: "Above 3,000 SQ.FT.", value: "above-3000" },
  ];

  const activeFiltersCount =
    (selectedCountry !== "All" ? 1 : 0) +
    (selectedType !== "All" ? 1 : 0) +
    (selectedPriceRange !== "All" ? 1 : 0) +
    (selectedBeds !== "All" ? 1 : 0) +
    (selectedSize !== "All" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0;

  const handleClearAll = () => {
    setSelectedCountry("All");
    if (setSelectedType) setSelectedType("All");
    if (setSelectedPriceRange) setSelectedPriceRange("All");
    if (setSelectedBeds) setSelectedBeds("All");
    if (setSelectedSize) setSelectedSize("All");
    setSearchQuery("");
    if (onResetFilters) onResetFilters();
  };

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <div className="mb-8 flex flex-col gap-4 w-full px-4 lg:px-18 pt-4">
      {/* Top Bar: Country Tabs + Search Input + Mobile Filter Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        {/* Country Filter Tabs (Desktop only; shifted into sidebar on mobile) */}
        <div className="hidden md:flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 md:pb-0">
          {countries.map((country) => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wider border transition-all duration-300 cursor-pointer whitespace-nowrap font-medium ${
                selectedCountry === country
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
              }`}
            >
              {country}
            </button>
          ))}
        </div>

        {/* Search Input & Mobile Filter Toggle */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-1 md:w-80 shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-10 pr-9 py-2 text-sm bg-white border border-gray-300 focus:outline-none focus:border-primary transition-colors font-sans text-gray-800 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-primary" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center text-[10px] font-bold bg-primary text-white rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Filter Selectors Grid (Hidden on Mobile) */}
      <div className="hidden md:grid bg-white p-3.5 border border-gray-200 shadow-xs md:grid-cols-2 lg:grid-cols-5 gap-3 items-center">
        {/* Property Type Filter */}
        <div className="relative flex items-center">
          <Building2 className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType && setSelectedType(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer font-medium"
          >
            {propertyTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>

        {/* Price Range Filter */}
        <div className="relative flex items-center">
          <Tag className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange && setSelectedPriceRange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer font-medium"
          >
            {priceRanges.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>

        {/* Bedrooms Filter */}
        <div className="relative flex items-center">
          <Bed className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={selectedBeds}
            onChange={(e) => setSelectedBeds && setSelectedBeds(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer font-medium"
          >
            {bedOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>

        {/* Size Filter */}
        <div className="relative flex items-center">
          <Maximize2 className="absolute left-3 text-gray-400 w-4 h-4 pointer-events-none" />
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize && setSelectedSize(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer font-medium"
          >
            {sizeOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-gray-400 text-xs">▼</div>
        </div>

        {/* Reset / Action Button */}
        <div className="flex items-center gap-2">
          {hasActiveFilters ? (
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs md:text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium border border-gray-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          ) : (
            <div className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-gray-400 font-medium border border-dashed border-gray-200">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filter Properties</span>
            </div>
          )}
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
          <span className="font-medium text-gray-500">Active Filters:</span>
          {selectedCountry !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Country: {selectedCountry}
              <button
                onClick={() => setSelectedCountry("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedType !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Type: {selectedType}
              <button
                onClick={() => setSelectedType && setSelectedType("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedPriceRange !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Price: {priceRanges.find((p) => p.value === selectedPriceRange)?.label}
              <button
                onClick={() => setSelectedPriceRange && setSelectedPriceRange("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedBeds !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Beds: {selectedBeds}+
              <button
                onClick={() => setSelectedBeds && setSelectedBeds("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSize !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Size: {sizeOptions.find((s) => s.value === selectedSize)?.label}
              <button
                onClick={() => setSelectedSize && setSelectedSize("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Search: &quot;{searchQuery}&quot;
              <button
                onClick={() => setSearchQuery("")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            onClick={handleClearAll}
            className="text-xs text-primary hover:underline cursor-pointer ml-1 font-medium"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Sidebar Drawer (Portaled to document.body for true fixed viewport positioning) */}
      {isSidebarOpen && mounted && createPortal(
        <div className="fixed inset-0 z-[9999] md:hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
          />

          {/* Right Sliding Sidebar Panel */}
          <div className="fixed inset-y-0 right-0 z-10 w-[85vw] sm:w-96 max-w-full h-full bg-white shadow-2xl flex flex-col transition-transform duration-300 animate-in slide-in-from-right">
            {/* Header */}
            <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-serif font-medium text-gray-900">
                  Filter Properties
                </h3>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Body (Scrollable options) */}
            <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-6">
              {/* Country / Region Dropdown */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span>Country / Region</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-primary appearance-none cursor-pointer font-medium"
                  >
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country === "All" ? "All Countries / Regions" : country}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-primary" />
                  <span>Property Type</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType && setSelectedType(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-primary appearance-none cursor-pointer font-medium"
                  >
                    {propertyTypes.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-primary" />
                  <span>Price Range</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange && setSelectedPriceRange(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-primary appearance-none cursor-pointer font-medium"
                  >
                    {priceRanges.map((p) => (
                      <option key={p.value} value={p.value}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-primary" />
                  <span>Minimum Bedrooms</span>
                </label>
                <div className="flex gap-2">
                  {bedOptions.map((b) => (
                    <button
                      key={b.value}
                      onClick={() => setSelectedBeds && setSelectedBeds(b.value)}
                      className={`flex-1 py-2 text-xs font-medium border transition-all cursor-pointer text-center ${
                        selectedBeds === b.value
                          ? "bg-primary text-white border-primary shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                      }`}
                    >
                      {b.value === "All" ? "Any" : `${b.value}+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5 text-primary" />
                  <span>Property Size (SQ.FT.)</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize && setSelectedSize(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 text-sm bg-gray-50 border border-gray-200 text-gray-800 focus:outline-none focus:border-primary appearance-none cursor-pointer font-medium"
                  >
                    {sizeOptions.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Sidebar Footer Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
              <button
                onClick={handleClearAll}
                className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors cursor-pointer text-center"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-primary hover:bg-primary/90 shadow-md transition-colors cursor-pointer text-center"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}


