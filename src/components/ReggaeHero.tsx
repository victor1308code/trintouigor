import React from 'react';
import { motion } from 'motion/react';
import { Flame, Calendar } from 'lucide-react';

export const ReggaeHero: React.FC = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-8 sm:pt-12 pb-4 px-4 max-w-4xl mx-auto text-center">
      <div className="flex flex-col items-center justify-center relative">
        
        {/* Badge Tricolor Reggae */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf5eb]/10 border border-[#f59e0b]/40 backdrop-blur-md mb-4"
        >
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
          </span>
          <span className="text-xs font-serif-vintage tracking-widest text-[#fde68a] uppercase font-bold">
            24 DE OUTUBRO • EDIÇÃO ESPECIAL 30 ANOS
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-vintage font-black text-[#faf3e3] tracking-tight leading-tight"
        >
          Trintou do Igor, o Glorioso{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16a34a] via-[#eab308] to-[#dc2626]">
            4:20
          </span>
        </motion.h1>

        {/* Botões Rápidos */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-6"
        >
          <button
            onClick={() => scrollTo('beckometro')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#16a34a] via-[#eab308] to-[#dc2626] text-white font-serif-vintage font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Flame size={16} className="text-white animate-bounce" />
            <span>Ver o Beckômetro</span>
          </button>

          <button
            onClick={() => scrollTo('agenda')}
            className="px-6 py-3 rounded-2xl bg-[#faf5eb] hover:bg-[#f5ede0] text-[#26120c] font-serif-vintage font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar size={15} className="text-[#b45309]" />
            <span>Agenda de 24/10</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};
