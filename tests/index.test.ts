import { describe, expect, test } from 'vitest'
import { browser, detect, device, os } from '../src'
import { BRWOSER_MAPPER, DEVICE_MAPPER, MODEL_MAPPER, OS_MAPPER } from '../src/constants'
import { Detector } from '../src/core/Detector'

// https://www.useragents.me/

describe('test method: detect()', () => {
  test('detect  Chrome on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.os.name).to.equal(OS_MAPPER.Windows)
    expect(result.browser.version).to.equal('62.0.3202.94')
    expect(result.browser.majorVersion).to.equal('62')
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Edge on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Edge)
    expect(result.os.name).to.equal(OS_MAPPER.Windows)
    expect(result.browser.version).to.equal('13.10586')
    expect(result.browser.majorVersion).to.equal('13')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Edge on Windows 8.1', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0 (Touch; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; HPNTDFJS; H9P; InfoPath'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Edge)
    expect(result.os.name).to.equal(OS_MAPPER.Windows)
    expect(result.browser.version).to.equal('12.0')
    expect(result.browser.majorVersion).to.equal('12')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Internet Explorer 11.0 on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; Tablet PC 2.0; printmade=3.0.0.7; rv:11.0) like Gecko'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.IE)
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).to.eq('10')
    expect(result.browser.version).to.equal('11.0')
    expect(result.browser.majorVersion).to.equal('11')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isIE(userAgent)).to.true
  })

  test('detect  Internet Explorer 10.6.0 on Windows 7', () => {
    const userAgent =
      'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.IE)
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).toEqual('7')
    expect(result.browser.version).to.equal('10.6')
    expect(result.browser.majorVersion).to.equal('10')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isIE(userAgent)).to.true
  })

  test('detect  Firefox on Windows 10', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Firefox)
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).toEqual('10')
    expect(result.browser.version).to.equal('56.0')
    expect(result.browser.majorVersion).to.equal('56')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Opera on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36 OPR/49.0.2725.47'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Opera)
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).toEqual('10')
    expect(result.browser.version).to.equal('49.0.2725.47')
    expect(result.browser.majorVersion).to.equal('49')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isOpera(userAgent)).to.true
  })

  test('detect  Whale on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Whale/1.0.37.16 Safari/537.36'

    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal('Whale')
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).toEqual('10')
    expect(result.browser.version).to.equal('1.0.37.16')
    expect(result.browser.majorVersion).to.equal('1')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
  })

  test('detect  Edge on Windows 10', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edge/119.0.0.0'

    const result = detect(userAgent)
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Edge)
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).toEqual('10')
    expect(result.browser.version).to.equal('119.0.0.0')
    expect(result.browser.majorVersion).to.equal('119')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Chrome on Windows7', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    const result = detect(userAgent)

    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).toEqual('7')
    expect(result.browser.version).to.equal('41.0.2228.0')
    expect(result.browser.majorVersion).to.equal('41')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Chrome on MacOS', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3205.0 Safari/537.36'
    const result = detect(userAgent)

    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.browser.version).to.equal('63.0.3205.0')
    expect(result.browser.majorVersion).to.equal('63')
    expect(result.os.name === OS_MAPPER.Mac_OS).to.true
    expect(os.isMac(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Edge on MacOS', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61'
    const result = detect(userAgent)

    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Edge)
    expect(result.browser.version).to.equal('118.0.2088.61')
    expect(result.browser.majorVersion).to.equal('118')
    expect(result.os.name).to.equal(OS_MAPPER.Mac_OS)
    expect(result.os.name === OS_MAPPER.Mac_OS).to.true
    expect(os.isMac(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Safari on MacOS', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
    const result = detect(userAgent)

    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Safari)
    expect(result.browser.version).to.equal('17.1')
    expect(result.browser.majorVersion).to.equal('17')
    expect(result.device.model).toEqual('Macintosh')
    expect(result.os.name).to.equal(OS_MAPPER.Mac_OS)
    expect(os.isMac(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  Safari on iPhone 6 (Mobile)', () => {
    const userAgent =
      '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    const result = detect(userAgent)

    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Mobile_Safari)
    expect(result.browser.version).to.equal('9.0')
    expect(result.browser.majorVersion).to.equal('9')
    expect(result.device.model).to.equal('iPhone')
    expect(result.os.name === OS_MAPPER.iOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  crios on iPhone (Mobile)', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.browser.version).to.equal('19.0.1084.60')
    expect(result.browser.majorVersion).to.equal('19')
    expect(result.os.name).toEqual(OS_MAPPER.iOS)
    expect(result.os.version).toEqual('5.1.1')
    expect(result.device.model).to.equal('iPhone')
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Chrome on iPod (Mobile)', () => {
    const userAgent =
      'Mozilla/5.0 (iPod; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/119.0.6045.109 Mobile/15E148 Safari/604.1'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.browser.version).to.equal('119.0.6045.109')
    expect(result.browser.majorVersion).to.equal('119')
    expect(result.os.name).toEqual(OS_MAPPER.iOS)
    expect(result.os.version).to.equal('17.1')
    expect(result.device.model).toEqual(MODEL_MAPPER.iPod)
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Firefox on iPod (Mobile)', () => {
    const userAgent =
      'Mozilla/5.0 (iPod touch; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) FxiOS/119.0 Mobile/15E148 Safari/605.1.15'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Firefox)
    expect(result.os.name).to.equal(OS_MAPPER.iOS)
    expect(result.device.model).to.eq(MODEL_MAPPER.iPod_touch)
    expect(result.browser.version).to.equal('119.0')
    expect(result.browser.majorVersion).to.equal('119')
    expect(result.os.name === OS_MAPPER.iOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Firefox on iPad (Mobile)', () => {
    const userAgent =
      'Mozilla/5.0 (iPad; CPU OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/119.0 Mobile/15E148 Safari/605.1.15'

    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Firefox)
    expect(result.browser.version).to.equal('119.0')
    expect(result.browser.majorVersion).to.equal('119')
    expect(result.os.name).to.equal(OS_MAPPER.iOS)
    expect(result.os.version).to.equal('14.1')
    expect(result.device.model).to.equal(MODEL_MAPPER.iPad)
    expect(result.os.name === OS_MAPPER.iOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Safari on iPad (Mobile)', () => {
    const userAgent =
      'Mozilla/5.0 (iPad; CPU OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Mobile_Safari)
    expect(result.os.name).to.equal(OS_MAPPER.iOS)
    expect(result.os.version).toEqual('17.1')
    expect(result.device.model).toEqual(MODEL_MAPPER.iPad)
    expect(result.browser.version).to.equal('17.1')
    expect(result.browser.majorVersion).to.equal('17')
    expect(result.os.name === OS_MAPPER.iOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  Chrome on Generic Smartphone', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.6045.66 Mobile Safari/537.36'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.os.name).to.equal('Android')
    expect(result.os.version).toEqual('10')
    expect(result.browser.version).to.equal('119.0.6045.66')
    expect(result.browser.majorVersion).to.equal('119')
    expect(result.os.name === OS_MAPPER.Android).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Chrome on Galaxy S5 (Mobile)', () => {
    const userAgent =
      '5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.os.name).to.equal('Android')
    expect(result.os.version).to.eq('5.0')
    expect(result.browser.version).to.equal('62.0.3202.94')
    expect(result.browser.majorVersion).to.equal('62')
    expect(result.os.name === OS_MAPPER.Android).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Chrome on Linux', () => {
    const userAgent =
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.os.name).to.equal('Linux')
    expect(result.browser.version).to.equal('50.0.2661.102')
    expect(result.browser.majorVersion).to.equal('50')
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Firefox on Linux', () => {
    const userAgent = 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0'
    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Firefox)
    expect(result.os.name).to.equal('Fedora')
    expect(result.browser.version).to.equal('46.0')
    expect(result.browser.majorVersion).to.equal('46')
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Firefix on Windows', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'
    const result = detect(userAgent)
    expect(result.is.mobile).to.false
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Firefox)
    expect(result.os.name).to.equal('Windows')
    expect(result.os.version).to.eq('7')
    expect(result.browser.version).to.equal('40.1')
    expect(result.browser.majorVersion).to.equal('40')
    expect(result.os.name === OS_MAPPER.Windows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Firefox on iOS', () => {
    const userAgent =
      'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/3.2 Mobile/12F69 Safari/600.1.4'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Firefox)
    expect(result.os.name).to.equal(OS_MAPPER.iOS)
    expect(result.device.model).to.eq(MODEL_MAPPER.iPad)
    expect(result.os.version).to.eq('8.3')
    expect(result.browser.version).to.equal('3.2')
    expect(result.browser.majorVersion).to.equal('3')
    expect(result.os.name === OS_MAPPER.iOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Webkit on Android', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal('Android Browser')
    expect(result.os.name).to.equal('Android')
    expect(result.os.version).to.eq('4.0.3')
    expect(result.browser.version).to.equal('4.0')
    expect(result.browser.majorVersion).to.equal('4')
    expect(result.os.name === OS_MAPPER.Android).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
  })

  test('detect  iOS WebView on iPad', () => {
    const userAgent =
      'Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile'
    const result = detect(userAgent)

    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal('ios-webview')
    expect(result.os.name).to.equal(OS_MAPPER.iOS)
    expect(result.device.model).to.eq(MODEL_MAPPER.iPad)
    expect(result.browser.version).to.equal('533.17.9')
    expect(result.browser.majorVersion).to.equal('533')
    expect(result.os.name === OS_MAPPER.iOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  edge on iOS', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 EdgiOS/44.2.1 Mobile/16D57 Safari/605.1.15'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Edge)
    expect(result.os.name).to.equal(OS_MAPPER.iOS)
    expect(result.device.model).to.eq(MODEL_MAPPER.iPhone)
    expect(result.os.version).to.eq('12.1.4')
    expect(result.browser.version).to.equal('44.2.1')
    expect(result.browser.majorVersion).to.equal('44')
    expect(result.os.name === OS_MAPPER.iOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Chromium-based WebView On Android', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal('Chrome WebView')
    expect(result.os.name).to.equal(OS_MAPPER.Android)
    expect(result.browser.version).to.equal('43.0.2357.65')
    expect(result.browser.majorVersion).to.equal('43')
    expect(result.os.name === OS_MAPPER.Android).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  miui', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; U; Android 7.0; en-us; MI 5 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.146 Mobile Safari/537.36 XiaoMi/MiuiBrowser/9.0.3'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal('MIUI Browser')
    expect(result.os.name).to.equal('Android')
    expect(result.browser.version).to.equal('9.0.3')
    expect(result.browser.majorVersion).to.equal('9')
    expect(result.os.name === OS_MAPPER.Android).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
  })

  test('detect  bb10', () => {
    const userAgent =
      'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/7.2.0.0 Mobile Safari/537.10+'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Safari)
    expect(result.os.name).to.equal(DEVICE_MAPPER.BlackBerry)
    expect(result.os.version).to.eq('10')
    expect(result.browser.version).to.equal('7.2.0.0')
    expect(result.browser.majorVersion).to.equal('7')
    expect(device.isMobile(userAgent)).to.true
  })

  test('detect  amazon silk', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 5.1.1; KFAUWI) AppleWebKit/537.36 (KHTML, like Gecko) Silk/80.5.3 like Chrome/80.0.3987.162 Safari/537.36'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal('Silk')
    expect(result.os.name).to.equal('Android')
    expect(result.os.version).to.eq('5.1.1')
    expect(result.browser.version).to.equal('80.5.3')
    expect(result.browser.majorVersion).to.equal('80')
    expect(result.os.name === OS_MAPPER.Android).to.true
    expect(device.isMobile(userAgent)).to.true
  })

  test('detect  bot', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    const result = detect(userAgent)
    expect(result.is.mobile).to.true
    expect(result.browser.name).to.equal(BRWOSER_MAPPER.Chrome)
    expect(result.os.name).to.equal(OS_MAPPER.Android)
    expect(result.os.version).to.equal('6.0.1')
    expect(result.browser.version).to.equal('41.0.2272.96')
    expect(result.browser.majorVersion).to.equal('41')
    expect(result.os.name === OS_MAPPER.Android).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })
})

describe('test method: browser()', () => {
  test('should thorw an error in node env', () => {
    const detector = new Detector(undefined, undefined, globalThis.process)
    expect(() => detector.detect()).to.throw(`Only support browser now`)
  })

  test('should throw an error with empty agent, navigator, process', () => {
    const detector = new Detector(undefined, undefined, undefined)
    expect(() => detector.detect()).to.throw(
      `Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`,
    )
  })
})
