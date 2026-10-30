import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { FUN_FACTS } from '../data'

const IDLE_MS = 11000
const COOLDOWN_MS = 25000
const SHOW_MS = 9000

export function useFunFacts(enabled: boolean) {
  const [current, setCurrent] = useState<string | null>(null)
  const [count, setCount] = useState(0)
  const deck = useRef<string[]>([])
  const lastShown = useRef(0)

  const trigger = () => {
    if (deck.current.length === 0) deck.current = [...FUN_FACTS].sort(() => Math.random() - 0.5)
    lastShown.current = Date.now()
    setCurrent(deck.current.pop()!)
    setCount((c) => c + 1)
  }

  useEffect(() => {
    if (!enabled) return
    let idle: number
    const reset = () => {
      window.clearTimeout(idle)
      idle = window.setTimeout(() => {
        if (Date.now() - lastShown.current > COOLDOWN_MS) trigger()
        reset()
      }, IDLE_MS)
    }
    reset()
    const events = ['pointermove', 'keydown', 'wheel', 'touchstart'] as const
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    return () => {
      window.clearTimeout(idle)
      events.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [enabled])

  useEffect(() => {
    if (!current) return
    const t = window.setTimeout(() => setCurrent(null), SHOW_MS)
    return () => window.clearTimeout(t)
  }, [current])

  return { current, count, trigger, dismiss: () => setCurrent(null) }
}

export function FunFact({ text, onDismiss }: { text: string | null; onDismiss: () => void }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.aside
          key={text}
          className="distraction"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          role="status"
        >
          <div className="distraction-head mono">
            fun fact
          </div>
          <p>{text}</p>
          <button className="chip mono on" onClick={onDismiss}>
            dismiss
          </button>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
