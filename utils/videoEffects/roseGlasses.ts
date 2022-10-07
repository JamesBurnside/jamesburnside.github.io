import { Results } from "@mediapipe/face_mesh";
import { getHead, getLeftEye, getRightEye } from "./faceHelpers";

// For simplicity do this at import time to ensure the image has loaded when it is used
const roseGlasses = new Image();
roseGlasses.src = '../images/rose_glasses.png';

export const drawRoseGlasses = (ctx: CanvasRenderingContext2D, detectionResult: Results) => {
  for (const landmarks of detectionResult.multiFaceLandmarks) {

  const rightEye = getRightEye(landmarks, detectionResult.image.width, detectionResult.image.height);
  const leftEye = getLeftEye(landmarks, detectionResult.image.width, detectionResult.image.height);
  const head = getHead(landmarks, detectionResult.image.width, detectionResult.image.height);

    // Get glasses rotations
    const leftPupil = {
      x: leftEye.left + (leftEye.right - leftEye.left) / 2,
      y: leftEye.top + (leftEye.bottom - leftEye.top) / 2,
    };
    const rightPupil = {
      x: rightEye.left + (rightEye.right - rightEye.left) / 2,
      y: rightEye.top + (rightEye.bottom - rightEye.top) / 2,
    };
    const delta = {
      x: rightPupil.x - leftPupil.x,
      y: rightPupil.y - leftPupil.y,
    };
    const rotation = Math.atan2(delta.y, delta.x);

    // Get glasses width
    const eyeWidth = Math.sqrt(
      Math.pow(rightPupil.x - leftPupil.x, 2) +
        Math.pow(rightPupil.y - leftPupil.y, 2)
    );
    const glassesWidth = eyeWidth * 2.25;
    const glassesWidthExcess = glassesWidth - eyeWidth * 1.25;

    // Get glasses height
    const eyeHeight = Math.abs(leftEye.bottom - leftEye.top);
    const glassesHeight = (head.bottom - head.top) / 3;
    const glassesHeightExcess = glassesHeight - eyeHeight;

    ctx.save();
    ctx.translate(leftEye.left, leftEye.top);
    ctx.rotate(rotation);
    ctx.drawImage(
      roseGlasses, // img
      -glassesWidthExcess / 2, // x
      -glassesHeightExcess / 2, // y
      glassesWidth, // width
      glassesHeight // height
    );

    ctx.restore();
  }
}