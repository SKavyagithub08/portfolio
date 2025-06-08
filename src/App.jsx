import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroOverlay from "./IntroOverlay";
import LandingSection from "./LandingSection";
import ProjectsPage from "./ProjectsPage";
import AboutPage from "./AboutPage";
import SkillsPage from "./SkillsPage";
import ContactPage from "./ContactPage";
import Navbar from "./Navbar";

// Wrap all routes in <Router> so useNavigate works everywhere
export default function App() {
  const [showMain, setShowMain] = useState(false);

  return (
    <Router>
      {!showMain && <IntroOverlay onFinish={() => setShowMain(true)} />}
      {showMain && (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingSection />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            {/* Ensure this route exists */}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </>
      )}
    </Router>
  );
}