import { createContext, useContext, useReducer, useCallback, useEffect } from 'react'
import { saveData, loadData, clearData } from '../utils/storage'

const AppContext = createContext(null)

const initialState = {
  chart: null,
  chartLoading: false,
  chartError: null,
  messages: [],
  isTyping: false,
  toolStatus: null,
  sidebarOpen: false,
  birthData: null,
  transit: null,
  sessionId: '',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CHART_LOADING':
      return { ...state, chartLoading: true, chartError: null }
    case 'SET_CHART':
      return { ...state, chart: action.payload, chartLoading: false }
    case 'SET_CHART_ERROR':
      return { ...state, chartError: action.payload, chartLoading: false }
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'APPEND_STREAM':
      if (state.messages.length === 0) return state
      const updated = [...state.messages]
      const last = { ...updated[updated.length - 1] }
      last.content += action.payload
      last.stream = true
      updated[updated.length - 1] = last
      return { ...state, messages: updated }
    case 'FINALIZE_STREAM':
      if (state.messages.length === 0) return state
      const finalized = [...state.messages]
      const lastMsg = { ...finalized[finalized.length - 1] }
      lastMsg.stream = false
      finalized[finalized.length - 1] = lastMsg
      return { ...state, messages: finalized }
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload }
    case 'SET_TOOL_STATUS':
      return { ...state, toolStatus: action.payload }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'SET_SIDEBAR':
      return { ...state, sidebarOpen: action.payload }
    case 'SET_BIRTH_DATA':
      return { ...state, birthData: action.payload }
    case 'SET_TRANSIT':
      return { ...state, transit: action.payload }
    case 'SET_SESSION_ID':
      return { ...state, sessionId: action.payload }
    case 'CLEAR_SESSION':
      return { ...initialState }
    case 'RESTORE_STATE':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const setChartLoading = useCallback(() => dispatch({ type: 'SET_CHART_LOADING' }), [])
  const setChart = useCallback((data) => {
    dispatch({ type: 'SET_CHART', payload: data })
  }, [])
  const setChartError = useCallback((err) => dispatch({ type: 'SET_CHART_ERROR', payload: err }), [])
  const addMessage = useCallback((msg) => {
    dispatch({ type: 'ADD_MESSAGE', payload: msg })
  }, [])
  const appendStream = useCallback((chunk) => dispatch({ type: 'APPEND_STREAM', payload: chunk }), [])
  const finalizeStream = useCallback(() => dispatch({ type: 'FINALIZE_STREAM' }), [])
  const setTyping = useCallback((v) => dispatch({ type: 'SET_TYPING', payload: v }), [])
  const setToolStatus = useCallback((s) => dispatch({ type: 'SET_TOOL_STATUS', payload: s }), [])
  const toggleSidebar = useCallback(() => dispatch({ type: 'TOGGLE_SIDEBAR' }), [])
  const setSidebar = useCallback((v) => dispatch({ type: 'SET_SIDEBAR', payload: v }), [])
  const setBirthData = useCallback((d) => dispatch({ type: 'SET_BIRTH_DATA', payload: d }), [])
  const setTransit = useCallback((d) => dispatch({ type: 'SET_TRANSIT', payload: d }), [])
  const setSessionId = useCallback((id) => dispatch({ type: 'SET_SESSION_ID', payload: id }), [])
  const clearSession = useCallback(() => {
    clearData()
    dispatch({ type: 'CLEAR_SESSION' })
  }, [])

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = loadData()
    if (saved) {
      dispatch({ type: 'RESTORE_STATE', payload: saved })
    }
  }, [])

  // Persist to localStorage on state changes
  useEffect(() => {
    const hasData = state.chart || state.messages.length > 0 || state.birthData || state.transit || state.sessionId
    if (!hasData) return
    saveData({
      chart: state.chart,
      messages: state.messages.map((m) => ({ ...m, stream: false })),
      birthData: state.birthData,
      transit: state.transit,
      sessionId: state.sessionId,
    })
  }, [state.chart, state.messages, state.birthData, state.transit, state.sessionId])

  return (
    <AppContext.Provider value={{
      ...state,
      setChartLoading,
      setChart,
      setChartError,
      addMessage,
      appendStream,
      finalizeStream,
      setTyping,
      setToolStatus,
      toggleSidebar,
      setSidebar,
      setBirthData,
      setTransit,
      setSessionId,
      clearSession,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
