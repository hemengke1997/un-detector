import { BRWOSER_MAPPER, DEVICE_MAPPER, DEVICE_TYPE_MAPPER, MODEL, TYPE, VENDOR } from '../constants'
import { type RegexMap } from '../type'
import { trim } from '../util'

// https://github.com/juliangruber/is-mobile/blob/main/index.js
export const MobileRegExp =
  /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser.*mobile|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i

export const DeviceRegexMapper: RegexMap = [
  [
    //////////////////////////
    // MOBILES & TABLETS
    /////////////////////////

    // Samsung
    /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
  [MODEL, [VENDOR, DEVICE_MAPPER.Samsung], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Apple
    /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i, // iPod/iPhone
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Apple], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\((ipad);[-\w\),; ]+apple/i, // iPad
    /applecoremedia\/[\w\.]+ \((ipad)/i,
    /\b(ipad)\d\d?,\d\d?[;\]].+ios/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Apple], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [/(macintosh);/i],
  [MODEL, [VENDOR, DEVICE_MAPPER.Apple]],
  [
    // Sharp
    /\b(sh-?[altvz]?\d\d[a-ekm]?)/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Sharp], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Huawei
    /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Huawei], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],
  [MODEL, [VENDOR, DEVICE_MAPPER.Huawei], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Xiaomi
    /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, // Xiaomi POCO
    /\b; (\w+) build\/hm\1/i, // Xiaomi Hongmi 'numeric' models
    /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, // Xiaomi Hongmi
    /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, // Xiaomi Redmi
    /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i, // Xiaomi Mi
  ],
  [
    [MODEL, /_/g, ' '],
    [VENDOR, DEVICE_MAPPER.Xiaomi],
    [TYPE, DEVICE_TYPE_MAPPER.mobile],
  ],
  [
    /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i, // Mi Pad tablets
  ],
  [
    [MODEL, /_/g, ' '],
    [VENDOR, DEVICE_MAPPER.Xiaomi],
    [TYPE, DEVICE_TYPE_MAPPER.tablet],
  ],
  [
    // OPPO
    /; (\w+) bui.+ oppo/i,
    /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i,
  ],
  [MODEL, [VENDOR, 'OPPO'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Vivo
    /vivo (\w+)(?: bui|\))/i,
    /\b(v[12]\d{3}\w?[at])(?: bui|;)/i,
  ],
  [MODEL, [VENDOR, 'Vivo'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Realme
    /\b(rmx[12]\d{3})(?: bui|;|\))/i,
  ],
  [MODEL, [VENDOR, 'Realme'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Motorola
    /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
    /\bmot(?:orola)?[- ](\w*)/i,
    /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Motorola], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
  [MODEL, [VENDOR, DEVICE_MAPPER.Motorola], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    // DEVICE_MAPPER.LG
    /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.LG], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
    /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
    /\blg-?([\d\w]+) bui/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.LG], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Lenovo
    /(ideatab[-\w ]+)/i,
    /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i,
  ],
  [MODEL, [VENDOR, 'Lenovo'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    // Nokia
    /(?:maemo|nokia).*(n900|lumia \d+)/i,
    /nokia[-_ ]?([-\w\.]*)/i,
  ],
  [
    [MODEL, /_/g, ' '],
    [VENDOR, 'Nokia'],
    [TYPE, DEVICE_TYPE_MAPPER.mobile],
  ],
  [
    // Google
    /(pixel c)\b/i, // Google Pixel C
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Google], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i, // Google Pixel
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Google], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Sony
    /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Sony], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
  [
    [MODEL, 'Xperia Tablet'],
    [VENDOR, DEVICE_MAPPER.Sony],
    [TYPE, DEVICE_TYPE_MAPPER.tablet],
  ],
  [
    // OnePlus
    / (kb2005|in20[12]5|be20[12][59])\b/i,
    /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i,
  ],
  [MODEL, [VENDOR, 'OnePlus'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Amazon
    /(alexa)webm/i,
    /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, // Kindle Fire without Silk / Echo Show
    /(kf[a-z]+)( bui|\)).+silk\//i, // Kindle Fire HD
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Amazon], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i, // Fire Phone
  ],
  [
    [MODEL, /(.+)/g, 'Fire Phone $1'],
    [VENDOR, DEVICE_MAPPER.Amazon],
    [TYPE, DEVICE_TYPE_MAPPER.mobile],
  ],
  [
    // BlackBerry
    /(playbook);[-\w\),; ]+(rim)/i, // BlackBerry PlayBook
  ],
  [MODEL, VENDOR, [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b((?:bb[a-f]|st[hv])100-\d)/i,
    /\(bb10; (\w+)/i, // BlackBerry 10
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.BlackBerry], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Asus
    /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i,
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Asus], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
  [MODEL, [VENDOR, DEVICE_MAPPER.Asus], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // HTC
    /(nexus 9)/i, // HTC Nexus 9
  ],
  [MODEL, [VENDOR, 'HTC'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, // HTC

    // ZTE
    /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
    /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i, // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
  ],
  [VENDOR, [MODEL, /_/g, ' '], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // Acer
    /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i,
  ],
  [MODEL, [VENDOR, 'Acer'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    // Meizu
    /droid.+; (m[1-5] note) bui/i,
    /\bmz-([-\w]{2,})/i,
  ],
  [MODEL, [VENDOR, 'Meizu'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    // MIXED
    /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
    // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
    /(hp) ([\w ]+\w)/i, // HP iPAQ
    /(asus)-?(\w+)/i, // Asus
    /(microsoft); (lumia[\w ]+)/i, // Microsoft Lumia
    /(lenovo)[-_ ]?([-\w]+)/i, // Lenovo
    /(jolla)/i, // Jolla
    /(oppo) ?([\w ]+) bui/i, // OPPO
  ],
  [VENDOR, MODEL, [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /(kobo)\s(ereader|touch)/i, // Kobo
    /(archos) (gamepad2?)/i, // Archos
    /(hp).+(touchpad(?!.+tablet)|tablet)/i, // HP TouchPad
    /(kindle)\/([\w\.]+)/i, // Kindle
    /(nook)[\w ]+build\/(\w+)/i, // Nook
    /(dell) (strea[kpr\d ]*[\dko])/i, // Dell Streak
    /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, // Le Pan Tablets
    /(trinity)[- ]*(t\d{3}) bui/i, // Trinity Tablets
    /(gigaset)[- ]+(q\w{1,9}) bui/i, // Gigaset Tablets
    /(vodafone) ([\w ]+)(?:\)| bui)/i, // Vodafone
  ],
  [VENDOR, MODEL, [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /(surface duo)/i, // Surface Duo
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Microsoft], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /droid [\d\.]+; (fp\du?)(?: b|\))/i, // Fairphone
  ],
  [MODEL, [VENDOR, 'Fairphone'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /(u304aa)/i, // AT&T
  ],
  [MODEL, [VENDOR, 'AT&T'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\bsie-(\w*)/i, // Siemens
  ],
  [MODEL, [VENDOR, 'Siemens'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\b(rct\w+) b/i, // RCA Tablets
  ],
  [MODEL, [VENDOR, 'RCA'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(venue[\d ]{2,7}) b/i, // Dell Venue Tablets
  ],
  [MODEL, [VENDOR, 'Dell'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(q(?:mv|ta)\w+) b/i, // Verizon Tablet
  ],
  [MODEL, [VENDOR, 'Verizon'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i, // Barnes & Noble Tablet
  ],
  [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [/\b(tm\d{3}\w+) b/i],
  [MODEL, [VENDOR, 'NuVision'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(k88) b/i, // ZTE K Series Tablet
  ],
  [MODEL, [VENDOR, 'ZTE'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(nx\d{3}j) b/i, // ZTE Nubia
  ],
  [MODEL, [VENDOR, 'ZTE'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\b(gen\d{3}) b.+49h/i, // Swiss GEN Mobile
  ],
  [MODEL, [VENDOR, 'Swiss'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\b(zur\d{3}) b/i, // Swiss ZUR Tablet
  ],
  [MODEL, [VENDOR, 'Swiss'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b((zeki)?tb.*\b) b/i, // Zeki Tablets
  ],
  [MODEL, [VENDOR, 'Zeki'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b([yr]\d{2}) b/i,
    /\b(dragon[- ]+touch |dt)(\w{5}) b/i, // Dragon Touch Tablet
  ],
  [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(ns-?\w{0,9}) b/i, // Insignia Tablets
  ],
  [MODEL, [VENDOR, 'Insignia'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b((nxa|next)-?\w{0,9}) b/i, // NextBook Tablets
  ],
  [MODEL, [VENDOR, 'NextBook'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i, // Voice Xtreme Phones
  ],
  [[VENDOR, 'Voice'], MODEL, [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\b(lvtel\-)?(v1[12]) b/i, // LvTel Phones
  ],
  [[VENDOR, 'LvTel'], MODEL, [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\b(ph-1) /i, // Essential PH-1
  ],
  [MODEL, [VENDOR, 'Essential'], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /\b(v(100md|700na|7011|917g).*\b) b/i, // Envizen Tablets
  ],
  [MODEL, [VENDOR, 'Envizen'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b(trio[-\w\. ]+) b/i, // MachSpeed Tablets
  ],
  [MODEL, [VENDOR, 'MachSpeed'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\btu_(1491) b/i, // Rotor Tablets
  ],
  [MODEL, [VENDOR, 'Rotor'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /(shield[\w ]+) b/i, // Nvidia Shield Tablets
  ],
  [MODEL, [VENDOR, 'Nvidia'], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /(sprint) (\w+)/i, // Sprint Phones
  ],
  [VENDOR, MODEL, [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /(kin\.[onetw]{3})/i, // Microsoft Kin
  ],
  [
    [MODEL, /\./g, ' '],
    [VENDOR, DEVICE_MAPPER.Microsoft],
    [TYPE, DEVICE_TYPE_MAPPER.mobile],
  ],
  [
    /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i, // Zebra
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Zebra], [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
  [MODEL, [VENDOR, DEVICE_MAPPER.Zebra], [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    ///////////////////
    // SMARTTVS
    ///////////////////

    /smart-tv.+(samsung)/i, // Samsung
  ],
  [VENDOR, [TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [/hbbtv.+maple;(\d+)/i],
  [
    [MODEL, /^/, 'SmartTV'],
    [VENDOR, DEVICE_MAPPER.Samsung],
    [TYPE, DEVICE_TYPE_MAPPER.smarttv],
  ],
  [
    /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i, // DEVICE_MAPPER.LG SmartTV
  ],
  [
    [VENDOR, DEVICE_MAPPER.LG],
    [TYPE, DEVICE_TYPE_MAPPER.smarttv],
  ],
  [
    /(apple) ?tv/i, // Apple TV
  ],
  [VENDOR, [MODEL, `${DEVICE_MAPPER.Apple} TV`], [TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [
    /crkey/i, // Google Chromecast
  ],
  [
    [MODEL, `${BRWOSER_MAPPER.Chrome}cast`],
    [VENDOR, DEVICE_MAPPER.Google],
    [TYPE, DEVICE_TYPE_MAPPER.smarttv],
  ],
  [
    /droid.+aft(\w+)( bui|\))/i, // Fire TV
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Amazon], [TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [
    /\(dtv[\);].+(aquos)/i,
    /(aquos-tv[\w ]+)\)/i, // Sharp
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Sharp], [TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [
    /(bravia[\w ]+)( bui|\))/i, // Sony
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Sony], [TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [
    /(mitv-\w{5}) bui/i, // Xiaomi
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Xiaomi], [TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [
    /Hbbtv.*(technisat) (.*);/i, // TechniSAT
  ],
  [VENDOR, MODEL, [TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [
    /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, // Roku
    /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i, // HbbTV devices
  ],
  [
    [VENDOR, trim],
    [MODEL, trim],
    [TYPE, DEVICE_TYPE_MAPPER.smarttv],
  ],
  [
    /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i, // SmartTV from Unidentified Vendors
  ],
  [[TYPE, DEVICE_TYPE_MAPPER.smarttv]],
  [
    ///////////////////
    // CONSOLES
    ///////////////////

    /(ouya)/i, // Ouya
    /(nintendo) ([wids3utch]+)/i, // Nintendo
  ],
  [VENDOR, MODEL, [TYPE, DEVICE_TYPE_MAPPER.console]],
  [
    /droid.+; (shield) bui/i, // Nvidia
  ],
  [MODEL, [VENDOR, 'Nvidia'], [TYPE, DEVICE_TYPE_MAPPER.console]],
  [
    /(playstation [345portablevi]+)/i, // Playstation
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Sony], [TYPE, DEVICE_TYPE_MAPPER.console]],
  [
    /\b(xbox(?: one)?(?!; xbox))[\); ]/i, // Microsoft Xbox
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Microsoft], [TYPE, DEVICE_TYPE_MAPPER.console]],
  [
    ///////////////////
    // WEARABLES
    ///////////////////

    /((pebble))app/i, // Pebble
  ],
  [VENDOR, MODEL, [TYPE, DEVICE_TYPE_MAPPER.wearable]],
  [
    /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i, // Apple Watch
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Apple], [TYPE, DEVICE_TYPE_MAPPER.wearable]],
  [
    /droid.+; (glass) \d/i, // Google Glass
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Google], [TYPE, DEVICE_TYPE_MAPPER.wearable]],
  [/droid.+; (wt63?0{2,3})\)/i],
  [MODEL, [VENDOR, DEVICE_MAPPER.Zebra], [TYPE, DEVICE_TYPE_MAPPER.wearable]],
  [
    /(quest( 2| pro)?)/i, // Oculus Quest
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Facebook], [TYPE, DEVICE_TYPE_MAPPER.wearable]],
  [
    ///////////////////
    // DEVICE_TYPE_MAPPER.embedded
    ///////////////////

    /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i, // Tesla
  ],
  [VENDOR, [TYPE, DEVICE_TYPE_MAPPER.embedded]],
  [
    /(aeobc)\b/i, // Echo Dot
  ],
  [MODEL, [VENDOR, DEVICE_MAPPER.Amazon], [TYPE, DEVICE_TYPE_MAPPER.embedded]],
  [
    ////////////////////
    // MIXED (GENERIC)
    ///////////////////

    /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i, // Android Phones from Unidentified Vendors
  ],
  [MODEL, [TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i, // Android Tablets from Unidentified Vendors
  ],
  [MODEL, [TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i, // Unidentifiable Tablet
  ],
  [[TYPE, DEVICE_TYPE_MAPPER.tablet]],
  [
    /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i, // Unidentifiable Mobile
  ],
  [[TYPE, DEVICE_TYPE_MAPPER.mobile]],
  [
    /(android[-\w\. ]{0,9});.+buil/i, // Generic Android Device
  ],
  [MODEL, [VENDOR, 'Generic']],
]
