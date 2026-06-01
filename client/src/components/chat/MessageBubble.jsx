import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MessageBubble({ message, index }) {
  const isUser = message.role === 'user'
  const isError = message.isError

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
    >
      <div
        className={`max-w-[80%] md:max-w-[75%] ${
          isUser
            ? 'bg-gradient-to-br from-[rgba(192,132,252,0.2)] to-[rgba(167,139,250,0.15)] border border-[rgba(192,132,252,0.25)] rounded-[18px_18px_4px_18px]'
            : isError
              ? 'bg-[rgba(248,113,113,0.08)] border border-[rgba(248,113,113,0.2)] rounded-[18px_18px_18px_4px]'
              : 'bg-surface-1 border border-[var(--border)] rounded-[18px_18px_18px_4px]'
        } px-4 py-3`}
      >
        <div className={`font-body text-[14px] leading-[1.7] ${isUser ? 'text-text-primary' : 'text-text-muted'} ${!isUser ? 'prose prose-invert prose-sm max-w-none' : ''}`}>
          {isUser ? (
            <span>{message.content}</span>
          ) : (
            <span className="inline">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content || ''}
              </ReactMarkdown>
              {message.stream && (
                <span className="inline-flex items-center ml-0.5">
                  <span className="w-[5px] h-[5px] rounded-full bg-accent-1 animate-pulse" />
                </span>
              )}
            </span>
          )}
        </div>
        {!message.stream && message.timestamp && (
          <span className="font-body text-[11px] text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity mt-1 block text-right">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>
    </motion.div>
  )
}
