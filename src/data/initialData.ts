import type { Epic, TeamMember, Risk, Decision } from "../types";

export const teamMembers: TeamMember[] = [
  // ── Ria Wallet/Card Program ──
  { id: "TM1", name: "Fahad Rehman", role: "Sr. Director, Wallet & Card Program", org: "Ria Wallet/Card Program", email: "Frehman@riamoneytransfer.com", raci: "A" },
  { id: "TM2", name: "Arevik Sargsyan", role: "Director, Wallet & Card Program", org: "Ria Wallet/Card Program", email: "asargsyan@riamoneytransfer.com", raci: "A" },

  // ── Ria Project Management ──
  { id: "TM3", name: "Aidana Yermakhanova", role: "Project Manager", org: "Ria Project Management", email: "Ddunn@riamoneytransfer.com", raci: "R" },
  { id: "TM4", name: "Riley Green", role: "Project Management Supervisor", org: "Ria Project Management", email: "rpelosi@riamoneytransfer.com", raci: "C" },
  { id: "TM5", name: "Libby Novacheck", role: "Sr. Director, Global PMO", org: "Ria Project Management", email: "enovacheck@riamoneytransfer.com", raci: "I" },

  // ── Ria Business ──
  { id: "TM6", name: "Rosario Escarpita", role: "Chief Growth Officer", org: "Ria Business", email: "rescarpita@riamoneytransfer.com", raci: "I" },
  { id: "TM7", name: "Iris Holmes", role: "VP, Sales", org: "Ria Business", email: "iholmes@riamoneytransfer.com", raci: "C" },
  { id: "TM8", name: "Armando Chavez", role: "VP, Retail Operations", org: "Ria Business", email: "armandoc@riamoneytransfer.com", raci: "C" },
  { id: "TM9", name: "Sergio Carcamo", role: "Head of Digital - Americas", org: "Ria Business", email: "scarcamo@riamoneytransfer.com", raci: "I" },
  { id: "TM10", name: "David Escobar", role: "Dir. Retail Ops", org: "Ria Business", email: "dcartagena@riamoneytransfer.com", raci: "C" },
  { id: "TM11", name: "Shawn Fielder", role: "CEO", org: "Ria Business", email: "sfielder@riamoneytransfer.com", raci: "I" },

  // ── Ria IT ──
  { id: "TM12", name: "Martin Behrend", role: "Global Head of Digital Web & Mobile Development", org: "Ria IT", email: "M.Behrend@epay.de", raci: "A" },
  { id: "TM13", name: "Hardik Joshi", role: "Software Dev Lead", org: "Ria IT", email: "hbjoshi@riamoneytransfer.com", raci: "R" },
  { id: "TM14", name: "Hector Villasenor", role: "Director, IT Americas", org: "Ria IT", email: "hvillasenor@riamoneytransfer.com", raci: "A" },
  { id: "TM15", name: "Braxton Han", role: "Sr. Manager, Digital Development", org: "Ria IT", email: "bhan@riamoneytransfer.com", raci: "C" },
  { id: "TM16", name: "Chaitanya Telukuntla", role: "Sr. Developer", org: "Ria IT", email: "ctelukuntla@riamoneytransfer.com", raci: "R" },

  // ── Ria Product ──
  { id: "TM17", name: "Matias Stephens", role: "Product Owner (One App - Digital)", org: "Ria Product", email: "mstephens@riamoneytransfer.com", raci: "R" },
  { id: "TM18", name: "Arevik Sargsyan", role: "Product Manager (FX Online)", org: "Ria Product", email: "asargsyan@riamoneytransfer.com", raci: "R" },
  { id: "TM19", name: "Yasamin Ehteshami", role: "VP, Product (FX Online)", org: "Ria Product", email: "yasamine@riamoneytransfer.com", raci: "A" },
  { id: "TM20", name: "Manuel Dominguez", role: "Global Ancillary Product Manager (MRDC)", org: "Ria Product", email: "madominguez@riamoneytransfer.com", raci: "R" },
  { id: "TM21", name: "Alfredo Piel", role: "Director of Product (Digital)", org: "Ria Product", email: "Apiel@riamoneytransfer.com", raci: "A" },

  // ── Ria Design/Brand ──
  { id: "TM22", name: "Rigved Sathe", role: "Assoc. Design Director", org: "Ria Design/Brand", email: "rsathe@riamoneytransfer.com", raci: "C" },
  { id: "TM23", name: "Renzo Contreras Alvarez", role: "Sr. Product Designer", org: "Ria Design/Brand", email: "rcontreras@riamoneytransfer.com", raci: "R" },
  { id: "TM24", name: "Nico Barrientos", role: "Product Design Director", org: "Ria Design/Brand", email: "NBaldovino@riamoneytransfer.com", raci: "I" },

  // ── Ria Finance ──
  { id: "TM25", name: "Scott Penderis", role: "Global Controller", org: "Ria Finance", email: "spenderis@riamoneytransfer.com", raci: "A" },
  { id: "TM26", name: "John Shannon", role: "Finance Director, Digital", org: "Ria Finance", email: "jshannon@riamoneytransfer.com", raci: "C" },
  { id: "TM27", name: "Kari Lipp", role: "Indirect Tax Manager", org: "Ria Finance", email: "klipp@riamoneytransfer.com", raci: "R" },
  { id: "TM28", name: "Accounting - TBD", role: "Accounting", org: "Ria Finance", raci: "" },
  { id: "TM29", name: "Finance Ops - TBD", role: "Finance Ops", org: "Ria Finance", raci: "" },

  // ── Analytics & Reporting ──
  { id: "TM30", name: "Korey McGee", role: "VP, Global BI", org: "Analytics & Reporting", email: "kmcgee@riamoneytransfer.com", raci: "C" },
  { id: "TM31", name: "Aijun Zuo", role: "Director of Financial Backend Services", org: "Analytics & Reporting", email: "AZuo@riamoneytransfer.com", raci: "" },

  // ── Procurement ──
  { id: "TM32", name: "Cristian Castaneda", role: "Manager (Procurement)", org: "Procurement", raci: "" },

  // ── Ria Payments ──
  { id: "TM33", name: "Pedro Menendez de la Cuesta Lamas", role: "Global Director, Digital Payment", org: "Ria Payments", email: "pmenendezc@riamoneytransfer.com", raci: "R" },

  // ── Ria Security ──
  { id: "TM34", name: "Andres Porras Garcia", role: "Global Security GRC Director", org: "Ria Security", email: "aporras@riamoneytransfer.com", raci: "A" },
  { id: "TM35", name: "Aaron Toren", role: "Director of Global Cyber Security", org: "Ria Security", email: "atoren@euronetworldwide.com", raci: "I" },
  { id: "TM36", name: "Viral Pandya", role: "GRC Manager", org: "Ria Security", email: "VPandya@riamoneytransfer.com", raci: "R" },

  // ── Ria Privacy ──
  { id: "TM37", name: "Yago Amat Martinez", role: "Data Protection Officer (DPO)", org: "Ria Privacy", email: "yamat@euronetworldwide.com", raci: "A" },
  { id: "TM38", name: "Nicholas Boetti", role: "Senior Privacy Council", org: "Ria Privacy", raci: "R" },

  // ── Ria Fraud ──
  { id: "TM39", name: "Danika Keblar", role: "Card Acceptance Payments Manager", org: "Ria Fraud", email: "dkeblar@riamoneytransfer.com", raci: "C" },
  { id: "TM40", name: "Rodrigo De la Fuente", role: "Product Manager (Digital Fraud)", org: "Ria Fraud", email: "Rdelafuente@riamoneytransfer.com", raci: "R" },
  { id: "TM41", name: "Taylor Kwan", role: "Chief Operating Officer, Digital", org: "Ria Fraud", email: "tkwan@riamoneytransfer.com", raci: "A" },

  // ── Legal ──
  { id: "TM42", name: "Hope Gregg", role: "Associate General Counsel", org: "Legal", raci: "R" },

  // ── Ria Digital Operations ──
  { id: "TM43", name: "Taylor Kwan", role: "Chief Operating Officer, Digital", org: "Ria Digital Operations", email: "tkwan@riamoneytransfer.com", raci: "A" },
  { id: "TM44", name: "Bivash Sharma", role: "Director, Digital Product Ops", org: "Ria Digital Operations", email: "bvsharma@riamoneytransfer.com", raci: "R" },

  // ── Marketing ──
  { id: "TM45", name: "Hillary Bontempi", role: "Marketing", org: "Marketing", raci: "" },

  // ── Revenue Management ──
  { id: "TM46", name: "Alonzo Venegas", role: "Chief Revenue Officer", org: "Revenue Management", raci: "A" },

  // ── Ria Compliance ──
  { id: "TM47", name: "Alex Ketter", role: "VP, Compliance", org: "Ria Compliance", email: "aketter@riamoneytransfer.com", raci: "R" },
  { id: "TM48", name: "Kenan Haskovic", role: "VP Compliance, Digital Products", org: "Ria Compliance", email: "KHaskovic@riamoneytransfer.com", raci: "R" },
  { id: "TM49", name: "Luz Lapeyre", role: "Chief AML Officer", org: "Ria Compliance", email: "llapeyre@riamoneytransfer.com", raci: "A" },

  // ── Ria Care ──
  { id: "TM50", name: "Abby Valenzuela", role: "VP, Global Care", org: "Ria Care", email: "avalenzuela@riamoneytransfer.com", raci: "R" },
  { id: "TM51", name: "Sarah Bernhardi", role: "Chief Experience Officer", org: "Ria Care", email: "sarah.bernhardi@dandelionpayments.com", raci: "A" },
  { id: "TM52", name: "George Orellana", role: "CX Services Architect", org: "Ria Care", email: "jaguilar@riamoneytransfer.com", raci: "R" },

  // ── Vendor: TAB Bank ──
  { id: "TM53", name: "Alex Crowley", role: "SVP, Strategy & Special Projects", org: "Vendor: TAB Bank", email: "alex.crowley@tabbank.com", raci: "A" },
  { id: "TM54", name: "Dan Meldrum", role: "Regulatory Compliance Officer", org: "Vendor: TAB Bank", email: "dan.meldrum@tabbank.com", raci: "C" },
  { id: "TM55", name: "Tyler Knotts", role: "SVP, & Head of Compliance", org: "Vendor: TAB Bank", email: "tyler.knotts@tabbank.com", raci: "A" },
  { id: "TM56", name: "Trevor Hess", role: "VP, Compliance", org: "Vendor: TAB Bank", email: "trevor.hess@tabbank.com", raci: "R" },

  // ── Vendor: Helix/Q2 ──
  { id: "TM57", name: "Chris Amador", role: "Sr. Director, Sales & Strategic Solutions", org: "Vendor: Helix/Q2", email: "chris.amador@q2ebanking.com", raci: "A" },
  { id: "TM58", name: "David Garcia", role: "Enterprise Sales Manager", org: "Vendor: Helix/Q2", email: "david.garcia@q2.com", raci: "C" },
  { id: "TM59", name: "Holly Bass", role: "Sr. Operations Project Manager (Centrix Dispute Tracking)", org: "Vendor: Helix/Q2", email: "holly.bass@q2.com", raci: "R" },
  { id: "TM60", name: "Julie Fair", role: "Sr. Fraud Analyst", org: "Vendor: Helix/Q2", email: "Julie.fair@q2.com", raci: "C" },
  { id: "TM61", name: "Scott McCormack", role: "VP, Operations", org: "Vendor: Helix/Q2", email: "scott.mccormack@q2.com", raci: "A" },
  { id: "TM62", name: "Eric Rhea", role: "Principal Engineer", org: "Vendor: Helix/Q2", email: "eric.rhea@q2.com", raci: "R" },
  { id: "TM63", name: "Phil Proctor", role: "Sr. Director of Product Management", org: "Vendor: Helix/Q2", email: "phil.proctor@q2.com", raci: "A" },
  { id: "TM64", name: "Polly Haiar", role: "VP, Client Success", org: "Vendor: Helix/Q2", email: "polly.haiar@q2.com", raci: "A" },
  { id: "TM65", name: "Kenny Richard", role: "Sr. Manager, Customer Support", org: "Vendor: Helix/Q2", email: "kenny.richard@q2.com", raci: "R" },
  { id: "TM66", name: "Jenny Wulf", role: "Sr. Customer Success Manager", org: "Vendor: Helix/Q2", email: "jenny.wulf@q2.com", raci: "R" },
  { id: "TM67", name: "Alexandra Woods", role: "Sr. Product Owner", org: "Vendor: Helix/Q2", email: "alexandra.woods@q2.com", raci: "R" },
];

