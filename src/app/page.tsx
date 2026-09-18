import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, Users } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-12">
      <header className="mb-12">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
          Overview
        </h1>
        <p className="text-zinc-500">
          Your command center for business & sports apparel operations.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-zinc-600">
            <CheckCircle className="w-5 h-5 text-zinc-900" />
            <h2 className="text-sm font-medium">Pending Tasks</h2>
          </div>
          <p className="text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
            12
          </p>
          <p className="text-sm text-zinc-500">4 high priority</p>
        </div>
        
        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-zinc-600">
            <Clock className="w-5 h-5 text-zinc-900" />
            <h2 className="text-sm font-medium">Upcoming Deadlines</h2>
          </div>
          <p className="text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
            3
          </p>
          <p className="text-sm text-zinc-500">This week</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4 text-zinc-600">
            <Users className="w-5 h-5 text-zinc-900" />
            <h2 className="text-sm font-medium">Meetings Today</h2>
          </div>
          <p className="text-3xl font-semibold tracking-tight text-zinc-900 mb-1">
            2
          </p>
          <p className="text-sm text-zinc-500">Next: 2:00 PM Design Sync</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="font-medium text-zinc-900">Recent Activity</h3>
            <Link href="/activity" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6 flex-1">
            <ul className="space-y-6">
              {[
                { user: "Sarah", action: "uploaded 3 new pant designs", time: "2 hours ago" },
                { user: "Mike", action: "completed task 'Fabric sourcing'", time: "4 hours ago" },
                { user: "Admin", action: "scheduled 'Q4 Planning'", time: "Yesterday" },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-zinc-300 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-900">
                      <span className="font-medium">{item.user}</span> {item.action}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-5 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="font-medium text-zinc-900">Latest Designs</h3>
            <Link href="/designs" className="text-sm text-zinc-500 hover:text-zinc-900 flex items-center gap-1 transition-colors">
              Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="p-6 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 text-sm">
                Placeholder 1
              </div>
              <div className="aspect-[4/5] bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 text-sm">
                Placeholder 2
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
