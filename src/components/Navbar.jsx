import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        scroller.scrollTo(id, {
          smooth: true,
          duration: 500,
          offset: -50,
        });
      }, 100);
    } else {
      scroller.scrollTo(id, {
        smooth: true,
        duration: 500,
        offset: -50,
      });
    }
  };

  return (
    <>
      {/* Blur Background */}
      <div
        className={`blur-background ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <div className="navbar-container">
        <nav className="navbar">
          <NavLink to="/">
            <div className="logo">
              <div className="logoTitle">
                derma<span>ai</span>
              </div>
            </div>
          </NavLink>
          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span style={{ marginTop: 0 }}></span>
            <span></span>
            <span></span>
          </div>
          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li>
              <NavLink to="/" end onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Diagnose" onClick={() => setMenuOpen(false)}>
                Diagnose
              </NavLink>
            </li>
            <li>
              <p onClick={() => handleScroll("How-It-Works-ID")}>
                How To Diagnose
              </p>
            </li>
            <li>
              <NavLink to="/About-us" onClick={() => setMenuOpen(false)}>
                About us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
