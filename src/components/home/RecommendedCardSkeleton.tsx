function RecommendedCardSkeleton() {
  return (
    <div className="px-5">
      <div className="relative rounded-2xl bg-slate-900 px-6 py-5 mt-2 mx-1 overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-slate-800 opacity-60" />

        <div className="relative">
          <div className="h-5 w-32 bg-slate-700 rounded mb-2" />
          <div className="h-4 w-56 bg-slate-700 rounded mb-6" />

          <div className="flex flex-col items-center gap-3">
            <div className="w-[92px] h-35 bg-slate-700 rounded mt-3" />

            <div className="w-full">
              <div className="h-5 w-40 bg-slate-700 rounded mx-auto mb-2" />

              <div className="h-4 w-48 bg-slate-700 rounded mx-auto mb-4" />

              <div className="flex justify-center gap-2">
                <div className="h-6 w-14 bg-slate-700 rounded" />
                <div className="h-6 w-14 bg-slate-700 rounded" />
                <div className="h-6 w-14 bg-slate-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default RecommendedCardSkeleton;
