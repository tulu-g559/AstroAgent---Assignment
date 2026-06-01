import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import ChartSidebarWidget from '../chart/ChartSidebarWidget'
import DailyEnergyCard from '../cards/DailyEnergyCard'

export default function Sidebar() {
  const { chart, sidebarOpen, setSidebar } = useApp()

  const content = (
    <div className="h-full flex flex-col gap-6 overflow-y-auto">
      <div className="flex items-center gap-2.5 shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse-glow">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
        <span className="font-display text-[18px] font-medium text-text-primary">Aradhana</span>
        <span className="w-[3px] h-[3px] rounded-full bg-text-muted mx-1" />
        <span className="font-body text-[12px] text-text-muted">AstroAgent</span>
      </div>
      <ChartSidebarWidget />
      {chart && <DailyEnergyCard />}
    </div>
  )

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col w-[300px] shrink-0 h-full border-r border-[var(--border)] bg-bg-secondary p-6 overflow-y-auto">
        {content}
      </aside>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebar(false)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-bg-secondary border-r border-[var(--border)] p-6 lg:hidden overflow-y-auto"
          >
            <button
              onClick={() => setSidebar(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary cursor-pointer"
              aria-label="Close sidebar"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
            {content}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
