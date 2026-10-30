import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { GEARS, type GearId } from '../data'
import { isSoundOn, onSoundChange, setSound } from '../lib/engine'
import { Shifter } from './Shifter'
import { Tach } from './Tach'

export function Dash({
  gear,
  onShift,
  onTerminal,
}: {
  gear: GearId
  onShift: (g: GearId) => void
  onTerminal: () => void
}) {
  const [sound, setSoundState] = useState(isSoundOn())
  useEffect(() => onSoundChange(setSoundState), [])
  const info = GEARS.find((g) => g.id === gear)!

  return (
    <motion.nav
      className="dash"
      initial={{ y: 160 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.35 }}
      aria-label="gear navigation"
    >
      <div className="dash-left">
        <Tach size={92} labels={false} />
        <div className="dash-btns">
          <button className={`chip mono ${sound ? 'on' : ''}`} onClick={() => setSound(!sound)}>
            vroom: {sound ? 'on' : 'off'}
          </button>
          <button className="chip mono" onClick={onTerminal} title="or press `">
            &gt;_ terminal
          </button>
        </div>
      </div>

      <Shifter gear={gear} onShift={onShift} />

      <div className="dash-right">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={gear}
            className={`gear-digit ${gear === 'R' ? 'rev' : ''}`}
            initial={{ y: -40, opacity: 0, rotateX: 90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: 40, opacity: 0, rotateX: -90 }}
            transition={{ type: 'spring', stiffness: 400, damping: 26 }}
          >
            {gear === 'N' ? 'n' : gear.toLowerCase()}
          </motion.div>
        </AnimatePresence>
        <div className="gear-meta">
          <div className="gear-name">{info.name}</div>
          <div className="gear-blurb mono">{info.blurb}</div>
        </div>
      </div>
    </motion.nav>
  )
}
