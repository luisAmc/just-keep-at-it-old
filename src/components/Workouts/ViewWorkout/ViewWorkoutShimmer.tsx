export function ViewWorkoutShimmer() {
  return (
    <div className="flex animate-pulse flex-col space-y-4 rounded-lg bg-brand-200 p-4">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 rounded-md bg-brand-300"></div>

        <div className="h-8 w-8 rounded-full bg-brand-300"></div>
      </div>

      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`shimmer-div-${i}`}
          className="flex flex-col gap-y-4 rounded-lg bg-brand-300 px-5 py-4"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-40 rounded-md bg-brand-400"></div>
            <div className="h-3 w-20 rounded-md bg-brand-400"></div>
          </div>

          <div className="flex items-center justify-center gap-x-4">
            {<div className="h-10 w-16 rounded-md bg-brand-400"></div>}
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
          </div>

          <div className="flex items-center justify-center gap-x-4">
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
          </div>

          <div className="flex items-center justify-center gap-x-4">
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
            <div className="h-10 w-16 rounded-md bg-brand-400"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
