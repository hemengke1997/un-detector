import { BRWOSER_MAPPER, DEVICE_MAPPER, NAME, OS_MAPPER, VERSION } from '../constants'
import { type RegexMap } from '../type'
import { strMapper } from '../util'

const windowsVersionMap: Record<string, string | string[]> = {
  'ME': '4.90',
  'NT 3.11': 'NT3.51',
  'NT 4.0': 'NT4.0',
  '2000': 'NT 5.0',
  'XP': ['NT 5.1', 'NT 5.2'],
  'Vista': 'NT 6.0',
  '7': 'NT 6.1',
  '8': 'NT 6.2',
  '8.1': 'NT 6.3',
  '10': ['NT 6.4', 'NT 10.0'],
  'RT': 'ARM',
}

export const OsRegexMapper: RegexMap = [
  [
    // Windows
    /microsoft (windows) (vista|xp)/i, // Windows (iTunes)
  ],
  [NAME, VERSION],
  [
    /(windows) nt 6\.2; (arm)/i, // Windows RT
    /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, // Windows Phone
    /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,
  ],
  [NAME, [VERSION, strMapper, windowsVersionMap]],
  [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
  [
    [NAME, OS_MAPPER.Windows],
    [VERSION, strMapper, windowsVersionMap],
  ],
  [
    // iOS/macOS
    /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, // iOS
    /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
    /cfnetwork\/.+darwin/i,
  ],
  [
    [VERSION, /_/g, '.'],
    [NAME, OS_MAPPER.iOS],
  ],
  [
    /(mac os x) ?([\w\. ]*)/i,
    /(macintosh|mac_powerpc\b)(?!.+haiku)/i, // Mac OS
  ],
  [
    [NAME, OS_MAPPER.Mac_OS],
    [VERSION, /_/g, '.'],
  ],
  [
    // Mobile OSes
    /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i, // Android-x86/HarmonyOS
  ],
  [VERSION, NAME],
  [
    /(OpenHarmony)([\w\.]+)/i, // HarmonyOS
  ],
  [[NAME, OS_MAPPER.Harmony_OS], VERSION],
  [
    // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
    /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
    /(blackberry)\w*\/([\w\.]*)/i, // Blackberry
    /(tizen|kaios)[\/ ]([\w\.]+)/i, // Tizen/KaiOS
    /\((series40);/i, // Series 40
  ],
  [NAME, VERSION],
  [
    /\(bb(10);/i, // BlackBerry 10
  ],
  [VERSION, [NAME, DEVICE_MAPPER.BlackBerry]],
  [
    /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i, // Firefox OS
  ],
  [VERSION, [NAME, `${BRWOSER_MAPPER.Firefox} OS`]],
  [
    /web0s;.+rt(tv)/i,
    /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i, // WebOS
  ],
  [VERSION, [NAME, 'webOS']],
  [
    /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i, // watchOS
  ],
  [VERSION, [NAME, 'watchOS']],
  [
    /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i, // Chromium OS
  ],
  [[NAME, OS_MAPPER.Chromium_OS], VERSION],
  [
    // Smart TVs
    /panasonic;(viera)/i, // Panasonic Viera
    /(netrange)mmh/i, // Netrange
    /(nettv)\/(\d+\.[\w\.]+)/i, // NetTV

    // Console
    /(nintendo|playstation) ([wids345portablevuch]+)/i, // Nintendo/Playstation
    /(xbox); +xbox ([^\);]+)/i, // Microsoft Xbox (360, One, X, S, Series X, Series S)

    // Other
    /(vectorlinux)[; ]/i, // Mageia/VectorLinux
    /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
    // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
    /(linux) ?([\w\.]*)/i, // Hurd/Linux
  ],
  [NAME, VERSION],
  [
    /(unix) ?([\w\.]*)/i, // UNIX
  ],
  [NAME, VERSION],
]
