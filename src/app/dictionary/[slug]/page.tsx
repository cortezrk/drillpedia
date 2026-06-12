import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionaryEntryBySlug } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getDictionaryEntryBySlug(slug);
  if (!entry) return { title: "Not Found" };
  return {
    title: entry.term,
    description: entry.definition,
  };
}

export default async function DictionaryTermPage({ params }: Props) {
  const { slug } = await params;
  const entry = getDictionaryEntryBySlug(slug);
  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:px-8">
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span className="text-muted/40">/</span>
        <Link href="/dictionary" className="hover:text-foreground transition-colors">
          Dictionary
        </Link>
        <span className="text-muted/40">/</span>
        <span className="text-foreground font-medium">{entry.term}</span>
      </nav>

      <article className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight">{entry.term}</h1>
          <span className="rounded-md bg-blue-500/20 px-2.5 py-0.5 text-xs font-medium text-blue-300">
            {entry.region === "nyc" ? "NYC" : entry.region === "chicago" ? "Chicago" : entry.region}
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-surface-2 p-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
            Definition
          </h2>
          <p className="text-base leading-relaxed text-foreground/90">
            {entry.definition}
          </p>
        </div>

        {entry.example && (
          <div className="rounded-2xl border border-border/60 bg-surface p-6">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
              Example
            </h2>
            <p className="border-l-2 border-primary/40 pl-4 text-lg italic leading-relaxed text-muted">
              &ldquo;{entry.example}&rdquo;
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-2 px-2.5 py-1 text-xs text-muted"
            >
              #{tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
