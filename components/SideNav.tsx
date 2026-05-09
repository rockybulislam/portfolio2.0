"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Home, Terminal, Settings, User, Folder } from "lucide-react";
import { cn } from "@/lib/utils";

const icons = [
  { icon: Home, label: "Home" },
  { icon: Terminal, label: "Projects" },
  { icon: Folder, label: "Files" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function VerticalDock() {
  const mouseX = useMotionValue(Infinity);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(media.matches);
    handler();

    if (media.addEventListener) {
      media.addEventListener("change", handler);
      return () => media.removeEventListener("change", handler);
    }

    media.addListener(handler);
    return () => media.removeListener(handler);
  }, []);

  const distanceRange = isMobile ? [-80, 0, 80] : [-100, 0, 100];
  const sizeRange = isMobile ? [32, 52, 32] : [40, 65, 40];

  return (
    <div className="fixed left-1/2 bottom-4 z-50 -translate-x-1/2 md:left-4 md:top-1/2 md:bottom-auto md:-translate-x-0 md:-translate-y-1/2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageY)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="inline-flex flex-row gap-2 rounded-xl bg-zinc-900/90 border border-zinc-800 p-2 shadow-xl backdrop-blur-md md:flex-col md:gap-4 md:rounded-2xl md:p-3"
      >
        {icons.map((item, i) => (
          <IconItem
            key={i}
            mouseX={mouseX}
            Icon={item.icon}
            sizeRange={sizeRange}
            distanceRange={distanceRange}
          />
        ))}
      </motion.div>
    </div>
  );
}

function IconItem({
  mouseX,
  Icon,
  sizeRange,
  distanceRange,
}: {
  mouseX: any;
  Icon: any;
  sizeRange: number[];
  distanceRange: number[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to icon center
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  // Map distance to size (closer = larger)
  const widthSync = useTransform(distance, distanceRange, sizeRange);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      className="flex aspect-square items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
    >
      <Icon className="w-1/2 h-1/2" />
    </motion.div>
  );
}
