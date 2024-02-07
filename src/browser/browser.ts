import { BROWSER, BRWOSER_MAPPER, DEVICE_MAPPER, NAME, VERSION } from '../constants'
import { type RegexMap } from '../type'
import { strMapper } from '../util'

// Safari < 3.0
const oldSafariMap = {
  '1.0': '/8',
  '1.2': '/1',
  '1.3': '/3',
  '2.0': '/412',
  '2.0.2': '/416',
  '2.0.3': '/417',
  '2.0.4': '/419',
  '?': '/',
}

export const BrwoserRegxMapper: RegexMap = [
  [
    /\b(?:crmo|crios)\/([\w\.]+)/i, // Chrome for Android/iOS
  ],
  [VERSION, [NAME, BRWOSER_MAPPER.Chrome]],
  [
    /edg(?:e|ios|a)?\/([\w\.]+)/i, // Microsoft Edge
  ],
  [VERSION, [NAME, BRWOSER_MAPPER.Edge]],
  [
    // Presto based
    /(opera mini)\/([-\w\.]+)/i, // Opera Mini
    /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, // Opera Mobi/Tablet
    /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i, // Opera
  ],
  [NAME, VERSION],
  [
    /opios[\/ ]+([\w\.]+)/i, // Opera mini on iphone >= 8.0
  ],
  [VERSION, [NAME, `${BRWOSER_MAPPER.Opera} Mini`]],
  [
    /\bopr\/([\w\.]+)/i, // Opera Webkit
  ],
  [VERSION, [NAME, BRWOSER_MAPPER.Opera]],
  [
    // Mixed
    /(kindle)\/([\w\.]+)/i, // Kindle
    /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, // Lunascape/Maxthon/Netfront/Jasmine/Blazer
    // Trident based
    /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, // Avant/IEMobile/SlimBrowser
    /(ba?idubrowser)[\/ ]?([\w\.]+)/i, // Baidu Browser
    /(?:ms|\()(ie) ([\w\.]+)/i, // Internet Explorer

    // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
    /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
    // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
    /(heytap|ovi)browser\/([\d\.]+)/i, // Heytap/Ovi
    /(weibo)__([\d\.]+)/i, // Weibo
  ],
  [NAME, VERSION],
  [
    /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i, // UCBrowser
  ],
  [VERSION, [NAME, `UC${BROWSER}`]],
  [
    /microm.+\bqbcore\/([\w\.]+)/i, // WeChat Desktop for Windows Built-in Browser
    /\bqbcore\/([\w\.]+).+microm/i,
  ],
  [VERSION, [NAME, 'WeChat(Win) Desktop']],
  [
    /micromessenger\/([\w\.]+)/i, // WeChat
  ],
  [VERSION, [NAME, BRWOSER_MAPPER.WeChat]],
  [
    /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i, // IE11
  ],
  [VERSION, [NAME, BRWOSER_MAPPER.IE]],
  [
    /ya(?:search)?browser\/([\w\.]+)/i, // Yandex
  ],
  [VERSION, [NAME, 'Yandex']],
  [
    /(avast|avg)\/([\w\.]+)/i, // Avast/AVG Secure Browser
  ],
  [[NAME, /(.+)/, `$1 Secure ${BROWSER}`], VERSION],
  [
    /\bfocus\/([\w\.]+)/i, // Firefox Focus
  ],
  [VERSION, [NAME, `${BRWOSER_MAPPER.Firefox} Focus`]],
  [
    /\bopt\/([\w\.]+)/i, // Opera Touch
  ],
  [VERSION, [NAME, `${BRWOSER_MAPPER.Opera} Touch`]],
  [
    /dolfin\/([\w\.]+)/i, // Dolphin
  ],
  [VERSION, [NAME, 'Dolphin']],
  [
    /miuibrowser\/([\w\.]+)/i, // MIUI Browser
  ],
  [VERSION, [NAME, `MIUI ${BROWSER}`]],
  [
    /fxios\/([-\w\.]+)/i, // Firefox for iOS
  ],
  [VERSION, [NAME, BRWOSER_MAPPER.Firefox]],
  [
    /\bqihu|(qi?ho?o?|360)browser/i, // 360
  ],
  [[NAME, `360 ${BROWSER}`]],
  [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],
  [[NAME, /(.+)/, `$1 ${BROWSER}`], VERSION],
  [
    // Oculus/Samsung/Sailfish/Huawei Browser
    /(comodo_dragon)\/([\w\.]+)/i, // Comodo Dragon
  ],
  [[NAME, /_/g, ' '], VERSION],
  [
    /(electron)\/([\w\.]+) safari/i, // Electron-based App
    /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, // Tesla
    /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i, // QQBrowser/Baidu App/2345 Browser
  ],
  [NAME, VERSION],
  [
    /(metasr)[\/ ]?([\w\.]+)/i, // SouGouBrowser
    /(lbbrowser)/i, // LieBao Browser
    /\[(linkedin)app\]/i, // LinkedIn App for iOS & Android
  ],
  [NAME],
  [
    // WebView
    /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i, // Facebook App for iOS & Android
  ],
  [[NAME, DEVICE_MAPPER.Facebook], VERSION],
  [
    /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, // Kakao App
    /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, // Naver InApp
    /safari (line)\/([\w\.]+)/i, // Line App for iOS
    /\b(line)\/([\w\.]+)\/iab/i, // Line App for Android
    /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i, // Chromium/Instagram/Snapchat
  ],
  [NAME, VERSION],
  [
    /\bgsa\/([\w\.]+) .*safari\//i, // Google Search Appliance on iOS
  ],
  [VERSION, [NAME, 'GSA']],
  [
    /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i, // TikTok
  ],
  [VERSION, [NAME, 'TikTok']],
  [
    /headlesschrome(?:\/([\w\.]+)| )/i, // Chrome Headless
  ],
  [VERSION, [NAME, `${BRWOSER_MAPPER.Chrome} Headless`]],
  [
    / wv\).+(chrome)\/([\w\.]+)/i, // Chrome WebView
  ],
  [[NAME, `${BRWOSER_MAPPER.Chrome} WebView`], VERSION],
  [
    /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i, // Android Browser
  ],
  [VERSION, [NAME, `Android ${BROWSER}`]],
  [
    /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i, // Chrome/OmniWeb/Arora/Tizen/Nokia
  ],
  [NAME, VERSION],
  [
    /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i, // Mobile Safari
  ],
  [VERSION, [NAME, BRWOSER_MAPPER.Mobile_Safari]],
  [
    /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i, // Safari & Safari Mobile
  ],
  [VERSION, NAME],

  [/(AppleWebKit)\/([0-9\.]+).*Mobile/i, /(AppleWebKit)\/([0-9\.]+).*Gecko\)$/i],
  [[NAME, 'ios-webview'], VERSION],
  [
    /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i, // Safari < 3.0
  ],
  [NAME, [VERSION, strMapper, oldSafariMap]],
  [/(webkit|khtml)\/([\w\.]+)/i],
  [NAME, VERSION],
  [
    // Gecko based
    /(navigator|netscape\d?)\/([-\w\.]+)/i, // Netscape
  ],
  [[NAME, 'Netscape'], VERSION],
  [
    /ekiohf.+(flow)\/([\w\.]+)/i, // Flow
    /(swiftfox)/i, // Swiftfox
    /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
    // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
    /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
    // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
    /(firefox)\/([\w\.]+)/i, // Other Firefox-based
    /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, // Mozilla

    // Other
    /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
    // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
    /(links) \(([\w\.]+)/i, // Links
    /panasonic;(viera)/i, // Panasonic Viera
  ],
  [NAME, VERSION],
]
