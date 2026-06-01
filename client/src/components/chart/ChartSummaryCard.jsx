import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import Button from '../ui/Button'

const planets = [
  { emoji: '☀️', label: 'Sun Sign', key: 'sun' },
  { emoji: '🌙', label: 'Moon Sign', key: 'moon' },
  { emoji: '⬆️', label: 'Ascendant', key: 'ascendant' },
  { emoji: '♀️', label: 'Venus', key: 'venus' },
  { emoji: '♂️', label: 'Mars', key: 'mars' },
]

const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDate(dateStr) {

  if (!dateStr) return ''

  const d = new Date(dateStr)

  if (isNaN(d.getTime())) {
    return dateStr
  }

  return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`
}

export default function ChartSummaryCard({ onStartChat }) {
  const { chart } = useApp()

  if (!chart) return null

  const location = chart.location || 'Unknown location'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface-1 border border-[var(--border)] rounded-2xl p-8 max-w-[520px] w-full mx-auto"
    >
      <span className="font-body text-[12px] uppercase tracking-[0.1em] text-accent-2">
        Your Natal Chart
      </span>
      <h2 className="font-display text-[32px] text-text-primary mt-1 mb-1">
        {chart.name || 'Your Chart'}
      </h2>
      <p className="font-body text-[13px] text-text-muted mb-6">
        📍 {location} · Born {formatDate(chart.birthDate)}{chart.birthTime ? `, ${chart.birthTime}` : ''}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {planets.map((p, i) => (
          <div key={p.key} className={`bg-surface-2 rounded-lg p-4 ${i === planets.length - 1 ? 'col-span-2' : ''}`}>
            <span className="font-body text-[11px] uppercase text-[#94A3B8] flex items-center gap-1.5">
              {p.emoji} {p.label}
            </span>
            <span className="font-display text-[22px] italic text-accent-3 block mt-0.5">
              {chart[p.key]?.sign || '--'}
            </span>
            {chart[p.key]?.degree && (
              <span className="font-body text-[11px] text-[#64748B]">
                {chart[p.key].degree}° · House {chart[p.key].house || '--'}
              </span>
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" fullWidth className="mt-5" onClick={onStartChat}>
        Start Chatting with Your Chart →
      </Button>
    </motion.div>
  )
}
