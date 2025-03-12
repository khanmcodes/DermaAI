import React, { useState, useEffect } from "react";
import "./styles/Diagnose.css";
import { FiUpload } from "react-icons/fi";
import { FaDeleteLeft } from "react-icons/fa6";
import { RiBodyScanLine } from "react-icons/ri";
import loadingImg from "../assets/Images/waiting.png";
import { FaPrint } from "react-icons/fa6";
import { MdContentPaste } from "react-icons/md";

export default function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [detailedResult, setDetailedResult] = useState(null);
  const [error, setError] = useState(null);
  const [waitingImgDisplay, setWaitingImgDisplay] = useState("none");
  const [uploadMessage, setUploadMessage] = useState(
    "Drag and drop your file here or click here to upload."
  );

  useEffect(() => {
    const updateMessage = () => {
      if (window.innerWidth <= 768) {
        setUploadMessage("Tap here to upload");
      } else {
        setUploadMessage(
          "Drag and drop your file here or click here to upload."
        );
      }
    };

    updateMessage();
    window.addEventListener("resize", updateMessage);

    return () => {
      window.removeEventListener("resize", updateMessage);
    };
  }, []);

  const handleFileChange = (file) => {
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setDetailedResult(null);
      setError(null);
    }
  };

  const handleInputChange = (event) => {
    handleFileChange(event.target.files[0]);
  };

  const handlePrint = () => {
    if (preview && result) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print X-ray Scan</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
              }
              .print-container {
                border: 2px solid #000;
                padding: 20px;
                max-width: 600px;
                margin: auto;
                background: #fff;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
              }
              .xray-image {
                max-width: 100%;
                height: auto;
                border: 1px solid #ccc;
                margin-bottom: 10px;
              }
              .result {
                font-size: 18px;
                font-weight: bold;
                margin-top: 10px;
              }
              .detailed-result {
                margin-top: 10px;
              }
            </style>
          </head>
          <body>
            <div class="print-container">
              <div class="logo">Pneu Scan</div>
              <img src="${preview}" class="xray-image" alt="X-ray Scan" />
              <div class="result">
                <p><strong>Diagnosis:</strong> ${result.prediction}</p>
                <p><strong>Confidence:</strong> ${result.confidence.toFixed(
                  2
                )}%</p>
              </div>
              ${
                detailedResult && result.prediction === "Pneumonia"
                  ? `<div class="detailed-result">
                      <p><strong>Type:</strong> ${
                        detailedResult.detailed_prediction
                      }</p>
                      <p><strong>Severity:</strong> ${
                        detailedResult.severity
                      }</p>
                      <p><strong>Confidence:</strong> ${detailedResult.confidence.toFixed(
                        2
                      )}%</p>
                     </div>`
                  : ""
              }
            </div>
            <script>
              window.onload = function() {
                window.print();
                setTimeout(() => window.close(), 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handlePasteClick = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith("image/")) {
            const blob = await item.getType(type);
            const file = new File([blob], "pasted-image.png", { type });
            handleFileChange(file);
            return;
          }
        }
      }
      alert("No image found in clipboard!");
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  // Adding event listener to detect paste
  React.useEffect(() => {
    document.addEventListener("paste", handlePasteClick);
    return () => document.removeEventListener("paste", handlePasteClick);
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setDetailedResult(null);
    setError(null);
    document.getElementById("fileInput").value = "";
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    try {
      setScanning(true);
      setError(null);
      setDetailedResult(null);
      setWaitingImgDisplay("flex");

      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const base64Image = reader.result;

          const response = await fetch("http://localhost:5001/predict", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: base64Image }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          setResult(data);

          if (data.prediction === "Pneumonia") {
            setWaitingImgDisplay("none");

            try {
              const detailedResponse = await fetch(
                "http://localhost:5002/predict_detailed",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ image: base64Image }),
                }
              );

              if (!detailedResponse.ok) {
                throw new Error(
                  `HTTP error! Status: ${detailedResponse.status}`
                );
              }

              const detailedData = await detailedResponse.json();
              setDetailedResult(detailedData);
            } catch (detailedErr) {
              console.error("Error getting detailed analysis:", detailedErr);
            }
          }

          setWaitingImgDisplay("none");
        } catch (err) {
          setError(`Error processing image: ${err.message}`);
          console.error("Error:", err);
        } finally {
          setScanning(false);
          setWaitingImgDisplay("none");
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
        setScanning(false);
      };

      reader.readAsDataURL(selectedFile);
    } catch (err) {
      setError(`Error: ${err.message}`);
      setScanning(false);
      console.error("Error:", err);
    }
  };

  return (
    <div className="dragdrop">
      <div
        className={`dd-container ${dragging ? "dragging" : ""}`}
        onClick={() => document.getElementById("fileInput").click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="preview-image" />
          </div>
        ) : (
          <p>{uploadMessage}</p>
        )}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleInputChange}
        />
      </div>

      <div className="loadingAnim" style={{ display: waitingImgDisplay }}>
        <img src={loadingImg} alt="" />
        <p className="waitingLabel">Scanning, Just a moment..</p>
      </div>

      {result && (
        <div className="result-container">
          <h3>Scan Results:</h3>
          <p
            className={`result ${
              result.prediction === "Pneumonia" ? "pneumonia" : "normal"
            }`}
          >
            <strong>Diagnosis:</strong> {result.prediction}
          </p>
          <p>
            <strong>Confidence:</strong> {result.confidence.toFixed(2)}%
          </p>

          {detailedResult && result.prediction === "Pneumonia" && (
            <div className="detailed-result">
              <h4>Detailed Analysis:</h4>
              <p>
                <strong>Type:</strong> {detailedResult.detailed_prediction}
              </p>
              <p>
                <strong>Severity:</strong> {detailedResult.severity}
              </p>
              <p>
                <strong>Confidence:</strong>{" "}
                {detailedResult.confidence.toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error">{error}</p>
        </div>
      )}

      <div className="buttons">
        <button
          className="uploadBtn"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <FiUpload />
        </button>

        <button className="printBtn" onClick={handlePasteClick}>
          <MdContentPaste />
        </button>

        <button
          className="scanBtn btn-gradient"
          disabled={!selectedFile || scanning}
          onClick={handleScan}
          style={{
            opacity: selectedFile && !scanning ? 1 : 0.5,
            cursor: selectedFile && !scanning ? "pointer" : "not-allowed",
          }}
        >
          <RiBodyScanLine /> {scanning ? "Scanning..." : "Scan"}
        </button>
        <button
          className="clearBtn"
          onClick={handleClear}
          disabled={!selectedFile || scanning}
          style={{
            opacity: selectedFile && !scanning ? 1 : 0.5,
            cursor: selectedFile && !scanning ? "pointer" : "not-allowed",
          }}
        >
          <FaDeleteLeft />
        </button>

        <button
          className="printBtn"
          onClick={handlePrint}
          disabled={!selectedFile || scanning}
          style={{
            opacity: selectedFile && !scanning ? 1 : 0.5,
            cursor: selectedFile && !scanning ? "pointer" : "not-allowed",
          }}
        >
          <FaPrint />
        </button>
      </div>
    </div>
  );
}
