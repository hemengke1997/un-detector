import { BrowserDetector } from '../browser/detector'
import { DeviceDetector } from '../device/detector'
import { OSDetector } from '../os/detector'

export function detect(userAgent?: string) {
  const browser = new BrowserDetector(userAgent).detect()
  const device = new DeviceDetector(userAgent).detect()
  const os = new OSDetector(userAgent).detect()

  return {
    ...browser,
    ...device,
    ...os,
    is: {
      ...browser.is,
      ...device.is,
      ...os.is,
    },
  }
}
