import { Detector } from './Detector'
import { iife } from './util'

const injectableNavigator = typeof window !== 'undefined' ? window.navigator : undefined

const injectableProcess = typeof process !== 'undefined' ? process : undefined

export function detect(userAgent?: string) {
  return new Detector(userAgent, injectableNavigator, injectableProcess).detect()
}

export const os = iife(['mac', 'windows', 'iOS', 'android', 'winPhone', 'linux'] as const)

export const browser = iife(['edge', 'chrome', 'safari', 'firefox', 'opera', 'IE', 'chromium'] as const)

export const device = iife(['iphone', 'ipad', 'ipod', 'mobile', 'mobileOnly', 'tablet'] as const)
