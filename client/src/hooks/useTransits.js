import { useCallback } from 'react'
import axios from 'axios'
import { useApp } from '../context/AppContext'

export function useTransits() {
  const { birthData, chart, setTransit } = useApp()

  const fetchTransits = useCallback(async () => {
    if (!chart) return
    const lat = chart.latitude ?? birthData?.latitude
    const lng = chart.longitude ?? birthData?.longitude
    if (lat == null || lng == null) return

    try {
      const { data } = await axios.get('/transits/', {
        params: { latitude: lat, longitude: lng },
      })
      setTransit(data)
      return data
    } catch {
      // silently fail — transit data is best-effort
    }
  }, [chart, birthData, setTransit])

  return { fetchTransits }
}
