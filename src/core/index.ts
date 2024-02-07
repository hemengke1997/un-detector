import { injectableNavigator, injectableProcess } from '../util'
import { Detector } from './Detector'

export function detect(userAgent?: string) {
  return new Detector(userAgent, injectableNavigator(), injectableProcess()).detect()
}
