import { motion } from 'framer-motion'

const features = [
  {
    icon: '🌙',
    title: 'Natal Birth Chart',
    body: 'Real planetary positions calculated from your exact birth data using the Swiss Ephemeris engine.',
  },
  {
    icon: '✨',
    title: 'AI Interpretation',
    body: 'LangGraph-powered reasoning that connects your chart to your real questions with grounded astrological knowledge.',
  },
  {
    icon: '☀️',
    title: 'Live Transits',
    body: 'Current planetary movements compared against your chart to reveal today\'s cosmic influences.',
  },
]

export default function FeatureHighlights() {
  return (
    <section className="mx-auto px-6 mt-20 mb-16" style={{ maxWidth: 900 }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface-1 border border-[var(--border)] rounded-xl p-7"
          >
            <div className="w-12 h-12 rounded-lg bg-[rgba(192,132,252,0.1)] flex items-center justify-center text-[28px] mb-4">
              {f.icon}
            </div>
            <h3 className="font-display text-[20px] text-text-primary mb-2">
              {f.title}
            </h3>
            <p className="font-body text-[13px] text-text-muted leading-[1.6]">
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>
      <footer className="text-center font-body text-[12px] text-[#64748B] mt-12">
        Made with real ephemeris data · Not financial, legal or medical advice
      </footer>
    </section>
  )
}
