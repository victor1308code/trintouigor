import React from 'react';
import { BotafogoShield, CannabisLeaf, BotafogoStar } from './Icons';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 border-t border-neutral-900 bg-black text-center text-xs text-neutral-400">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <BotafogoShield size={32} />
          <CannabisLeaf size={24} className="text-emerald-400" />
          <BotafogoStar size={20} className="text-white" />
        </div>

        <p className="text-sm font-bold text-neutral-200 uppercase tracking-wider">
          TRINTOU DO GLORIOSO 420 • 24 DE OUTUBRO
        </p>
        <p className="max-w-sm text-neutral-400">
          A mente vai na lua, a fumaça sobe no ar e o coração bate forte pelo Fogão.
        </p>

        <button
          onClick={scrollToTop}
          className="mt-4 p-3 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 transition-all active:scale-95 shadow-md flex items-center gap-1.5 font-bold"
        >
          <ArrowUp size={16} />
          <span>Voltar ao Topo</span>
        </button>

        <div className="text-[11px] text-neutral-400 mt-4">
          Feito especialmente para a resenha de 30 anos do irmão.
        </div>
      </div>
    </footer>
  );
};
