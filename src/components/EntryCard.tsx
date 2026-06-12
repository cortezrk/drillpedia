"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DrillEntry } from "@/data/types";

const categoryColors: Record<string, string> = {
  Sets: "bg-rose-500/20 text-rose-300",
  Blocks: "bg-cyan-500/20 text-cyan-300",
  Alliances: "bg-amber-500/20 text-amber-300",
  Cliques: "bg-violet-500/20 text-violet-300",
  Deaths: "bg-slate-500/20 text-slate-300",
  "Music Video": "bg-indigo-500/20 text-indigo-300",
};

function tagLabel(category?: string, type?: string): string {
  if (!category) return type || "";
  return category === "Music Video" ? "music video" : category.replace(/s$/, "").toLowerCase();
}

export default function EntryCard({ entry, index = 0, searchParams = "" }: { entry: DrillEntry; index?: number; searchParams?: string }) {
  const href = searchParams
    ? `/explore/${entry.slug}?${searchParams}`
    : `/explore/${entry.slug}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="min-w-0"
    >
      <Link
        href={href}
        className="group relative block rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              (entry.category ? categoryColors[entry.category] : null) || "bg-gray-500/20 text-gray-300"
            }`}
          >
            {tagLabel(entry.category, entry.type)}
          </span>
          {entry.location && (
            <span className="text-xs text-muted">{entry.location}</span>
          )}
        </div>
        <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary-light">
          {entry.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {entry.summary}
        </p>
      </Link>
    </motion.div>
  );
}
