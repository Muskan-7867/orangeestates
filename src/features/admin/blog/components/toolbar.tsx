import React from 'react'
import { ToolbarButton } from './toolbar-btn'
import {

    Image as ImageIcon,
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Heading2,
    List as ListIcon,
    ListOrdered,
    Quote,
    Code,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Heading3,
    Text
} from 'lucide-react'
import { FaYoutube } from 'react-icons/fa'

type Props = {
    editor: any
    addLink: () => void
    addYoutubeVideo: () => void
    inlineFileInputRef: React.RefObject<HTMLInputElement | null>
    handleInlineImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Toolbar({ editor, inlineFileInputRef, handleInlineImageUpload, addLink, addYoutubeVideo }: Props) {
    return (
        <div className="  dark:bg-neutral-900/95 border-b border-neutral-200 dark:border-neutral-800 p-1.5 flex flex-wrap gap-1 items-center backdrop-blur-md">
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                active={editor.isActive('bold')}
                title="Bold"
            >
                <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                active={editor.isActive('italic')}
                title="Italic"
            >
                <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                active={editor.isActive('underline')}
                title="Underline"
            >
                <UnderlineIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                active={editor.isActive('strike')}
                title="Strikethrough"
            >
                <Strikethrough className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                active={editor.isActive('code')}
                title="Inline Code"
            >
                <Code className="h-4 w-4" />
            </ToolbarButton>

            <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />

            <ToolbarButton
                onClick={() => editor.chain().focus().setParagraph().run()}
                active={editor.isActive('paragraph')}
                title="Paragraph"
            >
                <p className="h-4 w-4" >P</p>
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                active={editor.isActive('h2')}
                title="Heading 2"
            >
                <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('h3')}
                title="Heading 3"
            >
                <Heading3 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                active={editor.isActive('h3')}
                title="Paragraph"
            >
                <Text className="h-4 w-4" />
            </ToolbarButton>

            <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />

            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                active={editor.isActive('bulletList')}
                title="Bullet List"
            >
                <ListIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                active={editor.isActive('orderedList')}
                title="Ordered List"
            >
                <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                active={editor.isActive('blockquote')}
                title="Blockquote"
            >
                <Quote className="h-4 w-4" />
            </ToolbarButton>

            <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />

            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                active={editor.isActive({ textAlign: 'left' })}
                title="Align Left"
            >
                <AlignLeft className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                active={editor.isActive({ textAlign: 'center' })}
                title="Align Center"
            >
                <AlignCenter className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                active={editor.isActive({ textAlign: 'right' })}
                title="Align Right"
            >
                <AlignRight className="h-4 w-4" />
            </ToolbarButton>

            <div className="h-5 w-px bg-neutral-200 dark:bg-neutral-800 mx-1" />

            <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Add Link">
                <LinkIcon className="h-4 w-4" />
            </ToolbarButton>

            <ToolbarButton
                onClick={() => inlineFileInputRef.current?.click()}
                title="Upload Image Inline"
            >
                <ImageIcon className="h-4 w-4" />
            </ToolbarButton>
            <input
                type="file"
                ref={inlineFileInputRef}
                onChange={handleInlineImageUpload}
                accept="image/*"
                className="hidden"
            />

            <ToolbarButton onClick={addYoutubeVideo} title="Embed YouTube Video">
                <FaYoutube className="h-4 w-4" />
            </ToolbarButton>
        </div>
    )
}