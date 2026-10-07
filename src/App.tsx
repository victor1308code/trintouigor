import { useState, useEffect } from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { ReggaeNavbar } from './components/ReggaeNavbar';
import { ReggaeHero } from './components/ReggaeHero';
import { ReggaeBeckometro, type Donation } from './components/ReggaeBeckometro';
import { ReggaeCalendar } from './components/ReggaeCalendar';
import { VintagePhotoGallery } from './components/VintagePhotoGallery';
import { ReggaeLocation } from './components/ReggaeLocation';

export function App() {
  const [burstCount, setBurstCount] = useState(0);
  const targetAmount = 1800;

  // Carrega e salva doações no localStorage
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('trintou_igor_donations_reggae');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
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
        message: 'Cota da picanha e da fumaça garantida pra resenha.',
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
    localStorage.setItem('trintou_igor_donations_reggae', JSON.stringify(donations));
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
      {/* Background Animado Reggae (Canvas com Fumaça e Brasas Tricolores) */}
      <AnimatedBackground burstTrigger={burstCount} />

      {/* Barra Superior Estilizada Reggae (Sem foto de canto) */}
      <ReggaeNavbar onTriggerSmoke={handleTriggerSmoke} />

      {/* Conteúdo Principal do Site */}
      <main className="relative z-10 flex-1 space-y-10 sm:space-y-16">
        {/* 1. Hero com Título "Aniversário do Igor" + 30 Anos */}
        <ReggaeHero />

        {/* 2. Grid Central: Calendário de 24/10 (Esquerda) + O Novo Beckômetro (Direita) */}
        <section className="px-4 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            {/* Esquerda: Calendário com Contagem Regressiva e RSVP */}
            <div className="lg:col-span-5">
              <ReggaeCalendar />
            </div>

            {/* Direita: O Beckômetro Re-imaginado com Baseado Reggae e Pix */}
            <div className="lg:col-span-7">
              <ReggaeBeckometro
                totalAmount={totalAmount}
                targetAmount={targetAmount}
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
