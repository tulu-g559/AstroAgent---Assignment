import { useState } from 'react'
import { motion } from 'framer-motion'
import DatePicker from '../ui/DatePicker'
import TimePicker from '../ui/TimePicker'
import PlaceAutocomplete from '../ui/PlaceAutocomplete'
import Button from '../ui/Button'

export default function BirthForm({ onSubmit, loading }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [place, setPlace] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!date || date.length < 14) e.date = 'Please enter a valid date'
    if (!time || !/^\d{2}\s:\s\d{2}$/.test(time)) e.time = 'Please enter a valid time'
    if (!place || place.trim().length < 2) e.place = 'Please enter your birth place'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ date, time, place })
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mt-20 mb-12"
      style={{ maxWidth: 520 }}
    >
      <div className="bg-surface-1 border border-[var(--border)] rounded-[20px] p-10 shadow-[0_0_0_1px_var(--border),0_8px_32px_rgba(0,0,0,0.4),0_0_60px_rgba(192,132,252,0.08)]">
        <h2 className="font-display text-[26px] text-text-primary mb-1">
          Enter Your Birth Details
        </h2>
        <p className="font-body text-[13px] text-text-muted mb-6">
          We calculate your exact natal chart using Swiss Ephemeris.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <DatePicker
            label="Date of Birth"
            value={date}
            onChange={setDate}
            error={errors.date}
          />
          <TimePicker
            label="Birth Time"
            value={time}
            onChange={setTime}
            error={errors.time}
          />
          <PlaceAutocomplete
            label="Birth Place"
            value={place}
            onChange={setPlace}
            error={errors.place}
          />
          <Button type="submit" fullWidth loading={loading}>
            Calculate My Birth Chart
          </Button>
        </form>
      </div>
    </motion.section>
  )
}
