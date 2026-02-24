export function ProgressBar({ complete, inProgress, blocked, total, showLabel = true, height = "h-2" }: { complete: number; inProgress: number; blocked: number; total: number; showLabel?: boolean; height?: string; }) {
  if (total === 0) return null;
  const pC = (complete / total) * 100;
  const pP = (inProgress / total) * 100;
  const pB = (blocked / total) * 100;
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden flex`}>
        {pC > 0 && <div className="bg-green-500 transition-all duration-300" style={{ width: `${pC}%` }} />}
        {pP > 0 && <div className="bg-blue-500 transition-all duration-300" style={{ width: `${pP}%` }} />}
        {pB > 0 && <div className="bg-red-500 transition-all duration-300" style={{ width: `${pB}%` }} />}
      </div>
      {showLabel && <p className="text-xs text-slate-500 mt-1">{Math.round(pC)}% complete</p>}
    </div>
  );
}
