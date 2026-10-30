import { motion } from 'motion/react'
import { VENTURES } from '../data'
import { Section, SectionHead, inView } from './SectionHead'

const RACE_CONTROL = [
  'rj given a 5 second penalty for starting another project mid-race',
  'incident involving auro noted. no further action. lessons were learned.',
  'track limits: business ideas exceeding 40 per week will be investigated',
  'blue flags shown to sleep schedule',
  'drs enabled: caffeine detection zone',
]

export function Business() {
  return (
    <Section id="business">
      <SectionHead gear="3" title="business" sub="the pit wall. live timing, honest results." />

      <div className="timing">
        <div className="timing-head mono">
          <span>
            <span className="live-dot" /> live timing
          </span>
          <span className="hide-sm">session: ongoing</span>
          <span>lap ∞</span>
        </div>
        <div className="timing-row labels mono">
          <span>pos</span>
          <span>venture</span>
          <span className="hide-sm">what it is</span>
          <span>gap</span>
        </div>
        {VENTURES.map((v, i) => {
          const row = (
            <>
              <span className={`pos s-${v.status}`}>{v.pos}</span>
              <span className="v-name">
                <i className={`sector s-${v.status}`} />
                {v.name}
              </span>
              <span className="v-what hide-sm">{v.what}</span>
              <span className={`gap mono s-${v.status}`}>{v.gap}</span>
            </>
          )
          return (
            <motion.div
              key={v.name}
              initial={{ x: -80, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={inView}
              transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
            >
              {v.link ? (
                <a className="timing-row" href={v.link} target="_blank" rel="noreferrer">
                  {row}
                </a>
              ) : (
                <div className="timing-row">{row}</div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="race-control">
        <span className="rc-label mono">race control</span>
        <div className="rc-scroll">
          <div className="rc-track mono">
            {[...RACE_CONTROL, ...RACE_CONTROL].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
