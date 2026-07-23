import { Button } from "#/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
  Bath,
  Bed,
  Building,
  Building2,
  ChevronDown,
  Clock,
  Globe,
  Home,
  MapIcon,
  MapPin,
  Maximize2,
  SlidersHorizontal,
  Tag,
  X,
} from "lucide-react";
import {
  bathOptions,
  bedOptions,
  completionOptions,
  developerOptions,
  maxPriceOptions,
  minPriceOptions,
  propertyTypes,
  sizeOptions,
} from "#/constants";

type MobileFiltersProps = {
  setIsSidebarOpen: (value: boolean) => void;
  setIsMapModalOpen: (value: boolean) => void;
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  selectedPurpose?: string;
  setSelectedPurpose?: (value: string) => void;
  selectedArea?: string;
  selectedType?: string;
  setSelectedType?: (value: string) => void;
  selectedMinPrice?: string;
  setSelectedMinPrice?: (value: string) => void;
  selectedMaxPrice?: string;
  setSelectedMaxPrice?: (value: string) => void;
  selectedBeds?: string;
  setSelectedBeds?: (value: string) => void;
  selectedBaths?: string;
  setSelectedBaths?: (value: string) => void;
  selectedCompletion?: string;
  setSelectedCompletion?: (value: string) => void;
  selectedDeveloper?: string;
  setSelectedDeveloper?: (value: string) => void;
  selectedSize?: string;
  setSelectedSize?: (value: string) => void;
  handleClearAll: () => void;
};

