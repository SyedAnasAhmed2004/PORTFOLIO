import { useState, type FormEvent, type KeyboardEvent } from 'react'

import { MAX_MESSAGE_LENGTH } from '../constants'

interface ChatComposerProps {
  disabled: boolean
  onSend: (content: string) => void
}

export function ChatComposer({ disabled, onSend }: ChatComposerProps) {
  const [draft, setDraft] = useState('')

  function submit() {
    if (!draft.trim() || disabled) return
    onSend(draft)
    setDraft('')
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    submit()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submit()
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 rounded-md border border-line bg-white/[0.03] p-1.5 transition-colors focus-within:border-fg/40"
    >
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <textarea
        id="chat-input"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={MAX_MESSAGE_LENGTH}
        rows={1}
        placeholder="Ask about my projects, skills or experience"
        className="field-sizing-content max-h-40 min-h-11 flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] placeholder:text-muted/70 focus:outline-none"
      />
      <button
        type="submit"
        disabled={disabled || !draft.trim()}
        aria-label="Send message"
        data-robot-attention
        className="group shrink-0 outline-offset-2 disabled:opacity-30"
      >
        <span className="grid size-11 place-items-center rounded-md bg-fg text-void transition-colors group-hover:bg-white">
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="square" />
          </svg>
        </span>
      </button>
    </form>
  )
}
