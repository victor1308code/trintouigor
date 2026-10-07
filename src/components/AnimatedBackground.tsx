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

    // Cores vibrantes no estilo Reggae (Verde, Dourado, Vermelho e Fumaça Creme)
    const smokeColors = [
      'rgba(245, 239, 225, ', // Creme suave
      'rgba(22, 163, 74, ',   // Verde Rasta
      'rgba(234, 179, 8, ',   // Dourado solar
      'rgba(220, 38, 38, ',   // Vermelho quente
    ];

    const emberColors = [
      'rgba(250, 204, 21, ',  // Amarelo vibrante
      'rgba(245, 158, 11, ',  // Âmbar
      'rgba(239, 68, 68, ',   // Vermelho brasa
      'rgba(34, 197, 94, ',   // Faísca verde
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
        maxAlpha: isSmoke ? 0.08 + Math.random() * 0.09 : 0.45 + Math.random() * 0.45,
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
      for (let i = 0; i < 30; i++) {
        const p = createParticle('smoke', Math.random() * width, Math.random() * height);
        p.life = Math.random() * p.maxLife;
        particlesRef.current.push(p);
      }
      for (let i = 0; i < 25; i++) {
        const p = createParticle('ember', Math.random() * width, Math.random() * height);
        p.life = Math.random() * p.maxLife;
        particlesRef.current.push(p);
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      // Adiciona novas partículas
      if (particles.length < 60) {
        if (Math.random() < 0.3) particles.push(createParticle('smoke'));
        if (Math.random() < 0.25) particles.push(createParticle('ember'));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * (p.type === 'smoke' ? 0.5 : 0.8);
        p.y += p.vy;

        if (p.type === 'smoke') {
          p.radius += 0.22;
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

  // Burst quando alguém clica no botão de fumaça ou doa
  useEffect(() => {
    if (burstTrigger === 0) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.6;
    const rastaPuffColors = [
      'rgba(22, 163, 74, ',
      'rgba(234, 179, 8, ',
      'rgba(220, 38, 38, ',
      'rgba(245, 239, 225, ',
    ];

    for (let i = 0; i < 28; i++) {
      particlesRef.current.push({
        x: centerX + (Math.random() - 0.5) * 220,
        y: centerY + (Math.random() - 0.5) * 120,
        vx: (Math.random() - 0.5) * 3,
        vy: -1.6 - Math.random() * 2.2,
        radius: 35 + Math.random() * 45,
        alpha: 0,
        maxAlpha: 0.38,
        life: 0,
        maxLife: 110,
        type: 'smoke',
        color: rastaPuffColors[Math.floor(Math.random() * rastaPuffColors.length)],
      });
    }
  }, [burstTrigger]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Camada de Fundo Pop-Art Reggae com as Fotos do Igor (Desktop e Mobile) */}
      <picture className="absolute inset-0 w-full h-full">
        <source media="(max-width: 768px)" srcSet="/igor-popart-mobile.jpg" />
        <img
          src="/igor-popart-wallpaper.jpg"
          alt="Igor Pop-Art Reggae Background"
          className="w-full h-full object-cover object-center opacity-45 mix-blend-screen scale-105 transition-all duration-700"
        />
      </picture>

      {/* Camada de calor e contraste para destacar os tons Vermelho, Dourado e Verde */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-color-dodge hidden sm:block"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(234, 179, 8, 0.25) 0%, rgba(220, 38, 38, 0.2) 50%, rgba(22, 163, 74, 0.15) 100%)'
        }}
      />

      {/* Gradiente escuro elegante para garantir 100% de legibilidade dos textos e cartões */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140608]/75 via-[#1a080c]/80 to-[#0e0405]/90 pointer-events-none" />

      {/* Luzes ambiente Reggae no topo (Verde, Dourado e Vermelho) */}
      <div className="absolute -top-32 -left-20 w-[500px] h-[400px] bg-[#16a34a]/20 blur-[140px] rounded-full" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#eab308]/25 blur-[150px] rounded-full animate-flicker" />
      <div className="absolute -top-32 -right-20 w-[500px] h-[400px] bg-[#dc2626]/20 blur-[140px] rounded-full" />

      {/* Canvas com fumaça e brasas tricolores navegando por cima dos rostos */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
