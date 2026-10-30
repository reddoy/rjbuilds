import { motion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BUILDS, CONTACT, MOVIES, SECTIONS, SONGS } from '../data'
import { blip, isSoundOn, setSound } from '../lib/engine'

type Line = { kind: 'in' | 'out' | 'err'; text: ReactNode }

const JOKES = [
  'why did the developer buy a manual? because automatic deploys kept breaking.',
  "my code is like my project car: it runs, nobody knows why, don't touch it.",
  'there are 10 types of people: those who understand binary and those who drive automatics.',
  "i'm not procrastinating, i'm letting the idea warm up like an old v8.",
  'my startup has the same burn rate as a 1970s muscle car.',
]

const HELP = [
  'help            this',
  'ls              list sections',
  'cd <section>    go there (try: cd music, cd 3)',
  'movies          on the shelf',
  'music           on rotation',
  'whoami          who is this',
  'builds          what i made',
  'vroom           toggle engine sound',
  'rev             blip the throttle',
  'distract        get distracted on purpose',
  'joke            dad joke, car flavored',
  'sudo hire rj    ...',
  'clear / exit',
]

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Terminal({ onClose, onDistract }: { onClose: () => void; onDistract: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { kind: 'out', text: 'rjOS garage shell v9.0 — type "help". esc to close.' },
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [hIdx, setHIdx] = useState(-1)
  const input = useRef<HTMLInputElement>(null)
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    input.current?.focus()
  }, [])

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight })
  }, [lines])

  const run = (raw: string) => {
    const cmd = raw.trim()
    const out: Line[] = [{ kind: 'in', text: cmd }]
    const say = (text: ReactNode, kind: Line['kind'] = 'out') => out.push({ kind, text })
    const [head, ...rest] = cmd.toLowerCase().split(/\s+/)
    const arg = rest.join(' ')

    switch (head) {
      case '':
        break
      case 'help':
        HELP.forEach((h) => say(h))
        break
      case 'ls':
        SECTIONS.forEach((s) => say(`[${s.gear}]  ${s.label}`))
        break
      case 'cd': {
        const target = SECTIONS.find((s) => s.gear === arg || s.label === arg || s.id === arg)
        if (!arg || arg === '~') {
          goTo('top')
          onClose()
          return
        } else if (target) {
          goTo(target.id)
          onClose()
          return
        } else say(`cd: no such section: ${arg}. try "ls"`, 'err')
        break
      }
      case 'whoami':
        say("rj o'malley. legally rohan. spiritually rj.")
        say('likes: cars, programming, business. dislikes: finishing one thing before starting another.')
        break
      case 'builds':
        BUILDS.forEach((b) => say(`- ${b.name.padEnd(22)} ${b.status}`))
        break
      case 'movies':
        MOVIES.forEach((m) => say(`- ${m.title} (${m.year}): ${m.scene}`))
        break
      case 'music':
        SONGS.forEach((m) => say(`- ${m.title} — ${m.artist}`))
        break
      case 'vroom':
        setSound(!isSoundOn())
        say(isSoundOn() ? 'engine noise: on. vroom.' : 'engine noise: off. stealth mode.')
        break
      case 'rev':
        blip(7200)
        say('BRAAAP.')
        break
      case 'distract':
        onDistract()
        say('oh look, a squirrel.')
        break
      case 'joke':
        say(JOKES[Math.floor(Math.random() * JOKES.length)])
        break
      case 'sudo':
        if (arg.startsWith('hire')) {
          say('permission granted. opening your email client...')
          window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent('hiring rj (via the terminal, obviously)')}`
        } else say('nice try.', 'err')
        break
      case 'rm':
        say('absolutely not. this is a garage, not a demolition derby.', 'err')
        break
      case 'github':
        window.open(CONTACT.github, '_blank')
        say('opening github...')
        break
      case 'exit':
      case 'quit':
        onClose()
        return
      case 'clear':
        setLines([])
        setHistory((h) => [cmd, ...h])
        return
      default:
        say(`command not found: ${head}. did you mean "vroom"?`, 'err')
    }
    setLines((l) => [...l, ...out])
    if (cmd) setHistory((h) => [cmd, ...h])
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation()
    if (e.key === 'Enter') {
      run(value)
      setValue('')
      setHIdx(-1)
    } else if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const i = Math.min(hIdx + 1, history.length - 1)
      if (history[i]) {
        setHIdx(i)
        setValue(history[i])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const i = hIdx - 1
      setHIdx(Math.max(i, -1))
      setValue(i >= 0 ? history[i] : '')
    }
  }

  return (
    <motion.div className="term-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div
        className="term mono"
        initial={{ y: 40, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        onClick={(e) => {
          e.stopPropagation()
          input.current?.focus()
        }}
      >
        <div className="term-bar">
          <span className="dot r" onClick={onClose} />
          <span className="dot y" />
          <span className="dot g" />
          <span className="term-title">rj@garage: ~</span>
        </div>
        <div className="term-body" ref={scroller}>
          {lines.map((l, i) => (
            <div key={i} className={`term-line ${l.kind}`}>
              {l.kind === 'in' && <span className="prompt-sym">rj@garage ~ $ </span>}
              {l.text}
            </div>
          ))}
          <div className="term-line in">
            <span className="prompt-sym">rj@garage ~ $ </span>
            <input
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKey}
              spellCheck={false}
              autoComplete="off"
              aria-label="terminal input"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
