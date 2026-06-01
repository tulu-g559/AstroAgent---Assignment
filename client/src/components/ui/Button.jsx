import { motion } from 'framer-motion'

export default function Button({ children, variant = 'primary', fullWidth, className = '', disabled, loading, ...props }) {
  const base = 'inline-flex items-center justify-center font-body font-medium text-[15px] transition-all duration-250 select-none'

  const variants = {
    primary: 'bg-gradient-to-r from-accent-1 to-accent-2 text-white shadow-lg hover:shadow-[0_0_32px_rgba(192,132,252,0.4)]',
    outline: 'border border-[var(--border)] bg-transparent text-accent-2 hover:bg-[rgba(167,139,250,0.08)]',
    ghost: 'bg-transparent text-text-muted hover:text-text-primary',
  }

  const size = variant === 'ghost' ? 'px-3 py-2' : variant === 'outline' ? 'px-5 py-[10px] rounded-pill' : 'px-8 py-[14px] rounded-pill'

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      className={`${base} ${variants[variant]} ${size} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-[14px] h-[14px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Calculating your chart...</span>
        </span>
      ) : children}
    </motion.button>
  )
}
