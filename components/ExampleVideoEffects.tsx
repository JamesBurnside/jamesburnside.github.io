import Skeleton from "@mui/material/Skeleton";
import dynamic from "next/dynamic";

export const ExampleVideoEffects = () => {
  return (
    <DynamicExampleVideoEffects />
  );
};

const DynamicExampleVideoEffects = dynamic(
  () => import("./ExampleVideoEffectsInner").then((mod) => mod.ExampleVideoEffectsInner), {
    ssr: false,
    loading: () => <Skeleton variant="rectangular" width={530} height={300} />
  }
);
