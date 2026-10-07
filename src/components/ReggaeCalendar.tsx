import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Check, Calendar as CalendarIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReggaeCalendar: React.FC = () => {
  const targetDate = new Date('2026-10-24T20:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const handleRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpDone(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#16a34a', '#eab308', '#dc2626', '#faf5eb'],
    });
  };

  return (
    <div id="agenda" className="relative">
      {/* Fita de Papel Antigo */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#f0e3cc]/80 border border-[#dfceb0] shadow-xs transform -rotate-1 z-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-[#faf5eb] text-[#2c1810] p-6 sm:p-8 shadow-2xl border-2 border-[#e5decb] relative overflow-hidden"
      >
        {/* Header do Calendário */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5decb]">
          <div className="flex items-center gap-2">
            <CalendarIcon size={20} className="text-[#b45309]" />
            <div>
              <h3 className="font-serif-vintage font-black text-lg sm:text-xl tracking-tight text-[#26120c] uppercase">
                CALENDÁRIO DA RESENHA
              </h3>
              <span className="text-xs font-serif-vintage text-[#7c5a45] uppercase tracking-wider block">
                OUTUBRO 2026
              </span>
            </div>
          </div>
          <span className="text-xs font-serif-vintage font-bold px-2.5 py-1 bg-[#efe4cf] rounded-md text-[#593d31]">
            24/10
          </span>
        </div>

        {/* Linha do Tempo de Datas */}
        <div className="my-4 space-y-2.5">
          {/* Evento Esquenta */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5ede0] border border-[#e5d8c3]">
            <span className="w-8 h-8 rounded-lg bg-[#26120c] text-[#faf5eb] font-bold flex items-center justify-center text-xs flex-shrink-0">
              10
            </span>
            <div>
              <span className="font-handwriting text-lg font-bold text-[#26120c] block leading-tight">
                Esquenta no Quintal & Sessão Positiva
              </span>
              <span className="text-[11px] text-[#7c5a45]">
                Início das comemorações dos 30 anos
              </span>
            </div>
          </div>

          {/* O DIA D — 24 DE OUTUBRO (Destaque Amarelo Caneta Marca-Texto) */}
          <div className="p-3.5 rounded-2xl bg-[#fef08a] border-2 border-[#ca8a04] shadow-md transform rotate-[-0.5deg]">
            <div className="flex items-center justify-between mb-1">
              <span className="px-2 py-0.5 rounded bg-[#ca8a04] text-white text-[10px] font-black uppercase">
                O GRANDE DIA
              </span>
              <span className="text-xs font-black text-[#854d0e]">
                SÁBADO • A PARTIR DAS 20H
              </span>
            </div>
            <span className="font-handwriting text-2xl font-bold text-[#713f12] block leading-tight">
              24 — A Festa Oficial de 30 Anos do Igor!
            </span>
            <span className="text-xs text-[#854d0e] font-serif-vintage block mt-1">
              Churrasco completo, bebidas geladas, muita fumaça e parabéns!
            </span>
          </div>

          {/* Evento Pós-Festa */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#f5ede0] border border-[#e5d8c3]">
            <span className="w-8 h-8 rounded-lg bg-[#8c6d58] text-[#faf5eb] font-bold flex items-center justify-center text-xs flex-shrink-0">
              25
            </span>
            <div>
              <span className="font-handwriting text-lg font-bold text-[#26120c] block leading-tight">
                Almoço de Ressaca & Resenha Coletiva
              </span>
              <span className="text-[11px] text-[#7c5a45]">
                Para os sobreviventes que aguentarem até o final
              </span>
            </div>
          </div>
        </div>

        {/* CONTADOR REGRESSIVO */}
        <div className="p-4 rounded-2xl bg-[#f2e7d5] border border-[#e0d2bc] my-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-serif-vintage font-bold text-[#593d31] mb-2 uppercase">
            <Clock size={15} className="text-[#b45309]" />
            <span>Faltam para a Festa do Igor:</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-2xl font-black text-[#26120c] font-mono leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Dias</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-2xl font-black text-[#26120c] font-mono leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Horas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-2xl font-black text-[#b45309] font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Min</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-2xl font-black text-[#dc2626] font-mono leading-none animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Seg</span>
            </div>
          </div>
        </div>

        {/* CONFIRMAÇÃO DE PRESENÇA NA LISTA */}
        <div className="pt-3 border-t border-[#e5decb]">
          {rsvpDone ? (
            <div className="p-3 rounded-xl bg-[#ecfdf5] border border-[#86efac] text-center text-xs text-[#166534] font-bold flex items-center justify-center gap-2">
              <Check size={18} /> Nome confirmado na lista VIP do Igor!
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="flex gap-2">
              <input
                type="text"
                placeholder="Seu nome para a lista..."
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#faf5eb] border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#b45309]"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] text-xs font-serif-vintage font-bold transition-all shadow-sm active:scale-95 flex-shrink-0"
              >
                Confirmar Presença
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
