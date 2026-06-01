import { motion } from 'framer-motion'

const suggestions = [
  'What is my Ascendant?',
  "What's today's energy for me?",
  'What does Mars in Leo mean?',
]

export default function EmptyState({ onSuggestionClick }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-16">
      <motion.svg
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </motion.svg>
      <h2 className="font-display text-[28px] text-text-primary mt-5 mb-2">
        Ask about your chart
      </h2>
      <p className="font-body text-[14px] text-text-muted max-w-[320px]">
        Try asking: &ldquo;What does my Moon sign say about my emotions?&rdquo;
      </p>
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {suggestions.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSuggestionClick?.(s)}
            className="font-body text-[13px] text-text-muted bg-surface-1 border border-[var(--border)] rounded-pill px-4 py-2 cursor-pointer hover:text-accent-2 transition-colors"
          >
            {s}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
