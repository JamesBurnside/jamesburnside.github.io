import { FACEMESH_FACE_OVAL, FACEMESH_LEFT_EYE, FACEMESH_RIGHT_EYE, NormalizedLandmarkList, LandmarkConnectionArray } from '@mediapipe/face_mesh';

export const getRightEye = (landmarks: NormalizedLandmarkList, videoWidth: number, videoHeight: number) => getTopLeftBottomRight(landmarks, FACEMESH_LEFT_EYE, {
  width: videoWidth,
  height: videoHeight,
});

export const getLeftEye = (landmarks: NormalizedLandmarkList, videoWidth: number, videoHeight: number) => getTopLeftBottomRight(landmarks, FACEMESH_RIGHT_EYE, {
  width: videoWidth,
  height: videoHeight,
});

export const getHead = (landmarks: NormalizedLandmarkList, videoWidth: number, videoHeight: number) => getTopLeftBottomRight(landmarks, FACEMESH_FACE_OVAL, {
  width: videoWidth,
  height: videoHeight,
});

const getTopLeftBottomRight = (landmarks: NormalizedLandmarkList, KNOWN_LANDMARK: LandmarkConnectionArray, scale: {width: number; height: number}) => {
  const xVals = KNOWN_LANDMARK.map((index) => landmarks[index[0]].x);
  const yVals = KNOWN_LANDMARK.map((index) => landmarks[index[0]].y);

  return {
    top: Math.min(...yVals) * scale.height,
    left: Math.min(...xVals) * scale.width,
    bottom: Math.max(...yVals) * scale.height,
    right: Math.max(...xVals) * scale.width,
  };
}
