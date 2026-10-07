import React from 'react';
import { motion } from 'motion/react';
import { Flame, Calendar, Sparkles } from 'lucide-react';

export const ReggaeHero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-8 pb-4 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
        
        {/* Lado Esquerdo: Tipografia e Destaque */}
        <div className="text-left z-10 max-w-2xl">
          {/* Badge Tricolor Reggae */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#faf5eb]/10 border border-[#f59e0b]/40 backdrop-blur-md mb-3"
          >
            <span className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
            </span>
            <span className="text-xs font-serif-vintage tracking-wider text-[#fde68a] uppercase font-bold">
              EDIÇÃO ESPECIAL 30 ANOS • O GLORIOSO
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif-vintage font-black text-[#faf3e3] tracking-tight leading-none"
          >
            Aniversário do <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fef08a] via-[#f59e0b] to-[#ef4444]">Igor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base font-serif-vintage italic text-[#fde68a]/90 mt-3 max-w-lg leading-relaxed"
          >
            O Glorioso completa 30 anos de pura resistência, boas energias e histórias lendárias. Venha celebrar essa data no ritmo certo!
          </motion.p>

          {/* Botões Rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mt-6"
          >
            <button
              onClick={() => scrollTo('beckometro')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#16a34a] via-[#eab308] to-[#dc2626] text-white font-serif-vintage font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <Flame size={16} className="text-white animate-bounce" />
              <span>Ver o Beckômetro</span>
            </button>

            <button
              onClick={() => scrollTo('agenda')}
              className="px-5 py-2.5 rounded-2xl bg-[#faf5eb] hover:bg-[#f5ede0] text-[#26120c] font-serif-vintage font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
            >
              <Calendar size={15} className="text-[#b45309]" />
              <span>Agenda de 24/10</span>
            </button>
          </motion.div>
        </div>

        {/* Lado Direito: Retrato com visual Reggae & Leão de Judá */}
        <div className="relative flex items-center justify-end z-0">
          {/* Leão de Judá Dourado no Fundo */}
          <div className="absolute -left-16 w-36 h-36 opacity-25 text-[#f59e0b] hidden sm:block pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
              <circle cx="100" cy="80" r="45" strokeDasharray="3 3" />
              <path d="M70,80 Q100,50 130,80 Q140,110 100,125 Q60,110 70,80 Z" />
              <path d="M85,55 L100,40 L115,55 Z" fill="currentColor" opacity="0.4" />
              <circle cx="90" cy="80" r="3" fill="currentColor" />
              <circle cx="110" cy="80" r="3" fill="currentColor" />
              <path d="M92,95 Q100,105 108,95" />
              <path d="M60,65 Q40,90 60,120 Q80,140 100,145 Q120,140 140,120 Q160,90 140,65" />
            </svg>
          </div>

          {/* Retrato do Igor em moldura dourada / rasta */}
          <div className="relative p-1.5 rounded-3xl bg-gradient-to-tr from-[#16a34a] via-[#eab308] to-[#dc2626] shadow-2xl">
            <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-[22px] overflow-hidden bg-black relative">
              <img
                src="/photos/igor-4.jpg"
                alt="Igor O Glorioso"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="text-[11px] font-black font-serif-vintage text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-xs">
                  Igor • 30 Anos
                </span>
              </div>
            </div>
            
            <div className="absolute -top-2 -right-2 bg-[#eab308] text-black text-[10px] font-black font-serif-vintage px-2 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <Sparkles size={11} />
              <span>O GLORIOSO</span>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa Pop-Art do Igor em Destaque (As 6 faces em Vermelho, Dourado e Verde) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-8 rounded-2xl overflow-hidden border-2 border-[#f59e0b]/40 shadow-2xl bg-black/40 backdrop-blur-xs relative group"
      >
        <img
          src="/igor-popart-strip.png"
          alt="Igor Reggae Pop-Art"
          className="w-full h-16 sm:h-24 md:h-28 object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-1.5 left-3 right-3 flex items-center justify-between text-[10px] sm:text-xs font-serif-vintage uppercase tracking-widest text-[#fde68a] font-bold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
            <span className="w-2 h-2 rounded-full bg-[#eab308]" />
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span>Resistência & Vibrações Positivas</span>
          </span>
          <span className="text-[#faf5eb]/90">24 de Outubro • Trintou Igor</span>
        </div>
      </motion.div>
    </div>
  );
};
