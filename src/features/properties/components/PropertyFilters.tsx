import { useState, useEffect, type SetStateAction, type Dispatch } from "react";
import { createPortal } from "react-dom";
import {

  X,

  MapPin,
} from "lucide-react";

import {
  maxPriceOptions,
  minPriceOptions,
  sizeOptions,
} from "#/constants";
import MapAreaModal from "./MapAreaModal";
import PropertyTopBar from "./PropertyTopBar";
import MobileFilters from "./MobileFilters";
import DropdownFilters from "./DropdownFilters";

export interface PropertyFiltersProps {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  selectedPurpose?: string;
  setSelectedPurpose?: (purpose: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType?: string;
  setSelectedType?: (type: string) => void;
  selectedPriceRange?: string;
  setSelectedPriceRange?: (price: string) => void;
  selectedMinPrice?: string;
  setSelectedMinPrice?: (minPrice: string) => void;
  selectedMaxPrice?: string;
  setSelectedMaxPrice?: (maxPrice: string) => void;
  selectedBeds?: string;
  setSelectedBeds?: (beds: string) => void;
  selectedBaths?: string;
  setSelectedBaths?: (baths: string) => void;
  selectedCompletion?: string;
  setSelectedCompletion?: (completion: string) => void;
  selectedDeveloper?: string;
  setSelectedDeveloper?: (developer: string) => void;
  selectedSize?: string;
  setSelectedSize?: (size: string) => void;
  selectedArea?: string;
  setSelectedArea?: (area: string) => void;
  onResetFilters?: () => void;
}

export default function PropertyFilters({
  countries,
  selectedCountry,
  setSelectedCountry,
  selectedPurpose = "all",
  setSelectedPurpose,
  searchQuery,
  setSearchQuery,
  selectedType = "All",
  setSelectedType,
  selectedPriceRange = "All",
  setSelectedPriceRange,
  selectedMinPrice = "All",
  setSelectedMinPrice,
  selectedMaxPrice = "All",
  setSelectedMaxPrice,
  selectedBeds = "All",
  setSelectedBeds,
  selectedBaths = "All",
  setSelectedBaths,
  selectedCompletion = "All",
  setSelectedCompletion,
  selectedDeveloper = "All",
  setSelectedDeveloper,
  selectedSize = "All",
  setSelectedSize,
  selectedArea = "All",
  setSelectedArea,
  onResetFilters,
}: PropertyFiltersProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeFiltersCount =
    (selectedPurpose !== "all" ? 1 : 0) +
    (selectedCountry !== "All" ? 1 : 0) +
    (selectedType !== "All" ? 1 : 0) +
    (selectedPriceRange !== "All" ? 1 : 0) +
    (selectedMinPrice !== "All" ? 1 : 0) +
    (selectedMaxPrice !== "All" ? 1 : 0) +
    (selectedBeds !== "All" ? 1 : 0) +
    (selectedBaths !== "All" ? 1 : 0) +
    (selectedCompletion !== "All" ? 1 : 0) +
    (selectedDeveloper !== "All" ? 1 : 0) +
    (selectedSize !== "All" ? 1 : 0) +
    (selectedArea !== "All" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  const hasActiveFilters = activeFiltersCount > 0;

  const handleClearAll = () => {
    setSelectedCountry("All");
    if (setSelectedPurpose) setSelectedPurpose("all");
    if (setSelectedType) setSelectedType("All");
    if (setSelectedPriceRange) setSelectedPriceRange("All");
    if (setSelectedMinPrice) setSelectedMinPrice("All");
    if (setSelectedMaxPrice) setSelectedMaxPrice("All");
    if (setSelectedBeds) setSelectedBeds("All");
    if (setSelectedBaths) setSelectedBaths("All");
    if (setSelectedCompletion) setSelectedCompletion("All");
    if (setSelectedDeveloper) setSelectedDeveloper("All");
    if (setSelectedSize) setSelectedSize("All");
    if (setSelectedArea) setSelectedArea("All");
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
      {/* Top Bar: Purpose Switch + Search Input + Map Button + Mobile Filter Toggle */}
      <PropertyTopBar selectedPurpose={selectedPurpose} setSelectedPurpose={setSelectedPurpose} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedArea={selectedArea} setIsMapModalOpen={setIsMapModalOpen} setIsSidebarOpen={setIsSidebarOpen} activeFiltersCount={activeFiltersCount} />

      {/* Desktop Filter Dropdown Grid using DropdownMenu */}
      <DropdownFilters countries={countries} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} selectedType={selectedType} setSelectedType={setSelectedType} selectedMinPrice={selectedMinPrice} setSelectedMinPrice={setSelectedMinPrice} selectedMaxPrice={selectedMaxPrice} setSelectedMaxPrice={setSelectedMaxPrice} selectedBeds={selectedBeds} setSelectedBeds={setSelectedBeds} selectedBaths={selectedBaths} setSelectedBaths={setSelectedBaths} selectedCompletion={selectedCompletion} setSelectedCompletion={setSelectedCompletion} selectedDeveloper={selectedDeveloper} setSelectedDeveloper={setSelectedDeveloper} hasActiveFilters={hasActiveFilters} handleClearAll={handleClearAll} />

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-gray-600">
          <span className="font-medium text-gray-500">Active Filters:</span>
          {selectedPurpose !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 font-medium capitalize">
              Purpose: {selectedPurpose}
              <button
                onClick={() => setSelectedPurpose && setSelectedPurpose("all")}
                className="hover:text-red-500 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedArea !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 font-medium">
              <MapPin className="w-3 h-3" />
              Area: {selectedArea}
              <button
                onClick={() => setSelectedArea && setSelectedArea("All")}
                className="hover:text-red-500 cursor-pointer ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
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
          {selectedMinPrice !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Min Price: {minPriceOptions.find((p) => p.value === selectedMinPrice)?.label}
              <button
                onClick={() => setSelectedMinPrice && setSelectedMinPrice("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedMaxPrice !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Max Price: {maxPriceOptions.find((p) => p.value === selectedMaxPrice)?.label}
              <button
                onClick={() => setSelectedMaxPrice && setSelectedMaxPrice("All")}
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
          {selectedBaths !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Baths: {selectedBaths}+
              <button
                onClick={() => setSelectedBaths && setSelectedBaths("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedCompletion !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Status: {selectedCompletion}
              <button
                onClick={() => setSelectedCompletion && setSelectedCompletion("All")}
                className="hover:text-red-500 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedDeveloper !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-800 border border-gray-200">
              Developer: {selectedDeveloper}
              <button
                onClick={() => setSelectedDeveloper && setSelectedDeveloper("All")}
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

      {/* Filter Sidebar Drawer for Mobile (Portaled to document.body) */}
      {isSidebarOpen && mounted && createPortal(
        <MobileFilters
          setIsSidebarOpen={setIsSidebarOpen}
          setIsMapModalOpen={setIsMapModalOpen}
          countries={countries}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedPurpose={selectedPurpose}
          setSelectedPurpose={setSelectedPurpose}
          selectedArea={selectedArea}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedMinPrice={selectedMinPrice}
          setSelectedMinPrice={setSelectedMinPrice}
          selectedMaxPrice={selectedMaxPrice}
          setSelectedMaxPrice={setSelectedMaxPrice}
          selectedBeds={selectedBeds}
          setSelectedBeds={setSelectedBeds}
          selectedBaths={selectedBaths}
          setSelectedBaths={setSelectedBaths}
          selectedCompletion={selectedCompletion}
          setSelectedCompletion={setSelectedCompletion}
          selectedDeveloper={selectedDeveloper}
          setSelectedDeveloper={setSelectedDeveloper}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          handleClearAll={handleClearAll}
        />,
        document.body
      )}

      {/* Interactive Map Area Selector Modal */}
      <MapAreaModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        selectedArea={selectedArea}
        onSelectArea={(area) => setSelectedArea && setSelectedArea(area)}
      />
    </div>
  );
}
