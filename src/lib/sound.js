let ctx = null
let enabled = true

export function setSoundEnabled(v) {
  enabled = v
}

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone({ freq = 440, type = 'sine', dur = 0.18, gain = 0.1, when = 0, glideTo = null, cutoff = 1800 }) {
  if (!enabled) return
  let c
  try {
    c = ac()
  } catch {
    return
  }
  const t0 = c.currentTime + when
  const osc = c.createOscillator()
  const g = c.createGain()
  const filter = c.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = cutoff
  filter.Q.value = 0.6
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur)
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.014)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(filter)
  filter.connect(g)
  g.connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.06)
}

export const sfx = {
  click() {
    tone({ freq: 520, type: 'triangle', dur: 0.1, gain: 0.09, cutoff: 1400 })
    tone({ freq: 784, type: 'sine', dur: 0.16, gain: 0.06, when: 0.035, cutoff: 2200 })
  },
  tap() {
    tone({ freq: 300, type: 'sine', dur: 0.09, gain: 0.08, cutoff: 900 })
    tone({ freq: 208, type: 'triangle', dur: 0.13, gain: 0.05, when: 0.07, cutoff: 700 })
  },
  remove() {
    tone({ freq: 420, type: 'sine', dur: 0.14, gain: 0.06, glideTo: 250, cutoff: 1200 })
  },
  error() {
    tone({ freq: 196, type: 'triangle', dur: 0.15, gain: 0.07, cutoff: 620 })
    tone({ freq: 147, type: 'sine', dur: 0.18, gain: 0.05, when: 0.05, cutoff: 500 })
  },
  success() {
    tone({ freq: 523.25, type: 'sine', dur: 0.18, gain: 0.09, cutoff: 2200 })
    tone({ freq: 659.25, type: 'sine', dur: 0.18, gain: 0.09, when: 0.11, cutoff: 2400 })
    tone({ freq: 783.99, type: 'sine', dur: 0.26, gain: 0.1, when: 0.22, cutoff: 2600 })
    tone({ freq: 1046.5, type: 'triangle', dur: 0.34, gain: 0.05, when: 0.34, cutoff: 3200 })
  },
}
