import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, Booklog, My_library, My_page, Search } from "../assets/icons";
import PlusImg from "../assets/icons/plus.svg";

function NavbarBottom() {
  const navigate = useNavigate();
  const location = useLocation();

  const isBooklogActive = location.pathname.startsWith("/booklog");

  const baseItem =
    "flex items-center justify-center h-12 rounded-full transition-colors flex-none";

  return (
    <div className="fixed bottom-0 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 items-center justify-between px-5 pb-6">
      <nav className="flex h-14 items-center justify-center gap-2 rounded-full bg-black px-1 py-1">
        {/* 홈 */}
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseItem} ${isActive ? "bg-[#242424] px-4" : "pl-4 pr-1"}`
          }
        >
          {({ isActive }) => (
            <div
              className={`flex items-center ${
                isActive ? "text-white" : "text-gray-800"
              }`}
            >
              <HomeIcon className="w-6 h-6" />
              {isActive && <span className="text-[11px] ml-2">홈</span>}
            </div>
          )}
        </NavLink>

        {/* 북로그 */}
        <button
          type="button"
          onClick={() => navigate("/booklog")}
          aria-current={isBooklogActive ? "page" : undefined}
          className={`${baseItem} ${
            isBooklogActive ? "bg-[#242424] px-4" : "px-2"
          }`}
        >
          <div
            className={`flex items-center ${
              isBooklogActive ? "text-white" : "text-gray-800"
            }`}
          >
            <Booklog className="w-6 h-6" />
            {isBooklogActive && (
              <span className="text-[11px] ml-2">북로그</span>
            )}
          </div>
        </button>

        {/* 서재 */}
        <NavLink
          to="/mylibrary"
          className={({ isActive }) =>
            `${baseItem} ${isActive ? "bg-[#242424] px-4" : "px-2"}`
          }
        >
          {({ isActive }) => (
            <div
              className={`flex items-center ${
                isActive ? "text-white" : "text-gray-800"
              }`}
            >
              <My_library className="w-6 h-6" />
              {isActive && <span className="text-[11px] ml-2">서재</span>}
            </div>
          )}
        </NavLink>

        {/* 마이 */}
        <NavLink
          to="/mypage"
          className={({ isActive }) =>
            `${baseItem} ${
              isActive ? "bg-[#242424] pl-4 pr-2.5" : "pl-1 pr-4"
            }`
          }
        >
          {({ isActive }) => (
            <div
              className={`flex items-center ${
                isActive ? "text-white" : "text-gray-800"
              }`}
            >
              {isActive && <span className="text-[11px] mr-1">마이</span>}
              <My_page className="w-6 h-6" />
            </div>
          )}
        </NavLink>
      </nav>

      {/* ✅ 우측 버튼: 북로그면 plus / 아니면 검색 */}
      {isBooklogActive ? (
        <button
          type="button"
          onClick={() => {
            console.log("북로그 글 작성");
          }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-black"
          aria-label="북로그 작성"
        >
          <img src={PlusImg} alt="" className="h-6 w-6 invert" draggable={false} />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => navigate("/search")}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white"
          aria-label="검색"
        >
          <Search className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default NavbarBottom;
