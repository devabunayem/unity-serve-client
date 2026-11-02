'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PrivateRoute } from '@/components/PrivateRoute';
import { EventGridSkeleton } from '@/components/Skeletons';
import {
  Calendar,
  MapPin,
  Tag,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Award,
  Ticket
} from 'lucide-react';
import { VolunteerPassModal } from '@/components/VolunteerPassModal';
import toast from 'react-hot-toast';

interface JoinedEventRecord {
  _id: string;
  eventId: string;
  eventTitle: string;
  eventLocation: string;
  eventDate: string;
  eventThumbnail: string;
  eventType: string;
  joinedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function JoinedEventsContent() {
  const { user, token } = useAuth();
  const [joinedList, setJoinedList] = useState<JoinedEventRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePassItem, setActivePassItem] = useState<JoinedEventRecord | null>(null);

  useEffect(() => {
    async function fetchJoinedEvents() {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE_URL}/events/user/my-joined`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.events)) {
          setJoinedList(data.events);
        }
      } catch {
        toast.error('Failed to load your joined events.');
      } finally {
        setLoading(false);
      }
    }

    fetchJoinedEvents();
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-[#B45309] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#F59E0B]/30 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Volunteer Participation Record</span>
          </div>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
            My Joined Initiatives
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tracking all social service events you have registered to attend, chronologically ordered by event date.
          </p>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-heading text-sm font-bold bg-[#1E40AF] text-white hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-all shadow-md w-fit"
        >
          <span>Find More Events</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      
      {loading ? (
        <EventGridSkeleton count={3} />
      ) : joinedList.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl border border-theme bg-card space-y-4">
          <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            You have not joined any events yet
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Ready to give back to society? Browse our upcoming drives and join fellow volunteers with one click.
          </p>
          <Link
            href="/events"
            className="inline-block px-5 py-2.5 rounded-xl font-heading text-sm font-semibold bg-[#1E40AF] hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] text-white"
          >
            Explore Active Drives
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-xs font-bold text-muted-foreground">
            You are enrolled in {joinedList.length} community initiative{joinedList.length > 1 ? 's' : ''} (Sorted by Date)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedList.map((item) => {
              const formattedDate = (() => {
                try {
                  return new Date(item.eventDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                } catch {
                  return item.eventDate;
                }
              })();

              return (
                <div
                  key={item._id}
                  className="rounded-3xl border border-theme bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between h-[390px]"
                >
                  <div className="relative h-44 overflow-hidden bg-black/10">
                    <img
                      src={item.eventThumbnail}
                      alt={item.eventTitle}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute top-3 left-3 bg-blue-600/90 dark:bg-blue-700/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                      <Tag className="w-3 h-3" />
                      <span>{item.eventType}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-emerald-600/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Registered</span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white line-clamp-2">
                        {item.eventTitle}
                      </h3>
                      <div className="space-y-1.5 text-xs text-muted-foreground mt-3 font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
                          <span className="text-foreground">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
                          <span className="truncate">{item.eventLocation}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/events/${item.eventId}`}
                        className="py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-200 hover:bg-[#1E40AF] hover:text-white dark:hover:bg-[#2563EB] text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span>Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                      <button
                        onClick={() => setActivePassItem(item)}
                        className="py-2.5 rounded-2xl bg-[#F59E0B] text-slate-900 hover:bg-[#D97706] hover:text-white dark:bg-[#FBBF24] dark:text-slate-900 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>View Pass</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      
      {activePassItem && (
        <VolunteerPassModal
          isOpen={!!activePassItem}
          onClose={() => setActivePassItem(null)}
          volunteerName={user?.name || 'Community Volunteer'}
          volunteerEmail={user?.email || ''}
          eventTitle={activePassItem.eventTitle}
          eventType={activePassItem.eventType}
          eventDate={activePassItem.eventDate}
          eventLocation={activePassItem.eventLocation}
        />
      )}

    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <PrivateRoute>
      <JoinedEventsContent />
    </PrivateRoute>
  );
}
