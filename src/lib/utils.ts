import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Status, Priority, Epic, Task } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export const statusColors: Record<Status, { bg: string; text: string; dot: string }> = {
  "Not Started": { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
  "In Progress": { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  "Blocked": { bg: "bg-red-100", text: "text-red-600", dot: "bg-red-500" },
  "Complete": { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
  "Backlog": { bg: "bg-purple-100", text: "text-purple-600", dot: "bg-purple-400" },
};

export const priorityColors: Record<Priority, string> = {
  "Highest": "#dc2626",
  "High": "#f97316",
  "Medium": "#eab308",
  "Low": "#94a3b8",
};

export const statusOrder: Status[] = ["Not Started", "In Progress", "Blocked", "Complete", "Backlog"];

export function nextStatus(current: Status): Status {
  const idx = statusOrder.indexOf(current);
  return statusOrder[(idx + 1) % statusOrder.length];
}

export function getAllTasks(epics: Epic[]): Task[] {
  return epics.flatMap((e) => e.tasks);
}

export function getTaskById(epics: Epic[], taskId: string): Task | undefined {
  for (const epic of epics) {
    const task = epic.tasks.find((t) => t.id === taskId);
    if (task) return task;
  }
  return undefined;
}

export function getEpicById(epics: Epic[], epicId: string): Epic | undefined {
  return epics.find((e) => e.id === epicId);
}

export function getEpicProgress(epic: Epic): {
  total: number;
  complete: number;
  inProgress: number;
  blocked: number;
  notStarted: number;
  backlog: number;
  percentage: number;
} {
  const total = epic.tasks.length;
  const complete = epic.tasks.filter((t) => t.status === "Complete").length;
  const inProgress = epic.tasks.filter((t) => t.status === "In Progress").length;
  const blocked = epic.tasks.filter((t) => t.status === "Blocked").length;
  const notStarted = epic.tasks.filter((t) => t.status === "Not Started").length;
  const backlog = epic.tasks.filter((t) => t.status === "Backlog").length;
  return { total, complete, inProgress, blocked, notStarted, backlog, percentage: total > 0 ? Math.round((complete / total) * 100) : 0 };
}

export function getProgramStats(epics: Epic[]) {
  const all = getAllTasks(epics);
  const total = all.length;
  const complete = all.filter((t) => t.status === "Complete").length;
  const inProgress = all.filter((t) => t.status === "In Progress").length;
  const blocked = all.filter((t) => t.status === "Blocked").length;
  const notStarted = all.filter((t) => t.status === "Not Started").length;
  const backlog = all.filter((t) => t.status === "Backlog").length;
  return { total, complete, inProgress, blocked, notStarted, backlog, percentage: total > 0 ? Math.round((complete / total) * 100) : 0 };
}

export function getRiskScore(likelihood: string, impact: string): number {
  const values: Record<string, number> = { High: 3, Medium: 2, Low: 1 };
  return (values[likelihood] || 1) * (values[impact] || 1);
}

export function getRiskColor(likelihood: string, impact: string): string {
  const score = getRiskScore(likelihood, impact);
  if (score >= 9) return "#dc2626";
  if (score >= 6) return "#f97316";
  if (score >= 4) return "#eab308";
  return "#22c55e";
}

export const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
