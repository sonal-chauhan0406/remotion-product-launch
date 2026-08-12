import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from "remotion";
import { FONTS } from "../types";

interface CustomBarData {
  label: string;
  percentage: number;
  gradient: string;
  glowColor: string;
}

const BARS: CustomBarData[] = [
  {
    label: "Tasks Automated",
    percentage: 93,
    gradient: "linear-gradient(90deg, #ffffff 0%, #22d3ee 40%, #7e22ce 100%)",
    glowColor: "rgba(34, 211, 238, 0.65)",
  },
  {
    label: "Manual Processing",
    percentage: 61,
    gradient: "linear-gradient(90deg, #ffffff 0%, #a855f7 40%, #7e22ce 100%)",
    glowColor: "rgba(168, 85, 247, 0.65)",
  },
];

interface AnimatedBarProps {
  bar: CustomBarData;
  index: number;
  frame: number;
  fps: number;
}

const AnimatedBar: React.FC<AnimatedBarProps> = ({ bar, index, frame, fps }) => {
  const startFrame = 25 + index * 10;
  const durationInFrames = Math.round(1.8 * fps);

  const fillWidth = interpolate(
    frame,
    [startFrame, startFrame + durationInFrames],
    [0, bar.percentage],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  const rowOpacity = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const rowY = interpolate(
    frame,
    [startFrame, startFrame + 15],
    [15, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    }
  );

  const counterValue = Math.round(fillWidth);

  return (
    <div
      style={{
        opacity: rowOpacity,
        transform: `translateY(${rowY}px)`,
        marginBottom: 120,
        width: 1600,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.heading,
          fontSize: 40,
          fontWeight: 400,
          color: "rgba(255, 255, 255, 0.9)",
          marginBottom: 20,
          clipPath: `polygon(0 0, ${fillWidth}% 0, ${fillWidth}% 100%, 0 100%)`,
        }}
      >
        {bar.label}
      </div>

      <div
        style={{
          height: 32,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${fillWidth}%`,
            top: -65,
            transform: "translateX(-100%)",
            fontFamily: FONTS.mono,
            fontSize: 40,
            fontWeight: 400,
            color: "rgba(255, 255, 255, 0.9)",
            whiteSpace: "nowrap",
          }}
        >
          {counterValue}%
        </div>

        <div
          style={{
            height: "100%",
            width: `${fillWidth}%`,
            borderRadius: 9999,
            background: bar.gradient,
            backgroundSize: "1600px 100%",
            boxShadow: `0 0 50px 10px ${bar.glowColor}`,
          }}
        />
      </div>
    </div>
  );
};

export const SceneWorkflowAutomation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleWords = ["Workflow", "Automation", "Rate"];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: 100,
        }}
      >
        {titleWords.map((word, i) => {
          const wordEntrance = spring({
            frame: frame - i * 7,
            fps,
            config: { damping: 15, stiffness: 90 },
          });

          const opacity = interpolate(wordEntrance, [0, 1], [0, 1]);
          const translateY = interpolate(wordEntrance, [0, 1], [-40, 0]);

          return (
            <div
              key={word}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                fontFamily: FONTS.heading,
                fontSize: 80,
                fontWeight: 600,
                color: "#ffffff",
              }}
            >
              {word}
            </div>
          );
        })}
      </div>

      <div>
        {BARS.map((bar, index) => (
          <AnimatedBar
            key={index}
            bar={bar}
            index={index}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </div>
  );
};
