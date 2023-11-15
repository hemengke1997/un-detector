export const PopularOsTypes = {
  Android: ['Android'],
  IOS: ['iPhone', 'iPad', 'iPod', 'IOS'],
  Mac: ['Mac OS X', 'Macintosh', 'Mac'],
  Windows: ['Windows'],
}

export type IsSome<T extends string> = `is${T}`
export type IsSomeOs = IsSome<keyof typeof PopularOsTypes>

export const Os = [
  ...Object.keys(PopularOsTypes)
    .map((key) => PopularOsTypes[key as keyof typeof PopularOsTypes])
    .flat(),
  'Windows Phone',
  'CentOS',
  'Chrome OS',
  'Debian',
  'Fedora',
  'FreeBSD',
  'Gentoo',
  'Haiku',
  'Kubuntu',
  'Linux Mint',
  'OpenBSD',
  'Red Hat',
  'SuSE',
  'Ubuntu',
  'Xubuntu',
  'Cygwin',
  'Symbian OS',
  'hpwOS',
  'webOS ',
  'webOS',
  'Tablet OS',
  'Tizen',
  'Linux',
  'Windows 98;',
]

type OsVersion = { [key: string]: string }
export const OsVersions: OsVersion = {
  '10.0': '10',
  '4.0': 'NT',
  '4.90': 'ME',
  '5.0': '2000',
  '5.01': '2000 SP1',
  '5.1': 'XP',
  '5.2': 'Server 2003 / XP 64-bit',
  '6.0': 'Server 2008 / Vista',
  '6.1': 'Server 2008 R2 / 7',
  '6.2': '8',
  '6.3': '8.1',
  '6.4': '10 Technical Preview',
}
