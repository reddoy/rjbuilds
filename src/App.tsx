import { AnimatePresence } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { FunFact, useFunFacts } from './components/Distraction'
import { Intro } from './components/Intro'
import { Nav } from './components/Nav'
import { Terminal } from './components/Terminal'
import { CONTACT, SECTIONS, type SectionId } from './data'
import { setCruise, shiftTo, startWobble } from './lib/engine'
import { About } from './sections/About'
import { Builds } from './sections/Builds'
import { Business } from './sections/Business'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Movies } from './sections/Movies'
import { Music } from './sections/Music'

const cruiseFor = (i: number) => 900 + i * 550

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<SectionId>('top')
  useEffect(() => {
    if (!enabled) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id as SectionId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [enabled])
  return active
}

export default function App() {
  const [revealed, setRevealed] = useState(false)
  const [booted, setBooted] = useState(false)
  const [terminal, setTerminal] = useState(false)
  const active = useActiveSection(revealed)
  const facts = useFunFacts(booted && !terminal)

  useEffect(() => {
    if (!revealed) return
    shiftTo(cruiseFor(SECTIONS.findIndex((s) => s.id === active)))
  }, [active, revealed])

  const onReveal = useCallback(() => {
    setRevealed(true)
    setCruise(cruiseFor(0))
    startWobble()
  }, [])

  const onBooted = useCallback(() => setBooted(true), [])

  useEffect(() => {
    document.body.classList.toggle('locked', !booted)
  }, [booted])

  useEffect(() => {
    if (!booted) return
    const onKey = (e: KeyboardEvent) => {
      if (terminal || e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return
      if (e.key === '`') {
        e.preventDefault()
        setTerminal(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [booted, terminal])

  return (
    <>
      <div className="grain" aria-hidden />
      {revealed && <Nav active={active} />}

      {revealed && (
        <main>
          <Hero />
          <About />
          <Builds />
          <Business />
          <Music />
          <Movies />
          <Contact />
        </main>
      )}

      <footer className="footer">
        <div className="container footer-inner mono">
          <span>
            built by rj<span className="red">.</span>
          </span>
          <span className="footer-links">
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              github
            </a>
            <a href={`mailto:${CONTACT.email}`}>email</a>
            <button onClick={() => setTerminal(true)}>&gt;_ secret terminal</button>
          </span>
        </div>
      </footer>

      <FunFact text={facts.current} onDismiss={facts.dismiss} />

      <AnimatePresence>
        {terminal && <Terminal onClose={() => setTerminal(false)} onFact={facts.trigger} />}
      </AnimatePresence>

      {!booted && <Intro onReveal={onReveal} onDone={onBooted} />}
    </>
  )
}
