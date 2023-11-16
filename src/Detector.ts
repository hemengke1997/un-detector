import { browsers } from './browser'
import { MobilePrefixRegExp, MobileRegExp } from './device'
import { type IsSomeOs, type OperatingSystem, type PopularOsType, os, popularOsTypes } from './os'

export type BrowserDetected = {
  platform?: string
  os?: string
  version?: string
  versionNumber?: number
  isMobile?: boolean
  isLinux?: boolean
} & {
  [key in IsSomeOs]?: boolean
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

        return {
          platform: definition[0],
          version: version?.join('.'),
          versionNumber: Number(`${version?.[0]}.${versionTails}`),
        }
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
            value = match.input.match(/Mac OS X ([0-9_]+)/i)?.[0].replace(/_/g, '.') || ''
            break
          case 'Android OS':
            value = match.input.match(/Android ([0-9.]+)/i)?.[0] || ''
            break
          case 'iOS':
            value = match.input.match(/\w+\sOS ([0-9_]+)/i)?.[0].replace(/_/g, '.') || ''
            break
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

  private findOsType(os: OperatingSystem): IsSomeOs | undefined {
    for (const [k, v] of Object.entries(popularOsTypes)) {
      if (v.includes(os)) {
        return `is${k as PopularOsType}`
      }
    }
  }

  private handleMissingError() {
    throw new Error(`Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`)
  }
}