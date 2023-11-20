import { Detector } from './Detector'
import { IsPopularBrowser } from './browser'
import { IsPopularDevice } from './device'
import { IsPopularOs } from './os'
import { type DetectFn } from './type'

function removeIsAndLowerize(name: string) {
  return name.replace(/^is/, '').toLowerCase()
}

function iife<T extends readonly string[] = any[], U extends T[number] = T[number]>(types: T) {
  return types.reduce(
    (acc, key) => {
      acc[key as U] = (ua?: string) => detect(ua).is[removeIsAndLowerize(key)]
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

export const os = iife(IsPopularOs)

export const browser = iife(IsPopularBrowser)

export const device = iife(IsPopularDevice)
