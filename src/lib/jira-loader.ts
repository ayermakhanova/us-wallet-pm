import type { Epic } from "../types";

const DATA_URL = `${import.meta.env.BASE_URL}data/workstreams.json`;
const META_URL = `${import.meta.env.BASE_URL}data/last-synced.json`;

export interface SyncMeta {
  syncedAt: string;
  laneCount: number;
  totalLanes: number;
  errors?: { lane: string; error: string }[];
}

export interface JiraSyncResult {
  lanes: Epic[];
  meta: SyncMeta;
}

export async function loadJiraData(): Promise<JiraSyncResult | null> {
  try {
    const [lanesRes, metaRes] = await Promise.all([fetch(DATA_URL), fetch(META_URL)]);
    if (!lanesRes.ok || !metaRes.ok) return null;
    const lanes = (await lanesRes.json()) as Epic[];
    const meta = (await metaRes.json()) as SyncMeta;
    return { lanes, meta };
  } catch {
    return null;
  }
}
