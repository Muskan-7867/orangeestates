import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { FileText, PlusCircle } from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  beforeLoad: async () => {
    throw redirect({
      to: '/admin/blog/editor',
    })
  },
  component: AdminDashboard,
  ssr: false,
})

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
          Manage your content from here.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Blog Editor - New Post */}
          <Link
            to="/admin/blog/editor"
            className="group flex items-start gap-4 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
          >
            <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-colors">
              <PlusCircle className="h-5 w-5 text-neutral-600 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-50 text-sm">
                New Blog Post
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Create a new article from scratch
              </p>
            </div>
          </Link>

          {/* Blog Editor - Manage */}
          <Link
            to="/admin/blog/editor"
            className="group flex items-start gap-4 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-600 transition-all"
          >
            <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 transition-colors">
              <FileText className="h-5 w-5 text-neutral-600 dark:text-neutral-300 group-hover:text-white dark:group-hover:text-neutral-900 transition-colors" />
            </div>
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-50 text-sm">
                Blog Editor
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Edit or manage existing blog posts
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
