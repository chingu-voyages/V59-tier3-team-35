import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ReviewPage from "./pages/ReviewPage";
import RolesPage from "./pages/RolesPage";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <div className="bg-background text-accent-secondary flex min-h-screen flex-col justify-between font-[Outfit]">
      <Header />
      <main className="flex flex-auto flex-col">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
