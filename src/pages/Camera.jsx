import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/buttin-icon-shrunk.jpg";
import cameraIcon from "../assets/camera.jpg";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    };

    getCameraStream();

    return () => {
      const stream = videoRef.current?.srcObject;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");
    setCapturedImage(imageDataURL);
  };

  return (
    <section>
      <div className="camera">
        <div className="camera-feed">
          <video ref={videoRef} autoPlay playsInline className="video-preview" />
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <button onClick={handleCapture} className="capture-button">
            Take Picture
          </button>
        </div>

        {capturedImage && (
          <div className="captured-preview">
            <h3>Captured Image:</h3>
            <img src={capturedImage} alt="Captured" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Camera;
