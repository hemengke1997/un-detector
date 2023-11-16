import { cloneDeep } from '@minko-fe/lodash-pro'
import { describe, expect, test } from 'vitest'
import { browser, detect, device, os } from '../src'
import { Detector } from '../src/Detector'

describe('test method: detect()', () => {
  test('detect  Chrome on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('chrome')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('62.0.3202')
    expect(result.versionNumber).to.equal(62.03202)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Edge on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('edge')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('13.10586.0')
    expect(result.versionNumber).to.equal(13.10586)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Edge on Windows 8.1', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0 (Touch; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; HPNTDFJS; H9P; InfoPath'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('edge')
    expect(result.os).to.equal('Windows 8.1')
    expect(result.version).to.equal('12.0.0')
    expect(result.versionNumber).to.equal(12)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Internet Explorer 11.0 on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; Tablet PC 2.0; printmade=3.0.0.7; rv:11.0) like Gecko'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('ie')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('11.0.0')
    expect(result.versionNumber).to.equal(11)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isIE(userAgent)).to.true
  })

  test('detect  Internet Explorer 10.6.0 on Windows 7', () => {
    const userAgent =
      'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('ie')
    expect(result.os).to.equal('Windows 7')
    expect(result.version).to.equal('10.6.0')
    expect(result.versionNumber).to.equal(10.6)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isIE(userAgent)).to.true
  })

  test('detect  Firefox on Windows 10', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('firefox')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('56.0.0')
    expect(result.versionNumber).to.equal(56)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Opera on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36 OPR/49.0.2725.47'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('opera')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('49.0.2725')
    expect(result.versionNumber).to.equal(49.02725)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isOpera(userAgent)).to.true
  })

  test('detect  Whale on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Whale/1.0.37.16 Safari/537.36'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('chrome')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('60.0.3112')
    expect(result.versionNumber).to.equal(60.03112)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('should return valie result with agent  Edge on Windows 10', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edge/119.0.0.0'

    const result = detect(userAgent)
    expect(result.platform).to.equal('edge')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('119.0.0')
    expect(result.versionNumber).to.equal(119)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Chrome on Windows7', () => {
    const userAgent =
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('chrome')
    expect(result.os).to.equal('Windows 7')
    expect(result.version).to.equal('41.0.2228')
    expect(result.versionNumber).to.equal(41.02228)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Chrome on MacOS', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3205.0 Safari/537.36'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('chrome')
    expect(result.os).to.equal('Mac OS X 10.11.6')
    expect(result.version).to.equal('63.0.3205')
    expect(result.versionNumber).to.equal(63.03205)
    expect(result.isMac).to.true
    expect(os.isMac(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Edge on MacOS', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.2088.61'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('edge-chromium')
    expect(result.os).to.equal('Mac OS X 10.15.7')
    expect(result.version).to.equal('118.0.2088')
    expect(result.versionNumber).to.equal(118.02088)
    expect(result.isMac).to.true
    expect(os.isMac(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Safari on MacOS', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('safari')
    expect(result.os).to.equal('Mac OS X 10.15.7')
    expect(result.version).to.equal('17.1.0')
    expect(result.versionNumber).to.equal(17.1)
    expect(result.isMac).to.true
    expect(os.isMac(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  Safari on iPhone 6 (Mobile)', () => {
    const userAgent =
      '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    const result = detect(userAgent)

    expect(result.isMobile).to.true
    expect(result.platform).to.equal('safari')
    expect(result.os).to.equal('iPhone OS 9.1')
    expect(result.version).to.equal('9.0.0')
    expect(result.versionNumber).to.equal(9)
    expect(result.isIOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  crios on iPhone (Mobile)', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('crios')
    expect(result.os).to.equal('iPhone OS 5.1.1')
    expect(result.version).to.equal('19.0.1084')
    expect(result.versionNumber).to.equal(19.01084)
    expect(result.isIOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Chrome on Galaxy S5 (Mobile)', () => {
    const userAgent =
      '5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('chrome')
    expect(result.os).to.equal('Android 5.0')
    expect(result.version).to.equal('62.0.3202')
    expect(result.versionNumber).to.equal(62.03202)
    expect(result.isAndroid).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Chrome on Linux', () => {
    const userAgent =
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('chrome')
    expect(result.os).to.equal('Linux')
    expect(result.version).to.equal('50.0.2661')
    expect(result.versionNumber).to.equal(50.02661)
    expect(result.isLinux).to.true
    expect(os.isLinux(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  Firefox on Linux', () => {
    const userAgent = 'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('firefox')
    expect(result.os).to.equal('Linux')
    expect(result.version).to.equal('46.0.0')
    expect(result.versionNumber).to.equal(46)
    expect(result.isLinux).to.true
    expect(os.isLinux(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Firefix on Windows', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'
    const result = detect(userAgent)
    expect(result.isMobile).to.false
    expect(result.platform).to.equal('firefox')
    expect(result.os).to.equal('Windows 7')
    expect(result.version).to.equal('40.1.0')
    expect(result.versionNumber).to.equal(40.1)
    expect(result.isWindows).to.true
    expect(os.isWindows(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.false
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Firefox on iOS', () => {
    const userAgent =
      'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/3.2 Mobile/12F69 Safari/600.1.4'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('fxios')
    expect(result.os).to.equal('iPhone OS 8.3')
    expect(result.version).to.equal('3.2.0')
    expect(result.versionNumber).to.equal(3.2)
    expect(result.isIOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isFirefox(userAgent)).to.true
  })

  test('detect  Webkit on Android', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('safari')
    expect(result.os).to.equal('Android 4.0.3')
    expect(result.version).to.equal('4.0.0')
    expect(result.versionNumber).to.equal(4)
    expect(result.isAndroid).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  iOS WebView on iOS', () => {
    const userAgent =
      'User-Agent: Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('ios-webview')
    expect(result.os).to.equal('CPU OS 4.3.2')
    expect(result.version).to.equal('533.17.9')
    expect(result.versionNumber).to.equal(533.179)
    expect(result.isIOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isSafari(userAgent)).to.true
  })

  test('detect  edge on iOS', () => {
    const userAgent =
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 EdgiOS/44.2.1 Mobile/16D57 Safari/605.1.15'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('edge-ios')
    expect(result.os).to.equal('iPhone OS 12.1.4')
    expect(result.version).to.equal('44.2.1')
    expect(result.versionNumber).to.equal(44.21)
    expect(result.isIOS).to.true
    expect(os.isIOS(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isEdge(userAgent)).to.true
  })

  test('detect  Chromium-based WebView On Android', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('chromium-webview')
    expect(result.os).to.equal('Android 5.1.1')
    expect(result.version).to.equal('43.0.2357')
    expect(result.versionNumber).to.equal(43.02357)
    expect(result.isAndroid).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })

  test('detect  bot', () => {
    const userAgent =
      'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    const result = detect(userAgent)
    expect(result.isMobile).to.true
    expect(result.platform).to.equal('chrome')
    expect(result.os).to.equal('Android 6.0.1')
    expect(result.version).to.equal('41.0.2272')
    expect(result.versionNumber).to.equal(41.02272)
    expect(result.isAndroid).to.true
    expect(os.isAndroid(userAgent)).to.true
    expect(device.isMobile(userAgent)).to.true
    expect(browser.isChrome(userAgent)).to.true
  })
})

describe('test method: browser()', () => {
  test('should return node result with empty agent', () => {
    const fakeProcess = cloneDeep<NodeJS.Process>(process)

    // @ts-expect-error
    fakeProcess.version = 'v1.0.0'
    // @ts-expect-error
    fakeProcess.platform = 'darwin'

    const detector = new Detector(undefined, undefined, fakeProcess)
    const result = detector.detect()

    expect(result.isMobile).to.false
    expect(result.platform).to.equal('node')
    expect(result.os).to.equal('darwin')
    expect(result.version).to.equal('1.0.0')
    expect(result.versionNumber).to.equal(1)
  })

  test('should throw an error with empty agent, navigator, process', () => {
    const detector = new Detector(undefined, undefined, undefined)
    expect(() => detector.detect()).to.throw(
      `Please pass user-agent.\n> browser(navigator.userAgent or headers['user-agent']).`,
    )
  })
})
