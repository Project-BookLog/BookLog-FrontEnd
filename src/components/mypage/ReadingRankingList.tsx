import { useEffect, useState } from "react";
import { getReadingRankingList } from "../../api/mypage/readingRanking";
import type { ReadingUser } from "../../types/myPage/readingRanking.types";

interface Props {
  month: string;
}

const ReadingRankingList = ({ month }: Props) => {
  const [users, setUsers] = useState<ReadingUser[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);


 const load = async (cursorValue?: number | null, reset = false) => {
   if (loading) return;

   setLoading(true);
   try {
     const res = await getReadingRankingList(month, cursorValue ?? undefined);
     setUsers((prev) => (reset ? res.items : [...prev, ...res.items]));
     setCursor(res.nextCursor);
     setHasNext(res.hasNext);
   } catch {
     setHasNext(false);
   } finally {
     setLoading(false);
   }
  };

  useEffect(() => {
   setUsers([]);
   setCursor(null);
   setHasNext(true);
   load(null, true);
  }, [month]);

  if (users.length === 0 && !loading) {
    return null; 
  }

  return (
    <section className="mt-5">
      <ul className="space-y-5">
        {users.map((user) => (
          <li
            key={user.userId}
            className="flex h-15 pb-5 items-center gap-x-3 border-b border-gray-100"
          >
            <div className="text-subtitle-01-m text-gray-700 px-1">
              {user.rank}
            </div>

            <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={user.nickname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-caption-01 text-gray-600">img</span>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-subtitle-02-sb truncate">
                {user.nickname}
              </p>
              <p className="mt-0.5 text-caption-02 text-gray-600">
                {user.completedCount}권 읽음
                <span className="inline-block w-1 h-1 mx-1 bg-gray-500/20 rounded-full" />
                {user.readingDays}일 기록
              </p>
            </div>
          </li>
        ))}
      </ul>

      {hasNext && (
        <button
          onClick={() => load()}
          className="w-full py-4 text-caption-02 text-gray-500"
        >
          {loading ? "불러오는 중..." : "더 보기"}
        </button>
      )}
    </section>
  );
};

export default ReadingRankingList;
