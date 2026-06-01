export default function Input({ label, error, success, icon, note, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      {label && (
        <label className="font-body text-[12px] uppercase tracking-[0.08em] text-text-muted">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={`w-full bg-surface-2 border rounded-[10px] px-4 py-3 font-body text-[15px] text-text-primary placeholder:text-[#64748B] transition-all duration-200
            ${error ? 'border-[#F87171]' : success ? 'border-[#34D399]' : 'border-[var(--border)]'}
            focus:border-accent-1 focus:shadow-[0_0_0_3px_rgba(192,132,252,0.15)]`}
          {...props}
        />
        {icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-accent-2 pointer-events-none">
            {icon}
          </span>
        )}
        {success && !icon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34D399] pointer-events-none">
            ✓
          </span>
        )}
      </div>
      {error && <span className="font-body text-[11px] text-[#F87171]">{error}</span>}
      {note && !error && <span className="font-body text-[11px] text-[#94A3B8]">{note}</span>}
    </div>
  )
}
