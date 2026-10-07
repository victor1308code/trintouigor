import React from 'react';

interface VintageNavbarProps {
  onTriggerSmoke: () => void;
}

export const VintageNavbar: React.FC<VintageNavbarProps> = ({ onTriggerSmoke }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#faf6ed] text-[#2c1810] border-b border-[#e5decb] shadow-md px-4 sm:px-8 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Lado Esquerdo: Logo & Selo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          {/* Foto circular do Igor com borda dourada/reggae */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#d97706] shadow-sm bg-neutral-900 flex-shrink-0">
            <img 
              src="/photos/igor-4.jpg" 
              alt="Igor" 
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-vintage font-black text-base sm:text-lg tracking-tight uppercase text-[#26120c]">
                SALVE O GLORIOSO!
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-serif-vintage italic text-[#8c654d] block leading-none">
              - 30 Anos de Resistência e Resenha -
            </span>
          </div>
        </div>

        {/* Lado Direito: Navegação */}
        <nav className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-serif-vintage font-bold">
          <button 
            onClick={() => scrollTo('sobre')}
            className="text-[#593d31] hover:text-[#b45309] transition-colors"
          >
            Sobre
          </button>
          <button 
            onClick={() => scrollTo('baile')}
            className="text-[#593d31] hover:text-[#b45309] transition-colors"
          >
            Apoiar
          </button>
          <button 
            onClick={() => scrollTo('agenda')}
            className="text-[#593d31] hover:text-[#b45309] transition-colors"
          >
            Agenda
          </button>
          <button 
            onClick={() => scrollTo('galeria')}
            className="text-[#593d31] hover:text-[#b45309] transition-colors hidden sm:inline"
          >
            Fotos
          </button>
          <button 
            onClick={() => {
              onTriggerSmoke();
              scrollTo('baile');
            }}
            className="text-[#8c2a32] hover:text-[#5a141a] border-b-2 border-[#8c2a32] pb-0.5 tracking-wide"
          >
            Salve
          </button>
        </nav>
      </div>
    </header>
  );
};
