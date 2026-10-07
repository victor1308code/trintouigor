import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Check, Calendar as CalendarIcon, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CannabisLeafIcon, leafPathD } from './CannabisLeafIcon';

export const ReggaeCalendar: React.FC = () => {
  const targetDate = new Date('2026-10-24T20:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpDone, setRsvpDone] = useState(false);
  const [selectedDayInfo, setSelectedDayInfo] = useState<string | null>(null);

  // Data atual da resenha (Outubro 2026 - Hoje é dia 7)
  const currentDayOfMonth = 7;
  const targetPartyDay = 24;

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
    try {
      let leafShape: any = 'circle';
      if (typeof (confetti as any).shapeFromPath === 'function') {
        leafShape = (confetti as any).shapeFromPath({
          path: leafPathD,
          matrix: [0.1, 0, 0, 0.1, -5, -5],
        });
      }
      confetti({
        shapes: [leafShape],
        scalar: 2.8,
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#eab308', '#dc2626'],
      });
    } catch {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#eab308', '#dc2626', '#faf5eb'],
      });
    }
  };

  // Dias da semana (Início no Domingo)
  const weekDays = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  // Outubro 2026 começa numa Quinta-feira (índice 4: DOM=0, SEG=1, TER=2, QUA=3, QUI=4)
  const firstDayWeekIndex = 4;
  const daysInOctober = 31;

  // Células do calendário (vazias antes do dia 1 + dias 1 a 31)
  const calendarCells = [];
  for (let i = 0; i < firstDayWeekIndex; i++) {
    calendarCells.push({ type: 'empty', key: `empty-${i}` });
  }
  for (let day = 1; day <= daysInOctober; day++) {
    calendarCells.push({ type: 'day', day, key: `day-${day}` });
  }

  const handleDayClick = (day: number) => {
    if (day < currentDayOfMonth) {
      setSelectedDayInfo(`Dia ${day}/10 já foi queimado! Menos um dia até o Trintou do Igor! 🌿`);
    } else if (day === currentDayOfMonth) {
      setSelectedDayInfo(`Hoje é dia 7 de Outubro! Brasa acesa e contagem a mil! 🔥`);
    } else if (day === targetPartyDay) {
      setSelectedDayInfo(`⭐️ 24 DE OUTUBRO: O GRANDE DIA! Festa Oficial de 30 Anos do Igor!`);
      confetti({
        particleCount: 50,
        spread: 60,
        colors: ['#16a34a', '#eab308', '#dc2626'],
      });
    } else if (day < targetPartyDay) {
      const remaining = targetPartyDay - day;
      setSelectedDayInfo(`Dia ${day}/10: Faltam apenas ${remaining} dias para a comemoração!`);
    } else {
      setSelectedDayInfo(`Dia ${day}/10: Pós-festa e resenha dos sobreviventes!`);
    }
  };

  return (
    <div id="agenda" className="relative">
      {/* Fita de Papel Antigo no topo */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#f0e3cc]/90 border border-[#dfceb0] shadow-xs transform -rotate-1 z-20 pointer-events-none flex items-center justify-center">
        <span className="text-[10px] font-black uppercase font-serif-vintage tracking-widest text-[#78350f]">
          Outubro • 2026
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-[#faf5eb] text-[#2c1810] p-5 sm:p-7 shadow-2xl border-2 border-[#e5decb] relative overflow-hidden"
      >
        {/* Header do Calendário */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5decb] mt-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#f5ede0] border border-[#e5d8c3] text-[#b45309]">
              <CalendarIcon size={20} />
            </div>
            <div>
              <h3 className="font-serif-vintage font-black text-lg sm:text-xl tracking-tight text-[#26120c] uppercase">
                CALENDÁRIO DO GLORIOSO
              </h3>
              <span className="text-xs font-serif-vintage text-[#7c5a45] tracking-wide block">
                Cada dia que passa vira fumaça até o dia 24/10!
              </span>
            </div>
          </div>
          <span className="text-xs font-serif-vintage font-bold px-2.5 py-1 bg-[#16a34a]/15 text-[#15803d] rounded-lg border border-[#16a34a]/30 flex items-center gap-1">
            <CannabisLeafIcon className="w-3.5 h-3.5 text-[#16a34a]" />
            <span>Outubro</span>
          </span>
        </div>

        {/* GRID DO CALENDÁRIO MENSAL REAL */}
        <div className="my-3 bg-[#f6eee2] p-3 sm:p-4 rounded-2xl border border-[#e2d5c0] shadow-inner">
          {/* Cabeçalho dos Dias da Semana */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-2 text-center">
            {weekDays.map((wd, idx) => (
              <span
                key={wd}
                className={`text-[10px] sm:text-xs font-black font-serif-vintage tracking-wider ${
                  idx === 0 || idx === 6 ? 'text-[#b45309]' : 'text-[#7c5a45]'
                }`}
              >
                {wd}
              </span>
            ))}
          </div>

          {/* Células dos Dias de Outubro */}
          <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
            {calendarCells.map((cell) => {
              if (cell.type === 'empty') {
                return (
                  <div
                    key={cell.key}
                    className="aspect-square rounded-lg bg-transparent opacity-10"
                  />
                );
              }

              const day = cell.day as number;
              const hasPassed = day < currentDayOfMonth;
              const isToday = day === currentDayOfMonth;
              const isPartyDay = day === targetPartyDay;

              // Dia 24/10: O Grande Dia
              if (isPartyDay) {
                return (
                  <motion.button
                    key={cell.key}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDayClick(day)}
                    className="aspect-square rounded-xl bg-gradient-to-tr from-[#dc2626] via-[#eab308] to-[#16a34a] p-0.5 shadow-lg relative group cursor-pointer"
                  >
                    <div className="w-full h-full rounded-[10px] bg-[#fef08a] flex flex-col items-center justify-center relative overflow-hidden">
                      <span className="text-[10px] font-black text-[#854d0e] leading-none">
                        24
                      </span>
                      <Flame size={12} className="text-[#dc2626] animate-bounce mt-0.5" />
                      <div className="absolute inset-0 bg-[#eab308]/20 animate-pulse" />
                    </div>
                  </motion.button>
                );
              }

              // Dias que já passaram: RETIRE O NÚMERO E COLOQUE A FOLHA DA MACONHA (SVG DA PASTA)!
              if (hasPassed) {
                return (
                  <motion.button
                    key={cell.key}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleDayClick(day)}
                    title={`Dia ${day}/10 já passou (Fumado)`}
                    className="aspect-square rounded-xl bg-[#e8f5e9] border border-[#a5d6a7] shadow-xs flex flex-col items-center justify-center p-1 group cursor-pointer hover:bg-[#c8e6c9] transition-colors relative"
                  >
                    <CannabisLeafIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#16a34a] group-hover:scale-110 transition-transform drop-shadow-xs" />
                    <span className="text-[8px] font-bold text-[#2e7d32] font-mono leading-none mt-0.5 opacity-60">
                      {day}
                    </span>
                  </motion.button>
                );
              }

              // Hoje (Dia 7): Fumaça e Brasa viva
              if (isToday) {
                return (
                  <motion.button
                    key={cell.key}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => handleDayClick(day)}
                    title="Hoje! Dia 7 de Outubro"
                    className="aspect-square rounded-xl bg-[#fef3c7] border-2 border-[#f59e0b] shadow-md flex flex-col items-center justify-center p-1 group cursor-pointer relative overflow-hidden animate-pulse"
                  >
                    <CannabisLeafIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#d97706] group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-black text-[#b45309] font-mono leading-none mt-0.5">
                      HOJE
                    </span>
                  </motion.button>
                );
              }

              // Dias futuros (8 até 23 e pós-24)
              return (
                <motion.button
                  key={cell.key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square rounded-xl flex items-center justify-center text-xs font-bold font-serif-vintage transition-all cursor-pointer ${
                    day < targetPartyDay
                      ? 'bg-[#faf5eb] border border-[#e0d3bc] text-[#3d2419] hover:border-[#b45309] hover:bg-white shadow-xs'
                      : 'bg-[#f0e6d6]/60 border border-[#e5dac8] text-[#8c6d58] hover:bg-[#faf5eb]'
                  }`}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Mensagem Interativa ao Clicar no Dia */}
        {selectedDayInfo && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2.5 rounded-xl bg-[#fef9c3] border border-[#fde047] text-center text-xs font-serif-vintage font-bold text-[#854d0e] my-2"
          >
            {selectedDayInfo}
          </motion.div>
        )}

        {/* Dias Fumados */}
        <div className="flex items-center justify-center text-xs font-serif-vintage font-bold text-[#16a34a] px-1 py-1">
          <span className="flex items-center gap-1.5 bg-[#e8f5e9] px-3.5 py-1.5 rounded-full border border-[#a5d6a7] shadow-2xs">
            <CannabisLeafIcon className="w-4 h-4 text-[#16a34a]" />
            <span>Dias Fumados: {currentDayOfMonth}</span>
          </span>
        </div>

        {/* CONTADOR REGRESSIVO EM TEMPO REAL */}
        <div className="p-3.5 rounded-2xl bg-[#f2e7d5] border border-[#e0d2bc] my-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-serif-vintage font-bold text-[#593d31] mb-2 uppercase">
            <Clock size={15} className="text-[#b45309]" />
            <span>Tempo até o Aniversário:</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <div className="p-2 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-xl sm:text-2xl font-black text-[#26120c] font-mono leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Dias</span>
            </div>
            <div className="p-2 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-xl sm:text-2xl font-black text-[#26120c] font-mono leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Horas</span>
            </div>
            <div className="p-2 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-xl sm:text-2xl font-black text-[#b45309] font-mono leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Min</span>
            </div>
            <div className="p-2 rounded-xl bg-[#faf5eb] border border-[#ded0b9] shadow-inner text-center">
              <span className="block text-xl sm:text-2xl font-black text-[#dc2626] font-mono leading-none animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-[#8c6d58]">Seg</span>
            </div>
          </div>
        </div>

        {/* CONFIRMAÇÃO DE PRESENÇA NA LISTA */}
        <div className="pt-2 border-t border-[#e5decb]">
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
                className="px-4 py-2.5 rounded-xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] text-xs font-serif-vintage font-bold transition-all shadow-sm active:scale-95 flex-shrink-0"
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
