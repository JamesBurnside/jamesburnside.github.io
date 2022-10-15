import { FormControlLabel, FormGroup, Stack, Switch } from "@mui/material";
import { useState } from "react";
import { CANVAS_ELEMENT_ID, startVideoEffects, startVideoFeed, stopVideoEffects, stopVideoFeed, VIDEO_ELEMENT_ID } from "../utils/videoEffectsHelpers";

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
    <Stack spacing={2} sx={{ width: '100%', maxWidth: '400px', margin: 'auto' }}>
      <Stack>
        <video
          id={VIDEO_ELEMENT_ID}
          height={300}
          autoPlay
          style={{ display: effectsOn === true ? "none" : undefined }}
        />
        <canvas
          id={CANVAS_ELEMENT_ID}
          style={{ display: effectsOn !== true ? "none" : undefined }}
        />
      </Stack>
      <Toggles cameraOn={cameraOn} effectsOn={effectsOn} toggleCamera={toggleCamera} toggleEffects={toggleEffects} />
    </Stack>
  );
};

const Toggles = (props: {
  toggleCamera: (newState: boolean) => void,
  cameraOn: boolean | 'readying',
  toggleEffects: (newState: boolean) => void,
  effectsOn: boolean | 'readying'
}):JSX.Element => {
  return (
    <FormGroup row sx={{ justifyContent: 'center'}}>
      <FormControlLabel
        control={
          <Switch
            onClick={() => props.toggleCamera(!props.cameraOn)}
            checked={props.cameraOn === true}
            disabled={props.cameraOn === "readying"}
          />
        }
        label="Toggle Camera"
      />
      <FormControlLabel
        control={
          <Switch
            onClick={() => props.toggleEffects(!props.effectsOn)}
            checked={props.effectsOn === true}
            disabled={props.cameraOn !== true || props.effectsOn === "readying"}
            title="Toggle Effects"
          />
        }
        label="Toggle Effects"
      />
    </FormGroup>
  )
}

