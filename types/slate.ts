// types/slate.ts
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

export type CustomText = {
  text: string
  bold?: boolean
}

export type ParagraphElement = {
  type: 'paragraph'
  children: CustomText[]
}

export type CustomElement = ParagraphElement

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
