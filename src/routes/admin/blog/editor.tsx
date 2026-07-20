import { createFileRoute, Link as RouterLink } from '@tanstack/react-router'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  Table,
  TableRow,
  TableHeader,
  TableCell,
} from '@tiptap/extension-table'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'
import Placeholder from '@tiptap/extension-placeholder'
import Youtube from '@tiptap/extension-youtube'

import { useState, useEffect, } from 'react'
import { useShallow } from 'zustand/react/shallow';
import {
  Save,
  ArrowLeft,
  ExternalLink,
  Loader2,
  FileText,
  Calendar,
  Folder
} from 'lucide-react'

import { getPost, savePostSFN } from '#/features/admin/blog/server/blog.fn'
import { useBlogStore } from '#/features/admin/blog/store/blog-store'
import EditingColumn from '#/features/admin/blog/components/editing-column'
import toast from 'react-hot-toast'
import CreateCategory from '#/features/admin/blog/components/create-category'
import { getCategoriesQueryOption } from '#/lib/query/query-options'
import { useSuspenseQuery } from '@tanstack/react-query'
import CoverImageUploader from '#/features/admin/blog/components/cover-image-uploader'
import { uploadSingleImage } from '#/utils/media-util'


import { BlogEditorSearchSchema } from '#/features/admin/blog/schema/blog-schema'
import { Button } from '#/components/ui/button'
import { env } from '../../../../env'



export const Route = createFileRoute('/admin/blog/editor')({
  validateSearch: (search) => BlogEditorSearchSchema.parse(search),
  loaderDeps: ({ search: { id, title } }) => ({ id, title }),
  loader: async ({ context, deps: { id, title } }) => {
    await context.queryClient.ensureQueryData(getCategoriesQueryOption());

    let post = null
    if (id) {
      post = await getPost({ data: { id } })
    } else if (title) {
      post = await getPost({ data: { title } })
    }
    return { post }
  },
  ssr: false,
  component: RouteComponent,
  pendingComponent: () => <div className='text-foreground'>Loading</div>,
  errorComponent: ({ error, reset }) => <div>
    <h1 className='text-black'>{error.message}</h1>
    <Button onClick={reset}>Reset</Button>
  </div>,
})



