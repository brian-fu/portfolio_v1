"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  depth: number;
  phase: number;
  twinkleSpeed: number;
  tint: "light" | "blue";
};

const MIN_STARS = 90;
const MAX_STARS = 220;
const STAR_DENSITY = 1 / 12000;
const PARALLAX_DISTANCE = 45;
const DRIFT_DISTANCE = 6;
const TAU = Math.PI * 2;

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrame = 0;
    let stars: Star[] = [];
    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerOffsetX = 0;
    let pointerOffsetY = 0;

    const buildStars = () => {
      const count = Math.min(
        MAX_STARS,
        Math.max(MIN_STARS, Math.floor(width * height * STAR_DENSITY)),
      );

      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.4 + Math.random() * 1.5,
        depth: 0.1 + Math.random() * 1.5,
        phase: Math.random() * TAU,
        twinkleSpeed: 0.5 + Math.random() * 0.35,
        tint: Math.random() < 0.22 ? "blue" : "light",
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildStars();
    };

    const onPointerMove = (event: PointerEvent) => {
      const centeredX = event.clientX / width - 0.5;
      const centeredY = event.clientY / height - 0.5;
      pointerTargetX = centeredX * PARALLAX_DISTANCE;
      pointerTargetY = centeredY * PARALLAX_DISTANCE;
    };

    const onPointerLeave = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
    };

    const draw = (time: number) => {
      pointerOffsetX += (pointerTargetX - pointerOffsetX) * 0.07;
      pointerOffsetY += (pointerTargetY - pointerOffsetY) * 0.07;

      context.clearRect(0, 0, width, height);

      const seconds = time / 1000;
      for (const star of stars) {
        const driftX = Math.sin(seconds * 0.6 + star.phase) * DRIFT_DISTANCE;
        const driftY = Math.cos(seconds * 0.5 + star.phase) * DRIFT_DISTANCE;
        const shiftedX = (star.x + (pointerOffsetX + driftX) * star.depth + width) % width;
        const shiftedY = (star.y + (pointerOffsetY + driftY) * star.depth + height) % height;

        const twinkle =
          0.45 + 0.55 * (0.5 + 0.5 * Math.sin(seconds * star.twinkleSpeed + star.phase));
        const alpha = star.tint === "blue" ? 0.14 + twinkle * 0.38 : 0.12 + twinkle * 0.46;
        const color =
          star.tint === "blue"
            ? `rgba(88, 118, 196, ${alpha})`
            : `rgba(244, 248, 255, ${alpha})`;

        context.fillStyle = color;
        context.beginPath();
        context.arc(shiftedX, shiftedY, star.radius, 0, TAU);
        context.fill();
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="background-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="starfield-canvas" />
      <div className="background-shader" />
    </div>
  );
}
