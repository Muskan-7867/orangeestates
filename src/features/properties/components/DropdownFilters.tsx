import {
  Building2,
  Tag,
  Bed,
  Bath,
  RotateCcw,
  SlidersHorizontal,
  Globe,
  Clock,
  Building,
  ChevronDown,
} from "lucide-react";
import { Button } from "#/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu.tsx";
import { bathOptions, bedOptions, completionOptions, developerOptions, maxPriceOptions, minPriceOptions, propertyTypes } from "#/constants";

type Props = {
    countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
   selectedType?: string;
  setSelectedType?: (type: string) => void;
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
  hasActiveFilters: boolean,
  handleClearAll: () => void
}

function DropdownFilters({countries,selectedCountry,setSelectedCountry, selectedType, setSelectedType, selectedMinPrice, setSelectedMinPrice,selectedMaxPrice,setSelectedMaxPrice,selectedBeds,setSelectedBeds,selectedBaths,setSelectedBaths,selectedCompletion,setSelectedCompletion,selectedDeveloper,setSelectedDeveloper,hasActiveFilters, handleClearAll }: Props) {
  return (
       <div className="hidden md:grid py-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9 gap-2.5 sm:gap-3 items-center">
        {/* Country Filter Dropdown */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700 hover:text-gray-900 cursor-pointer h-11 px-2.5 sm:px-3 hover:bg-white"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{selectedCountry === "All" ? "Country" : selectedCountry}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white hover:bg-white border border-gray-200 shadow-lg p-1">
            {countries.map((country) => (
              <DropdownMenuItem
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={selectedCountry === country ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {country === "All" ? "All Countries" : country}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Property Type Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700  cursor-pointer h-11 px-2.5 sm:px-3"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{propertyTypes.find((t) => t.value === selectedType)?.label || "Type"}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
            {propertyTypes.map((t) => (
              <DropdownMenuItem
                key={t.value}
                onClick={() => setSelectedType && setSelectedType(t.value)}
                className={selectedType === t.value ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {t.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Min Price Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700  hover:text-gray-900 cursor-pointer h-11 px-2.5 sm:px-3"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{minPriceOptions.find((p) => p.value === selectedMinPrice)?.label || "Min Price"}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
            {minPriceOptions.map((p) => (
              <DropdownMenuItem
                key={p.value}
                onClick={() => setSelectedMinPrice && setSelectedMinPrice(p.value)}
                className={selectedMinPrice === p.value ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {p.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Max Price Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700  hover:text-gray-900 cursor-pointer h-11 px-2.5 sm:px-3"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Tag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{maxPriceOptions.find((p) => p.value === selectedMaxPrice)?.label || "Max Price"}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
            {maxPriceOptions.map((p) => (
              <DropdownMenuItem
                key={p.value}
                onClick={() => setSelectedMaxPrice && setSelectedMaxPrice(p.value)}
                className={selectedMaxPrice === p.value ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {p.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Bedrooms Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700  hover:text-gray-900 cursor-pointer h-11 px-2.5 sm:px-3"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Bed className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{bedOptions.find((b) => b.value === selectedBeds)?.label || "Beds"}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
            {bedOptions.map((b) => (
              <DropdownMenuItem
                key={b.value}
                onClick={() => setSelectedBeds && setSelectedBeds(b.value)}
                className={selectedBeds === b.value ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {b.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Baths Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700  hover:text-gray-900 cursor-pointer h-11 px-2.5 sm:px-3"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Bath className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{bathOptions.find((b) => b.value === selectedBaths)?.label || "Baths"}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
            {bathOptions.map((b) => (
              <DropdownMenuItem
                key={b.value}
                onClick={() => setSelectedBaths && setSelectedBaths(b.value)}
                className={selectedBaths === b.value ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {b.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Completion Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700  hover:text-gray-900 cursor-pointer h-11 px-2.5 sm:px-3"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{completionOptions.find((c) => c.value === selectedCompletion)?.label || "Completion"}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
            {completionOptions.map((c) => (
              <DropdownMenuItem
                key={c.value}
                onClick={() => setSelectedCompletion && setSelectedCompletion(c.value)}
                className={selectedCompletion === c.value ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {c.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Developer Filter */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between font-normal text-xs bg-white border-gray-200 text-gray-700  hover:text-gray-900 cursor-pointer h-11 px-2.5 sm:px-3"
            >
              <span className="flex items-center gap-1.5 truncate min-w-0">
                <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0" />
                <span className="truncate">{developerOptions.find((d) => d.value === selectedDeveloper)?.label || "Developer"}</span>
              </span>
              <ChevronDown className="-me-1 ms-1 opacity-60 shrink-0" size={14} strokeWidth={2} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[--radix-dropdown-menu-trigger-width] bg-white border border-gray-200 shadow-lg p-1">
            {developerOptions.map((d) => (
              <DropdownMenuItem
                key={d.value}
                onClick={() => setSelectedDeveloper && setSelectedDeveloper(d.value)}
                className={selectedDeveloper === d.value ? "bg-primary/10 text-primary font-semibold" : ""}
              >
                {d.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Reset / Action Button */}
        <div className="flex items-center gap-2">
          {hasActiveFilters ? (
            <button
              onClick={handleClearAll}
              className="w-full flex items-center justify-center gap-1.5 px-3 h-11 text-xs sm:text-sm bg-white  text-gray-700 font-medium border border-gray-300 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          ) : (
            <div className="w-full bg-white flex items-center justify-center gap-1.5 px-3 h-11 text-xs text-gray-400 font-medium border border-dashed border-gray-200">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </div>
          )}
        </div>
      </div>
  )
}

export default DropdownFilters