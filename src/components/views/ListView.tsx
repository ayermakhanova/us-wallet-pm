import { useState } from "react";
import { ChevronDown, ChevronRight, Expand, Shrink, Plus, Pencil, Check, X } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getEpicProgress, nextStatus } from "../../lib/utils";
import { StatusBadge } from "../shared/StatusBadge";
import { PriorityIcon } from "../shared/PriorityIcon";
import { ProgressBar } from "../shared/ProgressBar";
import { FilterBar } from "../shared/FilterBar";

function EditableEpicName({ epicId, name }: { epicId: string; name: string }) {
  const { updateEpicName } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  if (!editing) {
    return (
      <span
        className="text-sm font-semibold flex-1 truncate group/name cursor-pointer flex items-center gap-1"
        onDoubleClick={(e) => { e.stopPropagation(); setDraft(name); setEditing(true); }}
      >
        {name}
        <Pencil size={11} className="opacity-0 group-hover/name:opacity-40 transition-opacity shrink-0" />
      </span>
    );
  }

  return (
    <div className="flex-1 flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { updateEpicName(epicId, draft.trim() || name); setEditing(false); }
          if (e.key === "Escape") { setDraft(name); setEditing(false); }
        }}
        className="flex-1 text-sm font-semibold border-b-2 border-blue-400 outline-none bg-transparent px-0 py-0"
      />
      <button onClick={() => { updateEpicName(epicId, draft.trim() || name); setEditing(false); }} className="p-0.5 text-green-600 hover:bg-green-50 rounded"><Check size={14} /></button>
      <button onClick={() => { setDraft(name); setEditing(false); }} className="p-0.5 text-slate-400 hover:bg-slate-100 rounded"><X size={14} /></button>
    </div>
  );
}

function EditableTaskName({ taskId, name, onOpen }: { taskId: string; name: string; onOpen: () => void }) {
  const { updateTaskName } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  if (!editing) {
    return (
      <div className="flex items-center gap-1 group/task">
        <button
          onClick={onOpen}
          className="text-left text-sm hover:text-blue-600 transition-colors font-medium truncate"
        >
          {name}
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setDraft(name); setEditing(true); }}
          className="p-0.5 opacity-0 group-hover/task:opacity-40 hover:!opacity-100 transition-opacity shrink-0 hover:bg-slate-100 rounded"
          title="Edit name"
        >
          <Pencil size={11} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { updateTaskName(taskId, draft.trim() || name); setEditing(false); }
          if (e.key === "Escape") { setDraft(name); setEditing(false); }
        }}
        className="flex-1 text-sm font-medium border-b-2 border-blue-400 outline-none bg-transparent px-0 py-0"
      />
      <button onClick={() => { updateTaskName(taskId, draft.trim() || name); setEditing(false); }} className="p-0.5 text-green-600 hover:bg-green-50 rounded"><Check size={14} /></button>
      <button onClick={() => { setDraft(name); setEditing(false); }} className="p-0.5 text-slate-400 hover:bg-slate-100 rounded"><X size={14} /></button>
    </div>
  );
}

function EditableEpicOwner({ epicId, owner }: { epicId: string; owner: string }) {
  const { updateEpicOwner } = useStore();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(owner);

  if (!editing) {
    return (
      <span
        className="text-xs text-slate-400 shrink-0 hidden lg:flex items-center gap-1 w-24 text-right group/owner cursor-pointer"
        onClick={(e) => { e.stopPropagation(); setDraft(owner); setEditing(true); }}
        title="Click to edit owner"
      >
        <span className="truncate flex-1">{owner}</span>
        <Pencil size={10} className="opacity-0 group-hover/owner:opacity-40 transition-opacity shrink-0" />
      </span>
    );
  }

  return (
    <div className="flex items-center gap-1 shrink-0 hidden lg:flex w-24" onClick={(e) => e.stopPropagation()}>
      <input
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { updateEpicOwner(epicId, draft.trim() || owner); setEditing(false); }
          if (e.key === "Escape") { setDraft(owner); setEditing(false); }
        }}
        onBlur={() => { updateEpicOwner(epicId, draft.trim() || owner); setEditing(false); }}
        className="w-full text-xs border-b-2 border-blue-400 outline-none bg-transparent px-0 py-0 text-right"
      />
    </div>
  );
}

