import { detect } from '../core'

export const device = Object.freeze({
  isIphone: (ua?: string) => detect(ua).is.iPhone,
  isIpad: (ua?: string) => detect(ua).is.iPad,
  isIpod: (ua?: string) => detect(ua).is.iPod,
  isMobile: (ua?: string) => detect(ua).is.mobile,
  isMobileOnly: (ua?: string) => detect(ua).is.mobileOnly,
  isTablet: (ua?: string) => detect(ua).is.tablet,
})

export { DeviceRegexMapper, MobileRegExp } from './device'
