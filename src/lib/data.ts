import { DrillEntry, DictionaryEntry } from "@/data/types";
import rawEntries from "@/data/entries.json";
import rawDictionary from "@/data/dictionary.json";

const entries: DrillEntry[] = rawEntries as DrillEntry[];
const dictionaryEntries: DictionaryEntry[] = rawDictionary as DictionaryEntry[];

export const regionConfigs: Record<
  string,
  { label: string; tag: string; slug: string; categories: string[] }
> = {
  "nyc-drill": {
    label: "NYC Drill",
    tag: "nyc",
    slug: "nyc-drill",
    categories: ["All", "Sets", "Blocks", "Alliances", "Cliques", "Deaths"],
  },
  "chicago-drill": {
    label: "Chicago Drill",
    tag: "chicago",
    slug: "chicago-drill",
    categories: ["All", "Sets", "Blocks", "Alliances", "Cliques", "Deaths"],
  },
  "california": {
    label: "California",
    tag: "california",
    slug: "california",
    categories: ["All", "Sets", "Blocks", "Alliances", "Deaths"],
  },
  "texas": {
    label: "Texas",
    tag: "texas",
    slug: "texas",
    categories: ["All", "Sets", "Blocks", "Alliances", "Deaths"],
  },
  "uk-drill": {
    label: "UK Drill",
    tag: "uk",
    slug: "uk-drill",
    categories: ["All", "Blocks", "Alliances", "Deaths"],
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

export function getAllDictionaryEntries(): DictionaryEntry[] {
  return dictionaryEntries;
}

export function getDictionaryEntryBySlug(slug: string): DictionaryEntry | undefined {
  return dictionaryEntries.find((e) => e.slug === slug);
}

export function getDictionaryEntriesByRegion(regionTag: string): DictionaryEntry[] {
  if (regionTag === "all") return dictionaryEntries;
  return dictionaryEntries.filter((e) => e.region === regionTag);
}


