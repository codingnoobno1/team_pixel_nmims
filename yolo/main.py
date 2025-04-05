import cv2
import threading
import time
from fastapi import FastAPI
from fastapi.responses import StreamingResponse, JSONResponse
from ultralytics import YOLO

# Initialize FastAPI app
app = FastAPI()

# Load YOLO model (nano model for speed)
model = YOLO("yolov8n.pt")
vehicle_ids = [2, 3, 5, 7]  # car, motorcycle, bus, truck

# Initialize webcam
cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# Shared frame and lock
frame_lock = threading.Lock()
latest_frame = None
latest_count = 0

def capture_loop():
    global latest_frame, latest_count
    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # Resize frame for display and detection
        frame = cv2.resize(frame, (640, 480), interpolation=cv2.INTER_AREA)

        # Run YOLOv8 detection (input resized internally)
        results = model(frame, verbose=False, imgsz=640)[0]
        car_count = 0

        for box in results.boxes:
            cls_id = int(box.cls[0])
            if cls_id in vehicle_ids:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = float(box.conf[0])
                label = f"{model.names[cls_id]} {conf:.2f}"

                if cls_id == 2:
                    car_count += 1

                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, label, (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        cv2.putText(frame, f"Cars detected: {car_count}", (10, 30),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)

        with frame_lock:
            latest_frame = frame.copy()
            latest_count = car_count

        time.sleep(0.05)  # ~20 FPS

@app.on_event("startup")
def start_camera_thread():
    threading.Thread(target=capture_loop, daemon=True).start()

@app.on_event("shutdown")
def release_camera():
    cap.release()

@app.get("/count")
def get_car_count():
    return JSONResponse(content={"cars_detected": latest_count})

@app.get("/frame")
def get_latest_frame():
    with frame_lock:
        if latest_frame is None:
            return JSONResponse(content={"error": "No frame available"}, status_code=503)
        _, buffer = cv2.imencode(".jpg", latest_frame)
    return StreamingResponse(iter([buffer.tobytes()]), media_type="image/jpeg")

@app.get("/video_feed")
def video_feed():
    def generate():
        while True:
            with frame_lock:
                if latest_frame is None:
                    continue
                _, buffer = cv2.imencode(".jpg", latest_frame)
                frame_bytes = buffer.tobytes()
            yield (b"--frame\r\n"
                   b"Content-Type: image/jpeg\r\n\r\n" + frame_bytes + b"\r\n")
            time.sleep(0.05)  # ~20 FPS

    return StreamingResponse(generate(), media_type="multipart/x-mixed-replace; boundary=frame")
