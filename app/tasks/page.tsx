'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Task {
  id: number;
  name: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (showSuccess && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSuccess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTask }),
      });

      if (response.ok) {
        setNewTask('');
        fetchTasks();
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'שגיאה בשליחת המשימה');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      setError('שגיאה בחיבור לשרת');
    } finally {
      setSubmitting(false);
    }
  };

  const isSubmitDisabled = !newTask.trim() || submitting;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-xl text-gray-700 font-medium" dir="rtl">טוען משימות...</p>
          <p className="text-gray-500 mt-2" dir="rtl">אנא המתן רגע</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2" dir="rtl">
            ניהול משימות
          </h1>
          <p className="text-gray-600" dir="rtl">
            נהל את המשימות שלך בקלות ויעילות
          </p>
        </div>

        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-green-800 font-medium" dir="rtl">המשימה נוספה בהצלחה!</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2 duration-300">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-red-800 font-medium" dir="rtl">{error}</span>
            <button 
              onClick={() => setError('')}
              className="mr-auto text-red-600 hover:text-red-800 transition-colors"
              aria-label="סגור הודעת שגיאה"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex gap-4">
            <Input
              ref={inputRef}
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="הכנס משימה חדשה..."
              className="flex-1 text-right"
              dir="rtl"
              disabled={submitting}
            />
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className={`px-6 min-w-[80px] transition-all duration-200 ${
                isSubmitDisabled 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-lg hover:scale-105'
              }`}
              size="lg"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  שולח...
                </div>
              ) : (
                'הוסף'
              )}
            </Button>
          </div>
          <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
            {newTask.trim() === '' ? (
              <p className="text-right" dir="rtl">
                נא להכניס תוכן למשימה
              </p>
            ) : (
              <div></div>
            )}
            <p className="text-left text-xs">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl</kbd> + 
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs ml-1">/</kbd> 
              לפוקוס מהיר
            </p>
          </div>
        </form>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-l from-blue-50 to-transparent rounded-t-xl">
            <h2 className="text-xl font-semibold text-gray-800" dir="rtl">
              רשימת משימות ({tasks.length})
            </h2>
          </div>
          
          {tasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg" dir="rtl">
                אין משימות עדיין
              </p>
              <p className="text-gray-400 text-sm mt-1" dir="rtl">
                הוסף את המשימה הראשונה שלך למעלה
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {tasks.map((task, index) => (
                <li key={task.id} className="p-6 hover:bg-gradient-to-l hover:from-blue-50/50 hover:to-transparent transition-all duration-200 animate-in fade-in slide-in-from-right-2 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-lg text-gray-800 font-medium" dir="rtl">{task.name}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-sm text-gray-500">
                        משימה #{task.id}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}