import { useStore } from "../../store/useStore";

const months = [
  { num: 2, label: "Feb 2026" },
  { num: 3, label: "Mar 2026" },
  { num: 4, label: "Apr 2026" },
  { num: 5, label: "May 2026" },
  { num: 6, label: "Jun 2026" },
  { num: 7, label: "Jul 2026" },
];

export function TimelineView() {
  const { epics, setFilter, setView } = useStore();
  const currentMonth = new Date().getMonth() + 1;
  const totalMonths = months.length;

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-semibold">Program Timeline</h2>
      <div className="bg-white rounded-xl border overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Month Headers */}
          <div className="flex border-b">
            <div className="w-56 shrink-0 px-4 py-3 text-xs font-semibold text-slate-500 border-r">Workstream</div>
            <div className="flex-1 flex">
              {months.map((m) => (
                <div
                  key={m.num}
                  className={`flex-1 px-3 py-3 text-xs font-medium text-center border-r last:border-r-0 ${
                    m.num === currentMonth ? "bg-blue-50 text-blue-700 font-semibold" : "text-slate-500"
                  }`}
                >
                  {m.label}
                </div>
              ))}
            </div>
          </div>

          {/* Epic Rows */}
          {epics.map((epic) => {
            const startOffset = epic.startMonth - months[0].num;
            const duration = epic.endMonth - epic.startMonth + 1;
            const leftPercent = (Math.max(0, startOffset) / totalMonths) * 100;
            const widthPercent = (Math.min(duration, totalMonths - startOffset) / totalMonths) * 100;

            const completeTasks = epic.tasks.filter((t) => t.status === "Complete").length;
            const totalTasks = epic.tasks.length;
            const progressPercent = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;

            return (
              <div key={epic.id} className="flex border-b last:border-b-0 hover:bg-slate-50 transition-colors">
                <div
                  className="w-56 shrink-0 px-4 py-3 border-r cursor-pointer"
                  onClick={() => { setFilter("epic", epic.id); setView("list"); }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: epic.color }} />
                    <div>
                      <p className="text-sm font-medium truncate">{epic.name}</p>
                      <p className="text-xs text-slate-400">{epic.owner} - {completeTasks}/{totalTasks}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 relative py-3 px-2">
                  {/* Today marker */}
                  {currentMonth >= months[0].num && currentMonth <= months[months.length - 1].num && (
                    <div
                      className="absolute top-0 bottom-0 w-px bg-red-400 z-10"
                      style={{ left: `${((currentMonth - months[0].num + 0.5) / totalMonths) * 100}%` }}
                    />
                  )}
                  {/* Epic Bar */}
                  <div
                    className="absolute top-3 h-7 rounded-md overflow-hidden"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                      backgroundColor: `${epic.color}20`,
                      border: `1px solid ${epic.color}40`,
                    }}
                  >
                    <div
                      className="h-full rounded-md transition-all duration-300"
                      style={{ width: `${progressPercent}%`, backgroundColor: `${epic.color}60` }}
                    />
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold"
                      style={{ color: epic.color }}
                    >
                      {epic.id}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span className="flex items-center gap-1"><span className="w-3 h-px bg-red-400" /> Today</span>
        <span>Bars show epic duration with progress fill</span>
      </div>
    </div>
  );
}
