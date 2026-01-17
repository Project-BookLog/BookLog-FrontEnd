import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import { Outlet } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";

// 온보딩
import { LoginPage } from "./pages/LoginPage";
import { SplashPage } from "./pages/SplashPage";
import OnboardingPage from "./pages/onboarding/OnBoardingPage";

// 홈
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/home/SearchPage";
import SearchFilterPage from "./pages/home/SearchFilterPage";
import BookDetail from "./pages/detail/BookDetail";

//북로그
import BooklogPage from "./pages/BooklogPage";
import BooklogDetailPage from "./pages/BooklogDetailPage";
import UserProfilePage from "./pages/UserProfilePage";

//서재
import { MyLibraryPage } from "./pages/MyLibrary/MyLibraryPage";
import { libraries } from "./data/myLibrary.mock";
import { MyLibraryDetail } from "./pages/MyLibrary/MyLibraryDetailPage";
import { EditBooksPage } from "./pages/MyLibrary/EditBooksPage";

// 마이페이지
import MyPage from "./pages/mypage/MyPage";
import EditProfile from "./pages/mypage/EditProfile";


import { useToast } from "./context/ToastContext";
import { Toast } from "./components/toast/Toast";

function GlobalToast() {
  const { message } = useToast();
  return message ? <Toast message={message} /> : null;
}

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route element={<FilterProvider><Outlet /></FilterProvider>}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/filter" element={<SearchFilterPage />} />
        </Route>
        {/* main */}
        <Route path="/bookdetail" element={<BookDetail />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/my-library" element={<MyLibraryPage libraries={libraries} />} />
        <Route
          path="/my-library/:libraryName"
          element={<MyLibraryDetail libraries={libraries} />}
        />
        <Route
          path="/my-library/:libraryName/edit-books"
          element={<EditBooksPage libraries={libraries} />}
        />

        <Route path="/mypage" element={<MyPage />} />
        <Route path="/editprofile" element={<EditProfile />} />

        {/* 공통 + #40 추가 */}
        <Route path="/booklog" element={<BooklogPage />} />
        <Route path="/booklog/:booklogId" element={<BooklogDetailPage />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
      </Routes>

      <GlobalToast />
    </MobileLayout>
  );
}

export default App;
