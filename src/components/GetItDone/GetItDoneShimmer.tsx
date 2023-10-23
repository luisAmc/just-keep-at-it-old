export function GetItDoneShimmer() {
  return (
    <div className="flex animate-pulse flex-col space-y-4 rounded-lg bg-brand-100 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <div className="h-9 w-9 rounded-full bg-brand-200"></div>

          <div className="h-10 w-1/2 rounded-md bg-brand-200"></div>
        </div>

        <div className="h-9 w-9 rounded-full bg-brand-200"></div>
      </div>

      {Array.from({ length: 2 }).map((_, cardIdx) => (
        <div key={`card-${cardIdx}`} className="rounded-lg bg-brand-300 p-3">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-5 w-1/3 rounded-md bg-brand-400"></div>

              <div className="flex items-center space-x-4">
                <div className="h-5 w-14 rounded-md bg-brand-400"></div>
                <div className="h-8 w-8 rounded-full bg-brand-400"></div>
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
                    <div className="h-8 w-16 rounded-md bg-brand-400"></div>
                    <div className="h-8 w-16 rounded-md bg-brand-400"></div>
                    <div className="h-8 w-16 rounded-md bg-brand-400"></div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="h-4 w-10 rounded-md bg-brand-400"></div>
                    <div className="h-8 w-8 rounded-full bg-brand-400"></div>
                  </div>
                </div>
              ))}
            </div>

            <div></div>

            <div className="h-8 w-full rounded-md bg-brand-400"></div>
          </div>
        </div>
      ))}

      <div className="h-10 w-full rounded-md bg-brand-300"></div>

      <div className="h-10 w-full rounded-md bg-brand-300"></div>
    </div>
  );
}
