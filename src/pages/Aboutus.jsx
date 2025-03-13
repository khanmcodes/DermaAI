import React from "react";
import "./styles/Aboutus.css";
import aboutbg from "../assets/Images/aboutbg.jpg";
import member1 from "../assets/Images/team-members/mariam.jpg";
import member2 from "../assets/Images/team-members/rameesa.jpg";
import member3 from "../assets/Images/team-members/ushna.jpg";
import { FaReact } from "react-icons/fa";
import { TbBrandVite } from "react-icons/tb";
import { SiFlask, SiFastapi } from "react-icons/si";

export default function Aboutus() {
  return (
    <div className="about-container">
      <div className="about-bg">
        <img src={aboutbg} alt="About DermaAI" />
        <div className="overlay">
          <h1 className="about-name">
            S<span>A</span>F
          </h1>
          <p className="about-heading">
            Revolutionizing Skin Disease Detection
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="about-content">
        <div className="about-text">
          <h2>About</h2>
          <p>
            <strong style={{ color: "var(--pinkL)" }}>SAF</strong> - Skin Advise Fusion is an
            AI-powered tool designed to assist in{" "}
            <strong>skin disease detection</strong>. Our platform leverages{" "}
            <strong>machine learning</strong> to provide fast, accessible, and{" "}
            <strong>highly accurate</strong> diagnoses of various skin
            conditions, helping individuals and healthcare professionals make
            informed decisions.
          </p>
        </div>

        <div className="about-text">
          <h2>How We Built It</h2>
          <p>
            Our system uses <strong>deep learning models</strong> trained on a
            large dataset of dermatological images. The frontend is developed
            with <strong>React & Vite</strong>, while the backend runs on{" "}
            <strong>Flask/FastAPI</strong>, integrating AI inference for
            accurate skin disease classification.
          </p>
          <div className="hwbi-icons">
            <FaReact />
            <TbBrandVite />
            <SiFlask />
            <SiFastapi />
          </div>
        </div>

        <div className="team-section">
          <h1 className="about-name" style={{ marginBottom: "30px" }}>
          S<span>A</span>F
          <span>Team</span>
          </h1>
          <h2>Creators</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={member1} alt="Team Member 1" />
              <p>Member Name 1</p>
            </div>
            <div className="team-member">
              <img src={member2} alt="Team Member 2" />
              <p>Member Name 2</p>
            </div>
            <div className="team-member">
              <img src={member3} alt="Team Member 3" />
              <p>Member Name 3</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Supervisor</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={member1} alt="Team Member 1" />
              <p>Member Name 1</p>
              <p>Lecturer | IBET LUMHS </p>
            </div>
            <div className="team-member">
              <img src={member2} alt="Team Member 2" />
              <p>Member Name 2</p>
              <p>Lecturer | IBET LUMHS </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
