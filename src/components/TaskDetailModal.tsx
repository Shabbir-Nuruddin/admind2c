"use client";

import { X, CalendarBlank, User, Tag, Textbox } from "@phosphor-icons/react/dist/ssr";

type TaskDetailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  task: any; // We'll type this properly later
};

export function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
  if (!isOpen || !task) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal - Notion Style Right Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-zinc-100">
          <span className="text-sm text-zinc-500 font-medium">Task Details</span>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-md transition-colors text-zinc-500 hover:text-zinc-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <input 
            type="text"
            defaultValue={task.title}
            className="w-full text-3xl font-semibold tracking-tight text-zinc-900 mb-8 border-none focus:ring-0 p-0 placeholder:text-zinc-300"
            placeholder="Task Title"
          />

          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-zinc-500 w-32 shrink-0">
                <User className="w-4 h-4" />
                <span>Assignee</span>
              </div>
              <div className="font-medium text-zinc-900">{task.assignee}</div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-zinc-500 w-32 shrink-0">
                <Tag className="w-4 h-4" />
                <span>Status</span>
              </div>
              <div className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                task.status === 'todo' ? 'bg-zinc-100 text-zinc-600' :
                task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {task.status.replace('-', ' ').toUpperCase()}
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-zinc-500 w-32 shrink-0">
                <CalendarBlank className="w-4 h-4" />
                <span>Due Date</span>
              </div>
              <div className="text-zinc-900">Not set</div>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-8">
            <div className="flex items-center gap-2 text-zinc-900 font-medium mb-4">
              <Textbox className="w-5 h-5" />
              <h3>Description</h3>
            </div>
            <textarea 
              className="w-full h-40 resize-none border-none focus:ring-0 p-0 text-zinc-600 leading-relaxed placeholder:text-zinc-300"
              placeholder="Add rich text description, links, and context here..."
              defaultValue="No description provided yet."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-100 bg-zinc-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-md hover:bg-zinc-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
