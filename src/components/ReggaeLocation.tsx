import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export const ReggaeLocation: React.FC = () => {
  const openMaps = () => {
    window.open('https://maps.google.com/?q=Iceberg+Bar+Nucleo+Bandeirante+DF', '_blank');
  };

  const openWaze = () => {
    window.open('https://waze.com/ul?q=Iceberg+Bar+Nucleo+Bandeirante+DF', '_blank');
  };

  return (
    <section className="relative py-10 px-4 max-w-3xl mx-auto text-[#2c1810]">
      <div className="rounded-3xl bg-[#faf5eb] p-6 sm:p-8 shadow-2xl border-2 border-[#e5decb] text-center">
        
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#f5ede0] border border-[#e5d8c3] text-[#b45309] mb-3">
          <MapPin size={26} />
        </div>

        <h3 className="font-serif-vintage font-black text-xl sm:text-2xl text-[#26120c] uppercase tracking-tight">
          Onde vai rolar a festa?
        </h3>

        <p className="text-base sm:text-lg font-serif-vintage font-bold text-[#b45309] mt-2 mb-1">
          Iceberg Bar • Núcleo Bandeirante, DF
        </p>

        <span className="inline-block text-xs font-serif-vintage text-[#7c5a45] italic mb-6">
          (Localização provisória • Placeholder)
        </span>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={openMaps}
            className="py-2.5 px-5 rounded-2xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] font-serif-vintage text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <Navigation size={15} className="text-[#60a5fa]" />
            <span>Ver no Google Maps</span>
          </button>
          <button
            onClick={openWaze}
            className="py-2.5 px-5 rounded-2xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] font-serif-vintage text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md cursor-pointer"
          >
            <Navigation size={15} className="text-[#22d3ee]" />
            <span>Abrir no Waze</span>
          </button>
        </div>
      </div>

      {/* Frase minimalista de rodapé */}
      <div className="text-center mt-8 mb-2">
        <span className="text-xs font-serif-vintage tracking-wider text-[#fde68a]/75 uppercase">
          Trintou do Igor • O Glorioso 4:20 • 24 de Outubro
        </span>
      </div>
    </section>
  );
};
