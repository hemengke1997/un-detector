export type PrefixWithIs<T extends string> = `is${Capitalize<T>}`
export type DetectFn = (ua?: string) => boolean

export type MaybeArray<T> = T | T[]
export type RemoveArrayType<T> = T extends (infer U)[] ? U : T

export type EvenType = RegExp[] // even sequence (0,2,4,..)

export type OddType = (
  | string
  | [string, string | ((match: any) => string)]
  | [string, RegExp | string | ((match: string, q2: any) => string), any]
  | [string, RegExp, string, (matchReplaced: string) => string]
)[]
// odd sequence (1,3,5,..)

export type RegexMap = (RegExp | string | (Record<string, string | string[]> | string | RegExp | Function)[])[][]
