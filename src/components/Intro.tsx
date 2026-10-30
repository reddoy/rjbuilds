import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { sweep } from '../lib/engine'
import { Tach } from './Tach'

type Phase = 'ignite' | 'slam' | 'split'

export function Intro({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('ignite')
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
    if (phase === 'ignite') {
      sweep(() => {
        setShake(true)
        window.setTimeout(() => setShake(false), 380)
      })
      t = window.setTimeout(() => setPhase('slam'), 1250)
    } else if (phase === 'slam') {
      t = window.setTimeout(() => setPhase('split'), 650)
    } else {
      onReveal()
      t = window.setTimeout(finish, 850)
    }
    return () => window.clearTimeout(t)
  }, [phase])

  return (
    <div className={`intro ${shake ? 'shake' : ''}`} onClick={finish}>
      <motion.div
        className="intro-half top"
        animate={phase === 'split' ? { y: '-101%' } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="intro-half bottom"
        animate={phase === 'split' ? { y: '101%' } : { y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      <AnimatePresence>
        {phase === 'ignite' && (
          <motion.div
            key="tach"
            className="intro-tach"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2.4, filter: 'blur(20px)' }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            <Tach size={Math.min(380, window.innerWidth * 0.75)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase !== 'ignite' && (
          <motion.div
            key="slam"
            className="intro-slam"
            initial={{ scale: 5, opacity: 0, filter: 'blur(30px)' }}
            animate={
              phase === 'split'
                ? { scale: 0.6, opacity: 0, filter: 'blur(10px)' }
                : { scale: 1, opacity: 1, filter: 'blur(0px)' }
            }
            transition={{ duration: phase === 'split' ? 0.45 : 0.4, ease: [0.2, 0.9, 0.1, 1] }}
          >
            rj<span className="red">.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {phase === 'slam' && <div className="flash" />}

      {phase !== 'split' && <span className="skip mono">click to skip</span>}
    </div>
  )
}
