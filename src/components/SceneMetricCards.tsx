import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { GlassCard } from "./GlassCard";
import { COLORS, FONTS, MetricCardData } from "../types";



const IconTrendingUp: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const IconBriefcase: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="2" y1="13" x2="22" y2="13" />
  </svg>
);

const IconClock: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconGlobe: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconStar: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#ffffff"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

/** Map card index → SVG icon component */
const CARD_ICONS: React.ReactNode[] = [
  <IconTrendingUp size={64} />,
  <IconBriefcase size={64} />,
  <IconStar size={64} />,
  <IconGlobe size={64} />,
  <IconClock size={64} />,
];



const METRICS: MetricCardData[] = [
  {
    value: "+$24,580",
    label: "Revenue generated this month",
    icon: "chart",
    color: COLORS.accentGreen,
  },
  {
    value: "32 Active Deals",
    label: "Sales pipeline tracking",
    icon: "briefcase",
    color: COLORS.accentBlue,
  },
  {
    value: "4.8 Rating",
    label: "Average customer satisfaction",
    icon: "star",
    color: COLORS.accentYellow,
  },
  {
    value: "18 Countries",
    label: "Global client coverage",
    icon: "globe",
    color: COLORS.accentPurple,
  },
  {
    value: "12h Saved",
    label: "Weekly automation efficiency",
    icon: "clock",
    color: COLORS.accentCyan,
  },
];

/** Height of each card slot (card + gap) in pixels */
const CARD_SLOT_HEIGHT = 280;

/** Card visual width in pixels */
const CARD_WIDTH = 900;

/** Number of frames each card stays as the "active" card during forward scroll */
const FRAMES_PER_CARD = 5;

/** Frames of initial hold on the first card before scrolling begins */
const HOLD_FRAMES = 8;

/** Frames reserved at the end for the scroll-back animation */
const SCROLL_BACK_FRAMES = 30;



interface MetricCardItemProps {
  metric: MetricCardData;
  index: number;
  activeProgress: number; // continuous float indicating active card index
}

const MetricCardItem: React.FC<MetricCardItemProps> = ({
  metric,
  index,
  activeProgress,
}) => {
  const distance = index - activeProgress;
  const absDistance = Math.abs(distance);


  const cardOpacity =
    absDistance >= 2
      ? 0
      : interpolate(absDistance, [0, 0.4, 1, 2], [1, 0.6, 0.25, 0], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

  const cardScale =
    absDistance >= 2
      ? 0.7
      : interpolate(absDistance, [0, 1, 2], [1, 0.85, 0.7], {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        });

  return (
    <div
      style={{
        width: CARD_WIDTH,
        height: CARD_SLOT_HEIGHT - 24,
        opacity: cardOpacity,
        transform: `scale(${cardScale})`,
        willChange: "transform, opacity",
        flexShrink: 0,
      }}
    >
      <GlassCard
        glowColor={metric.color + "22"}
        borderRadius={30}
        style={{
          padding: "48px 56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 36,
          height: "100%",
          boxSizing: "border-box",
        }}
      >

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 64,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: COLORS.textPrimary,
              lineHeight: 1.1,
            }}
          >
            {metric.value}
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: 26,
              fontWeight: 400,
              color: COLORS.textSecondary,
              letterSpacing: "0.01em",
              lineHeight: 1.35,
            }}
          >
            {metric.label}
          </div>
        </div>


        <div
          style={{
            width: 96,
            height: 96,
            minWidth: 96,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${metric.color}18, ${metric.color}08)`,
            border: `1.5px solid ${metric.color}25`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 40px ${metric.color}18`,
          }}
        >
          {CARD_ICONS[index]}
        </div>
      </GlassCard>
    </div>
  );
};



export const SceneMetricCards: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height: videoHeight } = useVideoConfig();



  const lastIndex = METRICS.length - 1;
  const forwardScrollFrames = FRAMES_PER_CARD * METRICS.length;


  const scrollBackStart = HOLD_FRAMES + forwardScrollFrames;


  const scrollFrame = Math.max(0, frame - HOLD_FRAMES);


  let forwardProgress: number;
  {
    const currentCardIndex = Math.floor(scrollFrame / FRAMES_PER_CARD);
    const clampedIndex = Math.min(currentCardIndex, lastIndex);
    const frameInCard = scrollFrame - clampedIndex * FRAMES_PER_CARD;

    if (clampedIndex === 0) {
      forwardProgress = 0;
    } else {
      forwardProgress = clampedIndex;
    }


    if (clampedIndex > 0 && clampedIndex <= lastIndex) {
      const transitionSpring = spring({
        frame: frameInCard,
        fps,
        config: { damping: 26, stiffness: 160, mass: 0.5 },
      });

      forwardProgress = interpolate(
        transitionSpring,
        [0, 1],
        [clampedIndex - 1, clampedIndex],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
    }


    if (scrollFrame >= forwardScrollFrames) {
      forwardProgress = lastIndex;
    }
  }


  let activeProgress: number;

  if (frame >= scrollBackStart) {
    const scrollBackFrame = frame - scrollBackStart;

    const scrollBackSpring = spring({
      frame: scrollBackFrame,
      fps,
      config: { damping: 14, stiffness: 35, mass: 1.2 },
    });

    activeProgress = interpolate(
      scrollBackSpring,
      [0, 1],
      [lastIndex, 3],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
  } else {
    activeProgress = forwardProgress;
  }


  const GAP = 24;
  const cardHeight = CARD_SLOT_HEIGHT - 24;
  const centerOffset = videoHeight / 2 - cardHeight / 2;
  const activeCardTop = activeProgress * (CARD_SLOT_HEIGHT + GAP);
  const containerY = centerOffset - activeCardTop;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: `translateX(-50%) translateY(${containerY}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: GAP,
          willChange: "transform",
        }}
      >
        {METRICS.map((metric, index) => (
          <MetricCardItem
            key={index}
            metric={metric}
            index={index}
            activeProgress={activeProgress}
          />
        ))}
      </div>
    </div>
  );
};
