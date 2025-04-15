import { BaseDetector } from '../core/base'
import { majorize, type Result, rgxMapper } from '../util'
import { BrwoserRegxMapper } from './browser'
import { BRWOSER_MAPPER } from './const'

export class BrowserDetector extends BaseDetector<{
  browser: { majorVersion?: string } & Result
  is: {
    edge: boolean
    chrome: boolean
    safari: boolean
    firefox: boolean
    opera: boolean
    IE: boolean
    chromium: boolean
    wechat: boolean
  }
}> {
  constructor(userAgent?: string) {
    super(userAgent)
  }
  detect() {
    this.validate()

    const { browser } = this.detectBrowser()

    return {
      browser: {
        ...browser,
        majorVersion: majorize(browser.version),
      },
      is: {
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
      },
    }
  }

  private detectBrowser(): { browser: Result & { majorVersion?: string } } {
    return {
      browser: rgxMapper(this.userAgent, BrwoserRegxMapper),
    }
  }
}
