import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { COLORS, FONTS } from "../types";

const NODES = [
  { label: "Analytics", color: COLORS.accentYellow },
  { label: "CRM", color: "#22c55e" },
  { label: "Payments", color: COLORS.accentPurple },
  { label: "Cloud", color: COLORS.accentBlue },
  { label: "AI", color: COLORS.accentPurple },
  { label: "Marketing", color: "#22c55e" },
  { label: "Security", color: COLORS.accentYellow },
];

export const SceneNodeGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();


  const startX = 1350;
  const startY = 540;


  const titleEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 20, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleScale = interpolate(titleEntrance, [0, 1], [0.8, 1]);


  const floatY = Math.sin(frame * 0.03) * 15;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >

      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        transform: `translateY(${floatY}px)`
      }}>

        <svg
          width="1920"
          height="1080"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {NODES.map((node, i) => {

            const lineDelay = 20 + i * 5;
            const lineEntrance = spring({
              frame: frame - lineDelay,
              fps,
              config: { damping: 22, stiffness: 50, mass: 1 },
            });

            const dashProgress = interpolate(lineEntrance, [0, 1], [0, 1]);


            const endY = 540 + (i - 3) * 110;


            const END_X_VALUES = [800, 650, 850, 750, 850, 650, 800];
            const endX = END_X_VALUES[i];

            const cp1X = startX - 250;
            const cp1Y = startY;
            const cp2X = endX + 250;
            const cp2Y = endY;

            const path = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;

            const pathLength = 1600; // safe upper bound for path length
            const dashOffset = pathLength * (1 - dashProgress);

            return (
              <path
                key={`path-${i}`}
                d={path}
                fill="none"
                stroke={node.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={dashOffset}
                style={{
                  filter: `drop-shadow(0 0 8px ${node.color})`,
                }}
              />
            );
          })}
        </svg>


        {NODES.map((node, i) => {
          const lineDelay = 20 + i * 5;
          const dotEntrance = spring({
            frame: frame - (lineDelay + 15), // Appear near the end of line animation
            fps,
            config: { damping: 14, stiffness: 80 },
          });

          const dotScale = interpolate(dotEntrance, [0, 1], [0, 1]);
          const dotOpacity = interpolate(dotEntrance, [0, 1], [0, 1]);

          const endY = 540 + (i - 3) * 110;
          const END_X_VALUES = [800, 650, 850, 750, 850, 650, 800];
          const endX = END_X_VALUES[i];

          return (
            <div
              key={`node-${i}`}
              style={{
                position: "absolute",
                left: endX,
                top: endY,


                transform: `translate(calc(-100% + 6px), -50%)`,
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: dotOpacity,
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 34,
                  fontWeight: 500,
                  color: "#ffffff",
                  letterSpacing: "0.01em",
                }}
              >
                {node.label}
              </div>

              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: node.color,
                  boxShadow: `0 0 16px ${node.color}, 0 0 32px ${node.color}80`,
                  transform: `scale(${dotScale})`,
                }}
              />
            </div>
          );
        })}


        <div
          style={{
            position: "absolute",
            top: startY,
            left: startX + 24,
            transform: `translate(0, -50%) scale(${titleScale})`,
            opacity: titleOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              background: `linear-gradient(90deg, ${COLORS.accentYellow}, ${COLORS.accentPink}, ${COLORS.accentPurple}, ${COLORS.accentBlue}, ${COLORS.accentGreen})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              whiteSpace: "nowrap",
            }}
          >
            Everything in sync
          </div>
        </div>
      </div>
    </div>
  );
};
