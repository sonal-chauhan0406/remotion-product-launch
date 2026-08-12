import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { FONTS } from "../types";

export const SceneProfitGrowth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  const counterProgress = spring({
    frame,
    fps,
    config: { damping: 30, stiffness: 40, mass: 1.5 },
  });

  const counterValue = Math.round(interpolate(counterProgress, [0, 1], [1, 125]));


  const titleEntrance = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);


  const waveEntrance = spring({
    frame,
    fps,
    config: { damping: 30, stiffness: 15, mass: 1.5 },
  });
  const waveProgress = interpolate(waveEntrance, [0, 1], [0, 1]);


  const wavePath = "M -100 900 C 300 850, 400 750, 600 600 C 800 450, 900 550, 1200 400 C 1500 250, 1600 350, 1800 250 C 2000 150, 2100 150, 2200 100";
  const waveLength = 3000;
  const waveDashOffset = waveLength * (1 - waveProgress);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >

      <div
        style={{
          position: "absolute",
          fontFamily: FONTS.heading,
          fontSize: 700,
          fontWeight: 600,
          color: "rgba(255, 255, 255, 0.04)",
          userSelect: "none",
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        {counterValue}%
      </div>


      <svg
        width="1920"
        height="1080"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <path
          d={wavePath}
          fill="none"
          stroke="#ccffcc"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={waveLength}
          strokeDashoffset={waveDashOffset}
          style={{
            filter: "drop-shadow(0 0 8px rgba(0, 255, 0, 0.9)) drop-shadow(0 0 24px rgba(0, 255, 0, 0.5))",
          }}
        />
      </svg>


      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: "50%",
          transform: "translateX(-50%)",
          opacity: titleOpacity,
          fontFamily: FONTS.body,
          fontSize: 24,
          fontWeight: 400,
          color: "rgba(255, 255, 255, 0.5)",
          zIndex: 2,
        }}
      >
        *Annual profit growth
      </div>
    </div>
  );
};
