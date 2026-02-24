import { FileDown, FileSpreadsheet, FileJson, FileText } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getProgramStats, getEpicProgress, getAllTasks } from "../../lib/utils";

export function ReportsView() {
  const { epics, risks, decisions } = useStore();
  const stats = getProgramStats(epics);

  const exportJSON = () => {
    const data = { epics, risks, decisions, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `us-wallet-pm-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const allTasks = getAllTasks(epics);
    const headers = ["ID", "Epic", "Task", "Status", "Priority", "Owner", "Dependencies", "Tags"];
    const rows = allTasks.map((t) => [
      t.id,
      t.epicId,
      `"${t.name.replace(/"/g, '""')}"`,
      t.status,
      t.priority,
      t.owner,
      (t.dependencies || []).join("; "),
      (t.tags || []).join("; "),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `us-wallet-tasks-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openPrintView = () => {
    const allTasks = getAllTasks(epics);
    const blockedTasks = allTasks.filter((t) => t.status === "Blocked");
    const openRisks = risks.filter((r) => r.status === "Open");
    const pendingDecisions = decisions.filter((d) => d.status === "Pending");

    const html = `<!DOCTYPE html>
<html><head><title>US Wallet Program Status Report</title>
<style>
  body { font-family: -apple-system, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; color: #0f172a; }
  h1 { font-size: 24px; border-bottom: 2px solid #2563eb; padding-bottom: 8px; }
  h2 { font-size: 18px; margin-top: 24px; color: #1e40af; }
  h3 { font-size: 14px; margin-top: 16px; }
  .stats { display: flex; gap: 16px; margin: 16px 0; }
  .stat { background: #f1f5f9; padding: 12px 16px; border-radius: 8px; text-align: center; flex: 1; }
  .stat-value { font-size: 24px; font-weight: bold; }
  .stat-label { font-size: 12px; color: #64748b; }
  table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
  th { background: #f1f5f9; text-align: left; padding: 8px; font-size: 11px; text-transform: uppercase; }
  td { padding: 8px; border-bottom: 1px solid #e2e8f0; }
  .blocked { color: #dc2626; }
  .meta { color: #64748b; font-size: 12px; margin-top: 32px; }
  @media print { body { padding: 20px; } }
</style>
</head><body>
<h1>US Wallet Program - Status Report</h1>
<p style="color:#64748b">Generated: ${new Date().toLocaleDateString()} | Target: Q3 2026</p>
<div class="stats">
  <div class="stat"><div class="stat-value">${stats.total}</div><div class="stat-label">Total Tasks</div></div>
  <div class="stat"><div class="stat-value">${stats.complete}</div><div class="stat-label">Complete</div></div>
  <div class="stat"><div class="stat-value">${stats.inProgress}</div><div class="stat-label">In Progress</div></div>
  <div class="stat"><div class="stat-value blocked">${stats.blocked}</div><div class="stat-label">Blocked</div></div>
  <div class="stat"><div class="stat-value">${stats.percentage}%</div><div class="stat-label">Progress</div></div>
</div>
<h2>Workstream Summary</h2>
<table><tr><th>ID</th><th>Workstream</th><th>Owner</th><th>Target</th><th>Progress</th></tr>
${epics.map((e) => { const p = getEpicProgress(e); return `<tr><td>${e.id}</td><td>${e.name}</td><td>${e.owner}</td><td>${e.target}</td><td>${p.complete}/${p.total} (${p.percentage}%)</td></tr>`; }).join("")}
</table>
${blockedTasks.length > 0 ? `<h2 class="blocked">Blocked Items (${blockedTasks.length})</h2>
<table><tr><th>ID</th><th>Task</th><th>Owner</th><th>Reason</th></tr>
${blockedTasks.map((t) => `<tr><td>${t.id}</td><td>${t.name}</td><td>${t.owner}</td><td>${t.blockerReason || "-"}</td></tr>`).join("")}
</table>` : ""}
${openRisks.length > 0 ? `<h2>Open Risks (${openRisks.length})</h2>
<table><tr><th>ID</th><th>Risk</th><th>L/I</th><th>Owner</th><th>Mitigation</th></tr>
${openRisks.map((r) => `<tr><td>${r.id}</td><td>${r.title}</td><td>${r.likelihood}/${r.impact}</td><td>${r.owner}</td><td>${r.mitigation}</td></tr>`).join("")}
</table>` : ""}
${pendingDecisions.length > 0 ? `<h2>Pending Decisions (${pendingDecisions.length})</h2>
<table><tr><th>ID</th><th>Decision</th><th>Owner</th></tr>
${pendingDecisions.map((d) => `<tr><td>${d.id}</td><td>${d.decision}</td><td>${d.owner}</td></tr>`).join("")}
</table>` : ""}
<p class="meta">US Wallet Program Management Tool</p>
</body></html>`;

    const w = window.open("", "_blank");
    if (w) { w.document.write(html); w.document.close(); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold">Reports & Export</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={openPrintView}
          className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow text-left group"
        >
          <FileText size={24} className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold mb-1">Status Report</h3>
          <p className="text-xs text-slate-500">Program summary with workstreams, blockers, risks, and pending decisions. Opens in new window for print/PDF.</p>
        </button>

        <button
          onClick={exportCSV}
          className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow text-left group"
        >
          <FileSpreadsheet size={24} className="text-green-600 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold mb-1">Export to CSV</h3>
          <p className="text-xs text-slate-500">All {stats.total} tasks exported as CSV file. Compatible with Excel, Google Sheets.</p>
        </button>

        <button
          onClick={exportJSON}
          className="bg-white rounded-xl border p-5 hover:shadow-md transition-shadow text-left group"
        >
          <FileJson size={24} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
          <h3 className="text-sm font-semibold mb-1">Export to JSON</h3>
          <p className="text-xs text-slate-500">Full data export including epics, tasks, risks, and decisions. Portable format.</p>
        </button>

        <div className="bg-white rounded-xl border p-5 opacity-60">
          <FileDown size={24} className="text-slate-400 mb-3" />
          <h3 className="text-sm font-semibold mb-1">PDF Report</h3>
          <p className="text-xs text-slate-500">Use the Status Report option and print to PDF from the browser.</p>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-white rounded-xl border p-5">
        <h3 className="text-sm font-semibold mb-4">Program Snapshot</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-xs text-slate-500">Total Tasks</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{stats.percentage}%</p>
            <p className="text-xs text-slate-500">Complete</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">{epics.length}</p>
            <p className="text-xs text-slate-500">Workstreams</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{risks.filter((r) => r.status === "Open").length}</p>
            <p className="text-xs text-slate-500">Open Risks</p>
          </div>
        </div>
      </div>
    </div>
  );
}
