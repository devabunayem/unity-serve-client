'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/login') || pathname?.startsWith('/register')) {
    return null;
  }

  return (
    <footer className="w-full border-t border-white/60 dark:border-white/10 bg-white/40 dark:bg-[#080C14]/40 backdrop-blur-2xl text-foreground transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block group focus:outline-none">
              <img
                src="/logo.png"
                alt="UnityServe"
                className="h-11 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform duration-200"
              />
              <img
                src="/logo-dark.png"
                alt="UnityServe"
                className="h-11 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform duration-200"
              />
            </Link>

            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-sm">
              UnityServe empowers proactive citizens, student volunteer groups, and grassroots organizers to mobilize for community welfare—from winter clothing distributions to tree plantations and emergency aid.
            </p>

            
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow UnityServe on X"
                className="w-10 h-10 rounded-[10px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-200 shadow-sm"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on Facebook"
                className="w-10 h-10 rounded-[10px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-200 shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on LinkedIn"
                className="w-10 h-10 rounded-[10px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-200 shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/devabunayem"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore GitHub Source"
                className="w-10 h-10 rounded-[10px] border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#2563EB] transition-all duration-200 shadow-sm"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Platform Discovery
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  Upcoming Social Events
                </Link>
              </li>
              <li>
                <Link href="/events/create" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  Host an Initiative
                </Link>
              </li>
              <li>
                <Link href="/events/joined" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  My Volunteer Record
                </Link>
              </li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Social Initiatives
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <Link href="/events?eventType=Winter%20Aid" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  Winter Aid & Blankets
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Cleanup" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  River & Urban Cleanups
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Plantation" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  Tree Plantations
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Blood%20Donation" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  Emergency Blood Camps
                </Link>
              </li>
              <li>
                <Link href="/events?eventType=Food%20Drive" className="hover:text-[#1E40AF] dark:hover:text-[#60A5FA] transition-colors">
                  Nutritious Food Drives
                </Link>
              </li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Coordination Desk
            </h4>
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                <span>Mirpur-10 & Mohammadpur Hubs, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
                <span>support@unityserve.org</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
                <span>+880 1712-345678</span>
              </div>
            </div>
          </div>
        </div>

        
        <div className="border-t border-[#E2E8F0] dark:border-[#1E293B] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 UnityServe Platform. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium">
            Design and Developed by <a href="https://abunayem.com" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] dark:text-[#60A5FA] font-semibold hover:underline">ABU NAYEM</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
