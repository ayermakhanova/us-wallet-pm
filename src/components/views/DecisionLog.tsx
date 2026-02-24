import { useState } from "react";
import { BookOpen, Plus } from "lucide-react";
import { useStore } from "../../store/useStore";
import type { Decision } from "../../types";

export function DecisionLog() {
  const { decisions, addDecision, updateDecision } = useStore();
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDecision, setNewDecision] = useState({ decision: "", rationale: "", owner: "", source: "", status: "Pending" as Decision["status"] });

  const filtered = filterStatus === "All" ? decisions : decisions.filter((d) => d.status === filterStatus);
  const pendingCount = decisions.filter((d) => d.status === "Pending").length;

  const handleAdd = () => {
    if (!newDecision.decision.trim()) return;
    addDecision({
      date: new Date().toISOString().split("T")[0],
      ...newDecision,
    });
    setNewDecision({ decision: "", rationale: "", owner: "", source: "", status: "Pending" });
    setShowAddForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold">Decision Log</h2>
          {pendingCount > 0 && (
            <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">{pendingCount} pending</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-xs border rounded px-2 py-1.5">
            <option value="All">All Decisions</option>
            <option value="Final">Final</option>
            <option value="Pending">Pending</option>
            <option value="Revisit">Revisit</option>
          </select>
          <button onClick={() => setShowAddForm(true)} className="flex items-center gap-1 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors">
            <Plus size={12} /> Add Decision
          </button>
        </div>
      </div>

      {/* Pending Decisions Alert */}
      {pendingCount > 0 && filterStatus === "All" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-yellow-700 mb-2">Pending Decisions</h3>
          <div className="space-y-2">
            {decisions.filter((d) => d.status === "Pending").map((d) => (
              <div key={d.id} className="bg-white rounded-lg px-3 py-2 border border-yellow-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-yellow-500">{d.id}</span>
                  <span className="text-sm font-medium">{d.decision}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Owner: {d.owner} | Source: {d.source}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision Table */}
      <div className="bg-white rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
              <th className="text-left px-4 py-2 font-medium w-12">ID</th>
              <th className="text-left px-2 py-2 font-medium w-24">Date</th>
              <th className="text-left px-2 py-2 font-medium">Decision</th>
              <th className="text-left px-2 py-2 font-medium hidden lg:table-cell">Rationale</th>
              <th className="text-left px-2 py-2 font-medium w-24">Owner</th>
              <th className="text-left px-2 py-2 font-medium w-20">Status</th>
              <th className="text-left px-2 py-2 font-medium w-32 hidden md:table-cell">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 text-xs font-mono text-slate-400">{d.id}</td>
                <td className="px-2 py-2.5 text-xs text-slate-500">{d.date}</td>
                <td className="px-2 py-2.5 text-sm font-medium">{d.decision}</td>
                <td className="px-2 py-2.5 text-xs text-slate-500 hidden lg:table-cell">{d.rationale || "-"}</td>
                <td className="px-2 py-2.5 text-xs">{d.owner}</td>
                <td className="px-2 py-2.5">
                  <select
                    value={d.status}
                    onChange={(e) => updateDecision(d.id, { status: e.target.value as Decision["status"] })}
                    className={`text-xs px-2 py-0.5 rounded-full font-medium border-0 cursor-pointer ${
                      d.status === "Final" ? "bg-green-100 text-green-700" :
                      d.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-orange-100 text-orange-700"
                    }`}
                  >
                    <option value="Final">Final</option>
                    <option value="Pending">Pending</option>
                    <option value="Revisit">Revisit</option>
                  </select>
                </td>
                <td className="px-2 py-2.5 text-xs text-slate-400 hidden md:table-cell">{d.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Decision Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" onClick={() => setShowAddForm(false)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 space-y-4">
            <h3 className="text-lg font-semibold">Add Decision</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Decision</label>
                <textarea value={newDecision.decision} onChange={(e) => setNewDecision({ ...newDecision, decision: e.target.value })} className="w-full text-sm border rounded-md px-3 py-2 min-h-[80px]" placeholder="Describe the decision..." />
              </div>
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Rationale</label>
                <input value={newDecision.rationale} onChange={(e) => setNewDecision({ ...newDecision, rationale: e.target.value })} className="w-full text-sm border rounded-md px-3 py-1.5" placeholder="Why was this decided?" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Owner</label>
                  <input value={newDecision.owner} onChange={(e) => setNewDecision({ ...newDecision, owner: e.target.value })} className="w-full text-sm border rounded-md px-3 py-1.5" />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Source</label>
                  <input value={newDecision.source} onChange={(e) => setNewDecision({ ...newDecision, source: e.target.value })} className="w-full text-sm border rounded-md px-3 py-1.5" placeholder="e.g., Workshop" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowAddForm(false)} className="px-4 py-2 text-sm border rounded-md hover:bg-slate-50">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
