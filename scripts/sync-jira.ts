/**
 * Daily Jira → dashboard sync.
 *
 * For each WorkstreamLane with a jiraInitiativeKey, fetches the Initiative's
 * child Epics from Jira and writes them as dashboard Epic/Task JSON to
 * public/data/workstreams.json plus a meta file public/data/last-synced.json.
 *
 * Required env: ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN, JIRA_BASE_URL
 *
 * Run: npm run sync:jira
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { workstreamLanes } from "../src/data/workstream-mapping.ts";
import type { Status, Priority, Epic, Task } from "../src/types/index.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");

const { ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN, JIRA_BASE_URL } = process.env;

if (!ATLASSIAN_EMAIL || !ATLASSIAN_API_TOKEN || !JIRA_BASE_URL) {
  console.error(
    "Missing required env. Set ATLASSIAN_EMAIL, ATLASSIAN_API_TOKEN, JIRA_BASE_URL (see .env.example)."
  );
  process.exit(1);
}

const authHeader =
  "Basic " + Buffer.from(`${ATLASSIAN_EMAIL}:${ATLASSIAN_API_TOKEN}`).toString("base64");

async function jiraFetch<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${JIRA_BASE_URL}${path}`, {
    headers: { Authorization: authHeader, Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Jira API ${res.status} on ${path}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}

function mapStatus(jiraStatus: { name: string; statusCategory?: { key: string } }): Status {
  // statusCategory is more reliable than name (which varies per project workflow)
  const categoryKey = jiraStatus.statusCategory?.key?.toLowerCase();
  if (categoryKey === "done") return "Complete";
  if (categoryKey === "indeterminate") return "In Progress";
  // categoryKey === "new" or unknown — check name for refinements
  const name = jiraStatus.name.toLowerCase();
  if (name.includes("blocked")) return "Blocked";
  if (name === "backlog") return "Backlog";
  return "Not Started";
}

function mapPriority(jiraPriority?: string): Priority {
  switch (jiraPriority) {
    case "Highest":
      return "Highest";
    case "High":
      return "High";
    case "Low":
      return "Low";
    default:
      return "Medium";
  }
}

interface JiraIssue {
  key: string;
  fields: {
    summary: string;
    status: { name: string; statusCategory?: { key: string } };
    priority?: { name: string };
    assignee?: { displayName: string } | null;
    duedate?: string | null;
    issuetype: { name: string };
    description?: string | null;
  };
}

interface JiraSearchResponse {
  issues: JiraIssue[];
}

async function fetchEpicsUnderInitiative(initiativeKey: string): Promise<JiraIssue[]> {
  const jql = encodeURIComponent(`parent = ${initiativeKey} AND issuetype = Epic ORDER BY created ASC`);
  const fields = "summary,status,statusCategory,priority,assignee,duedate,issuetype";
  const data = await jiraFetch<JiraSearchResponse>(
    `/rest/api/3/search?jql=${jql}&fields=${fields}&maxResults=100`
  );
  return data.issues || [];
}

function rollUpStatus(tasks: Task[]): Status {
  if (tasks.length === 0) return "Not Started";
  if (tasks.some((t) => t.status === "Blocked")) return "Blocked";
  if (tasks.every((t) => t.status === "Complete")) return "Complete";
  if (tasks.some((t) => t.status === "In Progress")) return "In Progress";
  return "Not Started";
}

async function buildLaneData() {
  const today = new Date().toISOString().split("T")[0];
  const lanes: Epic[] = [];
  const errors: { lane: string; error: string }[] = [];

  for (const lane of workstreamLanes) {
    if (!lane.jiraInitiativeKey) {
      console.log(`[skip] ${lane.id}: no Jira mapping`);
      continue;
    }

    console.log(`[sync] ${lane.id} ← ${lane.jiraInitiativeKey}`);
    let epics: JiraIssue[];
    try {
      epics = await fetchEpicsUnderInitiative(lane.jiraInitiativeKey);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`[error] ${lane.id}: ${message}`);
      errors.push({ lane: lane.id, error: message });
      continue;
    }

    const tasks: Task[] = epics.map((issue) => ({
      id: issue.key,
      epicId: lane.id,
      name: issue.fields.summary,
      status: mapStatus(issue.fields.status),
      priority: mapPriority(issue.fields.priority?.name),
      owner: issue.fields.assignee?.displayName || "—",
      dueDate: issue.fields.duedate || undefined,
      tags: [`jira:${issue.key}`],
      notes: [],
      createdDate: today,
      updatedDate: today,
    }));

    lanes.push({
      id: lane.id,
      name: lane.name,
      status: rollUpStatus(tasks),
      priority: "High",
      target: lane.target,
      startMonth: 5,
      endMonth: 9,
      owner: lane.owner,
      color: lane.color,
      tasks,
    });
  }

  return { lanes, errors };
}

async function main() {
  console.log(`[sync] ${new Date().toISOString()} starting Jira → dashboard sync`);
  const { lanes, errors } = await buildLaneData();

  const outputDir = resolve(REPO_ROOT, "public", "data");
  mkdirSync(outputDir, { recursive: true });

  const workstreamsPath = resolve(outputDir, "workstreams.json");
  writeFileSync(workstreamsPath, JSON.stringify(lanes, null, 2) + "\n");

  const syncedLaneCount = lanes.length;
  const syncMetaPath = resolve(outputDir, "last-synced.json");
  writeFileSync(
    syncMetaPath,
    JSON.stringify(
      {
        syncedAt: new Date().toISOString(),
        laneCount: syncedLaneCount,
        totalLanes: workstreamLanes.length,
        errors,
      },
      null,
      2
    ) + "\n"
  );

  console.log(`[sync] wrote ${syncedLaneCount} lane(s) to ${workstreamsPath}`);
  if (errors.length > 0) {
    console.warn(`[sync] completed with ${errors.length} error(s)`);
  }
}

main().catch((err) => {
  console.error("[sync] FAILED:", err);
  process.exit(1);
});
