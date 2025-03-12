import React from "react";
import "./styles/Aboutus.css";
import aboutbg from "../assets/Images/aboutbg.jpg";
import member1 from "../assets/Images/team-members/mariam.jpg";
import member2 from "../assets/Images/team-members/rameesa.jpg";
import member3 from "../assets/Images/team-members/ushna.jpg";
import { FaReact } from "react-icons/fa";
import { TbBrandVite } from "react-icons/tb";
import { SiFlask } from "react-icons/si";
import { SiFastapi } from "react-icons/si";

export default function Aboutus() {
  return (
    <div className="about-container">
      <div className="about-bg">
        <img src={aboutbg} alt="" />
      </div>
      <div className="about-content">
        <p className="about-heading">About</p>
        <h1 className="about-name">
          Pneu
          <br />
          Scan
        </h1>
        <p className="about-description">
          Pneu Scan is an AI-powered tool designed to assist in{" "}
          <strong>pneumonia detection</strong> from chest X-rays. We built this
          platform to provide a <strong>quick, accessible, and reliable</strong>{" "}
          solution for early detection of pneumonia, helping doctors and
          patients make informed decisions faster.
        </p>

        <h2>How We Built It</h2>
        <p className="about-description" style={{ marginBottom: "10px" }}>
          Our system uses <strong>deep learning models</strong> trained on
          medical X-ray datasets. The frontend is developed with{" "}
          <strong>React & Vite</strong>, while the backend runs on{" "}
          <strong>Flask/FastAPI</strong>, integrating AI inference for accurate
          predictions.
        </p>
        <div className="hwbi-icons">
          <FaReact />
          <TbBrandVite />
          <SiFlask />
          <SiFastapi />
        </div>

        <h2>Meet the Creators</h2>

        <div className="team">
          <div className="team-member">
            <img src={member2} alt="" />
            Rameesa Halepoto
          </div>

          <div className="team-member">
            <img src={member1} alt="" />
            Mariam Ashfaque
          </div>

          <div className="team-member">
            <img src={member3} alt="" />
            Ushna Sehar
          </div>
        </div>

        <p className="about-description">
          We, students of LUMHS University, passionate about technology and
          healthcare. This project was developed as part of our coursework,
          aiming to bring <strong>innovation into medical diagnostics</strong>.
        </p>
      </div>
    </div>
  );
}
