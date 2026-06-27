
import { Link } from "@tanstack/react-router";
import { Calendar, Clock, User, X } from "lucide-react";
import {  motion } from "motion/react";

export default function PreviewBlog({
    selectedPost,
    setSelectedPost
}: {
    setSelectedPost: any
    selectedPost: any
}) {
    return (
        <>
           <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 mt-12"
          >
            <motion.div data-lenis-prevent
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-4xl max-h-[85vh] overflow-y-auto scrollbar-hide relative rounded-lg border border-gray-100 flex flex-col"
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
                  {selectedPost.content.map((p: any, i:number) => (
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
        </>
    )
}