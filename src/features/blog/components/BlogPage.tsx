import { useState } from "react";
import { Search, Calendar, User, ArrowRight, X, BookOpen, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

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
    <main className="min-h-screen bg-bg pb-24 mt-16 pt-8">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 mb-12 flex flex-col justify-center items-center">
        <span className="bg-primary/10 text-primary px-3 py-1 text-[10px] tracking-wider uppercase font-semibold rounded-md">
          Orange Journal
        </span>
        <h1 className="mt-4 font-serif text-3xl sm:text-5xl text-gray-900 leading-tight">
          Estates & Design Journal
        </h1>
        <p className="mt-2 text-gray-500 text-sm max-w-xl text-center">
          Insights, market reports, and design inspiration from our specialized property advisors and architects.
        </p>

        {/* Filters and Search */}
        <div className="mt-10 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          {/* Categories */}
          <div className="flex gap-2 flex-wrap border-b border-gray-100 pb-2 md:pb-0 w-full md:w-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-medium border transition-all cursor-pointer ${
                  selectedCategory === category
                    ? "bg-[#0c1e36] text-white border-[#0c1e36]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-350 hover:text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-455">
              <Search size={16} />
            </span>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-primary transition-colors font-medium text-gray-800"
            />
          </div>
        </div>
      </section>

      {/* Featured Post (only shown when category is All and no search query) */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 mb-16">
          <div className="bg-white border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden hover:shadow-md transition-shadow">
            <div className="lg:col-span-7 h-[300px] sm:h-[450px] relative overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-primary text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 shadow-sm">
                Featured Article
              </span>
            </div>
            
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between h-full min-h-[350px]">
              <div className="space-y-4">
                <span className="text-[10px] text-primary uppercase font-bold tracking-wider">{featuredPost.category}</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-gray-900 leading-snug hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedPost(featuredPost)}>
                  {featuredPost.title}
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-8 border-t border-gray-50 flex items-center justify-between mt-auto">
                <div className="flex gap-4 text-[10px] text-gray-400 font-medium">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {featuredPost.readTime}</span>
                </div>
                
                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="flex items-center gap-1 text-[11px] text-primary hover:text-black font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Read Article <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
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
              <div
                key={post.id}
                className="bg-white border border-gray-100 flex flex-col justify-between overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="relative h-56 overflow-hidden cursor-pointer" onClick={() => setSelectedPost(post)}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm text-gray-900 text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-sm border border-gray-100">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-3">
                    <h3 className="font-serif text-lg text-gray-900 leading-snug group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedPost(post)}>
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 font-light">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="flex items-center gap-0.5 text-primary hover:text-black font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Read <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Full Article Modal Reading View */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto relative rounded-lg border border-gray-100 flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-64 sm:h-96 w-full shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-gray-200"
                >
                  <X size={18} />
                </button>

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="bg-primary text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 shadow-sm rounded-sm">
                    {selectedPost.category}
                  </span>
                  <h2 className="font-serif text-xl sm:text-3xl font-semibold leading-tight drop-shadow-md">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-10 space-y-6">
                {/* Metadata */}
                <div className="flex gap-6 pb-4 border-b border-gray-100 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5 font-medium text-gray-700">
                    <User size={14} className="text-gray-400" /> By {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> Published on {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {selectedPost.readTime}
                  </span>
                </div>

                {/* Excerpt */}
                <p className="text-gray-600 font-serif italic text-base leading-relaxed border-l-2 border-primary pl-4">
                  {selectedPost.excerpt}
                </p>

                {/* Content paragraphs */}
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed font-light">
                  {selectedPost.content.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {/* Footer action */}
                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between mt-8">
                  <div className="text-xs text-gray-500">
                    Interested in premium London listings? Contact our agents.
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="px-5 py-2.5 border border-gray-200 text-xs tracking-wider uppercase font-semibold text-gray-600 hover:border-gray-400 hover:text-black transition-colors cursor-pointer"
                    >
                      Close Article
                    </button>
                    <Link
                      to="/properties"
                      onClick={() => setSelectedPost(null)}
                      className="px-5 py-2.5 bg-[#0c1e36] text-white text-xs tracking-wider uppercase font-semibold hover:bg-[#152e4f] transition-all shadow-sm cursor-pointer"
                    >
                      View Properties
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
