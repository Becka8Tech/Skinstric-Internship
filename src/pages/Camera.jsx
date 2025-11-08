import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useResult } from "../context/ResultContext";
import camera from "../assets/camera.jpg";
import icon from "../assets/buttin-icon-shrunk.jpg";
import hint from "../assets/hints.jpg";
import picture from "../assets/picture_camera.jpg";

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { setResultData, setCapturedImage: setContextImage } = useResult();
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);

    // Capture the ref's current value ONCE for this effect
    const video = videoRef.current;
    let stream;

    async function getCameraStream() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = () => setIsStreamReady(true);
        }
      } catch (error) {
        console.error("Camera access denied:", error);
      }
    }

    getCameraStream();

    return () => {
      clearTimeout(timer);
      // Use the captured `video`, not `videoRef.current`
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (video) {
        video.onloadedmetadata = null;
        video.srcObject = null;
      }
    };
  }, []); // deps are fine because we captured `video` and `stream` inside the effect

  const sendImageToAPI = async (imageDataURL) => {
    const base64Image = imageDataURL.replace(/^data:image\/png;base64,/, "");
    const payload = { image: base64Image };

    try {
      const response = await fetch(
        "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("API Response:", result);
      setResult(result);
      setResultData(result);
      setContextImage(imageDataURL);
    } catch (error) {
      console.error("Failed to send image to API:", error.message);
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageDataURL = canvas.toDataURL("image/png");
    setCapturedImage(imageDataURL);
    setIsCaptured(true);
    sendImageToAPI(imageDataURL);

    const stream = video.srcObject;
    stream?.getTracks().forEach((track) => track.stop());
  };

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="video-preview"
        style={{ display: loading || !isStreamReady ? "none" : "block" }}
      />
      <section style={{ background: isCaptured ? "white" : "transparent" }}>
        {loading || !isStreamReady ? (
          <div>
            <div className="diamond_container2">
              <div className="loading-container">
                <div className="Rectangle_2746 spinning"></div>
                <div className="Rectangle_2745 spinning"></div>
                <div className="Rectangle_2744 spinning"></div>
                <img src={camera} alt="Camera Icon" />
                <div className="loading-message2">Setting up camera...</div>
              </div>
            </div>
            <p className="loading-hint">
              To get better results make sure to have
            </p>
            <img src={hint} className="loading-hint2" alt="" />
          </div>
        ) : (
          <div className="camera">
            <div className="camera-feed">
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
              {!isCaptured && (
                <div className="capture-container" onClick={handleCapture}>
                  <p className="capture-label">Take Picture</p>
                  <div className="capture-button-circle">
                    <img src={picture} alt="Capture" className="capture-icon" />
                  </div>
                </div>
              )}
            </div>

            {isCaptured && (
              <>
                <div className="captured-preview">
                  <img src={capturedImage} alt="Captured" />
                </div>

                <h2 className="great_shot">Great Shot!</h2>

                <Link to="/Scan" className="back-button">
                  <img src={icon} alt="" />
                  <div className="discover">Back</div>
                </Link>

                <Link
                  to="/DemoStart"
                  state={{ result, image: capturedImage }}
                  className="proceed-button"
                >
                  <div className="discover">Proceed</div>
                  <img src={icon} className="rotated-image" alt="" />
                </Link>
              </>
            )}
            {!isCaptured && (
              <>
                <div className="hint1">
                  To get better results make sure to have
                </div>
                <img src={hint} className="hint2" alt="" />
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Camera;
