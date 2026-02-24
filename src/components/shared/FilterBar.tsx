import { Search, X } from "lucide-react";
import { useStore } from "../../store/useStore";
import type { Status, Priority } from "../../types";

const statuses: (Status | "All")[] = ["All", "Backlog", "Not Started", "In Progress", "Blocked", "Complete"];
const priorities: (Priority | "All")[] = ["All", "Highest", "High", "Medium", "Low"];

export function FilterBar() {
  const { filters, setFilter, resetFilters, epics } = useStore();
  const hasFilters = filters.status !== "All" || filters.priority !== "All" || filters.owner !== "" || filters.epic !== "" || filters.search !== "";
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative">
        <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={filters.search} onChange={(e) => setFilter("search", e.target.value)} placeholder="Search tasks..." className="pl-8 pr-3 py-1.5 text-sm border rounded-md w-56" />
      </div>
      <select value={filters.status} onChange={(e) => setFilter("status", e.target.value)} className="text-sm border rounded-md px-2 py-1.5">
        {statuses.map((s) => <option key={s} value={s}>{s === "All" ? "All Statuses" : s}</option>)}
      </select>
      <select value={filters.priority} onChange={(e) => setFilter("priority", e.target.value)} className="text-sm border rounded-md px-2 py-1.5">
        {priorities.map((p) => <option key={p} value={p}>{p === "All" ? "All Priorities" : p}</option>)}
      </select>
      <select value={filters.epic} onChange={(e) => setFilter("epic", e.target.value)} className="text-sm border rounded-md px-2 py-1.5">
        <option value="">All Workstreams</option>
        {epics.map((e) => <option key={e.id} value={e.id}>{e.id}: {e.name}</option>)}
      </select>
      {hasFilters && <button onClick={resetFilters} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1"><X size={12} /> Clear</button>}
    </div>
  );
}
