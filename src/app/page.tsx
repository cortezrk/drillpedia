"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getEntryBySlug, regionConfigs } from "@/lib/data";
import TypewriterText from "@/components/TypewriterText";

const regions = Object.keys(regionConfigs).map(getEntryBySlug).filter(Boolean);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/50">
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-primary/4 via-transparent to-background"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/4 blur-3xl"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.3, 0.5, 0.3],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-4xl px-5 pb-16 pt-14 text-center sm:px-8 sm:pt-24 sm:pb-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted backdrop-blur-sm sm:px-4 sm:py-1.5"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            Documentation & Research Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="mb-3 text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          >
            Welcome to{" "}
            <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
              <TypewriterText />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mb-8 max-w-2xl px-2 text-base leading-relaxed text-muted sm:text-lg"
          >
            A comprehensive encyclopedia documenting Drill music culture, its
            artists, regional scenes, and cultural context. Explore the history
            and evolution of one of hip-hop&apos;s most influential subgenres.
          </motion.p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 text-center sm:mb-10"
        >
          <h2 className="text-xl font-bold tracking-wide sm:text-2xl">
            Choose The City
          </h2>
          <p className="mt-1 text-sm text-muted sm:text-base">
            Select a city to explore its drill music scene
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto grid max-w-4xl gap-4 sm:gap-6 sm:grid-cols-2"
        >
          {regions.map((region) => {
            if (!region) return null;
            return (
              <motion.div key={region.slug} variants={itemVariants}>
                <Link
                  href={`/explore?region=${region.slug}`}
                  className="group relative block overflow-hidden rounded-2xl border border-border bg-surface/60 p-5 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 sm:p-8"
                >
                  <motion.div
                    className="absolute right-0 top-0 h-36 w-36 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative">
                    <div className="mb-3 inline-flex rounded-lg bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary-light sm:px-3 sm:py-1">
                      {region.type.charAt(0).toUpperCase() + region.type.slice(1)}
                    </div>
                    <h3 className="mb-2 text-lg font-bold transition-colors group-hover:text-primary-light sm:text-xl">
                      {region.title}
                    </h3>
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted">
                      {region.summary}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary-light">
                      Explore {region.title.split(" ")[0]}
                      <motion.svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center sm:mt-10"
        >
          <p className="text-sm text-muted">More cities coming soon.</p>
        </motion.div>
      </section>
    </div>
  );
}
