import { Detector } from './Detector'
import { isPopularBrowser } from './browser'
import { isPopularDevice } from './device'
import { isPopularOs } from './os'
import { type DetectFn } from './type'

function iife<T extends readonly string[] = any[], U extends T[number] = T[number]>(types: T) {
  return types.reduce(
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

export const os = iife(isPopularOs)

export const browser = iife(isPopularBrowser)

export const device = iife(isPopularDevice)
