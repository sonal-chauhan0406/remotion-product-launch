import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";
import { FONTS, TimelineEvent } from "../types";

const EVENTS: TimelineEvent[] = [
  { time: "07:45 am", title: "Marketing Analytics Strategy Review", isActive: true },
  { time: "10:15 am", title: "UX Research Session", isActive: false },
  { time: "12:30 pm", title: "CRM Platform Dashboard Update", isActive: false },
  { time: "04:00 pm", title: "Investor Pitch Deck", isActive: false },
];

const PILL_STYLES: { bg: string; border: string; shadow: string }[] = [
  {
    bg: "rgba(128, 90, 213, 0.15)",
    border: "1px solid rgba(128, 90, 213, 0.3)",
    shadow: "0 0 28px rgba(128, 90, 213, 0.2)",
  },
  {
    bg: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    shadow: "none",
  },
  {
    bg: "rgba(219, 39, 119, 0.15)",
    border: "1px solid rgba(219, 39, 119, 0.3)",
    shadow: "0 0 28px rgba(219, 39, 119, 0.2)",
  },
  {
    bg: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    shadow: "none",
  },
];

const ROW_SPACING = 220;

const DOT_SIZE = 20;

interface TimelineRowProps {
  event: TimelineEvent;
  index: number;
  frame: number;
  fps: number;
}

const TimelineRow: React.FC<TimelineRowProps> = ({
  event,
  index,
  frame,
  fps,
}) => {
  const delay = index * 8;

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.7 },
  });

  const translateX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);

  const pill = PILL_STYLES[index] ?? PILL_STYLES[1];

  return (
    <div
      style={{
        transform: `translateX(${translateX}px) scale(${scale})`,
        opacity,
        display: "flex",
        alignItems: "center",
        gap: 60,
        height: ROW_SPACING,
      }}
    >
      <div
        style={{
          fontFamily: FONTS.body,
          fontSize: 48,
          fontWeight: 400,
          color: "#ffffff",
          width: 250,
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        {event.time}
      </div>

      <div
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          minWidth: DOT_SIZE,
          borderRadius: "50%",
          background: "#ffffff",
          boxShadow:
            "0 0 24px rgba(255, 255, 255, 0.7), 0 0 60px rgba(255, 255, 255, 0.3)",
          flexShrink: 0,
          position: "relative",
          zIndex: 2,
        }}
      />

      <div
        style={{
          background: pill.bg,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: pill.border,
          borderRadius: 9999,
          padding: "28px 70px",
          display: "inline-flex",
          alignItems: "center",
          boxShadow: pill.shadow,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 56,
            fontWeight: 500,
            color: "#ffffff",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {event.title}
        </div>
      </div>
    </div>
  );
};

export const SceneTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const dotCenterX = 250 + 60 + DOT_SIZE / 2;
  const totalRows = EVENTS.length;

  const lineTop = ROW_SPACING / 2;
  const lineHeight = (totalRows - 1) * ROW_SPACING;

  const lineEntrance = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80, mass: 0.8 },
  });
  const lineScale = interpolate(lineEntrance, [0, 1], [0, 1]);
  const lineOpacity = interpolate(lineEntrance, [0, 1], [0, 1]);

  const floatY = Math.sin(frame * 0.03) * 20;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", transform: `translateY(${floatY}px)` }}>
        <div
          style={{
            position: "absolute",
            left: dotCenterX - 2,
            top: lineTop,
            width: 4,
            height: lineHeight,
            opacity: lineOpacity,
            transformOrigin: "top center",
            transform: `scaleY(${lineScale})`,
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.6) 70%, rgba(255,255,255,0.1))",
            boxShadow:
              "0 0 16px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.15)",
            zIndex: 1,
          }}
        />

        {EVENTS.map((event, index) => (
          <TimelineRow
            key={index}
            event={event}
            index={index}
            frame={frame}
            fps={fps}
          />
        ))}
      </div>
    </div>
  );
};
