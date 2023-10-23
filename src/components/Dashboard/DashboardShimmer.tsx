export function DashboardShimmer() {
  return (
    <div className="flex animate-pulse flex-col space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`shimmer-div-${i}`}
          className="rounded-lg bg-brand-200 px-5 py-4"
        >
          <div className="flex flex-col space-y-2">
            <div className="mb-2 flex flex-col gap-y-1">
              <div className="h-4 w-40 rounded-md bg-brand-400"></div>
              <div className="h-3 w-20 rounded-md bg-brand-400"></div>
            </div>

            <div className="h-3 w-52 rounded-md bg-brand-400"></div>
            <div className="h-3 w-52 rounded-md bg-brand-400"></div>
            <div className="h-3 w-52 rounded-md bg-brand-400"></div>
            <div className="h-3 w-52 rounded-md bg-brand-400"></div>
            <div className="h-3 w-52 rounded-md bg-brand-400"></div>
            <div className="h-3 w-52 rounded-md bg-brand-400"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
