"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { getAllDictionaryEntries, getDictionaryEntriesByRegion } from "@/lib/data";
import DictionaryCard from "@/components/DictionaryCard";

const regions = [
  { value: "all", label: "All" },
  { value: "nyc", label: "NYC" },
  { value: "chicago", label: "Chicago" },
];

function DictionaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeRegion = searchParams.get("region") || "all";
  const [searchQuery, setSearchQuery] = useState("");

  const allEntries = useMemo(
    () => getDictionaryEntriesByRegion(activeRegion),
    [activeRegion]
  );

  const filteredEntries = useMemo(() => {
    if (!searchQuery.trim()) return allEntries;
    const q = searchQuery.toLowerCase();
    return allEntries.filter(
      (e) =>
        e.term.toLowerCase().includes(q) ||
        e.definition.toLowerCase().includes(q) ||
        e.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [allEntries, searchQuery]);

  const handleRegionChange = useCallback(
    (region: string) => {
      setSearchQuery("");
      const params = new URLSearchParams(searchParams.toString());
      if (region === "all") {
        params.delete("region");
      } else {
        params.set("region", region);
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className="relative z-10 mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-8 text-center"
      >
        <h1 className="mb-2 text-3xl font-bold">Dictionary</h1>
        <p className="text-muted">Drill slang &amp; terminology</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="mb-6 flex justify-center gap-2"
      >
        {regions.map((r) => (
          <button
            key={r.value}
            onClick={() => handleRegionChange(r.value)}
            className={`rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
              activeRegion === r.value
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "border border-border bg-surface/60 text-muted backdrop-blur-sm hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {r.label}
          </button>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3, ease: "easeOut" }}
        className="relative mb-8"
      >
        <svg
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search terms..."
          className="w-full rounded-xl border border-border bg-surface/60 py-3 pl-10 pr-4 text-sm text-foreground placeholder-muted backdrop-blur-sm transition-colors focus:border-primary/50 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        {filteredEntries.length > 0 ? (
          <motion.div
            key={activeRegion + searchQuery}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {searchQuery && (
              <p className="mb-4 text-center text-xs text-muted">
                Found {filteredEntries.length} result{filteredEntries.length !== 1 ? "s" : ""} for &ldquo;<span className="text-foreground">{searchQuery}</span>&rdquo;
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredEntries.map((entry, i) => (
                <DictionaryCard key={entry.slug} entry={entry} index={i} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={activeRegion + searchQuery}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.3, ease: "easeOut" }}
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-surface/60 backdrop-blur-sm"
            >
              <svg
                className="h-7 w-7 text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.div>
            <h2 className="mb-1 text-xl font-semibold">No Results</h2>
            <p className="max-w-sm text-sm text-muted">
              No terms match your search. Try a different term or region.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Dictionary() {
  return (
    <Suspense>
      <DictionaryContent />
    </Suspense>
  );
}
