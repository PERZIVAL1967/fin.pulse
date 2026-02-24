import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

interface HeaderProps {
  userName: string
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-4 sm:px-6 flex justify-between items-center transition-colors">
      <div className="flex items-center">
        
        {theme === 'light' ? <img src="/logo.png" alt="fin.pulse" className="h-10 w-auto" /> : <img src="/logo_dark.png" alt="fin.pulse" className="h-10 w-auto" />}
      </div>
      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-200">
          Здравствуйте, <span className="font-medium">{userName}</span>!
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

export default Header

