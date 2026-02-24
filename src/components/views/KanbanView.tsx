import { useState } from "react";
import { DndContext, DragOverlay, closestCorners, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useStore } from "../../store/useStore";
import { statusColors, getAllTasks } from "../../lib/utils";
import { PriorityIcon } from "../shared/PriorityIcon";
import { FilterBar } from "../shared/FilterBar";
import type { Status, Task } from "../../types";

const columns: Status[] = ["Backlog", "Not Started", "In Progress", "Blocked", "Complete"];

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const epic = useStore((s) => s.epics.find((e) => e.id === task.epicId));

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className="bg-white rounded-lg border p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <PriorityIcon priority={task.priority} />
        <span className="text-xs font-mono text-slate-400">{task.id}</span>
      </div>
      <p className="text-sm font-medium leading-snug mb-2">{task.name}</p>
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium"
          style={{ backgroundColor: epic?.color }}
        >
          {epic?.id}
        </span>
        <span className="text-xs text-slate-400 truncate max-w-[80px]">{task.owner}</span>
      </div>
    </div>
  );
}

export function KanbanView() {
  const { updateTaskStatus, setSelectedTask, getFilteredEpics } = useStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const filteredEpics = getFilteredEpics();
  const allTasks = getAllTasks(filteredEpics);

  const tasksByStatus: Record<Status, Task[]> = {
    "Backlog": allTasks.filter((t) => t.status === "Backlog"),
    "Not Started": allTasks.filter((t) => t.status === "Not Started"),
    "In Progress": allTasks.filter((t) => t.status === "In Progress"),
    "Blocked": allTasks.filter((t) => t.status === "Blocked"),
    "Complete": allTasks.filter((t) => t.status === "Complete"),
  };

  function handleDragStart(event: DragStartEvent) {
    const task = allTasks.find((t) => t.id === event.active.id);
    setActiveTask(task || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    let newStatus: Status | null = null;

    // Check if dropped on a column
    if (columns.includes(over.id as Status)) {
      newStatus = over.id as Status;
    } else {
      // Dropped on another task - find that task's status
      const overTask = allTasks.find((t) => t.id === over.id);
      if (overTask) newStatus = overTask.status;
    }

    if (newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  }

  return (
    <div className="space-y-4">
      <FilterBar />
      <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {columns.map((status) => {
            const tasks = tasksByStatus[status];
            const colors = statusColors[status];
            return (
              <SortableContext key={status} id={status} items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                <div className="bg-slate-50 rounded-xl p-3 min-h-[200px]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                      <h3 className="text-sm font-semibold text-slate-700">{status}</h3>
                    </div>
                    <span className="text-xs text-slate-400 bg-white px-2 py-0.5 rounded-full">{tasks.length}</span>
                  </div>
                  <div className="space-y-2">
                    {tasks.map((task) => (
                      <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task.id)} />
                    ))}
                  </div>
                </div>
              </SortableContext>
            );
          })}
        </div>
        <DragOverlay>
          {activeTask && (
            <div className="bg-white rounded-lg border-2 border-blue-400 p-3 shadow-lg w-[280px]">
              <div className="flex items-center gap-2 mb-1.5">
                <PriorityIcon priority={activeTask.priority} />
                <span className="text-xs font-mono text-slate-400">{activeTask.id}</span>
              </div>
              <p className="text-sm font-medium">{activeTask.name}</p>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
