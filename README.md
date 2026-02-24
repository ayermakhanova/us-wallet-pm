# US Wallet Program Management Tool

A comprehensive program management dashboard for the US Wallet initiative, built with React, TypeScript, and Vite.

## Features

- **Dashboard** — Program-level KPIs, progress charts, and status overview
- **List View** — All 13 workstreams with 76 milestones, inline editing
- **Kanban Board** — Drag-and-drop milestone management across statuses
- **Timeline** — Gantt-style view of workstream schedules
- **Dependency Graph** — Visual cross-workstream dependency mapping
- **Risk Register** — Track and manage program risks
- **Decision Log** — Record key program decisions
- **Team / RACI** — 67 team members across 21 functional teams with RACI designations
- **Reports** — Export program data

## Tech Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Zustand (state management)
- Recharts (charts)
- React Flow (dependency graph)
- dnd-kit (drag and drop)

## Development

```bash
npm install
npm run dev
```

## Deployment

Automatically deployed to GitHub Pages via GitHub Actions on every push to `main`.

**Live site:** https://ayermakhanova.github.io/us-wallet-pm/
