'use client';

import React from 'react';
import { CheckCircle, Printer, X, ShieldCheck } from 'lucide-react';

interface VolunteerPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  volunteerName: string;
  volunteerEmail: string;
  eventTitle: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
}

export function VolunteerPassModal({
  isOpen,
  onClose,
  volunteerName,
  volunteerEmail,
  eventTitle,
  eventType,
  eventDate,
  eventLocation,
}: VolunteerPassModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl border border-amber-400/50 glass-panel p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
        
        
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <img src="/logo-icon.png" alt="Crest" className="w-56 h-56 object-contain" />
        </div>

        
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        
        <div className="text-center space-y-2 border-b border-[#E2E8F0] dark:border-[#1E293B] pb-5">
          <div className="flex justify-center mb-2">
            <img
              src="/logo.png"
              alt="UnityServe Logo"
              className="h-10 w-auto object-contain dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="UnityServe Logo"
              className="h-10 w-auto object-contain hidden dark:block"
            />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#B45309] dark:text-[#FBBF24]">
            Official Participation Credential
          </span>
          <h3 className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white">
            Volunteer Service Pass
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Issued by UnityServe Community Impact Network
          </p>
        </div>

        
        <div className="space-y-4 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-[#F8FAFC] dark:bg-[#0F172A] border border-[#E2E8F0] dark:border-[#1E293B] flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Registered Volunteer</p>
              <p className="font-heading text-sm font-bold text-slate-900 dark:text-white">{volunteerName}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{volunteerEmail}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] flex items-center gap-1 border border-emerald-500/20">
              <CheckCircle className="w-3 h-3" />
              Verified RSVP
            </span>
          </div>

          <div className="space-y-2 p-4 rounded-2xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0B0F17]">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Social Initiative</p>
              <p className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{eventTitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B]">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Category</p>
                <p className="font-semibold text-foreground">{eventType}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Scheduled Date</p>
                <p className="font-semibold text-foreground">{eventDate}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#1E293B]">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Assembly Venue</p>
              <p className="font-medium text-foreground">{eventLocation}</p>
            </div>
          </div>

        </div>

        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1.5 text-[11px] text-[#2563EB] dark:text-[#3B82F6] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Community Stamp</span>
          </div>

          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 rounded-2xl font-heading text-xs font-bold bg-[#1E40AF] text-white hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>

      </div>
    </div>
  );
}

