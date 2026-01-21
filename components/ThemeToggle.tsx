'use client'

import { MoonIcon } from '@/public/assets/icons/MoonIcon'
import { SunIcon } from '@/public/assets/icons/SunIcon'
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
        !isDarkMode ? 'Switch to dark mode' : 'Switch to light mode'
      }
    >
      {!isDarkMode ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
