import { motion } from 'framer-motion'

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" opacity="0.5" />
        <path d="M2 12h20" opacity="0.5" />
      </svg>
    ),
    title: 'Natal Birth Chart',
    body: 'Real planetary positions calculated from your exact birth data using the Swiss Ephemeris engine.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      </svg>
    ),
    title: 'AI Interpretation',
    body: 'LangGraph-powered reasoning that connects your chart to your real questions with grounded astrological knowledge.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.2" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)" opacity="0.6" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)" opacity="0.6" />
      </svg>
    ),
    title: 'Live Transits',
    body: "Current planetary movements compared against your chart to reveal today's cosmic influences.",
  },
]

export default function FeatureHighlights() {
  return (
    <section className="relative mx-auto px-6 py-24 z-10" style={{ maxWidth: 1000 }}>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
            className="group relative flex flex-col items-start bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 backdrop-blur-sm overflow-hidden hover:bg-white/[0.04] hover:border-[rgba(192,132,252,0.25)] transition-colors duration-500"
          >
            {/* Soft gradient hover effect behind the card */}
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(192,132,252,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Icon Wrapper */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#C084FC]/10 to-[#A78BFA]/5 border border-[#A78BFA]/20 text-[#C084FC] mb-6 shadow-[0_0_15px_rgba(167,139,250,0.1)] group-hover:shadow-[0_0_25px_rgba(167,139,250,0.25)] group-hover:scale-110 transition-all duration-500">
              {f.icon}
            </div>

            {/* Content */}
            <h3 className="font-display text-[20px] font-medium text-[#F8FAFC] tracking-wide mb-3">
              {f.title}
            </h3>
            <p className="font-body text-[14px] font-light text-[#94A3B8] leading-[1.7]">
              {f.body}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 1 }}
        className="text-center font-body text-[12px] text-[#64748B] mt-16 tracking-wider uppercase"
      >
        Made with real ephemeris data &middot; Not financial, legal or medical advice
      </motion.footer>
    </section>
  )
}