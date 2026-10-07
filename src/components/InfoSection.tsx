import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Clock, CheckCircle2, Sparkles, Shirt, Beer, ShieldCheck } from 'lucide-react';
import { BotafogoStar, CannabisLeaf } from './Icons';
import confetti from 'canvas-confetti';

export const InfoSection: React.FC = () => {
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpConfirmed, setRsvpConfirmed] = useState(false);
  const [rsvpList, setRsvpList] = useState<string[]>([
    'Victor Oliveira',
    'Lucas (Aniversariante)',
    'Gabriel Fogão',
    'Matheus 420',
    'Mariana Silva',
    'Thiago Alvinegro',
    'Camila',
    'Felipe',
  ]);

  const handleConfirmRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setRsvpList((prev) => [rsvpName.trim(), ...prev]);
    setRsvpConfirmed(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#000000', '#10b981', '#34d399', '#f59e0b'],
    });
  };

  const openMaps = () => {
    window.open('https://maps.google.com/?q=Botafogo+Rio+de+Janeiro', '_blank');
  };

  const openWaze = () => {
    window.open('https://waze.com/ul?q=Botafogo+Rio+de+Janeiro', '_blank');
  };

  return (
    <section id="local" className="relative py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
          INFORMAÇÕES OFICIAIS DO EVENTO
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          LOCAL & PROGRAMAÇÃO
        </h2>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2">
          Tudo o que você precisa saber para não ficar de fora da maior festa alvinegra.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lado Esquerdo: Local e Cronograma */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card Localização */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-emerald-400">
                <MapPin size={22} />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400 block">
                  Onde vai ser?
                </span>
                <h3 className="text-lg font-bold text-white">
                  Espaço Resenha Alvinegra
                </h3>
              </div>
            </div>

            <p className="text-sm text-neutral-300 mb-4">
              Rua General Severiano, Botafogo — Rio de Janeiro - RJ
              <span className="block text-xs text-neutral-400 mt-1">
                Fácil acesso pelo metrô, Uber e com estacionamento nas redondezas.
              </span>
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={openMaps}
                className="py-3 px-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <Navigation size={16} className="text-blue-400" />
                <span>Google Maps</span>
              </button>
              <button
                onClick={openWaze}
                className="py-3 px-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
              >
                <Navigation size={16} className="text-cyan-400" />
                <span>Waze</span>
              </button>
            </div>
          </div>

          {/* Card Cronograma */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-emerald-400">
                <Clock size={22} />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400 block">
                  Linha do Tempo
                </span>
                <h3 className="text-lg font-bold text-white">
                  Cronograma de 24/10
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-4 p-3 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                <span className="px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-black text-emerald-400">
                  20:00
                </span>
                <div>
                  <span className="text-sm font-bold text-white block">
                    Abertura dos Portões & Esquenta
                  </span>
                  <span className="text-xs text-neutral-400">
                    Música boa, primeiros drinks gelados e chegada dos convidados.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                <span className="px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-black text-emerald-400">
                  22:00
                </span>
                <div>
                  <span className="text-sm font-bold text-white block">
                    Churrasco Liberado & Sessão 420
                  </span>
                  <span className="text-xs text-neutral-400">
                    Carnes na brasa e fumaça alvinegra tomando conta do ambiente.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                <span className="px-3 py-1 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-black text-white">
                  00:00
                </span>
                <div>
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Parabéns do Glorioso & Bolo</span>
                    <BotafogoStar size={14} className="text-white" />
                  </span>
                  <span className="text-xs text-neutral-400">
                    Hino do Botafogo cantado no volume máximo e queima de velas.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito: Confirmação de Presença (RSVP) & Regras */}
        <div id="rsvp" className="lg:col-span-5 space-y-6">
          
          {/* Card RSVP */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-neutral-400 block">
                  Lista VIP
                </span>
                <h3 className="text-lg font-bold text-white">
                  Confirmar Presença
                </h3>
              </div>
            </div>

            {rsvpConfirmed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center"
              >
                <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
                <h4 className="text-base font-bold text-emerald-200">
                  Presença Garantida!
                </h4>
                <p className="text-xs text-emerald-300/80 mt-1">
                  Seu nome já foi adicionado na lista. Agora fortalece o aniversariante no Beckômetro!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleConfirmRsvp} className="space-y-3">
                <p className="text-xs text-neutral-400">
                  Confirme para o anfitrião planejar a quantidade certa de bebida e carne:
                </p>
                <input
                  type="text"
                  required
                  placeholder="Seu nome ou apelido..."
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  Confirmar Minha Presença
                </button>
              </form>
            )}

            {/* Lista dos Confirmados */}
            <div className="mt-6 pt-4 border-t border-neutral-800">
              <span className="text-[11px] uppercase font-bold text-neutral-400 block mb-2">
                Já confirmados ({rsvpList.length})
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pr-1">
                {rsvpList.map((guest, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-neutral-300 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {guest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card Dicas da Resenha */}
          <div className="p-6 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-xl backdrop-blur-md">
            <h4 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
              Regulamento da Brisa
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <Shirt size={16} className="text-white mb-1.5" />
                <span className="font-bold text-white block">Dress Code:</span>
                <span className="text-neutral-400">Manto do Botafogo ou preto & branco.</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <CannabisLeaf size={16} className="text-emerald-400 mb-1.5" />
                <span className="font-bold text-white block">420 Friendly:</span>
                <span className="text-neutral-400">Totalmente legalize e paz.</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <Beer size={16} className="text-amber-400 mb-1.5" />
                <span className="font-bold text-white block">Bebidas:</span>
                <span className="text-neutral-400">Chopp e drinks garantidos.</span>
              </div>
              <div className="p-3 rounded-2xl bg-neutral-950 border border-neutral-800">
                <ShieldCheck size={16} className="text-emerald-400 mb-1.5" />
                <span className="font-bold text-white block">Volta Segura:</span>
                <span className="text-neutral-400">Vá de Uber ou carona amiga.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
