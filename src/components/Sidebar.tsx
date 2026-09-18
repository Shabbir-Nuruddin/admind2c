"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  SquaresFour, 
  CheckSquareOffset, 
  CalendarBlank, 
  Activity, 
  Image as ImageIcon,
  Users
} from "@phosphor-icons/react";

const NAV_ITEMS = [
  { name: "Overview", href: "/", icon: SquaresFour },
  { name: "Tasks", href: "/tasks", icon: CheckSquareOffset },
  { name: "Timeline", href: "/timeline", icon: CalendarBlank },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Designs", href: "/designs", icon: ImageIcon },
  { name: "Meetings", href: "/meetings", icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white flex flex-col pt-8 pb-4">
      <div className="px-6 mb-10">
        <h1 className="text-sm font-bold tracking-widest uppercase text-zinc-900">
          Base Operations
        </h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
              }`}
            >
              <Icon weight={isActive ? "fill" : "regular"} className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 mt-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-xs font-medium text-zinc-600">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900">Admin</p>
            <p className="text-xs text-zinc-500">Workspace</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
