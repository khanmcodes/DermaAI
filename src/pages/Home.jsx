import React from "react";
import heroImg from "../assets/Images/heroImg.png";
import heroImg2 from "../assets/Images/heroimg2.png";
import skinDermatologyBg from "../assets/Images/skin-dermatology-bg.jpg";
import { NavLink } from "react-router-dom";
import { FiUpload, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { RiAiGenerate } from "react-icons/ri";
import { MdOutlineSpeed, MdOutlineVerified } from "react-icons/md";
import Stepper, { Step } from "../components/Stepper/Stepper";
import DiseasesWeDetect from "../components/DiseasesWeDetect/DiseasesWeDetect";

export default function Home() {
  return (
    <>
      <div className="hero-section">
        <div className="hero-background">
          <img src={skinDermatologyBg} alt="Dermatology and Skin Health" className="hero-bg-image" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-container">
            <div className="hero-text-content">
              <div className="hero-badge">
                <RiAiGenerate className="badge-icon" />
                <span>AI-Powered Dermatology</span>
              </div>
              
              <h1 className="hero-title">
                Revolutionizing <span className="gradient-text">Skin Health</span> with Advanced AI
              </h1>
              
              <p className="hero-description">
                Get instant, accurate skin disease detection powered by cutting-edge artificial intelligence. 
                Our advanced system analyzes your skin images with medical-grade precision, delivering 
                <span className="highlight"> faster</span>, <span className="highlight">smarter</span>, and 
                <span className="highlight"> more reliable</span> diagnostics—anytime, anywhere.
              </p>

              <div className="hero-features">
                <div className="feature-item">
                  <MdOutlineSpeed className="feature-icon" />
                  <span>Instant Results</span>
                </div>
                <div className="feature-item">
                  <MdOutlineVerified className="feature-icon" />
                  <span>Medical Grade AI</span>
                </div>
                <div className="feature-item">
                  <FiCheckCircle className="feature-icon" />
                  <span>95% Accuracy</span>
                </div>
              </div>

              <div className="hero-cta">
                <NavLink to="/Diagnose" className="cta-primary">
                  <button className="btn-hero-primary">
                    <FiUpload className="btn-icon" />
                    Start Diagnosis
                    <FiArrowRight className="btn-arrow" />
                  </button>
                </NavLink>
                <button className="btn-hero-secondary">
                  <span>Learn More</span>
                </button>
              </div>
            </div>

            <div className="hero-image-content">
              <div className="hero-image-container">
                <div className="floating-card card-1">
                  <div className="card-content">
                    <div className="card-icon">🔬</div>
                    <div className="card-text">
                      <h4>AI Analysis</h4>
                      <p>Advanced detection</p>
                    </div>
                  </div>
                </div>
                
                <div className="floating-card card-2">
                  <div className="card-content">
                    <div className="card-icon">⚡</div>
                    <div className="card-text">
                      <h4>Instant Results</h4>
                      <p>Get diagnosis in seconds</p>
                    </div>
                  </div>
                </div>
                
                <div className="floating-card card-3">
                  <div className="card-content">
                    <div className="card-icon">🎯</div>
                    <div className="card-text">
                      <h4>95% Accuracy</h4>
                      <p>Medical-grade precision</p>
                    </div>
                  </div>
                </div>

                <div className="main-hero-image">
                  <img src={heroImg} alt="Skin Analysis" className="hero-main-img" />
                  <div className="image-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="howitworks-section">
        <h1 className="hiwH1" id="How-It-Works-ID">
          How To Diagnose
        </h1>
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
        <DiseasesWeDetect />
      </div>
    </>
  );
}