function RouteComponent() {
  const { post, } = Route.useLoaderData()

  const { data: categories } = useSuspenseQuery(getCategoriesQueryOption());


  const {
    setTitle,
    setSlug,
    setExcerpt,
    setCategoryId,
    setStatus,
    setCoverImage,
    setFeatured,
    setIsSlugLocked
  } = useBlogStore(state => state.actions)

  const {
    title,
    slug,
    categoryId,
    status,
    featured,
    isSlugLocked,
    content,
    excerpt,
    coverImageFile,
  } = useBlogStore(
    useShallow(
      state => ({
        title: state.title,
        slug: state.slug,
        categoryId: state.categoryId,
        status: state.status,
        coverImage: state.coverImage,
        featured: state.featured,
        isSlugLocked: state.isSlugLocked,
        content: state.content,
        excerpt: state.excerpt,
        coverImageFile: state.coverImageFile
      })))

  // System states
  const [isSaving, setIsSaving] = useState(false)




  // Auto-generate slug from title
  useEffect(() => {
    if (isSlugLocked && !post?.id) {
      const generated = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setSlug(generated)
    }
  }, [title, isSlugLocked, post?.id])

  // Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Placeholder.configure({
        placeholder: 'Start writing your amazing story here...',
      }),
      Typography,
      CharacterCount.configure({
        limit: 100000,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({
        controls: false,
      }),
    ],
    content: post?.content || content,
  })

  // Load post data into store on edit or reset on create
  useEffect(() => {
    if (post) {
      setTitle(post.title || '')
      setSlug(post.slug || '')
      setExcerpt(post.excerpt || '')
      setCategoryId(post.category || '')
      setStatus(post.status as any || 'draft')
      setCoverImage(post.coverImage || '')
      setFeatured(post.featured || false)
      setIsSlugLocked(false)
    } else {
      setTitle('')
      setSlug('')
      setExcerpt('')
      setCategoryId('')
      setStatus('draft' as any)
      setCoverImage('')
      setFeatured(false)
      setIsSlugLocked(true)
    }
  }, [post])

  // Sync editor content when editor is initialized or post changes
  useEffect(() => {
    if (!editor || editor.isDestroyed) return

    try {
      if (editor.isEmpty) {
        editor.commands.setContent(post?.content || '')
      }
    } catch (e) {
      console.warn('Failed to set editor content:', e)
    }
  }, [post, editor])

  // Save Blog Post
  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Title is required')
      return
    }
    if (!slug.trim()) {
      toast.error('Slug is required')
      return
    }
    const editorContent = editor?.getHTML() || ''
    if (!editorContent.trim() || editorContent === '<p></p>') {
      toast.error('Content is required')
      return
    }

    setIsSaving(true)
    if (!coverImageFile) {
      toast.error("Cover Image not Provided")
      return
    }
    try {
      const {
        imageId,
        name,
        url,
        thumbhash,
        blurDataUrl
      } = await uploadSingleImage(coverImageFile, env.VITE_MEDIA_UPLOAD_PROJECT_NAME)

      await savePostSFN({
        data: {
          id: post?.id,
          title,
          slug,
          excerpt,
          content: editorContent,
          imageId,
          name,
          url,
          thumbhash,
          blurDataUrl,
          status: status as any,
          featured,
          categoryId: categoryId,
        },
      })

      toast.success(`Post saved as ${status}!`)

      // if (!post?.id && result.post?.id) {
      //   // Redirect to editing view of the newly created post
      //   window.location.search = `?id=${result.post.id}`
      // }
    } catch (err: any) {
      console.log(err)
      setIsSaving(false)
      toast.error("error ->" + err.message || 'Failed to save post')
    } finally {
      setIsSaving(false)
    }
  }



  if (!editor) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950/30 pb-16 font-sans">


      {/* Header bar */}
      <header className="sticky top-0 z-30 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RouterLink
              to="/admin"
              className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors"
              title="Back to admin"
            >
              <ArrowLeft className="h-5 w-5" />
            </RouterLink>
            <div>
              <nav className="text-xs text-neutral-500 dark:text-neutral-400 mb-0.5">
                Admin &middot; Blog Editor
              </nav>
              <h1 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                <FileText className="h-5 w-5 text-neutral-500" />
                {post?.id ? 'Edit Blog Post' : 'Create New Post'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {post?.id && status === 'published' && (
              <a
                href={`/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-600 dark:text-neutral-300 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Post
              </a>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-sm transition-all disabled:opacity-75"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {post?.id ? 'Save Changes' : 'Save & Continue'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Editing Column */}
          <EditingColumn editor={editor} />

          {/* Right Settings Sidebar */}
          <div className="space-y-6">
            {/* Publish Actions Card */}
            <div className="bg-white dark:bg-neutral-900/60 p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-neutral-400" /> Publishing
              </h2>

              {/* Status Selector */}
              <div className="space-y-1">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  Publication Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full text-sm bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-700 cursor-pointer"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Featured Post Toggle */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50/60 dark:bg-neutral-950/30 border border-neutral-100 dark:border-neutral-900/80">
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                    Featured Post
                  </span>
                  <p className="text-[10px] text-neutral-400">
                    Display prominently on the blog landing page.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-neutral-200 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-900 dark:peer-checked:bg-neutral-100"></div>
                </label>
              </div>

              <Button
                onClick={handleSave}
                disabled={isSaving}
              // className="w-full text-center bg-neutral-950 text-white dark:bg-neutral-50 dark:text-neutral-950 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-1.5"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Post
              </Button>
            </div>

            {/* Category Card */}
            <div className="bg-white dark:bg-neutral-900/60 p-6 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs space-y-4">
              <h2 className="text-sm font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider flex items-center gap-1.5">
                <Folder className="h-4 w-4 text-neutral-400" /> Category
              </h2>

              {/* Select Category */}
              <div className="space-y-1">
                <label className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  Select Category
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full text-sm bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 rounded-lg p-2.5 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-700 cursor-pointer"
                >
                  <option value="">-- Choose Category --</option>
                  {
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))
                  }
                </select>
              </div>

              <CreateCategory />
            </div>
            <CoverImageUploader />
          </div>


        </div>
      </main>
    </div>
  )
}
