import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SplashPage } from "./pages/SplashPage";
import SearchPage from "./pages/SearchPage";
import { MyLibraryPage } from "./pages/MyLibrary/MyLibraryPage";
import { libraries } from "./data/myLibrary.mock";
import { MyLibraryDetail } from "./pages/MyLibrary/MyLibraryDetailPage";

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/mylibrary" element={<MyLibraryPage libraries={libraries}/>}/>
        <Route path="/my-library/:libraryName" element={<MyLibraryDetail libraries={libraries}/>} />
      </Routes>
    </MobileLayout>
  );
}

export default App;
