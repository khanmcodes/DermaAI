import React from "react";
import heroImg from "../assets/Images/heroImg.png";
import heroImg2 from "../assets/Images/heroimg2.png";
import { NavLink } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import Stepper, { Step } from "../components/Stepper/Stepper";
import DiseasesWeDetect from "../components/DiseasesWeDetect/DiseasesWeDetect";

export default function Home() {
  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <div className="heroR">
            <div className="heroImg">
              <img className="img2" src={heroImg} alt="" />
            </div>
          </div>
          <div className="heroL">
            <div className="mobHeroImg">
              <img src={heroImg} alt="" />
            </div>
            <h1 className="heroH1">Revolutionizing Skin Health with AI</h1>
            <p className="heroP">
              Accurately detect and classify skin diseases in seconds with
              AI-powered analysis. Get{" "}
              <span style={{ color: "var(--pinkD)", fontWeight: "600" }}>
                faster
              </span>
              ,{" "}
              <span style={{ color: "var(--pinkD)", fontWeight: "600" }}>
                smarter
              </span>
              , and more{" "}
              <span style={{ color: "var(--pinkD)", fontWeight: "600" }}>
                reliable
              </span>{" "}
              skin diagnostics—anytime, anywhere.
            </p>
            <NavLink to="/Diagnose">
              <button className="btn-gradient">
                <FiUpload /> Upload Now
              </button>
            </NavLink>
          </div>
        </div>
        <div className="hero-transImg">
          <img src={heroImg2} alt="" />
        </div>
      </div>

      <div className="howitworks-section" id="How-It-Works-ID">
        <h1 className="hiwH1">How To Diagnose</h1>
        <div className="hiw-stepper">
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={() => console.log("All steps completed!")}
            backButtonText="Previous"
            nextButtonText="Next"
          >
            <Step>
              <h2>Step 1</h2>

              <h1>🤳🏽Upload Your Skin Image</h1>
              <p>Simply take or upload a photo of the affected area.</p>
            </Step>
            <Step>
              <h2>Step 2</h2>
              <h1>🧪 AI Analyzes Your Skin</h1>
              <p>
                Our advanced AI model examines skin patterns and compares them
                with a vast medical dataset.
              </p>
            </Step>
            <Step>
              <h2>Step 3</h2>
              <h1>💯 Get Instant Results</h1>
              <p>
                Receive a detailed diagnosis, confidence score, and next steps
                for treatment.
              </p>
            </Step>
            <Step>
              <h2>Final Step</h2>
              <h1>👨🏽‍🔬 Consult a Dermatologist</h1>
              <p>Connect with healthcare professionals for expert advice.</p>
            </Step>
          </Stepper>
        </div>
      </div>

      <div className="dwd-section">
      <h1 className="dwdH1">Diseases We Detect</h1>
        <DiseasesWeDetect/>
      </div>
    </div>
  );
}
