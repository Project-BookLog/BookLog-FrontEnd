import { Dummy_author, Share } from "../../assets/icons";
import type { User } from "../../types/user.types"

type UserInfoCardProps = {
  user: User;
};

function UserInfoCard({ user }: UserInfoCardProps) {
  return (
    <div className="bg-bg">
      <main>
        {/* 유저 기본 정보 */}
        <section>
          <div className="flex justify-start">
            <Dummy_author className="h-18 w-18" />
            <div className="ml-4 h-18 flex flex-col justify-center gap-1">
              <div className="text-en-title-02">{user.name}</div>
              <div className="text-en-caption-02 text-gray-600">
                {user.email}
              </div>
              <div className="text-en-caption-02 text-gray-900 flex items-center">
                팔로워 {user.followerCount}
                <span className="mx-2 inline-block h-[4px] w-[4px] rounded-full bg-gray-300" />
                팔로잉 {user.followingCount}
              </div>
            </div>
          </div>
        </section>

        {/* 갯수 */}
        <section className="my-5">
          <div className="flex items-stretch justify-center gap-9">
            <div className="flex flex-col items-center gap-2">
              <div className="text-caption-02 text-gray-700">독서완독</div>
              <div className="text-title-02 text-black">
                {user.finishedCount}
              </div>
            </div>
            <div className="h-10 w-[1px] bg-gray-100" />

            <div className="flex flex-col items-center gap-2">
              <div className="text-caption-02 text-gray-700">나의 북로그</div>
              <div className="text-title-02 text-black">
                {user.booklogCount}
              </div>
            </div>
            <div className="h-10 w-[1px] bg-gray-100" />

            <div className="flex flex-col items-center gap-2">
              <div className="text-caption-02 text-gray-700">북마크</div>
              <div className="text-title-02 text-black">
                {user.bookmarkCount}
              </div>
            </div>
          </div>
        </section>

        {/* 버튼 */}
        <section>
          <div className="flex gap-2">
            <button className="h-11 w-71 rounded-lg bg-gray-200 text-subtitle-02-sb text-gray-900">
              프로필편집
            </button>
            <button className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-200">
              <Share className="h-6 w-6 text-black" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserInfoCard;
