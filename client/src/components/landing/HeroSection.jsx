import { motion } from 'framer-motion'
import Button from '../ui/Button'

const trustItems = [
  '🔮 Real Ephemeris Data',
  '🤖 AI Reasoning',
  '🛡️ Privacy First',
]

export default function HeroSection({ onBegin }) {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-[120px]" style={{ maxWidth: 680, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-2.5 mb-8"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse-glow">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <span className="font-display text-[22px] font-medium text-text-primary">Aradhana</span>
        <span className="w-[3px] h-[3px] rounded-full bg-text-muted" />
        <span className="font-body text-[13px] text-text-muted">AstroAgent</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-[52px] font-light leading-[1.1] text-text-primary mb-5 text-balance"
      >
        Your Birth Chart.
        <br />
        Your <span className="italic text-accent-1">Cosmic</span> Story.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="font-body text-[16px] text-text-muted leading-[1.7] mb-8"
        style={{ maxWidth: 480 }}
      >
        Discover personalized insights through real astrological calculations and AI-powered interpretation — grounded in your exact birth chart.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <Button onClick={onBegin}>
          Begin Your Reading →
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="flex flex-wrap justify-center gap-2 mt-6"
      >
        {trustItems.map((item) => (
          <span key={item} className="font-body text-[12px] text-text-muted bg-surface-1 border border-[var(--border)] rounded-pill px-3.5 py-1.5">
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