export function ListView() {
  const { expandedEpics, toggleEpic, expandAllEpics, collapseAllEpics, setSelectedTask, updateTaskStatus, getFilteredEpics, addMilestone } = useStore();
  const filtered = getFilteredEpics();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <FilterBar />
        <div className="flex items-center gap-2">
          <button onClick={expandAllEpics} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 px-2 py-1 border rounded-md">
            <Expand size={12} /> Expand All
          </button>
          <button onClick={collapseAllEpics} className="text-xs text-slate-500 hover:text-slate-700 flex items-center gap-1 px-2 py-1 border rounded-md">
            <Shrink size={12} /> Collapse All
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((epic) => {
          const expanded = expandedEpics.has(epic.id);
          const p = getEpicProgress(epic);
          return (
            <div key={epic.id} className="bg-white rounded-xl border overflow-hidden">
              {/* Epic Header */}
              <button
                onClick={() => toggleEpic(epic.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left group"
              >
                {expanded ? <ChevronDown size={16} className="text-slate-400 shrink-0" /> : <ChevronRight size={16} className="text-slate-400 shrink-0" />}
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: epic.color }} />
                <span className="text-xs font-mono text-slate-400 shrink-0">{epic.id}</span>
                <EditableEpicName epicId={epic.id} name={epic.name} />
                <PriorityIcon priority={epic.priority} />
                <div className="w-32 hidden md:block">
                  <ProgressBar complete={p.complete} inProgress={p.inProgress} blocked={p.blocked} total={p.total} showLabel={false} height="h-1.5" />
                </div>
                <span className="text-xs text-slate-500 shrink-0 w-16 text-right">{p.complete}/{p.total}</span>
                <span className="text-xs text-slate-400 shrink-0 hidden lg:block w-24 text-right">{epic.target}</span>
                <EditableEpicOwner epicId={epic.id} owner={epic.owner} />
              </button>

              {/* Task Table */}
              {expanded && (
                <div className="border-t">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
                        <th className="text-left px-4 py-2 font-medium w-16">ID</th>
                        <th className="text-left px-2 py-2 font-medium">Milestone</th>
                        <th className="text-left px-2 py-2 font-medium w-24">Owner</th>
                        <th className="text-center px-2 py-2 font-medium w-16">Priority</th>
                        <th className="text-left px-2 py-2 font-medium w-28">Status</th>
                        <th className="text-left px-2 py-2 font-medium w-20 hidden lg:table-cell">Deps</th>
                        <th className="text-center px-2 py-2 font-medium w-14 hidden lg:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {epic.tasks.map((task) => (
                        <tr key={task.id} className="hover:bg-blue-50/50 transition-colors group">
                          <td className="px-4 py-2.5">
                            <span className="font-mono text-xs text-slate-400">{task.id}</span>
                          </td>
                          <td className="px-2 py-2.5">
                            <EditableTaskName taskId={task.id} name={task.name} onOpen={() => setSelectedTask(task.id)} />
                          </td>
                          <td className="px-2 py-2.5 text-xs text-slate-500 truncate max-w-[100px]">{task.owner}</td>
                          <td className="px-2 py-2.5 text-center"><PriorityIcon priority={task.priority} /></td>
                          <td className="px-2 py-2.5">
                            <StatusBadge status={task.status} onClick={() => updateTaskStatus(task.id, nextStatus(task.status))} />
                          </td>
                          <td className="px-2 py-2.5 hidden lg:table-cell">
                            {task.dependencies && task.dependencies.length > 0 && (
                              <span className="text-xs text-slate-400">{task.dependencies.join(", ")}</span>
                            )}
                          </td>
                          <td className="px-2 py-2.5 text-center hidden lg:table-cell">
                            {task.notes.length > 0 && (
                              <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-full">{task.notes.length}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {/* Add Milestone Button */}
                  <div className="border-t border-dashed border-slate-200 px-4 py-2">
                    <button
                      onClick={() => addMilestone(epic.id)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-600 transition-colors py-1 px-2 rounded-md hover:bg-blue-50"
                    >
                      <Plus size={13} /> Add milestone
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
