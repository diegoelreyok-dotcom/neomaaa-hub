export default function Loading() {
  return (
    <div className="animate-pulse max-w-4xl mx-auto">
      {/* Header */}
      <div className="h-10 w-80 bg-neo-dark-3 rounded-lg mb-3" />
      <div className="h-5 w-64 bg-neo-dark-3/60 rounded mb-2" />
      <div className="h-4 w-48 bg-neo-dark-3/50 rounded mb-8" />

      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex justify-between mb-2">
          <div className="h-4 w-32 bg-neo-dark-3/70 rounded" />
          <div className="h-4 w-16 bg-neo-dark-3/70 rounded" />
        </div>
        <div className="h-3 w-full bg-neo-dark-3 rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-neo-dark-3/60 rounded-full" />
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-xl border p-6 ${
              i === 0
                ? 'border-neo-dark-3/70 bg-neo-dark-2/60'
                : i === 1
                ? 'border-neo-primary/30 bg-neo-primary/5'
                : 'border-neo-dark-3/40 bg-neo-dark-2/40 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-neo-dark-3/70" />
                <div className="h-5 w-48 bg-neo-dark-3 rounded" />
              </div>
              <div className="h-4 w-14 bg-neo-dark-3/70 rounded" />
            </div>
            <div className="h-3 w-full bg-neo-dark-3/50 rounded-full mb-4" />
            <div className="space-y-2 mt-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={j}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg bg-neo-dark-3/30"
                >
                  <div className="w-5 h-5 rounded-full bg-neo-dark-3/70" />
                  <div className="h-4 w-64 bg-neo-dark-3/60 rounded" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Final badge card */}
      <div className="mt-10 rounded-xl border border-dashed border-neo-dark-3/60 p-8 text-center">
        <div className="w-20 h-20 rounded-full bg-neo-dark-3/40 mx-auto mb-4" />
        <div className="h-6 w-64 bg-neo-dark-3/60 rounded mx-auto mb-2" />
        <div className="h-4 w-48 bg-neo-dark-3/40 rounded mx-auto" />
      </div>
    </div>
  );
}
