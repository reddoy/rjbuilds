import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { BUILDS, type Build } from '../data'
import { Section, SectionHead, inView } from './SectionHead'

function BuildCard({ b, i }: { b: Build; i: number }) {
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 18 })
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 })

  return (
    <motion.article
      className="build"
      initial={{ opacity: 0, y: 60, rotate: i % 2 ? 3 : -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={inView}
      transition={{ delay: 0.15 + i * 0.07, type: 'spring', stiffness: 140, damping: 16 }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        px.set((e.clientX - r.left) / r.width - 0.5)
        py.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
    >
      <div className="build-top mono">
        <span>project {String(i + 1).padStart(3, '0')}</span>
        <span className={`status s-${b.status.replace(/\s/g, '-')}`}>{b.status}</span>
      </div>
      <h3>{b.name}</h3>
      <p>{b.line}</p>
      <div className="build-engine mono">
        <span className="muted">stack</span> {b.engine}
      </div>
      <div className="build-actions">
        {b.drive && (
          <a className="chip mono on" href={b.drive} target="_blank" rel="noreferrer">
            view project ↗
          </a>
        )}
        {b.hood && (
          <a className="chip mono" href={b.hood} target="_blank" rel="noreferrer">
            source code ↗
          </a>
        )}
        {!b.drive && !b.hood && <span className="chip mono ghost">private project</span>}
      </div>
    </motion.article>
  )
}

export function Builds() {
  return (
    <Section id="builds">
      <SectionHead gear="2" title="builds" sub="apps and projects i’ve built." />
      <div className="build-grid">
        {BUILDS.map((b, i) => (
          <BuildCard key={b.name} b={b} i={i} />
        ))}
      </div>
    </Section>
  )
}
