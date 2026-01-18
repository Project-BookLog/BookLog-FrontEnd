import { Fragment } from "react";
import { userRanking } from "../../data/usersRanking.mock";
import type { usersRanking } from "../../data/usersRanking.mock";

const ReadingRankingList = () => {
  const users = userRanking.slice(3);

  return (
    <section className="mt-5">
      <ul className="space-y-5">
        {users.map((user: usersRanking) => (
          <Fragment key={user.name}>
            <li className="flex h-15 pb-5 items-center gap-x-3 border-b-1 border-gray-100">
              <div className="text-subtitle-01-m text-gray-700 px-1">{user.rank}</div>
              
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-caption-01 text-gray-600">img</span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-subtitle-02-sb text-black truncate">{user.name}</p>
                <p className="mt-0.5 text-caption-02 text-gray-600">
                  {user.books}권 읽음 
                  <span className="inline-block w-1 h-1 mx-1 bg-gray-500/20 rounded-full align-middle" />
                  {user.days}일 기록
                </p>
              </div>
            </li>
          </Fragment>
        ))}
      </ul>
    </section>
  );
};

export default ReadingRankingList;