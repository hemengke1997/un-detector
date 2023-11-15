import { Detector } from './Detector'

const injectableNavigator = typeof window !== 'undefined' ? window.navigator : undefined

const injectableProcess = typeof process !== 'undefined' ? process : undefined

export function detect(userAgent?: string) {
  return new Detector(userAgent, injectableNavigator, injectableProcess).detect()
}
