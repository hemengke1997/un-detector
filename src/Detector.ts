import { browsers } from './browser'
import { MobilePrefixRegExp, MobileRegExp } from './device'
import { type IsSomeOs, Os, OsVersions, PopularOsTypes } from './os'

export type BrowserDetected = {
  name?: string
  version?: string
  versionNumber?: number
  isMobile?: boolean
  os?: string
} & {
  [key in IsSomeOs]: boolean
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
        name: this.process.release.name,
        version: version.join('.'),
        versionNumber: Number.parseFloat(`${version[0]}.${versionTail}`),
        isMobile: false,
        os: this.process.platform,
        isWindows: /^win/i.test(this.process.platform),
        isMac: /^darwin/i.test(this.process.platform),
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
      .filter((definition) => (<RegExp>definition[1]).test(this.userAgent))
      .map((definition) => {
        const match = (<RegExp>definition[1]).exec(this.userAgent)
        const version = match && match[1].split(/[._]/).slice(0, 3)
        const versionTails = Array.prototype.slice.call(version, 1).join('') || '0'

        if (version && version.length < 3) Array.prototype.push.apply(version, version.length === 1 ? [0, 0] : [0])

        return {
          name: String(definition[0]),
          version: version?.join('.'),
          versionNumber: Number(`${version?.[0]}.${versionTails}`),
        }
      })
      .shift()
  }

  private detectOS() {
    return Os.map((os) => {
      return {
        pattern: os,
        value: RegExp(`\\b${os.replace(/([ -])(?!$)/g, '$1?')}(?:x?[\\d._]+|[ \\w.]*)`, 'i').exec(this.userAgent),
      }
    })
      .filter((os) => os.value)
      .map((os) => {
        let value = os.value?.[0] || ''
        let osSuffix: string

        if (os.pattern && /^Win/i.test(value) && !/^Windows Phone /i.test(value)) {
          osSuffix = OsVersions[value.replace(/[^\d.]/g, '')]
          value = `Windows ${osSuffix}`
        }

        value = value
          .replace(/ ce$/i, ' CE')
          .replace(/\bhpw/i, 'web')
          .replace(/\bMacintosh\b/, 'Mac OS')
          .replace(/_PowerPC\b/i, ' OS')
          .replace(/\b(OS X) [^ \d]+/i, '$1')
          .replace(/\bMac (OS X)\b/, '$1')
          .replace(/\/(\d)/, ' $1')
          .replace(/_/g, '.')
          .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
          .replace(/\bx86\.64\b/gi, 'x86_64')
          .replace(/\b(Windows Phone) OS\b/, '$1')
          .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
          .split(' on ')[0]
          .trim()

        value = /^(?:webOS|i(?:OS|P))/.test(value) ? value : value.charAt(0).toUpperCase() + value.slice(1)

        const osType = this.findOsType(os.pattern)

        if (osType) {
          return { os: value, [osType]: true }
        }
        return { os: value }
      })
      .shift()
  }

  private detectMobile() {
    const agentPrefix = this.userAgent.substring(0, 4)
    const mobile = MobileRegExp.test(this.userAgent) || MobilePrefixRegExp.test(agentPrefix)
    return { isMobile: mobile }
  }

  private findOsType(os: string) {
    for (const [k, v] of Object.entries(PopularOsTypes)) {
      if (v.includes(os)) {
        return `is${k}`
      }
    }
  }

  private handleMissingError() {
    throw new Error(`Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`)
  }
}
