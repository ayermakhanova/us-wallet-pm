import { X } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getEpicProgress } from "../../lib/utils";

export function Sidebar() {
  const { epics, sidebarOpen, setSidebarOpen, setFilter, filters } = useStore();

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed top-14 left-0 bottom-0 w-64 bg-white border-r z-50 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 lg:hidden">
          <span className="text-sm font-semibold text-slate-700">Workstreams</span>
          <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-100 rounded">
            <X size={16} />
          </button>
        </div>
        <div className="p-4 pt-2 lg:pt-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Workstreams
          </h3>
          <button
            onClick={() => setFilter("epic", "")}
            className={`w-full text-left text-sm px-2 py-1.5 rounded-md mb-1 transition-colors ${
              filters.epic === "" ? "bg-blue-50 text-blue-700 font-medium" : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Workstreams
          </button>
          <div className="space-y-0.5">
            {epics.map((epic) => {
              const progress = getEpicProgress(epic);
              const isActive = filters.epic === epic.id;
              return (
                <button
                  key={epic.id}
                  onClick={() => setFilter("epic", isActive ? "" : epic.id)}
                  className={`w-full text-left px-2 py-1.5 rounded-md transition-colors group ${
                    isActive ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: epic.color }}
                    />
                    <span
                      className={`text-sm truncate ${
                        isActive ? "text-blue-700 font-medium" : "text-slate-700"
                      }`}
                    >
                      {epic.id}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto">{progress.percentage}%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate ml-[18px] mt-0.5">
                    {epic.name}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
        <div className="border-t mx-4" />
        <div className="p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Quick Filters
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => { setFilter("status", "Blocked"); setFilter("epic", ""); }}
              className="w-full text-left text-sm px-2 py-1.5 rounded-md text-red-600 hover:bg-red-50 transition-colors"
            >
              Blocked Items
            </button>
            <button
              onClick={() => { setFilter("priority", "Highest"); setFilter("epic", ""); }}
              className="w-full text-left text-sm px-2 py-1.5 rounded-md text-amber-600 hover:bg-amber-50 transition-colors"
            >
              Highest Priority
            </button>
            <button
              onClick={() => { setFilter("status", "In Progress"); setFilter("epic", ""); }}
              className="w-full text-left text-sm px-2 py-1.5 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
            >
              In Progress
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
