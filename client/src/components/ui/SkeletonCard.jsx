export default function SkeletonCard() {
  return (
    <div className="bg-surface-1 border border-[var(--border)] rounded-2xl p-8 max-w-[520px] w-full mx-auto">
      <div className="h-3 w-28 rounded-full bg-surface-2 animate-shimmer mb-4" style={{ background: 'linear-gradient(90deg, #1E293B 0%, #243447 50%, #1E293B 100%)', backgroundSize: '200% 100%' }} />
      <div className="h-7 w-44 rounded-full bg-surface-2 animate-shimmer mb-3" style={{ background: 'linear-gradient(90deg, #1E293B 0%, #243447 50%, #1E293B 100%)', backgroundSize: '200% 100%' }} />
      <div className="h-4 w-56 rounded-full bg-surface-2 animate-shimmer mb-6" style={{ background: 'linear-gradient(90deg, #1E293B 0%, #243447 50%, #1E293B 100%)', backgroundSize: '200% 100%' }} />
      <div className="grid grid-cols-2 gap-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`bg-surface-2 rounded-lg p-4 ${i === 4 ? 'col-span-2' : ''}`}>
            <div className="h-3 w-16 rounded-full bg-[#1E293B] animate-shimmer mb-3" style={{ background: 'linear-gradient(90deg, #1E293B 0%, #243447 50%, #1E293B 100%)', backgroundSize: '200% 100%' }} />
            <div className="h-5 w-24 rounded-full bg-[#1E293B] animate-shimmer" style={{ background: 'linear-gradient(90deg, #1E293B 0%, #243447 50%, #1E293B 100%)', backgroundSize: '200% 100%' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
