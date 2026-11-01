'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import {
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
  LogIn,
  UserPlus
} from 'lucide-react';

export function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<'home' | 'upcoming-events'>('home');

  useEffect(() => {
    let ticking = false;

    const handleScrollVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY <= 40) {
            setIsVisible(true);
          } else {
            const scrollDiff = currentScrollY - lastScrollY.current;

            if (scrollDiff > 8 && currentScrollY > 80) {
              setIsVisible(false);
              setDropdownOpen(false);
            } 
            else if (scrollDiff < -8) {
              setIsVisible(true);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      const eventsEl = document.getElementById('upcoming-events');

      if (eventsEl) {
        const rect = eventsEl.getBoundingClientRect();
        if (rect.top <= 280) {
          setActiveSection('upcoming-events');
          return;
        }
      }

      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    setIsVisible(true);
  }, [pathname]);

  const navLinks = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'upcoming-events', label: 'Upcoming Events', href: '/events' },
  ];

  const authRedirectParam = pathname && pathname !== '/login' && pathname !== '/register'
    ? `?redirect=${encodeURIComponent(pathname)}`
    : '';

  const shouldShow = isVisible || mobileMenuOpen;

  return (
    <header
      className={`fixed top-4 sm:top-5 inset-x-0 z-50 max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-300 ease-in-out ${
        shouldShow
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : '-translate-y-28 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center justify-between h-16 sm:h-18 px-4 sm:px-6 rounded-[10px] glass-capsule transition-all duration-300">
        
        
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative h-9 sm:h-10 flex items-center">
            
            <img
              src="/logo.png"
              alt="UnityServe"
              className="h-8 sm:h-9 w-auto object-contain dark:hidden group-hover:scale-[1.02] transition-transform duration-200"
            />
            
            <img
              src="/logo-dark.png"
              alt="UnityServe"
              className="h-8 sm:h-9 w-auto object-contain hidden dark:block group-hover:scale-[1.02] transition-transform duration-200"
            />
          </div>
        </Link>

        
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 px-2.5 lg:px-3 py-1.5 rounded-[8px] bg-slate-200/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)]">
          {navLinks.map((link) => {
            const isActive =
              pathname === '/'
                ? activeSection === link.id
                : pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (pathname === '/') {
                if (link.id === 'home') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveSection('home');
                } else if (link.id === 'upcoming-events') {
                  const el = document.getElementById('upcoming-events');
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection('upcoming-events');
                  }
                }
              }
            };

            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={handleClick}
                className={`px-3 lg:px-4 py-1.5 rounded-[8px] text-[11px] lg:text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'text-[#1E40AF] dark:text-[#60A5FA] bg-white/95 dark:bg-slate-800/90 shadow-[0_2px_10px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] border border-white/80 dark:border-white/10'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#1E40AF] dark:hover:text-[#60A5FA] hover:bg-white/40 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {loading ? (
            <div className="w-9 h-9 rounded-[10px] bg-slate-100 dark:bg-slate-800 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-2.5">
              
              <div className="relative" ref={dropdownRef}>
                <div className="relative group">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    title={user.name || user.email}
                    aria-label={`User menu for ${user.name}`}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-[10px] border border-white/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-150 focus:outline-none cursor-pointer"
                  >
                    <img
                      src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || user.email)}`}
                      alt={user.name || 'User'}
                      className="w-7 h-7 rounded-full object-cover border-2 border-[#2563EB] shadow-xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=volunteer`;
                      }}
                    />
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  
                  <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out z-50 whitespace-nowrap px-2.5 py-1 rounded-[6px] bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-md text-white text-[11px] font-bold shadow-xl border border-white/15">
                    <span>{user.name || 'Volunteer User'}</span>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-slate-900/95 dark:bg-slate-800/95 border-l border-t border-white/15" />
                  </div>
                </div>

                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 rounded-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                        Signed in as
                      </p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <span title="Verified Volunteer" className="inline-flex items-center flex-shrink-0 text-[#2563EB] dark:text-[#3B82F6]">
                          <svg className="w-4 h-4 fill-[#2563EB] dark:fill-[#3B82F6]" viewBox="0 0 24 24">
                            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                            <path d="m9 12 2 2 4-4" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-2 px-1 space-y-0.5">
                      <Link
                        href="/events/create"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] hover:text-[#1E40AF] transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-[#2563EB]" /> Create Event
                      </Link>
                      <Link
                        href="/events/manage"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] hover:text-[#1E40AF] transition-colors"
                      >
                        <FolderKanban className="w-4 h-4 text-[#2563EB]" /> Manage Events
                      </Link>
                      <Link
                        href="/events/joined"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] hover:text-[#1E40AF] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#2563EB]" /> Joined Events
                      </Link>
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 rounded-[8px] text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EFF6FF] dark:hover:bg-[#1E293B] hover:text-[#1E40AF] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-[#2563EB]" /> Profile Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1 px-1">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 rounded-[8px] text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              
              <button
                onClick={logout}
                title="Sign out of your account"
                className="px-3.5 py-1.5 rounded-[10px] text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-white hover:bg-rose-600 dark:hover:bg-rose-600 border border-rose-200 dark:border-rose-900/60 bg-white/70 dark:bg-slate-900/60 transition-all duration-200 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href={`/login${authRedirectParam}`}
                className="px-3.5 py-1.5 rounded-[10px] text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#1E40AF] dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800/80 border border-slate-200/80 dark:border-white/10 transition-all duration-200 flex items-center gap-1.5 group cursor-pointer shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 group-hover:text-[#1E40AF] dark:group-hover:text-[#60A5FA] transition-colors" />
                <span>Login</span>
              </Link>
              <Link
                href={`/register${authRedirectParam}`}
                className="px-4 py-1.5 rounded-[10px] font-heading text-xs font-bold glass-btn-primary flex items-center gap-1.5 cursor-pointer shadow-xs transition-all duration-200"
              >
                <UserPlus className="w-3.5 h-3.5 text-white" />
                <span>Sign Up</span>
              </Link>
            </div>
          )}
        </div>

        
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[10px] border border-white/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md text-foreground focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 rounded-[10px] glass-capsule p-4 shadow-2xl space-y-3 animate-in slide-in-from-top-3 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === '/'
                  ? activeSection === link.id
                  : pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (pathname === '/') {
                  if (link.id === 'home') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setActiveSection('home');
                  } else if (link.id === 'upcoming-events') {
                    const el = document.getElementById('upcoming-events');
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: 'smooth' });
                      setActiveSection('upcoming-events');
                    }
                  }
                }
                setMobileMenuOpen(false);
              };

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={handleClick}
                  className={`block px-4 py-2 rounded-[8px] text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#1E40AF] dark:text-[#60A5FA] bg-white/80 dark:bg-slate-800/80 font-bold'
                      : 'text-foreground hover:bg-white/50 dark:hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-200/50 dark:border-slate-800/80 pt-3">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-4 py-2.5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10">
                  <img
                    src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || user.email)}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-[#2563EB]"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[10px] text-slate-400">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/events/create"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-white/50 dark:hover:bg-white/10"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-[#2563EB]" /> Create Event
                  </Link>
                  <Link
                    href="/events/manage"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-white/50 dark:hover:bg-white/10"
                  >
                    <FolderKanban className="w-3.5 h-3.5 text-[#2563EB]" /> Manage Events
                  </Link>
                  <Link
                    href="/events/joined"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-white/50 dark:hover:bg-white/10"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2563EB]" /> Joined Events
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-white/50 dark:hover:bg-white/10"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#2563EB]" /> Profile Settings
                  </Link>
                </div>

                <button
                  onClick={logout}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl text-center text-xs font-bold bg-rose-500 text-white cursor-pointer shadow-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href={`/login${authRedirectParam}`}
                  className="w-full py-2.5 px-4 text-center rounded-xl text-xs font-bold border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-800/70 text-foreground flex items-center justify-center gap-2"
                >
                  <LogIn className="w-3.5 h-3.5 text-slate-500" />
                  <span>Login</span>
                </Link>
                <Link
                  href={`/register${authRedirectParam}`}
                  className="w-full py-2.5 px-4 text-center rounded-xl text-xs font-bold glass-btn-primary flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-3.5 h-3.5 text-white" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
