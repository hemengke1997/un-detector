import { detect } from '../core'

export const browser = Object.freeze({
  isEdge: (ua?: string) => detect(ua).is.edge,
  isChrome: (ua?: string) => detect(ua).is.chrome,
  isSafari: (ua?: string) => detect(ua).is.safari,
  isFirefox: (ua?: string) => detect(ua).is.firefox,
  isOpera: (ua?: string) => detect(ua).is.opera,
  isIE: (ua?: string) => detect(ua).is.IE,
  isChromium: (ua?: string) => detect(ua).is.chromium,
})

export { BrwoserRegxMapper } from './browser'
