import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import { FilterProvider } from "./context/FilterContext";

import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SplashPage } from "./pages/SplashPage";
import SearchPage from "./pages/home/SearchPage";
import SearchFilterPage from "./pages/home/SearchFilterPage";


import { MyLibraryPage } from "./pages/MyLibrary/MyLibraryPage";
import { libraries } from "./data/myLibrary.mock";
import { MyLibraryDetail } from "./pages/MyLibrary/MyLibraryDetailPage";
import { EditBooksPage } from "./pages/MyLibrary/EditBooksPage";

import BooklogPage from "./pages/BooklogPage";
import BooklogDetailPage from "./pages/BooklogDetailPage";
import UserProfilePage from "./pages/UserProfilePage";

import BookDetail from "./pages/detail/BookDetail";
import OnboardingPage from "./pages/onboarding/OnBoardingPage";

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
        <Route path="/search" element={<FilterProvider><SearchPage /></FilterProvider>} />
        <Route path="/search/filter" element={<FilterProvider><SearchFilterPage /></FilterProvider>} />

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
