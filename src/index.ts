// 按需导出，支持 tree-shaking
export { browser } from './browser'
export { device } from './device'
export { os } from './os'

// 整体导出，体积较大
export { detect } from './core'
