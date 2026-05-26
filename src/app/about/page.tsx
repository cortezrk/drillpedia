"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { getAllEntries, regionConfigs } from "@/lib/data";

const entries = getAllEntries();
const cityCount = Object.keys(regionConfigs).length;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 lg:px-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/[0.07] via-surface/80 to-surface/80 p-6 backdrop-blur-sm sm:p-10 sm:mb-14"
      >
        <motion.div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            About
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Drill Pedia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="max-w-2xl text-sm leading-relaxed text-muted"
          >
            A personal documentation project dedicated to preserving and
            understanding Drill music culture, its history, regional scenes,
            and the stories behind them.
          </motion.p>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4 sm:mb-14"
      >
        {[
          { label: "Entries", value: entries.length },
          { label: "Cities", value: cityCount },
          { label: "Categories", value: "7+" },
          { label: "Started", value: "2026" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-xl border border-border bg-surface/60 p-3 text-center backdrop-blur-sm transition-colors hover:border-primary/30 sm:p-4"
          >
            <div className="text-xl font-bold text-primary-light sm:text-2xl">{stat.value}</div>
            <div className="mt-0.5 text-xs text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mission + Etymology side by side on desktop */}
      <div className="mb-10 grid gap-4 sm:gap-6 sm:grid-cols-2 sm:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/[0.04] via-surface/60 to-surface/60 p-5 backdrop-blur-sm sm:p-6"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <svg className="h-4 w-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-base font-bold sm:text-lg">Mission</h2>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            Drill Pedia exists to document and archive one of hip-hop&apos;s most
            influential subgenres. Inspired by Wikipedia&apos;s model of open
            knowledge, this project aims to be a comprehensive reference for Drill
            music — covering its origins in Chicago, its evolution in New York City,
            and its global spread.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary/[0.04] via-surface/60 to-surface/60 p-5 backdrop-blur-sm sm:p-6"
        >
          <div className="mb-3 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15">
              <svg className="h-4 w-4 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-base font-bold sm:text-lg">Etymology</h2>
          </div>
          <p className="text-sm leading-relaxed text-foreground/80">
            The name <strong>Drill Pedia</strong> combines &ldquo;Drill&rdquo; — the
            genre that started in Chicago&apos;s South Side — with &ldquo;-pedia&rdquo;
            (from encyclopedia, inspired by Wikipedia). It reflects the goal of being
            a structured, wiki-like knowledge base for the genre.
          </p>
        </motion.div>
      </div>

      {/* What's Inside */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <motion.h2
          className="mb-5 text-xl font-bold tracking-wide"
        >
          What&rsquo;s Inside
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {[
            { title: "Artists", desc: "Profiles of key figures in the Drill scene, from pioneers to new-gen artists.", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
            { title: "Cities", desc: "Deep dives into regional scenes — NYC, Chicago, and more coming soon.", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" },
            { title: "Culture", desc: "Documentation of sets, blocks, alliances, and the sociocultural context.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
            { title: "History", desc: "Timeline of Drill&apos;s evolution from Chicago basements to global stages.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
          ].map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface/60 via-surface/60 to-surface/30 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="relative z-10 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <svg className="h-4.5 w-4.5 text-primary-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div className="min-w-0">
                  <h3 className="mb-0.5 font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Cortez */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative mb-12 overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/[0.04] via-surface/80 to-surface/80 p-6 backdrop-blur-sm sm:p-8"
      >
        <motion.div
          className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Cortez
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-xl font-bold">Creator</h2>
            <p className="text-sm text-muted">The mind behind Drill Pedia</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3 text-sm leading-relaxed text-foreground/80"
          >
            {[
              <>
                Hey, I&apos;m <strong>Cortez</strong> — a 16-year-old from Indonesia
                who&apos;s been teaching myself to code since 5th grade, all on my
                phone. I love exploring the internet and diving deep into niche
                topics, and Drill culture is one of the most fascinating rabbit holes
                I&apos;ve come across.
              </>,
              <>
                I call myself an <strong>OSINT Hunter</strong> — I enjoy collecting
                data from all over, analyzing it, and organizing it into something
                useful. Drill Pedia is my way of combining two things I&apos;m
                passionate about: coding and documenting underground culture.
              </>,
              <>
                Also, I love cats <span className="not-sr-only">:3</span>
              </>,
            ].map((text, i) => (
              <motion.p
                key={i}
                variants={itemVariants}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="mt-6 border-t border-border pt-6"
          >
            <h3 className="mb-3 text-base font-bold">REVSID5 — The Community</h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3 text-sm leading-relaxed text-foreground/80"
            >
              {[
                <>
                  REVSID5, sebelumnya dikenal sebagai T5BS (The 5 Borough Side),
                  TBB (Tha Borough Block), dan awalnya bernama NYC Drill, adalah
                  sebuah komunitas berbasis WhatsApp yang didirikan pada{" "}
                  <strong>27 Desember 2024</strong>.
                </>,
                <>
                  Grup ini awalnya berfokus pada pembahasan musik NYC Drill.
                  Seiring meningkatnya minat, grup berganti nama menjadi{" "}
                  <strong>TBB (Tha Borough Block)</strong> dengan tetap
                  mempertahankan fokus pada NYC Drill. TBB mulai dikenal di
                  kalangan penggemar dan menginspirasi terbentuknya beberapa
                  komunitas NYC Drill kecil lainnya.
                </>,
                <>
                  Karena alasan tertentu, grup ini direstrukturisasi menjadi{" "}
                  <strong>T5BS (The 5 Borough Side)</strong> — nama yang
                  terinspirasi dari lima wilayah di New York City. Era ini menjadi
                  puncak komunitas, mencapai kurang lebih{" "}
                  <strong>390 anggota</strong>, serta server Discord dengan 200–300
                  anggota. T5BS dikenal sebagai salah satu komunitas Drill yang
                  paling tertib, dengan <strong>larangan keras terhadap
                  penggunaan kata-kata rasis</strong>, termasuk N-Word — sebuah
                  hal yang langka di komunitas serupa pada masanya.
                </>,
                <>
                  Di awal tahun 2026, komunitas ini mengalami rebranding keempat
                  dan terakhir menjadi <strong>REVSID5 (Revolution of Side
                  5)</strong>, memperluas cakupan dari NYC Drill ke{" "}
                  <strong>seluruh musik Drill dunia</strong>.
                </>,
                <>
                  Namun, aktivitas komunitas menurun drastis hingga tersisa sekitar{" "}
                  <strong>100 anggota</strong>, dikarenakan pendiri dan anggota
                  inti mulai sibuk dengan kehidupan nyata, terutama akademik.
                  Pertumbuhan awal komunitas didorong oleh keaktifan pendiri di{" "}
                  <strong>TikTok</strong> — mengunggah konten seputar NYC Drill
                  yang meraih cukup banyak penayangan — serta promosi organik dari
                  anggota lain. Upaya revitalisasi masih berlangsung, meskipun
                  terkendala jadwal yang semakin padat.
                </>,
              ].map((text, i) => (
                <motion.p key={i} variants={itemVariants}>
                  {text}
                </motion.p>
              ))}
            </motion.div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-5 flex justify-center"
            >
              <a
                href="https://chat.whatsapp.com/HOyZwHNtINXHlrlCBvMsRp?mode=r_t"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Join REVSID5 on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-12 rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-6"
      >
        <div className="mb-3 flex items-center gap-2">
          <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-lg font-semibold text-amber-300">Legal Disclaimer</h2>
        </div>
        <p className="mb-3 text-sm leading-relaxed text-foreground/70">
          Drill Pedia is strictly an{" "}
          <strong className="text-foreground/90">educational and research resource</strong>.
          We do not promote, endorse, or glorify violence, criminal activity, or gang
          affiliation. This site is intended for:
        </p>
        <ul className="mb-3 list-inside space-y-1 text-sm text-foreground/70">
          {[
            "Academic research and cultural studies",
            "Music journalism and historical documentation",
            "Understanding the sociocultural context of Drill music",
            "Preserving the artistic and cultural legacy of the genre",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 text-amber-400/70">—</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-sm leading-relaxed text-foreground/70">
          We do not support or condone any form of criminal behavior. If you or
          someone you know is affected by gang violence, please seek help from
          local community organizations or law enforcement.
        </p>
      </motion.div>

      {/* Contribute */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h2 className="mb-2 text-xl font-bold">Contributing</h2>
        <p className="mx-auto mb-4 max-w-lg text-sm leading-relaxed text-muted">
          Drill Pedia is an ongoing personal project. Data and entries are
          continuously being added and refined. If you have accurate information
          or corrections, contributions are welcome as the project grows.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          Explore Drill Pedia
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}
