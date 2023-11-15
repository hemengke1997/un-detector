import { cloneDeep } from '@minko-fe/lodash-pro'
import { describe, expect, test } from 'vitest'
import { detect } from '../src'
import { Detector } from '../src/Detector'

describe('test method: detect()', () => {
  test('should return valid result with agent  Chrome on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' + 'Chrome/62.0.3202.94 Safari/537.36'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.name).to.equal('chrome')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('62.0.3202')
    expect(result.versionNumber).to.equal(62.03202)
    expect(result.isWindows).to.true
  })

  test('should return valid result with agent  Edge on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.name).to.equal('edge')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('13.10586.0')
    expect(result.versionNumber).to.equal(13.10586)
    expect(result.isWindows).to.true
  })

  test('should return valid result with agent  Internet Explorer 11.0 on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; ' +
      '.NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; ' +
      'Tablet PC 2.0; printmade=3.0.0.7; rv:11.0) like Gecko'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.name).to.equal('ie')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('11.0.0')
    expect(result.versionNumber).to.equal(11)
    expect(result.isWindows).to.true
  })

  test('should return valid result with agent  Firefox on Windows 10', () => {
    const userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:56.0) Gecko/20100101 Firefox/56.0'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.name).to.equal('firefox')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('56.0.0')
    expect(result.versionNumber).to.equal(56)
    expect(result.isWindows).to.true
  })

  test('should return valid result with agent  Opera on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)' +
      ' Chrome/62.0.3202.89 Safari/537.36 OPR/49.0.2725.47'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.name).to.equal('opera')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('49.0.2725')
    expect(result.versionNumber).to.equal(49.02725)
    expect(result.isWindows).to.true
  })

  test('should return valid result with agent  Whale on Windows 10', () => {
    const userAgent =
      '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/60.0.3112.113 Whale/1.0.37.16 Safari/537.36'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.name).to.equal('chrome')
    expect(result.os).to.equal('Windows 10')
    expect(result.version).to.equal('60.0.3112')
    expect(result.versionNumber).to.equal(60.03112)
    expect(result.isWindows).to.true
  })

  test('should return valid result with agent  Chrome on MacOS', () => {
    const userAgent =
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3205.0 Safari/537.36'
    const result = detect(userAgent)

    expect(result.isMobile).to.false
    expect(result.name).to.equal('chrome')
    expect(result.os).to.equal('OS X 10.11.6')
    expect(result.version).to.equal('63.0.3205')
    expect(result.versionNumber).to.equal(63.03205)
    expect(result.isMac).to.true
  })

  test('should return valid result with agent  Safari on iPhone 6 (Mobile)', () => {
    const userAgent =
      '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 ' +
      '(KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    const result = detect(userAgent)

    expect(result.isMobile).to.true
    expect(result.name).to.equal('safari')
    expect(result.os).to.equal('iPhone')
    expect(result.version).to.equal('9.0.0')
    expect(result.versionNumber).to.equal(9)
    expect(result.isIOS).to.true
  })

  test('should return valid result with agent  Chrome on Galaxy S5 (Mobile)', () => {
    const userAgent =
      '5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Mobile Safari/537.36'
    const result = detect(userAgent)

    expect(result.isMobile).to.true
    expect(result.name).to.equal('chrome')
    expect(result.os).to.equal('Android 5.0')
    expect(result.version).to.equal('62.0.3202')
    expect(result.versionNumber).to.equal(62.03202)
    expect(result.isAndroid).to.true
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
    expect(result.name).to.equal('node')
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
