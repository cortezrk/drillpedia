import { DrillEntry } from "@/data/types";
import Link from "next/link";

export default function Sidebar({ entry }: { entry: DrillEntry }) {
  const infoItems = [
    { label: "Type", value: entry.type.charAt(0).toUpperCase() + entry.type.slice(1) },
    { label: "Location", value: entry.location },
    { label: "Years Active", value: entry.yearsActive },
  ];

  return (
    <aside className="rounded-xl border border-border bg-surface p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
        Entry Info
      </h3>
      <div className="space-y-3">
        {infoItems.map((item) => (
          <div key={item.label}>
            <p className="text-xs text-muted">{item.label}</p>
            <p className="text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      {entry.tags.length > 0 && (
        <>
          <hr className="my-4 border-border" />
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
            Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <Link
                key={tag}
                href={`/explore?tag=${tag}`}
                className="rounded-full bg-surface-3 px-2.5 py-1 text-xs text-muted transition-colors hover:bg-primary/20 hover:text-primary-light"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </>
      )}
    </aside>
  );
}
