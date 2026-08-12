import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  interpolate,
  spring,
} from "remotion";
import { Background } from "./components/Background";
import { SceneMetricCards } from "./components/SceneMetricCards";
import { SceneTimeline } from "./components/SceneTimeline";
import { SceneNodeGraph } from "./components/SceneNodeGraph";
import { SceneWorkflowAutomation } from "./components/SceneWorkflowAutomation";
import { SceneProfitGrowth } from "./components/SceneProfitGrowth";
import { SceneCentralHub } from "./components/SceneCentralHub";
import { SceneBarCharts } from "./components/SceneBarCharts";
import { COLORS, FONTS } from "./types";

/**
 * Scene configuration:
 * Total: 900 frames at 30fps = 30 seconds
 *
 * Scene 1: Metric Cards      - frames 0-119
 * Scene 2: Timeline           - frames 120-239
 * Scene 3: Node Graph         - frames 240-389
 * Scene 4: Workflow Auto      - frames 390-539
 * Scene 5: Profit Growth      - frames 540-659
 * Scene 6: Central Hub        - frames 660-809
 * Scene 7: Bar Charts         - frames 810-959
 * Outro:                      - frames 960-1109
 */

interface SceneTransitionProps {
  children: React.ReactNode;
  frame: number;
  fps: number;
  startFrame: number;
  duration: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  skipFadeIn?: boolean;
}

const SceneTransition: React.FC<SceneTransitionProps> = ({
  children,
  frame,
  fps,
  startFrame,
  duration,
  fadeInDuration = 15,
  fadeOutDuration = 15,
  skipFadeIn = false,
}) => {
  const localFrame = frame - startFrame;


  const fadeIn = skipFadeIn
    ? 1
    : spring({
        frame: localFrame,
        fps,
        config: { damping: 20, stiffness: 80 },
      });


  const fadeOut = interpolate(
    localFrame,
    [duration - fadeOutDuration, duration],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = Math.min(fadeIn, fadeOut);
  const scale = interpolate(fadeIn, [0, 1], [0.97, 1]);
  const exitScale = interpolate(
    localFrame,
    [duration - fadeOutDuration, duration],
    [1, 1.02],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (localFrame < 0 || localFrame > duration) return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        transform: `scale(${scale * exitScale})`,
      }}
    >
      {children}
    </div>
  );
};

export const ProductLaunch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Background frame={frame}>

      <Sequence from={0} durationInFrames={60} name="Metric Cards">
        <SceneTransition
          frame={frame}
          fps={fps}
          startFrame={0}
          duration={60}
          skipFadeIn
        >
          <SceneMetricCards />
        </SceneTransition>
      </Sequence>


      <Sequence from={60} durationInFrames={100} name="Timeline">
        <SceneTransition
          frame={frame}
          fps={fps}
          startFrame={60}
          duration={100}
        >
          <SceneTimeline />
        </SceneTransition>
      </Sequence>


      <Sequence from={160} durationInFrames={125} name="Node Graph">
        <SceneTransition
          frame={frame}
          fps={fps}
          startFrame={160}
          duration={125}
        >
          <SceneNodeGraph />
        </SceneTransition>
      </Sequence>


      <Sequence from={285} durationInFrames={125} name="Workflow Automation">
        <SceneTransition
          frame={frame}
          fps={fps}
          startFrame={285}
          duration={125}
        >
          <SceneWorkflowAutomation />
        </SceneTransition>
      </Sequence>


      <Sequence from={410} durationInFrames={95} name="Profit Growth">
        <SceneTransition
          frame={frame}
          fps={fps}
          startFrame={410}
          duration={95}
        >
          <SceneProfitGrowth />
        </SceneTransition>
      </Sequence>


      <Sequence from={505} durationInFrames={120} name="Central Hub">
        <SceneTransition
          frame={frame}
          fps={fps}
          startFrame={505}
          duration={120}
        >
          <SceneCentralHub />
        </SceneTransition>
      </Sequence>


      <Sequence from={625} durationInFrames={125} name="Bar Charts">
        <SceneTransition
          frame={frame}
          fps={fps}
          startFrame={625}
          duration={125}
        >
          <SceneBarCharts />
        </SceneTransition>
      </Sequence>
    </Background>
  );
};

/** Outro scene with logo and tagline */
interface OutroProps {
  frame: number;
  fps: number;
  startFrame: number;
}

const OutroScene: React.FC<OutroProps> = ({ frame, fps, startFrame }) => {
  const localFrame = frame - startFrame;

  const logoEntrance = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 60, mass: 0.8 },
  });

  const logoScale = interpolate(logoEntrance, [0, 1], [0.5, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

  const taglineEntrance = spring({
    frame: localFrame - 12,
    fps,
    config: { damping: 18, stiffness: 70 },
  });

  const taglineOpacity = interpolate(taglineEntrance, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineEntrance, [0, 1], [25, 0]);

  const ctaEntrance = spring({
    frame: localFrame - 24,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const ctaOpacity = interpolate(ctaEntrance, [0, 1], [0, 1]);
  const ctaScale = interpolate(ctaEntrance, [0, 1], [0.8, 1]);


  const fadeOut = interpolate(localFrame, [120, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        opacity: fadeOut,
      }}
    >

      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(168, 85, 247, 0.2), rgba(99, 102, 241, 0.08))`,
          backdropFilter: "blur(20px)",
          border: `1.5px solid ${COLORS.borderGlassLight}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `
            0 0 60px rgba(168, 85, 247, 0.3),
            0 0 120px rgba(99, 102, 241, 0.15)
          `,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 14,
            fontWeight: 700,
            color: COLORS.textPrimary,
            letterSpacing: "0.1em",
          }}
        >
          LOGO
        </div>
      </div>


      <div
        style={{
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: FONTS.heading,
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            background: `linear-gradient(135deg, #fff, ${COLORS.accentPurple}, ${COLORS.accentCyan})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}
        >
          Built for the future.
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 18,
            color: COLORS.textSecondary,
            marginTop: 12,
            letterSpacing: "0.02em",
          }}
        >
          Your all-in-one platform for intelligent automation.
        </div>
      </div>


      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          marginTop: 12,
        }}
      >
        <div
          style={{
            padding: "14px 40px",
            borderRadius: 30,
            background: `linear-gradient(135deg, ${COLORS.accentPurple}, ${COLORS.accentBlue})`,
            fontFamily: FONTS.heading,
            fontSize: 16,
            fontWeight: 600,
            color: "#fff",
            letterSpacing: "0.03em",
            boxShadow: `
              0 4px 20px rgba(168, 85, 247, 0.35),
              0 0 40px rgba(99, 102, 241, 0.15)
            `,
          }}
        >
          Get Started →
        </div>
      </div>
    </div>
  );
};
