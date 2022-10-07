import { FormControlLabel, FormGroup, Stack, Switch } from "@mui/material";
import { useState } from "react";
import { drawResults, getModal, runDetector } from "../utils/videoEffectsHelpers";

const VIDEO_ELEMENT_ID = "video-feed";
const CANVAS_ELEMENT_ID = "video-effects-canvas";

export const ExampleVideoEffectsInner = () => {
  const [cameraOn, setCameraOn] = useState<boolean | "readying">(false);
  const [effectsOn, setEffectsOn] = useState<boolean | "readying">(false);

  const toggleCamera = async (newValue: boolean) => {
    setCameraOn("readying");
    if (newValue) {
      await startVideoFeed();
    } else {
      toggleEffects(false);
      await stopVideoFeed();
    }
    setCameraOn(newValue);
  };

  const toggleEffects = async (newValue: boolean) => {
    setEffectsOn("readying");
    if (newValue) {
      await startVideoEffects();
    } else {
      await stopVideoEffects();
    }
    setEffectsOn(newValue);
  };

  return (
    <Stack>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              onClick={() => toggleCamera(!cameraOn)}
              checked={cameraOn === true}
              disabled={cameraOn === "readying"}
            />
          }
          label="Toggle Camera"
        />
        <FormControlLabel
          control={
            <Switch
              onClick={() => toggleEffects(!effectsOn)}
              checked={effectsOn === true}
              disabled={cameraOn !== true || effectsOn === "readying"}
              title="Toggle Effects"
            />
          }
          label="Toggle Effects"
        />
      </FormGroup>
      <video
        id={VIDEO_ELEMENT_ID}
        height="300"
        autoPlay
        style={{ display: effectsOn === true ? "none" : undefined }}
      />
      <canvas
        id={CANVAS_ELEMENT_ID}
        height="300"
        style={{ display: effectsOn !== true ? "none" : undefined }}
      />
    </Stack>
  );
};

const startVideoFeed = async (): Promise<void> => {
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

const stopVideoFeed = async (): Promise<void> => {
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

const startVideoEffects = async (): Promise<void> => {
  const videoElement = document.getElementById(VIDEO_ELEMENT_ID) as HTMLVideoElement;
  const canvas = document.getElementById(
    CANVAS_ELEMENT_ID
  ) as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context!");
  }

  return new Promise(resolve => {
    const faceMesh = getModal();
    faceMesh.onResults(async (results) => {
      canvas.width = results.image.width;
      canvas.height = results.image.height;
      drawResults(ctx, results, { partyGlasses: true });
      resolve();
    });
    runDetector(faceMesh, videoElement);
  });
};

const stopVideoEffects = async (): Promise<void> => {};
