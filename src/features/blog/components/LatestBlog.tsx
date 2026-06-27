import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function LatestBlog({featuredPost, setSelectedPost }: any) {
    return (
        <>
                <section className="max-w-7xl mx-auto px-6 sm:px-10 mb-16">
          <div className="bg-white border border-gray-100 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden  transition-shadow">
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
        </>
    )
}