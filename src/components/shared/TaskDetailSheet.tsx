import { X, Link2, Tag, MessageSquare, Pencil, Check } from "lucide-react";
import { useStore } from "../../store/useStore";
import { getEpicById, getTaskById } from "../../lib/utils";
import { useState } from "react";
import type { Status, Priority } from "../../types";

const statuses: Status[] = ["Backlog", "Not Started", "In Progress", "Blocked", "Complete"];
const priorities: Priority[] = ["Highest", "High", "Medium", "Low"];

export function TaskDetailSheet() {
  const { selectedTaskId, setSelectedTask, epics, updateTaskStatus, updateTaskPriority, updateTaskOwner, updateTaskField, addNoteToTask, updateTaskName } = useStore();
  const [noteText, setNoteText] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [draftName, setDraftName] = useState("");

  if (!selectedTaskId) return null;
  const task = getTaskById(epics, selectedTaskId);
  if (!task) return null;
  const epic = getEpicById(epics, task.epicId);

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addNoteToTask(task.id, noteText.trim(), "Aidana Yermakhanova");
    setNoteText("");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20" onClick={() => setSelectedTask(null)} />
      <div className="relative w-full max-w-lg bg-white shadow-xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded text-white" style={{ backgroundColor: epic?.color }}>{task.id}</span>
            <span className="text-sm text-slate-500">{epic?.name}</span>
          </div>
          <button onClick={() => setSelectedTask(null)} className="p-1 hover:bg-slate-100 rounded"><X size={18} /></button>
        </div>
        <div className="px-6 py-5 space-y-6">
          {/* Editable milestone name */}
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { updateTaskName(task.id, draftName.trim() || task.name); setEditingName(false); }
                  if (e.key === "Escape") { setDraftName(task.name); setEditingName(false); }
                }}
                className="flex-1 text-lg font-semibold border-b-2 border-blue-400 outline-none bg-transparent px-0 py-0"
              />
              <button onClick={() => { updateTaskName(task.id, draftName.trim() || task.name); setEditingName(false); }} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check size={16} /></button>
              <button onClick={() => { setDraftName(task.name); setEditingName(false); }} className="p-1 text-slate-400 hover:bg-slate-100 rounded"><X size={16} /></button>
            </div>
          ) : (
            <div className="flex items-center gap-2 group">
              <h2 className="text-lg font-semibold flex-1">{task.name}</h2>
              <button
                onClick={() => { setDraftName(task.name); setEditingName(true); }}
                className="p-1 opacity-0 group-hover:opacity-50 hover:!opacity-100 transition-opacity hover:bg-slate-100 rounded"
                title="Edit name"
              >
                <Pencil size={14} />
              </button>
            </div>
          )}
          {task.description && <p className="text-sm text-slate-600 leading-relaxed">{task.description}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Status</label>
              <select value={task.status} onChange={(e) => updateTaskStatus(task.id, e.target.value as Status)} className="w-full text-sm border rounded-md px-2 py-1.5">
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Priority</label>
              <select value={task.priority} onChange={(e) => updateTaskPriority(task.id, e.target.value as Priority)} className="w-full text-sm border rounded-md px-2 py-1.5">
                {priorities.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Owner</label>
              <input value={task.owner} onChange={(e) => updateTaskOwner(task.id, e.target.value)} className="w-full text-sm border rounded-md px-2 py-1.5" />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Due Date</label>
              <input type="date" value={task.dueDate || ""} onChange={(e) => updateTaskField(task.id, "dueDate", e.target.value)} className="w-full text-sm border rounded-md px-2 py-1.5" />
            </div>
          </div>
          {task.status === "Blocked" && (
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Blocker Reason</label>
              <textarea value={task.blockerReason || ""} onChange={(e) => updateTaskField(task.id, "blockerReason", e.target.value)} className="w-full text-sm border rounded-md px-2 py-2 min-h-[60px]" placeholder="Describe what's blocking this task..." />
            </div>
          )}
          {task.dependencies && task.dependencies.length > 0 && (
            <div>
              <label className="text-xs text-slate-500 mb-2 block flex items-center gap-1"><Link2 size={12} /> Dependencies</label>
              <div className="flex flex-wrap gap-1.5">
                {task.dependencies.map((depId) => {
                  const dep = getTaskById(epics, depId);
                  return <button key={depId} onClick={() => setSelectedTask(depId)} className="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors">{depId}: {dep?.name.slice(0, 30)}...</button>;
                })}
              </div>
            </div>
          )}
          {task.tags && task.tags.length > 0 && (
            <div>
              <label className="text-xs text-slate-500 mb-2 block flex items-center gap-1"><Tag size={12} /> Tags</label>
              <div className="flex flex-wrap gap-1.5">
                {task.tags.map((tag) => <span key={tag} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{tag}</span>)}
              </div>
            </div>
          )}
          <div>
            <label className="text-xs text-slate-500 mb-2 block flex items-center gap-1"><MessageSquare size={12} /> Notes ({task.notes.length})</label>
            <div className="space-y-2 mb-3">
              {task.notes.map((note) => (
                <div key={note.id} className="bg-slate-50 rounded-lg px-3 py-2">
                  <p className="text-sm">{note.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{note.author} - {note.date}</p>
                </div>
              ))}
              {task.notes.length === 0 && <p className="text-xs text-slate-400">No notes yet.</p>}
            </div>
            <div className="flex gap-2">
              <input value={noteText} onChange={(e) => setNoteText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddNote()} placeholder="Add a note..." className="flex-1 text-sm border rounded-md px-3 py-1.5" />
              <button onClick={handleAddNote} className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors">Add</button>
            </div>
          </div>
          <div className="text-xs text-slate-400 pt-4 border-t space-y-1">
            <p>Created: {task.createdDate}</p>
            <p>Updated: {task.updatedDate}</p>
            {task.completedDate && <p>Completed: {task.completedDate}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
