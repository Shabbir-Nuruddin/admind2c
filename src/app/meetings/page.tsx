import { Calendar, MapPin, Clock, Users } from "@phosphor-icons/react/dist/ssr";

export default function MeetingsPage() {
  const meetings = [
    { 
      id: 1, 
      title: "Fabric Supplier Sync", 
      time: "10:00 AM - 11:30 AM", 
      date: "Today", 
      location: "HQ Meeting Room A",
      attendees: ["Sarah", "Mike", "Alex"],
      type: "Physical"
    },
    { 
      id: 2, 
      title: "Design Review: Hybrid Pants", 
      time: "2:00 PM - 3:00 PM", 
      date: "Today", 
      location: "Design Studio",
      attendees: ["Sarah", "Admin"],
      type: "Physical"
    },
    { 
      id: 3, 
      title: "Q4 Marketing Strategy", 
      time: "11:00 AM - 12:30 PM", 
      date: "Tomorrow", 
      location: "HQ Meeting Room B",
      attendees: ["Admin", "Mike"],
      type: "Hybrid"
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 md:p-12">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">
            Meetings
          </h1>
          <p className="text-zinc-500">
            Schedule and manage physical syncs and locations.
          </p>
        </div>
        <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
          Schedule Meeting
        </button>
      </header>

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="bg-white border border-zinc-200 rounded-xl p-6 flex items-start justify-between gap-4 shadow-sm">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 mb-2">{meeting.title}</h3>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{meeting.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{meeting.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{meeting.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{meeting.attendees.join(", ")}</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border ${
                meeting.type === 'Physical' 
                  ? 'bg-blue-50 text-blue-700 border-blue-200' 
                  : 'bg-purple-50 text-purple-700 border-purple-200'
              }`}>
                {meeting.type}
              </span>
            </div>
          ))}
        </div>
        
        <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 h-fit">
          <h3 className="font-medium text-zinc-900 mb-4">Locations Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">HQ Meeting Room A</span>
              <span className="text-emerald-600 font-medium">Available</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">HQ Meeting Room B</span>
              <span className="text-amber-600 font-medium">In Use</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-600">Design Studio</span>
              <span className="text-emerald-600 font-medium">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
