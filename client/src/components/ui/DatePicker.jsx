import { useState } from 'react'
import Input from './Input'

export default function DatePicker({ label, value, onChange, error }) {
  const [focused, setFocused] = useState(false)

  const handleChange = (e) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 8)
    let formatted = ''
    if (raw.length > 2) formatted += raw.slice(0, 2) + ' / '
    else formatted += raw
    if (raw.length > 4) formatted += raw.slice(2, 4) + ' / '
    else if (raw.length > 2) formatted += raw.slice(2)
    if (raw.length > 4) formatted += raw.slice(4, 8)
    onChange?.(formatted)
  }

  return (
    <Input
      label={label}
      placeholder="DD / MM / YYYY"
      value={value}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      error={error}
    />
  )
}
