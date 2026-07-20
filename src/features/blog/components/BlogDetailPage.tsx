import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  Clock,
  Eye,

  Copy,
  Check,
} from "lucide-react";
import { env } from "../../../../env";
import { type BlogPost, blogPosts } from "../blog.utils";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import BlurImage from "#/components/ui/BlurImage";

const getTagsForCategory = (category: string) => {
  if (!category) return ["Real-Estate"];
  const mainTag = category.trim().replace(/\s+/g, '-');
  if (category.toLowerCase().includes("architect")) {
    return [mainTag, "Real-Estate", "Design"];
  }
  if (category.toLowerCase().includes("interior")) {
    return [mainTag, "Home-Decor", "Luxury-Living"];
  }
  if (category.toLowerCase().includes("market")) {
    return [mainTag, "Investment", "Finance"];
  }
  if (category.toLowerCase().includes("neighborhood") || category.toLowerCase().includes("guide")) {
    return [mainTag, "Location", "Community"];
  }
  return [mainTag, "Real-Estate", "Dubai"];
};

export default function BlogDetailPage({ post }: { post: BlogPost }) {
  const [copied, setCopied] = useState(false);
  const tags = getTagsForCategory(post.category);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Filter out the current post to display other latest posts in the sidebar
  const latestPosts = blogPosts
    .filter((p) => p.id !== post.id && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-bg py-28 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Back navigation */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-gray-500 hover:text-primary transition-all duration-300 mb-8 cursor-pointer group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Journal
        </Link>

        {/* Two column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6">
          {/* Left Main content: 8 columns */}
          <article className="lg:col-span-9 space-y-6">
            {/* Header Content */}
            <div className="space-y-4">
              {/* <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 -md px-3 py-1">
                {post.category}
              </span> */}

              <h1 className="font-serif text-3xl sm:text-4.5xl md:text-5xl lg:text-[46px] font-bold text-gray-900 leading-[1.15] tracking-tight">
                {post.title}
              </h1>


            </div>

            {/* Header Image */}
            <div className="relative -[2rem] overflow-hidden w-full aspect-[16/10] sm:aspect-[16/9] shadow-[0_15px_30px_rgba(0,0,0,0.03)] border border-gray-100/50 group">
              <BlurImage
                src={post.image.startsWith("http") ? post.image : `${env.VITE_OMSTORAGE_URL}${post.image}`}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-700"
              />
            </div>

            {/* Content paragraphs */}
            <div className="prose prose-neutral max-w-none text-gray-700 text-base sm:text-[17px] leading-relaxed font-normal space-y-6 pt-6">
              {post.content.map((p: any, i: number) => {
                if (
                  typeof p === 'string' &&
                  (p.includes('<p>') ||
                    p.includes('<h') ||
                    p.includes('<div') ||
                    p.includes('<ul') ||
                    p.includes('<ol'))
                ) {
                  return <div key={i} className="prose max-w-none prose-headings:font-serif" dangerouslySetInnerHTML={{ __html: p }} />
                }

                // Styling the lead paragraph for premium editorial feel
                if (i === 0) {
                  return (
                    <p key={i} className="text-lg sm:text-xl text-gray-650 font-normal leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:mt-1">
                      {p}
                    </p>
                  );
                }
                return <p key={i} className="text-gray-600">{p}</p>;
              })}
            </div>

            {/* Share and Tags row */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-50 hover:bg-gray-100/80 text-gray-500 hover:text-gray-900 text-xs font-semibold px-4 py-1.5 -full border border-gray-200/50 cursor-pointer transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Share:</span>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 -full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300"
                    title="Share on Twitter"
                  >
                    <FaTwitter size={14} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 -full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300"
                    title="Share on LinkedIn"
                  >
                    <FaLinkedin size={14} />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 -full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300"
                    title="Share on Facebook"
                  >
                    <FaFacebook size={14} />
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="w-8 h-8 -full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all duration-300 relative cursor-pointer"
                    title="Copy Link"
                  >
                    {copied ? (
                      <Check size={14} className="text-emerald-600 animate-in fade-in zoom-in-50 duration-200" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>



          </article>

          {/* Right Sidebar: 4 columns */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="sticky top-28 self-start space-y-8">
              {/* Invest Contact Card */}
              <div className="bg-white border border-[#F2ECE3] -[2rem] p-8 ">
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 tracking-tight">Want to invest in Dubai?</h3>
                <p className="text-xs sm:text-sm text-gray-550 leading-relaxed mb-6 font-normal">
                  Whether you are looking to invest, buy your dream home, or simply have a question about the Dubai market, our team of experts is ready to assist you.
                </p>

                {/* Buttons row */}
                <div className="flex gap-3 mb-6">
                  <a
                    href="tel:+442079460958"
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white -full py-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-300 text-center cursor-pointer"
                  >
                    <Phone size={13} />
                    Phone
                  </a>
                  <a
                    href="mailto:hello@orangeestate.co.uk"
                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 hover:scale-[1.02] active:scale-100 -full py-3 text-[11px] font-bold uppercase tracking-wider transition-all duration-300  text-center cursor-pointer"
                  >
                    <Mail size={13} />
                    Email
                  </a>
                </div>

                {/* Agent details */}
                <div className="border-t border-[#F2ECE3] pt-6 flex items-center gap-3">
                  <div className="w-10 h-10 -full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center font-bold text-sm">
                    AE
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 leading-tight">Adam El Adam</h4>
                    <p className="text-[11px] text-gray-500 font-semibold mt-0.5">Founder & Managing Director</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Speaks Arabic, English, French</p>
                  </div>
                </div>
              </div>

              {/* Latest Articles feed widget */}
              {latestPosts.length > 0 && (
                <div className="bg-white border border-gray-100 -[2rem] p-8  space-y-6">
                  <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Latest Journal Entries</h3>
                  <div className="space-y-6">
                    {latestPosts.map((latestPost) => (
                      <Link
                        key={latestPost.id}
                        to="/blog/$slug"
                        params={{ slug: latestPost.slug }}
                        className="flex gap-4 group cursor-pointer"
                      >
                        <div className="relative w-16 h-16 -xl overflow-hidden shrink-0 bg-gray-50 border border-gray-100">
                          <BlurImage
                            src={latestPost.image.startsWith("http") ? latestPost.image : `${env.VITE_OMSTORAGE_URL}${latestPost.image}`}
                            alt={latestPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="space-y-0.5 flex flex-col justify-center">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                            {latestPost.category}
                          </span>
                          <h4 className="text-xs font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-primary transition-colors duration-300">
                            {latestPost.title}
                          </h4>
                          <p className="text-[10px] text-gray-400 mt-0.5">{latestPost.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

