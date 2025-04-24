// SimpleEditor.tsx
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { useEffect, useRef } from 'react'
import { Ghost } from '../functions/Ghost'

export default function Tiptap() {
  const idleTimer = useRef<NodeJS.Timeout | null>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Underline,
      BulletList,
      ListItem,
      Ghost
    ],
    content: '',
  })

  useEffect(() => {
    if (editor) {
      const onUpdate = ({ editor }: { editor: Editor }) => {
        if (idleTimer.current) clearTimeout(idleTimer.current)
  
        idleTimer.current = setTimeout(async () => {
          const context = editor.getText()
          const suggestion = await fetchSuggestion(context)
  
          if (suggestion) {
            editor
              .chain()
              .focus()
              .insertContentAt(editor.state.selection.to, {
                type: 'text',
                text: suggestion,
                marks: [
                  {
                    type: 'ghost', 
                  },
                ],
              })
              
              .run()
          }
        }, 300)
      }
  
      editor.on('update', onUpdate)
  
      return () => {
        editor.off('update', onUpdate)
      }
    }
  
    return undefined
  }, [editor])
  

  type BtnProps = {
    active: boolean
    onClick: () => void
    label: string
  }

  async function fetchSuggestion(text: string): Promise<string> {
    if (text.trim().length < 5) return ''

    await new Promise(r => setTimeout(r, 200))
    return ' …recommended phrase'
  }

  const Btn: React.FC<BtnProps> = ({ active, onClick, label }) => (
    <button
      onMouseDown={e => {
        e.preventDefault()
        onClick()
      }}
      style={{
        minWidth: '40px',
        marginRight: 6,
        padding: '2px 6px',
        border: '1px solid #ccc',
        borderRadius: 3,
        background: active ? 'green' : '',
        fontWeight: active ? 700 : 400,
      }}
    >
      {label}
    </button>
  )

  return (
    <div style={{ border: '1px solid #ccc', padding: 8 }}>
      <div style={{ marginBottom: 8 }}>
        <Btn
          active={editor?.isActive('bold') || false}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          label="B"
        />

        <Btn
          active={editor?.isActive('italic') || false}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          label="I"
        />

        <Btn
          active={editor?.isActive('underline') || false}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          label="U"
        />

        <Btn
          active={editor?.isActive('heading', { level: 1 }) || false}
          onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          label="H1"
        />

        <Btn
          active={editor?.isActive('orderedList') || false}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          label="1. List"
        />

        <Btn
          active={editor?.isActive('bulletList') || false}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          label="• List"
        />

        <Btn
          active={false}
          onClick={() => editor?.chain().focus().undo().run()}
          label="Undo"
        />
        <Btn
          active={false}
          onClick={() => editor?.chain().focus().redo().run()}
          label="Redo"
        />
      </div>

      <EditorContent editor={editor} className="w-full min-h-60 outline-0 cursor-text" />
    </div>
  )
}
