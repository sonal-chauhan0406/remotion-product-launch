import React from "react";
import { COLORS, FONTS } from "../types";

interface BackgroundProps {
  children: React.ReactNode;
  frame: number;
}

export const Background: React.FC<BackgroundProps> = ({ children, frame }) => {
  const glowX1 = 50 + Math.sin(frame * 0.008) * 15;
  const glowY1 = 40 + Math.cos(frame * 0.006) * 12;
  const glowX2 = 60 + Math.cos(frame * 0.01) * 20;
  const glowY2 = 65 + Math.sin(frame * 0.007) * 15;
  const glowX3 = 35 + Math.sin(frame * 0.012) * 18;
  const glowY3 = 30 + Math.cos(frame * 0.009) * 10;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: FONTS.heading,
        color: COLORS.textPrimary,
      }}
    >

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, ${COLORS.bgDark} 0%, ${COLORS.bgMid} 50%, #0d0620 100%)`,
        }}
      />


      <div
        style={{
          position: "absolute",
          left: `${glowX1}%`,
          top: `${glowY1}%`,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
      />


      <div
        style={{
          position: "absolute",
          left: `${glowX2}%`,
          top: `${glowY2}%`,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
        }}
      />


      <div
        style={{
          position: "absolute",
          left: `${glowX3}%`,
          top: `${glowY3}%`,
          width: 450,
          height: 450,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(70px)",
        }}
      />


      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          background: `repeating-conic-gradient(rgba(255,255,255,0.1) 0% 25%, transparent 0% 50%) 0 0 / 4px 4px`,
        }}
      />


      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.015,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />


      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
};
