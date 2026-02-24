import { create } from "zustand";
import type { Epic, Task, Risk, Decision, TeamMember, Status, Priority, ViewType, Filters, Note } from "../types";
import { initialEpics, initialRisks, initialDecisions, teamMembers as initialTeamMembers } from "../data/initialData";
import { generateId } from "../lib/utils";

interface AppState {
  epics: Epic[];
  risks: Risk[];
  decisions: Decision[];
  teamMembers: TeamMember[];
  currentView: ViewType;
  filters: Filters;
  selectedTaskId: string | null;
  sidebarOpen: boolean;
  expandedEpics: Set<string>;

  // View actions
  setView: (view: ViewType) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Filter actions
  setFilter: (key: keyof Filters, value: string) => void;
  resetFilters: () => void;

  // Task actions
  setSelectedTask: (taskId: string | null) => void;
  updateTaskStatus: (taskId: string, status: Status) => void;
  updateTaskPriority: (taskId: string, priority: Priority) => void;
  updateTaskOwner: (taskId: string, owner: string) => void;
  updateTaskField: (taskId: string, field: keyof Task, value: unknown) => void;
  addNoteToTask: (taskId: string, text: string, author: string) => void;
  toggleEpic: (epicId: string) => void;
  expandAllEpics: () => void;
  collapseAllEpics: () => void;

  // Epic/Task name + add milestone
  updateEpicName: (epicId: string, name: string) => void;
  updateEpicOwner: (epicId: string, owner: string) => void;
  updateTaskName: (taskId: string, name: string) => void;
  addMilestone: (epicId: string) => void;

  // Risk actions
  updateRisk: (riskId: string, updates: Partial<Risk>) => void;
  addRisk: (risk: Omit<Risk, "id">) => void;

  // Decision actions
  addDecision: (decision: Omit<Decision, "id">) => void;
  updateDecision: (id: string, updates: Partial<Decision>) => void;

  // Team member actions
  updateTeamMemberRaci: (memberId: string, raci: "" | "R" | "A" | "C" | "I") => void;

  // Filtered data getters
  getFilteredEpics: () => Epic[];
}

const defaultFilters: Filters = {
  status: "All",
  priority: "All",
  owner: "",
  epic: "",
  search: "",
};

