'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Tag, ArrowRight, Users } from 'lucide-react';

export interface EventData {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail?: string;
  creatorName?: string;
  creatorPhoto?: string;
  participantsCount?: number;
}

export function EventCard({ event }: { event: EventData }) {
  const formattedDate = (() => {
    try {
      const d = new Date(event.eventDate);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return event.eventDate;
    }
  })();

  const creatorAvatar =
    event.creatorPhoto ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(event.creatorEmail || event.creatorName || 'volunteer')}`;

  const creatorDisplayName = event.creatorName || event.creatorEmail?.split('@')[0] || 'Community Host';

  return (
    <div className="group rounded-[14px] border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 backdrop-blur-xl shadow-md hover:shadow-2xl hover:-translate-y-1.5 hover:border-[#2563EB]/40 dark:hover:border-[#3B82F6]/40 transition-all duration-300 flex flex-col h-[480px] overflow-hidden">
      
      
      <div className="relative w-full h-52 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';
          }}
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

        
        <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md text-[#1E40AF] dark:text-[#60A5FA] border border-blue-200/70 dark:border-blue-900/60 px-3 py-1 rounded-[8px] text-xs font-bold flex items-center gap-1.5 shadow-sm">
          <Tag className="w-3 h-3 text-[#2563EB] dark:text-[#3B82F6]" />
          <span>{event.eventType}</span>
        </div>

        
        <div className="absolute top-3 right-3 bg-emerald-500/90 text-white backdrop-blur-md px-2.5 py-1 rounded-[8px] text-[11px] font-bold flex items-center gap-1 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>Active Drive</span>
        </div>

        
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white/95 px-2.5 py-1 rounded-[6px] text-[11px] font-semibold flex items-center gap-1.5 border border-white/15">
          <Users className="w-3.5 h-3.5 text-blue-300" />
          <span>{event.participantsCount || 0} Volunteers Joined</span>
        </div>
      </div>

      
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        
        
        <div className="space-y-3">
          
          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 truncate max-w-[170px]">
              <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          
          <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
            {event.title}
          </h3>

          
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        
        <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between gap-3 mt-4">
          
          
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={creatorAvatar}
              alt={creatorDisplayName}
              className="w-7 h-7 rounded-[6px] object-cover border border-slate-200 dark:border-slate-700 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 leading-tight">
                Hosted by
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate leading-tight">
                {creatorDisplayName}
              </p>
            </div>
          </div>

          
          <Link
            href={`/events/${event._id}`}
            className="rounded-[10px] bg-[#1E40AF] hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] text-white px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs hover:shadow-md cursor-pointer shrink-0 group/btn"
          >
            <span>View Event</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>

        </div>
      </div>
    </div>
  );
}
