import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'

const trustItems = [
  {
    label: 'Real Ephemeris Data',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l4 4"/></svg>
  },
  {
    label: 'AI Reasoning',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
  },
  {
    label: 'Privacy First',
    icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  },
]

const STARS = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: Math.random() < 0.6 ? 1 : Math.random() < 0.5 ? 1.5 : 2,
  dur: 2 + Math.random() * 4,
  delay: Math.random() * 5,
  minOp: 0.08 + Math.random() * 0.12,
  maxOp: 0.4 + Math.random() * 0.4,
}))

export default function HeroSection({ onBegin }) {
  return (
    <section className="relative flex flex-col items-center justify-center text-center px-6 min-h-screen overflow-hidden bg-[#0F172A]">

      {/* ── Orb glows ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 800, height: 800, // Increased size for depth
            top: '50%', left: '30%', // Shifted left
            x: '-50%', y: '-50%',
            background: 'radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400, top: '25%', left: '15%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 300, height: 300, bottom: '8%', right: '8%',
            background: 'radial-gradient(circle, rgba(196,181,253,0.05) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        />
      </div>

      {/* ── Star field ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {STARS.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
            animate={{ opacity: [s.minOp, s.maxOp, s.minOp], scale: [1, 1.5, 1] }}
            transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          />
        ))}
      </div>

      {/* ── Shooting stars ── */}
      {[
        { top: '22%', left: '18%', rotate: -20, delay: 2, dur: 6 },
        { top: '55%', right: '12%', rotate: -15, delay: 7, dur: 8 },
      ].map((ss, i) => (
        <motion.div
          key={i}
          className="absolute h-px rounded-full pointer-events-none"
          style={{
            width: 60, top: ss.top, left: ss.left, right: ss.right,
            rotate: ss.rotate,
            background: 'linear-gradient(90deg, transparent, rgba(192,132,252,0.85), transparent)',
          }}
          animate={{ opacity: [0, 1, 0], x: ['-40px', '80px'] }}
          transition={{ duration: ss.dur * 0.4, repeat: Infinity, repeatDelay: ss.dur, ease: 'easeOut', delay: ss.delay }}
        />
      ))}

      {/* ── Sacred geometry ── */}
      <motion.div
        className="absolute pointer-events-none opacity-[0.035] z-0" // Slightly lower opacity for deeper feel
        style={{ 
          width: 460, height: 460, 
          top: '50%', left: '30%', // Shifted left
          x: '-50%', y: '-50%', 
          scale: 1.6 // Scaled up massively for depth
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }} // Slower rotation
      >
        <svg viewBox="0 0 460 460" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="230" cy="230" r="210" stroke="rgba(192,132,252,0.6)" strokeWidth="0.5"/>
          <circle cx="230" cy="230" r="145" stroke="rgba(192,132,252,0.6)" strokeWidth="0.5"/>
          <circle cx="230" cy="230" r="70"  stroke="rgba(192,132,252,0.7)" strokeWidth="0.5"/>
          <polygon points="230,20 420,145 420,315 230,440 40,315 40,145" fill="none" stroke="rgba(192,132,252,0.65)" strokeWidth="0.5"/>
          <polygon points="230,440 40,145 420,145" fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth="0.5"/>
          <polygon points="230,20 420,315 40,315"  fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth="0.5"/>
          <line x1="230" y1="20"  x2="230" y2="440" stroke="rgba(192,132,252,0.3)" strokeWidth="0.5"/>
          <line x1="20"  y1="230" x2="440" y2="230" stroke="rgba(192,132,252,0.3)" strokeWidth="0.5"/>
          <line x1="76"  y1="76"  x2="384" y2="384" stroke="rgba(192,132,252,0.2)" strokeWidth="0.5"/>
          <line x1="384" y1="76"  x2="76"  y2="384" stroke="rgba(192,132,252,0.2)" strokeWidth="0.5"/>
        </svg>
      </motion.div>

      {/* ── Concentric orbital rings ── */}
      {/* Scaled sizes drastically for depth perspective */}
      {[240, 360, 480, 630].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: size, height: size,
            top: '50%', left: '30%', // Shifted left
            x: '-50%', y: '-50%',
            border: i === 3 ? '0.5px dashed rgba(192,132,252,0.1)' : '0.5px solid rgba(192,132,252,0.1)',
          }}
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
        />
      ))}

      {/* ── Orbiting dots ── */}
      {[
        { r: 120, dur: 24, start: 0,   size: 4, color: '#A78BFA' }, // Expanded r (radius)
        { r: 180, dur: 36, start: 120, size: 3, color: '#C084FC' },
        { r: 240, dur: 28, start: 240, size: 5, color: '#E9D5FF' },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: dot.size, height: dot.size,
            top: '50%', left: '30%', // Shifted left
            marginTop: -dot.size / 2, marginLeft: -dot.size / 2,
            background: dot.color,
            boxShadow: `0 0 8px ${dot.color}aa`,
          }}
          animate={{ rotate: [dot.start, dot.start + 360] }}
          transition={{ duration: dot.dur, repeat: Infinity, ease: 'linear' }}
          transformTemplate={({ rotate }) =>
            `rotate(${rotate}deg) translateX(${dot.r}px) rotate(-${rotate}deg)`
          }
        />
      ))}

      {/* ── Constellation overlay ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-10"
        viewBox="0 0 680 640" fill="none"
      >
        {[
          [[80,120],[150,80],[210,110]],
          [[500,80],[560,120],[590,60]],
          [[60,480],[120,520],[100,570]],
          [[560,480],[600,520],[620,460]],
        ].map((group, gi) => (
          <g key={gi}>
            {group.slice(0,-1).map(([x1,y1], i) => (
              <line key={i} x1={x1} y1={y1} x2={group[i+1][0]} y2={group[i+1][1]}
                stroke="rgba(192,132,252,0.9)" strokeWidth="0.5"/>
            ))}
            {group.map(([x,y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="#A78BFA" opacity="0.7"/>
            ))}
          </g>
        ))}
      </svg>

      {/* ── Floating planet dots ── */}
      {[
        { top:'17%', left:'11%', size:9,  color:'#C084FC', dur:7,  delay:0 },
        { top:'64%', left:'8%',  size:5,  color:'#A78BFA', dur:9,  delay:1.5 },
        { top:'14%', right:'9%', size:11, color:'#A78BFA', dur:11, delay:0.5 },
        { bottom:'18%', right:'13%', size:6, color:'#C084FC', dur:8, delay:2 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: p.size, height: p.size,
            top: p.top, left: p.left, right: p.right, bottom: p.bottom,
            background: `radial-gradient(circle at 30% 30%, #E9D5FF, ${p.color})`,
            boxShadow: `0 0 10px ${p.color}aa`,
          }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      {/* ── CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">

        {/* Logo pill */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10 bg-white/[0.04] px-5 py-2 rounded-full border border-[rgba(192,132,252,0.2)] backdrop-blur-md"
        >
          <motion.svg
            width="20" height="20" viewBox="0 0 24 24" fill="none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"
              stroke="#A78BFA" strokeWidth="1.2" strokeLinejoin="round" fill="none"/>
            <path d="M12 6l1.2 3.7H17l-3.1 2.2 1.2 3.7L12 13.5l-3.1 2.1 1.2-3.7L7 9.7h3.8z"
              fill="#A78BFA" opacity="0.35"/>
          </motion.svg>
          <span className="font-display text-[18px] font-medium text-[#F8FAFC] tracking-[0.15em] uppercase">
            Aradhana
          </span>
          <div className="w-px h-3.5 bg-white/20" />
          <span className="font-body text-[11px] text-[#A78BFA] font-medium tracking-[0.12em] uppercase">
            AstroAgent
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, filter: 'blur(12px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(44px,8vw,72px)] font-light leading-[1.08] text-[#F8FAFC] mb-5 text-balance"
        >
          Your Birth Chart.
          <br />
          <span className="italic font-normal bg-gradient-to-r from-[#C084FC] via-[#A78BFA] to-[#E9D5FF] bg-clip-text text-transparent pr-2">
            Your Cosmic Story.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-[16px] font-light text-[#94A3B8] leading-[1.75] mb-9 max-w-[480px]"
        >
          Unlock the wisdom of the stars. Real astrological ephemeris calculations meets advanced AI reasoning for deep, personalized guidance.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-10 group"
        >
          <motion.div
            className="absolute inset-[-8px] rounded-full pointer-events-none"
            style={{ background: 'rgba(192,132,252,0.22)', filter: 'blur(20px)' }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Button
            onClick={onBegin}
            className="relative inline-flex items-center gap-2.5 bg-gradient-to-r from-[#C084FC] to-[#A78BFA] text-[#0F172A] font-body text-[15px] font-medium tracking-wide rounded-full px-9 py-4 border-none shadow-[0_4px_24px_rgba(192,132,252,0.35)] hover:scale-[1.04] hover:shadow-[0_8px_40px_rgba(192,132,252,0.55)] active:scale-[0.97] transition-all duration-300"
          >
            <span>Begin Your Reading</span>
            <svg
              className="transition-transform duration-300 group-hover:translate-x-1"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Button>
        </motion.div>

        {/* Trust chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2.5"
        >
          {trustItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ backgroundColor: 'rgba(192,132,252,0.08)', borderColor: 'rgba(192,132,252,0.25)' }}
              className="flex items-center gap-2 font-body text-[12px] text-[#94A3B8] bg-white/[0.04] border border-white/[0.09] rounded-full px-4 py-1.5 cursor-default transition-colors duration-200"
            >
              <span className="text-[#A78BFA]">{item.icon}</span>
              {item.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}