import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTransits } from '../hooks/useTransits'
import StatusBadge from '../components/ui/StatusBadge'
import ChatArea from '../components/chat/ChatArea'
import Button from '../components/ui/Button'

export default function AppPage() {
  const navigate = useNavigate()
  const { chart, transit, clearSession, messages } = useApp()
  const { fetchTransits } = useTransits()

  // Auto-fetch transits once when chart is available and transit hasn't been fetched
  useEffect(() => {
    if (chart && !transit) {
      fetchTransits()
    }
  }, [chart, transit, fetchTransits])

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="hidden lg:flex h-14 items-center justify-between px-6 border-b border-[var(--border)] bg-bg-primary shrink-0">
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
          <span className="font-body text-[14px] text-text-primary">Chat</span>
        </div>
        <div className="flex items-center gap-3">
          {(chart || messages.length > 0) && (
            <Button
              variant="ghost"
              onClick={() => { clearSession(); navigate('/') }}
              className="!text-[12px] !px-3 !py-1"
            >
              New Reading
            </Button>
          )}
          <StatusBadge status={chart ? 'loaded' : 'empty'} />
        </div>
      </div>

      <ChatArea />
    </div>
  )
}
