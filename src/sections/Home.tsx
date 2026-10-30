import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect } from 'react'

const WORDS = ['cars', 'code', 'business', 'got distracted', 'side projects', 'shipping', '2am ideas', 'cars again']

function Letter({ ch, i, mx, my }: { ch: string; i: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const skewX = useTransform(mx, [-1, 1], [i ? -14 : 14, i ? 10 : -10])
  const y = useTransform(my, [-1, 1], [i ? 18 : -18, i ? -18 : 18])
  return (
    <motion.span
      className="mega-letter"
      initial={{ y: '60%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15 + i * 0.1, type: 'spring', stiffness: 180, damping: 16 }}
    >
      <motion.span style={{ skewX, y, display: 'inline-block' }} whileHover={{ scale: 1.06, color: 'var(--red)' }}>
        {ch}
      </motion.span>
    </motion.span>
  )
}

export function Home() {
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 120, damping: 18 })
  const my = useSpring(rawY, { stiffness: 120, damping: 18 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [rawX, rawY])

  return (
    <div className="panel home">
      <div className="home-top mono">
        <span>// rjbuilds</span>
        <span className="hide-sm">status: building something (again)</span>
        <span>
          <span className="live-dot" /> online
        </span>
      </div>

      <div className="home-hero">
        <h1 className="mega" aria-label="rj">
          <Letter ch="r" i={0} mx={mx} my={my} />
          <Letter ch="j" i={1} mx={mx} my={my} />
          <motion.span
            className="mega-dot"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 400, damping: 10 }}
          >
            .
          </motion.span>
        </h1>

        <motion.div
          className="home-copy"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
        >
          <p className="who">
            <s>rohan</s> rj o'malley
          </p>
          <p className="tag">
            i build software, obsess over cars, and start businesses.{' '}
            <span className="muted">sometimes in that order.</span>
          </p>
        </motion.div>
      </div>

      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...WORDS, ...WORDS, ...WORDS].map((w, i) => (
            <span key={i}>
              {w} <b>✦</b>
            </span>
          ))}
        </div>
      </div>

      <motion.div
        className="hint mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="hint-arrow">↓</span> grab the shifter
        <span className="hide-sm">
          · or press <kbd>1</kbd>–<kbd>5</kbd> <kbd>r</kbd> · <kbd>`</kbd> opens a terminal
        </span>
      </motion.div>
    </div>
  )
}
