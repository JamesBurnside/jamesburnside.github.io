import "@mediapipe/face_mesh";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl"; // Register WebGL backend.

import { VERSION as FaceMeshVersion, FaceMesh, Results } from '@mediapipe/face_mesh';
import { drawRoseGlasses } from "./videoEffects/roseGlasses";

export const getModal = (): FaceMesh => {
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

export const runDetector = async (detector: FaceMesh, video: HTMLVideoElement) => {
  requestAnimationFrame(async () => {
    await detector.send({ image: video });
    await runDetector(detector, video);
  });
};

export const drawResults = async (ctx: CanvasRenderingContext2D, detectionResults: Results, drawOptions: {partyGlasses: boolean}) => {
  const { width, height } = detectionResults.image;

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
}