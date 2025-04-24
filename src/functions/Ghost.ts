import { Mark, mergeAttributes, RawCommands } from '@tiptap/core'

export const Ghost = Mark.create({
  name: 'ghost',

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-ghost]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-ghost': 'true',
        style: 'color: red; opacity: 0.6;',
      }),
      0,
    ]
  },

  // Adjusting the addCommands to return the correct structure
  addCommands() {
    return {
      // This must return an actual object with command logic
      setGhost() {
        return ({ commands }: { commands: RawCommands }) => {
          return commands.setMark('ghost')
        }
      },
    } as Partial<RawCommands>  // Explicitly casting to Partial<RawCommands>
  },
})
