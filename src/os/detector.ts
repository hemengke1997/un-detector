import { BaseDetector } from '../core/base'
import { type Result, rgxMapper } from '../util'
import { OS_MAPPER } from './const'
import { OsRegexMapper } from './os'

export class OSDetector extends BaseDetector<{
  os: Result
  is: {
    mac: boolean
    windows: boolean
    iOS: boolean
    android: boolean
    winPhone: boolean
    linux: boolean
    harmonyOS: boolean
  }
}> {
  detect() {
    this.validate()

    const { os } = this.detectOS()

    return {
      os: {
        ...os,
      },
      is: {
        mac: os.name === OS_MAPPER.Mac_OS && !this.isIPhone13 && !this.isIPad13 && !this.isIPod13,
        windows: os.name === OS_MAPPER.Windows,
        iOS: os.name === OS_MAPPER.iOS || this.isIPhone13 || this.isIPad13 || this.isIPod13,
        android: os.name === OS_MAPPER.Android,
        winPhone: os.name === OS_MAPPER.Windows_Phone,
        linux: os.name === OS_MAPPER.Linux,
        harmonyOS: os.name === OS_MAPPER.Harmony_OS,
      },
    }
  }

  private detectOS() {
    return {
      os: rgxMapper(this.userAgent, OsRegexMapper),
    }
  }
}
