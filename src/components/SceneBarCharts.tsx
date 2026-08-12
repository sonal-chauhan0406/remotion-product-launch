import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { FONTS, BarChartItem } from "../types";

const CHART_DATA: BarChartItem[] = [
  { month: "Mar", height: 85 },
  { month: "Apr", height: 65 },
  { month: "May", height: 40 },
  { month: "Jun", height: 55 },
  { month: "Jul", height: 90 },
];

interface BarProps {
  item: BarChartItem;
  index: number;
  frame: number;
  fps: number;
  maxHeight: number;
}

const AnimatedChartBar: React.FC<BarProps> = ({
  item,
  index,
  frame,
  fps,
  maxHeight,
}) => {
  const delay = 10 + index * 6;

  const barGrow = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 90, mass: 0.8 },
  });

  const barHeight = interpolate(barGrow, [0, 1], [0, (item.height / 100) * maxHeight]);
  const barOpacity = interpolate(barGrow, [0, 1], [0, 1]);

  const isBrown = item.month === "Mar" || item.month === "Jul";
  const isPurple = item.month === "May";

  const fillGradient = isBrown
    ? "linear-gradient(180deg, rgba(160, 100, 60, 0.35) 0%, rgba(120, 70, 40, 0.1) 100%)"
    : isPurple
      ? "linear-gradient(180deg, rgba(167, 139, 250, 0.35) 0%, rgba(124, 58, 237, 0.1) 100%)"
      : "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)";

  const insetGlow = isBrown
    ? "inset 0 2px 4px rgba(180, 120, 80, 0.5)"
    : isPurple
      ? "inset 0 2px 4px rgba(167, 139, 250, 0.5)"
      : "inset 0 2px 4px rgba(255, 255, 255, 0.25)";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        opacity: barOpacity,
      }}
    >
      <div
        style={{
          width: 100,
          height: maxHeight,
          borderRadius: 24,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: barHeight,
            borderRadius: "16px 16px 18px 18px",
            background: fillGradient,
            backdropFilter: "blur(12px)",
            boxShadow: insetGlow,
            position: "relative",
            overflow: "hidden",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 18,
          fontWeight: 500,
          color: "rgba(255, 255, 255, 0.5)",
          textTransform: "lowercase",
          letterSpacing: "0.05em",
        }}
      >
        {item.month.toLowerCase()}
      </div>
    </div>
  );
};

export const SceneBarCharts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxBarHeight = 300;

  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 80 },
  });

  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [-30, 0]);

  const pillEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const pillOpacity = interpolate(pillEntrance, [0, 1], [0, 1]);
  const pillScale = interpolate(pillEntrance, [0, 1], [0.8, 1]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 1000 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 80,
          }}
        >
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            <div
              style={{
                fontFamily: FONTS.heading,
                fontSize: 58,
                fontWeight: 500,
                color: "#ffffff",
                letterSpacing: "0.02em",
              }}
            >
              Actionable Insights
            </div>
          </div>
          <div
            style={{
              opacity: pillOpacity,
              transform: `scale(${pillScale})`,
            }}
          >
            <div
              style={{
                padding: "10px 24px",
                borderRadius: 9999,
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(124, 58, 237, 0.3) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                fontFamily: FONTS.body,
                fontSize: 16,
                fontWeight: 500,
                color: "#ffffff",
                letterSpacing: "0.02em",
                backdropFilter: "blur(10px)",
              }}
            >
              Monthly
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: 80,
            padding: "0 20px",
          }}
        >
          {CHART_DATA.map((item, index) => (
            <AnimatedChartBar
              key={index}
              item={item}
              index={index}
              frame={frame}
              fps={fps}
              maxHeight={maxBarHeight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
