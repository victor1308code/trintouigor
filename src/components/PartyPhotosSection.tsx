import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Clock, Sparkles, Camera, ArrowLeft, Flame, PartyPopper } from 'lucide-react';
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

  const [teaserNotice, setTeaserNotice] = useState<string | null>(null);

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

  const handleTeaserClick = (title: string) => {
    setTeaserNotice(`🔒 O registro "${title}" será liberado no início da festa dia 24/10 às 20h!`);
    triggerPartyConfetti();
    setTimeout(() => {
      setTeaserNotice(null);
    }, 4500);
  };

  const teaserSlots = [
    {
      id: 'teaser-1',
      title: 'A Chegada & Brinde',
      subtitle: 'Recepção dos convidados',
      icon: PartyPopper,
      tag: 'Foto 01 • Exclusiva',
      rotation: 'rotate-[-2deg]',
    },
    {
      id: 'teaser-2',
      title: 'O Parabéns 4:20',
      subtitle: 'Vela & Fumaça do Igor',
      icon: Flame,
      tag: 'Foto 02 • O Momento',
      rotation: 'rotate-[2deg]',
    },
    {
      id: 'teaser-3',
      title: 'A Roda da Resenha',
      subtitle: 'Comemoração com a galera',
      icon: CannabisLeafIcon,
      tag: 'Foto 03 • Histórica',
      rotation: 'rotate-[-1deg]',
    },
    {
      id: 'teaser-4',
      title: 'Os Sobreviventes',
      subtitle: 'O fim da festa dos 30',
      icon: Sparkles,
      tag: 'Foto 04 • Revelação',
      rotation: 'rotate-[2.5deg]',
    },
  ];

  return (
    <div id="fotos-da-festa" className="relative max-w-5xl mx-auto">
      {/* Fita de Papel Antigo Vintage no topo */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-7 bg-[#f0e3cc] border border-[#dfceb0] shadow-sm transform -rotate-1 z-20 pointer-events-none flex items-center justify-center">
        <span className="text-[10px] font-black uppercase font-serif-vintage tracking-widest text-[#78350f]">
          ABA EXTRA • FOTOS DA FESTA
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
        <div className="text-center max-w-2xl mx-auto mb-8">
          {/* Badge de Cadeado e Status */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-xs font-serif-vintage font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Lock size={14} className="animate-pulse text-[#dc2626]" />
            <span>Bloqueado até o início da festa</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-vintage font-black text-[#26120c] tracking-tight uppercase leading-tight">
            Fotos da Festa
          </h2>

          <p className="text-sm sm:text-base font-serif-vintage font-bold text-[#b45309] mt-2">
            Álbum Oficial de 30 Anos • Trintou do Igor
          </p>

          <p className="text-xs sm:text-sm font-serif-vintage text-[#7c5a45] mt-2 leading-relaxed">
            Esta seção <strong className="text-[#26120c]">só vai ser liberada no dia da festa</strong>, 
            em <strong className="text-[#16a34a]">24 de Outubro de 2026 às 20h</strong>. 
            Durante a resenha, todas as fotos tiradas pelos convidados e registros oficiais serão liberados aqui ao vivo!
          </p>
        </div>

        {/* BLOCO DO CRONÔMETRO REGRESSIVO EM TEMPO REAL */}
        <div className="max-w-xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-[#f5ede0] border-2 border-[#dfceb0] shadow-inner text-center">
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
            <span>Horário de abertura: <strong>24/10 às 20:00h</strong> • Casa da Festa (Alexânia, GO)</span>
          </div>
        </div>

        {/* Notificação Temporária de Clique em Teaser */}
        {teaserNotice && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-3 rounded-2xl bg-[#fef9c3] border border-[#fde047] text-center text-xs font-serif-vintage font-bold text-[#854d0e] mb-6 shadow-sm"
          >
            {teaserNotice}
          </motion.div>
        )}

        {/* PRÉVIA / TEASER DAS MOLDURAS POLAROID BLOQUEADAS */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <Camera size={18} className="text-[#16a34a]" />
              <h3 className="font-serif-vintage font-bold text-sm sm:text-base text-[#26120c] uppercase">
                Prévia dos Espaços do Álbum da Festa
              </h3>
            </div>
            <span className="text-[11px] font-serif-vintage text-[#7c5a45] italic hidden sm:inline">
              Toque nas molduras para interagir
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {teaserSlots.map((slot) => {
              const IconComp = slot.icon;
              return (
                <motion.div
                  key={slot.id}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleTeaserClick(slot.title)}
                  className={`p-3 pb-4 rounded-2xl bg-[#f5ede0] border-2 border-dashed border-[#d9cbb4] shadow-md cursor-pointer transition-all flex flex-col justify-between ${slot.rotation} hover:border-[#16a34a] hover:bg-[#fcf8f2]`}
                >
                  {/* Foto Mockup Desfocada com Cadeado */}
                  <div className="aspect-[4/5] rounded-xl bg-gradient-to-br from-[#26120c] via-[#3a1d13] to-[#1c0d08] flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group">
                    {/* Linhas de fita vintage */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-[#fde68a] text-[9px] font-mono border border-white/10">
                      {slot.tag}
                    </div>

                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[#eab308] mb-3 group-hover:scale-110 transition-transform">
                      <Lock size={22} className="text-[#eab308]" />
                    </div>

                    <IconComp className="w-6 h-6 text-[#16a34a] mb-2 opacity-80" />

                    <span className="text-xs font-serif-vintage font-black text-[#faf5eb] uppercase tracking-wide">
                      {slot.title}
                    </span>

                    <span className="text-[10px] font-serif-vintage text-[#dfceb0] italic mt-1">
                      {slot.subtitle}
                    </span>

                    <span className="mt-3 text-[9px] font-mono text-[#a3e635] bg-[#16a34a]/20 px-2 py-0.5 rounded-full border border-[#16a34a]/30">
                      🔒 Libera em 24/10
                    </span>
                  </div>

                  {/* Rodapé da Polaroid */}
                  <div className="mt-2.5 text-center">
                    <span className="text-[11px] font-serif-vintage font-bold text-[#5e4130] block">
                      Aguardando a festa começar...
                    </span>
                  </div>
                </motion.div>
              );
            })}
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
