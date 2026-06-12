import { DrillEntry } from "@/data/types";

export default function Sidebar({ entry }: { entry: DrillEntry }) {
  const infoItems = [
    { label: "Type", value: entry.type.charAt(0).toUpperCase() + entry.type.slice(1) },
    { label: "Location", value: entry.location },
    { label: entry.category === "Deaths" ? "Date" : "Years Active", value: entry.yearsActive },
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
    </aside>
  );
}
