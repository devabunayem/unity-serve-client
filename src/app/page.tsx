'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  ArrowRight,
  Sparkles,
  Send,
  Star
} from 'lucide-react';
import { EventCard, EventData } from '@/components/EventCard';
import { EventGridSkeleton } from '@/components/Skeletons';
import HowItWorks from '@/components/ui/how-it-works';
import { toast } from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function HomePage() {
  const [recentEvents, setRecentEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentEvents() {
      try {
        const res = await fetch(`${API_BASE_URL}/events/upcoming?limit=6`);
        const data = await res.json();
        if (data.success && Array.isArray(data.events)) {
          setRecentEvents(data.events);
        }
      } catch (err) {
        console.error('Failed to load recent events:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentEvents();
  }, []);

  return (
    <div className="w-full">
      
      
      <section id="home" className="relative overflow-hidden min-h-screen -mt-24 sm:-mt-28 pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 flex flex-col justify-center border-b border-[#E2E8F0] dark:border-[#1E293B]">
        
        
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=85"
            alt="UnityServe Community Volunteers Together"
            className="w-full h-full object-cover object-center"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/35 to-white/55 dark:from-[#0B0F17]/80 dark:via-[#0B0F17]/65 dark:to-[#0B0F17]/85" />
        </div>

        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
          <div className="max-w-4xl mx-auto space-y-7 text-center">
            
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.85rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14] text-center max-w-3xl mx-auto drop-shadow-sm">
              Bringing People Together for Real <span className="text-[#1E40AF] dark:text-[#3B82F6]">Social Impact</span>.
            </h1>

            
            <p className="text-base sm:text-lg text-slate-800 dark:text-slate-100 leading-relaxed max-w-2xl mx-auto font-medium text-center drop-shadow-sm">
              Discover, organize, and join impactful volunteer initiatives in your neighborhood. From winter clothing drives across Dhaka to urban tree plantations and emergency medical camps—every small step builds a better community.
            </p>

            
            <div className="flex items-center justify-center pt-2">
              <Link
                href="/events"
                className="px-8 py-3.5 rounded-[10px] font-heading text-sm font-bold glass-btn-primary flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Upcoming Drives</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            
            <div id="impact" className="scroll-mt-32 pt-10 border-t border-slate-300/70 dark:border-slate-800/80 max-w-3xl mx-auto space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 sm:p-5 rounded-[14px] glass-card text-center">
                  <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1E40AF] dark:text-[#3B82F6]">
                    2,500+
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Active Volunteers
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-[14px] glass-card text-center">
                  <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#1E40AF] dark:text-[#3B82F6]">
                    120+
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Community Drives
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-[14px] glass-card text-center">
                  <p className="font-heading text-2xl sm:text-3xl font-extrabold text-[#F59E0B] dark:text-[#FBBF24]">
                    25k+
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Lives Impacted
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-[14px] glass-card text-center">
                  <p className="font-heading text-2xl sm:text-3xl font-extrabold text-amber-500 flex items-center justify-center gap-1.5">
                    <Star className="w-5 h-5 fill-amber-500" /> 4.9
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Community Rating
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <section id="how-it-works" className="scroll-mt-28 py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          
          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4 mb-4 sm:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>How UnityServe Works</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
              Your Volunteer Journey from Discovery to{' '}
              <span className="bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
                Certified Impact
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Follow the pinned roadmap below. From discovering verified grassroots drives in Dhaka to receiving your official credential, see how easy it is to show up and make a difference.
            </p>
          </div>

          
          <HowItWorks />

        </div>
      </section>

      
      <section id="upcoming-events" className="scroll-mt-24 sm:scroll-mt-28 py-20 lg:py-28 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-md border-y border-slate-200/60 dark:border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-blue-50 dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-900/60 text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA] shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Verified Community Drives</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Recent Upcoming{' '}
                <span className="bg-gradient-to-r from-[#1E40AF] via-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Join verified community service initiatives happening in the coming weeks. Step up, participate, and help build a stronger community.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-800 text-xs sm:text-sm font-bold text-[#1E40AF] dark:text-[#60A5FA] shadow-xs hover:shadow-md transition-all shrink-0 group/all"
            >
              <span>Browse All Events</span>
              <ArrowRight className="w-4 h-4 group-hover/all:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {loading ? (
            <EventGridSkeleton count={6} />
          ) : recentEvents.length === 0 ? (
            <div className="text-center py-16 p-8 rounded-[14px] glass-card space-y-4 shadow-sm border border-slate-200/80 dark:border-white/10">
              <Calendar className="w-12 h-12 mx-auto text-slate-400 opacity-50" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No upcoming events right now</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Be the first community leader to host a social initiative in your locality!
              </p>
              <Link
                href="/events/create"
                className="inline-block px-6 py-2.5 rounded-[10px] font-heading text-sm font-bold glass-btn-primary"
              >
                Create First Event
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {recentEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>

      
      <section id="gallery" className="scroll-mt-28 py-20 lg:py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <p className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Moments on the Ground
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Our Volunteers in Action
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              A glimpse of community-driven compassion, environmental restoration, and relief efforts across Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="relative rounded-[14px] overflow-hidden group glass-card h-72 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80"
                alt="Winter clothes collection and packaging"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 p-4 rounded-[10px] bg-black/55 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                <p className="font-heading font-bold text-sm">Winter Clothing Distribution</p>
                <p className="text-white/80 text-xs mt-0.5">Mirpur-10, Dhaka</p>
              </div>
            </div>

            <div className="relative rounded-[14px] overflow-hidden group glass-card h-72 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1576085898323-218337e3e43c?auto=format&fit=crop&w=800&q=80"
                alt="Community tree plantation drive"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 p-4 rounded-[10px] bg-black/55 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                <p className="font-heading font-bold text-sm">Urban Green Plantation</p>
                <p className="text-white/80 text-xs mt-0.5">Ramna Park, Dhaka</p>
              </div>
            </div>

            <div className="relative rounded-[14px] overflow-hidden group glass-card h-72 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80"
                alt="Buriganga river cleanup drive"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 p-4 rounded-[10px] bg-black/55 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                <p className="font-heading font-bold text-sm">Riverfront Plastic Cleanup</p>
                <p className="text-white/80 text-xs mt-0.5">Sadarghat Terminal, Dhaka</p>
              </div>
            </div>

            <div className="relative rounded-[14px] overflow-hidden group glass-card h-72 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=800&q=80"
                alt="Free blood donation camp"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 p-4 rounded-[10px] bg-black/55 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                <p className="font-heading font-bold text-sm">Voluntary Blood Camp</p>
                <p className="text-white/80 text-xs mt-0.5">Dhanmondi, Dhaka</p>
              </div>
            </div>

            <div className="relative rounded-[14px] overflow-hidden group glass-card h-72 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
                alt="Children reading books in community learning space"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 p-4 rounded-[10px] bg-black/55 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                <p className="font-heading font-bold text-sm">Slum Youth Literacy Mission</p>
                <p className="text-white/80 text-xs mt-0.5">Korail Bosti, Mohakhali</p>
              </div>
            </div>

            <div className="relative rounded-[14px] overflow-hidden group glass-card h-72 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/80 dark:border-white/10">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80"
                alt="Blanket and meal distribution to roadside families"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-3.5 bottom-3.5 p-4 rounded-[10px] bg-black/55 backdrop-blur-xl border border-white/20 shadow-xl text-white">
                <p className="font-heading font-bold text-sm">Warm Blankets for Needy</p>
                <p className="text-white/80 text-xs mt-0.5">Mohammadpur Town Hall, Dhaka</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <section className="py-20 lg:py-24 bg-transparent border-t border-white/60 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[14px] border border-white/30 dark:border-white/15 bg-gradient-to-br from-[#1E40AF]/85 via-[#1D4ED8]/85 to-[#0F172A]/90 dark:from-[#152238]/85 dark:via-[#0F172A]/85 dark:to-[#0B0F17]/90 backdrop-blur-2xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_25px_60px_rgba(30,64,175,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]">
            
            
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-400/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-white/15 backdrop-blur-md text-xs font-bold text-[#FBBF24] border border-white/20">
                <Send className="w-3.5 h-3.5" />
                <span>Stay Informed on Local Drives</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight">
                Get Notified About Upcoming Social Drives in Your Area
              </h2>

              <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
                Subscribe to our bi-weekly volunteer digest. Receive announcements for emergency relief distributions, weekend plantations, and blood donation drives directly in your inbox.
              </p>

              
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  form.reset();
                  toast.success('Thank you for subscribing to UnityServe volunteer updates!');
                }}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2"
              >
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full px-5 py-3.5 rounded-[10px] bg-white/15 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-sm backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[10px] font-heading text-sm font-bold glass-btn-accent shrink-0 cursor-pointer"
                >
                  Subscribe
                </button>
              </form>

              <p className="text-xs text-blue-200/70 pt-1">
                We respect your privacy. No spam, ever. Unsubscribe anytime with a single click.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
