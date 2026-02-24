import { BarChart3, CheckCircle2, Clock, AlertOctagon, Circle, TrendingUp } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getProgramStats, getEpicProgress, statusColors } from "../../lib/utils";
import { ProgressBar } from "../shared/ProgressBar";
import { StatusBadge } from "../shared/StatusBadge";
import { PriorityIcon } from "../shared/PriorityIcon";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const PIE_COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#94a3b8", "#a855f7"];

export function SummaryView() {
  const { epics, setView, setSelectedTask, setFilter } = useStore();
  const stats = getProgramStats(epics);

  const allTasks = epics.flatMap((e) => e.tasks);
  const blockedTasks = allTasks.filter((t) => t.status === "Blocked");
  const highestPriorityTasks = allTasks.filter((t) => t.priority === "Highest" && t.status !== "Complete");

  const pieData = [
    { name: "Complete", value: stats.complete },
    { name: "In Progress", value: stats.inProgress },
    { name: "Blocked", value: stats.blocked },
    { name: "Not Started", value: stats.notStarted },
    { name: "Backlog", value: stats.backlog },
  ];

  const epicBarData = epics.map((e) => {
    const p = getEpicProgress(e);
    return { name: e.id, complete: p.complete, inProgress: p.inProgress, blocked: p.blocked, notStarted: p.notStarted, backlog: p.backlog };
  });

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total Tasks", value: stats.total, icon: BarChart3, color: "text-slate-700", bg: "bg-slate-50" },
          { label: "Not Started", value: stats.notStarted, icon: Circle, color: "text-slate-500", bg: "bg-slate-50" },
          { label: "In Progress", value: stats.inProgress, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Blocked", value: stats.blocked, icon: AlertOctagon, color: "text-red-600", bg: "bg-red-50" },
          { label: "Complete", value: stats.complete, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-4 border`}>
            <div className="flex items-center justify-between mb-1">
              <Icon size={18} className={color} />
              <span className={`text-2xl font-bold ${color}`}>{value}</span>
            </div>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl border p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Overall Program Progress</h3>
          <span className="text-lg font-bold text-blue-600">{stats.percentage}%</span>
        </div>
        <ProgressBar complete={stats.complete} inProgress={stats.inProgress} blocked={stats.blocked} total={stats.total} showLabel={false} height="h-4" />
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full" /> Complete</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full" /> In Progress</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" /> Blocked</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-slate-200 rounded-full" /> Not Started</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Status Distribution Chart */}
        <div className="bg-white rounded-xl border p-5">
          <h3 className="text-sm font-semibold mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-xs text-slate-600">{v}</span>} />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Workstream Progress Chart */}
        <div className="bg-white rounded-xl border p-5">
          <h3 className="text-sm font-semibold mb-4">Workstream Progress</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={epicBarData} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" width={30} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="complete" stackId="a" fill="#22c55e" name="Complete" />
              <Bar dataKey="inProgress" stackId="a" fill="#3b82f6" name="In Progress" />
              <Bar dataKey="blocked" stackId="a" fill="#ef4444" name="Blocked" />
              <Bar dataKey="notStarted" stackId="a" fill="#e2e8f0" name="Not Started" />
              <Bar dataKey="backlog" stackId="a" fill="#a855f7" name="Backlog" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Workstream Health Grid */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Workstream Health</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {epics.map((epic) => {
            const p = getEpicProgress(epic);
            return (
              <div key={epic.id} className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => { setFilter("epic", epic.id); setView("list"); }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: epic.color }} />
                  <span className="text-xs font-mono text-slate-400">{epic.id}</span>
                  <h4 className="text-sm font-medium truncate flex-1">{epic.name}</h4>
                </div>
                <ProgressBar complete={p.complete} inProgress={p.inProgress} blocked={p.blocked} total={p.total} height="h-1.5" />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-500">{epic.owner}</span>
                  <span className="text-xs text-slate-400">{epic.target}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Blocked Items */}
      {blockedTasks.length > 0 && (
        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
          <h3 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
            <AlertOctagon size={16} /> Blocked Items ({blockedTasks.length})
          </h3>
          <div className="space-y-2">
            {blockedTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => setSelectedTask(task.id)}
                className="bg-white rounded-lg px-3 py-2 border border-red-100 cursor-pointer hover:border-red-300 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-red-400">{task.id}</span>
                  <span className="text-sm font-medium">{task.name}</span>
                </div>
                {task.blockerReason && <p className="text-xs text-red-500 mt-1">{task.blockerReason}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Critical Path Items */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <TrendingUp size={16} className="text-orange-500" /> Highest Priority - Not Complete ({highestPriorityTasks.length})
        </h3>
        <div className="space-y-1.5">
          {highestPriorityTasks.slice(0, 10).map((task) => (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task.id)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <PriorityIcon priority={task.priority} />
              <span className="text-xs font-mono text-slate-400">{task.id}</span>
              <span className="text-sm flex-1 truncate">{task.name}</span>
              <StatusBadge status={task.status} />
              <span className="text-xs text-slate-500">{task.owner}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
