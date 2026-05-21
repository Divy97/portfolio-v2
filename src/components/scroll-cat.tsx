"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

/** Ginger fur: gradient + soft inner light for volume */
const fur =
  "bg-gradient-to-br from-amber-300 via-orange-500 to-orange-800 shadow-[inset_3px_3px_8px_rgba(255,255,255,0.35),inset_-4px_-6px_12px_rgba(124,45,18,0.35)] ring-1 ring-orange-900/15";

const furFlat =
  "bg-gradient-to-br from-amber-300 via-orange-500 to-orange-800 ring-1 ring-orange-900/15";

export default function ScrollCat() {
  const { scrollYProgress } = useScroll();
  const [pose, setPose] = useState("sitting");

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.2) setPose("sitting");
    else if (latest < 0.5) setPose("walking");
    else if (latest < 0.8) setPose("stretching");
    else setPose("sleeping");
  });

  const spring = { type: "spring" as const, stiffness: 120, damping: 15 };

  const catVariants = {
    body: {
      sitting: { left: "35%", top: "40%", width: "30%", height: "45%", borderRadius: "9999px", rotate: 0 },
      walking: { left: "25%", top: "45%", width: "45%", height: "25%", borderRadius: "9999px", rotate: 0 },
      stretching: { left: "25%", top: "45%", width: "45%", height: "20%", borderRadius: "9999px", rotate: -20 },
      sleeping: { left: "30%", top: "55%", width: "40%", height: "30%", borderRadius: "9999px", rotate: 0 },
    },
    head: {
      sitting: { left: "50%", top: "30%", x: "-50%", y: "-50%", rotate: 0 },
      walking: { left: "75%", top: "45%", x: "-50%", y: "-50%", rotate: 0 },
      stretching: { left: "80%", top: "65%", x: "-50%", y: "-50%", rotate: -20 },
      sleeping: { left: "35%", top: "65%", x: "-50%", y: "-50%", rotate: 20 },
    },
    legFL: {
      sitting: { left: "40%", top: "75%", width: "8%", height: "20%", borderRadius: "9999px", rotate: 0 },
      walking: { left: "65%", top: "65%", width: "8%", height: "25%", borderRadius: "9999px", rotate: -20 },
      stretching: { left: "65%", top: "75%", width: "25%", height: "8%", borderRadius: "9999px", rotate: 0 },
      sleeping: { left: "35%", top: "75%", width: "10%", height: "8%", borderRadius: "9999px", rotate: 0 },
    },
    legFR: {
      sitting: { left: "52%", top: "75%", width: "8%", height: "20%", borderRadius: "9999px", rotate: 0 },
      walking: { left: "75%", top: "65%", width: "8%", height: "25%", borderRadius: "9999px", rotate: 20 },
      stretching: { left: "70%", top: "75%", width: "20%", height: "8%", borderRadius: "9999px", rotate: 0 },
      sleeping: { left: "40%", top: "75%", width: "10%", height: "8%", borderRadius: "9999px", rotate: 0 },
    },
    legBL: {
      sitting: { left: "35%", top: "65%", width: "8%", height: "15%", borderRadius: "9999px", rotate: 0 },
      walking: { left: "30%", top: "65%", width: "8%", height: "25%", borderRadius: "9999px", rotate: 20 },
      stretching: { left: "25%", top: "60%", width: "8%", height: "25%", borderRadius: "9999px", rotate: 0 },
      sleeping: { left: "55%", top: "75%", width: "10%", height: "8%", borderRadius: "9999px", rotate: 0 },
    },
    legBR: {
      sitting: { left: "57%", top: "65%", width: "8%", height: "15%", borderRadius: "9999px", rotate: 0 },
      walking: { left: "40%", top: "65%", width: "8%", height: "25%", borderRadius: "9999px", rotate: -20 },
      stretching: { left: "35%", top: "60%", width: "8%", height: "25%", borderRadius: "9999px", rotate: 0 },
      sleeping: { left: "60%", top: "75%", width: "10%", height: "8%", borderRadius: "9999px", rotate: 0 },
    },
    tail: {
      sitting: { left: "5%", top: "75%", width: "40%", height: "8%", borderRadius: "9999px", rotate: 0 },
      walking: { left: "20%", top: "25%", width: "8%", height: "30%", borderRadius: "9999px", rotate: 0 },
      stretching: { left: "20%", top: "15%", width: "8%", height: "40%", borderRadius: "9999px", rotate: 0 },
      sleeping: { left: "20%", top: "80%", width: "60%", height: "8%", borderRadius: "9999px", rotate: 0 },
    },
  };

  const featureVariants = {
    eyeLeft: {
      sitting: { left: "25%", top: "38%", scaleY: 1 },
      walking: { left: "40%", top: "38%", scaleY: 1 },
      stretching: { left: "40%", top: "48%", scaleY: 1 },
      sleeping: { left: "20%", top: "54%", scaleY: 0.12 },
    },
    eyeRight: {
      sitting: { left: "60%", top: "38%", scaleY: 1 },
      walking: { left: "75%", top: "38%", scaleY: 1 },
      stretching: { left: "75%", top: "48%", scaleY: 1 },
      sleeping: { left: "55%", top: "54%", scaleY: 0.12 },
    },
    nose: {
      sitting: { left: "50%", top: "58%", x: "-50%" },
      walking: { left: "62%", top: "58%", x: "-50%" },
      stretching: { left: "62%", top: "68%", x: "-50%" },
      sleeping: { left: "38%", top: "68%", x: "-50%" },
    },
  };

  return (
    <div className="relative w-32 h-32 md:w-48 md:h-48 mb-8 md:mb-12 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500 ring-2 ring-primary/20 bg-gradient-to-b from-amber-50/90 to-orange-100/40 dark:from-orange-950/40 dark:to-stone-950/60 flex items-center justify-center backdrop-blur-sm">
      <div className="relative w-full h-full">
        <div className="absolute bottom-[10%] left-[18%] w-[64%] h-[10%] bg-orange-950/15 dark:bg-black/35 rounded-[100%] blur-md" />

        <motion.div variants={catVariants.tail} animate={pose} transition={spring} className={`absolute ${furFlat} overflow-hidden`}>
          <div className="absolute right-0 top-0 h-full w-[35%] rounded-full bg-orange-950/25" />
        </motion.div>
        <motion.div variants={catVariants.legBL} animate={pose} transition={spring} className={`absolute ${fur}`}>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[22%] w-[140%] -translate-x-1/2 rounded-full bg-amber-200/90 ring-1 ring-orange-300/50" />
        </motion.div>
        <motion.div variants={catVariants.legBR} animate={pose} transition={spring} className={`absolute ${fur}`}>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[22%] w-[140%] -translate-x-1/2 rounded-full bg-amber-200/90 ring-1 ring-orange-300/50" />
        </motion.div>
        <motion.div variants={catVariants.body} animate={pose} transition={spring} className={`absolute overflow-hidden ${fur}`}>
          <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-[42%] w-[52%] -translate-x-1/2 rounded-[100%] bg-amber-100/85 ring-1 ring-white/40" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.22]">
            <div className="absolute left-[18%] top-[8%] h-[78%] w-[12%] rounded-full bg-orange-950 blur-[1.5px]" />
            <div className="absolute left-[38%] top-[12%] h-[72%] w-[10%] rounded-full bg-orange-950 blur-[1.5px]" />
            <div className="absolute right-[22%] top-[10%] h-[76%] w-[11%] rounded-full bg-orange-950 blur-[1.5px]" />
          </div>
        </motion.div>
        <motion.div variants={catVariants.legFL} animate={pose} transition={spring} className={`absolute ${fur}`}>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[22%] w-[140%] -translate-x-1/2 rounded-full bg-amber-200/90 ring-1 ring-orange-300/50" />
        </motion.div>
        <motion.div variants={catVariants.legFR} animate={pose} transition={spring} className={`absolute ${fur}`}>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-[22%] w-[140%] -translate-x-1/2 rounded-full bg-amber-200/90 ring-1 ring-orange-300/50" />
        </motion.div>

        <motion.div variants={catVariants.head} animate={pose} transition={spring} className="absolute w-[34%] h-[34%]">
          <div className={`absolute top-[-2%] left-[4%] z-0 h-[38%] w-[38%] rotate-45 rounded-md ${furFlat}`}>
            <div className="absolute bottom-[15%] left-1/2 h-[45%] w-[55%] -translate-x-1/2 rounded-t-sm bg-rose-300/90" />
          </div>
          <div className={`absolute top-[-2%] right-[4%] z-0 h-[38%] w-[38%] rotate-45 rounded-md ${furFlat}`}>
            <div className="absolute bottom-[15%] left-1/2 h-[45%] w-[55%] -translate-x-1/2 rounded-t-sm bg-rose-300/90" />
          </div>

          <div className={`absolute inset-0 z-[1] rounded-full ${fur}`}>
            <div className="pointer-events-none absolute left-1/2 top-[28%] h-[42%] w-[72%] -translate-x-1/2 rounded-[100%] bg-gradient-to-b from-amber-200/50 to-transparent" />
          </div>

          {/* Whiskers — kept short so the frame does not clip */}
          <div className="pointer-events-none absolute left-0 top-[48%] z-[2] w-full">
            <div className="absolute left-[4%] top-0 h-px w-[22%] origin-right rotate-[-8deg] bg-stone-800/45" />
            <div className="absolute left-[4%] top-[6px] h-px w-[24%] origin-right rotate-[0deg] bg-stone-800/40" />
            <div className="absolute left-[4%] top-[12px] h-px w-[22%] origin-right rotate-[8deg] bg-stone-800/45" />
            <div className="absolute right-[4%] top-0 h-px w-[22%] origin-left rotate-[8deg] bg-stone-800/45" />
            <div className="absolute right-[4%] top-[6px] h-px w-[24%] origin-left rotate-[0deg] bg-stone-800/40" />
            <div className="absolute right-[4%] top-[12px] h-px w-[22%] origin-left rotate-[-8deg] bg-stone-800/45" />
          </div>

          <motion.div
            variants={featureVariants.eyeLeft}
            animate={pose}
            transition={spring}
            className="absolute z-[3] h-[16%] w-[16%]"
          >
            <div className="absolute inset-0 rounded-full bg-white shadow-inner ring-1 ring-orange-200/60" />
            <div className="absolute left-1/2 top-1/2 h-[68%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-600 shadow-sm ring-1 ring-lime-800/30" />
            <div className="absolute left-1/2 top-1/2 h-[42%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-900" />
            <div className="absolute left-[62%] top-[28%] h-[22%] w-[22%] rounded-full bg-white/95" />
          </motion.div>
          <motion.div
            variants={featureVariants.eyeRight}
            animate={pose}
            transition={spring}
            className="absolute z-[3] h-[16%] w-[16%]"
          >
            <div className="absolute inset-0 rounded-full bg-white shadow-inner ring-1 ring-orange-200/60" />
            <div className="absolute left-1/2 top-1/2 h-[68%] w-[58%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-600 shadow-sm ring-1 ring-lime-800/30" />
            <div className="absolute left-1/2 top-1/2 h-[42%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-900" />
            <div className="absolute left-[62%] top-[28%] h-[22%] w-[22%] rounded-full bg-white/95" />
          </motion.div>

          <motion.div variants={featureVariants.nose} animate={pose} transition={spring} className="absolute z-[3]">
            <div className="h-[9px] w-[12px] rounded-b-full bg-rose-400 shadow-sm ring-1 ring-rose-500/40 [clip-path:polygon(15%_0,85%_0,100%_100%,0_100%)]" />
            <div className="absolute left-1/2 top-full mt-px h-px w-[10px] -translate-x-1/2 bg-stone-800/35" />
            <div className="absolute left-[calc(50%-4px)] top-[calc(100%+2px)] h-px w-[4px] rotate-[35deg] bg-stone-800/30" />
            <div className="absolute left-[calc(50%+0px)] top-[calc(100%+2px)] h-px w-[4px] rotate-[-35deg] bg-stone-800/30" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
