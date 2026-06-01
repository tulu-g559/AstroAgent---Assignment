import { useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { useChat } from '../../hooks/useChat'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import ToolStatusChip from './ToolStatusChip'
import SafetyNoticeCard from '../cards/SafetyNoticeCard'
import EmptyState from '../ui/EmptyState'
import InputBar from './InputBar'

export default function ChatArea() {
  const { messages, isTyping, toolStatus, chart, addMessage } = useApp()
  const { sendMessage } = useChat()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, toolStatus])

  const handleSend = (text) => {
    sendMessage(text)
  }

  const handleSuggestion = (text) => {
    sendMessage(text)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-4">
        {messages.length === 0 && !isTyping ? (
          <EmptyState onSuggestionClick={handleSuggestion} />
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} index={i} />
            ))}
            <ToolStatusChip status={toolStatus} />
            {isTyping && !toolStatus && <TypingIndicator />}
            <div ref={bottomRef} />
          </>
        )}
      </div>
      <div className="shrink-0">
        <SafetyNoticeCard />
        <InputBar onSend={handleSend} disabled={!chart} />
      </div>
    </div>
  )
}
