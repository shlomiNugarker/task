'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
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
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">טוען...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          ניהול משימות
        </h1>

        <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="flex gap-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="הכנס משימה חדשה..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              dir="rtl"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              הוסף
            </button>
          </div>
        </form>

        <div className="bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold p-6 border-b border-gray-200">
            רשימת משימות ({tasks.length})
          </h2>
          
          {tasks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              אין משימות עדיין. הוסף משימה ראשונה!
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <li key={task.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="text-lg" dir="rtl">{task.name}</span>
                    <span className="text-sm text-gray-500">
                      נוצר: {new Date(task.created_at).toLocaleDateString('he-IL')}
                    </span>
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