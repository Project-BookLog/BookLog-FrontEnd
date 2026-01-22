import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import { Outlet } from "react-router-dom";
import { FilterProvider } from "./context/FilterContext";
import { useToast } from "./context/ToastContext";
import { Toast } from "./components/common/Toast";

// 0. 온보딩
import { LoginPage } from "./pages/onboarding/LoginPage";
import { SplashPage } from "./pages/onboarding/SplashPage";
import OnboardingPage from "./pages/onboarding/OnBoardingPage";

// 1. 홈
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/home/SearchPage";
import SearchFilterPage from "./pages/home/SearchFilterPage";
import BookDetail from "./pages/home/BookDetail";

// 2. 북로그
import BooklogPage from "./pages/booklog/BooklogPage";
import BooklogDetailPage from "./pages/booklog/BooklogDetailPage";
import UserProfilePage from "./pages/mypage/UserProfilePage";
import BooklogFilterPage from "./pages/booklog/BooklogFilterPage";


// 3. 서재
import { MyLibraryPage } from "./pages/MyLibrary/MyLibraryPage";
import { libraries } from "./data/myLibrary.mock";
import { MyLibraryDetail } from "./pages/MyLibrary/MyLibraryDetailPage";
import { EditBooksPage } from "./pages/MyLibrary/EditBooksPage";
import AddLibraryPage from "./pages/MyLibrary/AddLibraryPage";
import EditPage from "./pages/MyLibrary/EditPage";

// 4. 마이페이지
import MyPage from "./pages/mypage/MyPage";
import EditProfile from "./pages/mypage/EditProfile";
import Setting from "./pages/mypage/Setting";
import ReadingCalendarPage from "./pages/mypage/ReadingCalenderPage";
import ReadingRankingPage from "./pages/mypage/ReadingRankingPage";
import { FinishedBooksPage } from "./pages/mypage/FinishedBooksPage";


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
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* 1. 홈 */}
        <Route path="/" element={<HomePage />} />
        <Route element={<FilterProvider><Outlet /></FilterProvider>}>
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/filter" element={<SearchFilterPage />} />
          <Route path="/booklog" element={<BooklogPage />} />
          <Route path="/booklog/filter" element={<BooklogFilterPage />} />
        </Route>
        <Route path="/bookdetail" element={<BookDetail />} />
        {/* <Route path="/book/:bookId" element={<BookDetail />} /> */}

        {/* 2. 북로그 */}
        <Route path="/booklog/:booklogId" element={<BooklogDetailPage />} />

        {/* 3. 서재 */}
        <Route path="/my-library" element={<MyLibraryPage libraries={libraries}/>}/>
        <Route path="/my-library/:libraryName" element={<MyLibraryDetail libraries={libraries}/>} />
        <Route path="/my-library/:libraryName/edit-books" element={<EditBooksPage libraries={libraries}/>} />
        <Route path="/my-library/add" element={<AddLibraryPage />} />
        <Route path="/my-library/edit" element={<EditPage />} />

        {/* 4. 마이페이지 */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/editprofile" element={<EditProfile />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/mypage/readingcalendar" element={<ReadingCalendarPage />} />
        <Route path="/mypage/readingranking" element={<ReadingRankingPage />} />
        <Route path="/mypage/finished" element={<FinishedBooksPage libraries={libraries}/>} />
        
      </Routes>

      <GlobalToast />
    </MobileLayout>
  );
}

export default App;
