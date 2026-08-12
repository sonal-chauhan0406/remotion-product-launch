/** Shared types for all components */

export interface MetricCardData {
  value: string;
  label: string;
  icon: string;
  color: string;
}

export interface TimelineEvent {
  time: string;
  title: string;
  isActive: boolean;
}

export interface NodeConnection {
  label: string;
  angle: number;
  color: string;
  icon: string;
}

export interface ProgressBarData {
  label: string;
  percentage: number;
  color: string;
}

export interface BarChartItem {
  month: string;
  height: number;
}

export interface HubConnection {
  label: string;
  angle: number;
  icon: string;
  color: string;
}

/** Global design tokens */
export const COLORS = {
  bgDark: "#0a0518",
  bgMid: "#150a30",
  bgCard: "rgba(255, 255, 255, 0.04)",
  bgCardHover: "rgba(255, 255, 255, 0.08)",
  borderGlass: "rgba(255, 255, 255, 0.08)",
  borderGlassLight: "rgba(255, 255, 255, 0.15)",
  textPrimary: "#ffffff",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  textMuted: "rgba(255, 255, 255, 0.35)",
  accentPurple: "#a855f7",
  accentBlue: "#6366f1",
  accentCyan: "#22d3ee",
  accentGreen: "#34d399",
  accentPink: "#ec4899",
  accentOrange: "#f97316",
  accentYellow: "#facc15",
  glowPurple: "rgba(168, 85, 247, 0.3)",
  glowBlue: "rgba(99, 102, 241, 0.3)",
  glowCyan: "rgba(34, 211, 238, 0.25)",
  glowGreen: "rgba(52, 211, 153, 0.3)",
  neonGreen: "#00ff88",
  neonPurple: "#b366ff",
  neonBlue: "#4d9aff",
} as const;

export const FONTS = {
  heading: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif",
  body: "'Inter', 'SF Pro Text', -apple-system, system-ui, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
} as const;
