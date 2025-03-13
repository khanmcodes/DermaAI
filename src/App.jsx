import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Diagnose from "./pages/Diagnose";
import Aboutus from "./pages/Aboutus";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}


function App() {
  return (
    <Router>
    <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Diagnose" element={<Diagnose />} />
        {/* <Route path="/How-It-Works" element={<HowItWorks />} /> */}
        <Route path="/About-us" element={<Aboutus />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
