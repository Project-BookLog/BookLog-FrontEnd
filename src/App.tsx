import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SplashPage } from "./pages/SplashPage";
import SearchPage from "./pages/SearchPage";
import OnboardingPage from "./pages/onboarding/OnBoardingPage";

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/onboarding" element={<OnboardingPage/>}/>
      </Routes>
    </MobileLayout>
  );
}

export default App;
