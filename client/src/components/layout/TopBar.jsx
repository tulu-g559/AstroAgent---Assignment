import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import StatusBadge from '../ui/StatusBadge'

export default function TopBar() {
  const navigate = useNavigate()
  const { chart, toggleSidebar, sidebarOpen } = useApp()

  return (
    <header className="h-14 border-b border-[var(--border)] bg-bg-primary flex items-center justify-between px-4 md:px-6 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Back to home"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
          </svg>
        </button>
        <button onClick={toggleSidebar} className="text-text-muted hover:text-text-primary transition-colors cursor-pointer" aria-label="Toggle sidebar">
          {sidebarOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" />
            </svg>
          )}
        </button>
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          <span className="font-display text-[16px] font-medium text-text-primary">Aradhana</span>
        </div>
      </div>
      <StatusBadge status={chart ? 'loaded' : 'empty'} />
    </header>
  )
}
