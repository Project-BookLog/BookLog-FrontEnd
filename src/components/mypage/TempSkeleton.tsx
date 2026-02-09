export const MyBookLogCardSkeleton = () => {
  return (
    <div className="flex px-5 pt-4 pb-[14px] flex-col items-start gap-3 self-stretch rounded-[12px] border-b border-gray-100 bg-gray-100 animate-pulse">
      
      <div className="flex justify-between items-start self-stretch">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-[94px] h-[94px] rounded-[8px] bg-gray-300"
          />
        ))}
      </div>

      <div className="flex flex-col items-start gap-2 self-stretch">
        
        <div className="flex flex-col gap-1 self-stretch">
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="h-4 w-4/5 rounded bg-gray-300" />
        </div>

        <div className="flex justify-between items-center self-stretch">
          
          <div className="flex items-center gap-1">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-5 w-12 rounded-[4px] bg-gray-300"
              />
            ))}
          </div>

          <div className="flex items-center gap-[6px]">
            <div className="w-6 h-6 rounded-full bg-gray-300" />
            <div className="h-4 w-6 rounded bg-gray-300" />
          </div>

        </div>
      </div>
    </div>
  );
};
