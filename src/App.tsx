import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { VintageNavbar } from './components/VintageNavbar';
import { VintageHero } from './components/VintageHero';
import { VintageCalendarCard } from './components/VintageCalendarCard';
import { VintageBaileCard, type Donation } from './components/VintageBaileCard';
import { VintagePhotoGallery } from './components/VintagePhotoGallery';
import { VintageInfoSection } from './components/VintageInfoSection';

export function App() {
  const [burstCount, setBurstCount] = useState(0);
  const targetAmount = 1800;

  // Carrega e salva doações no localStorage
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('trintou_igor_donations');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Começa com R$ 1.120 arrecadados exatamente como no mockup da imagem de referência!
    return [
      {
        id: '1',
        name: 'Victor Oliveira',
        amount: 250,
        message: 'Fortalecendo o Glorioso nos 30 anos! A lenda merece tudo!',
        timestamp: 'Ontem',
      },
      {
        id: '2',
        name: 'Gabriel da Resenha',
        amount: 170,
        message: 'Cota da picanha e da fumaça garantida pro baile.',
        timestamp: 'Ontem',
      },
      {
        id: '3',
        name: 'Mariana Silva',
        amount: 300,
        message: 'Um brinde ao melhor amigo e aniversariante!',
        timestamp: 'Hoje cedo',
      },
      {
        id: '4',
        name: 'Matheus',
        amount: 400,
        message: 'A mente vai na lua dia 24/10! Tamo junto demais!',
        timestamp: 'Hoje',
      },
    ];
  });

  const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    localStorage.setItem('trintou_igor_donations', JSON.stringify(donations));
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
    <div className="min-h-screen text-[#faf5eb] font-sans selection:bg-[#d97706] selection:text-black overflow-x-hidden relative flex flex-col justify-between">
      {/* Background Animado: Tons Vinho/Bordeaux + Fumaça e Brasas no Canvas */}
      <AnimatedBackground burstTrigger={burstCount} />

      {/* Top Bar Creme Estilo "SALVE O GLORIOSO" */}
      <VintageNavbar onTriggerSmoke={handleTriggerSmoke} />

      {/* Conteúdo Central */}
      <main className="relative z-10 flex-1 space-y-8 sm:space-y-12">
        {/* 1. Header com Título "Aniversário do Igor" + Retrato e Leão */}
        <VintageHero />

        {/* 2. Grid Central Idêntico ao Mockup da Tela: Calendário de Eventos (Esquerda) + Fortaleça o Baile (Direita) */}
        <section className="px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Cartão Esquerdo: Calendário */}
            <div className="lg:col-span-5">
              <VintageCalendarCard />
            </div>

            {/* Cartão Direito: Fortaleça o Baile (Beckômetro + Pix + Mão Segurando Cigarro) */}
            <div className="lg:col-span-7">
              <VintageBaileCard
                totalAmount={totalAmount}
                targetAmount={targetAmount}
                donations={donations}
                onAddDonation={handleAddDonation}
                onPuff={handleTriggerSmoke}
              />
            </div>
          </div>
        </section>

        {/* 3. O Museu do Glorioso (Polaroids Reais das Fotos do Igor na Pasta) */}
        <VintagePhotoGallery />

        {/* 4. Localização, Cronograma e Frase de Encerramento do Mockup */}
        <VintageInfoSection />
      </main>
    </div>
  );
}

export default App;
