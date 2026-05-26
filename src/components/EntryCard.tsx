"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DrillEntry } from "@/data/types";

const typeColors: Record<string, string> = {
  genre: "bg-blue-500/20 text-blue-300",
  city: "bg-emerald-500/20 text-emerald-300",
  artist: "bg-purple-500/20 text-purple-300",
  group: "bg-amber-500/20 text-amber-300",
};

export default function EntryCard({ entry, index = 0 }: { entry: DrillEntry; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        href={`/explore/${entry.slug}`}
        className="group relative block rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="mb-3 flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              typeColors[entry.type] || "bg-gray-500/20 text-gray-300"
            }`}
          >
            {entry.type}
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
