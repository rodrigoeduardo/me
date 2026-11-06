'use client'

import { MoonIcon } from '@/components/icons/MoonIcon'
import { SunIcon } from '@/components/icons/SunIcon'
import { useLanguage } from '@/lib/i18n'
import {
  ThemeAnimationType,
  useModeAnimation
} from 'react-theme-switch-animation'

export function ThemeToggle() {
  const { t } = useLanguage()
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.QR_SCAN
  })

  return (
    <button
      ref={ref}
      onClick={toggleSwitchTheme}
      className='w-9 h-9 flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-head transition-colors'
      aria-label={isDarkMode ? t('theme.toLight') : t('theme.toDark')}
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
