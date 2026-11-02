'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { PrivateRoute } from '@/components/PrivateRoute';
import {
  Calendar,
  MapPin,
  Image as ImageIcon,
  Tag,
  AlignLeft,
  Type,
  PlusCircle,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const EVENT_TYPES = [
  'Cleanup',
  'Plantation',
  'Donation',
  'Winter Aid',
  'Blood Donation',
  'Food Drive',
  'Education & Literacy',
  'Healthcare & Medical',
  'Other Social Work'
];

function CreateEventForm() {
  const { user, token } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState(EVENT_TYPES[0]);
  const [thumbnail, setThumbnail] = useState('');
  const [location, setLocation] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minDateString = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || title.trim().length < 3) {
      toast.error('Title must be at least 3 characters long.');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      toast.error('Description must be at least 10 characters long.');
      return;
    }
    if (!location.trim() || location.trim().length < 3) {
      toast.error('Location is required.');
      return;
    }
    if (!thumbnail.trim() || !thumbnail.startsWith('http')) {
      toast.error('Please provide a valid image URL starting with http:// or https://');
      return;
    }
    if (!eventDate) {
      toast.error('Event date is required.');
      return;
    }

    const selected = new Date(eventDate);
    const now = new Date();
    if (selected <= now) {
      toast.error('Event date must be strictly in the future. Past dates are forbidden.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        eventType,
        thumbnail: thumbnail.trim(),
        location: location.trim(),
        eventDate,
      };

      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Event Created Successfully! Your initiative is now live.');
        router.push('/events');
      } else {
        toast.error(data.message || (data.errors && data.errors[0]) || 'Failed to create event.');
      }
    } catch {
      toast.error('Server communication error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      
      <div>
        <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
          Host a New Social Initiative
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Mobilize volunteers, raise awareness, and make a tangible difference in your community.
        </p>
      </div>

      
      <div className="p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Event Title
            </label>
            <div className="relative">
              <Type className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Winter Clothes Distribution – Mirpur 10, Dhaka"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
                Event Category
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] cursor-pointer"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
                Event Date <span className="font-normal lowercase text-muted-foreground">(Future Only)</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="date"
                  min={minDateString}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            </div>

          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
                Assembly Location
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Mohammadpur Town Hall Ground, Dhaka"
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
                Thumbnail Image URL
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="url"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  required
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                />
              </div>
            </div>

          </div>

          
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Event Description & Volunteer Brief
            </label>
            <div className="relative">
              <AlignLeft className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the mission, items needed, target beneficiaries, and volunteer requirements..."
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          
          <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-xs text-foreground">
            <Info className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] shrink-0" />
            <span>
              This initiative will be associated with your account ({user?.email}) as the verified organizer.
            </span>
          </div>

          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-2xl font-heading text-sm font-bold bg-[#1E40AF] text-white hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isSubmitting ? 'Publishing Initiative...' : 'Publish Event'}</span>
          </button>

        </form>
      </div>

    </div>
  );
}

export default function CreateEventPage() {
  return (
    <PrivateRoute>
      <CreateEventForm />
    </PrivateRoute>
  );
}

