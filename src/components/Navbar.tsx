import React from 'react';
import { BotafogoShield, CannabisLeaf } from './Icons';
import { Wind } from 'lucide-react';

interface NavbarProps {
  onTriggerSmoke: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onTriggerSmoke }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-4xl mx-auto rounded-full bg-neutral-950/85 backdrop-blur-xl border border-neutral-800/80 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl pointer-events-auto">
        {/* Logo Lado Esquerdo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <BotafogoShield size={32} />
            <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5 border border-emerald-500/50">
              <CannabisLeaf size={10} className="text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-white tracking-wider group-hover:text-emerald-400 transition-colors uppercase">
                TRINTOU
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                420
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 font-semibold block leading-none">
              Fogão Edition
            </span>
          </div>
        </div>

        {/* Links Centrais (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-neutral-300">
          <button 
            onClick={() => scrollTo('beckometro')}
            className="hover:text-emerald-400 transition-colors"
          >
            O Beckômetro
          </button>
          <button 
            onClick={() => scrollTo('local')}
            className="hover:text-emerald-400 transition-colors"
          >
            Local & Horários
          </button>
          <button 
            onClick={() => scrollTo('fotos')}
            className="hover:text-emerald-400 transition-colors"
          >
            Fotos (24/10)
          </button>
          <button 
            onClick={() => scrollTo('rsvp')}
            className="hover:text-emerald-400 transition-colors"
          >
            Confirmar Presença
          </button>
        </nav>

        {/* Botão Fumaça Direita */}
        <div className="flex items-center gap-3">
          <button
            onClick={onTriggerSmoke}
            className="py-1.5 px-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-bold flex items-center gap-2 border border-neutral-700/80 active:scale-95 transition-all shadow-md"
          >
            <Wind size={14} className="text-emerald-400" />
            <span className="hidden sm:inline">Soltar Fumaça</span>
          </button>
        </div>
      </div>
    </header>
  );
};
