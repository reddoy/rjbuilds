import { motion } from 'motion/react'
import { SPEC } from '../data'
import { Section, SectionHead, inView } from './SectionHead'

const EQUIPMENT = [
  'turbocharged curiosity',
  'full-stack (front, back, and the weird middle bit)',
  'business brain, factory installed',
  'adaptive humor (cannot be disabled)',
  'side-project generator',
]

const OPTIONS: [string, boolean][] = [
  ['sleep package', false],
  ['focus assist', false],
  ['launch control', true],
  ['heated opinions about cars', true],
]

export function About() {
  return (
    <Section id="about">
      <SectionHead gear="1" title="about" sub="the window sticker. read it before you test drive." />
      <div className="spec-grid">
        <motion.div
          className="sticker"
          initial={{ rotate: -6, y: 80, opacity: 0 }}
          whileInView={{ rotate: -1.5, y: 0, opacity: 1 }}
          viewport={inView}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.15 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
        >
          <div className="tape" />
          <div className="sticker-head">
            <div>
              <div className="sticker-k mono">vehicle</div>
              <div className="sticker-model">rj o'malley</div>
            </div>
            <div className="sticker-badge mono">
              model year
              <b>current</b>
            </div>
          </div>
          <table className="sticker-table">
            <tbody>
              {SPEC.map(([k, v], i) => (
                <motion.tr
                  key={k}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={inView}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <td className="mono">{k}</td>
                  <td>{v}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          <div className="sticker-cols">
            <div>
              <div className="sticker-k mono">standard equipment</div>
              <ul>
                {EQUIPMENT.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="sticker-k mono">options</div>
              <ul className="opts">
                {OPTIONS.map(([o, on]) => (
                  <li key={o} className={on ? '' : 'nope'}>
                    <span className="box mono">{on ? 'x' : ' '}</span> {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sticker-price">
            <span className="mono">total msrp</span>
            <b>priceless*</b>
          </div>
          <div className="fine mono">*negotiable. will accept interesting problems as payment.</div>
        </motion.div>

        <motion.div
          className="spec-bio"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <p className="big">
            hey. i'm <span className="red">rj</span>.
          </p>
          <p>
            my birth certificate says rohan, everyone else says rj. i'm into three things: <b>cars</b>,{' '}
            <b>programming</b>, and <b>business</b>, and my favorite projects mash all three together.
          </p>
          <p>
            i build fast and ship real stuff. sometimes a whole company blows up on me (rest in peace, auro), and i
            learn more from that than from anything that worked.
          </p>
          <p className="muted">
            i joke around too much and get distracted easily. if you hang around here long enough, you'll see what i
            mean.
          </p>
        </motion.div>
      </div>
    </Section>
  )
}
