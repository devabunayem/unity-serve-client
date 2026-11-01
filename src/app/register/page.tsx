'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, Image as ImageIcon, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, loginWithGoogle, loginWithGithub } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams?.get('redirect') || '/';

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUpperCase && hasLowerCase && hasMinLength;
  const validCount = [hasMinLength, hasUpperCase, hasLowerCase].filter(Boolean).length;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (!hasMinLength) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }
    if (!hasUpperCase) {
      toast.error('Password must contain at least one uppercase letter (A-Z).');
      return;
    }
    if (!hasLowerCase) {
      toast.error('Password must contain at least one lowercase letter (a-z).');
      return;
    }

    setIsSubmitting(true);
    try {
      const avatarUrl =
        photoURL.trim() ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`;

      const success = await register(name.trim(), email.trim(), password, avatarUrl);

      if (success) {
        router.push(redirectUrl);
      }
    } catch {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle(redirectUrl);
    } catch {
      toast.error('Google Sign-In failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGithubSignIn = async () => {
    setIsSubmitting(true);
    try {
      await loginWithGithub(redirectUrl);
    } catch {
      toast.error('GitHub Sign-In failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative">
      
      
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[480px] h-[480px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md space-y-7 rounded-[14px] bg-white/95 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        
        
        <div className="text-center space-y-2.5">
          <Link href="/" className="inline-block group focus:outline-none">
            <img
              src="/logo.png"
              alt="UnityServe"
              className="h-11 w-auto mx-auto object-contain dark:hidden group-hover:scale-105 transition-transform duration-200"
            />
            <img
              src="/logo-dark.png"
              alt="UnityServe"
              className="h-11 w-auto mx-auto object-contain hidden dark:block group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Join UnityServe to participate and organize community drives.
            </p>
          </div>
        </div>

        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nayem Khan"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-slate-300/90 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-slate-300/90 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Profile Photo URL (Optional)
            </label>
            <div className="relative">
              <ImageIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-slate-300/90 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1E40AF] dark:text-[#60A5FA]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 rounded-[10px] border border-slate-300/90 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            
            <div className="mt-2.5 p-3 rounded-[10px] bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium text-[11px]">Password Strength</span>
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                    validCount === 3
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : validCount === 2
                      ? 'text-amber-600 dark:text-amber-400'
                      : password.length > 0
                      ? 'text-rose-500 dark:text-rose-400'
                      : 'text-slate-400'
                  }`}
                >
                  {validCount === 3 ? 'Strong' : validCount === 2 ? 'Medium' : password.length > 0 ? 'Weak' : 'Not Entered'}
                </span>
              </div>

              
              <div className="w-full h-1.5 bg-slate-200/80 dark:bg-slate-700/80 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    validCount === 3
                      ? 'w-full bg-emerald-500'
                      : validCount === 2
                      ? 'w-2/3 bg-amber-500'
                      : validCount === 1
                      ? 'w-1/3 bg-rose-500'
                      : 'w-0'
                  }`}
                />
              </div>

              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-0.5 text-[11px]">
                <div
                  className={`flex items-center gap-1.5 transition-colors duration-150 ${
                    hasMinLength
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {hasMinLength ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0 ml-1" />
                  )}
                  <span>Min. 6 chars</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 transition-colors duration-150 ${
                    hasUpperCase
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {hasUpperCase ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0 ml-1" />
                  )}
                  <span>1 Uppercase</span>
                </div>

                <div
                  className={`flex items-center gap-1.5 transition-colors duration-150 ${
                    hasLowerCase
                      ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {hasLowerCase ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0 ml-1" />
                  )}
                  <span>1 Lowercase</span>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-[10px] font-heading text-sm font-bold bg-[#1E40AF] hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#3B82F6] text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Creating account...' : 'Create Volunteer Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        
        <div className="relative my-3">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-slate-900 px-3 text-[11px] font-bold tracking-wider text-slate-400">
              Or register with
            </span>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-3">
          
          <button
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            type="button"
            className="w-full py-2.5 px-3 rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-sm cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          
          <button
            onClick={handleGithubSignIn}
            disabled={isSubmitting}
            type="button"
            className="w-full py-2.5 px-3 rounded-[10px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-sm cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>GitHub</span>
          </button>
        </div>

        
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 pt-1">
          Already have an account?{' '}
          <Link
            href={`/login${redirectUrl !== '/' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`}
            className="font-bold text-[#1E40AF] dark:text-[#60A5FA] hover:underline"
          >
            Sign In Here
          </Link>
        </p>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[85vh] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
