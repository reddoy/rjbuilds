import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { MOVIES } from '../data'
import { setSound } from '../lib/engine'
import { MOVIE_PLAY, MUSIC_PLAY } from './Music'
import { Section, SectionHead, inView } from './SectionHead'

function labelText(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum > 0.5 ? '#0d0d0c' : '#f2ede4'
}

export function Movies() {
  const [current, setCurrent] = useState<number | null>(null)
  const [tuning, setTuning] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const movie = current === null ? null : MOVIES[current]

  useEffect(() => {
    const pause = () =>
      frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }), '*')
    window.addEventListener(MUSIC_PLAY, pause)
    return () => window.removeEventListener(MUSIC_PLAY, pause)
  }, [])

  const insert = (i: number) => {
    if (i === current) return
    setCurrent(i)
    setTuning(true)
    window.setTimeout(() => setTuning(false), 700)
    setSound(false)
    window.dispatchEvent(new Event(MOVIE_PLAY))
  }

  return (
    <Section id="movies" className="movies">
      <SectionHead gear="5" title="movies" sub="i love a good movie clip. pick a tape, it plays on the tv." />

      <div className="movies-grid">
        <motion.div
          className="tv"
          initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={inView}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        >
          <div className="tv-screen">
            {movie && !tuning && (
              <iframe
                ref={frame}
                key={movie.yt}
                src={`https://www.youtube-nocookie.com/embed/${movie.yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
                title={`${movie.title}: ${movie.scene}`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )}
            {(!movie || tuning) && <div className="static" />}
            {!movie && (
              <div className="osd mono">
                <span>no signal</span>
                <span className="blink-slow">pick a tape from the shelf</span>
              </div>
            )}
            <AnimatePresence>
              {tuning && (
                <motion.div
                  className="osd play mono"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▶ play
                </motion.div>
              )}
            </AnimatePresence>
            <div className="scanlines" />
          </div>
          <div className="tv-panel">
            <span className="tv-brand mono">rjvision</span>
            <span className="tv-ch mono">ch {String((current ?? -1) + 1).padStart(2, '0')}</span>
            <span className="knob-dot" />
            <span className="knob-dot" />
          </div>
        </motion.div>

        <div className="shelf-wrap">
          <div className="shelf">
            {MOVIES.map((m, i) => (
              <motion.button
                key={m.yt}
                className={`vhs ${i === current ? 'on' : ''}`}
                style={{ ['--c' as string]: m.color, ['--t' as string]: labelText(m.color) }}
                onClick={() => insert(i)}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
                aria-label={`play ${m.title}: ${m.scene}`}
              >
                <span className="vhs-label">
                  <b>{m.title}</b>
                  <span className="mono">{m.year}</span>
                </span>
              </motion.button>
            ))}
          </div>
          <div className="shelf-board" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current ?? 'none'}
              className="now-showing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {movie ? (
                <>
                  <div className="mono now-k">
                    now showing · {movie.year}
                  </div>
                  <div className="ns-title">
                    {movie.title} <span className="muted">— {movie.scene}</span>
                  </div>
                  <p>{movie.why}</p>
                </>
              ) : (
                <>
                  <div className="mono now-k">tonight's lineup</div>
                  <div className="ns-title">car chases, startups, and one pen.</div>
                  <p className="muted">click any tape on the shelf.</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
