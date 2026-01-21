'use client'

import { MoonIcon } from '@/components/icons/MoonIcon'
import { SunIcon } from '@/components/icons/SunIcon'
import {
  ThemeAnimationType,
  useModeAnimation
} from 'react-theme-switch-animation'

export function ThemeToggle() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.QR_SCAN
  })

  return (
    <button
      ref={ref}
      onClick={toggleSwitchTheme}
      className='w-9 h-9 flex items-center justify-center rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors'
      aria-label={
        isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
