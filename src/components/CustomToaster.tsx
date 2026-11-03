'use client';

import React from 'react';
import { Toaster, ToastBar } from 'react-hot-toast';

export function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 4000,
        className: 'apple-toast',
        success: {
          className: 'apple-toast apple-toast-success',
        },
        error: {
          className: 'apple-toast apple-toast-error',
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible
              ? 'appleToastEnter 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              : 'appleToastExit 0.32s cubic-bezier(0.4, 0, 0.2, 1) forwards',
          }}
        >
          {({ icon, message }: { icon?: React.ReactNode; message: React.ReactNode }) => (
            <div className="flex items-center gap-2.5">
              {t.type === 'success' ? (
                <span className="toast-icon-wrap toast-success-wrap">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#10B981"
                      strokeWidth="2"
                      fill="rgba(16, 185, 129, 0.12)"
                    />
                    <path
                      d="M7.5 12.5l3 3 6-6.5"
                      className="toast-check-draw"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : t.type === 'error' ? (
                <span className="toast-icon-wrap toast-error-wrap">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#EF4444"
                      strokeWidth="2"
                      fill="rgba(239, 68, 68, 0.12)"
                    />
                    <path
                      d="M15 9l-6 6M9 9l6 6"
                      className="toast-cross-draw"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              ) : (
                icon
              )}
              <div className="text-xs font-bold leading-snug">{message}</div>
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
}

