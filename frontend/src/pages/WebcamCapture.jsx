import React, { useRef, useState, useEffect } from "react";

export default function WebcamCapture({ onCapture }) {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setStreaming(true);
      } catch (err) {
        console.error("Webcam error:", err);
      }
    }
    start();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg");
    onCapture(dataUrl);
  };

  return (
    <div className="webcam-container">
      <video ref={videoRef} className="webcam-video" />
      <div className="webcam-controls">
        <button className="capture-btn" onClick={capture}>
          Capture
        </button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <style jsx>{`
        .webcam-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 15px;
        }
        .webcam-video {
          width: 320px;
          height: 240px;
          border: 2px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          object-fit: cover;
        }
        .webcam-controls {
          display: flex;
          justify-content: center;
        }
        .capture-btn {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .capture-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
