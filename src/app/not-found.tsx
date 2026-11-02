'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 flex items-center justify-center mx-auto shadow-md">
          <img src="/logo-icon.png" alt="UnityServe" className="w-10 h-10 object-contain" />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6]">
            404 · Page Not Found
          </p>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
            Lost Your Way?
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            The community service page you are looking for does not exist or may have been moved.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-[10px] font-heading text-sm font-semibold bg-[#1E40AF] text-white hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/events"
            className="w-full sm:w-auto px-5 py-2.5 rounded-[10px] font-heading text-sm font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Upcoming Drives</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