const d = "2026-02-01";

export const initialEpics: Epic[] = [
  // ── WS1 – Bank & Core Platform Integration ──
  {
    id: "WS1",
    name: "Bank & Core Platform Integration",
    description: "TAB Bank sponsorship, Helix MSA, core API integration between Ria and Helix, funds-flow design",
    status: "In Progress",
    priority: "Highest",
    target: "Q2 2026",
    startMonth: 2,
    endMonth: 5,
    owner: "James H.",
    color: "#2563eb",
    tasks: [
      { id: "WS1-M1", epicId: "WS1", name: "TAB Bank sponsorship agreement & SLA", status: "Complete", priority: "High", owner: "James H.", startDate: "2026-02-01", dueDate: "2026-02-20", notes: [{ id: "n-ws1m1", text: "Sponsor bank confirmed for DDA and BIN.", author: "James H.", date: "2026-02-18" }], tags: ["legal", "sponsor-bank"], createdDate: d, updatedDate: d, completedDate: "2026-02-18" },
      { id: "WS1-M2", epicId: "WS1", name: "Helix MSA / contract signed", status: "In Progress", priority: "High", owner: "James H.", startDate: "2026-02-15", dueDate: "2026-03-15", dependencies: ["WS1-M1"], notes: [{ id: "n-ws1m2", text: "Legal + commercial review; critical path for Helix work.", author: "James H.", date: "2026-02-20" }], tags: ["legal", "helix", "critical-path"], createdDate: d, updatedDate: d },
      { id: "WS1-M3", epicId: "WS1", name: "Implementation kick-off with Helix", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-03-15", dueDate: "2026-03-25", dependencies: ["WS1-M2"], notes: [{ id: "n-ws1m3", text: "Agree RACI, cadence, integrated plan.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["helix", "planning"], createdDate: d, updatedDate: d },
      { id: "WS1-M4", epicId: "WS1", name: "Implementation scope sign-off (Ria + TAB + Helix)", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-03-25", dueDate: "2026-04-10", dependencies: ["WS1-M3"], notes: [{ id: "n-ws1m4", text: "Align on MVP scope and architecture.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["scope", "architecture"], createdDate: d, updatedDate: d },
      { id: "WS1-M5", epicId: "WS1", name: "Core API integration (origination, balance, ledger sync)", status: "In Progress", priority: "High", owner: "Nicholas", startDate: "2026-03-01", dueDate: "2026-05-01", dependencies: ["WS1-M2"], notes: [{ id: "n-ws1m5", text: "Account open/close and posting between Ria Core API and Helix.", author: "Nicholas", date: "2026-03-05" }], tags: ["api", "helix", "core"], createdDate: d, updatedDate: d },
      { id: "WS1-M6", epicId: "WS1", name: "Helix data exports & reports sign-off", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-04-15", dueDate: "2026-05-15", dependencies: ["WS1-M5"], notes: [{ id: "n-ws1m6", text: "Define APIs, event bus, SFTP exports for reporting and reconciliation.", author: "Nicholas", date: "2026-02-15" }], tags: ["data", "reporting", "helix"], createdDate: d, updatedDate: d },
      { id: "WS1-M7", epicId: "WS1", name: "Funds-flow design & approval (Scott)", status: "Not Started", priority: "High", owner: "Scott", startDate: "2026-04-01", dueDate: "2026-05-01", dependencies: ["WS1-M5", "WS9-M1"], notes: [{ id: "n-ws1m7", text: "Full mapping of cash, ACH, card, remittance flows + accounting entries.", author: "Scott", date: "2026-02-15" }], tags: ["finance", "funds-flow"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS2 – Card Platform (Issuing, Processing & Bureau) ──
  {
    id: "WS2",
    name: "Card Platform (Issuing, Processing & Bureau)",
    description: "Visa debit card issuance via TAB/DPS, CPI card bureau, card product setup, EMV certification, dispute platform",
    status: "In Progress",
    priority: "Highest",
    target: "Q2 2026",
    startMonth: 2,
    endMonth: 6,
    owner: "James H.",
    color: "#7c3aed",
    tasks: [
      { id: "WS2-M1", epicId: "WS2", name: "BIN sponsorship & network registration", status: "Complete", priority: "High", owner: "James H.", startDate: "2026-02-01", dueDate: "2026-03-01", dependencies: ["WS1-M1"], notes: [{ id: "n-ws2m1", text: "Visa debit BIN under TAB sponsorship.", author: "James H.", date: "2026-02-28" }], tags: ["visa", "sponsor-bank"], createdDate: d, updatedDate: d, completedDate: "2026-02-28" },
      { id: "WS2-M2", epicId: "WS2", name: "Visa DPS integration (auth/settle/refund)", status: "In Progress", priority: "High", owner: "Nicholas", startDate: "2026-03-01", dueDate: "2026-04-15", dependencies: ["WS2-M1", "WS1-M5"], notes: [{ id: "n-ws2m2", text: "Core card processing path.", author: "Nicholas", date: "2026-03-05" }], tags: ["dps", "card-processing"], createdDate: d, updatedDate: d },
      { id: "WS2-M3", epicId: "WS2", name: "Card product setup in Helix/DPS (debit, limits, fee hooks)", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-04-01", dueDate: "2026-04-30", dependencies: ["WS2-M2", "WS9-M3"], notes: [{ id: "n-ws2m3", text: "Configure debit card products; no prepaid.", author: "Nicholas", date: "2026-02-15" }], tags: ["helix", "dps", "config"], createdDate: d, updatedDate: d },
      { id: "WS2-M4", epicId: "WS2", name: "Card design approval (Ria Brand + TAB + Visa)", status: "In Progress", priority: "Medium", owner: "Priya M.", startDate: "2026-03-01", dueDate: "2026-04-15", notes: [{ id: "n-ws2m4", text: "Non-personalized + personalized plastics.", author: "Priya M.", date: "2026-03-10" }], tags: ["design", "brand"], createdDate: d, updatedDate: d },
      { id: "WS2-M5", epicId: "WS2", name: "CPI MSA sign-off", status: "Not Started", priority: "High", owner: "James H.", startDate: "2026-04-01", dueDate: "2026-04-20", dependencies: ["WS2-M4"], notes: [{ id: "n-ws2m5", text: "Card bureau contract.", author: "James H.", date: "2026-02-15" }], tags: ["vendor", "cpi"], createdDate: d, updatedDate: d },
      { id: "WS2-M6", epicId: "WS2", name: "Card manufacturing & fulfillment setup (CPI)", status: "Not Started", priority: "High", owner: "James H.", startDate: "2026-04-15", dueDate: "2026-05-15", dependencies: ["WS2-M3", "WS2-M5"], notes: [{ id: "n-ws2m6", text: "EMV data, SFTP file exchange.", author: "James H.", date: "2026-02-15" }], tags: ["cpi", "fulfillment"], createdDate: d, updatedDate: d },
      { id: "WS2-M7", epicId: "WS2", name: "Card inventory & stock-management model", status: "Not Started", priority: "Medium", owner: "Yago", startDate: "2026-05-01", dueDate: "2026-05-31", dependencies: ["WS2-M6", "WS4-M4"], notes: [{ id: "n-ws2m7", text: "Store stock levels, reorder, returns.", author: "Yago", date: "2026-02-15" }], tags: ["inventory", "ops"], createdDate: d, updatedDate: d },
      { id: "WS2-M8", epicId: "WS2", name: "EMV & network certification", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-05-01", dueDate: "2026-06-01", dependencies: ["WS2-M2", "WS2-M3", "WS2-M6"], notes: [{ id: "n-ws2m8", text: "Scheme certification for chip, contactless, 3DS.", author: "Nicholas", date: "2026-02-15" }], tags: ["certification", "emv"], createdDate: d, updatedDate: d },
      { id: "WS2-M9", epicId: "WS2", name: "Card production pilot (~500 test cards)", status: "Not Started", priority: "Medium", owner: "James H.", startDate: "2026-05-15", dueDate: "2026-06-01", dependencies: ["WS2-M8"], notes: [{ id: "n-ws2m9", text: "Internal / limited pilot.", author: "James H.", date: "2026-02-15" }], tags: ["testing", "pilot"], createdDate: d, updatedDate: d },
      { id: "WS2-M10", epicId: "WS2", name: "Dispute/chargeback platform integration (Centrix, DPS, Helix)", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-05-01", dueDate: "2026-06-15", dependencies: ["WS3-M6", "WS2-M2"], notes: [{ id: "n-ws2m10", text: "Enable Reg E chargeback lifecycle.", author: "Nicholas", date: "2026-02-15" }], tags: ["disputes", "centrix", "reg-e"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS3 – Risk, KYC, AML & Compliance ──
  {
    id: "WS3",
    name: "Risk, KYC, AML & Compliance",
    description: "TAB document pack, policy responses, customer onboarding write-up, sanctions/AML model, card fraud rules, dispute policy",
    status: "In Progress",
    priority: "Highest",
    target: "Q2 2026",
    startMonth: 2,
    endMonth: 5,
    owner: "David K.",
    color: "#dc2626",
    tasks: [
      { id: "WS3-M1", epicId: "WS3", name: "TAB document pack finalized (privacy, e-sign, deposit, cardholder)", status: "In Progress", priority: "High", owner: "David K.", startDate: "2026-02-01", dueDate: "2026-03-15", notes: [{ id: "n-ws3m1", text: "TAB templates under review.", author: "David K.", date: "2026-02-20" }], tags: ["compliance", "tab", "docs"], createdDate: d, updatedDate: d },
      { id: "WS3-M2", epicId: "WS3", name: "Responses to TAB policy questions (Yago + Nicholas sign-off)", status: "Not Started", priority: "High", owner: "Yago", startDate: "2026-03-15", dueDate: "2026-04-01", dependencies: ["WS3-M1"], notes: [{ id: "n-ws3m2", text: "Covers sanctions, KYC, AML responsibilities.", author: "David K.", date: "2026-02-15" }], tags: ["compliance", "tab", "policy"], createdDate: d, updatedDate: d },
      { id: "WS3-M3", epicId: "WS3", name: "Customer onboarding write-up (store + digital) approved by TAB", status: "Not Started", priority: "High", owner: "David K.", startDate: "2026-04-01", dueDate: "2026-04-20", dependencies: ["WS4-M1", "WS5-M3", "WS3-M2"], notes: [{ id: "n-ws3m3", text: "Narrative + diagrams of full onboarding.", author: "David K.", date: "2026-02-15" }], tags: ["compliance", "onboarding"], createdDate: d, updatedDate: d },
      { id: "WS3-M4", epicId: "WS3", name: "Sanctions & AML operating model (TAB vs Ria, Hawk/Verafin)", status: "Not Started", priority: "High", owner: "David K.", startDate: "2026-03-15", dueDate: "2026-04-15", dependencies: ["WS3-M1"], notes: [{ id: "n-ws3m4", text: "Define primary AML roles per flow.", author: "David K.", date: "2026-02-15" }], tags: ["aml", "sanctions", "compliance"], createdDate: d, updatedDate: d },
      { id: "WS3-M5", epicId: "WS3", name: "Card fraud rules (FICO/Falcon) defined", status: "Not Started", priority: "High", owner: "David K.", startDate: "2026-04-01", dueDate: "2026-04-30", dependencies: ["WS2-M2"], notes: [{ id: "n-ws3m5", text: "ML+rules thresholds for card usage.", author: "David K.", date: "2026-02-15" }], tags: ["fraud", "card"], createdDate: d, updatedDate: d },
      { id: "WS3-M6", epicId: "WS3", name: "Dispute & chargeback policy (Reg E, thresholds)", status: "Not Started", priority: "High", owner: "David K.", startDate: "2026-04-15", dueDate: "2026-05-15", dependencies: ["WS2-M3", "WS3-M4"], notes: [{ id: "n-ws3m6", text: "When to credit customer and when to file chargeback.", author: "David K.", date: "2026-02-15" }], tags: ["disputes", "reg-e", "compliance"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS4 – FX Online / In-Store Experience ──
  {
    id: "WS4",
    name: "FX Online / In-Store Experience",
    description: "In-store wallet onboarding, cash-in/cash-out, card linking, card inventory UI, FX Online build & UAT",
    status: "Not Started",
    priority: "High",
    target: "Q2 2026",
    startMonth: 3,
    endMonth: 6,
    owner: "Yago",
    color: "#0d9488",
    tasks: [
      { id: "WS4-M1", epicId: "WS4", name: "In-store wallet/account onboarding flows designed", status: "Not Started", priority: "High", owner: "Yago", startDate: "2026-03-15", dueDate: "2026-04-10", dependencies: ["WS1-M4", "WS3-M1"], notes: [{ id: "n-ws4m1", text: "Agent flows; FX client.", author: "Yago", date: "2026-02-15" }], tags: ["in-store", "onboarding", "fx"], createdDate: d, updatedDate: d },
      { id: "WS4-M2", epicId: "WS4", name: "In-store cash-in / cash-out flows designed", status: "Not Started", priority: "High", owner: "Yago", startDate: "2026-04-01", dueDate: "2026-04-20", dependencies: ["WS4-M1"], notes: [{ id: "n-ws4m2", text: "How agents load/withdraw wallet funds.", author: "Yago", date: "2026-02-15" }], tags: ["cash", "in-store"], createdDate: d, updatedDate: d },
      { id: "WS4-M3", epicId: "WS4", name: "Card linking / activation flows for non-personalized cards", status: "Not Started", priority: "High", owner: "Yago", startDate: "2026-04-10", dueDate: "2026-05-01", dependencies: ["WS2-M3", "WS4-M1"], notes: [{ id: "n-ws4m3", text: "Bind CPI card to customer.", author: "Yago", date: "2026-02-15" }], tags: ["card", "in-store"], createdDate: d, updatedDate: d },
      { id: "WS4-M4", epicId: "WS4", name: "Card inventory UI (view/accept/request stock, link card)", status: "Not Started", priority: "Medium", owner: "Yago", startDate: "2026-05-01", dueDate: "2026-05-20", dependencies: ["WS2-M7"], notes: [{ id: "n-ws4m4", text: "Implements MVP inventory features.", author: "Yago", date: "2026-02-15" }], tags: ["inventory", "ui"], createdDate: d, updatedDate: d },
      { id: "WS4-M5", epicId: "WS4", name: "FX Online build for onboarding and cash flows", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-04-15", dueDate: "2026-05-20", dependencies: ["WS4-M1", "WS4-M2", "WS1-M5"], notes: [{ id: "n-ws4m5", text: "Backend + UI changes.", author: "Nicholas", date: "2026-02-15" }], tags: ["fx-online", "build"], createdDate: d, updatedDate: d },
      { id: "WS4-M6", epicId: "WS4", name: "FX Online build for card flows & inventory", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-05-01", dueDate: "2026-05-31", dependencies: ["WS4-M3", "WS4-M4", "WS2-M6"], notes: [{ id: "n-ws4m6", text: "Card acceptance, linking, stock actions.", author: "Nicholas", date: "2026-02-15" }], tags: ["fx-online", "card", "build"], createdDate: d, updatedDate: d },
      { id: "WS4-M7", epicId: "WS4", name: "FX Online UAT", status: "Not Started", priority: "Medium", owner: "Yago", startDate: "2026-05-20", dueDate: "2026-06-15", dependencies: ["WS4-M5", "WS4-M6", "WS7-M1"], notes: [{ id: "n-ws4m7", text: "Business sign-off.", author: "Yago", date: "2026-02-15" }], tags: ["uat", "fx-online"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS5 – OneApp / Digital Wallet Experience ──
  {
    id: "WS5",
    name: "OneApp / Digital Wallet Experience",
    description: "Digital wallet within existing OneApp: Figma flows, onboarding via Veriff, wallet home, card features, Apple/Google Pay, RDC entry, UAT",
    status: "In Progress",
    priority: "Highest",
    target: "Q2 2026",
    startMonth: 3,
    endMonth: 6,
    owner: "Priya M.",
    color: "#0891b2",
    tasks: [
      { id: "WS5-M1", epicId: "WS5", name: "Initial Figma wallet flows presented", status: "Complete", priority: "Medium", owner: "Priya M.", startDate: "2026-02-15", dueDate: "2026-03-05", notes: [{ id: "n-ws5m1", text: "Digital PM session.", author: "Priya M.", date: "2026-03-05" }], tags: ["design", "figma"], createdDate: d, updatedDate: d, completedDate: "2026-03-05" },
      { id: "WS5-M2", epicId: "WS5", name: "Design review & gap analysis vs MVP scope", status: "In Progress", priority: "High", owner: "Priya M.", startDate: "2026-03-05", dueDate: "2026-03-20", dependencies: ["WS5-M1"], notes: [{ id: "n-ws5m2", text: "Check coverage of onboarding, wallet, card, RDC.", author: "Priya M.", date: "2026-03-10" }], tags: ["design", "review"], createdDate: d, updatedDate: d },
      { id: "WS5-M3", epicId: "WS5", name: "Updated Figma flows & requirements", status: "Not Started", priority: "High", owner: "Priya M.", startDate: "2026-03-20", dueDate: "2026-04-05", dependencies: ["WS5-M2"], notes: [{ id: "n-ws5m3", text: "Incorporate feedback from Wallet, Compliance, Care.", author: "Priya M.", date: "2026-02-15" }], tags: ["design", "requirements"], createdDate: d, updatedDate: d },
      { id: "WS5-M4", epicId: "WS5", name: "UX sign-off for MVP OneApp wallet", status: "Not Started", priority: "High", owner: "Priya M.", startDate: "2026-04-05", dueDate: "2026-04-15", dependencies: ["WS5-M3", "WS3-M1"], notes: [{ id: "n-ws5m4", text: "Scope freeze for dev.", author: "Priya M.", date: "2026-02-15" }], tags: ["design", "sign-off"], createdDate: d, updatedDate: d },
      { id: "WS5-M5", epicId: "WS5", name: "Implement digital onboarding using existing Veriff integration", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-04-15", dueDate: "2026-05-15", dependencies: ["WS5-M4"], notes: [{ id: "n-ws5m5", text: "Extend current Veriff usage to wallet/card KYC.", author: "Nicholas", date: "2026-02-15" }], tags: ["veriff", "kyc", "dev"], createdDate: d, updatedDate: d },
      { id: "WS5-M6", epicId: "WS5", name: "Implement wallet home (balances, transactions, funding entry)", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-04-15", dueDate: "2026-05-15", dependencies: ["WS5-M4", "WS1-M5"], notes: [{ id: "n-ws5m6", text: "Uses Helix data.", author: "Nicholas", date: "2026-02-15" }], tags: ["wallet", "dev", "helix"], createdDate: d, updatedDate: d },
      { id: "WS5-M7", epicId: "WS5", name: "Implement in-app card features (activation, PIN, controls)", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-05-01", dueDate: "2026-05-31", dependencies: ["WS5-M4", "WS2-M3"], notes: [{ id: "n-ws5m7", text: "Manage card lifecycle via Helix/DPS.", author: "Nicholas", date: "2026-02-15" }], tags: ["card", "dev"], createdDate: d, updatedDate: d },
      { id: "WS5-M8", epicId: "WS5", name: "Implement Apple Pay / Google Pay enrollment", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-05-01", dueDate: "2026-05-31", dependencies: ["WS2-M2", "WS2-M8"], notes: [{ id: "n-ws5m8", text: "Tokenization, push provisioning.", author: "Nicholas", date: "2026-02-15" }], tags: ["apple-pay", "google-pay", "tokenization"], createdDate: d, updatedDate: d },
      { id: "WS5-M9", epicId: "WS5", name: "Integrate RDC entry point (UI hook into WS6)", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-05-15", dueDate: "2026-06-01", dependencies: ["WS5-M4", "WS6-M3"], notes: [{ id: "n-ws5m9", text: "Starts RDC flow from app.", author: "Nicholas", date: "2026-02-15" }], tags: ["rdc", "integration"], createdDate: d, updatedDate: d },
      { id: "WS5-M10", epicId: "WS5", name: "OneApp UAT for wallet & card", status: "Not Started", priority: "Medium", owner: "Priya M.", startDate: "2026-05-31", dueDate: "2026-06-20", dependencies: ["WS5-M5", "WS5-M6", "WS5-M7", "WS5-M8", "WS5-M9", "WS7-M1"], notes: [{ id: "n-ws5m10", text: "Cross-team UAT.", author: "Priya M.", date: "2026-02-15" }], tags: ["uat", "oneapp"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS6 – Remote Check Deposit (RDC / Ensenta) ──
  {
    id: "WS6",
    name: "Remote Check Deposit (RDC / Ensenta)",
    description: "Ensenta onboarding, RDC workshop, requirements sign-off, SDK integration in OneApp, posting & hold logic, UAT",
    status: "Not Started",
    priority: "Medium",
    target: "Q2 2026",
    startMonth: 3,
    endMonth: 6,
    owner: "Nicholas",
    color: "#4f46e5",
    tasks: [
      { id: "WS6-M1", epicId: "WS6", name: "Ensenta onboarding (commercial + technical)", status: "Not Started", priority: "Medium", owner: "James H.", startDate: "2026-03-15", dueDate: "2026-04-10", dependencies: ["WS10-M2"], notes: [{ id: "n-ws6m1", text: "Access, contacts, credentials.", author: "James H.", date: "2026-02-15" }], tags: ["ensenta", "vendor"], createdDate: d, updatedDate: d },
      { id: "WS6-M2", epicId: "WS6", name: "RDC workshop (flows, limits, risk rules)", status: "Not Started", priority: "Medium", owner: "David K.", startDate: "2026-04-10", dueDate: "2026-04-25", dependencies: ["WS6-M1"], notes: [{ id: "n-ws6m2", text: "Decide phased funding, limits per segment.", author: "David K.", date: "2026-02-15" }], tags: ["rdc", "workshop"], createdDate: d, updatedDate: d },
      { id: "WS6-M3", epicId: "WS6", name: "RDC requirements & flow sign-off", status: "Not Started", priority: "Medium", owner: "David K.", startDate: "2026-04-25", dueDate: "2026-05-10", dependencies: ["WS6-M2", "WS3-M4"], notes: [{ id: "n-ws6m3", text: "Non-instant RDC in MVP.", author: "David K.", date: "2026-02-15" }], tags: ["rdc", "sign-off"], createdDate: d, updatedDate: d },
      { id: "WS6-M4", epicId: "WS6", name: "Implement Ensenta SDK in OneApp", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-05-10", dueDate: "2026-05-31", dependencies: ["WS6-M3", "WS5-M4"], notes: [{ id: "n-ws6m4", text: "Mobile capture and submission.", author: "Nicholas", date: "2026-02-15" }], tags: ["ensenta", "sdk", "dev"], createdDate: d, updatedDate: d },
      { id: "WS6-M5", epicId: "WS6", name: "Implement posting & hold logic to Helix", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-05-10", dueDate: "2026-05-31", dependencies: ["WS6-M3", "WS1-M5"], notes: [{ id: "n-ws6m5", text: "Apply holds and release schedules.", author: "Nicholas", date: "2026-02-15" }], tags: ["helix", "posting", "dev"], createdDate: d, updatedDate: d },
      { id: "WS6-M6", epicId: "WS6", name: "RDC testing & UAT", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-06-01", dueDate: "2026-06-20", dependencies: ["WS6-M4", "WS6-M5", "WS7-M1"], notes: [{ id: "n-ws6m6", text: "Functional + risk scenarios.", author: "Nicholas", date: "2026-02-15" }], tags: ["uat", "rdc"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS7 – Testing & Quality Assurance ──
  {
    id: "WS7",
    name: "Testing & Quality Assurance",
    description: "Test strategy, Helix/TAB API certification, EMV cert, FX Online UAT, OneApp UAT, RDC UAT, final regression",
    status: "Not Started",
    priority: "High",
    target: "Q3 2026",
    startMonth: 3,
    endMonth: 7,
    owner: "Aizhan Y.",
    color: "#ca8a04",
    tasks: [
      { id: "WS7-M1", epicId: "WS7", name: "Test strategy and end-to-end test plan", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-03-15", dueDate: "2026-04-15", dependencies: ["WS4-M1", "WS5-M3", "WS6-M3"], notes: [{ id: "n-ws7m1", text: "Covers store, digital, bank, card, RDC flows.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["qa", "strategy"], createdDate: d, updatedDate: d },
      { id: "WS7-M2", epicId: "WS7", name: "Helix/TAB API integration testing & certification", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-05-01", dueDate: "2026-05-31", dependencies: ["WS1-M5"], notes: [{ id: "n-ws7m2", text: "Validate account and ACH flows.", author: "Nicholas", date: "2026-02-15" }], tags: ["testing", "helix", "api"], createdDate: d, updatedDate: d },
      { id: "WS7-M3", epicId: "WS7", name: "Card scheme / EMV certification", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-05-01", dueDate: "2026-06-01", dependencies: ["WS2-M2", "WS2-M3", "WS2-M6"], notes: [{ id: "n-ws7m3", text: "Required before card pilot.", author: "Nicholas", date: "2026-02-15" }], tags: ["testing", "emv", "certification"], createdDate: d, updatedDate: d },
      { id: "WS7-M4", epicId: "WS7", name: "FX Online UAT", status: "Not Started", priority: "Medium", owner: "Yago", startDate: "2026-05-20", dueDate: "2026-06-15", dependencies: ["WS4-M5", "WS4-M6", "WS7-M1"], notes: [{ id: "n-ws7m4", text: "Agent journeys.", author: "Yago", date: "2026-02-15" }], tags: ["uat", "fx-online"], createdDate: d, updatedDate: d },
      { id: "WS7-M5", epicId: "WS7", name: "OneApp UAT", status: "Not Started", priority: "Medium", owner: "Priya M.", startDate: "2026-05-31", dueDate: "2026-06-20", dependencies: ["WS5-M5", "WS5-M6", "WS5-M7", "WS5-M8", "WS5-M9", "WS7-M1"], notes: [{ id: "n-ws7m5", text: "Digital journeys.", author: "Priya M.", date: "2026-02-15" }], tags: ["uat", "oneapp"], createdDate: d, updatedDate: d },
      { id: "WS7-M6", epicId: "WS7", name: "RDC UAT", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-06-01", dueDate: "2026-06-20", dependencies: ["WS6-M4", "WS6-M5", "WS7-M1"], notes: [{ id: "n-ws7m6", text: "RDC scenarios.", author: "Nicholas", date: "2026-02-15" }], tags: ["uat", "rdc"], createdDate: d, updatedDate: d },
      { id: "WS7-M7", epicId: "WS7", name: "Final regression & go-live readiness testing", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-06-15", dueDate: "2026-07-10", dependencies: ["WS7-M2", "WS7-M3", "WS7-M4", "WS7-M5", "WS7-M6"], notes: [{ id: "n-ws7m7", text: "Launch gate.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["testing", "regression", "launch-gate"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS8 – Customer Support & Operations ──
  {
    id: "WS8",
    name: "Customer Support & Operations",
    description: "Care requirements gathering, workflow definition, tools/access setup, training & runbooks",
    status: "Not Started",
    priority: "High",
    target: "Q3 2026",
    startMonth: 4,
    endMonth: 7,
    owner: "Aizhan Y.",
    color: "#db2777",
    tasks: [
      { id: "WS8-M1", epicId: "WS8", name: "Gather Care requirements for wallet, card, RDC", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-04-01", dueDate: "2026-04-20", dependencies: ["WS4-M2", "WS5-M3", "WS6-M3"], notes: [{ id: "n-ws8m1", text: "Use Care + Card Mgmt docs.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["care", "requirements"], createdDate: d, updatedDate: d },
      { id: "WS8-M2", epicId: "WS8", name: "Define Care workflows (activation, lost/stolen, disputes, RDC)", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-04-20", dueDate: "2026-05-15", dependencies: ["WS8-M1", "WS2-M3", "WS3-M6"], notes: [{ id: "n-ws8m2", text: "Include escalations to TAB/Helix/DPS/Ensenta.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["care", "workflows", "escalation"], createdDate: d, updatedDate: d },
      { id: "WS8-M3", epicId: "WS8", name: "Tools & access setup (Helix BO, DPS/Centrix, Ensenta, KB)", status: "Not Started", priority: "Medium", owner: "Tom W.", startDate: "2026-05-01", dueDate: "2026-05-31", dependencies: ["WS1-M5", "WS2-M2", "WS6-M1"], notes: [{ id: "n-ws8m3", text: "Role-based access and views.", author: "Tom W.", date: "2026-02-15" }], tags: ["tooling", "access"], createdDate: d, updatedDate: d },
      { id: "WS8-M4", epicId: "WS8", name: "Care training & runbooks", status: "Not Started", priority: "Medium", owner: "Aizhan Y.", startDate: "2026-06-01", dueDate: "2026-06-30", dependencies: ["WS8-M2", "WS8-M3"], notes: [{ id: "n-ws8m4", text: "Pre-launch readiness.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["training", "runbooks"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS9 – Pricing, Fees & Revenue Model ──
  {
    id: "WS9",
    name: "Pricing, Fees & Revenue Model",
    description: "Fee table, revenue & interchange economics, pricing sign-off, UX copy updates",
    status: "Not Started",
    priority: "High",
    target: "Q1 2026",
    startMonth: 2,
    endMonth: 4,
    owner: "Scott",
    color: "#ea580c",
    tasks: [
      { id: "WS9-M1", epicId: "WS9", name: "Draft fee table (wallet, card, ATM, ACH, RDC, remittance)", status: "Not Started", priority: "High", owner: "Scott", startDate: "2026-02-15", dueDate: "2026-03-15", dependencies: ["WS1-M4"], notes: [{ id: "n-ws9m1", text: "Pay-as-you-go MVP; subscription out of scope.", author: "Scott", date: "2026-02-15" }], tags: ["pricing", "fees"], createdDate: d, updatedDate: d },
      { id: "WS9-M2", epicId: "WS9", name: "Model revenue & interchange economics", status: "Not Started", priority: "Medium", owner: "Scott", startDate: "2026-03-01", dueDate: "2026-03-31", dependencies: ["WS9-M1", "WS1-M7", "WS2-M1"], notes: [{ id: "n-ws9m2", text: "Use TAB small-bank interchange advantage.", author: "Scott", date: "2026-02-15" }], tags: ["revenue", "interchange"], createdDate: d, updatedDate: d },
      { id: "WS9-M3", epicId: "WS9", name: "Pricing & fee structure sign-off (Revenue, Finance, Business, TAB)", status: "Not Started", priority: "High", owner: "Scott", startDate: "2026-03-15", dueDate: "2026-04-10", dependencies: ["WS9-M1", "WS9-M2"], notes: [{ id: "n-ws9m3", text: "Required before card product config and UX copy.", author: "Scott", date: "2026-02-15" }], tags: ["sign-off", "pricing"], createdDate: d, updatedDate: d },
      { id: "WS9-M4", epicId: "WS9", name: "Update product and UX copy with final pricing", status: "Not Started", priority: "Medium", owner: "Priya M.", startDate: "2026-04-10", dueDate: "2026-04-25", dependencies: ["WS9-M3", "WS4-M1", "WS5-M3"], notes: [{ id: "n-ws9m4", text: "Affects flows and customer comms.", author: "Priya M.", date: "2026-02-15" }], tags: ["ux", "pricing", "copy"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS10 – Vendor Contracts & Procurement ──
  {
    id: "WS10",
    name: "Vendor Contracts & Procurement",
    description: "CPI MSA, Ensenta commercial agreement, Adyen approval for wallet/card loads, card inventory logistics",
    status: "Not Started",
    priority: "High",
    target: "Q2 2026",
    startMonth: 2,
    endMonth: 5,
    owner: "James H.",
    color: "#65a30d",
    tasks: [
      { id: "WS10-M1", epicId: "WS10", name: "CPI MSA sign-off", status: "Not Started", priority: "High", owner: "James H.", startDate: "2026-03-01", dueDate: "2026-03-31", dependencies: ["WS2-M4"], notes: [{ id: "n-ws10m1", text: "Feeds WS2 card production.", author: "James H.", date: "2026-02-15" }], tags: ["vendor", "cpi", "contract"], createdDate: d, updatedDate: d },
      { id: "WS10-M2", epicId: "WS10", name: "Ensenta commercial agreement", status: "Not Started", priority: "Medium", owner: "James H.", startDate: "2026-03-15", dueDate: "2026-04-15", dependencies: ["WS6-M2"], notes: [{ id: "n-ws10m2", text: "RDC pricing and SLAs.", author: "James H.", date: "2026-02-15" }], tags: ["vendor", "ensenta", "contract"], createdDate: d, updatedDate: d },
      { id: "WS10-M3", epicId: "WS10", name: "Adyen approval for wallet/card load use case", status: "Not Started", priority: "Medium", owner: "James H.", startDate: "2026-03-15", dueDate: "2026-04-30", dependencies: ["WS11-M4"], notes: [{ id: "n-ws10m3", text: "Extend existing Adyen integration for loads.", author: "James H.", date: "2026-02-15" }], tags: ["vendor", "adyen"], createdDate: d, updatedDate: d },
      { id: "WS10-M4", epicId: "WS10", name: "Card inventory & logistics processes documented", status: "Not Started", priority: "Medium", owner: "James H.", startDate: "2026-04-15", dueDate: "2026-05-15", dependencies: ["WS2-M6"], notes: [{ id: "n-ws10m4", text: "Order, ship, return, destroy flows.", author: "James H.", date: "2026-02-15" }], tags: ["logistics", "card", "process"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS11 – Money Movement & Funding Rails ──
  {
    id: "WS11",
    name: "Money Movement & Funding Rails",
    description: "ACH direct deposit, inbound remittance, cash deposit at FX locations, Adyen wallet/card load, ACH inbound transfers",
    status: "Not Started",
    priority: "High",
    target: "Q2 2026",
    startMonth: 3,
    endMonth: 6,
    owner: "Nicholas",
    color: "#16a34a",
    tasks: [
      { id: "WS11-M1", epicId: "WS11", name: "ACH direct deposit via Helix + TAB FedLine (incl. early-pay)", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-03-15", dueDate: "2026-04-30", dependencies: ["WS1-M5", "WS3-M4"], notes: [{ id: "n-ws11m1", text: "Core payroll funding rail.", author: "Nicholas", date: "2026-02-15" }], tags: ["ach", "payroll", "helix"], createdDate: d, updatedDate: d },
      { id: "WS11-M2", epicId: "WS11", name: "Inbound remittance to wallet (design + doc)", status: "Not Started", priority: "High", owner: "Nicholas", startDate: "2026-03-15", dueDate: "2026-04-30", dependencies: ["WS1-M5", "WS3-M4"], notes: [{ id: "n-ws11m2", text: "Close-loop remittance into account; must be documented for TAB.", author: "Nicholas", date: "2026-02-15" }], tags: ["remittance", "funding"], createdDate: d, updatedDate: d },
      { id: "WS11-M3", epicId: "WS11", name: "Cash deposit at FX locations", status: "Not Started", priority: "High", owner: "Yago", startDate: "2026-04-01", dueDate: "2026-05-15", dependencies: ["WS4-M2", "WS1-M5"], notes: [{ id: "n-ws11m3", text: "Agent loads.", author: "Yago", date: "2026-02-15" }], tags: ["cash", "fx", "funding"], createdDate: d, updatedDate: d },
      { id: "WS11-M4", epicId: "WS11", name: "Extend existing Adyen integration for wallet/card load", status: "Not Started", priority: "Medium", owner: "Nicholas", startDate: "2026-04-15", dueDate: "2026-05-31", dependencies: ["WS9-M3", "WS10-M3"], notes: [{ id: "n-ws11m4", text: "New use case on current Adyen rails.", author: "Nicholas", date: "2026-02-15" }], tags: ["adyen", "funding"], createdDate: d, updatedDate: d },
      { id: "WS11-M5", epicId: "WS11", name: "ACH inbound transfers from external sources", status: "Backlog", priority: "Low", owner: "Nicholas", startDate: "2026-06-01", dueDate: "2026-06-30", dependencies: ["WS11-M1"], notes: [{ id: "n-ws11m5", text: "Post-MVP.", author: "Nicholas", date: "2026-02-15" }], tags: ["ach", "post-mvp"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS12 – Data & Analytics ──
  {
    id: "WS12",
    name: "Data & Analytics",
    description: "KPI & reporting needs, data feeds design, Power BI dashboards and MIS reports",
    status: "Not Started",
    priority: "Medium",
    target: "Q2 2026",
    startMonth: 4,
    endMonth: 6,
    owner: "Tom W.",
    color: "#0284c7",
    tasks: [
      { id: "WS12-M1", epicId: "WS12", name: "Define KPIs & reporting needs", status: "Not Started", priority: "Medium", owner: "Aizhan Y.", startDate: "2026-04-01", dueDate: "2026-04-20", dependencies: ["WS1-M4", "WS3-M4"], notes: [{ id: "n-ws12m1", text: "Product, ops, compliance, finance.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["kpi", "reporting"], createdDate: d, updatedDate: d },
      { id: "WS12-M2", epicId: "WS12", name: "Design data feeds (APIs, event bus, SFTP)", status: "Not Started", priority: "Medium", owner: "Tom W.", startDate: "2026-04-20", dueDate: "2026-05-15", dependencies: ["WS1-M6", "WS12-M1"], notes: [{ id: "n-ws12m2", text: "With Helix and internal systems.", author: "Tom W.", date: "2026-02-15" }], tags: ["data", "feeds", "integration"], createdDate: d, updatedDate: d },
      { id: "WS12-M3", epicId: "WS12", name: "Implement Power BI dashboards and MIS reports", status: "Not Started", priority: "Medium", owner: "Tom W.", startDate: "2026-05-15", dueDate: "2026-06-15", dependencies: ["WS12-M2", "WS7-M2", "WS7-M3", "WS7-M4", "WS7-M5", "WS7-M6"], notes: [{ id: "n-ws12m3", text: "Used for post-launch monitoring.", author: "Tom W.", date: "2026-02-15" }], tags: ["power-bi", "mis", "dashboards"], createdDate: d, updatedDate: d },
    ],
  },

  // ── WS13 – Launch Readiness & Rollout ──
  {
    id: "WS13",
    name: "Launch Readiness & Rollout",
    description: "Pilot plan, go-live checklist & sign-off, post-launch monitoring plan",
    status: "Not Started",
    priority: "Highest",
    target: "Q3 2026",
    startMonth: 6,
    endMonth: 7,
    owner: "Aizhan Y.",
    color: "#64748b",
    tasks: [
      { id: "WS13-M1", epicId: "WS13", name: "Pilot plan (markets, stores, segments, feature flags)", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-06-01", dueDate: "2026-06-15", notes: [{ id: "n-ws13m1", text: "Decide where and how to launch.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["pilot", "launch"], createdDate: d, updatedDate: d },
      { id: "WS13-M2", epicId: "WS13", name: "Go-live checklist & sign-off (TAB, Helix, Compliance, Tech, Care, Product)", status: "Not Started", priority: "High", owner: "Aizhan Y.", startDate: "2026-06-15", dueDate: "2026-07-01", dependencies: ["WS13-M1"], notes: [{ id: "n-ws13m2", text: "Formal launch gate.", author: "Aizhan Y.", date: "2026-02-15" }], tags: ["sign-off", "launch-gate"], createdDate: d, updatedDate: d },
      { id: "WS13-M3", epicId: "WS13", name: "Post-launch monitoring plan (KPIs, thresholds, rollback)", status: "Not Started", priority: "Medium", owner: "Tom W.", startDate: "2026-06-15", dueDate: "2026-07-10", dependencies: ["WS12-M3"], notes: [{ id: "n-ws13m3", text: "Incident and performance management.", author: "Tom W.", date: "2026-02-15" }], tags: ["monitoring", "post-launch"], createdDate: d, updatedDate: d },
    ],
  },
];

export const initialRisks: Risk[] = [
  {
    id: "R1",
    title: "Helix MSA / contract delays",
    description: "Helix contract negotiations may slip, blocking all Helix-dependent integration work across WS1, WS2, WS5, WS6.",
    likelihood: "Medium",
    impact: "High",
    mitigation: "Escalate to executive sponsors. Prepare fallback scope that can proceed without Helix. Track weekly in steering committee.",
    owner: "James H.",
    status: "Open",
    category: "Vendor",
  },
  {
    id: "R2",
    title: "TAB Bank policy & document pack delays",
    description: "TAB templates, policy questions, and onboarding write-ups may take longer than planned, blocking compliance sign-offs.",
    likelihood: "Medium",
    impact: "High",
    mitigation: "Assign dedicated compliance resource. Weekly TAB sync. Escalate blockers to Yago + Nicholas.",
    owner: "David K.",
    status: "Open",
    category: "Regulatory",
  },
  {
    id: "R3",
    title: "EMV & card certification timeline",
    description: "Visa/EMV certification process with DPS may slip, delaying physical card issuance and pilot.",
    likelihood: "Medium",
    impact: "Medium",
    mitigation: "Start certification process early. Use virtual cards as interim solution. Have backup processor identified.",
    owner: "Nicholas",
    status: "Open",
    category: "Technical",
  },
  {
    id: "R4",
    title: "CPI card bureau contract & fulfillment",
    description: "CPI MSA negotiation or card manufacturing setup could delay physical card availability.",
    likelihood: "Medium",
    impact: "Medium",
    mitigation: "Parallel-track CPI contract with card design. Use non-personalized cards for pilot.",
    owner: "James H.",
    status: "Open",
    category: "Vendor",
  },
  {
    id: "R5",
    title: "FX Online / in-store integration complexity",
    description: "In-store wallet and card flows via FX Online may be more complex than estimated due to legacy FX client architecture.",
    likelihood: "High",
    impact: "Medium",
    mitigation: "Assign dedicated FX team. Create middleware adapter layer. Consider phased rollout by store.",
    owner: "Yago",
    status: "Open",
    category: "Technical",
  },
  {
    id: "R6",
    title: "Ensenta RDC integration delays",
    description: "Ensenta onboarding or SDK integration may take longer, impacting RDC feature availability at launch.",
    likelihood: "Medium",
    impact: "Low",
    mitigation: "RDC is medium priority; can be deferred to post-MVP if needed. Start vendor onboarding early.",
    owner: "James H.",
    status: "Open",
    category: "Vendor",
  },
  {
    id: "R7",
    title: "Pricing sign-off delays",
    description: "Fee table and revenue model approval from Finance, Business, and TAB may slip, blocking card product config and UX copy.",
    likelihood: "Medium",
    impact: "High",
    mitigation: "Start pricing discussions early (WS9-M1). Align stakeholders in kickoff. Use placeholder pricing for dev.",
    owner: "Scott",
    status: "Open",
    category: "Business",
  },
  {
    id: "R8",
    title: "Cross-workstream dependency bottlenecks",
    description: "Multiple workstreams depend on WS1-M5 (Core API) and WS3-M4 (AML model). Delays in these critical path items cascade widely.",
    likelihood: "Medium",
    impact: "High",
    mitigation: "Prioritize critical path items. Daily standups for WS1 and WS3. Buffer time built into downstream plans.",
    owner: "Aizhan Y.",
    status: "Open",
    category: "Program",
  },
];

export const initialDecisions: Decision[] = [
  { id: "D1", date: "2026-01-15", decision: "TAB Bank confirmed as sponsor bank for DDA and BIN", rationale: "Existing relationship, regulatory coverage, small-bank interchange advantage.", owner: "James H.", status: "Final", source: "Vendor Selection Committee" },
  { id: "D2", date: "2026-01-20", decision: "Helix selected as core banking / BaaS platform", rationale: "API-first architecture, TAB partnership, supports DDA + card issuance + ledger.", owner: "James H.", status: "Final", source: "Architecture Review Board" },
  { id: "D3", date: "2026-02-01", decision: "Build wallet within existing OneApp (not standalone app)", rationale: "Leverage existing user base and Veriff KYC integration. Faster time to market.", owner: "Juan P.", status: "Final", source: "Product Steering Committee" },
  { id: "D4", date: "2026-02-01", decision: "Launch with checking account + debit card (savings in v2)", rationale: "Reduce MVP scope. Checking + debit covers 80% of target user needs.", owner: "Juan P.", status: "Final", source: "Product Steering Committee" },
  { id: "D5", date: "2026-02-10", decision: "Visa DPS as card processor", rationale: "TAB Bank partnership with DPS. Supports auth, settle, refund, 3DS.", owner: "Nicholas", status: "Final", source: "Architecture Review Board" },
  { id: "D6", date: "2026-02-15", decision: "CPI as card bureau for manufacturing & fulfillment", rationale: "EMV data handling, SFTP file exchange. Competitive pricing.", owner: "James H.", status: "Pending", source: "Vendor Selection Committee" },
  { id: "D7", date: "2026-02-15", decision: "Ensenta for Remote Check Deposit (RDC)", rationale: "Mobile SDK, TAB-compatible, supports phased funding and hold logic.", owner: "James H.", status: "Pending", source: "Vendor Selection Committee" },
  { id: "D8", date: "2026-02-20", decision: "Pay-as-you-go pricing model (no subscription for MVP)", rationale: "Lower barrier to adoption. Revenue from interchange and per-transaction fees.", owner: "Scott", status: "Final", source: "Product Steering Committee" },
  { id: "D9", date: "2026-03-01", decision: "Non-instant RDC in MVP (instant RDC deferred)", rationale: "Reduce risk and compliance complexity. Holds and release schedules applied.", owner: "David K.", status: "Final", source: "Compliance Committee" },
  { id: "D10", date: "2026-03-05", decision: "Extend existing Adyen integration for wallet/card load", rationale: "Reuse current Adyen rails. Requires Adyen approval for new use case.", owner: "Nicholas", status: "Pending", source: "Technical Design Review" },
];

// Team order for display in RACI view
export const teamOrder: string[] = [
  "Ria Wallet/Card Program",
  "Ria Project Management",
  "Ria Business",
  "Ria IT",
  "Ria Product",
  "Ria Design/Brand",
  "Ria Finance",
  "Analytics & Reporting",
  "Procurement",
  "Ria Payments",
  "Ria Security",
  "Ria Privacy",
  "Ria Fraud",
  "Legal",
  "Ria Digital Operations",
  "Marketing",
  "Revenue Management",
  "Ria Compliance",
  "Ria Care",
  "Vendor: TAB Bank",
  "Vendor: Helix/Q2",
];
