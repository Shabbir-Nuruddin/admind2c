export default function ActivityPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-12">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
          Activity
        </h1>
        <p className="text-zinc-500">
          Logs and history of all team actions.
        </p>
      </header>
      <div className="bg-white border border-zinc-200 rounded-xl p-8 text-center text-zinc-500">
        Activity feed coming soon...
      </div>
    </div>
  );
}
