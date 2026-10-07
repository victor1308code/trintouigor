import React from 'react';
import { motion } from 'motion/react';

export const VintageHero: React.FC = () => {
  return (
    <div id="sobre" className="relative pt-8 pb-4 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative">
        
        {/* Título & Subtítulo */}
        <div className="text-left z-10 max-w-2xl">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs sm:text-sm font-serif-vintage tracking-widest text-[#e8c89b] uppercase block mb-1 opacity-90"
          >
            Parnaso Serif • Trintou Especial
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif-vintage font-bold text-[#faf3e3] tracking-tight leading-none"
          >
            Aniversário do Igor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs sm:text-sm font-serif-vintage italic text-[#e6d5c1] mt-2 opacity-85"
          >
            O Glorioso completa 30 anos. Uma noite de celebração, fumaça, brisa e amizade.
          </motion.p>
        </div>

        {/* Arte do Leão & Retrato do Igor no Fundo */}
        <div className="relative flex items-center justify-end z-0 opacity-80 md:opacity-90">
          {/* Ilustração do Leão em Linhas Finas (SVG Estilizado do Leão de Judá) */}
          <div className="w-28 h-28 sm:w-36 sm:h-36 opacity-30 text-[#e8c89b] hidden sm:block">
            <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-full h-full">
              {/* Leão heráldico coroado */}
              <circle cx="100" cy="80" r="45" strokeDasharray="3 3" />
              <path d="M70,80 Q100,50 130,80 Q140,110 100,125 Q60,110 70,80 Z" />
              <path d="M85,55 L100,40 L115,55 Z" fill="currentColor" opacity="0.4" />
              <circle cx="90" cy="80" r="3" fill="currentColor" />
              <circle cx="110" cy="80" r="3" fill="currentColor" />
              <path d="M92,95 Q100,105 108,95" />
              {/* Juba estilizada */}
              <path d="M60,65 Q40,90 60,120 Q80,140 100,145 Q120,140 140,120 Q160,90 140,65" />
            </svg>
          </div>

          {/* Retrato Estilizado do Igor em moldura vintage */}
          <div className="relative group">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#e8c89b]/60 shadow-2xl relative bg-black/40">
              <img
                src="/photos/igor-4.jpg"
                alt="Igor O Glorioso"
                className="w-full h-full object-cover object-top sepia-[0.35] contrast-110 hover:sepia-0 transition-all duration-500"
              />
            </div>
            {/* Coroa / badge sobreposta */}
            <div className="absolute -bottom-2 -left-2 bg-[#d97706] text-black text-[10px] font-black font-serif-vintage px-2 py-0.5 rounded-md shadow-md uppercase tracking-wider">
              30 Anos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