export default function MobileFilters({
  setIsSidebarOpen,
  setIsMapModalOpen,
  countries,
  selectedCountry,
  setSelectedCountry,
  selectedPurpose = "all",
  setSelectedPurpose,
  selectedArea = "All",
  selectedType = "All",
  setSelectedType,
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
  handleClearAll,
}: MobileFiltersProps) {
  const handleSelectAndClose = (fn?: () => void) => {
    if (fn) fn();
    setIsSidebarOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] md:hidden">
      {/* Backdrop Overlay */}
      <div
        onClick={() => setIsSidebarOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      />

      {/* Bottom Sheet Panel */}
      <div className="fixed inset-x-0 bottom-0 z-10 w-full max-h-[85vh] bg-white rounded-t-2xl flex flex-col transition-transform duration-300 animate-in slide-in-from-bottom shadow-2xl overflow-hidden">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 shrink-0" />

        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-serif font-medium text-gray-900">
              Filter Properties
            </h3>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sheet Body */}
        <div className="p-5 overflow-y-auto scrollbar-hide flex-1 flex flex-col gap-8">
          {/* Purpose Option (Buy / Rent) */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-primary" />
              <span>Property Purpose</span>
            </label>
            <div className="flex gap-1.5 bg-gray-100 p-1 border border-gray-200">
              {[
                { label: "All", value: "all" },
                { label: "Buy", value: "buy" },
                { label: "Rent", value: "rent" },
                { label: "New Homes", value: "new-homes" },
              ].map((p) => (
                <button
                  key={p.value}
                  onClick={() => handleSelectAndClose(() => setSelectedPurpose && setSelectedPurpose(p.value))}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer text-center ${
                    selectedPurpose === p.value
                      ? "bg-primary text-white shadow-xs"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Map Area Selection Option */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>Map Area Location</span>
            </label>
            <button
              onClick={() => {
                setIsSidebarOpen(false);
                setIsMapModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm bg-gray-900 hover:bg-primary text-white transition-colors font-medium cursor-pointer"
            >
              <span className="flex items-center gap-2 truncate">
                <MapIcon className="w-4 h-4" />
                <span>
                  {selectedArea !== "All"
                    ? `Area: ${selectedArea}`
                    : "Select Area on Map"}
                </span>
              </span>
              <ChevronDown className="-me-1 ms-2 opacity-60 shrink-0" size={16} />
            </button>
          </div>

          {/* Country / Region */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Country / Region</span>
            </label>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer h-10 px-3"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                    {selectedCountry === "All"
                      ? "All Countries / Regions"
                      : selectedCountry}
                  </span>
                  <ChevronDown
                    className="-me-1 ms-2 opacity-60 shrink-0"
                    size={16}
                    strokeWidth={2}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[10000] min-w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto scrollbar-hide bg-white border border-gray-200 shadow-lg p-1">
                {countries.map((country) => (
                  <DropdownMenuItem
                    key={country}
                    onClick={() => handleSelectAndClose(() => setSelectedCountry(country))}
                    className={
                      selectedCountry === country
                        ? "bg-primary/10 text-primary font-semibold"
                        : ""
                    }
                  >
                    {country === "All" ? "All Countries / Regions" : country}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>Property Type</span>
            </label>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer h-10 px-3"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-4 h-4 text-gray-400 shrink-0" />
                    {propertyTypes.find((t) => t.value === selectedType)?.label ||
                      "Type"}
                  </span>
                  <ChevronDown
                    className="-me-1 ms-2 opacity-60 shrink-0"
                    size={16}
                    strokeWidth={2}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[10000] min-w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto scrollbar-hide bg-white border border-gray-200 shadow-lg p-1">
                {propertyTypes.map((t) => (
                  <DropdownMenuItem
                    key={t.value}
                    onClick={() => handleSelectAndClose(() => setSelectedType && setSelectedType(t.value))}
                    className={
                      selectedType === t.value
                        ? "bg-primary/10 text-primary font-semibold"
                        : ""
                    }
                  >
                    {t.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Min & Max Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span>Min Price</span>
              </label>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer h-10 px-3"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                      {minPriceOptions.find((p) => p.value === selectedMinPrice)
                        ?.label || "Min Price"}
                    </span>
                    <ChevronDown
                      className="-me-1 ms-2 opacity-60 shrink-0"
                      size={16}
                      strokeWidth={2}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-[10000] min-w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto scrollbar-hide bg-white border border-gray-200 shadow-lg p-1">
                  {minPriceOptions.map((p) => (
                    <DropdownMenuItem
                      key={p.value}
                      onClick={() => handleSelectAndClose(() => setSelectedMinPrice && setSelectedMinPrice(p.value))}
                      className={
                        selectedMinPrice === p.value
                          ? "bg-primary/10 text-primary font-semibold"
                          : ""
                      }
                    >
                      {p.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span>Max Price</span>
              </label>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer h-10 px-3"
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                      {maxPriceOptions.find((p) => p.value === selectedMaxPrice)
                        ?.label || "Max Price"}
                    </span>
                    <ChevronDown
                      className="-me-1 ms-2 opacity-60 shrink-0"
                      size={16}
                      strokeWidth={2}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-[10000] min-w-[--radix-dropdown-menu-trigger-width] scrollbar-hide max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg p-1">
                  {maxPriceOptions.map((p) => (
                    <DropdownMenuItem
                      key={p.value}
                      onClick={() => handleSelectAndClose(() => setSelectedMaxPrice && setSelectedMaxPrice(p.value))}
                      className={
                        selectedMaxPrice === p.value
                          ? "bg-primary/10 text-primary font-semibold"
                          : ""
                      }
                    >
                      {p.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-primary" />
              <span>Bedrooms</span>
            </label>
            <div className="flex gap-1.5">
              {bedOptions.map((b) => (
                <button
                  key={b.value}
                  onClick={() => handleSelectAndClose(() => setSelectedBeds && setSelectedBeds(b.value))}
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

          {/* Bathrooms */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Bath className="w-3.5 h-3.5 text-primary" />
              <span>Bathrooms</span>
            </label>
            <div className="flex gap-1.5">
              {bathOptions.map((b) => (
                <button
                  key={b.value}
                  onClick={() => handleSelectAndClose(() => setSelectedBaths && setSelectedBaths(b.value))}
                  className={`flex-1 py-2 text-xs font-medium border transition-all cursor-pointer text-center ${
                    selectedBaths === b.value
                      ? "bg-primary text-white border-primary shadow-xs"
                      : "bg-gray-50 text-gray-700 border-gray-200"
                  }`}
                >
                  {b.value === "All" ? "Any" : `${b.value}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Completion Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary" />
              <span>Completion Status</span>
            </label>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer h-10 px-3"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    {completionOptions.find((c) => c.value === selectedCompletion)
                      ?.label || "Completion"}
                  </span>
                  <ChevronDown
                    className="-me-1 ms-2 opacity-60 shrink-0"
                    size={16}
                    strokeWidth={2}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[10000] min-w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto scrollbar-hide bg-white border border-gray-200 shadow-lg p-1">
                {completionOptions.map((c) => (
                  <DropdownMenuItem
                    key={c.value}
                    onClick={() => handleSelectAndClose(() => setSelectedCompletion && setSelectedCompletion(c.value))}
                    className={
                      selectedCompletion === c.value
                        ? "bg-primary/10 text-primary font-semibold"
                        : ""
                    }
                  >
                    {c.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Developer */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-primary" />
              <span>Developer</span>
            </label>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer h-10 px-3"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Building className="w-4 h-4 text-gray-400 shrink-0" />
                    {developerOptions.find((d) => d.value === selectedDeveloper)
                      ?.label || "Developer"}
                  </span>
                  <ChevronDown
                    className="-me-1 ms-2 opacity-60 shrink-0"
                    size={16}
                    strokeWidth={2}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[10000] scrollbar-hide min-w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg p-1">
                {developerOptions.map((d) => (
                  <DropdownMenuItem
                    key={d.value}
                    onClick={() => handleSelectAndClose(() => setSelectedDeveloper && setSelectedDeveloper(d.value))}
                    className={
                      selectedDeveloper === d.value
                        ? "bg-primary/10 text-primary font-semibold"
                        : ""
                    }
                  >
                    {d.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-primary" />
              <span>Property Size</span>
            </label>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal text-sm bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 cursor-pointer h-10 px-3"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Maximize2 className="w-4 h-4 text-gray-400 shrink-0" />
                    {sizeOptions.find((s) => s.value === selectedSize)?.label ||
                      "Size"}
                  </span>
                  <ChevronDown
                    className="-me-1 ms-2 opacity-60 shrink-0"
                    size={16}
                    strokeWidth={2}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[10000] min-w-[--radix-dropdown-menu-trigger-width] max-h-60 overflow-y-auto scrollbar-hide bg-white border border-gray-200 shadow-lg p-1">
                {sizeOptions.map((s) => (
                  <DropdownMenuItem
                    key={s.value}
                    onClick={() => handleSelectAndClose(() => setSelectedSize && setSelectedSize(s.value))}
                    className={
                      selectedSize === s.value
                        ? "bg-primary/10 text-primary font-semibold"
                        : ""
                    }
                  >
                    {s.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleSelectAndClose(handleClearAll)}
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
    </div>
  );
}