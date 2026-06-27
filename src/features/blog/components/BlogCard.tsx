import { Calendar, ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: any;
  onOpen: (post: any) => void;
}

export default function BlogCard({
  post,
  onOpen,
}: BlogCardProps) {
  return (
    <div className="bg-white border border-gray-100 flex flex-col overflow-hidden group">
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={() => onOpen(post)}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <span className="absolute bottom-4 left-4 bg-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 border">
          {post.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="space-y-3">
          <h3
            onClick={() => onOpen(post)}
            className="font-serif text-lg cursor-pointer hover:text-primary"
          >
            {post.title}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200 flex justify-between text-[10px]">
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {post.date}
          </span>

          <button
            onClick={() => onOpen(post)}
            className="flex items-center gap-1 text-primary"
          >
            Read
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}