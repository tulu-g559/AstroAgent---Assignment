import { useCallback, useRef } from 'react'
import { useApp } from '../context/AppContext'

export function useChat() {
  const { sessionId, setSessionId, addMessage, appendStream, finalizeStream, setTyping, setToolStatus } = useApp()
  const abortRef = useRef(null)

  const sendMessage = useCallback(async (text) => {
    addMessage({ role: 'user', content: text, timestamp: Date.now() })

    addMessage({ role: 'assistant', content: '', timestamp: Date.now(), stream: true })
    setTyping(true)

    try {
      const response = await fetch('/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      abortRef.current = reader

      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        const parts = buffer.split('\n')
        buffer = parts.pop() || ''

        for (const line of parts) {
          // Skip empty lines between SSE events
          if (line === '') continue

          // Must start with "data: " — no trim() to avoid stripping whitespace payloads
          if (!line.startsWith('data: ')) continue

          const payload = line.slice(6)

          // Session-id handshake from the first SSE event
          if (payload.startsWith('__session__:')) {
            const sid = payload.slice('__session__:'.length)
            if (sid) setSessionId(sid)
            continue
          }

          if (payload === '[DONE]') break

          if (['📍', '🌙', '✨', '☀️', '🔮'].some((p) => payload.startsWith(p))) {
            setToolStatus(payload)
          } else if (payload === '') {
            // Empty payload = original character was \n (newline)
            // SSE framing consumes the bare \n, so we re-insert it here
            appendStream('\n')
          } else {
            appendStream(payload)
          }
        }
      }

      finalizeStream()
    } catch {
      addMessage({
        role: 'assistant',
        content: "I wasn't able to respond. Please try again.",
        timestamp: Date.now(),
        isError: true,
      })
    } finally {
      setTyping(false)
      setToolStatus(null)
      abortRef.current = null
    }
  }, [sessionId, setSessionId, addMessage, appendStream, finalizeStream, setTyping, setToolStatus])

  return { sendMessage, abort: () => abortRef.current?.cancel() }
}
