import { ChevronDown, MapPin, Search, SlidersHorizontal, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";

type Props = {
  selectedPurpose?: string;
  setSelectedPurpose?: (purpose: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedArea: string;
  setIsMapModalOpen: (value: boolean) => void;
  setIsSidebarOpen: (value: boolean) => void;
  activeFiltersCount: number;
};

function PropertyTopBar({
  selectedPurpose = "all",
  setSelectedPurpose,
  searchQuery,
  setSearchQuery,
  selectedArea,
  setIsMapModalOpen,
  setIsSidebarOpen,
  activeFiltersCount,
}: Props) {
  const purposeOptions = [
    { label: "All Properties", value: "all" },
    { label: "Buy", value: "buy" },
    { label: "Rent", value: "rent" },
    { label: "New Homes", value: "new-homes" },
  ];

  const MapAreaButton = ({ className = "" }: { className?: string }) => (
    <button
      onClick={() => setIsMapModalOpen(true)}
      className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2.5 text-xs sm:text-sm font-medium border transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs ${
        selectedArea !== "All"
          ? "bg-primary text-white border-primary shadow-sm"
          : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:text-primary"
      } ${className}`}
      title="Select property location area on map"
    >
      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="truncate max-w-[100px] sm:max-w-none">
        {selectedArea !== "All" ? selectedArea : "Map Area"}
      </span>
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 w-full max-w-full">
      {/* Top Row: Purpose Selection & Mobile Map Area Button */}
      <div className="flex items-center justify-between md:justify-start gap-2 w-full md:w-auto">
        {/* Mobile Purpose Dropdown */}
        <div className="md:hidden flex-1">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold bg-white border border-gray-200 text-gray-800 cursor-pointer h-10 shadow-xs">
                <span className="truncate">
                  Purpose: {purposeOptions.find((p) => p.value === selectedPurpose)?.label || "All Properties"}
                </span>
                <ChevronDown className="w-4 h-4 opacity-60 shrink-0 ms-1" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[10000] min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
              {purposeOptions.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => setSelectedPurpose?.(item.value)}
                  className={
                    selectedPurpose === item.value
                      ? "bg-primary/10 text-primary font-semibold"
                      : ""
                  }
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Desktop Segmented Purpose Tabs */}
        <div className="hidden md:inline-flex items-center border border-gray-200 bg-white p-1">
          {purposeOptions.map((item) => {
            const active = selectedPurpose === item.value;

            return (
              <button
                key={item.value}
                onClick={() => setSelectedPurpose?.(item.value)}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  active
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {item.value === "all" ? "All" : item.label}
                {active && (
                  <span className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-white/80" />
                )}
              </button>
            );
          })}
        </div>

        {/* Map Area Button on Mobile */}
        <MapAreaButton className="flex md:hidden" />
      </div>

      {/* Bottom Row: Search Input, Desktop Map Selector & Mobile Filter Button */}
      <div className="flex items-center gap-2 w-full md:w-auto flex-1 md:flex-initial justify-between md:justify-end">
        {/* Search Input */}
        <div className="relative flex-1 md:w-64 lg:w-96 min-w-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search properties..."
            className="w-full pl-9 pr-8 py-2.5 sm:py-3 text-xs sm:text-sm bg-white border border-gray-200 focus:outline-none focus:border-primary transition-colors font-sans text-gray-800 placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Map Area Button for Desktop */}
        <MapAreaButton className="hidden md:flex" />

        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white border border-gray-200 text-gray-800 text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors shrink-0 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] font-bold bg-primary text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default PropertyTopBar;