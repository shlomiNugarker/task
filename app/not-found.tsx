import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md space-y-8 text-center">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-destructive/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4" dir="rtl">
            העמוד לא נמצא
          </h1>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8" dir="rtl">
            העמוד שאתה מחפש אולי הוסר, שונה שמו, או זמנית לא זמין.
          </p>
          
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link href="/">
                חזור לעמוד הבית
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="w-full">
              <Link href="/tasks">
                לעמוד המשימות
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground" dir="rtl">
            שגיאה 404 - העמוד לא קיים
          </p>
        </div>
      </div>
    </div>
  );
}
