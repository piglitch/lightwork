// SimpleEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextStyle from '@tiptap/extension-text-style'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'


export default function Tiptap() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,   
            Underline,   
            BulletList,
            ListItem,
        ],
        content: '',
    })

    if (!editor) return null


    type BtnProps = {
        active: boolean
        onClick: () => void
        label: string
    }
  
  const Btn: React.FC<BtnProps> = ({ active, onClick, label }) => (
    <button
      onMouseDown={e => { e.preventDefault(); onClick() }}
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
      {/*––– Toolbar –––*/}
    <div style={{ marginBottom: 8 }}>
        <Btn
            active={editor.isActive('bold')}
            onClick={() => editor.chain().focus().toggleBold().run()}
            label="B"
        />

        <Btn
            active={editor.isActive('italic')}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            label="I"
        />

        <Btn
            active={editor.isActive('underline')}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            label="U"
        />

        <Btn
            active={editor.isActive('heading', { level: 1 })}
            onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            label="H1"
        />

        <Btn active={editor.isActive('orderedList')}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            label="1. List" 
        />
        
        <Btn
            active={editor.isActive('bulletList')}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            label="• List"
        />

        <Btn active={false} onClick={() => editor.chain().focus().undo().run()} label="Undo" />
        <Btn active={false} onClick={() => editor.chain().focus().redo().run()} label="Redo" />
    </div>

      <EditorContent editor={editor} className='w-full min-h-60 outline-0 cursor-text' />
    
    </div>
  )
}
