import React from 'react';
import { Flame, Wind } from 'lucide-react';

interface ReggaeNavbarProps {
  onTriggerSmoke: () => void;
}

export const ReggaeNavbar: React.FC<ReggaeNavbarProps> = ({ onTriggerSmoke }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf6ed] text-[#2c1810] border-b-2 border-[#e5decb] shadow-md">
      {/* Faixa Tricolor Reggae no topo */}
      <div className="h-1.5 w-full flex">
        <div className="flex-1 bg-[#16a34a]" />
        <div className="flex-1 bg-[#eab308]" />
        <div className="flex-1 bg-[#dc2626]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Lado Esquerdo: Logo Estilizado sem foto de canto */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          {/* Badge Rasta elegante */}
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#16a34a] via-[#eab308] to-[#dc2626] p-0.5 shadow-sm flex items-center justify-center flex-shrink-0">
            <div className="w-full h-full bg-[#faf6ed] rounded-[10px] flex items-center justify-center text-sm font-black text-[#2c1810]">
              🦁
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif-vintage font-black text-base sm:text-lg tracking-tight uppercase text-[#26120c] group-hover:text-[#b45309] transition-colors">
                SALVE O GLORIOSO!
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#16a34a]/15 text-[#16a34a] border border-[#16a34a]/30">
                30 ANOS
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-serif-vintage italic text-[#8c654d] block leading-none">
              Resistência, Resenha & Positividade
            </span>
          </div>
        </div>

        {/* Lado Direito: Navegação */}
        <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-serif-vintage font-bold">
          <button 
            onClick={() => scrollTo('beckometro')}
            className="text-[#593d31] hover:text-[#b45309] transition-colors flex items-center gap-1"
          >
            <Flame size={14} className="text-[#dc2626]" />
            <span>Beckômetro</span>
          </button>
          
          <button 
            onClick={() => scrollTo('agenda')}
            className="text-[#593d31] hover:text-[#b45309] transition-colors"
          >
            Agenda (24/10)
          </button>

          <button 
            onClick={() => scrollTo('galeria')}
            className="text-[#593d31] hover:text-[#b45309] transition-colors"
          >
            Fotos do Igor
          </button>

          {/* Botão Fumaça com Cores Reggae */}
          <button
            onClick={onTriggerSmoke}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#16a34a] via-[#ca8a04] to-[#dc2626] text-white text-xs font-serif-vintage font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Wind size={13} />
            <span className="hidden sm:inline">Soltar Fumaça</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
