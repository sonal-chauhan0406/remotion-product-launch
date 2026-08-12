/**
 * template.tsx
 *
 * Production-ready Remotion template for a sleek, high-end 30-second
 * product launch video with a dark glassmorphism aesthetic.
 *
 * This file re-exports the main ProductLaunch composition and all its
 * scene components for easy import and customization.
 *
 * Usage:
 *   import { ProductLaunch } from "./template";
 *
 * Scenes:
 *   1. SceneMetricCards       - Floating glass metric cards with sparklines
 *   2. SceneTimeline          - Vertical glowing timeline schedule view
 *   3. SceneNodeGraph         - "Everything in sync" node graph with curved neon lines
 *   4. SceneWorkflowAutomation - Animated progress bars with counter interpolation
 *   5. SceneProfitGrowth      - Large counter + neon sine-wave trendline
 *   6. SceneCentralHub        - Central hub ecosystem with radial connections
 *   7. SceneBarCharts         - Frosted-glass bar charts with sequential animation
 */

export { ProductLaunch } from "./ProductLaunch";


export { SceneMetricCards } from "./components/SceneMetricCards";
export { SceneTimeline } from "./components/SceneTimeline";
export { SceneNodeGraph } from "./components/SceneNodeGraph";
export { SceneWorkflowAutomation } from "./components/SceneWorkflowAutomation";
export { SceneProfitGrowth } from "./components/SceneProfitGrowth";
export { SceneCentralHub } from "./components/SceneCentralHub";
export { SceneBarCharts } from "./components/SceneBarCharts";


export { GlassCard } from "./components/GlassCard";
export { Background } from "./components/Background";
export { COLORS, FONTS } from "./types";
export type {
  MetricCardData,
  TimelineEvent,
  NodeConnection,
  ProgressBarData,
  BarChartItem,
  HubConnection,
} from "./types";
