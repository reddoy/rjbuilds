import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { setSound, sweep } from '../lib/engine'
import { Tach } from './Tach'

const COMMAND = 'rj ignite --no-chill'

const BOOT: [string, string, string?][] = [
  ['checking oil', "skipped (it's probably fine)"],
  ['loading personality', '94% jokes, 6% business plan'],
  ['compiling rohan → rj', 'ok (renamed for vibes)'],
  ['mounting /garage', 'ok'],
  ['attention span', 'low — hurry up', 'warn'],
  ['fuel', 'cars + code + money'],
]

type Phase = 'type' | 'boot' | 'prompt' | 'ignite' | 'slam' | 'split'

export function Intro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('type')
  const [typed, setTyped] = useState(0)
  const [lines, setLines] = useState(0)
  const [shake, setShake] = useState(false)
  const done = useRef(false)

  const finish = () => {
    if (done.current) return
    done.current = true
    onReveal()
    onDone()
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish()
  }, [])

  useEffect(() => {
    let t: number
    if (phase === 'type') {
      if (typed < COMMAND.length) t = window.setTimeout(() => setTyped(typed + 1), 38 + Math.random() * 40)
      else t = window.setTimeout(() => setPhase('boot'), 220)
    } else if (phase === 'boot') {
      if (lines < BOOT.length) t = window.setTimeout(() => setLines(lines + 1), 150 + Math.random() * 110)
      else t = window.setTimeout(() => setPhase('prompt'), 250)
    } else if (phase === 'prompt') {
      t = window.setTimeout(() => setPhase('ignite'), 1500)
    } else if (phase === 'ignite') {
      sweep(() => {
        setShake(true)
        window.setTimeout(() => setShake(false), 420)
      })
      t = window.setTimeout(() => setPhase('slam'), 1650)
    } else if (phase === 'slam') {
      t = window.setTimeout(() => setPhase('split'), 950)
    } else {
      onReveal()
      t = window.setTimeout(finish, 900)
    }
    return () => window.clearTimeout(t)
  }, [phase, typed, lines])

  useEffect(() => {
    if (phase !== 'prompt') return
    const go = (e: Event) => {
      if ((e.target as Element | null)?.closest?.('.skip')) return
      setSound(true)
      setPhase('ignite')
    }
    window.addEventListener('keydown', go, { once: true })
    window.addEventListener('pointerdown', go, { once: true })
    return () => {
      window.removeEventListener('keydown', go)
      window.removeEventListener('pointerdown', go)
    }
  }, [phase])

  const showTerminal = phase === 'type' || phase === 'boot' || phase === 'prompt'

  return (
    <div className={`intro ${shake ? 'shake' : ''}`}>
      <motion.div
        className="intro-half top"
        animate={phase === 'split' ? { y: '-101%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="intro-half bottom"
        animate={phase === 'split' ? { y: '101%' } : { y: 0 }}
        transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      />

      <AnimatePresence>
        {showTerminal && (
          <motion.div
            key="term"
            className="intro-term mono"
            exit={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="intro-line">
              <span className="prompt-sym">rj@garage ~ $</span> {COMMAND.slice(0, typed)}
              {phase === 'type' && <span className="caret" />}
            </div>
            {BOOT.slice(0, lines).map(([k, v, kind]) => (
              <div key={k} className="intro-line boot">
                <span className="muted">›</span> {k.padEnd(22, '.')}{' '}
                <span className={kind === 'warn' ? 'warn' : 'ok'}>{v}</span>
              </div>
            ))}
            {phase === 'prompt' && (
              <motion.div className="intro-press" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="blink">▮</span> press any key to turn the key <span className="muted">(adds engine noise)</span>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'ignite' && (
          <motion.div
            key="tach"
            className="intro-tach"
            initial={{ opacity: 0, scale: 0.7, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 2.4, filter: 'blur(20px)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <Tach size={Math.min(420, window.innerWidth * 0.8)} />
            <div className="intro-ign mono">ignition</div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(phase === 'slam' || phase === 'split') && (
          <motion.div
            key="slam"
            className="intro-slam"
            initial={{ scale: 5, opacity: 0, filter: 'blur(30px)' }}
            animate={
              phase === 'split'
                ? { scale: 0.6, opacity: 0, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1, filter: 'blur(0px)' }
            }
            transition={{ duration: phase === 'split' ? 0.5 : 0.45, ease: [0.2, 0.9, 0.1, 1] }}
          >
            rj<span className="red">.</span>
            <motion.div
              className="hazard intro-hazard"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.25, duration: 0.4, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'slam' && <div className="flash" />}

      {phase !== 'split' && (
        <button className="skip mono" onClick={finish}>
          skip intro →
        </button>
      )}
    </div>
  )
}
