import { useState } from "react";
import { AlertTriangle, Plus, Shield } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getRiskScore, getRiskColor } from "../../lib/utils";
import type { Risk, RiskLikelihood, RiskImpact } from "../../types";

const likelihoods: RiskLikelihood[] = ["Low", "Medium", "High"];
const impacts: RiskImpact[] = ["High", "Medium", "Low"];

function HeatMapCell({ likelihood, impact, risks, onSelect }: { likelihood: RiskLikelihood; impact: RiskImpact; risks: Risk[]; onSelect: (r: Risk) => void }) {
  const matching = risks.filter((r) => r.likelihood === likelihood && r.impact === impact);
  const score = getRiskScore(likelihood, impact);
  const bg = score >= 9 ? "bg-red-100" : score >= 6 ? "bg-orange-100" : score >= 4 ? "bg-yellow-100" : "bg-green-100";

  return (
    <td className={`${bg} border p-2 min-w-[100px] align-top`}>
      <div className="flex flex-wrap gap-1">
        {matching.map((r) => (
          <button
            key={r.id}
            onClick={() => onSelect(r)}
            className="text-xs font-mono px-1.5 py-0.5 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
          >
            {r.id}
          </button>
        ))}
      </div>
    </td>
  );
}

export function RiskView() {
  const { risks, updateRisk, addRisk } = useStore();
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = [...new Set(risks.map((r) => r.category))];
  const filteredRisks = risks.filter((r) => {
    if (filterStatus !== "All" && r.status !== filterStatus) return false;
    if (filterCategory !== "All" && r.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Heat Map */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Shield size={16} className="text-orange-500" /> Risk Heat Map
        </h3>
        <div className="overflow-x-auto">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-xs text-slate-500 w-20" />
                <th className="p-2 text-xs text-slate-500 font-medium text-center" colSpan={3}>Likelihood &rarr;</th>
              </tr>
              <tr>
                <th className="p-2 text-xs text-slate-500 font-medium">Impact &darr;</th>
                {likelihoods.map((l) => (
                  <th key={l} className="p-2 text-xs text-slate-600 font-medium text-center border">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {impacts.map((impact) => (
                <tr key={impact}>
                  <td className="p-2 text-xs text-slate-600 font-medium border">{impact}</td>
                  {likelihoods.map((likelihood) => (
                    <HeatMapCell
                      key={`${likelihood}-${impact}`}
                      likelihood={likelihood}
                      impact={impact}
                      risks={risks}
                      onSelect={setSelectedRisk}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h3 className="text-sm font-semibold">Risk Register ({filteredRisks.length})</h3>
          <div className="flex items-center gap-2">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="text-xs border rounded px-2 py-1">
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="Mitigated">Mitigated</option>
              <option value="Closed">Closed</option>
            </select>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="text-xs border rounded px-2 py-1">
              <option value="All">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left px-4 py-2 font-medium">ID</th>
                <th className="text-left px-2 py-2 font-medium">Risk</th>
                <th className="text-left px-2 py-2 font-medium w-20">Category</th>
                <th className="text-center px-2 py-2 font-medium w-20">Likelihood</th>
                <th className="text-center px-2 py-2 font-medium w-16">Impact</th>
                <th className="text-center px-2 py-2 font-medium w-16">Score</th>
                <th className="text-left px-2 py-2 font-medium w-20">Owner</th>
                <th className="text-left px-2 py-2 font-medium w-20">Status</th>
                <th className="text-left px-2 py-2 font-medium hidden lg:table-cell">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredRisks.map((risk) => {
                const score = getRiskScore(risk.likelihood, risk.impact);
                const color = getRiskColor(risk.likelihood, risk.impact);
                return (
                  <tr
                    key={risk.id}
                    onClick={() => setSelectedRisk(risk)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-2.5 text-xs font-mono">{risk.id}</td>
                    <td className="px-2 py-2.5">
                      <p className="font-medium text-sm">{risk.title}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{risk.description}</p>
                    </td>
                    <td className="px-2 py-2.5 text-xs">{risk.category}</td>
                    <td className="px-2 py-2.5 text-center text-xs">{risk.likelihood}</td>
                    <td className="px-2 py-2.5 text-center text-xs">{risk.impact}</td>
                    <td className="px-2 py-2.5 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold" style={{ backgroundColor: color }}>{score}</span>
                    </td>
                    <td className="px-2 py-2.5 text-xs">{risk.owner}</td>
                    <td className="px-2 py-2.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        risk.status === "Open" ? "bg-red-100 text-red-700" :
                        risk.status === "Mitigated" ? "bg-yellow-100 text-yellow-700" :
                        "bg-green-100 text-green-700"
                      }`}>{risk.status}</span>
                    </td>
                    <td className="px-2 py-2.5 text-xs text-slate-400 hidden lg:table-cell">{risk.source || "-"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Detail Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20" onClick={() => setSelectedRisk(null)} />
          <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedRisk.id}: {selectedRisk.title}</h3>
              <button onClick={() => setSelectedRisk(null)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <p className="text-sm text-slate-600">{selectedRisk.description}</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Likelihood</label>
                <select
                  value={selectedRisk.likelihood}
                  onChange={(e) => { updateRisk(selectedRisk.id, { likelihood: e.target.value as RiskLikelihood }); setSelectedRisk({ ...selectedRisk, likelihood: e.target.value as RiskLikelihood }); }}
                  className="w-full text-sm border rounded px-2 py-1.5"
                >
                  {likelihoods.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Impact</label>
                <select
                  value={selectedRisk.impact}
                  onChange={(e) => { updateRisk(selectedRisk.id, { impact: e.target.value as RiskImpact }); setSelectedRisk({ ...selectedRisk, impact: e.target.value as RiskImpact }); }}
                  className="w-full text-sm border rounded px-2 py-1.5"
                >
                  {(["High", "Medium", "Low"] as RiskImpact[]).map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Status</label>
                <select
                  value={selectedRisk.status}
                  onChange={(e) => { updateRisk(selectedRisk.id, { status: e.target.value as Risk["status"] }); setSelectedRisk({ ...selectedRisk, status: e.target.value as Risk["status"] }); }}
                  className="w-full text-sm border rounded px-2 py-1.5"
                >
                  <option value="Open">Open</option>
                  <option value="Mitigated">Mitigated</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Owner</label>
                <input value={selectedRisk.owner} readOnly className="w-full text-sm border rounded px-2 py-1.5 bg-slate-50" />
              </div>
            </div>
            <div>
              <label className="text-xs text-slate-500 block mb-1">Mitigation</label>
              <p className="text-sm bg-slate-50 rounded-lg p-3">{selectedRisk.mitigation}</p>
            </div>
            {selectedRisk.source && (
              <p className="text-xs text-slate-400">Source: {selectedRisk.source}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
