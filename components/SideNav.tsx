"use client";
import { useEffect, useRef, useState, TouchEvent, MouseEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Home,
  Terminal,
  Settings,
  User,
  Folder,
  type LucideIcon,
} from "lucide-react";

const icons: Array<{ icon: LucideIcon; label: string }> = [
  { icon: Home, label: "Home" },
  { icon: Terminal, label: "Projects" },
  { icon: Folder, label: "Files" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function VerticalDock() {
  const mousePos = useMotionValue<number>(Infinity);
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
  const sizeRange = isMobile ? [44, 64, 44] : [40, 65, 40];

  const handleMouseMove = (e: MouseEvent) => {
    mousePos.set(isMobile ? e.clientX : e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    mousePos.set(isMobile ? e.touches[0].clientX : e.touches[0].clientY);
  };

  const handleLeave = () => mousePos.set(Infinity);

  return (
    <div className="fixed left-1/2 bottom-4 z-50 -translate-x-1/2 md:left-4 md:top-1/2 md:bottom-auto md:translate-x-0 md:-translate-y-1/2">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        className="inline-flex flex-row gap-2 rounded-xl bg-zinc-900/90 border border-zinc-800 p-2 shadow-xl backdrop-blur-md md:flex-col md:gap-4 md:rounded-2xl md:p-3"
      >
        {icons.map((item, i) => (
          <IconItem
            key={i}
            mousePos={mousePos}
            Icon={item.icon}
            sizeRange={sizeRange}
            distanceRange={distanceRange}
            isMobile={isMobile}
          />
        ))}
      </motion.div>
    </div>
  );
}

function IconItem({
  mousePos,
  Icon,
  sizeRange,
  distanceRange,
  isMobile,
}: {
  mousePos: MotionValue<number>;
  Icon: LucideIcon;
  sizeRange: number[];
  distanceRange: number[];
  isMobile: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mousePos, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    return (
      val -
      (isMobile ? bounds.x + bounds.width / 2 : bounds.y + bounds.height / 2)
    );
  });

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
      className="flex aspect-square items-center justify-center rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white active:bg-zinc-700 transition-colors"
    >
      <Icon className="w-1/2 h-1/2 pointer-events-none" />
    </motion.div>
  );
}
