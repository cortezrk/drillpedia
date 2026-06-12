export type EntryType = "genre" | "region" | "artist" | "group" | "set";

export interface DrillEntry {
  slug: string;
  title: string;
  type: EntryType;
  summary: string;
  content: string;
  image: string;
  location: string;
  yearsActive: string;
  tags: string[];
  related: string[];
  region?: string;
  category?: string;
}

export interface DictionaryEntry {
  slug: string;
  term: string;
  definition: string;
  example?: string;
  region: string;
  tags: string[];
}
