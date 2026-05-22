"use client";
import React, { useState, useEffect } from "react";

export default function CyberGrid() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 h-full w-full"
      style={
        {
          "--x": `${mousePos.x}px`,
          "--y": `${mousePos.y}px`,
        } as React.CSSProperties
      }
    >
      {/* =========== Base Grid Layer =========== */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
        className="absolute inset-0 h-full w-full [--grid-line:rgba(0,0,0,0.015)] dark:[--grid-line:rgba(255,255,255,0.012)]"
      />

      {/* =========== Tiny, Sharp Cursor Spotlight Layer =========== */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-glow) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-glow) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle 65px at var(--x) var(--y), black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(circle 65px at var(--x) var(--y), black 20%, transparent 80%)",
        }}
        className="absolute inset-0 h-full w-full [--grid-glow:rgba(0,0,0,0.08)] dark:[--grid-glow:rgba(255,255,255,0.12)]"
      />
    </div>
  );
}
