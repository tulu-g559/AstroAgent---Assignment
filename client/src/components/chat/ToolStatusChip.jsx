import { motion, AnimatePresence } from 'framer-motion'

export default function ToolStatusChip({ status }) {
  return (
    <AnimatePresence>
      {status && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-start"
        >
          <span className="inline-flex items-center gap-2 font-mono text-[12px] text-accent-2 bg-[rgba(167,139,250,0.08)] border border-[rgba(167,139,250,0.2)] rounded-pill px-3.5 py-1.5">
            <span className="w-[14px] h-[14px] rounded-full border-2 border-accent-2/30 border-t-accent-2 animate-spin shrink-0" />
            {status}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
