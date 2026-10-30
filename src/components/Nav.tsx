import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { SECTIONS, type SectionId } from '../data'
import { isSoundOn, onSoundChange, setSound } from '../lib/engine'
import { Tach } from './Tach'

const LEDS = 14

function ledColor(i: number) {
  if (i < 7) return 'var(--green)'
  if (i < 11) return 'var(--yellow)'
  return 'var(--red)'
}

export function Nav({ active }: { active: SectionId }) {
  const { scrollYProgress } = useScroll()
  const [lit, setLit] = useState(0)
  const [menu, setMenu] = useState(false)
  const [sound, setSoundState] = useState(isSoundOn())
  useEffect(() => onSoundChange(setSoundState), [])
  useMotionValueEvent(scrollYProgress, 'change', (v) => setLit(Math.round(v * LEDS)))

  const gear = SECTIONS.find((s) => s.id === active)!.gear

  return (
    <>
      <motion.header
        className="nav"
        initial={{ y: -90 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 170, damping: 22, delay: 0.2 }}
      >
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="back to top">
            rj<span className="red">.</span>
          </a>

          <nav className="nav-links" aria-label="sections">
            {SECTIONS.slice(1).map((s) => (
              <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : ''}>
                {s.label}
                {active === s.id && <motion.span layoutId="nav-pill" className="nav-pill" />}
              </a>
            ))}
          </nav>

          <div className="nav-right">
            <button className={`chip mono hide-sm ${sound ? 'on' : ''}`} onClick={() => setSound(!sound)}>
              vroom: {sound ? 'on' : 'off'}
            </button>
            <div className="nav-gear" title="current gear: scroll to shift">
              <Tach size={34} labels={false} />
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={gear}
                  className="nav-gear-digit"
                  initial={{ y: -18, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 18, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                >
                  {gear}
                </motion.span>
              </AnimatePresence>
            </div>
            <button className="nav-menu-btn mono" onClick={() => setMenu(true)} aria-label="open menu">
              menu
            </button>
          </div>
        </div>
        <div className="shift-lights" aria-hidden>
          {Array.from({ length: LEDS }, (_, i) => (
            <span
              key={i}
              style={i < lit ? { background: ledColor(i), boxShadow: `0 0 10px ${ledColor(i)}` } : undefined}
            />
          ))}
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <button className="menu-close mono" onClick={() => setMenu(false)}>
              close ✕
            </button>
            {SECTIONS.map((s, i) => (
              <motion.a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenu(false)}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.05 }}
                className={active === s.id ? 'on' : ''}
              >
                <span className="mono">{s.gear}</span>
                {s.label}
              </motion.a>
            ))}
            <button className={`chip mono ${sound ? 'on' : ''}`} onClick={() => setSound(!sound)}>
              vroom: {sound ? 'on' : 'off'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
