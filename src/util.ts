import { UNKNOWN } from './constants'
import { type EvenType, type OddType, type RemoveArrayType } from './type'

type MapType = { [key: string]: string | string[] }

const has = (value: any, str: string): boolean => {
  return str.includes(value)
}

export function strMapper(str: string, map: MapType): string | undefined {
  const keys = Object.keys(map)

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    // check if current value is array
    if (typeof map[key] === 'object' && (map[key] as string[]).length > 0) {
      for (let j = 0; j < (map[key] as string[]).length; j++) {
        if (has((map[key] as string[])[j], str)) {
          return key === UNKNOWN ? undefined : key
        }
      }
    } else if (has(map[key], str)) {
      return key === UNKNOWN ? undefined : key
    }
  }

  return str
}

export type Result = {
  version?: string
  name?: string
  type?: string
} & {
  [key in string]: any
}

export function rgxMapper(ua: string, arrays: any[]) {
  let i = 0
  let j: number
  let k: number
  let p: number
  let q: RemoveArrayType<OddType>
  let matches: RegExpExecArray | null = null
  let match: string | undefined
  const result: Result = {}

  while (i < arrays.length && !matches) {
    const regex = arrays[i] as EvenType // even sequence (0,2,4,..)
    const props = arrays[i + 1] as OddType // odd sequence (1,3,5,..)
    j = k = 0

    while (j < regex.length && !matches) {
      if (!regex[j]) break

      matches = regex[j++].exec(ua)

      if (matches) {
        for (p = 0; p < props.length; p++) {
          match = matches[++k]
          q = props[p]

          if (Array.isArray(q)) {
            if (q.length === 2) {
              // [q[0]: string, q[1]: (match: string) => string]
              // like: ['name', (match) => {}],
              if (typeof q[1] === 'function') {
                result[q[0]] = q[1](match)
              } else {
                // [q[0]: string, q[1]: string]
                // like: ['name', 'iOS']
                result[q[0]] = q[1]
              }
            } else if (q.length === 3) {
              // [q[0]: string, q[1]: (match: string, q[2]: T) => string), q[2]: T]
              if (typeof q[1] === 'function') {
                // like: ['name', (match, q[2]) => {}, q[2]],
                result[q[0]] = match ? q[1](match, q[2]) : undefined
              } else {
                // [q[0]: string, q[1]: RegExp | string, q[2]: string]
                // like: ['name', /regex/, 'iOS']
                result[q[0]] = match ? match.replace(q[1], q[2]) : undefined
              }
            } else if (q.length === 4) {
              // [q[0]: string, q[1]: RegExp, q[2]: string, q[3]: (matchReplaced: string) => string]
              // like: ['name', /regex/, 'iOS', (matchReplaced) => {}]
              result[q[0]] = match ? q[3](match.replace(q[1], q[2])) : undefined
            }
          } else {
            // q: string
            result[q] = match ? match : undefined
          }
        }
      }
    }
    i += 2
  }

  return result
}

export function majorize(version: string | undefined) {
  return version?.replace(/[^\d\.]/g, '').split('.')[0] || undefined
}

type EnumType<T> = { [key: string]: T }
export function enumerize<T extends string>(arr: T[]): EnumType<T> {
  const enums: EnumType<T> = {}
  for (let i = 0; i < arr.length; i++) {
    enums[arr[i].toUpperCase()] = arr[i]
  }
  return enums
}

export function trim(str: string | undefined, len: number) {
  str = str?.replace(/^\s\s*/, '')
  return typeof len === 'undefined' ? str : str?.substring(0, 350)
}

export function lowerize(str: string | undefined) {
  return str?.toLowerCase()
}

export function removeIsAndLowerize(name: string) {
  return name.replace(/^is/, '').toLowerCase()
}

export function injectableNavigator() {
  return typeof window !== 'undefined' ? window.navigator : undefined
}

export function injectableProcess() {
  return typeof process !== 'undefined' ? process : undefined
}

export const isIOS13Check = (type: string) => {
  if (injectableNavigator()) {
    const nav = injectableNavigator()
    return (
      (nav &&
        nav.platform &&
        (nav.platform.includes(type) ||
          (nav.platform === 'MacIntel' && nav.maxTouchPoints > 1 && !(window as any).MSStream))) ||
      false
    )
  }
  return false
}
