import { VENTURES } from '../data'
import { Section, SectionHead } from './SectionHead'

export function Business() {
  return (
    <Section id="business">
      <SectionHead gear="3" title="marketing" sub="businesses and projects i’ve worked on." />
      <div className="venture-list">
        {VENTURES.filter(v => v.name !== 'next thing').map(v => (
          <article className="venture-item" key={v.name}>
            <div><h3>{v.link ? <a href={v.link} target="_blank" rel="noreferrer">{v.name} ↗</a> : v.name}</h3><p>{v.what}</p></div>
            <span className="status mono">{v.status}</span>
          </article>
        ))}
      </div>
    </Section>
  )
}
