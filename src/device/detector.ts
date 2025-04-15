import { BaseDetector } from '../core/base'
import { type Result, rgxMapper } from '../util'
import { DEVICE_TYPE_MAPPER, MODEL_MAPPER } from './const'
import { DeviceRegexMapper, MobileRegExp } from './device'

export class DeviceDetector extends BaseDetector<{
  device: { model?: string; vendor?: string } & Result
  is: {
    mobile: boolean
    mobileOnly: boolean
    tablet: boolean
  }
}> {
  detect() {
    this.validate()

    const { device } = this.detectDevice()

    const { isMobile } = this.detectMobile()

    return {
      device: {
        ...device,
      },
      is: {
        mobile:
          isMobile ||
          device.type === DEVICE_TYPE_MAPPER.mobile ||
          device.type === DEVICE_TYPE_MAPPER.tablet ||
          this.isIPad13,
        mobileOnly: device.type === DEVICE_TYPE_MAPPER.mobile,
        tablet: device.type === DEVICE_TYPE_MAPPER.tablet || this.isIPad13,
        iPhone: device.model === MODEL_MAPPER.iPhone || this.isIPhone13,
        iPad: device.model === MODEL_MAPPER.iPad || this.isIPad13,
        iPod: device.model === MODEL_MAPPER.iPod || this.isIPod13,
      },
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
}
