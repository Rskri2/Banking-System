import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import { apiLogin } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [account, setAccount] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [mode, setMode] = useState(""); // "webcam" or "upload"

  const navigate = useNavigate();

  const onCapture = (dataUrl) => setImage(dataUrl);

  const onFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    if (!account || !image) {
      setMsg("Account and photo required");
      return;
    }
    setMsg("Authenticating...");
    try {
      const res = await apiLogin({ account_no: account, image });
      if (res.ok) {
        setMsg("Login success, redirecting...");
        sessionStorage.setItem("account_no", account);
        sessionStorage.setItem("first_name", res.first_name || "");
        setTimeout(() => navigate("/dashboard"), 700);
      } else {
        setMsg("Login failed: " + (res.error || "unknown"));
      }
    } catch (e) {
      setMsg("Request error: " + e.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Bank Login</h2>

      <input
        className="login-input"
        placeholder="Account Number"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />

      {/* Step 1: Ask user how they want to add photo */}
      <button
        className="option-btn"
        onClick={() => setShowOptions(!showOptions)}
      >
        {showOptions ? "Hide Photo Options" : "Add Photo"}
      </button>

      {/* Step 2: Show options */}
      {showOptions && (
        <div className="choose-section">
          <button
            className="choice-btn"
            onClick={() => {
              setMode("webcam");
              setImage(null);
            }}
          >
            Capture using Webcam
          </button>

          <button
            className="choice-btn"
            onClick={() => {
              setMode("upload");
              setImage(null);
            }}
          >
            Upload from Device
          </button>
        </div>
      )}

      {/* Step 3: Render UI based on selected mode */}
      <div className="photo-section">
        {mode === "webcam" && (
          <WebcamCapture onCapture={onCapture} />
        )}

        {mode === "upload" && (
          <div className="file-upload">
            <input type="file" accept="image/*" onChange={onFileUpload} />
          </div>
        )}

        {image && (
          <img src={image} alt="preview" className="preview-image" />
        )}
      </div>

      <button className="login-btn" onClick={submit}>
        Login
      </button>

      {msg && <div className="message">{msg}</div>}

      <style jsx>{`
        .login-container {
          // max-width: 420px;
          // margin: 50px auto;
          padding: 30px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          text-align: center;
          font-family: Arial, sans-serif;
        }

        .login-title {
          margin-bottom: 20px;
          color: #333;
          font-size: 24px;
          font-weight: bold;
        }

        .login-input {
          width: 85%;
          padding: 12px;
          margin-bottom: 20px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 16px;
        }

        .option-btn {
          padding: 10px 20px;
          background: #0069d9;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          margin-bottom: 15px;
        }

        .option-btn:hover {
          background: #0053b3;
        }

        .choose-section {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 15px;
        }

        .choice-btn {
          background: #17a2b8;
          color: white;
          padding: 10px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .choice-btn:hover {
          background: #117a8b;
        }

        .photo-section {
          margin-top: 10px;
        }

        .file-upload input {
          cursor: pointer;
          font-size: 15px;
        }

        .preview-image {
          width: 160px;
          margin-top: 12px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .login-btn {
          width: 70%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background-color: #28a745;
          color: #fff;
          font-size: 18px;
          cursor: pointer;
          margin-top: 15px;
        }

        .login-btn:hover {
          background-color: #1e7e34;
        }

        .message {
          margin-top: 18px;
          font-size: 14px;
          color: #555;
        }
      `}</style>
    </div>
  );
}
