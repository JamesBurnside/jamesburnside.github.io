import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl"; // Register WebGL backend.

import { VERSION as FaceMeshVersion, FaceMesh, Results } from '@mediapipe/face_mesh';
import { drawRoseGlasses } from "./videoEffects/roseGlasses";

export const VIDEO_ELEMENT_ID = "video-feed";
export const CANVAS_ELEMENT_ID = "video-effects-canvas";

let cancelAnimationFrame = false;

const getModal = (): FaceMesh => {
  const faceMesh = new FaceMesh({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${FaceMeshVersion}/${file}`,
  });
  faceMesh.setOptions({
    selfieMode: false,
    enableFaceGeometry: false,
    maxNumFaces: 2,
    refineLandmarks: true,
  });
  return faceMesh;
}

const runDetector = async (detector: FaceMesh, video: HTMLVideoElement) => {
  return requestAnimationFrame(async () => {
    if (cancelAnimationFrame) {
      return;
    }
    await detector.send({ image: video });
    await runDetector(detector, video);
  });
};

const drawResults = async (ctx: CanvasRenderingContext2D, detectionResults: Results, drawOptions: { partyGlasses: boolean }) => {
  const { width, height } = detectionResults.image;

  const scaleY = ctx.canvas.height / height;
  const scaleX = ctx.canvas.width / width;

  ctx.scale(1/scaleX, 1/scaleY);
  ctx.clearRect(0, 0, width, height);

  // Draw original video to canvas
  ctx.drawImage(detectionResults.image, 0, 0, width, height);

  try {
    if (drawOptions.partyGlasses) {
      drawRoseGlasses(ctx, detectionResults);
    }
  } catch (e) {
    console.error(e);
  }
  ctx.scale(scaleX, scaleY);
}


export const startVideoFeed = async (): Promise<void> => {
  const videoFeed = await getVideoFeed();
  if (!videoFeed) {
    console.error("Could not get video feed!");
    return;
  }

  const videoElement = document.getElementById(
    VIDEO_ELEMENT_ID
  ) as HTMLVideoElement;
  videoElement.srcObject = videoFeed;
  try {
    await videoElement.play();
  } catch (e) {
    console.error(e);
  }
};

export const stopVideoFeed = async (): Promise<void> => {
  const videoElement = document.getElementById(
    VIDEO_ELEMENT_ID
  ) as HTMLVideoElement;
  if (!videoElement.srcObject) {
    return;
  }

  const videoFeed = videoElement.srcObject as MediaStream;
  videoFeed.getTracks().forEach((track) => track.stop());
  videoElement.srcObject = null;
};

const getVideoFeed = async (): Promise<MediaStream | undefined> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    return stream;
  } catch (error) {
    console.error(error);
    alert(
      "Could not get camera feed! Ensure you have allowed camera access and that your camera is not in use by another application."
    );
  }
};

export const startVideoEffects = async (): Promise<void> => {
  cancelAnimationFrame = false;
  const videoElement = document.getElementById(VIDEO_ELEMENT_ID) as HTMLVideoElement;
  const canvas = document.getElementById(
    CANVAS_ELEMENT_ID
  ) as HTMLCanvasElement;
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context!");
  }

  return new Promise(resolve => {
    const faceMesh = getModal();
    faceMesh.onResults(async (results) => {
      drawResults(ctx, results, { partyGlasses: true });
      resolve();
    });
    runDetector(faceMesh, videoElement);
  });
};

export const stopVideoEffects = async (): Promise<void> => { cancelAnimationFrame = true; };
