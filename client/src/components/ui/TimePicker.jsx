import Input from './Input'

export default function TimePicker({ label, value, onChange, error }) {
  const handleChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4)
    let formatted = ''
    if (raw.length > 2) formatted += raw.slice(0, 2) + ' : '
    else formatted += raw
    if (raw.length > 2) formatted += raw.slice(2, 4)
    onChange?.(formatted)
  }

  return (
    <Input
      label={label}
      placeholder="HH : MM (24h)"
      value={value}
      onChange={handleChange}
      error={error}
      note="ⓘ Exact time ensures accurate Ascendant calculation."
    />
  )
}
