// Preset rate limits used across the app
export const presets = {
  strictLimiter: { capacity: 10, windowSec: 60 },
  authLimiter: { capacity: 5, windowSec: 60 },
  uploadLimiter: { capacity: 20, windowSec: 60 * 10 },
  webhookLimiter: { capacity: 60, windowSec: 60 },
  contactLimiter: { capacity: 3, windowSec: 60 }
}

export default presets
