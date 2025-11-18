import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import { apiRegister } from "../api";

export default function Register() {
  const [account, setAccount] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [balance, setBalance] = useState(0);
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [mode, setMode] = useState(""); // "webcam" or "upload"

  const onCapture = (dataUrl) => setImage(dataUrl);

  const onUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setImage(event.target.result);
    reader.readAsDataURL(file);
  };

  const submit = async () => {
    if (!account || !image) {
      setMsg("Account and face image required");
      return;
    }

    setMsg("Registering...");
    try {
      const payload = {
        account_no: account,
        first_name: first,
        last_name: last,
        phone,
        balance,
        image,
      };

      const res = await apiRegister(payload);
      if (res.ok) setMsg("Registered successfully!");
      else setMsg("Error: " + (res.error || "unknown"));

    } catch (e) {
      setMsg("Request failed: " + e.message);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register Account</h2>

      <input
        className="register-input"
        placeholder="Account no"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      />
      <input
        className="register-input"
        placeholder="First name"
        value={first}
        onChange={(e) => setFirst(e.target.value)}
      />
      <input
        className="register-input"
        placeholder="Last name"
        value={last}
        onChange={(e) => setLast(e.target.value)}
      />
      <input
        className="register-input"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="register-input"
        placeholder="Initial balance"
        type="number"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />

      {/* Button to expand photo options */}
      <button
        className="photo-main-btn"
        onClick={() => setShowPhotoOptions(!showPhotoOptions)}
      >
        {showPhotoOptions ? "Hide Photo Options" : "Add Face Image"}
      </button>

      {/* Photo selection options */}
      {showPhotoOptions && (
        <div className="photo-options">
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

      {/* Webcam or Upload UI */}
      <div className="photo-section">
        {mode === "webcam" && <WebcamCapture onCapture={onCapture} />}

        {mode === "upload" && (
          <input type="file" accept="image/*" onChange={onUpload} />
        )}

        {image && (
          <img src={image} alt="preview" className="preview-image" />
        )}
      </div>

      <button className="register-btn" onClick={submit}>
        Register
      </button>

      {msg && <div className="message">{msg}</div>}

      <style jsx>{`
        .register-container {
          // max-width: 450px;
          // margin: 50px auto;
          padding: 30px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
          text-align: center;
          font-family: Arial, sans-serif;
        }

        .register-title {
          margin-bottom: 20px;
          color: #222;
          font-size: 24px;
          font-weight: bold;
        }

        .register-input {
          width: 80%;
          padding: 11px;
          margin: 8px 0;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 15px;
        }

        .photo-main-btn {
          width: 70%;
          padding: 10px;
          background: #0069d9;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          margin: 15px 0 12px;
          font-size: 16px;
        }

        .photo-main-btn:hover {
          background: #0052b1;
        }

        .photo-options {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 15px;
        }

        .choice-btn {
          background: #17a2b8;
          color: white;
          padding: 10px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .choice-btn:hover {
          background: #117a8b;
        }

        .photo-section {
          margin: 10px 0;
        }

        .preview-image {
          width: 160px;
          margin-top: 10px;
          border-radius: 8px;
          border: 1px solid #ddd;
        }

        .register-btn {
          width: 65%;
          padding: 12px;
          border: none;
          border-radius: 6px;
          background-color: #28a745;
          color: #fff;
          font-size: 17px;
          cursor: pointer;
        }

        .register-btn:hover {
          background-color: #218838;
        }

        .message {
          margin-top: 12px;
          font-size: 14px;
          color: #444;
        }
      `}</style>
    </div>
  );
}
