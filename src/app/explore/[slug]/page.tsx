import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntryBySlug, getRelatedEntries } from "@/lib/data";
import Sidebar from "@/components/Sidebar";
import EntryCard from "@/components/EntryCard";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);
  if (!entry) return { title: "Not Found" };
  return {
    title: entry.title,
    description: entry.summary,
  };
}

export default async function EntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getEntryBySlug(slug);

  if (!entry) notFound();

  const related = getRelatedEntries(entry.related);

  const paragraphs = entry.content.split("\n\n").filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/explore" className="hover:text-foreground">
          Explore
        </Link>
        <span>/</span>
        <span className="text-foreground">{entry.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <article>
          <h1 className="mb-2 text-3xl font-bold">{entry.title}</h1>
          <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary-light">
              {entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
            </span>
            {entry.location && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {entry.location}
              </span>
            )}
          </div>

          <div className="mb-6 rounded-xl border border-border bg-surface-2 p-4 text-sm leading-relaxed text-muted">
            {entry.summary}
          </div>

          <div className="prose prose-invert max-w-none">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="mb-4 leading-relaxed text-foreground/90"
              >
                {p}
              </p>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          <Sidebar entry={entry} />

          {entry.related.length > 0 && (
            <aside className="rounded-xl border border-border bg-surface p-5">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
                Related
              </h3>
              <div className="space-y-1">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/explore/${r.slug}`}
                    className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-primary-light"
                  >
                    {r.title}
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="mb-6 text-xl font-bold">Related Entries</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <EntryCard key={r.slug} entry={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
