import React, { useEffect, useRef } from 'react';

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  color: string;
}

interface SmokeCanvasProps {
  burstTrigger?: number;
}

export const SmokeCanvas: React.FC<SmokeCanvasProps> = ({ burstTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<SmokeParticle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(240, 240, 240, ',  // Branco alvinegro
      'rgba(16, 185, 129, ',   // Verde esmeralda 420
      'rgba(52, 211, 153, ',   // Verde neon suave
      'rgba(200, 200, 200, ',  // Cinza névoa
    ];

    const createParticle = (originX?: number, originY?: number, isBurst = false): SmokeParticle => {
      const x = originX ?? Math.random() * width;
      const y = originY ?? height + Math.random() * 50;
      const maxLife = isBurst ? 100 + Math.random() * 80 : 180 + Math.random() * 140;
      const baseRadius = isBurst ? 45 + Math.random() * 65 : 25 + Math.random() * 45;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * (isBurst ? 3.0 : 0.8),
        vy: -0.6 - Math.random() * (isBurst ? 2.5 : 1.0),
        radius: baseRadius,
        alpha: 0,
        maxAlpha: isBurst ? 0.4 + Math.random() * 0.2 : 0.08 + Math.random() * 0.12,
        life: 0,
        maxLife,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    };

    // Preenche partículas iniciais
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 35; i++) {
        const p = createParticle(Math.random() * width, Math.random() * height);
        p.life = Math.random() * p.maxLife;
        particlesRef.current.push(p);
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      if (particles.length < 50 && Math.random() < 0.3) {
        particles.push(createParticle());
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.4;
        p.y += p.vy;
        p.radius += 0.25;

        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else {
          p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
        }

        if (p.life >= p.maxLife || p.y + p.radius < 0) {
          particles.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.radius
        );
        gradient.addColorStop(0, `${p.color}${p.alpha})`);
        gradient.addColorStop(0.5, `${p.color}${p.alpha * 0.4})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Quando burstTrigger é acionado, adiciona partículas densas
  useEffect(() => {
    if (burstTrigger === 0) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.65;
    const colors = [
      'rgba(240, 240, 240, ',
      'rgba(16, 185, 129, ',
      'rgba(52, 211, 153, ',
    ];

    for (let i = 0; i < 25; i++) {
      const offsetX = (Math.random() - 0.5) * 220;
      const offsetY = (Math.random() - 0.5) * 120;
      particlesRef.current.push({
        x: centerX + offsetX,
        y: centerY + offsetY,
        vx: (Math.random() - 0.5) * 3,
        vy: -1.2 - Math.random() * 2.8,
        radius: 40 + Math.random() * 50,
        alpha: 0,
        maxAlpha: 0.35 + Math.random() * 0.25,
        life: 0,
        maxLife: 120 + Math.random() * 90,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, [burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
