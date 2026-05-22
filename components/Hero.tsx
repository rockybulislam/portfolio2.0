"use client";
import { motion } from "motion/react";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Projects Completed", value: "10+" },
  { label: "Experience", value: "1 yrs" },
];

export function Hero() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Profile Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-5 order-2 md:order-1"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img
              alt="Creator Portrait"
              className="relative rounded-2xl w-full aspect-[4/5] object-cover border border-border"
              src="./rocky_img.webp"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-7 order-1 md:order-2 flex flex-col gap-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            The Creator: <span className="text-primary">Designing the</span>
            <br></br>
            <span>Digital Frontier.</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
            I specialize in building bridges between complex technical
            infrastructure and intuitive user experiences. My approach blends
            industrial precision with a focus on digital wellness, ensuring that
            every interaction is not just functional, but restorative. Over the
            past decade, I`&aposve partnered with forward-thinking teams to
            redefine how we interact with technology.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <Card className="bg-card/50 border-border p-6 hover:border-primary/50 transition-colors group cursor-default">
                  <span className="text-3xl font-bold text-primary block group-hover:scale-110 transition-transform origin-left">
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold mt-1 block">
                    {stat.label}
                  </span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
