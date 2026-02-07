import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import SummaryPage from "./pages/SummaryPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </>
  );
}

export default App;
