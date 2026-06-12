import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntryBySlug } from "@/lib/data";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ category?: string; region?: string }>;
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

export default async function EntryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const entry = getEntryBySlug(slug);

  if (!entry) notFound();

  const sections = entry.content.split("\n===\n").filter(Boolean);

  const region = sp?.region;
  const category = sp?.category;
  const exploreHref = region
    ? `/explore?region=${region}${category ? `&category=${category}` : ""}`
    : "/explore";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href={exploreHref} className="hover:text-foreground">
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
              {entry.category || entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}
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

          {entry.image && (
            <div className="mb-6 overflow-hidden rounded-xl border border-border">
              <img
                src={entry.image}
                alt={entry.title}
                className="aspect-square w-full object-cover"
              />
            </div>
          )}

          <div className="space-y-4">
            {sections.map((section, i) => {
              const newlineIdx = section.indexOf("\n");
              const heading = newlineIdx === -1 ? section : section.slice(0, newlineIdx);
              const body = newlineIdx === -1 ? "" : section.slice(newlineIdx + 1);
              const lines = body.split("\n");
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-surface-2 p-5 text-sm leading-relaxed text-foreground/90"
                >
                  <h3 className="mb-3 font-bold text-foreground">{heading}</h3>
                  {lines.map((line, j) => (
                    <p key={j} className="mb-2 last:mb-0 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        </article>

        <div className="space-y-6">
          <Sidebar entry={entry} />
        </div>
      </div>
    </div>
  );
}
