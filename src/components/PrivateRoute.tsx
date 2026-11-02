'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      const redirectUrl = pathname ? `/login?redirect=${encodeURIComponent(pathname)}` : '/login';
      router.push(redirectUrl);
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-3 shadow-xl">
            <img
              src="/logo-icon.png"
              alt="UnityServe Logo"
              className="w-10 h-10 object-contain animate-pulse"
            />
          </div>
          <div className="absolute -inset-1 rounded-2xl border-2 border-[#2563EB]/40 animate-ping opacity-35 pointer-events-none" />
        </div>
        <p className="font-heading text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide">
          Verifying secure session...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
