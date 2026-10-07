import { useState, useEffect } from 'react';
import { SmokeCanvas } from './components/SmokeCanvas';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BeckometroSection, type Donation } from './components/BeckometroSection';
import { InfoSection } from './components/InfoSection';
import { PhotosSection } from './components/PhotosSection';
import { Footer } from './components/Footer';

export function App() {
  const [burstCount, setBurstCount] = useState(0);

  // Meta do Rolê
  const targetAmount = 1500;

  // Carrega e salva doações do localStorage
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('trintou_donations_v2');
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
        amount: 100,
        message: 'Camisa 7 em campo! Parabéns irmão, esse ano o Fogão leva tudo! ⭐️',
        timestamp: 'Ontem às 19:40',
      },
      {
        id: '2',
        name: 'Gabriel da Brisa',
        amount: 50,
        message: 'Cota da picanha e da fumaça garantida! 🌿🔥',
        timestamp: 'Hoje às 09:15',
      },
      {
        id: '3',
        name: 'Mariana Silva',
        amount: 30,
        message: 'Um litrão trincando de gelado pro aniversariante!',
        timestamp: 'Hoje às 11:20',
      },
    ];
  });

  const totalAmount = donations.reduce((acc, curr) => acc + curr.amount, 0);

  useEffect(() => {
    localStorage.setItem('trintou_donations_v2', JSON.stringify(donations));
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
    <div className="min-h-screen bg-black text-neutral-100 font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden relative">
      {/* Background de Fumaça em Canvas 60 FPS */}
      <SmokeCanvas burstTrigger={burstCount} />

      {/* Floating Navbar */}
      <Navbar onTriggerSmoke={handleTriggerSmoke} />

      {/* Conteúdo Principal do Site em Scroll Fluido */}
      <main className="relative z-10 space-y-16 sm:space-y-24">
        {/* 1. Hero com Contagem Regressiva para 24/10 */}
        <HeroSection />

        {/* 2. O Beckômetro (A grande atração com queima inversa e Pix) */}
        <BeckometroSection
          totalAmount={totalAmount}
          targetAmount={targetAmount}
          donations={donations}
          onAddDonation={handleAddDonation}
          onPuff={handleTriggerSmoke}
        />

        {/* 3. Informações, Local, Cronograma e RSVP */}
        <InfoSection />

        {/* 4. Fotos da Festa (Trancadas a 7 chaves para 24/10) */}
        <PhotosSection />
      </main>

      {/* Rodapé Oficial */}
      <Footer />
    </div>
  );
}

export default App;
