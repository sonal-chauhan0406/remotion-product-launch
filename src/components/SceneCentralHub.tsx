import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONTS } from "../types";


const ICONS = {
  youtube: "https://img.icons8.com/color/512/youtube-play.png",
  discord: "https://img.icons8.com/color/512/discord-logo.png",
  messages: "https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg",
  gmail: "https://img.icons8.com/color/512/gmail-new.png",
  tiktok: "https://img.icons8.com/color/512/tiktok.png",
  twitch: "https://img.icons8.com/color/512/twitch.png",
};

type NodeConnection = { angle: number; iconUrl: string; };

const HUB_CONNECTIONS: NodeConnection[] = [
  { angle: 0, iconUrl: ICONS.youtube }, // Right
  { angle: 60, iconUrl: ICONS.discord }, // Bottom Right
  { angle: 120, iconUrl: ICONS.messages }, // Bottom Left
  { angle: 180, iconUrl: ICONS.gmail }, // Left
  { angle: 240, iconUrl: ICONS.tiktok }, // Top Left
  { angle: 300, iconUrl: ICONS.twitch }, // Top Right
];

export const SceneCentralHub: React.FC = () => {
  const frame = useCurrentFrame();

  const cx = 960;
  const cy = 540;
  const radiusX = 400; // Reduced back down to form a tighter shape
  const radiusY = 380; // Maintained height for other nodes

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "transparent",
      }}
    >

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 1,
          height: 1,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 600px 350px rgba(60, 0, 255, 0.75)",
          zIndex: 0,
        }}
      />


      <svg
        width="1920"
        height="1080"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="20" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {HUB_CONNECTIONS.map((conn, i) => {
          const rad = (conn.angle * Math.PI) / 180;
          

          const floatY = Math.sin((frame + i * 25) / 15) * 50;
          

          const innerR = 90; // Logo container radius (180 / 2)
          
          const sx = cx + Math.cos(rad) * innerR;
          const sy = cy + Math.sin(rad) * innerR;
          

          const nodeCenterX = cx + Math.cos(rad) * radiusX;
          const nodeCenterY = cy + Math.sin(rad) * radiusY + floatY;


          const dx = nodeCenterX - cx;
          const dy = nodeCenterY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ratio = (dist - 80) / dist;

          const ex = cx + dx * ratio;
          const ey = cy + dy * ratio;

          const lineOpacity = 0.8;

          return (
            <g key={i}>
              <line
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth="4"
                opacity={lineOpacity}
                filter="url(#neon-glow)"
              />
              <circle
                cx={sx}
                cy={sy}
                r={7}
                fill="#ffffff"
                opacity={lineOpacity}
                filter="url(#dot-glow)"
              />
              <circle
                cx={ex}
                cy={ey}
                r={7}
                fill="#ffffff"
                opacity={lineOpacity}
                filter="url(#dot-glow)"
              />
            </g>
          );
        })}
      </svg>


      <div style={{ zIndex: 2, position: "absolute", inset: 0 }}>
        {HUB_CONNECTIONS.map((conn, i) => {
          const rad = (conn.angle * Math.PI) / 180;
          
          const floatY = Math.sin((frame + i * 25) / 15) * 50;
          
          const x = cx + Math.cos(rad) * radiusX;
          const y = cy + Math.sin(rad) * radiusY + floatY;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: `translate(-50%, -50%)`,
                width: 160,
                height: 160,
                borderRadius: "50%",
                backgroundColor: "rgba(25, 20, 45, 0.6)", 
                border: "2px solid rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(16px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 15px 50px rgba(0, 0, 0, 0.5), inset 0 0 25px rgba(255, 255, 255, 0.08)",
              }}
            >
              <img 
                src={conn.iconUrl} 
                alt="App Icon" 
                style={{ 
                  width: 110, 
                  height: 110, 
                  objectFit: "contain",
                  filter: conn.angle === 180 ? "drop-shadow(0 4px 8px rgba(0,0,0,0.4))" : "none" 
                }} 
              />
            </div>
          );
        })}
      </div>


      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: `translate(-50%, -50%)`,
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "transparent",
            border: "5px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
          }}
        >
          <div
            style={{
              fontFamily: FONTS.heading,
              fontSize: 48,
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.1em",
              textShadow: "0 0 15px rgba(255,255,255,0.6)",
            }}
          >
            LOGO
          </div>
        </div>
      </div>
    </div>
  );
};
