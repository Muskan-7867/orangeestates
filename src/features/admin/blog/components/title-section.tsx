import { useShallow } from "zustand/react/shallow"
import { useBlogStore } from "../store/blog-store"
import { Globe } from "lucide-react"


export default function TitleSection() {
    const {
        title,
        slug,
        excerpt,
        isSlugLocked,
        actions,
    } = useBlogStore(
        useShallow((state) => ({
            title: state.title,
            slug: state.slug,
            excerpt: state.excerpt,
            isSlugLocked: state.isSlugLocked,
            actions: state.actions,
        }))
    )

    const {
        setTitle,
        setSlug,
        setExcerpt,
        setIsSlugLocked,
    } = actions
    return (
        <div className="bg-white dark:bg-neutral-900/60 p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs space-y-4">
            {/* Title Input */}
            <div>
                <input  
                    type="text"
                    value={title}
                    onChange={(e) => {
                        console.log(e.target.value)
                        setTitle(e.target.value)
                    }}
                    placeholder="Title of your post..."
                    className="w-full text-3xl sm:text-4xl font-extrabold text-neutral-900 dark:text-neutral-50 bg-transparent border-none outline-none focus:ring-0 placeholder-neutral-300 dark:placeholder-neutral-700 py-2"
                />
            </div>

            {/* Slug & Link display */}
            <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-950/50 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-900/80">
                <Globe className="h-4 w-4 shrink-0 text-neutral-400" />
                <span className="font-mono text-xs opacity-75 select-none">/blog/</span>
                <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                        setSlug(e.target.value)
                        setIsSlugLocked(false)
                    }}
                    placeholder="post-slug-here"
                    className="bg-transparent border-none outline-none font-mono text-xs flex-1 focus:ring-0 text-neutral-800 dark:text-neutral-200 p-0"
                />
                <button
                    type="button"
                    onClick={() => setIsSlugLocked(!isSlugLocked)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border select-none transition-colors ${isSlugLocked
                        ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black border-transparent'
                        : 'bg-transparent text-neutral-500 border-neutral-200 dark:border-neutral-800'
                        }`}
                    title={isSlugLocked ? 'Auto-generating from title' : 'Manual edit mode'}
                >
                    {isSlugLocked ? 'Auto' : 'Custom'}
                </button>
            </div>

            {/* Excerpt Summary */}
            <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 flex items-center gap-1">
                    Excerpt / Quick Summary
                </label>
                <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Write a brief, catchy summary of this blog post for listings and SEO..."
                    rows={2}
                    className="w-full text-sm bg-neutral-50/50 dark:bg-neutral-950/20 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-700"
                />
            </div>
        </div>
    )
}