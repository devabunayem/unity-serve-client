'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EventCard, EventData } from '@/components/EventCard';
import { EventGridSkeleton } from '@/components/Skeletons';
import { Search, Filter, Calendar, Sparkles } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const CATEGORIES = [
  'All',
  'Cleanup',
  'Plantation',
  'Donation',
  'Winter Aid',
  'Blood Donation',
  'Food Drive',
  'Education & Literacy',
  'Healthcare & Medical',
];

function UpcomingEventsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('eventType') || 'All';

  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'All') {
          queryParams.set('eventType', selectedCategory);
        }
        if (searchQuery.trim()) {
          queryParams.set('search', searchQuery.trim());
        }

        const res = await fetch(`${API_BASE_URL}/events/upcoming?${queryParams.toString()}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Failed to load upcoming events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchEvents();
    }, 250);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/60 text-xs font-bold text-[#1E40AF] dark:text-[#60A5FA]">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Active Volunteer Opportunities</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          Upcoming Community Events
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore upcoming social service initiatives happening in your area. Every initiative is filtered in real-time so only future active drives appear here.
        </p>
      </div>

      
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-[14px] border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-sm">
        
        
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or location..."
            className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] shadow-xs"
          />
        </div>

        
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-[10px] text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E40AF] text-white shadow-sm'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      
      {loading ? (
        <EventGridSkeleton count={6} />
      ) : events.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-[14px] border border-slate-200/80 dark:border-white/10 bg-card space-y-4">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            No upcoming events found
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            {searchQuery
              ? `No events match "${searchQuery}". Try a different keyword or reset filters.`
              : 'There are currently no scheduled events in this category. Be the first to organize one!'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs font-semibold text-muted-foreground">
            Showing {events.length} upcoming initiative{events.length > 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default function UpcomingEventsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EventGridSkeleton count={6} />
      </div>
    }>
      <UpcomingEventsContent />
    </Suspense>
  );
}
