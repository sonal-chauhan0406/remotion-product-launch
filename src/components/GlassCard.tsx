import React from "react";
import { COLORS } from "../types";

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  glowColor?: string;
  borderRadius?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  glowColor = COLORS.glowPurple,
  borderRadius = 20,
}) => {
  return (
    <div
      style={{
        background: COLORS.bgCard,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${COLORS.borderGlass}`,
        borderRadius,
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.4),
          0 0 60px ${glowColor},
          inset 0 1px 0 rgba(255, 255, 255, 0.06)
        `,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
