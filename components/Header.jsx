import React from 'react';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto px-6 md:px-8 mb-16 max-w-5xl">
      <div className="flex items-center justify-between w-full border-b border-notion-border/30 py-4 gap-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="flex items-center gap-2.5 cursor-pointer hover:opacity-70 px-1 py-1 rounded-lg transition-opacity">
              <span className="text-lg">📄</span>
              <span className="font-semibold text-[17px] text-notion-text tracking-tight">Djomatin Aho Christian Blog</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Google Translate Element */}
          <div id="google_translate_element" className="google-translate-container" />

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-notion-hover transition-all text-notion-secondary hover:text-notion-text"
            title="Toggle Theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 9H3m3.343-5.657l-.707.707m12.728 12.728l-.707.707M6.343 17.657l-.707-.707M17.657 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
