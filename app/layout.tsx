import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'מערכת ניהול משימות',
  description: 'מערכת פשוטה לניהול משימות עם Next.js ו-PostgreSQL'
};

export const viewport: Viewport = {
  maximumScale: 1
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}