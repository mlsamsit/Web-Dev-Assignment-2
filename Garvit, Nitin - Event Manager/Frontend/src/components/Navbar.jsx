import { useState } from 'react'
import { useDarkMode, useInfo } from '../zustand/store'
import { useNavigate } from 'react-router'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const isDarkMode = useDarkMode((state) => state.isDarkMode)
  const toggleTheme = useDarkMode((state) => state.toggleTheme)

  const name = useInfo((state) => state.name)
  const username = useInfo((state) => state.username)

  // Common class for name button to match Explore Events
  const nameButtonClass =
    "flex items-center gap-2 px-6 py-2 border-2 border-green-600 text-green-600 font-semibold rounded-lg transition-colors duration-200 hover:bg-green-50 text-lg dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/30"

  const svgClass =
    "transition-colors duration-200 group-hover:text-green-600 dark:group-hover:text-green-400"

  return (
    <nav className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-green-600">MSC-EventManager</h1>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-700 dark:text-gray-300 border-b-2 border-transparent hover:border-green-600 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200"
          >
            Home
          </button>

          <button
            onClick={() => navigate('/events/all')}
            className="text-gray-700 dark:text-gray-300 border-b-2 border-transparent hover:border-green-600 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200"
          >
            Events
          </button>

          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 border-b-2 border-transparent hover:border-green-600 dark:hover:border-green-400 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200"
          >
            Theme: {isDarkMode ? 'Dark' : 'Light'}
          </button>
        </div>

        {/* DESKTOP SIGNIN / USER NAME */}
        <div className="hidden md:flex">
          {name && username ? (
            <button
              onClick={() => navigate('/dashboard')}
              className={`${nameButtonClass} group`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${svgClass} text-green-600 dark:text-green-400`}
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {name}
            </button>
          ) : (
            <button
              onClick={() => navigate('/authorization')}
              className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 dark:bg-green-500 dark:hover:bg-green-600"
            >
              Sign In
            </button>
          )}
        </div>

        {/* MOBILE MENU ICON */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-700 dark:bg-gray-300 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200 text-left py-2"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/events/all')}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200 text-left py-2"
            >
              Events
            </button>
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition-colors duration-200 text-left py-2"
            >
              Theme: {isDarkMode ? 'Dark' : 'Light'}
            </button>

            {name && username ? (
              <button
                onClick={() => navigate('/dashboard')}
                className={`${nameButtonClass} group w-full justify-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`${svgClass} text-green-600 dark:text-green-400`}
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {name}
              </button>
            ) : (
              <button
                onClick={() => navigate('/authorization')}
                className="w-full px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200 mt-2 dark:bg-green-500 dark:hover:bg-green-600"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
