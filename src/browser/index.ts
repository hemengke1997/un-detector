import { iife } from '../util'

export const browser = iife(['edge', 'chrome', 'safari', 'firefox', 'opera', 'IE', 'chromium'] as const)
