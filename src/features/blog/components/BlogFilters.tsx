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
    <div className="mt-10 flex flex-col md:flex-row gap-6 justify-between">
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 text-xs border ${
              selectedCategory === category
                ? "bg-[#0c1e36] text-white"
                : "bg-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-80">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />

        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles..."
          className="w-full border pl-10 py-2"
        />
      </div>
    </div>
  );
}