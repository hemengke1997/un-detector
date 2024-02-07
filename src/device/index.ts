import { iife } from '../util'

export const device = iife(['iphone', 'ipad', 'ipod', 'mobile', 'mobileOnly', 'tablet'] as const)
