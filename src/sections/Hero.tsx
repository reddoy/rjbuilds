import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { useEffect } from 'react'

const WORDS = ['computers', 'cars', 'building apps', 'marketing']

function Letter({ ch, i, mx, my }: { ch: string; i: number; mx: MotionValue<number>; my: MotionValue<number> }) {
  const skewX = useTransform(mx, [-1, 1], [i ? -12 : 12, i ? 8 : -8])
  const y = useTransform(my, [-1, 1], [i ? 14 : -14, i ? -14 : 14])
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

export function Hero() {
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
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div className="hero-main">
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
            className="hero-copy"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
          >
            <p className="who">
              hey, i'm rj.
            </p>
            <p className="tag">
              i love computers and cars. i build apps and work on marketing.
            </p>
            <div className="hero-ctas">
              <a className="btn" href="#builds">
                see what i built
              </a>
              <a className="btn ghost" href="#contact">
                say hi
              </a>
            </div>
          </motion.div>
        </div>
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

      <a className="scroll-cue mono" href="#about">
        scroll <span className="hint-arrow">↓</span>
      </a>
    </section>
  )
}
