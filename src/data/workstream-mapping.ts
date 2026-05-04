/**
 * Canonical 13-workstream definition for the US Wallet program, aligned with
 * the steering committee deck. Each lane optionally points to a Jira Initiative
 * key — when set, the daily sync (scripts/sync-jira.ts) replaces the lane's
 * tasks with the Initiative's child Epics from Jira.
 *
 * Lanes with jiraInitiativeKey === null fall back to whatever static data
 * lives in src/data/initialData.ts. As Initiatives get created in Jira, set
 * the key here and the dashboard goes live for that lane on the next sync.
 */

export interface WorkstreamLane {
  id: string;
  name: string;
  jiraInitiativeKey: string | null;
  order: number;
  owner: string;
  target: string;
  color: string;
}

export const workstreamLanes: WorkstreamLane[] = [
  {
    id: "vendor-mgmt",
    name: "Vendor Management & Program Commercials",
    jiraInitiativeKey: "RPMO-1844",
    order: 1,
    owner: "Fahad Rehman",
    target: "Q3 2026",
    color: "#2563eb",
  },
  {
    id: "product",
    name: "Product",
    jiraInitiativeKey: null,
    order: 2,
    owner: "Matias Stephens, Arevik Sargsyan",
    target: "Q3 2026",
    color: "#7c3aed",
  },
  {
    id: "febe-dev",
    name: "FE/BE Development",
    jiraInitiativeKey: null,
    order: 3,
    owner: "Hardik Joshi, Chaitanya Telukuntla",
    target: "Q3 2026",
    color: "#0891b2",
  },
  {
    id: "card-design",
    name: "Card Design",
    jiraInitiativeKey: null,
    order: 4,
    owner: "Rigved Sathe",
    target: "Q3 2026",
    color: "#0d9488",
  },
  {
    id: "compliance-legal",
    name: "Compliance & Legal",
    jiraInitiativeKey: null,
    order: 5,
    owner: "Alex Ketter, Kenan Haskovic",
    target: "Q3 2026",
    color: "#dc2626",
  },
  {
    id: "finance-accounting",
    name: "Finance & Accounting",
    jiraInitiativeKey: null,
    order: 6,
    owner: "Scott Penderis",
    target: "Q3 2026",
    color: "#ca8a04",
  },
  {
    id: "revenue-management",
    name: "Revenue Management",
    jiraInitiativeKey: null,
    order: 7,
    owner: "Alonzo Venegas",
    target: "Q3 2026",
    color: "#16a34a",
  },
  {
    id: "customer-care",
    name: "Customer Care & Support",
    jiraInitiativeKey: null,
    order: 8,
    owner: "Abby Valenzuela, Danika Keblar",
    target: "Q3 2026",
    color: "#db2777",
  },
  {
    id: "fraud",
    name: "Fraud",
    jiraInitiativeKey: null,
    order: 9,
    owner: "Taylor Kwan, Rodrigo De la Fuente",
    target: "Q3 2026",
    color: "#9333ea",
  },
  {
    id: "security-privacy",
    name: "Security & Privacy",
    jiraInitiativeKey: null,
    order: 10,
    owner: "Andres Porras Garcia, Aaron Toren",
    target: "Q3 2026",
    color: "#475569",
  },
  {
    id: "data-reporting",
    name: "Data & Reporting (BI)",
    jiraInitiativeKey: null,
    order: 11,
    owner: "Korey McGee",
    target: "Q3 2026",
    color: "#0369a1",
  },
  {
    id: "card-fulfillment",
    name: "Card Fulfillment & Inventory",
    jiraInitiativeKey: null,
    order: 12,
    owner: "Cristian Castaneda",
    target: "Q3 2026",
    color: "#a16207",
  },
  {
    id: "marketing",
    name: "Marketing",
    jiraInitiativeKey: null,
    order: 13,
    owner: "Hillary Bontempi",
    target: "Q3 2026",
    color: "#e11d48",
  },
];
