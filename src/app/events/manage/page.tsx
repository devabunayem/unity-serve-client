'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { PrivateRoute } from '@/components/PrivateRoute';
import { TableSkeleton } from '@/components/Skeletons';
import {
  FolderKanban,
  Edit3,
  Trash2,
  PlusCircle,
  ExternalLink,
  X,
  Save
} from 'lucide-react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface EventItem {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
}

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

function ManageEventsContent() {
  const { user, token } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editType, setEditType] = useState(EVENT_TYPES[0]);
  const [editThumb, setEditThumb] = useState('');
  const [editLoc, setEditLoc] = useState('');
  const [editDate, setEditDate] = useState('');
  const [savingEdit, setSavingEdit] = useState(false);

  const loadMyEvents = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/events/user/my-events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEvents(data.events);
      }
    } catch {
      toast.error('Failed to load your organized events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyEvents();
  }, [token]);

  const openEditModal = (event: EventItem) => {
    setEditingEvent(event);
    setEditTitle(event.title);
    setEditDesc(event.description);
    setEditType(event.eventType);
    setEditThumb(event.thumbnail);
    setEditLoc(event.location);
    setEditDate(event.eventDate);
  };

  const closeEditModal = () => {
    setEditingEvent(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvent || !token) return;

    if (!editTitle.trim() || editTitle.trim().length < 3) {
      toast.error('Title must be at least 3 characters long.');
      return;
    }
    if (!editDesc.trim() || editDesc.trim().length < 10) {
      toast.error('Description must be at least 10 characters long.');
      return;
    }
    if (!editDate) {
      toast.error('Event date is required.');
      return;
    }

    const selected = new Date(editDate);
    const now = new Date();
    if (selected <= now) {
      toast.error('Updated event date must be in the future.');
      return;
    }

    setSavingEdit(true);
    try {
      const payload = {
        title: editTitle.trim(),
        description: editDesc.trim(),
        eventType: editType,
        thumbnail: editThumb.trim(),
        location: editLoc.trim(),
        eventDate: editDate,
      };

      const res = await fetch(`${API_BASE_URL}/events/${editingEvent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        toast.success('Event updated successfully!');
        closeEditModal();
        loadMyEvents();
      } else {
        toast.error(data.message || 'Failed to update event.');
      }
    } catch {
      toast.error('Update operation failed.');
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: 'Delete this initiative?',
      text: `Are you sure you want to remove "${title}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, Delete Event',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl border border-theme bg-card text-foreground',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_BASE_URL}/events/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The event has been successfully removed.',
              timer: 1800,
              showConfirmButton: false,
            });
            loadMyEvents();
          } else {
            toast.error(data.message || 'Failed to delete event.');
          }
        } catch {
          toast.error('Delete request failed.');
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white">
            Manage My Organized Events
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Review, edit logistics, or remove social initiatives hosted by your account.
          </p>
        </div>

        <Link
          href="/events/create"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-heading text-sm font-bold bg-[#1E40AF] text-white hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-all shadow-md w-fit"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Host New Event</span>
        </Link>
      </div>

      
      {loading ? (
        <TableSkeleton rows={5} />
      ) : events.length === 0 ? (
        <div className="text-center py-20 p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] space-y-4">
          <FolderKanban className="w-12 h-12 mx-auto text-slate-400 opacity-50" />
          <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
            You have not hosted any events yet
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Take leadership in your neighborhood! Create your first community drive today.
          </p>
          <Link
            href="/events/create"
            className="inline-block px-6 py-2.5 rounded-2xl font-heading text-sm font-bold bg-[#1E40AF] text-white dark:bg-[#2563EB]"
          >
            Create Event Now
          </Link>
        </div>
      ) : (
        <div className="rounded-3xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#152238] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F8FAFC] dark:bg-[#0F172A] border-b border-[#E2E8F0] dark:border-[#1E293B] text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
                <tr>
                  <th className="px-6 py-4">Event Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Scheduled Date</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#1E293B]">
                {events.map((ev) => (
                  <tr key={ev._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ev.thumbnail}
                          alt={ev.title}
                          className="w-12 h-12 rounded-2xl object-cover shrink-0 border border-[#E2E8F0] dark:border-[#1E293B]"
                        />
                        <div className="max-w-xs">
                          <p className="font-bold text-slate-900 dark:text-white line-clamp-1">
                            {ev.title}
                          </p>
                          <Link
                            href={`/events/${ev._id}`}
                            className="text-xs text-[#2563EB] dark:text-[#3B82F6] hover:underline flex items-center gap-1 mt-0.5"
                          >
                            <span>Public Page</span>
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </td>

                    
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-[#B45309] dark:text-[#FBBF24] border border-[#FDE68A] dark:border-[#F59E0B]/30 whitespace-nowrap">
                        {ev.eventType}
                      </span>
                    </td>

                    
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {ev.eventDate}
                    </td>

                    
                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 max-w-[180px] truncate">
                      {ev.location}
                    </td>

                    
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(ev)}
                          title="Edit Event"
                          className="p-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] hover:bg-[#1E40AF] hover:text-white transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ev._id, ev.title)}
                          title="Delete Event"
                          className="p-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-50 dark:bg-[#0B0F17] text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl border border-theme bg-card p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            <div className="flex items-center justify-between border-b border-theme pb-4">
              <h2 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                Update Event Information
              </h2>
              <button
                onClick={closeEditModal}
                className="p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Title
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-theme bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A85B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Category
                  </label>
                  <select
                    value={editType}
                    onChange={(e) => setEditType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-theme bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A85B]"
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Event Date (Future Only)
                  </label>
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-theme bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A85B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editLoc}
                    onChange={(e) => setEditLoc(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-theme bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A85B]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Thumbnail URL
                  </label>
                  <input
                    type="url"
                    value={editThumb}
                    onChange={(e) => setEditThumb(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-theme bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A85B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editDesc}
                  onChange={(e) => setEditDesc(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-theme bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-[#D8A85B]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-theme">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-5 py-2.5 rounded-xl border border-theme text-foreground hover:bg-black/5 dark:hover:bg-white/5 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-6 py-2.5 rounded-2xl font-heading text-sm font-bold bg-[#1E40AF] text-white hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-colors shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingEdit ? 'Saving...' : 'Save Updates'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <PrivateRoute>
      <ManageEventsContent />
    </PrivateRoute>
  );
}

