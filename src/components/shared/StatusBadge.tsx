import { statusColors } from "../../lib/utils";
import type { Status } from "../../types";

export function StatusBadge({ status, onClick }: { status: Status; onClick?: () => void }) {
  const colors = statusColors[status];
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text} ${onClick ? "cursor-pointer hover:opacity-80" : "cursor-default"} transition-opacity`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
      {status}
    </button>
  );
}
