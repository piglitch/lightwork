// SimpleEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'


export default function Tiptap() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,   
            Underline,   
        ],
        content: '<p>Hello!</p>',
    })

    if (!editor) return null

    const Btn = (cmd: () => void, label: string) => (
        <button
            onMouseDown={e => { e.preventDefault(); cmd() }}
            style={{ marginRight: 6, padding: '2px 6px' }}
        >
            {label}
        </button>
    )

  return (
    <div style={{ border: '1px solid #ccc', padding: 8 }}>
      {/*––– Toolbar –––*/}
      <div style={{ marginBottom: 8 }}>
        {Btn(() => editor.chain().focus().toggleBold().run(), 'Bold')}
        {Btn(() => editor.chain().focus().toggleItalic().run(), 'Italic')}
        {Btn(() => editor.chain().focus().toggleUnderline().run(), 'Underline')}
        {Btn(() => editor.chain().focus().toggleHeading({ level: 1 }).run(), 'H1')}
        {Btn(() => editor.chain().focus().toggleBulletList().run(), '• List')}
        {Btn(() => editor.chain().focus().undo().run(), 'Undo')}
        {Btn(() => editor.chain().focus().redo().run(), 'Redo')}
      </div>

      {/*––– Editor –––*/}
      <EditorContent editor={editor} className='w-full min-h-60 outline-0 cursor-text' />
    </div>
  )
}
