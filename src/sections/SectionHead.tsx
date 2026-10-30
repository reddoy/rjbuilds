import { motion } from 'motion/react'
import type { ReactNode } from 'react'

export const inView = { once: true, amount: 0.25 } as const

export function Section({ id, className = '', children }: { id: string; className?: string; children: ReactNode }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container">{children}</div>
    </section>
  )
}

export function SectionHead({ gear, title, sub }: { gear: string; title: string; sub: string }) {
  return (
    <header className="section-head">
      <motion.div
        className="section-gear mono"
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={inView}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
      >
        {gear}
      </motion.div>
      <div>
        <motion.h2
          initial={{ x: 80, opacity: 0, skewX: -14 }}
          whileInView={{ x: 0, opacity: 1, skewX: 0 }}
          viewport={inView}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="section-sub mono"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ delay: 0.3 }}
        >
          {sub}
        </motion.p>
      </div>
    </header>
  )
}
