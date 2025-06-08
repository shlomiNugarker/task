import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg mx-auto text-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-4">
              מערכת ניהול משימות
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed" dir="rtl">
              נהל את המשימות שלך בצורה פשוטה ויעילה
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full text-lg py-6">
              <Link href="/tasks">
                התחל לנהל משימות
              </Link>
            </Button>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>מהיר וקל לשימוש</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>ארגון מתקדם</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-8 h-8 mx-auto mb-2 bg-primary/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground" dir="rtl">הוסף משימות</p>
          </div>
          
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-8 h-8 mx-auto mb-2 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground" dir="rtl">סמן כהושלם</p>
          </div>
          
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="w-8 h-8 mx-auto mb-2 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground" dir="rtl">ארגן רשימות</p>
          </div>
        </div>
      </div>
    </div>
  );
}