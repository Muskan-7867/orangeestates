import { Sparkles } from 'lucide-react'
import React, { useRef } from 'react'
import Toolbar from './toolbar'
import { EditorContent } from '@tiptap/react'
import TitleSection from './title-section'

type Props = {
    editor: any
}

export default function EditingColumn({ editor }: Props) {



    const inlineFileInputRef = useRef<HTMLInputElement>(null)
    const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const formData = new FormData()
            formData.append('image', file)
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })
            if (!res.ok) throw new Error('Upload failed')
            const data = await res.json()
            editor?.chain().focus().setImage({ src: data.url }).run()

        } catch (err: any) {

        }
    }
    const addLink = () => {
        const previousUrl = editor?.getAttributes('link').href
        const url = window.prompt('URL to link to:', previousUrl)

        // cancelled
        if (url === null) return

        // empty
        if (url === '') {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }

    const addYoutubeVideo = () => {
        const url = window.prompt('Enter YouTube URL:')
        if (url) {
            editor?.chain().focus().setYoutubeVideo({ src: url }).run()
        }
    }


    if (!editor) {
        return null; // or a loading skeleton
    }


    return (
        <div className="lg:col-span-2 space-y-6">

            <TitleSection />

            {/* TipTap Rich Editor */}
            <div className="bg-white dark:bg-neutral-900/60 rounded-xl border border-neutral-200/80 dark:border-neutral-800/80 shadow-xs overflow-hidden">
                {/* Toolbar */}
                <Toolbar
                    editor={editor}
                    addLink={addLink}
                    addYoutubeVideo={addYoutubeVideo}
                    inlineFileInputRef={inlineFileInputRef}
                    handleInlineImageUpload={handleInlineImageUpload}
                />

                {/* TipTap Editor Container */}
                <div className="p-6 min-h-125 ">
                    <EditorContent
                        editor={editor}
                        className="prose prose-neutral dark:prose-invert max-w-none focus:outline-none focus:ring-0 min-h-120"
                    />
                </div>

                {/* Character & Word Count Status */}
                <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 text-xs text-neutral-500 flex items-center justify-between">
                    <span>
                        Words: {editor?.storage.characterCount.words() ?? 0} &middot; Characters:{' '}
                        {editor?.storage.characterCount.characters() ?? 0}
                    </span>
                    <span className="opacity-75 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-neutral-400" />
                        Editor autosaved locally
                    </span>
                </div>
            </div>
        </div>
    )
}