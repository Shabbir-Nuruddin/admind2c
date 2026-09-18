import { CheckCircle, Circle, DotsThree } from "@phosphor-icons/react/dist/ssr";

export default function TasksPage() {
  const tasks = [
    { id: 1, title: "Finalize tech pack for Khaki Trousers", assignee: "Sarah", status: "todo", priority: "high" },
    { id: 2, title: "Source stretch-fabric suppliers", assignee: "Mike", status: "in-progress", priority: "medium" },
    { id: 3, title: "Review Q4 marketing budget", assignee: "Admin", status: "done", priority: "low" },
    { id: 4, title: "Schedule photoshoot for hybrid collection", assignee: "Sarah", status: "todo", priority: "medium" },
    { id: 5, title: "Approve final design for Activewear Top", assignee: "Admin", status: "in-progress", priority: "high" },
  ];

  const columns = [
    { id: "todo", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "done", title: "Done" }
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col p-8 md:p-12">
      <header className="mb-8 flex justify-between items-end flex-shrink-0">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Tasks
          </h1>
          <p className="text-zinc-500">
            Manage and track operations step by step.
          </p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
          New Task
        </button>
      </header>

      <div className="flex-1 overflow-x-auto">
        <div className="flex gap-6 h-full min-w-max pb-4">
          {columns.map(col => {
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
                    <div key={task.id} className="bg-white border border-zinc-200 rounded-lg p-4 shadow-sm group">
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
                            {task.assignee.charAt(0)}
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
    </div>
  );
}
