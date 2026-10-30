import { Section, SectionHead } from './SectionHead'
import childhoodPhoto from '../../little-rj-building.jpg'

export function About() {
  return (
    <Section id="about">
      <SectionHead gear="1" title="about" sub="a little about me." />
      <div className="about-story">
        <figure className="origin-photo">
          <div className="origin-label mono">where it started</div>
          <img
            src={childhoodPhoto}
            alt="RJ as a little kid at his mom’s computer, with his hands on the keyboard."
            width={1179}
            height={1156}
            loading="lazy"
            decoding="async"
          />
          <figcaption>
            <span className="mono">little rj, big plans.</span>
            <span>building at my mom’s computer.</span>
          </figcaption>
        </figure>
        <div className="about-copy">
        <p className="origin-heading">been at it since mom’s computer.</p>
        <p>i’m rj. i love computers and cars, and i spend a lot of my time building apps.</p>
        <p>i’m also interested in marketing: how people find a product, what makes them try it, and why they keep using it.</p>
        <p className="muted">this site is a collection of my projects and the things i’m into.</p>
        </div>
      </div>
    </Section>
  )
}
