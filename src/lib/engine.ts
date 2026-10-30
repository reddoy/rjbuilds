import { animate, motionValue } from 'motion/react'

export const REDLINE = 7500
export const MAX_RPM = 9000

export const rpm = motionValue(0)

let cruise = 900
let busyUntil = 0
let wobbleTimer: number | undefined

function busy(ms: number) {
  busyUntil = performance.now() + ms
}

export function setCruise(value: number) {
  cruise = value
}

export function startWobble() {
  if (wobbleTimer) return
  wobbleTimer = window.setInterval(() => {
    if (performance.now() < busyUntil) return
    animate(rpm, cruise + (Math.random() - 0.5) * 120, { duration: 0.25, ease: 'easeInOut' })
  }, 260)
}

/** blip the throttle, like a rev on a downshift */
export function blip(peak = 4200) {
  busy(650)
  animate(rpm, [rpm.get(), peak, cruise], { duration: 0.65, times: [0, 0.3, 1], ease: ['easeOut', 'easeInOut'] })
}

/** pull through a gear: rev high, drop to the new cruise rpm */
export function shiftTo(newCruise: number) {
  cruise = newCruise
  busy(800)
  animate(rpm, [rpm.get(), 6900, newCruise], { duration: 0.8, times: [0, 0.35, 1], ease: ['easeIn', 'easeOut'] })
}

/** the startup gauge sweep: needle to the stop and back to idle */
export function sweep(onRedline?: () => void) {
  busy(1700)
  animate(rpm, [0, MAX_RPM, MAX_RPM, cruise], {
    duration: 1.6,
    times: [0, 0.42, 0.55, 1],
    ease: ['easeIn', 'linear', 'easeOut'],
  })
  if (onRedline) window.setTimeout(onRedline, 0.45 * 1600)
}

/* ---------- synthesized engine sound (opt-in, browsers block autoplay) ---------- */

type Rig = {
  ctx: AudioContext
  gain: GainNode
  filter: BiquadFilterNode
  main: OscillatorNode
  sub: OscillatorNode
}

let rig: Rig | null = null
let soundOn = false
const listeners = new Set<(on: boolean) => void>()

function distortionCurve(amount: number) {
  const n = 256
  const curve = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1
    curve[i] = ((3 + amount) * x * 20 * (Math.PI / 180)) / (Math.PI + amount * Math.abs(x))
  }
  return curve
}

function buildRig(): Rig {
  const ctx = new AudioContext()
  const main = ctx.createOscillator()
  const sub = ctx.createOscillator()
  main.type = 'sawtooth'
  sub.type = 'square'
  const shaper = ctx.createWaveShaper()
  shaper.curve = distortionCurve(40)
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.Q.value = 6
  const gain = ctx.createGain()
  gain.gain.value = 0
  const subGain = ctx.createGain()
  subGain.gain.value = 0.6
  main.connect(shaper)
  sub.connect(subGain).connect(shaper)
  shaper.connect(filter).connect(gain).connect(ctx.destination)
  main.start()
  sub.start()
  rpm.on('change', (r) => {
    if (!rig) return
    const t = rig.ctx.currentTime
    // four-cylinder firing frequency: two pulses per revolution
    const f = Math.max(18, (r / 60) * 2)
    rig.main.frequency.setTargetAtTime(f, t, 0.015)
    rig.sub.frequency.setTargetAtTime(f / 2, t, 0.015)
    rig.filter.frequency.setTargetAtTime(180 + r * 0.32, t, 0.03)
    if (soundOn) rig.gain.gain.setTargetAtTime(0.05 + (r / MAX_RPM) * 0.09, t, 0.05)
  })
  return { ctx, gain, filter, main, sub }
}

export function setSound(on: boolean) {
  soundOn = on
  if (on) {
    rig ??= buildRig()
    void rig.ctx.resume()
    rig.gain.gain.setTargetAtTime(0.06, rig.ctx.currentTime, 0.1)
  } else if (rig) {
    rig.gain.gain.setTargetAtTime(0, rig.ctx.currentTime, 0.08)
  }
  listeners.forEach((fn) => fn(on))
}

export function isSoundOn() {
  return soundOn
}

export function onSoundChange(fn: (on: boolean) => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}
