import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <div className="bg-background flex min-h-screen flex-col justify-between">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
