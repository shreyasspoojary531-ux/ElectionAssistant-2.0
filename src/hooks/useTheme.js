import { useEffect, useState } from 'react'

const storageKey = 'indian-election-guide-theme'

function resolvePreferredTheme() {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const storedTheme = window.localStorage.getItem(storageKey)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  // Default to dark for premium experience
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState(resolvePreferredTheme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
    window.localStorage.setItem(storageKey, theme)
  }, [theme])

  return {
    isDark: theme === 'dark',
    theme,
    toggleTheme() {
      setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'))
    },
  }
}
