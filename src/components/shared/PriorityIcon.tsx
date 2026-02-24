import { AlertTriangle, ArrowUp, ArrowRight, ArrowDown } from "lucide-react";
import { priorityColors } from "../../lib/utils";
import type { Priority } from "../../types";

const icons: Record<Priority, typeof AlertTriangle> = {
  Highest: AlertTriangle, High: ArrowUp, Medium: ArrowRight, Low: ArrowDown,
};

export function PriorityIcon({ priority, showLabel = false }: { priority: Priority; showLabel?: boolean }) {
  const Icon = icons[priority];
  const color = priorityColors[priority];
  return (
    <span className="inline-flex items-center gap-1" title={priority}>
      <Icon size={14} style={{ color }} />
      {showLabel && <span className="text-xs" style={{ color }}>{priority}</span>}
    </span>
  );
}
