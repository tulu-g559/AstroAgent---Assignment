import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [text])

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-[var(--border)] bg-bg-primary px-4 md:px-6 py-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <div className="flex items-end bg-surface-1 border border-[var(--border)] rounded-xl overflow-hidden">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about your birth chart..."
          rows={1}
          className="flex-1 bg-transparent border-none outline-none resize-none font-body text-[14px] text-text-primary placeholder:text-[#64748B] px-4 py-[14px] min-h-[52px] max-h-[160px]"
        />
        <motion.button
          whileHover={!disabled && text.trim() ? { scale: 1.08 } : {}}
          whileTap={!disabled && text.trim() ? { scale: 0.92 } : {}}
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 flex items-center justify-center mr-3 mb-[6px] shrink-0 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-opacity"
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </motion.button>
      </div>
    </div>
  )
}
