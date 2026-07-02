import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function LatestBlog({
  featuredPost,
  setSelectedPost,
}: any) {
  return (
    <section className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden border border-gray-100 bg-white transition-shadow  lg:grid lg:grid-cols-12">
        {/* Image */}
        <div className="relative h-64 sm:h-80 md:h-105 lg:col-span-7 overflow-hidden">
          {/* Blur placeholder */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${featuredPost.blurUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(12px)",
              transform: "scale(1.1)",
            }}
          />
          <img
            src={featuredPost.image}
            alt={featuredPost.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          />

          <span className="absolute left-4 top-4 bg-primary px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm sm:text-[10px]">
            Featured Article
          </span>
        </div>

        {/* Content */}
        <div className="flex min-h-80 flex-col justify-between p-5 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
              {featuredPost.category}
            </span>

            <h2
              onClick={() => setSelectedPost(featuredPost)}
              className="cursor-pointer font-serif text-2xl leading-tight text-gray-900 transition-colors hover:text-primary sm:text-3xl"
            >
              {featuredPost.title}
            </h2>

            <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
              {featuredPost.excerpt}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4 text-[11px] font-medium text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar size={13} />
                {featuredPost.date}
              </span>

              <span className="flex items-center gap-1">
                <Clock size={13} />
                {featuredPost.readTime}
              </span>
            </div>

            <button
              onClick={() => setSelectedPost(featuredPost)}
              className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-primary transition-colors hover:text-black sm:justify-start"
            >
              Read Article
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}