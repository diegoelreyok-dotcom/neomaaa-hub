export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-10 w-64 bg-neo-dark-3 rounded-lg mb-2" />
      <div className="h-5 w-48 bg-neo-dark-3/60 rounded mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-neo-dark-3 bg-neo-dark-2/60 p-6"
          >
            <div className="aspect-[1.4/1] bg-neo-dark-3/60 rounded-lg mb-5" />
            <div className="h-5 w-3/4 bg-neo-dark-3 rounded mb-3" />
            <div className="h-3.5 w-1/2 bg-neo-dark-3/70 rounded mb-4" />
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-16 bg-neo-dark-3/70 rounded" />
              <div className="h-3.5 w-20 bg-neo-dark-3/70 rounded" />
            </div>
            <div className="h-5 w-32 bg-neo-dark-3/50 rounded mt-5" />
          </div>
        ))}
      </div>
    </div>
  );
}
