"use client";

import { useState, useEffect } from "react";
import { DotsThree, SquaresFour, List, Plus } from "@phosphor-icons/react/dist/ssr";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { Task, subscribeToTasks, addTask } from "@/lib/db";

const COLUMNS = [
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "done", title: "Done" }
];

export default function TasksPage() {
  const [view, setView] = useState<"board" | "table">("board");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToTasks((data) => {
      setTasks(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleNewTask = async () => {
    const title = prompt("Enter task title:");
    if (!title) return;
    await addTask({
      title,
      assignee: "Admin",
      status: "todo",
      priority: "medium"
    });
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-8 md:p-12 relative">
      <header className="mb-8 flex justify-between items-end flex-shrink-0">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Tasks
          </h1>
          <p className="text-zinc-500">
            Manage and track operations step by step.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-100 p-1 rounded-lg">
            <button 
              onClick={() => setView("board")}
              className={`p-1.5 rounded-md transition-colors ${view === 'board' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              <SquaresFour className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView("table")}
              className={`p-1.5 rounded-md transition-colors ${view === 'table' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleNewTask}
            className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Task
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center text-zinc-400">Loading tasks...</div>
      ) : view === "board" ? (
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-6 h-full min-w-max pb-4">
            {COLUMNS.map(col => {
              const colTasks = tasks.filter(t => t.status === col.id);
              return (
                <div key={col.id} className="w-80 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h2 className="font-medium text-zinc-900 text-sm flex items-center gap-2">
                      {col.title}
                      <span className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full">
                        {colTasks.length}
                      </span>
                    </h2>
                  </div>
                  <div className="flex-1 bg-zinc-50/50 border border-zinc-200 rounded-xl p-3 flex flex-col gap-3 overflow-y-auto">
                    {colTasks.map(task => (
                      <div 
                        key={task.id} 
                        onClick={() => setSelectedTask(task)}
                        className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm group cursor-pointer hover:border-zinc-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <p className="text-sm font-medium text-zinc-900 leading-snug">
                            {task.title}
                          </p>
                          <button className="text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-zinc-900">
                            <DotsThree className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-medium text-zinc-600 border border-zinc-200">
                              {task.assignee?.charAt(0) || '?'}
                            </div>
                            <span className="text-xs text-zinc-500">{task.assignee}</span>
                          </div>
                          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-full ${
                            task.priority === 'high' ? 'bg-rose-50 text-rose-600' :
                            task.priority === 'medium' ? 'bg-amber-50 text-amber-600' :
                            'bg-zinc-100 text-zinc-500'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                    {colTasks.length === 0 && (
                      <div className="text-center p-4 text-xs text-zinc-400">
                        No tasks
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto bg-white border border-zinc-200 rounded-xl shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 border-b border-zinc-200 sticky top-0">
              <tr>
                <th className="px-6 py-4 font-medium text-zinc-500">Task Name</th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-48">Status</th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-48">Assignee</th>
                <th className="px-6 py-4 font-medium text-zinc-500 w-48">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {tasks.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-zinc-400">No tasks found. Create one above!</td>
                </tr>
              )}
              {tasks.map(task => (
                <tr 
                  key={task.id} 
                  onClick={() => setSelectedTask(task)}
                  className="hover:bg-zinc-50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-zinc-900">{task.title}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium w-full text-center ${
                      task.status === 'todo' ? 'bg-zinc-100 text-zinc-700' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {task.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center text-[10px] font-medium text-zinc-700">
                        {task.assignee?.charAt(0) || '?'}
                      </div>
                      <span className="text-zinc-600">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-zinc-500 capitalize">{task.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskDetailModal 
        isOpen={!!selectedTask} 
        onClose={() => setSelectedTask(null)} 
        task={selectedTask} 
      />
    </div>
  );
}
