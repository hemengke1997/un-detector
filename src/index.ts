import { Detector } from './Detector'
import { type IsSomeBrowser, popularBrowsers } from './browser'
import { type IsSomeDevice, popularDevices } from './device'
import { type IsSomeOs, popularOsTypes } from './os'
import { type DetectFn } from './type'

function iife<T extends object = any, U extends keyof T = any>(types: T) {
  return Object.keys(types).reduce(
    (acc, key) => {
      acc[key as U] = (ua?: string) => (detect(ua) as Record<U, boolean>)[key as U] || false
      return acc
    },
    {} as Record<U, DetectFn>,
  )
}

const injectableNavigator = typeof window !== 'undefined' ? window.navigator : undefined

const injectableProcess = typeof process !== 'undefined' ? process : undefined

export function detect(userAgent?: string) {
  return new Detector(userAgent, injectableNavigator, injectableProcess).detect()
}

type OsType = Record<IsSomeOs, DetectFn>
export const os: OsType = iife(popularOsTypes)

type BrowserType = Record<IsSomeBrowser, DetectFn>
export const browser: BrowserType = iife(popularBrowsers)

type DeviceType = Record<IsSomeDevice, DetectFn>
export const device: DeviceType = iife(popularDevices)
