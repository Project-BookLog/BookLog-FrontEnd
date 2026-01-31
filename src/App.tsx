import { Routes, Route, Outlet } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import { useToast } from "./context/ToastContext";
import { Toast } from "./components/common/Toast";

// provider
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";

// 0. 온보딩 & common
import { LoginPage } from "./pages/onboarding/LoginPage";
import { SplashPage } from "./pages/onboarding/SplashPage";
import OnboardingPage from "./pages/onboarding/OnBoardingPage";
import FilterPage from "./components/common/FilterPage";

// 1. 홈
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/home/SearchPage";
import BookDetailPage from "./pages/home/BookDetailPage";
import AuthorDetailPage from "./pages/home/AuthorDetailPage";

// 2. 북로그
import BooklogPage from "./pages/booklog/BooklogPage";
import BooklogDetailPage from "./pages/booklog/BooklogDetailPage";
import BooklogFilterPage from "./pages/booklog/BooklogFilterPage";
import BookPickPage from "./pages/booklog/BookPickPage";
import BookWritePage from "./pages/booklog/BookWritePage";

// 3. 서재
import { MyLibraryPage } from "./pages/myLibrary/MyLibraryPage";
import { MyLibraryDetailPage } from "./pages/myLibrary/MyLibraryDetailPage";
import { EditBooksPage } from "./pages/myLibrary/EditBooksPage";
import AddLibraryPage from "./pages/myLibrary/AddLibraryPage";
import EditPage from "./pages/myLibrary/EditPage";
import RecordPage from "./pages/myLibrary/RecordPage";
import StoppedBooksPage from "./pages/myLibrary/StoppedBooksPage";

// 4. 마이페이지
import MyPage from "./pages/mypage/MyPage";
import EditProfile from "./pages/mypage/EditProfile";
import Setting from "./pages/mypage/Setting";
import ReadingCalendarPage from "./pages/mypage/ReadingCalenderPage";
import ReadingRankingPage from "./pages/mypage/ReadingRankingPage";
import UserProfilePage from "./pages/mypage/UserProfilePage";
import { KakaoLoginRedirectPage } from "./pages/KakaoLoginRedirectPage";

function GlobalToast() {
  const { message } = useToast();
  return message ? <Toast message={message} /> : null;
}

function App() {
  return (
    <MobileLayout>
      <Routes>
        {/* 0. 온보딩 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/oauth/callback" element={<KakaoLoginRedirectPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* 1. 홈 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookid" element={<BookDetailPage />} />

        {/* 필터 사용 라우트들에만 Provider 적용 */}
        <Route
          element={
            <SearchProvider>
              <FilterProvider>
                <Outlet />
              </FilterProvider>
            </SearchProvider>
          }
        >
          {/* 1. 홈 */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/filter" element={<FilterPage scope="search" />} />
          <Route path="/author/:authorid/filter" element={<FilterPage scope="author" />} />
          <Route path="/author/:authorid" element={<AuthorDetailPage />} />

          {/* 2. 북로그 */}
          <Route path="/booklog" element={<BooklogPage />} />
          <Route path="/booklog/pick" element={<BookPickPage />} />
          <Route path="/booklog/filter" element={<BooklogFilterPage />} />
          <Route path="/booklog/:booklogId" element={<BooklogDetailPage />} />
        </Route>

        {/* 북로그 글쓰기 전용 필터 Provider */}
        <Route
          element={
            <FilterProvider>
              <Outlet />
            </FilterProvider>
          }
        >
          <Route path="/booklog/write" element={<BookWritePage />} />
          <Route path="/booklog/write/filter" element={<BooklogFilterPage />} />
        </Route>

        {/* 3. 서재 */}
        <Route path="/my-library" element={<MyLibraryPage/>} />
        <Route path="/my-library/:shelfId" element={<MyLibraryDetailPage />} />
        <Route
          path="/my-library/:shelfId/edit-books"
          element={<EditBooksPage />}
        />
        <Route path="/my-library/add" element={<AddLibraryPage />} />
        <Route path="/my-library/:shelfId/edit-library" element={<EditPage />} />
        <Route path="/my-library/record/:bookId" element={<RecordPage />} />
        <Route
          path="/my-library/stopped/:shelfId"
          element={<StoppedBooksPage />}
        />

        {/* 4. 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/editprofile" element={<EditProfile />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/mypage/readingcalendar" element={<ReadingCalendarPage />} />
        <Route path="/mypage/readingranking" element={<ReadingRankingPage />} />
      </Routes>

      <GlobalToast />
    </MobileLayout>
  );
}

export default App;
