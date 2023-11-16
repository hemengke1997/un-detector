export type PrefixWithIs<T extends string> = `is${Capitalize<T>}`
export type DetectFn = (ua?: string) => boolean
