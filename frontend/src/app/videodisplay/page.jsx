"use client";
import { useEffect, useState, useRef } from "react";

export default function VideoDisplay() {
  const [image, setImage] = useState(null);
  const isFetching = useRef(false); // to avoid overlapping requests

  useEffect(() => {
    const fetchImage = () => {
      if (isFetching.current) return;

      isFetching.current = true;
      fetch("/api/stream")
        .then((res) => res.json())
        .then((data) => {
          if (data.image) setImage(data.image);
        })
        .catch((err) => console.error("Fetch failed", err))
        .finally(() => {
          isFetching.current = false;
        });
    };

    const interval = setInterval(fetchImage, 66); // ~15 FPS

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>🖥️ Live Viewer (15 FPS)</h2>
      {image ? (
        <img src={image} width={320} height={240} />
      ) : (
        <p>Waiting for image...</p>
      )}
    </div>
  );
}
