import { presets } from './presets.js'

export function presetToParams(presetName){
  const p = presets[presetName]
  if(!p) return null
  return { capacity: p.capacity, windowSec: p.windowSec, refillPerSec: p.capacity / p.windowSec }
}
