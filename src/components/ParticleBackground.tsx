"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const cvs = canvas;
    const context = ctx;

    const isMobile = window.innerWidth < 768;
    const density = isMobile ? 12000 : 7000;

    function resize() {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    }

    function initParticles() {
      const count = Math.min(
        Math.floor((window.innerWidth * window.innerHeight) / density),
        isMobile ? 40 : 120
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        size: Math.random() * 2.5 + 1.5,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.4 + 0.25,
        hue: Math.random() * 40 + 250,
      }));
    }

    function draw() {
      context.clearRect(0, 0, cvs.width, cvs.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < -20) p.x = cvs.width + 20;
        if (p.x > cvs.width + 20) p.x = -20;
        if (p.y < -20) p.y = cvs.height + 20;
        if (p.y > cvs.height + 20) p.y = -20;

        const glow = context.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 3
        );
        glow.addColorStop(
          0,
          `hsla(${p.hue}, 80%, 70%, ${p.opacity * 1.2})`
        );
        glow.addColorStop(
          0.3,
          `hsla(${p.hue}, 70%, 60%, ${p.opacity * 0.5})`
        );
        glow.addColorStop(1, `hsla(${p.hue}, 70%, 60%, 0)`);

        context.beginPath();
        context.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        context.fillStyle = glow;
        context.fill();

        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fillStyle = `hsla(${p.hue}, 80%, 85%, ${p.opacity})`;
        context.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineOpacity = (1 - dist / 140) * 0.15;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.strokeStyle = `hsla(270, 60%, 65%, ${lineOpacity})`;
            context.lineWidth = 0.8;
            context.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        initParticles();
      }, 200);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ transform: "translateZ(0)", willChange: "transform" }}
      aria-hidden="true"
    />
  );
}
