export type Browser =
  | 'edge'
  | 'edge-ios'
  | 'samsung'
  | 'miui'
  | 'edge-chromium'
  | 'chrome'
  | 'chromium-webview'
  | 'crios'
  | 'firefox'
  | 'fxios'
  | 'opera-mini'
  | 'opera'
  | 'ie'
  | 'safari'
  | 'ios-webview'
  | 'curl'

export const isPopularBrowser = ['isEdge', 'isChrome', 'isSafari', 'isFirefox', 'isOpera', 'isIE'] as const

export type PopularBrowserType = (typeof isPopularBrowser)[number]

export const popularBrowsers: Record<PopularBrowserType, Browser[]> = {
  isEdge: ['edge', 'edge-ios', 'edge-chromium'],
  isChrome: ['chrome', 'crios', 'chromium-webview'],
  isSafari: ['safari', 'ios-webview'],
  isFirefox: ['firefox', 'fxios'],
  isOpera: ['opera', 'opera-mini'],
  isIE: ['ie'],
}

type UserAgentRule = [Browser, RegExp]

export const browsers: UserAgentRule[] = [
  ['edge', /Edge\/([0-9\._]+)/],
  ['edge-ios', /EdgiOS\/([0-9\._]+)/],
  ['samsung', /SamsungBrowser\/([0-9\.]+)/],
  ['miui', /MiuiBrowser\/([0-9\.]+)$/],
  ['edge-chromium', /EdgA?\/([0-9\.]+)/],
  ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
  ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
  ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
  ['fxios', /FxiOS\/([0-9\.]+)/],
  ['opera-mini', /Opera Mini.*Version\/([0-9\.]+)/],
  ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
  ['opera', /OPR\/([0-9\.]+)(:?\s|$)/],
  ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
  ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
  ['ie', /MSIE\s(7\.0)/],
  ['safari', /Version\/([0-9\._]+).*Safari/],
  ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/],
  ['ios-webview', /AppleWebKit\/([0-9\.]+).*Gecko\)$/],
  ['curl', /^curl\/([0-9\.]+)$/],
]
