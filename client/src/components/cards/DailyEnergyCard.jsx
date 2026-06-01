import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'

const PLANET_EMOJI = {
  sun: '☀️', moon: '🌙', mercury: '☿', venus: '♀',
  mars: '♂', jupiter: '♃', saturn: '♄',
}

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long', month: 'short', day: 'numeric',
})

export default function DailyEnergyCard() {
  const { chart, transit } = useApp()

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface-1 border border-[var(--border)] rounded-xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-body text-[12px] text-text-muted">Today&apos;s Energy</span>
        <span className="font-body text-[12px] text-[#64748B]">{today}</span>
      </div>
      <div className="pl-3 border-l-[3px] border-accent-1">
        {transit ? (
          <>
            <p className="font-display text-[14px] text-accent-3 mb-2">
              {transit.date ? `${transit.date.replace(/\//g, '-')}` : ''} — Planetary Positions
            </p>
            <div className="space-y-1.5 mb-3">
              {Object.entries(transit.current_transits ?? {}).map(([planet, sign]) => (
                <div key={planet} className="flex items-center gap-2 font-body text-[13px] text-text-muted">
                  <span>{PLANET_EMOJI[planet] || '●'}</span>
                  <span className="capitalize text-text-primary font-medium">{planet}</span>
                  <span>in</span>
                  <span className="italic text-accent-2">{sign}</span>
                </div>
              ))}
            </div>
            {transit.matches && transit.matches.length > 0 && (
              <div className="mt-2 pt-2 border-t border-[var(--border)]">
                <p className="font-body text-[12px] text-accent-3 font-medium mb-1">🔁 Transit-Natal Alignments</p>
                <ul className="space-y-0.5">
                  {transit.matches.map((m, i) => (
                    <li key={i} className="font-body text-[12px] text-text-muted leading-[1.5]">• {m}</li>
                  ))}
                </ul>
              </div>
            )}
            {chart && (
              <p className="font-body text-[12px] text-text-muted mt-2 italic">
                Ask me what these transits mean for you!
              </p>
            )}
          </>
        ) : (
          <p className="font-body text-[13px] text-text-muted leading-[1.6]">
            No transit data available yet. Start chatting to receive your daily cosmic forecast.
          </p>
        )}
      </div>
    </motion.div>
  )
}
