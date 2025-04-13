"use client";
import { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import clsx from "clsx";
import { base64ToFile } from "@/lib/utils/convertBase64ToFile";

type VerificationData = {
  id: string;
  timestamp: number;
  challenge: string;
  passed: boolean;
  frames: string[];
};

type CapturedFrame = {
  challenge: string;
  passed: boolean;
  frames: string[];
};

type PropType = {
  onComplete?: (success: boolean, data: VerificationData) => void;
  setFrameCaptured: (frame: string) => void;
  setLivenessImageFile: (frame: File) => void;
};

const ClientSideLivenessDetector: React.FC<PropType> = ({
  onComplete,
  setFrameCaptured,
  setLivenessImageFile,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [instructions, setInstructions] = useState<string | null>(
    'Click "Start" to begin liveness check'
  );
  const [verificationStatus, setVerificationStatus] = useState<string | null>(
    null
  );
  const [capturedFrames, setCapturedFrames] = useState<CapturedFrame[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  const challenges = [
    {
      action: "face_detection",
      instruction: "Position your face in the center",
    },
    // { action: "blink", instruction: "Please blink your eyes slowly" },
    // {
    //   action: "turn_head",
    //   instruction: "Turn your head slightly to the right",
    // },
    // { action: "smile", instruction: "Please smile" },
  ];

  // Load face-api models on component mount
  useEffect(() => {
    const loadModels = async () => {
      setLoading(true);
      try {
        // Load models from public directory
        await faceapi.nets.tinyFaceDetector.load("/models");
        await faceapi.nets.faceLandmark68Net.load("/models");
        await faceapi.nets.faceExpressionNet.load("/models");
        setModelsLoaded(true);
      } catch (error) {
        console.error("Error loading models:", error);
        setInstructions(
          "Error loading face detection models. Please refresh and try again."
        );
      }
      setLoading(false);
    };

    loadModels();

    // Clean up on unmount
    return () => {
      stopCamera();
    };
  }, []);

  // Start camera and liveness detection flow
  const startDetection = async () => {
    if (!modelsLoaded) {
      setInstructions("Face detection models are still loading. Please wait.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user",
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStarted(true);
        setInstructions(challenges[0].instruction);
        setCapturedFrames([]);
        setCurrentChallengeIndex(0);
        // Let the video element initialize before starting detection
        setTimeout(() => {
          startChallengeSequence();
        }, 1000);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setInstructions(
        "Camera access denied. Please enable camera permissions."
      );
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
      streamRef.current = null;

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      setIsStarted(false);
    }
  };

  // Process the current challenge
  const processChallenge = async (challengeIndex: number) => {
    setLoading(true);

    try {
      // Capture frames for the current challenge
      const frameData: string[] = [];

      // For blink detection, we need multiple frames
      if (challenges[challengeIndex].action === "blink") {
        // Capture multiple frames with a delay between them
        for (let i = 0; i < 15; i++) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          const frame = captureFrame();
          if (frame) {
            frameData.push(frame);
          }
        }
      } else {
        // For other challenges, capture one frame after a delay
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const frame = captureFrame();
        const file = base64ToFile(frame, "imgage.png", "image/png");
        setLivenessImageFile(file);
        const blobUrl: string = URL.createObjectURL(file);
        setFrameCaptured(blobUrl);
        if (frame) {
          frameData.push(frame);
        }
      }

      if (frameData.length === 0) {
        throw new Error("Failed to capture frames");
      }

      // Verify the challenge
      const result = await verifyChallenge(
        challenges[challengeIndex].action,
        frameData
      );

      // Update captured frames

      // console.log(frameData);

      setCapturedFrames((prev) => [
        ...prev,
        {
          challenge: challenges[challengeIndex].action,
          passed: result,
          frames: frameData,
        },
      ]);

      setLoading(false);
      return result;
    } catch (error) {
      console.error("Challenge processing error:", error);
      setLoading(false);
      return false;
    }
  };

  // Capture a frame from video
  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context from canvas.");
        return null;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      return canvas.toDataURL("image/jpeg");
    }
    return null;
  };

  // Process all challenges in sequence
  const startChallengeSequence = async () => {
    let allPassed = true;

    for (let i = 0; i < challenges.length; i++) {
      setCurrentChallengeIndex(i);
      setInstructions(challenges[i].instruction);

      const passed = await processChallenge(i);

      if (!passed) {
        allPassed = false;
        setVerificationStatus(`Failed at: ${challenges[i].action}`);
        break;
      }

      // Add a pause between challenges if not the last one
      if (i < challenges.length - 1) {
        setInstructions("Good! Next challenge...");
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    }

    completeVerification(allPassed);
  };

  // Complete the verification process
  const completeVerification = (success: boolean) => {
    if (success) {
      setVerificationStatus(
        "Verification successful! You passed the liveness check."
      );
    } else {
      setVerificationStatus("Verification failed. Please try again.");
    }

    stopCamera();

    if (onComplete) {
      console.log(capturedFrames);

      // Transform capturedFrames into a single VerificationData object
      const verificationData: VerificationData = {
        id: "unique-id", // Replace with actual ID generation logic
        timestamp: Date.now(),
        challenge: capturedFrames[0]?.challenge || "unknown", // Use the first challenge as an example
        passed: success,
        frames: capturedFrames.flatMap((frame) => frame.frames), // Flatten all frames into a single array
      };

      onComplete(success, verificationData); // Pass transformed data
    }
  };

  // Verify a specific challenge using face-api.js
  const verifyChallenge = async (action: string, frames: string[]) => {
    try {
      switch (action) {
        case "face_detection":
          return await verifyFaceDetection(frames[0]);

        case "blink":
          return await verifyBlink(frames);

        case "turn_head":
          return await verifyHeadTurn(frames[0]);

        case "smile":
          return await verifySmile(frames[0]);

        default:
          return false;
      }
    } catch (error) {
      console.error(`Error verifying ${action}:`, error);
      return false;
    }
  };

  // Helper for face detection challenge
  const verifyFaceDetection = async (frameData: string) => {
    try {
      const img: HTMLImageElement = await createImageFromDataUrl(frameData);
      const detections = await faceapi
        .detectAllFaces(
          img,
          new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 })
        )
        .withFaceLandmarks();

      // Check if exactly one face is detected and it's reasonably centered
      if (detections.length !== 1) return false;

      const detection = detections[0];
      const imgWidth = img.width;
      const imgHeight = img.height;

      // Calculate face position relative to center
      const faceBox = detection.detection.box;
      const faceCenterX = faceBox.x + faceBox.width / 2;
      const faceCenterY = faceBox.y + faceBox.height / 2;

      const imgCenterX = imgWidth / 2;
      const imgCenterY = imgHeight / 2;

      // Check if face is centered (within 20% of center)
      const xOffset = Math.abs(faceCenterX - imgCenterX) / imgWidth;
      const yOffset = Math.abs(faceCenterY - imgCenterY) / imgHeight;

      return xOffset < 0.2 && yOffset < 0.2;
    } catch (error) {
      console.error("Face detection error:", error);
      return false;
    }
  };

  // Helper for blink detection challenge
  const verifyBlink = async (frameDataArray: string[]) => {
    try {
      // Need multiple frames to detect blinking
      const eyeOpennessValues = [];

      for (const frameData of frameDataArray) {
        const img = await createImageFromDataUrl(frameData);
        const detections = await faceapi
          .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        if (detections.length !== 1) continue;

        const landmarks = detections[0].landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();

        const leftEAR = calculateEAR(leftEye);
        const rightEAR = calculateEAR(rightEye);

        // Average eye aspect ratio
        const avgEAR = (leftEAR + rightEAR) / 2;
        eyeOpennessValues.push(avgEAR);
      }

      // Must have enough frames
      if (eyeOpennessValues.length < 10) return false;

      // Check for blink pattern: open -> closed -> open
      // We need to see both open and closed eyes
      const maxEAR = Math.max(...eyeOpennessValues);
      const minEAR = Math.min(...eyeOpennessValues);

      // Define thresholds
      const blinkThreshold = 0.2;
      const rangeThreshold = 0.15;

      // Check if we have a sufficient range between max and min eye openness
      return maxEAR - minEAR > rangeThreshold && minEAR < blinkThreshold;
    } catch (error) {
      console.error("Blink detection error:", error);
      return false;
    }
  };

  // Helper for head turn challenge
  const verifyHeadTurn = async (frameData: string) => {
    try {
      const img = await createImageFromDataUrl(frameData);
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (detections.length !== 1) return false;

      const landmarks = detections[0].landmarks;
      const jawOutline = landmarks.getJawOutline();

      // Assess face symmetry to detect head turn
      // Get points on either side of face
      const leftPoint = jawOutline[0];
      const rightPoint = jawOutline[16];
      const centerPoint = jawOutline[8]; // Bottom of chin

      // Calculate distances from center to left and right
      const leftDist = calculateDistance(centerPoint, leftPoint);
      const rightDist = calculateDistance(centerPoint, rightPoint);

      // Calculate asymmetry ratio
      const ratio = leftDist / rightDist;

      // If ratio is significantly different from 1, head is turned
      // For a right turn, ratio should be > 1.3
      return ratio > 1.3;
    } catch (error) {
      console.error("Head turn detection error:", error);
      return false;
    }
  };

  // Helper for smile detection challenge
  const verifySmile = async (frameData: string): Promise<boolean> => {
    try {
      const img = await createImageFromDataUrl(frameData);
      const detections = await faceapi
        .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      if (detections.length !== 1) return false;

      const expressions = detections[0].expressions;

      // Check if happy expression is dominant and above threshold
      return expressions.happy > 0.7;
    } catch (error) {
      console.error("Smile detection error:", error);
      return false;
    }
  };

  // Helper function to create an image from data URL
  const createImageFromDataUrl = async (
    dataUrl: string
  ): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (error) => reject(error);
      img.src = dataUrl;
    });
  };

  type Point = {
    x: number;
    y: number;
  };

  // Calculate Eye Aspect Ratio (EAR)
  const calculateEAR = (eye: Point[]) => {
    // Vertical distances
    const v1 = calculateDistance(eye[1], eye[5]);
    const v2 = calculateDistance(eye[2], eye[4]);

    // Horizontal distance
    const h = calculateDistance(eye[0], eye[3]);

    // Calculate EAR
    return (v1 + v2) / (2.0 * h);
  };

  // Calculate distance between two points
  const calculateDistance = (point1: Point, point2: Point) => {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  };

  return (
    <div className="client-liveness-detector text-center">
      <div className="video-container flex justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={clsx(
            "w-[100%] max-w-[480px] rounded-[8px]",
            isStarted ? "block" : "hidden"
          )}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {!isStarted && !loading && (
          <div
            className="placeholder"
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "360px",
              background: "#f0f0f0",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Camera preview will appear here</p>
          </div>
        )}
      </div>

      <div className="instructions-container" style={{ marginTop: "16px" }}>
        <p className="instructions">{instructions}</p>
        {loading && <p className="loading">Processing... Please wait.</p>}
        {verificationStatus && (
          <p
            className={`status ${
              verificationStatus.includes("successful") ? "success" : "error"
            }`}
          >
            {verificationStatus}
          </p>
        )}
      </div>

      <div className="progress-indicator" style={{ marginTop: "16px" }}>
        {isStarted && !verificationStatus && (
          <div className="challenge-progress">
            <p>
              Challenge {currentChallengeIndex + 1} of {challenges.length}
            </p>
            <div
              className="progress-bar"
              style={{
                height: "8px",
                width: "100%",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                marginTop: "8px",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${
                    (currentChallengeIndex / challenges.length) * 100
                  }%`,
                  backgroundColor: "#4CAF50",
                  borderRadius: "4px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div
        className="controls flex justify-center"
        style={{ marginTop: "20px" }}
      >
        {!isStarted ? (
          <button
            onClick={startDetection}
            disabled={loading || !modelsLoaded}
            style={{
              backgroundColor: loading || !modelsLoaded ? "#cccccc" : "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: loading || !modelsLoaded ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Loading..." : "Start Liveness Check"}
          </button>
        ) : (
          <button
            onClick={stopCamera}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ClientSideLivenessDetector;
