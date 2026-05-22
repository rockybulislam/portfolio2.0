"use client";
import { motion } from "motion/react";
import Image from "next/image";
import {
  ArrowRight,
  Download,
  Cpu,
  Code,
  GraduationCap,
  Bot,
  Zap,
  Activity,
} from "lucide-react";
import { Button } from "./ui/button";

// const stats = [
//   {
//     label: "Projects Completed",
//     value: "10+",
//     icon: <Zap className="w-4 h-4" />,
//   },
//   {
//     label: "Experience",
//     value: "1 Year",
//     icon: <Activity className="w-4 h-4" />,
//   },
// ];

const bioChips = [
  { icon: <GraduationCap className="w-4 h-4" />, text: "EEE Student @ DIU" },
  { icon: <Cpu className="w-4 h-4" />, text: "Full-Stack Developer" },
  { icon: <Bot className="w-4 h-4" />, text: "Robotics Enthusiast" },
];
export function Hero() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.07),transparent_35%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.06),transparent_42%)]" />

      <div className="absolute inset-0 -z-10 bg-linear-to-r from-transparent via-slate-400/5 to-transparent opacity-20 mask-[radial-gradient(circle_at_center,black,transparent_82%)]" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* ========= Profile Image ============ */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-5 order-2 md:order-1"
        >
          <div className="relative group max-w-90 md:max-w-105 mx-auto w-full aspect-4/5">
            {/* Glow Backdrop */}
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            {/* Main Portrait */}
            <Image
              alt="Creator Portrait"
              src="/rocky_img.webp"
              fill
              sizes="(min-width: 768px) 420px, 360px"
              className="rounded-2xl object-cover border border-border"
              priority
            />

            {/* Absolute Text Overlay */}
            <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-border/40 bg-background/60 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur-md transition-colors group-hover:border-primary/40">
              Md. Rockybul Islam
            </div>
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50 rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50 rounded-br-lg" />
          </div>
        </motion.div>

        {/* ========= Content ============ */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-7 order-1 md:order-2 flex flex-col gap-6"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            AN ORGANISM THAT TRUNSMUTES <br></br>
            <span className="text-primary"> TRUNSMUTES COFFEE</span>
            <br></br> INTO CODE..
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {bioChips.map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-4 py-2.5 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition hover:border-primary/50 hover:bg-card"
              >
                <span className="text-primary">{chip.icon}</span>
                {chip.text}
              </div>
            ))}
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <Button
              size="lg"
              className="group w-full sm:w-auto h-12 px-6 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/25"
            >
              <span>View My Work</span>
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group w-full sm:w-auto h-12 px-6 rounded-full border-border/70 bg-background/70 text-sm font-semibold shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:text-foreground"
            >
              <Download className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Download Resume</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
