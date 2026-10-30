import { motion, useTransform } from 'motion/react'
import { MAX_RPM, REDLINE, rpm } from '../lib/engine'

const SWEEP = 240
const START = -SWEEP / 2

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180
  return [100 + r * Math.sin(a), 100 - r * Math.cos(a)] as const
}

function arc(r: number, from: number, to: number) {
  const [x1, y1] = polar(r, from)
  const [x2, y2] = polar(r, to)
  const large = to - from > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

const toDeg = (v: number) => START + (v / MAX_RPM) * SWEEP

export function Tach({ size = 120, labels = true }: { size?: number; labels?: boolean }) {
  const rotate = useTransform(rpm, [0, MAX_RPM], [START, START + SWEEP], { clamp: true })
  const readout = useTransform(rpm, (v) => String(Math.max(0, Math.round(v / 10) * 10)).padStart(4, '0'))
  const glow = useTransform(rpm, [REDLINE - 600, REDLINE + 400], [0, 1], { clamp: true })

  const ticks = []
  for (let i = 0; i <= 18; i++) {
    const v = (i / 18) * MAX_RPM
    const major = i % 2 === 0
    const [x1, y1] = polar(major ? 70 : 76, toDeg(v))
    const [x2, y2] = polar(84, toDeg(v))
    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={v >= REDLINE ? 'var(--red)' : 'var(--paper)'}
        strokeWidth={major ? 3 : 1.5}
        strokeLinecap="round"
      />,
    )
    if (major && labels) {
      const [lx, ly] = polar(56, toDeg(v))
      ticks.push(
        <text
          key={`l${i}`}
          x={lx}
          y={ly}
          textAnchor="middle"
          dominantBaseline="central"
          className="tach-num"
          fill={v >= REDLINE ? 'var(--red)' : 'var(--paper)'}
        >
          {i / 2}
        </text>,
      )
    }
  }

  return (
    <div className="tach" style={{ width: size, height: size }}>
      <motion.div className="tach-glow" style={{ opacity: glow }} />
      <svg viewBox="0 0 200 200" width={size} height={size} aria-hidden>
        <circle cx="100" cy="100" r="96" fill="var(--ink)" stroke="var(--line)" strokeWidth="2" />
        <path d={arc(88, toDeg(REDLINE), toDeg(MAX_RPM))} stroke="var(--red)" strokeWidth="7" fill="none" />
        {ticks}
        {labels && (
          <text x="100" y="138" textAnchor="middle" className="tach-unit" fill="var(--muted)">
            x1000 r/min
          </text>
        )}
        <motion.g style={{ rotate, originX: '100px', originY: '100px' }}>
          <line x1="100" y1="112" x2="100" y2="26" stroke="var(--red)" strokeWidth="4" strokeLinecap="round" />
        </motion.g>
        <circle cx="100" cy="100" r="9" fill="var(--ink-3)" stroke="var(--red)" strokeWidth="2" />
      </svg>
      {labels && <motion.div className="tach-readout mono">{readout}</motion.div>}
    </div>
  )
}
