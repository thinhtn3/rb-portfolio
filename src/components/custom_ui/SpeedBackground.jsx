import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

let engineInitialized = false;

export function SpeedBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (engineInitialized) {
      setInit(true);
      return;
    }
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      engineInitialized = true;
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {/* ── Layer 1: Horizontal speed streaks ── */}
      <Particles
        id="speedStreaks"
        style={{ position: "absolute", inset: 0 }}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 120, density: { enable: true, area: 1400 } },
            color: {
              value: ["#FFFFFF", "#FFFFFF", "#FCD116", "#B11226", "#FFFFFF"],
            },
            shape: { type: "circle" },
            opacity: {
              value: { min: 0.04, max: 0.22 },
              animation: {
                enable: true,
                speed: 0.8,
                sync: false,
                startValue: "random",
              },
            },
            size: {
              value: { min: 0.4, max: 1.6 },
            },
            move: {
              enable: true,
              speed: { min: 18, max: 55 },
              direction: "right",
              straight: true,
              outModes: { default: "out", left: "destroy", right: "none" },
              random: false,
            },
            life: {
              duration: { sync: false, value: { min: 1, max: 4 } },
              count: 0,
            },
          },
          detectRetina: true,
        }}
      />

      {/* ── Layer 2: F1 ground sparks ── */}
      <Particles
        id="groundSparks"
        style={{ position: "absolute", inset: 0 }}
        options={{
          fullScreen: { enable: false },
          fpsLimit: 60,
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 0 },
            color: {
              value: ["#FCD116", "#FFB800", "#FF8C00", "#FFFFFF", "#FFA500"],
            },
            shape: { type: "circle" },
            opacity: {
              value: 1,
              animation: {
                enable: true,
                speed: 3,
                sync: false,
                startValue: "max",
                destroy: "min",
              },
            },
            size: { value: { min: 1, max: 3.5 } },
            move: {
              enable: true,
              gravity: {
                enable: true,
                acceleration: 18,
                inverse: false,
                maxSpeed: 40,
              },
              speed: { min: 6, max: 22 },
              direction: "top",
              random: true,
              straight: false,
              outModes: { default: "destroy", bottom: "destroy" },
            },
            life: {
              count: 1,
              duration: {
                sync: false,
                value: { min: 0.4, max: 1.6 },
              },
            },
          },
          emitters: [
            {
              // Left side — like a car passing
              position: { x: 25, y: 92 },
              rate: { delay: 0.06, quantity: 3 },
              size: { width: 8, height: 2 },
            },
            {
              // Right side — mirrored sparks
              position: { x: 75, y: 92 },
              rate: { delay: 0.09, quantity: 2 },
              size: { width: 8, height: 2 },
            },
          ],
          detectRetina: true,
        }}
      />
    </div>
  );
}
