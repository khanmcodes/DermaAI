import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { scroller } from "react-scroll";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false }); // Navigate to home first
      setTimeout(() => {
        scroller.scrollTo(id, {
          smooth: true,
          duration: 500,
          offset: -50,
        });
      }, 100); // Delay to allow page load
    } else {
      scroller.scrollTo(id, {
        smooth: true,
        duration: 500,
        offset: -50,
      });
    }
  };

  return (
    <div className="footer">
      <div className="topFoot">
        <div className="leftFoot">
          <div className="footLogo">
            <div className="logoTitle">
              derma<span>ai</span>
            </div>
          </div>
          <p className="subtitle">Because Your Skin Deserves the Best.</p>
          <div className="mailBox">
            <MdOutlineEmail className="footerIcon" />
            <p className="email">dermaai@gmail.com</p>
          </div>
        </div>
        <div className="rightFoot">
          <div className="links-container">
            <div>
              <NavLink to="/" end>
                Home
              </NavLink>
              <NavLink to="/Diagnose">Diagnose</NavLink>
            </div>
            <div>
              <p onClick={() => handleScroll("How-It-Works-ID")}>
                How It Works
              </p>
              <NavLink to="/About-us">About us</NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="bottomFoot">
        <div className="gradLine"></div>
        <div className="foot-content" style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <p className="foot-content-left">
            <span>Disclaimer: </span>This tool is for informational purposes only
            and not a substitute for professional medical advice.
          </p>
          <p>
            Produced by{" "}
            <a
              href="https://www.hyperlogic.studio"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--pinkL)" }}
            >
              Hyperlogic
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
