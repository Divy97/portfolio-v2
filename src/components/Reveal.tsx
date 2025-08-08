"use client";
import React, { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  /** Delay in ms between visibility and full reveal */
  delay?: number;
  /** Optional className to merge */
  className?: string;
  /** Optional once flag to animate only the first time */
  once?: boolean;
}

export default function Reveal({ children, delay = 0, className = "", once = true }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        setIsVisible(true);
        setHasRevealed(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay) {
              const timeout = setTimeout(() => {
                setIsVisible(true);
                setHasRevealed(true);
              }, delay);
              element.dataset.revealTimeoutId = String(timeout);
            } else {
              setIsVisible(true);
              setHasRevealed(true);
            }
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      const id = element?.dataset?.revealTimeoutId;
      if (id) clearTimeout(Number(id));
    };
  }, [delay, once]);

  return (
    <div
      ref={ref}
      className={
        `transition-all duration-700 ease-out will-change-transform will-change-opacity ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        } ${className}`
      }
    >
      {children}
    </div>
  );
} 