import { Setting } from "../../assets/icons";
import { mockUser } from "../../data/user.mock";
import UserInfoCard from "../../components/mypage/UserInfoCard";
import ReadingStatus from "../../components/mypage/ReadingStatus";
import ReadingRanking from "../../components/mypage/ReadingRanking";
import ReadingCalendar from "../../components/mypage/ReadingCalendar";
import NavbarBottom from "../../components/common/navbar/NavBarBottom";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  const handleSettingClick = () => {
    navigate("/setting");
  };

  return (
    <div className="min-h-screen bg-bg">
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col">
        <header className="mt-4 px-5 flex h-15 items-center justify-between">
          <p className="text-head">마이페이지</p>
          <button
            onClick={handleSettingClick}
            className="p-1 hover:opacity-70 transition-opacity"
            aria-label="설정"
          >
            <Setting className="h-6 w-6 text-black" />
          </button>
        </header>

        <section className=" px-5">
          <UserInfoCard user={mockUser} />
        </section>

        <div className="mt-8 h-2 w-full bg-gray-100" />

        <section className="px-5 mt-8">
          <ReadingStatus />
        </section>
        
        <section className="px-5 mt-8">
          <ReadingRanking />
        </section>

        <section className="px-5 mt-8 mb-28">
          <ReadingCalendar />
        </section>

        <NavbarBottom />

      </main>
    </div>
  );
}

export default MyPage;
