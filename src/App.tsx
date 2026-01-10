import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SplashPage } from "./pages/SplashPage";
import SearchPage from "./pages/SearchPage";
import { TestPage } from "./pages/TestPage";

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/toast" element={<TestPage/>}/>
      </Routes>
    </MobileLayout>
  );
}

export default App;
