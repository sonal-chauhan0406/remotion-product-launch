import React from "react";
import { Composition } from "remotion";
import { ProductLaunch } from "./ProductLaunch";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductLaunch"
        component={ProductLaunch}
        durationInFrames={750}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
