import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'

export default function SafetyNoticeCard() {
  const { messages } = useApp()

  const show = messages.some((m) => m.role === 'assistant' && m.isSafetyNotice)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-4 md:mx-6 mb-3 bg-[rgba(251,191,36,0.06)] border border-[rgba(251,191,36,0.2)] rounded-lg p-[14px_18px] flex items-start gap-3"
        >
          <span className="text-[16px] shrink-0 mt-px">⚠️</span>
          <p className="font-body text-[13px] text-text-muted leading-[1.5]">
            Astrology offers reflection and guidance, but should not replace professional medical, legal, or financial advice.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
