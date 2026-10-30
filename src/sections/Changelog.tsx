import { motion } from 'motion/react'
import { CHANGELOG } from '../data'

function hash(s: string) {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

export function Changelog() {
  return (
    <div className="panel changelog">
      <div className="cam-overlay" aria-hidden>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 18 100 L 34 40" className="g-green" />
          <path d="M 82 100 L 66 40" className="g-green" />
          <path d="M 23 82 L 77 82" className="g-red" />
          <path d="M 27 66 L 73 66" className="g-yellow" />
          <path d="M 31 52 L 69 52" className="g-green" />
        </svg>
        <div className="cam-warn mono">check surroundings for safety</div>
        <div className="cam-rec mono">
          <span className="rec-dot" /> rear cam
        </div>
      </div>

      <header className="section-head">
        <div className="section-gear mono rev">r</div>
        <div>
          <h2>reverse</h2>
          <p className="section-sub mono">backing up through the git log of my life. newest first.</p>
        </div>
      </header>

      <div className="log mono">
        {CHANGELOG.map((c, i) => (
          <motion.div
            key={c.v}
            className="log-row"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <span className="log-hash">{hash(c.v + c.msg)}</span>
            <span className="log-v">{c.v}</span>
            <span className={`log-type t-${c.type}`}>{c.type}:</span>
            <span className="log-msg">{c.msg}</span>
          </motion.div>
        ))}
        <div className="log-end muted">— end of history. shift into 1st to drive forward —</div>
      </div>
    </div>
  )
}
