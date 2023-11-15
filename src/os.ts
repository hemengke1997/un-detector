// export const Os = [
//   ...Object.keys(PopularOsTypes)
//     .map((key) => PopularOsTypes[key as keyof typeof PopularOsTypes])
//     .flat(),
//   'Windows Phone',
//   'CentOS',
//   'Chrome OS',
//   'Debian',
//   'Fedora',
//   'FreeBSD',
//   'Gentoo',
//   'Haiku',
//   'Kubuntu',
//   'Linux Mint',
//   'OpenBSD',
//   'Red Hat',
//   'SuSE',
//   'Ubuntu',
//   'Xubuntu',
//   'Cygwin',
//   'Symbian OS',
//   'hpwOS',
//   'webOS ',
//   'webOS',
//   'Tablet OS',
//   'Tizen',
//   'Linux',
//   'Windows 98;',
// ]

// type OsVersion = { [key: string]: string }
// export const OsVersions: OsVersion = {
//   '10.0': '10',
//   '4.0': 'NT',
//   '4.90': 'ME',
//   '5.0': '2000',
//   '5.01': '2000 SP1',
//   '5.1': 'XP',
//   '5.2': 'Server 2003 / XP 64-bit',
//   '6.0': 'Server 2008 / Vista',
//   '6.1': 'Server 2008 R2 / 7',
//   '6.2': '8',
//   '6.3': '8.1',
//   '6.4': '10 Technical Preview',
// }

export type OperatingSystem =
  | 'iOS'
  | 'Android OS'
  | 'BlackBerry OS'
  | 'Windows Mobile'
  | 'Amazon OS'
  | 'Windows 3.11'
  | 'Windows 95'
  | 'Windows 98'
  | 'Windows 2000'
  | 'Windows XP'
  | 'Windows Server 2003'
  | 'Windows Vista'
  | 'Windows 7'
  | 'Windows 8'
  | 'Windows 8.1'
  | 'Windows 10'
  | 'Windows ME'
  | 'Windows CE'
  | 'Open BSD'
  | 'Sun OS'
  | 'Linux'
  | 'Mac OS'
  | 'QNX'
  | 'BeOS'
  | 'OS/2'
  | 'Chrome OS'

type OperatingSystemRule = [OperatingSystem & string, RegExp]

export const os: OperatingSystemRule[] = [
  ['iOS', /iP(hone|od|ad)/],
  ['Android OS', /Android/],
  ['BlackBerry OS', /BlackBerry|BB10/],
  ['Windows Mobile', /IEMobile/],
  ['Amazon OS', /Kindle/],
  ['Windows 3.11', /Win16/],
  ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
  ['Windows 98', /(Windows 98)|(Win98)/],
  ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
  ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
  ['Windows Server 2003', /(Windows NT 5.2)/],
  ['Windows Vista', /(Windows NT 6.0)/],
  ['Windows 7', /(Windows NT 6.1)/],
  ['Windows 8', /(Windows NT 6.2)/],
  ['Windows 8.1', /(Windows NT 6.3)/],
  ['Windows 10', /(Windows NT 10.0)/],
  ['Windows ME', /Windows ME/],
  ['Windows CE', /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ['Open BSD', /OpenBSD/],
  ['Sun OS', /SunOS/],
  ['Chrome OS', /CrOS/],
  ['Linux', /(Linux)|(X11)/],
  ['Mac OS', /(Mac_PowerPC)|(Macintosh)|(Mac OS X)/],
  ['QNX', /QNX/],
  ['BeOS', /BeOS/],
  ['OS/2', /OS\/2/],
]

export type PopularOsType = 'Android' | 'IOS' | 'Mac' | 'Windows'

export const popularOsTypes: Record<PopularOsType, OperatingSystem[]> = {
  Android: ['Android OS'],
  IOS: ['iOS'],
  Mac: ['Mac OS'],
  Windows: [
    'Windows 3.11',
    'Windows 95',
    'Windows 98',
    'Windows 2000',
    'Windows XP',
    'Windows Server 2003',
    'Windows Vista',
    'Windows 7',
    'Windows 8',
    'Windows 8.1',
    'Windows 10',
    'Windows ME',
    'Windows CE',
  ],
}

type IsSome<T extends string> = `is${T}`
export type IsSomeOs = IsSome<PopularOsType>
