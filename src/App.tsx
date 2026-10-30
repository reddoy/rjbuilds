import { AnimatePresence, motion, type Variants } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Dash } from './components/Dash'
import { Distraction, useDistractions } from './components/Distraction'
import { Intro } from './components/Intro'
import { SpeedLines } from './components/SpeedLines'
import { Terminal } from './components/Terminal'
import { GEAR_ORDER, type GearId } from './data'
import { blip, setCruise, shiftTo, startWobble } from './lib/engine'
import { Changelog } from './sections/Changelog'
import { Dyno } from './sections/Dyno'
import { Garage } from './sections/Garage'
import { Home } from './sections/Home'
import { PitWall } from './sections/PitWall'
import { Radio } from './sections/Radio'
import { Spec } from './sections/Spec'

const CRUISE: Record<GearId, number> = { R: 1400, N: 900, '1': 1700, '2': 2300, '3': 2900, '4': 3400, '5': 3900 }

const SLUG: Record<GearId, string> = {
  N: '',
  '1': 'spec',
  '2': 'garage',
  '3': 'pitwall',
  '4': 'dyno',
  '5': 'radio',
  R: 'reverse',
}

function gearFromHash(): GearId {
  const slug = window.location.hash.replace('#', '')
  const hit = (Object.keys(SLUG) as GearId[]).find((g) => SLUG[g] === slug)
  return hit ?? 'N'
}

type Dir = { dir: number; rev: boolean }

const panel: Variants = {
  enter: ({ dir, rev }: Dir) =>
    rev
      ? { y: '-100%', opacity: 0, scale: 0.92 }
      : { x: dir > 0 ? '100%' : '-100%', skewX: dir > 0 ? -14 : 14, opacity: 0, filter: 'blur(14px)' },
  center: {
    x: 0,
    y: 0,
    skewX: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 110, damping: 20, mass: 0.9 },
  },
  exit: ({ dir, rev }: Dir) =>
    rev
      ? { y: '100%', opacity: 0, scale: 0.92, transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } }
      : {
          x: dir > 0 ? '-70%' : '70%',
          skewX: dir > 0 ? 14 : -14,
          opacity: 0,
          filter: 'blur(14px)',
          transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] },
        },
}

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [booted, setBooted] = useState(false)
  const [gear, setGear] = useState<GearId>(gearFromHash)
  const [dir, setDir] = useState<Dir>({ dir: 1, rev: false })
  const [shiftCount, setShiftCount] = useState(0)
  const [terminal, setTerminal] = useState(false)
  const gearRef = useRef(gear)
  gearRef.current = gear
  const lastBlip = useRef(0)

  const distractions = useDistractions(booted && !terminal)

  const shift = useCallback((g: GearId) => {
    const from = gearRef.current
    if (g === from) return
    const delta = GEAR_ORDER.indexOf(g) - GEAR_ORDER.indexOf(from)
    setDir({ dir: Math.sign(delta), rev: g === 'R' || from === 'R' })
    setGear(g)
    setShiftCount((c) => c + 1)
    shiftTo(CRUISE[g])
    history.replaceState(null, '', SLUG[g] ? `#${SLUG[g]}` : window.location.pathname)
  }, [])

  const onReveal = useCallback(() => {
    setRevealed(true)
    setCruise(CRUISE[gearRef.current])
    startWobble()
  }, [])

  const onBooted = useCallback(() => setBooted(true), [])

  useEffect(() => {
    if (!booted) return
    const onKey = (e: KeyboardEvent) => {
      if (terminal || e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return
      const k = e.key.toLowerCase()
      if (k === '`' || k === '/') {
        e.preventDefault()
        setTerminal(true)
      } else if (['1', '2', '3', '4', '5'].includes(k)) shift(k as GearId)
      else if (k === 'r') shift('R')
      else if (k === 'n' || k === '0') shift('N')
      else if (k === 'arrowright' || k === 'arrowleft') {
        const i = GEAR_ORDER.indexOf(gearRef.current) + (k === 'arrowright' ? 1 : -1)
        if (GEAR_ORDER[i]) shift(GEAR_ORDER[i])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [booted, terminal, shift])

  const onWheel = () => {
    const now = performance.now()
    if (now - lastBlip.current < 700) return
    lastBlip.current = now
    blip(CRUISE[gearRef.current] + 1600)
  }

  const sections: Record<GearId, ReactNode> = {
    N: <Home />,
    '1': <Spec />,
    '2': <Garage />,
    '3': <PitWall />,
    '4': <Dyno distractions={distractions.count} />,
    '5': <Radio />,
    R: <Changelog />,
  }

  return (
    <>
      <div className="grain" aria-hidden />
      <main className={`stage ${gear === 'R' ? 'reversing' : ''}`} onWheel={onWheel}>
        {revealed && (
          <AnimatePresence initial={false} custom={dir}>
            <motion.section
              key={gear}
              className="panel-wrap"
              custom={dir}
              variants={panel}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {sections[gear]}
            </motion.section>
          </AnimatePresence>
        )}
        {shiftCount > 0 && <SpeedLines key={shiftCount} dir={dir.dir} reverse={dir.rev && gear === 'R'} />}
      </main>

      {revealed && <Dash gear={gear} onShift={shift} onTerminal={() => setTerminal(true)} />}

      <Distraction text={distractions.current} onDismiss={distractions.dismiss} />

      <AnimatePresence>
        {terminal && (
          <Terminal onClose={() => setTerminal(false)} onShift={shift} onDistract={distractions.trigger} />
        )}
      </AnimatePresence>

      {!booted && <Intro onReveal={onReveal} onDone={onBooted} />}
    </>
  )
}
