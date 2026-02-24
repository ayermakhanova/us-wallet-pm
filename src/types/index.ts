export type Status = "Not Started" | "In Progress" | "Blocked" | "Complete" | "Backlog";
export type Priority = "Highest" | "High" | "Medium" | "Low";
export type RiskLikelihood = "High" | "Medium" | "Low";
export type RiskImpact = "High" | "Medium" | "Low";
export type ViewType = "dashboard" | "list" | "kanban" | "timeline" | "dependencies" | "risks" | "raci" | "decisions" | "reports";

export interface Note {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface Task {
  id: string;
  epicId: string;
  name: string;
  description?: string;
  status: Status;
  priority: Priority;
  owner: string;
  assignee?: string;
  startDate?: string;
  dueDate?: string;
  dependencies?: string[];
  notes: Note[];
  tags?: string[];
  blockerReason?: string;
  completedDate?: string;
  createdDate: string;
  updatedDate: string;
}

export interface Epic {
  id: string;
  name: string;
  description?: string;
  status: Status;
  priority: Priority;
  target: string;
  startMonth: number;
  endMonth: number;
  owner: string;
  color: string;
  tasks: Task[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  org: string;
  email?: string;
  raci?: "R" | "A" | "C" | "I" | "";
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  likelihood: RiskLikelihood;
  impact: RiskImpact;
  mitigation: string;
  owner: string;
  status: "Open" | "Mitigated" | "Closed";
  category: string;
  source?: string;
}

export interface Decision {
  id: string;
  date: string;
  decision: string;
  rationale?: string;
  owner: string;
  status: "Final" | "Pending" | "Revisit";
  source: string;
}

export interface RaciEntry {
  epicId: string;
  activity: string;
  assignments: Record<string, "R" | "A" | "C" | "I" | "">;
}

export interface Filters {
  status: Status | "All";
  priority: Priority | "All";
  owner: string;
  epic: string;
  search: string;
}
