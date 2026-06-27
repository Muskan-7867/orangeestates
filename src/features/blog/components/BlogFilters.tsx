import { Search } from "lucide-react";

interface Props {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export default function BlogFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
}: Props) {
  return (
    <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-sm border px-4 py-2 text-xs font-medium transition-colors ${
              selectedCategory === category
                ? "bg-[#0c1e36] text-white border-[#0c1e36]"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full lg:w-80 shrink-0">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          className="h-11 w-full rounded-sm border pl-10 pr-4 text-sm outline-none transition focus:border-[#0c1e36]"
        />
      </div>
    </div>
  );
}