export const useStore = create<AppState>((set, get) => ({
  epics: initialEpics,
  risks: initialRisks,
  decisions: initialDecisions,
  teamMembers: initialTeamMembers,
  currentView: "dashboard",
  filters: defaultFilters,
  selectedTaskId: null,
  sidebarOpen: true,
  expandedEpics: new Set<string>(),

  setView: (view) => set({ currentView: view }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  setFilter: (key, value) =>
    set((s) => ({ filters: { ...s.filters, [key]: value } })),
  resetFilters: () => set({ filters: defaultFilters }),

  setSelectedTask: (taskId) => set({ selectedTaskId: taskId }),

  updateTaskStatus: (taskId, status) =>
    set((s) => ({
      epics: s.epics.map((epic) => ({
        ...epic,
        tasks: epic.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                status,
                updatedDate: new Date().toISOString().split("T")[0],
                completedDate: status === "Complete" ? new Date().toISOString().split("T")[0] : t.completedDate,
              }
            : t
        ),
      })),
    })),

  updateTaskPriority: (taskId, priority) =>
    set((s) => ({
      epics: s.epics.map((epic) => ({
        ...epic,
        tasks: epic.tasks.map((t) =>
          t.id === taskId ? { ...t, priority, updatedDate: new Date().toISOString().split("T")[0] } : t
        ),
      })),
    })),

  updateTaskOwner: (taskId, owner) =>
    set((s) => ({
      epics: s.epics.map((epic) => ({
        ...epic,
        tasks: epic.tasks.map((t) =>
          t.id === taskId ? { ...t, owner, updatedDate: new Date().toISOString().split("T")[0] } : t
        ),
      })),
    })),

  updateTaskField: (taskId, field, value) =>
    set((s) => ({
      epics: s.epics.map((epic) => ({
        ...epic,
        tasks: epic.tasks.map((t) =>
          t.id === taskId ? { ...t, [field]: value, updatedDate: new Date().toISOString().split("T")[0] } : t
        ),
      })),
    })),

  addNoteToTask: (taskId, text, author) =>
    set((s) => ({
      epics: s.epics.map((epic) => ({
        ...epic,
        tasks: epic.tasks.map((t) =>
          t.id === taskId
            ? {
                ...t,
                notes: [
                  ...t.notes,
                  { id: generateId(), text, author, date: new Date().toISOString().split("T")[0] },
                ],
                updatedDate: new Date().toISOString().split("T")[0],
              }
            : t
        ),
      })),
    })),

  toggleEpic: (epicId) =>
    set((s) => {
      const next = new Set(s.expandedEpics);
      if (next.has(epicId)) next.delete(epicId);
      else next.add(epicId);
      return { expandedEpics: next };
    }),

  expandAllEpics: () =>
    set((s) => ({ expandedEpics: new Set(s.epics.map((e) => e.id)) })),

  collapseAllEpics: () => set({ expandedEpics: new Set() }),

  updateEpicName: (epicId, name) =>
    set((s) => ({
      epics: s.epics.map((e) => (e.id === epicId ? { ...e, name } : e)),
    })),

  updateEpicOwner: (epicId, owner) =>
    set((s) => ({
      epics: s.epics.map((e) => (e.id === epicId ? { ...e, owner } : e)),
    })),

  updateTaskName: (taskId, name) =>
    set((s) => ({
      epics: s.epics.map((epic) => ({
        ...epic,
        tasks: epic.tasks.map((t) =>
          t.id === taskId ? { ...t, name, updatedDate: new Date().toISOString().split("T")[0] } : t
        ),
      })),
    })),

  addMilestone: (epicId) =>
    set((s) => {
      const today = new Date().toISOString().split("T")[0];
      const epic = s.epics.find((e) => e.id === epicId);
      if (!epic) return s;
      const nextNum = epic.tasks.length + 1;
      const newTask: Task = {
        id: `${epicId}-M${nextNum}`,
        epicId,
        name: "New milestone",
        status: "Not Started",
        priority: "Medium",
        owner: epic.owner,
        notes: [],
        tags: [],
        createdDate: today,
        updatedDate: today,
      };
      return {
        epics: s.epics.map((e) =>
          e.id === epicId ? { ...e, tasks: [...e.tasks, newTask] } : e
        ),
      };
    }),

  updateRisk: (riskId, updates) =>
    set((s) => ({
      risks: s.risks.map((r) => (r.id === riskId ? { ...r, ...updates } : r)),
    })),

  addRisk: (risk) =>
    set((s) => ({
      risks: [...s.risks, { ...risk, id: `R${s.risks.length + 1}` }],
    })),

  addDecision: (decision) =>
    set((s) => ({
      decisions: [...s.decisions, { ...decision, id: `D${s.decisions.length + 1}` }],
    })),

  updateDecision: (id, updates) =>
    set((s) => ({
      decisions: s.decisions.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),

  updateTeamMemberRaci: (memberId, raci) =>
    set((s) => ({
      teamMembers: s.teamMembers.map((m) =>
        m.id === memberId ? { ...m, raci } : m
      ),
    })),

  getFilteredEpics: () => {
    const { epics, filters } = get();
    return epics
      .map((epic) => {
        if (filters.epic && filters.epic !== "" && epic.id !== filters.epic) return null;
        const filteredTasks = epic.tasks.filter((t) => {
          if (filters.status !== "All" && t.status !== filters.status) return false;
          if (filters.priority !== "All" && t.priority !== filters.priority) return false;
          if (filters.owner && !t.owner.toLowerCase().includes(filters.owner.toLowerCase())) return false;
          if (filters.search) {
            const q = filters.search.toLowerCase();
            return (
              t.name.toLowerCase().includes(q) ||
              t.id.toLowerCase().includes(q) ||
              (t.description || "").toLowerCase().includes(q) ||
              (t.tags || []).some((tag) => tag.toLowerCase().includes(q))
            );
          }
          return true;
        });
        if (filteredTasks.length === 0 && (filters.status !== "All" || filters.priority !== "All" || filters.search || filters.owner)) return null;
        return { ...epic, tasks: filteredTasks };
      })
      .filter(Boolean) as Epic[];
  },
}));
