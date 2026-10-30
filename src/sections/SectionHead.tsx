import { motion } from 'motion/react'

export function SectionHead({ gear, title, sub }: { gear: string; title: string; sub: string }) {
  return (
    <header className="section-head">
      <motion.div
        className="section-gear mono"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.1 }}
      >
        {gear}
      </motion.div>
      <div>
        <motion.h2
          initial={{ x: 120, opacity: 0, skewX: -20 }}
          animate={{ x: 0, opacity: 1, skewX: 0 }}
          transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="section-sub mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {sub}
        </motion.p>
      </div>
    </header>
  )
}
