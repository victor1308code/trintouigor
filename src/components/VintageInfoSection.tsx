import React from 'react';
import { MapPin, Navigation, Clock, ShieldCheck, Heart } from 'lucide-react';

export const VintageInfoSection: React.FC = () => {
  const openMaps = () => {
    window.open('https://maps.google.com/?q=Botafogo+Rio+de+Janeiro', '_blank');
  };

  const openWaze = () => {
    window.open('https://waze.com/ul?q=Botafogo+Rio+de+Janeiro', '_blank');
  };

  return (
    <section className="relative py-12 px-4 max-w-5xl mx-auto text-[#2c1810]">
      {/* Container de Papel Antigo */}
      <div className="rounded-3xl bg-[#faf5eb] p-6 sm:p-8 shadow-2xl border border-[#e5decb]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Lado Esquerdo: Localização */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={22} className="text-[#b45309]" />
              <h3 className="font-serif-vintage font-bold text-lg sm:text-xl text-[#26120c] uppercase">
                Onde vai rolar o Baile?
              </h3>
            </div>
            
            <p className="text-sm font-serif-vintage text-[#593d31] leading-relaxed mb-4">
              Espaço Resenha do Glorioso • Botafogo, Rio de Janeiro - RJ
              <span className="block text-xs text-[#8c6d58] mt-1 italic">
                Perto do metrô, fácil de chegar e com estacionamento nas ruas próximas.
              </span>
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={openMaps}
                className="py-2.5 px-4 rounded-xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] font-serif-vintage text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <Navigation size={14} className="text-[#60a5fa]" />
                <span>Google Maps</span>
              </button>
              <button
                onClick={openWaze}
                className="py-2.5 px-4 rounded-xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] font-serif-vintage text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <Navigation size={14} className="text-[#22d3ee]" />
                <span>Abrir no Waze</span>
              </button>
            </div>
          </div>

          {/* Lado Direito: Horários e Vibe */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock size={22} className="text-[#b45309]" />
              <h3 className="font-serif-vintage font-bold text-lg sm:text-xl text-[#26120c] uppercase">
                Programação da Noite
              </h3>
            </div>

            <div className="space-y-2 text-xs font-serif-vintage">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f5ede0] border border-[#e5d8c3]">
                <span className="font-bold text-[#b45309] w-12">20:00</span>
                <span className="text-[#26120c]">Abertura dos Portões, Esquenta e Recepção</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f5ede0] border border-[#e5d8c3]">
                <span className="font-bold text-[#b45309] w-12">22:00</span>
                <span className="text-[#26120c]">Churrasco Liberado & Fumaça no Ar</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f5ede0] border border-[#e5d8c3]">
                <span className="font-bold text-[#b45309] w-12">00:00</span>
                <span className="text-[#26120c] font-bold">Parabéns do Glorioso Igor & Brinde Oficial</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-[#f5ede0] border border-[#e5d8c3]">
                <span className="font-bold text-[#b45309] w-12">Até 05h</span>
                <span className="text-[#26120c]">Resenha até o sol raiar para os sobreviventes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dicas e Cuidados */}
        <div className="mt-6 pt-5 border-t border-[#e5decb] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif-vintage">
          <div className="p-3 rounded-xl bg-[#f5ede0] border border-[#e5d8c3] flex items-center gap-2 text-[#593d31]">
            <ShieldCheck size={18} className="text-[#16a34a] flex-shrink-0" />
            <span>Ambiente 100% acolhedor, de respeito e legalize. Traga sua melhor energia.</span>
          </div>
          <div className="p-3 rounded-xl bg-[#f5ede0] border border-[#e5d8c3] flex items-center gap-2 text-[#593d31]">
            <Heart size={18} className="text-[#b91c1c] flex-shrink-0" />
            <span>Se for beber ou brisar, volte de Uber ou de carona amiga!</span>
          </div>
        </div>
      </div>

      {/* FRASE DE RODAPÉ EXATA DA IMAGEM DE REFERÊNCIA */}
      <div className="text-center mt-10 mb-4 px-4">
        <p className="font-serif-vintage italic text-xs sm:text-sm text-[#f5ebd7] opacity-90 max-w-xl mx-auto leading-relaxed">
          "Não fazemos nada sozinhos. Seu apoio fortalece a cultura e a festa. Gratidão!"
        </p>
        <span className="text-[10px] font-serif-vintage text-[#e8c89b] block mt-2 opacity-70">
          Trintou do Igor • O Glorioso • 24 de Outubro
        </span>
      </div>
    </section>
  );
};
