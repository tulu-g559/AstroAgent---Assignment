export default function StatusBadge({ status = 'loaded' }) {
  const isLoaded = status === 'loaded'
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-accent-2 bg-[rgba(167,139,250,0.08)] border border-[rgba(167,139,250,0.2)] rounded-pill px-3 py-1">
      <span className={`w-[6px] h-[6px] rounded-full ${isLoaded ? 'bg-[#34D399]' : 'bg-[#F87171]'}`} />
      {isLoaded ? 'Chart Loaded' : 'No Chart'}
    </span>
  )
}
