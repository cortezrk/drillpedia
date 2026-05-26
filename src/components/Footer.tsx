export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-muted">
            <img
              src="/logo.jpg"
              alt="Drill Pedia"
              className="h-6 w-6 rounded object-cover"
            />
            <span>Drill Pedia</span>
          </div>
          <p className="text-xs text-muted">
            Built by <strong className="text-foreground">Cortez</strong> &middot; REVSID5
          </p>
        </div>
        <div className="mt-4 border-t border-border/50 pt-4 text-center text-xs text-muted">
          Documentation & Research Hub. Not affiliated with any gang or
          criminal organization. Content is for{" "}
          <strong className="text-foreground">educational and research</strong>{" "}
          purposes only.
        </div>
      </div>
    </footer>
  );
}
