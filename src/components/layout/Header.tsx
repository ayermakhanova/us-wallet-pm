import { LayoutDashboard, List, Columns3, Clock, GitBranch, AlertTriangle, Users, BookOpen, FileBarChart, Menu } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getProgramStats } from "../../lib/utils";
import type { ViewType } from "../../types";

const views: { id: ViewType; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "list", label: "List", icon: List },
  { id: "kanban", label: "Kanban", icon: Columns3 },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "dependencies", label: "Dependencies", icon: GitBranch },
  { id: "risks", label: "Risks", icon: AlertTriangle },
  { id: "raci", label: "RACI", icon: Users },
  { id: "decisions", label: "Decisions", icon: BookOpen },
  { id: "reports", label: "Reports", icon: FileBarChart },
];

export function Header() {
  const { currentView, setView, epics, toggleSidebar } = useStore();
  const stats = getProgramStats(epics);
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="p-1.5 hover:bg-slate-100 rounded-md lg:hidden"><Menu size={20} /></button>
          <h1 className="text-base font-bold text-slate-900 whitespace-nowrap">US Wallet Program</h1>
          <div className="hidden md:flex items-center gap-2 ml-4">
            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">{stats.total} tasks</span>
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{stats.complete} done</span>
            {stats.blocked > 0 && <span className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded-full">{stats.blocked} blocked</span>}
            <span className="text-xs text-slate-500 ml-1">{stats.percentage}%</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-0.5 px-4 overflow-x-auto pb-0">
        {views.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setView(id)} className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${currentView === id ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}>
            <Icon size={15} /><span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
