import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Clock, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CannabisLeafIcon, leafPathD } from './CannabisLeafIcon';

interface PartyPhotosSectionProps {
  onBackToMural?: () => void;
}

export const PartyPhotosSection: React.FC<PartyPhotosSectionProps> = ({ onBackToMural }) => {
  // 24 de Outubro de 2026 às 20h00 (horário oficial de início da festa)
  const targetDate = new Date(2026, 9, 24, 20, 0, 0).getTime();

  const [timeLeft, setTimeLeft] = useState(() => {
    const distance = targetDate - Date.now();
    if (distance <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true };
    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
      isUnlocked: false,
    };
  });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isUnlocked: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        isUnlocked: false,
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const triggerPartyConfetti = () => {
    try {
      let leafShape: any = 'circle';
      if (typeof (confetti as any).shapeFromPath === 'function') {
        leafShape = (confetti as any).shapeFromPath({
          path: leafPathD,
          matrix: [0.1, 0, 0, 0.1, -5, -5],
        });
      }
      confetti({
        shapes: [leafShape],
        scalar: 2.8,
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#eab308', '#dc2626'],
      });
    } catch {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#eab308', '#dc2626'],
      });
    }
  };

  return (
    <div id="fotos-da-festa" className="relative max-w-4xl mx-auto">
      {/* Fita de Papel Antigo Vintage no topo */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-7 bg-[#f0e3cc] border border-[#dfceb0] shadow-sm transform -rotate-1 z-20 pointer-events-none flex items-center justify-center">
        <span className="text-[10px] font-black uppercase font-serif-vintage tracking-widest text-[#78350f]">
          FOTOS DA FESTA
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-[#faf5eb] text-[#2c1810] p-6 sm:p-10 shadow-2xl border-2 border-[#dfceb0] relative overflow-hidden"
      >
        {/* Faixa decorativa tricolor no topo interno */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#16a34a] via-[#eab308] to-[#dc2626] rounded-full mb-6" />

        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          {/* Badge de Cadeado e Status */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-xs font-serif-vintage font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Lock size={14} className="animate-pulse text-[#dc2626]" />
            <span>Liberada no dia da festa • 24/10 às 20h</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-vintage font-black text-[#26120c] tracking-tight uppercase leading-tight">
            Fotos da Festa
          </h2>
        </div>

        {/* BLOCO DO CRONÔMETRO REGRESSIVO EM TEMPO REAL */}
        <div className="max-w-xl mx-auto mb-8 p-5 sm:p-6 rounded-2xl bg-[#f5ede0] border-2 border-[#dfceb0] shadow-inner text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-serif-vintage font-bold text-[#593d31] mb-4 uppercase tracking-wider">
            <Clock size={16} className="text-[#b45309]" />
            <span>Contagem Regressiva para a Liberação:</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {/* Dias */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#faf5eb] border border-[#ded0b9] shadow-md text-center">
              <span className="block text-2xl sm:text-4xl font-black text-[#26120c] font-mono leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-[#7c5a45] mt-1 block">
                Dias
              </span>
            </div>

            {/* Horas */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#faf5eb] border border-[#ded0b9] shadow-md text-center">
              <span className="block text-2xl sm:text-4xl font-black text-[#26120c] font-mono leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-[#7c5a45] mt-1 block">
                Horas
              </span>
            </div>

            {/* Minutos */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#faf5eb] border border-[#ded0b9] shadow-md text-center">
              <span className="block text-2xl sm:text-4xl font-black text-[#b45309] font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-[#7c5a45] mt-1 block">
                Minutos
              </span>
            </div>

            {/* Segundos */}
            <div className="p-3 sm:p-4 rounded-2xl bg-[#faf5eb] border border-[#ded0b9] shadow-md text-center">
              <span className="block text-2xl sm:text-4xl font-black text-[#dc2626] font-mono leading-none animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-[#7c5a45] mt-1 block">
                Segundos
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-serif-vintage text-[#7c5a45]">
            <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-ping" />
            <span>Abertura oficial: <strong>24/10 às 20:00h</strong></span>
          </div>
        </div>

        {/* Rodapé com Informações & Botões de Navegação */}
        <div className="pt-6 border-t border-[#dfceb0] flex flex-col sm:flex-row items-center justify-between gap-4">
          {onBackToMural && (
            <button
              type="button"
              onClick={onBackToMural}
              className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-[#26120c] hover:bg-[#3f1f14] text-[#faf5eb] border border-[#dfceb0] text-xs font-serif-vintage font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <ArrowLeft size={14} className="text-[#eab308]" />
              <span>Ver Fotos do Glorioso (Mural Atual)</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={triggerPartyConfetti}
              className="py-2 px-4 rounded-full bg-[#e8f5e9] hover:bg-[#c8e6c9] border border-[#a5d6a7] text-[#15803d] text-xs font-serif-vintage font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <CannabisLeafIcon className="w-4 h-4 text-[#16a34a]" />
              <span>Comemorar 30 Anos</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
