import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { CONTACT } from '../data'
import { SectionHead } from './SectionHead'

const BARS = 48

export function Radio() {
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const bars = useMemo(
    () => Array.from({ length: BARS }, () => ({ a: 0.4 + Math.random() * 0.6, b: 0.3 + Math.random() * 0.7, d: 1.2 + Math.random() })),
    [],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${CONTACT.email}`
    }
  }

  const transmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('pit radio: message for rj')
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${encodeURIComponent(msg)}`
  }

  return (
    <div className="panel radio">
      <SectionHead gear="5" title="pit radio" sub="box, box. let's talk: projects, cars, ideas, whatever." />

      <div className="wave" aria-hidden>
        {bars.map((b, i) => (
          <motion.span
            key={i}
            animate={{ scaleY: [0.15, b.a, 0.2, b.b, 0.15] }}
            transition={{ duration: b.d, repeat: Infinity, delay: i * 0.03, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="radio-grid">
        <div className="radio-links">
          <button className="radio-email" onClick={copy}>
            <span className="mono radio-k">{copied ? 'copied. radio check ✓' : 'email (click to copy)'}</span>
            <span className="radio-v">{CONTACT.email}</span>
          </button>
          <a className="radio-email" href={CONTACT.github} target="_blank" rel="noreferrer">
            <span className="mono radio-k">github ↗</span>
            <span className="radio-v">@reddoy</span>
          </a>
        </div>

        <form className="radio-form" onSubmit={transmit}>
          <label className="mono radio-k" htmlFor="radio-msg">
            your message to the pit wall
          </label>
          <textarea
            id="radio-msg"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="rj, we need you to build..."
            rows={5}
          />
          <button className="transmit mono" type="submit" disabled={!msg.trim()}>
            ● transmit
          </button>
        </form>
      </div>
    </div>
  )
}
