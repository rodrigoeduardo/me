'use client'

import { MoonIcon } from '@/components/icons/MoonIcon'
import { SunIcon } from '@/components/icons/SunIcon'
import {
  ThemeAnimationType,
  useModeAnimation
} from 'react-theme-switch-animation'

export interface ThemeToggleLabels {
  toLight: string
  toDark: string
}

interface ThemeToggleProps {
  labels: ThemeToggleLabels
}

export function ThemeToggle({ labels }: ThemeToggleProps) {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.QR_SCAN
  })

  return (
    <button
      ref={ref}
      onClick={toggleSwitchTheme}
      className='w-9 h-9 flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-head transition-colors'
      aria-label={isDarkMode ? labels.toLight : labels.toDark}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
