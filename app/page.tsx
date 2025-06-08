import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          ברוכים הבאים
        </h1>
        <p className="text-gray-600 mb-8" dir="rtl">
          מערכת ניהול משימות פשוטה ויעילה
        </p>
        <Link
          href="/tasks"
          className="inline-block px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          עבור למשימות
        </Link>
      </div>
    </div>
  );
}