// src/components/Confetti.tsx
'use client';
import { useEffect, useRef } from 'react';

export default function Confetti({ trigger = 0 }: { trigger: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const colors = ['#06b6d4', '#3b82f6', '#34d399', '#7c3aed', '#00f5ff', '#ffb86b'];
    let particles: any[] = [];
    let raf = 0;
    const create = (count = 80) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: window.innerWidth / 2 + (Math.random() - 0.5) * 200,
          y: window.innerHeight / 2 + (Math.random() - 0.5) * 200,
          vx: (Math.random() - 0.5) * 10,
          vy: Math.random() * -6 - 2,
          size: Math.random() * 8 + 4,
          rot: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.vy += 0.25;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vx;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      particles = particles.filter((p) => p.y < h + 50);
      if (particles.length) raf = requestAnimationFrame(draw);
    };

    const start = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      create(80);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
      // stop after some time
      setTimeout(() => {
        particles = [];
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, w, h);
      }, 2200);
    };

    start();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}
    />
  );
}
