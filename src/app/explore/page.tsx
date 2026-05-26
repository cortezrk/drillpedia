"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { regionConfigs, getEntriesByRegionAndCategory } from "@/lib/data";
import { Suspense } from "react";
import EntryCard from "@/components/EntryCard";

function ExploreContent() {
  const searchParams = useSearchParams();
  const regionSlug = searchParams.get("region");
  const region = regionSlug ? regionConfigs[regionSlug] : null;

  const [activeCategory, setActiveCategory] = useState("All");

  const entries = useMemo(
    () =>
      region
        ? getEntriesByRegionAndCategory(region.tag, activeCategory)
        : [],
    [region, activeCategory]
  );

  if (!region) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center sm:px-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-surface/60 backdrop-blur-sm"
        >
          <svg
            className="h-8 w-8 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945m8-1.456l-3-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v.586l-1.707.707A2 2 0 004 9.414V11"
            />
          </svg>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="mb-2 text-2xl font-bold"
        >
          Select a City
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-8 text-muted"
        >
          Please choose a city from the homepage to explore its drill music
          scene.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-dark"
          >
            Go to Homepage
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h1 className="text-2xl font-bold sm:text-3xl">{region.label}</h1>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                className="rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary-light"
              >
                Exploring
              </motion.span>
            </div>
            <p className="text-muted">Filter by category</p>
          </div>

          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-lg border border-border bg-surface/60 px-4 py-2 text-sm text-muted backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-primary-light"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Switch City
          </Link>
        </div>

        <p className="mt-3 text-xs text-muted">
          Currently viewing{" "}
          <span className="font-medium text-foreground">{region.label}</span>.
          To explore a different city,{" "}
          <Link
            href="/"
            className="font-medium text-primary-light hover:underline"
          >
            go back to the homepage
          </Link>{" "}
          and select another city.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4, ease: "easeOut" }}
        className="mb-8 flex flex-wrap gap-2"
      >
        {region.categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === category
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "border border-border bg-surface/60 text-muted backdrop-blur-sm hover:border-primary/30 hover:text-foreground"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {entries.length > 0 ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {entries.map((entry, i) => (
              <EntryCard key={entry.slug} entry={entry} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={activeCategory}
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </motion.div>
            <h2 className="mb-1 text-xl font-semibold">No Entries Yet</h2>
            <p className="max-w-sm text-sm text-muted">
              Content for {activeCategory === "All" ? "this city" : activeCategory} is being prepared. Check back later.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Explore() {
  return (
    <Suspense>
      <ExploreContent />
    </Suspense>
  );
}
