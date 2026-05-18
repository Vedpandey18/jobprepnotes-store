export function CatalogLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-96 animate-pulse rounded-2xl bg-violet-100/80 dark:bg-violet-950/40"
        />
      ))}
    </div>
  );
}
