import { Detector } from './Detector'
import { iife, injectableNavigator, injectableProcess } from './util'

export function detect(userAgent?: string) {
  return new Detector(userAgent, injectableNavigator(), injectableProcess()).detect()
}

export const os = iife(['mac', 'windows', 'iOS', 'android', 'winPhone', 'linux'] as const)

export const browser = iife(['edge', 'chrome', 'safari', 'firefox', 'opera', 'IE', 'chromium'] as const)

export const device = iife(['iphone', 'ipad', 'ipod', 'mobile', 'mobileOnly', 'tablet'] as const)
