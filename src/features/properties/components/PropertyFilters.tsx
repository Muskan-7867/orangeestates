import { Search } from "lucide-react";

interface PropertyFiltersProps {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function PropertyFilters({
  countries,
  selectedCountry,
  setSelectedCountry,
  searchQuery,
  setSearchQuery,
}: PropertyFiltersProps) {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
      {/* Country Filter - Left Side */}
      <div className="flex flex-wrap items-center gap-2">
        {countries.map((country) => (
          <button
            key={country}
            onClick={() => setSelectedCountry(country)}
            className={`px-4 py-2 text-xs md:text-sm uppercase tracking-wider border transition-all duration-300 cursor-pointer rounded-sm font-medium ${
              selectedCountry === country
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300 "
            }`}
          >
            {country}
          </button>
        ))}
      </div>

      {/* Search Input - Right Side */}
      <div className="relative w-full md:w-180">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search properties..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-sm focus:outline-none focus:border-primary transition-colors font-sans text-gray-800 placeholder-gray-400 "
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>
    </div>
  );
}
