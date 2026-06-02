import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import HeroSection from '../components/landing/HeroSection'
import BirthForm from '../components/landing/BirthForm'
import FeatureHighlights from '../components/landing/FeatureHighlights'
import ChartSummaryCard from '../components/chart/ChartSummaryCard'
import SkeletonCard from '../components/ui/SkeletonCard'
import ErrorState from '../components/ui/ErrorState'
import Button from '../components/ui/Button'
import { useApp } from '../context/AppContext'
import { useChart } from '../hooks/useChart'

export default function LandingPage({ onNavigateToApp }) {
  const { chart, chartLoading, chartError, setChartError, messages, clearSession } = useApp()
  const { calculateChart } = useChart()
  const [showForm, setShowForm] = useState(false)
  const hadChart = useRef(false)

  // Track when chart existed and was cleared, then show form
  if (chart) hadChart.current = true
  useEffect(() => {
    if (!chart && hadChart.current) {
      setShowForm(true)
    }
  }, [chart])

  const handleBegin = () => {
    setShowForm(true)
    setTimeout(() => {
      document.getElementById('birth-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSubmit = async (data) => {
    try {
      await calculateChart(data)
    } catch {
      // error handled in context
    }
  }

  return (
    <div className="relative min-h-screen bg-bg-primary overflow-hidden">
      {/* Star field */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="30" r="0.8" fill="white" opacity="0.6" />
              <circle cx="70" cy="10" r="0.5" fill="white" opacity="0.4" />
              <circle cx="120" cy="60" r="0.7" fill="white" opacity="0.5" />
              <circle cx="170" cy="20" r="0.4" fill="white" opacity="0.3" />
              <circle cx="40" cy="90" r="0.6" fill="white" opacity="0.5" />
              <circle cx="100" cy="130" r="0.5" fill="white" opacity="0.4" />
              <circle cx="150" cy="170" r="0.8" fill="white" opacity="0.6" />
              <circle cx="10" cy="160" r="0.4" fill="white" opacity="0.3" />
              <circle cx="190" cy="100" r="0.6" fill="white" opacity="0.5" />
              <circle cx="80" cy="180" r="0.5" fill="white" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars)" />
        </svg>
      </div>

      {/* Radial gradient */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(192,132,252,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection onBegin={handleBegin} />

        <AnimatePresence mode="wait">
          {chartLoading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 mt-20"
            >
              <SkeletonCard />
            </motion.div>
          ) : chartError ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 mt-20"
            >
              <ErrorState
                message={chartError}
                onRetry={() => setChartError(null)}
              />
            </motion.div>
          ) : chart ? (
            <motion.div
              key="chart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-6 mt-20"
            >
              <ChartSummaryCard onStartChat={onNavigateToApp} />
              <div className="flex justify-center gap-3 mt-4">
                <Button variant="ghost" onClick={() => { clearSession(); setShowForm(true) }} className="!text-[12px]">
                  New Reading
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!chart && !chartLoading && (
          <div id="birth-form">
            {showForm && (
              <BirthForm onSubmit={handleSubmit} loading={chartLoading} />
            )}
          </div>
        )}

        <FeatureHighlights />
      </div>
    </div>
  )
}
