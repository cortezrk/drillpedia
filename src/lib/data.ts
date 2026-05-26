import { DrillEntry } from "@/data/types";
import rawEntries from "@/data/entries.json";

const entries: DrillEntry[] = rawEntries as DrillEntry[];

export const regionConfigs: Record<
  string,
  { label: string; tag: string; slug: string; categories: string[] }
> = {
  "nyc-drill": {
    label: "NYC Drill",
    tag: "nyc",
    slug: "nyc-drill",
    categories: ["All", "Sets", "Blocks", "Alliances", "Cliques", "Deaths", "Music Video"],
  },
  "chicago-drill": {
    label: "Chicago Drill",
    tag: "chicago",
    slug: "chicago-drill",
    categories: ["All"],
  },
};

export function getAllEntries(): DrillEntry[] {
  return entries;
}

export function getEntryBySlug(slug: string): DrillEntry | undefined {
  return entries.find((e) => e.slug === slug);
}

export function getRelatedEntries(slugs: string[]): DrillEntry[] {
  return entries.filter((e) => slugs.includes(e.slug));
}

export function getEntriesByRegion(regionTag: string): DrillEntry[] {
  return entries.filter((e) => e.region === regionTag);
}

export function getEntriesByRegionAndCategory(
  regionTag: string,
  category: string
): DrillEntry[] {
  const byRegion = getEntriesByRegion(regionTag);
  if (category === "All") return byRegion;
  return byRegion.filter((e) => e.category === category);
}


