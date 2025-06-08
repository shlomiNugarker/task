import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'מערכת ניהול משימות',
  description: 'מערכת פשוטה לניהול משימות עם Next.js ו-PostgreSQL',
  keywords: ['משימות', 'ניהול', 'פרודוקטיביות', 'תכנון'],
  authors: [{ name: 'Task Management System' }],
  creator: 'Task Management System',
  publisher: 'Task Management System',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'מערכת ניהול משימות',
    description: 'מערכת פשוטה לניהול משימות עם Next.js ו-PostgreSQL',
    type: 'website',
    locale: 'he_IL',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ],
};

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 antialiased">
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}