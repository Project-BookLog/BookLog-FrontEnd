import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SplashPage } from "./pages/SplashPage";
import SearchPage from "./pages/SearchPage";
import { MyLibraryPage } from "./pages/myLibrary/MyLibraryPage";
import { libraries } from "./data/myLibrary.mock";
import { MyLibraryDetail } from "./pages/myLibrary/MyLibraryDetailPage";
import BooklogPage from "./pages/BooklogPage";
import BooklogDetailPage from "./pages/BooklogDetailPage";
import BookDetail from "./pages/detail/BookDetail";
import OnboardingPage from "./pages/onboarding/OnBoardingPage";

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/* <Route path="/book/:bookId" element={<BookDetail />} /> */}
        <Route path="/bookdetail" element={<BookDetail />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/mylibrary" element={<MyLibraryPage libraries={libraries}/>}/>
        <Route path="/my-library/:libraryName" element={<MyLibraryDetail libraries={libraries}/>} />
        <Route path="/booklog" element={<BooklogPage />} />
        <Route path="/booklog/:booklogId" element={<BooklogDetailPage />} />

      </Routes>
    </MobileLayout>
  );
}

export default App;
