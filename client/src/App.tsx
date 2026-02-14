import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <div className="bg-background text-accent-secondary flex min-h-screen flex-col justify-between font-[Outfit]">
      <Header />
      <main className="flex flex-auto flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
