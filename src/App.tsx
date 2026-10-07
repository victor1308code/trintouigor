import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ReggaeHero } from './components/ReggaeHero';
import { ReggaeBeckometro, type Donation } from './components/ReggaeBeckometro';
import { ReggaeCalendar } from './components/ReggaeCalendar';
import { VintagePhotoGallery } from './components/VintagePhotoGallery';
import { ReggaeLocation } from './components/ReggaeLocation';

export function App() {
  const [burstCount, setBurstCount] = useState(0);

  // Inicia com 0 contribuições conforme solicitado
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('trintou_igor_donations_reggae_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    localStorage.setItem('trintou_igor_donations_reggae_v2', JSON.stringify(donations));
  }, [donations]);

  const handleAddDonation = (newDonation: Omit<Donation, 'id' | 'timestamp'>) => {
    const item: Donation = {
      ...newDonation,
      id: String(Date.now()),
      timestamp: 'Agora mesmo',
    };
    setDonations((prev) => [item, ...prev]);
    setBurstCount((c) => c + 1);
  };

  const handleTriggerSmoke = () => {
    setBurstCount((c) => c + 1);
  };

  return (
    <div className="min-h-screen text-[#faf5eb] font-sans selection:bg-[#d97706] selection:text-black overflow-x-hidden relative flex flex-col justify-between pt-6 sm:pt-10">
      {/* Background Animado Reggae (Canvas com Fumaça e Brasas Tricolores + Wallpaper Pop-Art) */}
      <AnimatedBackground burstTrigger={burstCount} />

      {/* Conteúdo Principal do Site */}
      <main className="relative z-10 flex-1 space-y-10 sm:space-y-16">
        {/* 1. Hero com Título "Trintou do Igor o glorioso 4:20" */}
        <ReggaeHero />

        {/* 2. Grid Central: Calendário Real de 24/10 com Folhas de Maconha (Esquerda) + O Beckômetro Livre (Direita) */}
        <section className="px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Esquerda: Calendário Real de Outubro com Dias Queimados em Maconha e Contagem */}
            <div className="lg:col-span-5">
              <ReggaeCalendar />
            </div>

            {/* Direita: O Beckômetro Livre Sem Meta com Baseado Reggae e Pix */}
            <div className="lg:col-span-7">
              <ReggaeBeckometro
                totalAmount={totalAmount}
                donations={donations}
                onAddDonation={handleAddDonation}
                onPuff={handleTriggerSmoke}
              />
            </div>
          </div>
        </section>

        {/* 3. As Fotos do Igor (Polaroids com curtidas e ampliação que o usuário adorou) */}
        <VintagePhotoGallery />

        {/* 4. Localização, Cronograma e Mensagem Final */}
        <ReggaeLocation />
      </main>
    </div>
  );
}

export default App;
