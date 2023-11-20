import { BrwoserRegxMapper } from './browser'
import { BRWOSER_MAPPER, OS_MAPPER } from './constants'
import { DeviceRegexMapper, MobileRegExp } from './device'
import { OsRegexMapper } from './os'
import { type Result, majorize, rgxMapper } from './util'

export type BrowserDetected = {
  browser: { majorVersion?: string } & Result
  os: Result
  device: { model?: string; vendor?: string } & Result
  is: {
    mobile: boolean
    mac: boolean
    windows: boolean
    ios: boolean
    android: boolean
  } & { [key in string]: any }
}

export class Detector {
  private userAgent: string

  constructor(
    userAgent?: string,
    private navigator?: Navigator,
    private process?: NodeJS.Process,
  ) {
    if (userAgent) {
      this.userAgent = userAgent
    } else if (this.navigator) {
      this.userAgent = navigator?.userAgent || navigator?.vendor || ''
    } else {
      this.userAgent = ''
    }
  }

  public detect(): BrowserDetected {
    if (this.process && !this.userAgent) {
      // Currently we dont support nodejs
      throw new Error('Only support browser now')
    }
    if (!this.userAgent) {
      this.handleMissingError()
    }

    // browser env
    const { browser } = this.detectBrowser()
    const { os } = this.detectOS()
    const { isMobile } = this.detectMobile()
    const { device } = this.detectDevice()

    return {
      os: {
        ...os,
      },
      browser: {
        ...browser,
        majorVersion: majorize(browser.version),
      },
      device: {
        ...device,
      },
      is: {
        // device type
        mobile: isMobile,

        // os
        mac: os.name === OS_MAPPER.Mac_OS,
        windows: os.name === OS_MAPPER.Windows,
        ios: os.name === OS_MAPPER.iOS,
        android: os.name === OS_MAPPER.Android,
        // linux: os.name, TODO

        // browser
        edge: browser.name === BRWOSER_MAPPER.Edge,
        chrome: browser.name?.includes(BRWOSER_MAPPER.Chrome),
        safari: browser.name === BRWOSER_MAPPER.Safari || browser.name?.startsWith('ios'),
        firefox: browser.name === BRWOSER_MAPPER.Firefox,
        opera: browser.name === BRWOSER_MAPPER.Opera,
        ie: browser.name === BRWOSER_MAPPER.IE,

        // device model
      },
    }
  }

  private detectBrowser() {
    return {
      browser: rgxMapper(this.userAgent, BrwoserRegxMapper),
    }
  }

  private detectOS() {
    return {
      os: rgxMapper(this.userAgent, OsRegexMapper),
    }
  }

  private detectMobile() {
    const mobile = MobileRegExp.test(this.userAgent)
    return { isMobile: mobile }
  }

  private detectDevice() {
    return {
      device: rgxMapper(this.userAgent, DeviceRegexMapper),
    }
  }

  private handleMissingError() {
    throw new Error(`Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`)
  }
}
