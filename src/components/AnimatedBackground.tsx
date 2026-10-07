import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  growth: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  type: 'smoke' | 'ember' | 'burst-smoke';
  color: string;
}

export const AnimatedBackground: React.FC<{ burstTrigger?: number }> = ({ burstTrigger = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [isHotboxActive, setIsHotboxActive] = useState(false);

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
    const ambientSmokeColors = [
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
      const maxLife = isSmoke ? 180 + Math.random() * 140 : 120 + Math.random() * 100;

      return {
        x,
        y,
        vx: (Math.random() - 0.5) * (isSmoke ? 0.8 : 1.2),
        vy: isSmoke ? -0.5 - Math.random() * 0.8 : -0.8 - Math.random() * 1.5,
        radius: isSmoke ? 45 + Math.random() * 65 : 1.5 + Math.random() * 2.5,
        growth: isSmoke ? 0.25 : 0,
        alpha: 0,
        maxAlpha: isSmoke ? 0.09 + Math.random() * 0.1 : 0.45 + Math.random() * 0.45,
        life: 0,
        maxLife,
        type,
        color: isSmoke
          ? ambientSmokeColors[Math.floor(Math.random() * ambientSmokeColors.length)]
          : emberColors[Math.floor(Math.random() * emberColors.length)],
      };
    };

    // Partículas iniciais ambientais
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 35; i++) {
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

      // Adiciona novas partículas ambiente regulares
      if (particles.length < 65) {
        if (Math.random() < 0.3) particles.push(createParticle('smoke'));
        if (Math.random() < 0.25) particles.push(createParticle('ember'));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        // Curvatura e turbulência orgânica da fumaça
        const sway = Math.sin(p.life * 0.025 + p.radius * 0.05);
        p.x += p.vx + sway * (p.type === 'burst-smoke' ? 1.6 : p.type === 'smoke' ? 0.6 : 0.8);
        p.y += p.vy;

        // Fumaça expande continuamente à medida que sobe e se dissipa
        p.radius += p.growth;

        const progress = p.life / p.maxLife;
        if (p.type === 'burst-smoke') {
          // Surge rapidamente e dissolve suavemente como nuvem densa
          if (progress < 0.12) {
            p.alpha = (progress / 0.12) * p.maxAlpha;
          } else {
            p.alpha = Math.pow(1 - (progress - 0.12) / 0.88, 1.4) * p.maxAlpha;
          }
        } else {
          if (progress < 0.2) {
            p.alpha = (progress / 0.2) * p.maxAlpha;
          } else {
            p.alpha = (1 - (progress - 0.2) / 0.8) * p.maxAlpha;
          }
        }

        if (p.life >= p.maxLife || p.y + p.radius < -50 || p.alpha <= 0.005) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        if (p.type === 'burst-smoke') {
          // Volumetria 3D hiperdensa para a puxada comemorativa
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `${p.color}${p.alpha})`);
          grad.addColorStop(0.3, `${p.color}${p.alpha * 0.85})`);
          grad.addColorStop(0.65, `${p.color}${p.alpha * 0.35})`);
          grad.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'smoke') {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, `${p.color}${p.alpha})`);
          grad.addColorStop(0.5, `${p.color}${p.alpha * 0.4})`);
          grad.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = grad;
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `${p.color}${p.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#f59e0b';
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // BURST MASSIVO DE FUMAÇA: Quando alguém clica na puxada comemorativa ou doa
  useEffect(() => {
    if (burstTrigger === 0) return;

    setIsHotboxActive(true);
    const hotboxTimer = setTimeout(() => setIsHotboxActive(false), 2900);

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight * 0.58;

    // Fumaça primária densa e aromática (branca, off-white e creme) + toques rasta
    const denseSmokePalettes = [
      'rgba(255, 252, 245, ', // Creme puro aveludado
      'rgba(248, 243, 230, ', // Off-white herbal
      'rgba(240, 235, 222, ', // Vapor aromático denso
      'rgba(255, 255, 255, ', // Nuvem branca espessa
      'rgba(22, 163, 74, ',   // Nuvem verde rasta
      'rgba(234, 179, 8, ',   // Nuvem dourada
      'rgba(220, 38, 38, ',   // Nuvem vermelha brasa
    ];

    // Geração de 160 partículas para criar uma parede colossal de fumaça
    const totalPuffParticles = 160;

    for (let i = 0; i < totalPuffParticles; i++) {
      // Distribuição em leque largo e anéis expansivos
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 260;
      const spawnX = centerX + Math.cos(angle) * dist + (Math.random() - 0.5) * 180;
      const spawnY = centerY + Math.sin(angle) * (dist * 0.6) + (Math.random() - 0.5) * 100;

      // Velocidades multidirecionais e forte ascensão térmica
      const vx = (Math.random() - 0.5) * 8.5;
      const vy = -1.8 - Math.random() * 4.2;

      // Raio inicial gigante (80px a 180px) com taxa de expansão rápida (cresce até 300px!)
      const radius = 80 + Math.random() * 100;
      const growth = 0.8 + Math.random() * 0.8;

      // Opacidade muito maior (0.55 a 0.88!) para dar efeito de fumaça pesada de verdade
      const maxAlpha = 0.55 + Math.random() * 0.33;

      // 70% creme/branco espesso, 30% toques rasta coloridos
      const color = Math.random() < 0.72
        ? denseSmokePalettes[Math.floor(Math.random() * 4)]
        : denseSmokePalettes[4 + Math.floor(Math.random() * 3)];

      particlesRef.current.push({
        x: spawnX,
        y: spawnY,
        vx,
        vy,
        radius,
        growth,
        alpha: 0,
        maxAlpha,
        life: 0,
        maxLife: 190 + Math.random() * 110,
        type: 'burst-smoke',
        color,
      });
    }

    return () => clearTimeout(hotboxTimer);
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

      {/* Camada Hotbox / Nevoeiro Volumétrico adicional na puxada comemorativa */}
      <AnimatePresence>
        {isHotboxActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden"
          >
            {/* Grande nuvem difusa central */}
            <div 
              className="w-[120vw] h-[100vh] rounded-full blur-[110px] opacity-45 mix-blend-screen"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255,250,240,0.6) 0%, rgba(245,235,215,0.35) 45%, rgba(22,163,74,0.15) 75%, transparent 100%)',
              }}
            />
            {/* Segunda nuvem ascendente com leve tonalidade dourada */}
            <div 
              className="absolute -bottom-20 w-[110vw] h-[75vh] rounded-full blur-[130px] opacity-40 mix-blend-screen animate-pulse"
              style={{
                background: 'radial-gradient(ellipse at bottom, rgba(254,243,199,0.55) 0%, rgba(255,255,255,0.3) 50%, transparent 80%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Canvas com fumaça e brasas tricolores navegando por cima dos rostos */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
