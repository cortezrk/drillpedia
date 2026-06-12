"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DictionaryEntry } from "@/data/types";

const regionColors: Record<string, string> = {
  nyc: "bg-blue-500/20 text-blue-300",
  chicago: "bg-red-500/20 text-red-300",
};

const regionLabels: Record<string, string> = {
  nyc: "NYC",
  chicago: "Chicago",
};

export default function DictionaryCard({ entry, index = 0 }: { entry: DictionaryEntry; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    >
      <Link
        href={`/dictionary/${entry.slug}`}
        className="group relative block rounded-xl border border-border bg-surface p-5 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
      >
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`rounded-md px-2 py-0.5 text-xs font-medium ${
              regionColors[entry.region] || "bg-gray-500/20 text-gray-300"
            }`}
          >
            {regionLabels[entry.region] || entry.region}
          </span>
        </div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary-light">
          {entry.term}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {entry.definition}
        </p>
        {entry.example && (
          <p className="border-l-2 border-primary/30 pl-3 text-xs italic leading-relaxed text-muted/60">
            &ldquo;{entry.example}&rdquo;
          </p>
        )}
      </Link>
    </motion.div>
  );
}
