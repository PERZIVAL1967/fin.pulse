import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  userName: string
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-stone-200 dark:border-gray-700 py-4 px-4 sm:px-6 flex justify-between items-center transition-colors">
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="fin.pulse"
          className="h-10 w-auto dark:hidden"
          width={120}
          height={40}
        />
        <img
          src="/logo_dark.png"
          alt="fin.pulse"
          className="h-10 w-auto hidden dark:block"
          width={120}
          height={40}
        />
      </div>
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="text-xs sm:text-sm text-stone-600 dark:text-gray-300">
          Здравствуйте, <span className="font-medium text-stone-800 dark:text-white">{userName}</span>!
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-stone-100 dark:bg-gray-700 text-stone-700 dark:text-gray-200 hover:bg-stone-200 dark:hover:bg-gray-600 transition"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

export default Header
