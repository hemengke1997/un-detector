import { injectableNavigator, injectableProcess, isIOS13Check } from '../util'

export abstract class BaseDetector<
  T extends {
    is: {
      [key: string]: boolean
    }
    [key: string]: unknown
  },
> {
  userAgent: string
  navigator?: Navigator
  process?: NodeJS.Process

  constructor(userAgent?: string) {
    this.navigator = injectableNavigator()
    this.process = injectableProcess()
    if (userAgent) {
      this.userAgent = userAgent
    } else if (this.navigator) {
      this.userAgent = navigator?.userAgent || navigator?.vendor || ''
    } else {
      this.userAgent = ''
    }
  }

  abstract detect(): T

  protected validate() {
    if (this.process && !this.userAgent) {
      // Currently we dont support nodejs
      throw new Error('Only support browser now')
    }
    if (!this.userAgent) {
      throw new Error(`Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`)
    }
  }

  protected get isIPad13() {
    return isIOS13Check('iPad')
  }

  protected get isIPhone13() {
    return isIOS13Check('iPhone')
  }

  protected get isIPod13() {
    return isIOS13Check('iPod')
  }
}
