import { useState } from "react";
import { BookOpen} from "lucide-react";

import { AnimatePresence } from "motion/react";
import BlogCard from "./BlogCard";
import BlogFilters from "./BlogFilters";
import LatestBlog from "./LatestBlog";
import PreviewBlog from "./PreviewBlog";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  blurUrl: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Evolution of London Penthouses",
    excerpt: "Discover the trends shaping modern high-rise architecture and luxurious penthouse design in Chelsea and Mayfair.",
    category: "Architecture",
    date: "June 24, 2026",
    author: "Alexander Mercer",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=20&q=10",
    content: [
      "In the heart of London, penthouses represent the absolute pinnacle of luxury living. Over the past decade, the demand for these top-tier residences has driven an architectural revolution. Traditional layouts have given way to soaring floor-to-ceiling glass windows, wide-open double-height ceilings, and expansive wraparound terraces that offer panoramic views of the River Thames and London skyline.",
      "In prestigious enclaves like Chelsea and Mayfair, developers are partnering with world-class interior designers to create custom interior palettes. These bespoke designs utilize rare marbles, exotic hardwoods, and handcrafted metal details to craft spaces that are both modern and classic.",
      "Beyond pure aesthetics, the modern penthouse is a marvel of building engineering. Advanced climate systems, acoustically-treated glass panes, and fully integrated smart home automation hubs are now standard. Residents can control lighting, sound, heating, and security from anywhere in the world, creating a secure, seamless environment of comfort."
    ]
  },
  {
    id: "2",
    title: "Minimalist Luxury: Interior Decor Trends for 2026",
    excerpt: "Learn how curated color palettes, natural materials, and subtle textures are redefining contemporary high-end townhouses.",
    category: "Interior Design",
    date: "June 18, 2026",
    author: "Sophia Vance",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=20&q=10",
    content: [
      "The concept of luxury has transitioned from ornate display to minimalist serenity. Today's modern homeowner seeks a sanctuary that calms the senses and celebrates pure craftsmanship. This design philosophy, known as 'quiet luxury' or 'warm minimalism,' focuses on light, space, and a deep connection to natural materials.",
      "Textured plasters, light oak floorboards, and raw linen fabrics are replacing heavy wallcoverings and dark varnished woods. The color palette is neutral, drawing inspiration from clay, sand, stone, and forest greens. These organic tones maximize natural sunlight, making apartments feel larger and more open.",
      "The secret to achieving this look lies in curation. Every piece of furniture must tell a story of craftsmanship. Statement sculptural furniture pieces, custom ambient lighting coves, and hidden storage drawers are favored to keep the design clean and clutter-free, letting the architecture shine."
    ]
  },
  {
    id: "3",
    title: "Buying Property in London: A Guide for International Buyers",
    excerpt: "Navigating UK tax structures, prime neighborhoods, and legal frameworks for overseas real estate investors.",
    category: "Market Updates",
    date: "May 29, 2026",
    author: "Elena Rostova",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=20&q=10",
    content: [
      "London remains a global safe haven for capital and prime real estate. For international buyers, the London market offers long-term stability, excellent educational institutions, and a cosmopolitan culture. However, purchasing property in the UK involves distinct legal, tax, and regulatory steps that buyers must understand.",
      "The main cost considerations are the Stamp Duty Land Tax (SDLT), which includes a surcharge for non-UK residents, and annual council tax. Working with specialized property lawyers and tax advisors is essential to ensure structure efficiency and compliance.",
      "Prime Central London (PCL)—including Chelsea, Knightsbridge, and Kensington—continues to be the primary target for foreign capital. With currency advantages and a historical track record of capital growth, investing in these core submarkets remains a premier strategy for building generational wealth."
    ]
  },
  {
    id: "4",
    title: "Chelsea vs. Kensington: Where to Invest?",
    excerpt: "A comprehensive comparison of average prices, historical trends, and local neighborhood amenities in Prime Central London.",
    category: "Neighborhood Guides",
    date: "May 12, 2026",
    author: "Julian Thorne",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=20&q=10",
    content: [
      "As two of London's most coveted boroughs, Kensington and Chelsea are frequently compared by prospective buyers. While they share beautiful Victorian architecture and top-tier local security, each neighborhood offers a unique lifestyle and investment outlook.",
      "Kensington is characterized by grand embassy buildings, royal parks (such as Kensington Gardens), and cultural hubs like the Royal Albert Hall. It tends to attract families seeking spacious townhouses and proximity to prestigious local schools.",
      "Chelsea, on the other hand, is a vibrant fashion and artistic capital centered around the King's Road and Sloane Square. Its properties consist of elegant garden square flats and colorful terraced houses. If you seek immediate proximity to high-end boutiques, contemporary art galleries, and modern dining, Chelsea is unmatched."
    ]
  },
  {
    id: "5",
    title: "Smart Home Automation: The Future of Luxury Living",
    excerpt: "How home tech is integrating seamlessly with premium architecture to create effortless everyday environments.",
    category: "Interior Design",
    date: "April 28, 2026",
    author: "Marcus Vance",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    blurUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=20&q=10",
    content: [
      "Luxury living is increasingly defined by ease and automation. The modern smart home is no longer a collection of separate apps, but a unified ecosystem that anticipates the resident's needs.",
      "Seamless integrations allow lighting sequences to change automatically based on the time of day, audio to follow you from room to room, and climate controls to optimize energy usage while maintaining ideal comfort levels.",
      "The design challenge is keeping this technology invisible. Flush-mounted keypads, hidden architectural speakers, and motorized shading panels behind custom ceiling coves ensure the home's aesthetics are never compromised by wiring and tech gear."
    ]
  }
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ["All", "Architecture", "Interior Design", "Market Updates", "Neighborhood Guides"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts[0];

  return (
    <main className="min-h-screen bg-bg py-28">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 mb-12 flex flex-col justify-center items-center">
        <span className="bg-primary/10 text-primary px-3 py-1 text-[10px] tracking-wider uppercase font-semibold rounded-md">
          Orange Journal
        </span>
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
      {selectedCategory === "All" && searchQuery === "" && (
        <LatestBlog featuredPost={featuredPost} setSelectedPost={setSelectedPost} />
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
                onOpen={setSelectedPost}
              />
            ))}
          </div>
        )}
      </section>

      {/* Full Article Modal Reading View */}
      <AnimatePresence>
        {selectedPost && (
             <PreviewBlog selectedPost={selectedPost} setSelectedPost={setSelectedPost}/>
        )}
      </AnimatePresence>
    </main>
  );
}
