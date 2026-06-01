import { useCallback } from 'react'
import axios from 'axios'
import { useApp } from '../context/AppContext'

export function useChart() {
  const { sessionId, setChartLoading, setChart, setChartError, setBirthData, setSessionId } = useApp()

  const calculateChart = useCallback(async (birthData) => {
    setChartLoading()
    try {
      const { data } = await axios.post('/chart/', { ...birthData, session_id: sessionId })

      // Merge submitted birthData with server response
      const enriched = {
        ...birthData,
        latitude: data.latitude,
        longitude: data.longitude,
      }
      setBirthData(enriched)
      setChart(data)

      // Persist session_id so subsequent chat requests reuse the same session
      if (data.session_id) {
        setSessionId(data.session_id)
      }

      return data
    } catch (err) {
      const msg = err?.response?.data?.error || err.message || 'Failed to calculate chart'
      setChartError(msg)
      throw err
    }
  }, [sessionId, setChartLoading, setChart, setChartError, setBirthData, setSessionId])

  return { calculateChart }
}
