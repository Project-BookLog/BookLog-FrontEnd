import { useEffect, useState } from "react";
import { getTopReadingRanking } from "../../api/mypage/readingRanking";
import type { ReadingUser } from "../../types/myPage/readingRanking.types";
import EmptyReadingRanking from "./EmptyReadingRanking";
import { LoadingPage } from "../../pages/onboarding/LoadingPage";

const rankLabel: Record<number, string> = {
  1: "1st",
  2: "2nd",
  3: "3rd",
};

interface Props {
  month: string;
}

function TopReadingRanking({ month }: Props) {
  const [users, setUsers] = useState<ReadingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   let ignore = false;
   // eslint-disable-next-line react-hooks/set-state-in-effect
   setLoading(true);
   getTopReadingRanking(month)
     .then((res) => {
       if (!ignore) setUsers(res.top3);
     })
     .catch(() => {
       if (!ignore) setUsers([]);
     })
     .finally(() => {
       if (!ignore) setLoading(false);
     });
   return () => { ignore = true; };
  }, [month]);

  if (loading) return <LoadingPage />;
  if (users.length === 0) return <EmptyReadingRanking />;

  return (
    <div className="bg-bg">
      <section className="w-full mt-[14px]">
        <div className="flex items-end justify-between">
          {users.map((user) => (
            <div key={user.userId} className="flex flex-col items-center">
              {/* 이미지+랭크뱃지 */}
              {user.rank === 1 ? (
                //1등용: 그라데이션
                <div className="rounded-full p-[2px] [background-image:linear-gradient(330deg,_#788ade,_#E9EBF4)]">
                  <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full bg-gray-300 overflow-hidden">
                    {user.profileImageUrl ? (
                      <img
                        src={user.profileImageUrl}
                        alt={user.nickname}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-caption-01 text-gray-600">img</span>
                    )}
                    {/* 순위뱃지 */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary px-2 py-0.5 text-caption-02 text-white">
                      {rankLabel[user.rank]}
                    </div>
                  </div>
                </div>
              ) : (
                // 나머지 일반 원
                <div className="relative flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gray-300 overflow-hidden">
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.nickname}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-caption-01 text-gray-600">img</span>
                  )}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-side px-2 py-0.5 text-caption-02 text-white">
                    {rankLabel[user.rank]}
                  </div>
                </div>
              )}

              <p className="mt-3 text-body-02">{user.nickname}</p>
              <p className="mt-1 text-caption-02 text-gray-600">
                {user.completedCount}권 읽음
                <span className="inline-block h-1 w-1 mx-1 rounded-full bg-gray-500/20" />
                {user.readingDays}일 기록
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TopReadingRanking;
