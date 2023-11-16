import { type Browser, type PopularBrowserType, browsers, popularBrowsers } from './browser'
import { MobilePrefixRegExp, MobileRegExp, type PopularDeviceType } from './device'
import { type OperatingSystem, type PopularOsType, os, popularOsTypes } from './os'

export type BrowserDetected = {
  platform?: string
  os?: string
  version?: string
  versionNumber?: number
  isLinux?: boolean
} & {
  [key in PopularBrowserType]?: boolean
} & {
  [key in PopularDeviceType]?: boolean
} & {
  [key in PopularOsType]?: boolean
}

export class Detector {
  private userAgent: string

  private defaultOs = {
    isAndroid: false,
    isIOS: false,
    isMac: false,
    isWindows: false,
  }

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
      // node env
      const version = this.process.version.slice(1).split('.').slice(0, 3)
      const versionTail = version.slice(1).join('') || '0'

      return {
        ...this.defaultOs,
        platform: this.process.release.name,
        version: version.join('.'),
        versionNumber: Number.parseFloat(`${version[0]}.${versionTail}`),
        isMobile: false,
        os: this.process.platform,
        isWindows: /^win/i.test(this.process.platform),
        isMac: /^darwin/i.test(this.process.platform),
        isLinux: /^linux/i.test(this.process.platform),
      }
    }
    if (!this.userAgent) {
      this.handleMissingError()
    }

    // browser env
    return {
      ...this.defaultOs,
      ...this.detectBrowser(),
      ...this.detectOS(),
      ...this.detectMobile(),
    }
  }

  private detectBrowser() {
    return browsers
      .filter((definition) => definition[1].test(this.userAgent))
      .map((definition) => {
        const match = definition[1].exec(this.userAgent)
        const version: Array<string | string[]> = (match && match[1].split(/[._]/).slice(0, 3)) || []
        const versionTails = version?.slice(1).join('') || '0'

        if (version && version.length < 3) {
          version.push(version.length === 1 ? ['0', '0'] : ['0'])
        }

        let detected: BrowserDetected = {}

        const browserType = this.findBrowserType(definition[0])
        if (browserType) {
          detected[browserType] = true
        }

        detected = {
          ...detected,
          platform: definition[0],
          version: version?.join('.'),
          versionNumber: Number(`${version?.[0]}.${versionTails}`),
        }

        return detected
      })
      .shift()
  }

  private detectOS() {
    for (let i = 0; i < os.length; i++) {
      const [_os, regex] = os[i]
      const match = regex.exec(this.userAgent)
      let value: string = _os

      const detected: BrowserDetected = {}
      if (match) {
        const osType = this.findOsType(_os)

        switch (_os) {
          case 'Mac OS':
            value = this.userAgent.match(/Mac OS X ([0-9_]+)/i)?.[0].replace(/_/g, '.') || ''
            break
          case 'Android OS':
            value = this.userAgent.match(/Android ([0-9.]+)/i)?.[0] || ''
            break
          case 'iOS': {
            value = this.userAgent.match(/([0-9_]+)(?= like Mac OS X)/i)?.[0].replace(/_/g, '.') || ''
            let iosRegex = os.find(([_os]) => _os === 'iOS')![1]
            if (iosRegex) {
              iosRegex = new RegExp(`${iosRegex.source}(\\s?\\w+)?(?=;)`, 'i')
              value = (`${iosRegex.exec(this.userAgent)?.[0]} ` || '') + value
            }
            break
          }
          case 'Linux':
            detected.isLinux = true
            break
          default:
            break
        }

        detected.os = value

        if (osType) {
          detected[osType] = true
        }

        return detected
      }
    }
    return null
  }

  private detectMobile() {
    const agentPrefix = this.userAgent.substring(0, 4)
    const mobile = MobileRegExp.test(this.userAgent) || MobilePrefixRegExp.test(agentPrefix)
    return { isMobile: mobile }
  }

  private findOsType(os: OperatingSystem): PopularOsType | undefined {
    for (const [k, v] of Object.entries(popularOsTypes)) {
      if (v.includes(os)) {
        return k as PopularOsType
      }
    }
  }

  private findBrowserType(browser: Browser): PopularBrowserType | undefined {
    for (const [k, v] of Object.entries(popularBrowsers)) {
      if (v.includes(browser)) {
        return k as PopularBrowserType
      }
    }
  }

  private handleMissingError() {
    throw new Error(`Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`)
  }
}
