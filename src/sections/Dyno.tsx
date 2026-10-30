import { animate, motion, useMotionValue, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { BUILDS, VENTURES } from '../data'
import { SectionHead } from './SectionHead'

// motivation by hour, starting at 6am
const CURVE = [22, 38, 55, 48, 40, 34, 28, 22, 30, 38, 45, 50, 56, 62, 68, 74, 80, 86, 92, 97, 100, 55, 12, 6]
const W = 600
const HGT = 260

const points = CURVE.map((v, i) => [(i / (CURVE.length - 1)) * W, HGT - (v / 100) * (HGT - 20)] as const)
// catmull-rom spline through the points, as cubic beziers
const path = points.reduce((d, [x, y], i) => {
  if (i === 0) return `M ${x} ${y}`
  const p0 = points[Math.max(0, i - 2)]
  const p1 = points[i - 1]
  const p3 = points[Math.min(points.length - 1, i + 1)]
  const c1 = [p1[0] + (x - p0[0]) / 6, p1[1] + (y - p0[1]) / 6]
  const c2 = [x - (p3[0] - p1[0]) / 6, y - (p3[1] - p1[1]) / 6]
  return `${d} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${x} ${y}`
}, '')

const NOTES: { i: number; label: string }[] = [
  { i: 2, label: 'coffee' },
  { i: 7, label: 'post-lunch coma' },
  { i: 20, label: 'peak: 2am' },
  { i: 22, label: 'regret' },
]

const HOURS = ['6am', '10am', '2pm', '6pm', '10pm', '2am'].map((label, k) => ({ label, i: k * 4 }))

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const mv = useMotionValue(0)
  const text = useTransform(mv, (v) => `${Math.round(v)}${suffix}`)
  useEffect(() => {
    const c = animate(mv, to, { duration: 1.2, ease: 'easeOut', delay: 0.3 })
    return () => c.stop()
  }, [mv, to])
  return <motion.span>{text}</motion.span>
}

export function Dyno({ distractions }: { distractions: number }) {
  const shipped = new Set([...BUILDS.map((b) => b.name), ...VENTURES.filter((v) => v.status !== 'loading').map((v) => v.name)])
    .size
  const stats: { k: string; v: React.ReactNode }[] = [
    { k: 'things shipped', v: <Counter to={shipped} /> },
    { k: 'engines blown', v: <Counter to={1} /> },
    { k: 'distractions this visit', v: <span className="red">{distractions}</span> },
    { k: 'ideas in notes app', v: <Counter to={47} suffix="+" /> },
    { k: 'cars & bids refreshes', v: '∞' },
    { k: 'sleep', v: <span className="muted">n/a</span> },
  ]

  return (
    <div className="panel dyno">
      <SectionHead gear="4" title="the dyno" sub="strapped myself to the rollers. here are the numbers. some are real." />
      <div className="dyno-grid">
        <div className="dyno-sheet">
          <div className="dyno-sheet-head mono">
            <span>run #001 · motivation output vs. time of day</span>
            <span className="red">sae corrected (not really)</span>
          </div>
          <svg viewBox={`-10 -10 ${W + 20} ${HGT + 40}`} className="dyno-chart">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <line key={f} x1="0" x2={W} y1={HGT - f * (HGT - 20)} y2={HGT - f * (HGT - 20)} className="grid" />
            ))}
            {HOURS.map((h) => (
              <text key={h.label} x={points[h.i][0]} y={HGT + 24} className="axis" textAnchor="middle">
                {h.label}
              </text>
            ))}
            <motion.path
              d={`${path} L ${W} ${HGT} L 0 ${HGT} Z`}
              className="area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            />
            <motion.path
              d={path}
              className="curve"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut', delay: 0.2 }}
            />
            {NOTES.map((n, k) => {
              const [x, y] = points[n.i]
              return (
                <motion.g
                  key={n.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + k * 0.35 }}
                >
                  <circle cx={x} cy={y} r="5" className={n.label.startsWith('peak') ? 'pt peak' : 'pt'} />
                  <text x={x} y={y - 14} textAnchor="middle" className="note">
                    {n.label}
                  </text>
                </motion.g>
              )
            })}
          </svg>
        </div>

        <div className="dyno-stats">
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              className="stat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 260, damping: 18 }}
            >
              <div className="stat-v">{s.v}</div>
              <div className="stat-k mono">{s.k}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
