import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import PlanetRow from './PlanetRow'

const planets = [
  { emoji: '☀️', name: 'Sun', key: 'sun' },
  { emoji: '🌙', name: 'Moon', key: 'moon' },
  { emoji: '⬆️', name: 'Rising', key: 'ascendant' },
  { emoji: '♀️', name: 'Venus', key: 'venus' },
  { emoji: '♂️', name: 'Mars', key: 'mars' },
]

export default function ChartSidebarWidget() {
  const { chart } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface-1 border border-[var(--border)] rounded-xl p-5"
    >
      <span className="font-body text-[13px] uppercase tracking-[0.1em] text-text-muted block mb-3">
        Your Chart
      </span>

      {!chart ? (
        <p className="font-body text-[13px] text-[#64748B] py-3">
          No chart loaded. Calculate your birth chart to begin.
        </p>
      ) : (
        <>
          {planets.map((p) => (
            <PlanetRow
              key={p.key}
              emoji={p.emoji}
              name={p.name}
              sign={chart[p.key]?.sign || '--'}
            />
          ))}
          <div className="flex items-center justify-between pt-2 mt-1">
            <span className="font-body text-[12px] text-text-muted flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Location
            </span>
            <span className="font-body text-[12px] text-text-muted">
              {chart.location || 'Unknown'}
            </span>
          </div>
        </>
      )}
    </motion.div>
  )
}
