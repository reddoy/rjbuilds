import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import type { GearId } from '../data'

const H = 36
const COLS = [-H, 0, H]

const GATES: Record<GearId, { x: number; y: number }> = {
  N: { x: 0, y: 0 },
  '1': { x: -H, y: -H },
  '2': { x: -H, y: H },
  '3': { x: 0, y: -H },
  '4': { x: 0, y: H },
  '5': { x: H, y: -H },
  R: { x: H, y: H },
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const nearestCol = (x: number) => COLS.reduce((best, c) => (Math.abs(c - x) < Math.abs(best - x) ? c : best))

function gateAt(x: number, y: number): GearId {
  const entry = (Object.entries(GATES) as [GearId, { x: number; y: number }][]).find(
    ([id, g]) => id !== 'N' && g.x === x && Math.sign(g.y) === Math.sign(y),
  )
  return entry ? entry[0] : 'N'
}

/** constrain a drag target to the H-pattern: sideways only in the neutral rail, up/down only in a gate */
function constrain(px: number, py: number, cur: { x: number; y: number }) {
  if (Math.abs(cur.y) < 8) {
    const col = nearestCol(px)
    if (Math.abs(px - col) < 14 && Math.abs(py) > 8) return { x: col, y: clamp(py, -H, H) }
    return { x: clamp(px, -H, H), y: 0 }
  }
  return { x: nearestCol(cur.x), y: clamp(py, -H, H) }
}

export function Shifter({ gear, onShift }: { gear: GearId; onShift: (g: GearId) => void }) {
  const [pos, setPos] = useState(GATES[gear])
  const [dragging, setDragging] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const posRef = useRef(pos)
  posRef.current = pos

  useEffect(() => {
    if (!dragging) setPos(GATES[gear])
  }, [gear, dragging])

  const local = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect()
    return { x: e.clientX - (r.left + r.width / 2), y: e.clientY - (r.top + r.height / 2) }
  }

  const onDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
  }

  const onMove = (e: React.PointerEvent) => {
    if (!dragging) return
    const p = local(e)
    // walk toward the pointer in small steps so fast drags still follow the gates
    let cur = posRef.current
    for (let i = 0; i < 6; i++) cur = constrain(cur.x + (p.x - cur.x) / (6 - i), cur.y + (p.y - cur.y) / (6 - i), cur)
    setPos(cur)
  }

  const onUp = () => {
    if (!dragging) return
    setDragging(false)
    const cur = posRef.current
    const next = Math.abs(cur.y) > H * 0.55 ? gateAt(nearestCol(cur.x), cur.y) : 'N'
    setPos(GATES[next])
    if (next !== gear) onShift(next)
  }

  return (
    <div className="shifter" ref={box} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
      <svg viewBox="-60 -60 120 120" className="shifter-gate" aria-hidden>
        <path
          d={`M ${-H} 0 H ${H} M ${-H} ${-H} V ${H} M 0 ${-H} V ${H} M ${H} ${-H} V ${H}`}
          stroke="#33312c"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={`M ${-H} 0 H ${H} M ${-H} ${-H} V ${H} M 0 ${-H} V ${H} M ${H} ${-H} V ${H}`}
          stroke="#0a0a09"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {(Object.keys(GATES) as GearId[])
        .filter((g) => g !== 'N')
        .map((g) => (
          <button
            key={g}
            className={`gate-label mono ${g === gear ? 'on' : ''} ${g === 'R' ? 'rev' : ''}`}
            style={{ left: `calc(50% + ${GATES[g].x}px)`, top: `calc(50% + ${GATES[g].y + (GATES[g].y < 0 ? -22 : 22)}px)` }}
            onClick={() => onShift(g)}
            aria-label={`shift to ${g === 'R' ? 'reverse' : `gear ${g}`}`}
          >
            {g}
          </button>
        ))}
      <motion.div
        className={`knob ${dragging ? 'grab' : ''}`}
        onPointerDown={onDown}
        animate={{ x: pos.x, y: pos.y, scale: dragging ? 1.12 : 1 }}
        transition={dragging ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 22 }}
        role="slider"
        aria-label="gear shifter. drag it, or press 1 to 5, r, or n"
        aria-valuetext={gear}
      >
        <span className="mono">{gear === 'N' ? 'n' : gear.toLowerCase()}</span>
      </motion.div>
    </div>
  )
}
