import { motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

export function Intro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [typed, setTyped] = useState(0)
  const [phase, setPhase] = useState<'type' | 'build' | 'ready' | 'reveal'>('type')
  const done = useRef(false)
  const finish = useCallback(() => {
    if (done.current) return
    done.current = true
    onReveal()
    onDone()
  }, [onReveal, onDone])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return
    }
    const timers = [
      ...Array.from({ length: 5 }, (_, i) => window.setTimeout(() => setTyped(i + 1), 230 + i * 115)),
      window.setTimeout(() => setPhase('build'), 950),
      window.setTimeout(() => setPhase('ready'), 2050),
      window.setTimeout(() => { setPhase('reveal'); onReveal() }, 2600),
      window.setTimeout(finish, 3250),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [finish, onReveal])

  return (
    <motion.div className={`intro workshop-intro phase-${phase}`} role="dialog" aria-label="itsrjbuilds introduction"
      animate={{ opacity: phase === 'reveal' ? 0 : 1, y: phase === 'reveal' ? '-5%' : 0 }}
      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}>
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-corner mono" aria-hidden="true">rj / personal workshop</div>
      <div className="intro-assembly">
        <div className="intro-dimension mono" aria-hidden="true"><span>idea</span><i /><span>made real</span></div>
        <div className="intro-wordmark" aria-label="itsrjbuilds">
          <span className="intro-code mono" aria-hidden="true"><span className="code-prompt">&gt;</span>{'itsrj'.slice(0, typed)}<i className="type-cursor" /></span>
          <span className="intro-metal" aria-hidden="true">
            <span className="metal-outline">builds</span>
            {'builds'.split('').map((letter, i) => (
              <motion.span className="metal-letter" key={i}
                initial={{ y: i % 2 ? 95 : -95, x: (i - 2.5) * 12, rotate: i % 2 ? 12 : -12, opacity: 0 }}
                animate={phase !== 'type' ? { y: 0, x: 0, rotate: 0, opacity: 1 } : {}}
                transition={{ delay: i * 0.085, type: 'spring', stiffness: 230, damping: 21 }}>
                {letter}
              </motion.span>
            ))}
          </span>
          <span className="logo-stop" aria-hidden="true">.</span>
        </div>
        <div className="intro-baseline" aria-hidden="true"><span /></div>
        <div className="intro-status mono" aria-hidden="true"><span>{phase === 'type' ? '01 / writing the idea' : phase === 'build' ? '02 / putting it together' : '03 / ready to explore'}</span><span>{phase === 'ready' || phase === 'reveal' ? 'complete ↗' : 'work in progress'}</span></div>
      </div>
      <button className="skip mono" onClick={finish}>skip intro ↗</button>
    </motion.div>
  )
}
