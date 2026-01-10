import { Routes, Route } from "react-router-dom";
import MobileLayout from "./layout/MobileLayout";
import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <MobileLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </MobileLayout>
  );
}

export default App;
