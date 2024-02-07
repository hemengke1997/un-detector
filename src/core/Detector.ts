import { BrwoserRegxMapper } from '../browser/browser'
import { BRWOSER_MAPPER, DEVICE_TYPE_MAPPER, MODEL_MAPPER, OS_MAPPER } from '../constants'
import { DeviceRegexMapper, MobileRegExp } from '../device/device'
import { OsRegexMapper } from '../os/os'
import { type Result, isIOS13Check, majorize, rgxMapper } from '../util'

export type BrowserDetected = {
  browser: { majorVersion?: string } & Result
  os: Result
  device: { model?: string; vendor?: string } & Result
  is: {
    // device type
    mobile: boolean
    mobileOnly: boolean
    tablet: boolean

    // os
    mac: boolean
    windows: boolean
    iOS: boolean
    android: boolean
    winPhone: boolean
    linux: boolean

    // browser
    edge: boolean
    chrome: boolean
    safari: boolean
    firefox: boolean
    opera: boolean
    IE: boolean
    chromium: boolean
    wechat: boolean

    // device model
    iPhone: boolean
    iPad: boolean
    iPod: boolean
  } & Record<string, boolean>
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
    const { device } = this.detectDevice()

    const { isMobile } = this.detectMobile()

    const getIPad13 = () => isIOS13Check('iPad')
    const getIphone13 = () => isIOS13Check('iPhone')
    const getIPod13 = () => isIOS13Check('iPod')

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
        mobile:
          isMobile ||
          device.type === DEVICE_TYPE_MAPPER.mobile ||
          device.type === DEVICE_TYPE_MAPPER.tablet ||
          getIPad13(),
        mobileOnly: device.type === DEVICE_TYPE_MAPPER.mobile,
        tablet: device.type === DEVICE_TYPE_MAPPER.tablet || getIPad13(),

        // os
        mac: os.name === OS_MAPPER.Mac_OS,
        windows: os.name === OS_MAPPER.Windows,
        iOS: os.name === OS_MAPPER.iOS,
        android: os.name === OS_MAPPER.Android,
        winPhone: os.name === OS_MAPPER.Windows_Phone,
        linux: os.name === OS_MAPPER.Linux,

        // browser
        edge: browser.name === BRWOSER_MAPPER.Edge,
        chrome: browser.name?.includes(BRWOSER_MAPPER.Chrome) || false,
        safari:
          browser.name === BRWOSER_MAPPER.Safari ||
          browser.name === BRWOSER_MAPPER.Mobile_Safari ||
          browser.name?.startsWith('ios') ||
          false,
        firefox: browser.name === BRWOSER_MAPPER.Firefox,
        opera: browser.name === BRWOSER_MAPPER.Opera,
        IE: browser.name === BRWOSER_MAPPER.IE || browser.name === BRWOSER_MAPPER.Internet_Explorer,
        chromium: browser.name === BRWOSER_MAPPER.Chromium,
        wechat: browser.name === BRWOSER_MAPPER.WeChat,

        // device model
        iPhone: device.model === MODEL_MAPPER.iPhone || getIphone13(),
        iPad: device.model === MODEL_MAPPER.iPad || getIPad13(),
        iPod: device.model === MODEL_MAPPER.iPod || getIPod13(),
      },
    }
  }

  private detectBrowser(): { browser: Result & { majorVersion?: string } } {
    return {
      browser: rgxMapper(this.userAgent, BrwoserRegxMapper),
    }
  }

  private detectOS() {
    return {
      os: rgxMapper(this.userAgent, OsRegexMapper),
    }
  }

  private detectDevice(): { device: Result & { model?: string; vendor?: string } } {
    return {
      device: rgxMapper(this.userAgent, DeviceRegexMapper),
    }
  }

  private detectMobile() {
    const mobile = MobileRegExp.test(this.userAgent)
    return { isMobile: mobile }
  }

  private handleMissingError() {
    throw new Error(`Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`)
  }
}
