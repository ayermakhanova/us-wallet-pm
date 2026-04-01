import { LayoutDashboard, List, Columns3, Clock, GitBranch, AlertTriangle, Users, BookOpen, FileBarChart, Menu, GripVertical, CalendarRange, Milestone } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getProgramStats } from "../../lib/utils";
import type { ViewType } from "../../types";
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const VIEW_DEFS: Record<ViewType, { label: string; icon: typeof LayoutDashboard }> = {
  dashboard: { label: "Dashboard", icon: LayoutDashboard },
  list: { label: "List", icon: List },
  kanban: { label: "Kanban", icon: Columns3 },
  timeline: { label: "Timeline", icon: Clock },
  dependencies: { label: "Dependencies", icon: GitBranch },
  risks: { label: "Risks", icon: AlertTriangle },
  raci: { label: "RACI", icon: Users },
  decisions: { label: "Decisions", icon: BookOpen },
  reports: { label: "Reports", icon: FileBarChart },
  "master-timeline": { label: "Master Timeline", icon: CalendarRange },
  "helix-timeline": { label: "Helix Timeline", icon: Milestone },
};

function SortableTab({ id, isActive, onClick }: { id: ViewType; isActive: boolean; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const def = VIEW_DEFS[id];
  const Icon = def.icon;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap cursor-grab active:cursor-grabbing ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
      {...attributes}
      {...listeners}
    >
      <GripVertical size={12} className="text-slate-300 flex-shrink-0" />
      <Icon size={15} />
      <span className="hidden sm:inline">{def.label}</span>
    </button>
  );
}

export function Header() {
  const { currentView, setView, viewOrder, reorderViews, epics, toggleSidebar } = useStore();
  const stats = getProgramStats(epics);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderViews(active.id as string, over.id as string);
    }
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-3">
          <button onClick={toggleSidebar} className="p-1.5 hover:bg-slate-100 rounded-md lg:hidden"><Menu size={20} /></button>
          <h1 className="text-base font-bold text-slate-900 whitespace-nowrap">US Wallet Program</h1>
          <div className="hidden md:flex items-center gap-2 ml-4">
            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">{stats.total} tasks</span>
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 rounded-full">{stats.complete} done</span>
            {stats.blocked > 0 && <span className="text-xs px-2 py-0.5 bg-red-50 text-red-700 rounded-full">{stats.blocked} blocked</span>}
            <span className="text-xs text-slate-500 ml-1">{stats.percentage}%</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-0.5 px-4 overflow-x-auto pb-0">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={viewOrder} strategy={horizontalListSortingStrategy}>
            {viewOrder.map((id) => (
              <SortableTab key={id} id={id} isActive={currentView === id} onClick={() => setView(id)} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </header>
  );
}
