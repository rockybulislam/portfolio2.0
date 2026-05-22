"use client";
import { useEffect, useRef, useState, TouchEvent, MouseEvent } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Home, Settings, User, Folder } from "lucide-react";

// Use a proper component for the GitHub icon so we can pass props (className, etc.)
const GithubIcon: ComponentType<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="currentColor"
        d="M12 2C6.475 2 2 6.475 2 12C2 16.425 4.8625 20.1625 8.8375 21.4875C9.3375 21.575 9.525 21.275 9.525 21.0125C9.525 20.775 9.5125 19.9875 9.5125 19.15C7 19.6125 6.35 18.5375 6.15 17.975C6.0375 17.6875 5.55 16.8 5.125 16.5625C4.775 16.375 4.275 15.9125 5.1125 15.9C5.9 15.8875 6.4625 16.625 6.65 16.925C7.55 18.4375 8.9875 18.0125 9.5625 17.75C9.65 17.1 9.9125 16.6625 10.2 16.4125C7.975 16.1625 5.65 15.3 5.65 11.475C5.65 10.3875 6.0375 9.4875 6.675 8.7875C6.575 8.5375 6.225 7.5125 6.775 6.1375C6.775 6.1375 7.6125 5.875 9.525 7.1625C10.325 6.9375 11.175 6.825 12.025 6.825C12.875 6.825 13.725 6.9375 14.525 7.1625C16.4375 5.8625 17.275 6.1375 17.275 6.1375C17.825 7.5125 17.475 8.5375 17.375 8.7875C18.0125 9.4875 18.4 10.375 18.4 11.475C18.4 15.3125 16.0625 16.1625 13.8375 16.4125C14.2 16.725 14.5125 17.325 14.5125 18.2625C14.5125 19.6 14.5 20.675 14.5 21.0125C14.5 21.275 14.6875 21.5875 15.1875 21.4875C17.1727 20.8173 18.8977 19.5415 20.1198 17.8395C21.3419 16.1376 21.9995 14.0953 22 12C22 6.475 17.525 2 12 2Z"
      />
    </g>
  </svg>
);

const icons: Array<{
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}> = [
  { icon: Home, label: "Home" },
  { icon: GithubIcon, label: "GitHub" },
  { icon: Folder, label: "Files" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
];

export default function VerticalDock() {
  const mousePos = useMotionValue<number>(Infinity);
  const [isMobile, setIsMobile] = useState(false);
  const [showDock, setShowDock] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const handler = () => setIsMobile(media.matches);
    handler();

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const atBottom = currentY + viewportHeight >= docHeight - 8;

      if (atBottom) {
        setShowDock(false);
      } else if (lastScrollY.current - currentY >= 20) {
        setShowDock(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const shouldShowDock = !isMobile || showDock;

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
    <div
      className={`fixed left-1/2 bottom-4 z-50 -translate-x-1/2 transition-all duration-300 md:left-4 md:top-1/2 md:bottom-auto md:translate-x-0 md:-translate-y-1/2 ${
        shouldShowDock
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleLeave}
        className="inline-flex flex-row gap-2 rounded-xl bg-card/90 border border-border p-2 shadow-xl backdrop-blur-md md:flex-col md:gap-4 md:rounded-2xl md:p-3"
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
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
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
      className="flex aspect-square items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-accent hover:text-foreground active:bg-accent transition-colors"
    >
      <Icon className="w-1/2 h-1/2 pointer-events-none" />
    </motion.div>
  );
}
