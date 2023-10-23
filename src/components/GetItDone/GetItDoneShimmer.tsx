export function GetItDoneShimmer() {
  return (
    <div className="flex animate-pulse flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <div className="h-9 w-9 rounded-full bg-slate-600"></div>

          <div className="h-10 w-1/2 rounded-md bg-slate-500"></div>
        </div>

        <div className="h-9 w-9 rounded-full bg-slate-600"></div>
      </div>

      <div className="rounded-lg bg-slate-700 p-3">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-5 w-1/3 rounded-md bg-slate-500"></div>

            <div className="flex items-center space-x-4">
              <div className="h-5 w-14 rounded-md bg-slate-500"></div>
              <div className="h-8 w-8 rounded-full bg-slate-600"></div>
            </div>
          </div>

          {/* Spacer */}
          <div></div>

          <div className="flex flex-col space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`shimmer-set-${i}`}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-16 rounded-md bg-slate-600"></div>
                  <div className="h-8 w-16 rounded-md bg-slate-600"></div>
                  <div className="h-8 w-16 rounded-md bg-slate-600"></div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="h-4 w-10 rounded-md bg-slate-600"></div>
                  <div className="h-8 w-8 rounded-full bg-slate-600"></div>
                </div>
              </div>
            ))}
          </div>

          <div></div>

          <div className="h-8 w-full rounded-md bg-slate-600"></div>
        </div>
      </div>

      <div className="h-10 w-full rounded-md bg-slate-600"></div>

      <div className="h-10 w-full rounded-md bg-slate-600"></div>
    </div>
  );
}
