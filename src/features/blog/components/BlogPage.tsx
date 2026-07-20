import { useState } from "react";
import { BookOpen } from "lucide-react";

import BlogCard from "./BlogCard";
import BlogFilters from "./BlogFilters";
import LatestBlog from "./LatestBlog";
import { type BlogPost, blogPosts, mapDbPostToBlogPost } from "../blog.utils";

export default function BlogPage({ initialPosts = [], initialCategories }: { initialPosts?: any[]; initialCategories?: any[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const dbCategories = ["All", ...(initialCategories || []).map((c: any) => c.name)];
  const categories = dbCategories.length > 1 ? dbCategories : ["All", "Architecture", "Interior Design", "Market Updates", "Neighborhood Guides"];

  // Map db posts and merge with mock if database is empty
  const dbPosts = initialPosts.map(mapDbPostToBlogPost);
  const activePosts = dbPosts.length > 0 ? dbPosts : blogPosts;

  const filteredPosts = activePosts.filter((post: BlogPost) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = activePosts[0] || blogPosts[0];


  return (
    <main className="min-h-screen bg-bg py-28 relative">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-10 mb-12 flex flex-col justify-center items-center">
      
        <h1 className="mt-4 font-serif text-3xl sm:text-5xl text-gray-900 leading-tight text-center">
          Estates & Design Journal
        </h1>
        <p className="mt-2 text-gray-500 text-sm max-w-xl text-center">
          Insights, market reports, and design inspiration from our specialized property advisors and architects.
        </p>

        {/* Filters and Search */}
        <BlogFilters categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </section>

      {/* Featured Post (only shown when category is All and no search query) */}
      {selectedCategory === "All" && searchQuery === "" && featuredPost && (
        <LatestBlog featuredPost={featuredPost} />
      )}

      {/* Blog Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10">
        {filteredPosts.length === 0 ? (
          <div className="bg-white border border-gray-100 p-16 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="font-serif text-lg text-gray-900 font-medium">No Articles Found</h3>
            <p className="text-xs text-gray-450 mt-1">Try adjusting your filters or search keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
