import { motion } from 'motion/react'
import { useMemo } from 'react'

export function SpeedLines({ dir, reverse }: { dir: number; reverse: boolean }) {
  const lines = useMemo(
    () =>
      Array.from({ length: 22 }, () => ({
        top: Math.random() * 100,
        width: 15 + Math.random() * 35,
        delay: Math.random() * 0.15,
        thick: Math.random() > 0.8 ? 3 : 1,
        red: Math.random() > 0.85,
      })),
    [],
  )
  const from = reverse ? '-60vw' : dir >= 0 ? '110vw' : '-60vw'
  const to = reverse ? '110vw' : dir >= 0 ? '-60vw' : '110vw'

  return (
    <div className="speedlines" aria-hidden>
      {lines.map((l, i) => (
        <motion.span
          key={i}
          className={l.red ? 'red-line' : ''}
          style={{ top: `${l.top}%`, width: `${l.width}vw`, height: l.thick }}
          initial={{ x: from, opacity: 0 }}
          animate={{ x: to, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.55, delay: l.delay, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
