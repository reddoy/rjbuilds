import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { SECTIONS, type SectionId } from '../data'

export function Nav({ active }: { active: SectionId }) {
  const [menu, setMenu] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!menu) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false)
      if (event.key !== 'Tab') return
      const items = panel.current?.querySelectorAll<HTMLElement>('button, a')
      if (!items?.length) return
      const first = items[0], last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      menuButton.current?.focus()
    }
  }, [menu])

  return (
    <>
      <header className="nav workshop-nav">
        <div className="nav-inner">
          <a href="#top" className="nav-logo workshop-logo" aria-label="itsrjbuilds — back to top"><span className="mono">itsrj</span><b>builds</b><span className="red">.</span></a>
          <nav className="nav-links" aria-label="main navigation">
            {SECTIONS.slice(1).map((section, i) => (
              <a key={section.id} href={`#${section.id}`} className={active === section.id ? 'on' : ''} aria-current={active === section.id ? 'location' : undefined}>
                <span className="nav-index mono" aria-hidden="true">0{i + 1}</span>{section.label}
                {active === section.id && <motion.span layoutId="construction-marker" className="nav-marker" transition={{ duration: reduceMotion ? 0 : 0.3 }} />}
              </a>
            ))}
          </nav>
          <button ref={menuButton} className="nav-menu-btn mono" onClick={() => setMenu(true)} aria-expanded={menu} aria-controls="site-menu">menu <span aria-hidden="true">＋</span></button>
        </div>
        <div className="nav-ruler" aria-hidden="true" />
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div ref={panel} id="site-menu" className="menu workshop-menu" role="dialog" aria-modal="true" aria-label="site navigation"
            initial={{ opacity: 0, y: reduceMotion ? 0 : -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }} transition={{ duration: 0.2 }}>
            <div className="menu-heading mono">explore the workshop</div>
            <button className="menu-close mono" onClick={() => setMenu(false)} aria-label="close menu">close ×</button>
            {SECTIONS.map((section, i) => (
              <a key={section.id} href={`#${section.id}`} onClick={() => setMenu(false)} className={active === section.id ? 'on' : ''} aria-current={active === section.id ? 'location' : undefined}>
                <span className="mono">0{i}</span>{section.label}<i aria-hidden="true">↗</i>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
