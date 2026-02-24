import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  Position,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useStore } from "../../store/useStore";
import { getAllTasks, getEpicById, priorityColors } from "../../lib/utils";
import type { Status } from "../../types";

const statusBorderColors: Record<Status, string> = {
  "Backlog": "#a855f7",
  "Not Started": "#94a3b8",
  "In Progress": "#3b82f6",
  "Blocked": "#ef4444",
  "Complete": "#22c55e",
};

export function DependencyView() {
  const { epics, setSelectedTask } = useStore();
  const [epicFilter, setEpicFilter] = useState<string>("");

  const { nodes, edges } = useMemo(() => {
    const allTasks = getAllTasks(epics);
    // Get tasks that have dependencies or are depended upon
    const tasksWithDeps = epicFilter
      ? allTasks.filter((t) => t.epicId === epicFilter)
      : allTasks.filter((t) =>
          (t.dependencies && t.dependencies.length > 0) ||
          allTasks.some((other) => other.dependencies?.includes(t.id))
        );

    const taskIds = new Set(tasksWithDeps.map((t) => t.id));

    // Also include cross-epic dependencies
    if (epicFilter) {
      tasksWithDeps.forEach((t) => {
        t.dependencies?.forEach((depId) => {
          if (!taskIds.has(depId)) {
            const dep = allTasks.find((x) => x.id === depId);
            if (dep) {
              tasksWithDeps.push(dep);
              taskIds.add(depId);
            }
          }
        });
      });
    }

    // Layout: group by epic
    const epicGroups: Record<string, typeof tasksWithDeps> = {};
    tasksWithDeps.forEach((t) => {
      if (!epicGroups[t.epicId]) epicGroups[t.epicId] = [];
      epicGroups[t.epicId].push(t);
    });

    const nodes: Node[] = [];
    let colIndex = 0;
    Object.entries(epicGroups).forEach(([epicId, tasks]) => {
      tasks.forEach((task, rowIndex) => {
        nodes.push({
          id: task.id,
          position: { x: colIndex * 280, y: rowIndex * 80 },
          data: {
            label: (
              <div className="text-left" style={{ minWidth: 180 }}>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-[10px] font-mono opacity-60">{task.id}</span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: priorityColors[task.priority] }}
                  />
                </div>
                <div className="text-xs font-medium leading-tight">
                  {task.name.length > 40 ? task.name.slice(0, 40) + "..." : task.name}
                </div>
                <div className="text-[10px] opacity-50 mt-0.5">{task.owner}</div>
              </div>
            ),
          },
          style: {
            border: `2px solid ${statusBorderColors[task.status]}`,
            borderRadius: "8px",
            padding: "8px",
            backgroundColor: "white",
            fontSize: "12px",
            width: 220,
          },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        });
      });
      colIndex++;
    });

    const edges: Edge[] = [];
    tasksWithDeps.forEach((task) => {
      task.dependencies?.forEach((depId) => {
        if (taskIds.has(depId)) {
          edges.push({
            id: `${depId}-${task.id}`,
            source: depId,
            target: task.id,
            markerEnd: { type: MarkerType.ArrowClosed, width: 12, height: 12 },
            style: { stroke: "#94a3b8", strokeWidth: 1.5 },
            animated: task.status === "Blocked",
          });
        }
      });
    });

    return { nodes, edges };
  }, [epics, epicFilter]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedTask(node.id);
    },
    [setSelectedTask]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold">Dependency Graph</h2>
        <select
          value={epicFilter}
          onChange={(e) => setEpicFilter(e.target.value)}
          className="text-sm border rounded-md px-2 py-1.5"
        >
          <option value="">Tasks with Dependencies</option>
          {epics.map((e) => (
            <option key={e.id} value={e.id}>
              {e.id}: {e.name}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-3 ml-auto text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border-2 border-green-500" /> Complete
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border-2 border-blue-500" /> In Progress
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border-2 border-red-500" /> Blocked
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border-2 border-slate-400" /> Not Started
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border-2 border-purple-500" /> Backlog
          </span>
        </div>
      </div>
      <div
        className="bg-white rounded-xl border"
        style={{ height: "calc(100vh - 220px)" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.2}
          maxZoom={1.5}
          defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        >
          <Background color="#e2e8f0" gap={20} />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              const task = getAllTasks(epics).find((t) => t.id === n.id);
              return task ? statusBorderColors[task.status] : "#94a3b8";
            }}
            maskColor="rgba(248, 250, 252, 0.8)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
