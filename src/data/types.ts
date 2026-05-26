export type EntryType = "genre" | "region" | "artist" | "group";

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
