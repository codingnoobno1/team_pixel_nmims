"use client";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function VideoTake() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const socketRef = useRef(null); // socket instance

  useEffect(() => {
    // WebSocket setup
    socketRef.current = io({ path: "/api/socket" });

    socketRef.current.on("connect", () => {
      console.log("🟢 WebSocket connected");
    });

    // Camera stream setup
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    });

    // Function to capture & send image via WebSocket
    const sendImage = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0, 320, 240);
      const image = canvas.toDataURL("image/jpeg", 0.6); // lower quality for speed

      if (socketRef.current?.connected) {
        socketRef.current.emit("send-image", image);
      }
    };

    const interval = setInterval(sendImage, 66); // ~15 FPS

    return () => {
      clearInterval(interval);
      socketRef.current?.disconnect(); // clean up
    };
  }, []);

  return (
    <div>
      <h2>🎥 Video Sender (WebSocket @15 FPS)</h2>
      <video ref={videoRef} autoPlay width={320} height={240} />
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        style={{ display: "none" }}
      />
    </div>
  );
}
