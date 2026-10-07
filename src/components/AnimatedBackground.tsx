import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  type: 'smoke' | 'ember';
  color: string;
}

export const AnimatedBackground: React.FC<{ burstTrigger?: number }> = ({ burstTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

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

    const smokeColors = [
      'rgba(245, 239, 225, ', // Creme pergaminho
      'rgba(217, 119, 6, ',   // Âmbar dourado
      'rgba(180, 83, 9, ',    // Canela quente
    ];

    const emberColors = [
      'rgba(251, 191, 36, ',  // Dourado brilhante
      'rgba(245, 158, 11, ',  // Âmbar fogo
      'rgba(239, 68, 68, ',   // Vermelho brasa
    ];

    const createParticle = (type: 'smoke' | 'ember', originX?: number, originY?: number): Particle => {
      const isSmoke = type === 'smoke';
      const x = originX ?? Math.random() * width;
      const y = originY ?? height + Math.random() * 40;
      const maxLife = isSmoke ? 160 + Math.random() * 140 : 120 + Math.random() * 100;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * (isSmoke ? 0.7 : 1.2),
        vy: isSmoke ? -0.5 - Math.random() * 0.8 : -0.8 - Math.random() * 1.5,
        radius: isSmoke ? 35 + Math.random() * 55 : 1.5 + Math.random() * 2.5,
        alpha: 0,
        maxAlpha: isSmoke ? 0.07 + Math.random() * 0.08 : 0.4 + Math.random() * 0.4,
        life: 0,
        maxLife,
        type,
        color: isSmoke
          ? smokeColors[Math.floor(Math.random() * smokeColors.length)]
          : emberColors[Math.floor(Math.random() * emberColors.length)],
      };
    };

    // Partículas iniciais
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 28; i++) {
        const p = createParticle('smoke', Math.random() * width, Math.random() * height);
        p.life = Math.random() * p.maxLife;
        particlesRef.current.push(p);
      }
      for (let i = 0; i < 20; i++) {
        const p = createParticle('ember', Math.random() * width, Math.random() * height);
        p.life = Math.random() * p.maxLife;
        particlesRef.current.push(p);
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      // Adiciona novas partículas
      if (particles.length < 55) {
        if (Math.random() < 0.25) particles.push(createParticle('smoke'));
        if (Math.random() < 0.2) particles.push(createParticle('ember'));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * (p.type === 'smoke' ? 0.5 : 0.8);
        p.y += p.vy;

        if (p.type === 'smoke') {
          p.radius += 0.2;
        }

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

        ctx.beginPath();
        if (p.type === 'smoke') {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `${p.color}${p.alpha})`);
          grad.addColorStop(0.5, `${p.color}${p.alpha * 0.4})`);
          grad.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        } else {
          // Brasa incandescente
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#f59e0b';
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Burst quando alguém clica ou doa
  useEffect(() => {
    if (burstTrigger === 0) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.6;

    for (let i = 0; i < 20; i++) {
      particlesRef.current.push({
        x: centerX + (Math.random() - 0.5) * 200,
        y: centerY + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 2.5,
        vy: -1.5 - Math.random() * 2,
        radius: 30 + Math.random() * 40,
        alpha: 0,
        maxAlpha: 0.35,
        life: 0,
        maxLife: 100,
        type: 'smoke',
        color: 'rgba(245, 239, 225, ',
      });
    }
  }, [burstTrigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gradiente de fundo rico estilo vinho/burgundy acolhedor */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a0f14] via-[#48161d] to-[#2c0b0f]" />
      
      {/* Luz ambiente de vela/lâmpada no topo e cantos */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[400px] bg-amber-500/10 blur-[130px] rounded-full animate-flicker" />
      <div className="absolute -top-20 right-1/4 w-[450px] h-[350px] bg-red-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-amber-600/5 blur-[100px] rounded-full" />

      {/* Canvas com fumaça e brasas vivas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
