import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { env } from "../../../../env";

interface BlogCardProps {
  post: any;
}

export default function BlogCard({
  post,
}: BlogCardProps) {
  return (
    <div className="bg-white border border-gray-100 flex flex-col overflow-hidden group">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="relative h-56 overflow-hidden cursor-pointer block"
      >
        {/* Blur placeholder */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${post.blurUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            transform: "scale(1.1)",
          }}
        />
        <img
          src={`${env.VITE_OMSTORAGE_URL}${post.image}`}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        <span className="absolute bottom-4 left-4 bg-white text-[9px] uppercase tracking-widest font-bold px-3 py-1 border">
          {post.category}
        </span>
      </Link>

      <div className="p-6 flex flex-col grow">
        <div className="space-y-3">
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="block"
          >
            <h3 className="font-serif text-lg cursor-pointer hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="pt-6 mt-6 border-t border-gray-200 flex justify-between text-[10px]">
          <span className="flex items-center gap-1 text-gray-400">
            <Calendar size={12} />
            {post.date}
          </span>

          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="flex items-center gap-1 text-primary hover:text-black transition-colors font-semibold uppercase tracking-wider"
          >
            Read
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}