import { Setting } from "../../assets/icons";
import UserInfoCard from "../../components/mypage/UserInfoCard";
import { mockUser } from "../../data/user.mock";

function MyPage() {
  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-y-3">
        <header className="mt-4 px-6 flex h-15 items-center justify-between">
          <p className="text-head">마이페이지</p>
          <Setting className="h-6 w-6 text-black" />
        </header>

        <section className=" px-6">
          <UserInfoCard user={mockUser} />
        </section>

        <div className="mt-5 h-2 w-full bg-gray-100" />
      </main>
    </div>
  );
}

export default MyPage;
