import React from 'react';

export function EventCardSkeleton() {
  return (
    <div className="rounded-2xl border border-theme bg-card overflow-hidden shadow-sm animate-pulse flex flex-col h-[420px]">
      <div className="w-full h-48 bg-black/10 dark:bg-white/10" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-black/10 dark:bg-white/10 rounded-full" />
          <div className="h-6 w-3/4 bg-black/10 dark:bg-white/10 rounded-md" />
          <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded-md" />
        </div>
        <div className="space-y-3 pt-4 border-t border-theme">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10" />
            <div className="h-3 w-32 bg-black/10 dark:bg-white/10 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-black/10 dark:bg-white/10" />
            <div className="h-3 w-28 bg-black/10 dark:bg-white/10 rounded" />
          </div>
          <div className="h-10 w-full bg-black/10 dark:bg-white/10 rounded-xl mt-2" />
        </div>
      </div>
    </div>
  );
}

export function EventGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="w-full rounded-2xl border border-theme bg-card overflow-hidden animate-pulse">
      <div className="h-14 bg-black/5 dark:bg-white/5 border-b border-theme" />
      <div className="divide-y divide-theme">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-black/10 dark:bg-white/10" />
              <div className="space-y-1.5">
                <div className="h-4 w-40 bg-black/10 dark:bg-white/10 rounded" />
                <div className="h-3 w-24 bg-black/10 dark:bg-white/10 rounded" />
              </div>
            </div>
            <div className="h-4 w-28 bg-black/10 dark:bg-white/10 rounded hidden sm:block" />
            <div className="h-8 w-20 bg-black/10 dark:bg-white/10 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

