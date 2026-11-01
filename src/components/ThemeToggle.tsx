'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-[10px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle Dark / Light Theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-[10px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] hover:bg-slate-50 dark:hover:bg-[#1C2C47] text-foreground transition-all duration-200 focus:outline-none shadow-sm hover:shadow cursor-pointer group"
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-[#FBBF24] drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 text-[#1E40AF] transition-transform duration-300 -rotate-12 hover:rotate-0" />
      )}
    </button>
  );
}
