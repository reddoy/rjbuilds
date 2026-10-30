import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { SONGS, type Song } from '../data'
import { setSound } from '../lib/engine'
import { Section, SectionHead, inView } from './SectionHead'

type Track = Song & { preview?: string; art?: string }

export const MUSIC_PLAY = 'rj:music-play'
export const MOVIE_PLAY = 'rj:movie-play'

function useTracks() {
  const [tracks, setTracks] = useState<Track[]>(SONGS)
  useEffect(() => {
    const ids = SONGS.map((s) => s.id).join(',')
    fetch(`https://itunes.apple.com/lookup?id=${ids}&country=us`)
      .then((r) => r.json())
      .then((d: { results: { trackId: number; previewUrl?: string; artworkUrl100?: string }[] }) => {
        const byId = new Map(d.results.map((r) => [r.trackId, r]))
        setTracks(
          SONGS.map((s) => {
            const hit = byId.get(s.id)
            return { ...s, preview: hit?.previewUrl, art: hit?.artworkUrl100?.replace('100x100bb', '600x600bb') }
          }),
        )
      })
      .catch(() => {})
  }, [])
  return tracks
}

function Eq() {
  return (
    <span className="eq" aria-hidden>
      <i />
      <i />
      <i />
    </span>
  )
}

export function Music() {
  const tracks = useTracks()
  const audio = useRef<HTMLAudioElement | null>(null)
  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const current = tracks[idx]

  useEffect(() => {
    const a = new Audio()
    a.preload = 'none'
    audio.current = a
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0)
    const onPause = () => setPlaying(false)
    const onPlay = () => setPlaying(true)
    a.addEventListener('timeupdate', onTime)
    a.addEventListener('pause', onPause)
    a.addEventListener('play', onPlay)
    const stop = () => a.pause()
    window.addEventListener(MOVIE_PLAY, stop)
    return () => {
      a.pause()
      window.removeEventListener(MOVIE_PLAY, stop)
    }
  }, [])

  useEffect(() => {
    const a = audio.current
    if (!a) return
    const onEnded = () => play((idx + 1) % tracks.length)
    a.addEventListener('ended', onEnded)
    return () => a.removeEventListener('ended', onEnded)
  })

  const play = (i: number) => {
    const a = audio.current
    const t = tracks[i]
    if (!a || !t.preview) return
    if (i === idx && a.src === t.preview) {
      if (a.paused) void a.play()
      else a.pause()
      return
    }
    setIdx(i)
    setProgress(0)
    a.src = t.preview
    void a.play()
    setSound(false)
    window.dispatchEvent(new Event(MUSIC_PLAY))
  }

  return (
    <Section id="music" className="music">
      <SectionHead gear="4" title="music" sub="on rotation. click a record. 30-second previews, courtesy of apple." />

      <div className="music-grid">
        <motion.div
          className="deck"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <div className="turntable">
            <div className="platter">
              <div className={`vinyl ${playing ? 'spin' : ''}`}>
                <div
                  className="vinyl-label"
                  style={current.art ? { backgroundImage: `url(${current.art})` } : undefined}
                />
              </div>
            </div>
            <div className={`tonearm ${playing ? 'on' : ''}`}>
              <span className="tonearm-head" />
            </div>
            <div className="tt-brand mono">rj-1200 · 33⅓</div>
          </div>

          <div className="now">
            <div className="now-k mono">{playing ? <><Eq /> now spinning</> : 'ready to spin'}</div>
            <div className="now-title">{current.title}</div>
            <div className="now-artist">{current.artist}</div>
            <div className="now-note mono">“{current.note}”</div>
            <div className="now-bar">
              <span style={{ transform: `scaleX(${progress})` }} />
            </div>
            <div className="now-ctrls">
              <button className="ctrl mono" onClick={() => play((idx - 1 + tracks.length) % tracks.length)} aria-label="previous">
                ◀◀
              </button>
              <button className="ctrl play mono" onClick={() => play(idx)} disabled={!current.preview} aria-label={playing ? 'pause' : 'play'}>
                {playing ? '❚❚' : '▶'}
              </button>
              <button className="ctrl mono" onClick={() => play((idx + 1) % tracks.length)} aria-label="next">
                ▶▶
              </button>
            </div>
          </div>
        </motion.div>

        <div className="crate">
          {tracks.map((t, i) => (
            <motion.button
              key={t.id}
              className={`record ${i === idx ? 'on' : ''}`}
              onClick={() => play(i)}
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 4 : -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={inView}
              transition={{ delay: 0.1 + i * 0.05, type: 'spring', stiffness: 200, damping: 18 }}
              whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
            >
              <span className="record-art" style={t.art ? { backgroundImage: `url(${t.art})` } : undefined}>
                {!t.art && <span className="mono">{t.title}</span>}
                {i === idx && playing && (
                  <span className="record-playing">
                    <Eq />
                  </span>
                )}
              </span>
              <span className="record-title">{t.title}</span>
              <span className="record-artist mono">{t.artist}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </Section>
  )
}
