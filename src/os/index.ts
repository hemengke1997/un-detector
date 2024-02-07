import { iife } from '../util'

export const os = iife(['mac', 'windows', 'iOS', 'android', 'winPhone', 'linux'] as const)
