const users = [
  { name: "Maru", rank: 2, books: 3, days: 8 },
  { name: "Yoon", rank: 1, books: 4, days: 10 },
  { name: "Pado", rank: 3, books: 2, days: 6 },
];

const rankLabel: Record<number, string> = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

function TopReadingRanking() {
  return (
    <div className="bg-bg">
      <section className="w-full mt-[14px]">
        {/* 랭킹 리스트 */}
        <div className="flex items-end justify-between">
          {users.map((user) => {
            const isFirst = user.rank === 1;

            return (
              <div key={user.name} className="flex flex-col items-center">
                {/* 이미지 + 랭크 뱃지 */}
                {isFirst ? (
                  // 1등용: 그라데이션
                  <div className="rounded-full p-[2px] [background-image:linear-gradient(330deg,_#788ade,_#E9EBF4)]">
                    <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gray-300">
                      <span className="text-caption-01 text-gray-600">img</span>

                      {/* 순위 뱃지 */}
                      <div className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-caption-02 text-white">
                        {rankLabel[user.rank]}
                      </div>
                    </div>
                  </div>
                ) : (
                  // 나머지: 일반 원
                  <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gray-300">
                    <span className="text-caption-01 text-gray-600">img</span>
                    <div className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full bg-primary-side px-2 py-0.5 text-caption-02 text-white">
                      {rankLabel[user.rank]}
                    </div>
                  </div>
                )}

                {/* 이름 */}
                <p className="mt-3 text-body-02">{user.name}</p>

                {/* 기록 */}
                <p className="mt-1 text-caption-02 text-gray-600">
                  {user.books}권 읽음
                  <span className="inline-block h-1 w-1 align-middle mx-1 rounded-full bg-gray-500/20" />
                  {user.days}일 기록
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default TopReadingRanking;
