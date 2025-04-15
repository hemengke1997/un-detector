import { OSDetector } from './detector'

function detect(ua?: string) {
  return new OSDetector(ua).detect()
}

export const os = Object.freeze({
  isMac: (ua?: string) => detect(ua).is.mac,
  isWindows: (ua?: string) => detect(ua).is.windows,
  isIOS: (ua?: string) => detect(ua).is.iOS,
  isAndroid: (ua?: string) => detect(ua).is.android,
  isWinPhone: (ua?: string) => detect(ua).is.winPhone,
  isLinux: (ua?: string) => detect(ua).is.linux,
  isHarmonyOS: (ua?: string) => detect(ua).is.harmonyOS,
})
