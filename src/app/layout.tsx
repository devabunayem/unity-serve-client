import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomToaster } from '@/components/CustomToaster';
import { AuthProvider } from "@/context/AuthContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Unity Serve – Bringing People Together",
  description: "A community-driven event management platform where citizens create, join, and track social service events in their local area.",
  keywords: ["unity serve", "social development", "community service", "volunteering", "dhaka events", "charity"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo-icon.png", type: "image/png" },
    ],
    apple: [{ url: "/logo-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="relative flex min-h-screen flex-col font-sans antialiased bg-[#FAFCFF] text-slate-900 dark:bg-[#080C14] dark:text-slate-50 selection:bg-[#1E40AF] selection:text-white overflow-x-hidden">
        
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] sm:w-[960px] h-[480px] bg-gradient-to-tr from-blue-500/12 via-indigo-400/8 to-cyan-300/10 dark:from-blue-600/15 dark:via-indigo-500/10 dark:to-cyan-400/8 rounded-full blur-[130px]" />
          
          <div className="absolute top-[35%] -left-36 w-[520px] h-[520px] bg-amber-400/8 dark:bg-amber-500/5 rounded-full blur-[140px]" />
          
          <div className="absolute top-[68%] -right-36 w-[580px] h-[580px] bg-blue-600/10 dark:bg-blue-700/10 rounded-full blur-[150px]" />
        </div>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="unity_serve_theme_v3"
          disableTransitionOnChange
        >
          <AuthProvider>
            <CustomToaster />
            <Suspense fallback={<div className="h-16 max-w-6xl mx-auto rounded-full glass-capsule mt-4" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1 pt-24 sm:pt-28">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
