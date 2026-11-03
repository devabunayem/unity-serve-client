'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import {
  Calendar,
  MapPin,
  Tag,
  Users,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Share2,
  ChevronRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

interface EventDetail {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  creatorName?: string;
  creatorPhoto?: string;
  participantsCount?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function EventDetailsContent() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const searchParams = useSearchParams();
  const autoJoin = searchParams?.get('autoJoin') === 'true';
  const { user, token } = useAuth();

  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJoined, setIsJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await fetch(`${API_BASE_URL}/events/${id}`);
        const data = await res.json();
        if (data.success && data.event) {
          setEvent(data.event);
        } else {
          toast.error(data.message || 'Event not found.');
        }
      } catch (err) {
        toast.error('Unable to retrieve event information.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchEventData();
    }
  }, [id]);

  useEffect(() => {
    async function checkJoinStatus() {
      if (!user || !token || !id) return;
      try {
        const res = await fetch(`${API_BASE_URL}/events/${id}/is-joined`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setIsJoined(data.isJoined);
        }
      } catch {
      }
    }
    checkJoinStatus();
  }, [id, user, token]);

  const isCreator = user && event && user.email === event.creatorEmail;

  const handleJoinEvent = async () => {
    if (!user) {
      toast('Please login to join this volunteer drive.', { icon: '🔒' });
      router.push(`/login?redirect=${encodeURIComponent(`/events/${id}?autoJoin=true`)}`);
      return;
    }

    if (isCreator) {
      toast.error('You are hosting this event and cannot register as a volunteer.');
      return;
    }

    if (isJoined) {
      toast('You are already registered for this event!', { icon: 'ℹ️' });
      return;
    }

    setJoining(true);
    try {
      const res = await fetch(`${API_BASE_URL}/events/${id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setIsJoined(true);
        if (event) {
          setEvent({
            ...event,
            participantsCount: (event.participantsCount || 0) + 1,
          });
        }
        toast.success('Successfully registered for this initiative!');
      } else {
        toast.error(data.message || 'Failed to join event.');
      }
    } catch {
      toast.error('Unable to complete event registration.');
    } finally {
      setJoining(false);
    }
  };

  useEffect(() => {
    if (autoJoin && user && token && event && !isJoined && !joining && !isCreator) {
      handleJoinEvent();
    }
  }, [autoJoin, user, token, event, isJoined]);

  const formattedDate = (() => {
    if (!event?.eventDate) return '';
    try {
      const d = new Date(event.eventDate);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return event.eventDate;
    }
  })();

  const creatorAvatar =
    event?.creatorPhoto ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(event?.creatorEmail || 'organizer')}`;

  const creatorDisplayName = event?.creatorName || event?.creatorEmail?.split('@')[0] || 'Community Leader';

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse space-y-8">
        <div className="h-6 w-48 bg-black/10 dark:bg-white/10 rounded-[8px]" />
        <div className="w-full h-80 sm:h-96 bg-black/10 dark:bg-white/10 rounded-[14px]" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="h-10 w-3/4 bg-black/10 dark:bg-white/10 rounded-[10px]" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-black/10 dark:bg-white/10 rounded-[10px]" />
              ))}
            </div>
            <div className="h-44 bg-black/10 dark:bg-white/10 rounded-[14px]" />
          </div>
          <div className="lg:col-span-4">
            <div className="h-80 bg-black/10 dark:bg-white/10 rounded-[14px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-5">
        <div className="w-14 h-14 mx-auto rounded-[14px] bg-rose-500/10 flex items-center justify-center text-rose-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">Event Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          The requested volunteer drive might have been removed, concluded, or does not exist.
        </p>
        <Link
          href="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] font-heading text-sm font-bold glass-btn-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Upcoming Drives</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link href="/events" className="hover:text-foreground transition-colors">
            Upcoming Events
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[#1E40AF] dark:text-[#60A5FA] font-bold truncate max-w-[200px] sm:max-w-xs">
            {event.eventType}
          </span>
        </div>

        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E40AF] dark:text-[#60A5FA] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Events</span>
        </Link>
      </div>

      
      <div className="relative w-full h-72 sm:h-96 rounded-[14px] overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-xl bg-slate-950 group">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        
        <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
          <div className="bg-white/95 dark:bg-slate-950/90 backdrop-blur-md text-[#1E40AF] dark:text-[#60A5FA] border border-blue-200/80 dark:border-blue-900/60 px-3.5 py-1.5 rounded-[8px] text-xs font-bold flex items-center gap-1.5 shadow-md">
            <Tag className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
            <span>{event.eventType}</span>
          </div>

          <div className="bg-emerald-500/95 text-white backdrop-blur-md px-3 py-1.5 rounded-[8px] text-xs font-bold flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>Open for Volunteers</span>
          </div>
        </div>

        
        <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
          <div className="flex items-center gap-2 text-xs text-white/80 font-medium">
            <Calendar className="w-3.5 h-3.5 text-blue-300" />
            <span>{formattedDate}</span>
            <span>•</span>
            <MapPin className="w-3.5 h-3.5 text-blue-300" />
            <span className="truncate">{event.location}</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-md">
            {event.title}
          </h1>
        </div>
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        
        <div className="lg:col-span-8 space-y-8">
          
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-[10px] border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xs space-y-1">
              <Calendar className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Date</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{event.eventDate}</p>
            </div>

            <div className="p-4 rounded-[10px] border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xs space-y-1">
              <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Location</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{event.location}</p>
            </div>

            <div className="p-4 rounded-[10px] border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xs space-y-1">
              <Tag className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Category</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{event.eventType}</p>
            </div>

            <div className="p-4 rounded-[10px] border border-slate-200/80 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md shadow-xs space-y-1">
              <Users className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Volunteers</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {event.participantsCount || 0} Registered
              </p>
            </div>
          </div>

          
          <div className="p-6 sm:p-8 rounded-[14px] border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-xl shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-[8px] bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-center text-[#2563EB] dark:text-[#60A5FA]">
                <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              </div>
              <h3 className="font-heading text-lg font-extrabold text-slate-900 dark:text-white">
                About This Volunteer Initiative
              </h3>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          
          <div className="p-6 sm:p-7 rounded-[14px] border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-xl shadow-sm space-y-4">
            <h3 className="font-heading text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6]" />
              <span>What to Know Before You Arrive</span>
            </h3>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Arrive 15 Minutes Early</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    A brief safety and coordination walkthrough takes place before starting fieldwork.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Materials & Badges Provided</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Necessary safety gear, gloves, and campaign badges are supplied directly by the organizers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Verified Participation Certificate</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Attending volunteers receive a certified community participation badge on their profile.
                  </p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="p-6 rounded-[14px] border border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/75 backdrop-blur-xl shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <img
                src={creatorAvatar}
                alt={creatorDisplayName}
                className="w-13 h-13 rounded-[10px] object-cover border-2 border-[#2563EB]/40 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-[#1E40AF] dark:text-[#60A5FA] uppercase tracking-wider">
                  Event Organizer
                </p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                  {creatorDisplayName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{event.creatorEmail}</p>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/60 text-xs text-[#1E40AF] dark:text-[#60A5FA] font-bold shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Host</span>
            </div>
          </div>

        </div>

        
        <div className="lg:col-span-4 sticky top-28 space-y-5">
          <div className="p-6 sm:p-7 rounded-[14px] border border-slate-200/90 dark:border-white/10 bg-white/90 dark:bg-slate-900/85 backdrop-blur-2xl shadow-xl space-y-6">
            
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>100% Free Volunteer Registration</span>
              </div>
              <p className="font-heading text-xl font-extrabold text-slate-900 dark:text-white mt-3">
                Volunteer Pass
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Reserve your spot in this community drive.
              </p>
            </div>

            
            <div className="space-y-3.5 pt-4 border-t border-slate-200/70 dark:border-slate-800/80 text-xs">
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Scheduled Date</p>
                  <p className="text-slate-500 dark:text-slate-400">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Assembly Location</p>
                  <p className="text-slate-500 dark:text-slate-400">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">Volunteers Joined</p>
                  <p className="text-slate-500 dark:text-slate-400 font-semibold">
                    {event.participantsCount || 0} Volunteers Ready
                  </p>
                </div>
              </div>
            </div>

            
            <div className="pt-2 space-y-2.5">
              {isJoined ? (
                <div className="space-y-2">
                  <div className="w-full py-3.5 px-4 rounded-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-heading text-sm font-bold flex items-center justify-center gap-2 text-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>You Have Joined This Drive</span>
                  </div>
                  <Link
                    href="/events/joined"
                    className="block text-center text-xs font-bold text-[#1E40AF] dark:text-[#60A5FA] hover:underline"
                  >
                    View in My Joined Events →
                  </Link>
                </div>
              ) : isCreator ? (
                <div className="space-y-2">
                  <div className="w-full py-3.5 px-4 rounded-[10px] bg-blue-500/10 border border-blue-500/30 text-[#1E40AF] dark:text-[#60A5FA] font-heading text-sm font-bold flex items-center justify-center gap-2 text-center">
                    <ShieldCheck className="w-5 h-5 shrink-0" />
                    <span>You are Hosting This Event</span>
                  </div>
                  <Link
                    href="/events/manage"
                    className="block text-center text-xs font-bold text-[#1E40AF] dark:text-[#60A5FA] hover:underline"
                  >
                    Manage Event in Dashboard →
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleJoinEvent}
                  disabled={joining}
                  type="button"
                  className="w-full py-4 px-6 rounded-[10px] font-heading text-sm font-extrabold text-white bg-gradient-to-r from-[#1E40AF] to-[#2563EB] hover:from-[#1D4ED8] hover:to-[#1E40AF] transition-all duration-200 shadow-md hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
                >
                  <Users className="w-4 h-4" />
                  <span>{joining ? 'Securing Spot...' : 'Join Event as Volunteer'}</span>
                </button>
              )}

              {!user && !isJoined && (
                <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 leading-tight">
                  🔒 Click to Sign In / Sign Up and join this initiative.
                </p>
              )}
            </div>

            
            <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/80">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Event link copied to clipboard!');
                }}
                className="w-full py-2.5 px-4 rounded-[10px] border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share This Initiative</span>
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-16 animate-pulse space-y-8">
          <div className="h-6 w-48 bg-black/10 dark:bg-white/10 rounded-[8px]" />
          <div className="w-full h-80 sm:h-96 bg-black/10 dark:bg-white/10 rounded-[14px]" />
        </div>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}
