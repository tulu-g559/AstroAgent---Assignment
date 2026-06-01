export default function PlanetRow({ emoji, name, sign }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-b-0">
      <span className="font-body text-[13px] text-text-muted flex items-center gap-2">
        <span>{emoji}</span>
        {name}
      </span>
      <span className="font-display text-[15px] italic text-accent-3">
        {sign}
      </span>
    </div>
  )
}
