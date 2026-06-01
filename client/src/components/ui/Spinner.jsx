export default function Spinner({ size = 20, className = '' }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-transparent border-t-accent-2 animate-spin ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
