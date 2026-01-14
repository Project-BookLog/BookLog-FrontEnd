import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";

import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SplashPage } from "./pages/SplashPage";
import SearchPage from "./pages/SearchPage";
import BooklogPage from "./pages/BooklogPage";
import BooklogDetailPage from "./pages/BooklogDetailPage";
import UserProfilePage from "./pages/UserProfilePage"; 

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/booklog" element={<BooklogPage />} />
        <Route path="/booklog/:booklogId" element={<BooklogDetailPage />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
      </Routes>
    </MobileLayout>
  );
}

export default App;
