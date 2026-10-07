import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BotafogoShield, CannabisLeaf } from './Icons';
import { Clock, Calendar, ArrowDown, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const targetDate = new Date('2026-10-24T20:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  const addToGoogleCalendar = () => {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Trintou+do+Glorioso+420&dates=20261024T230000Z/20261025T070000Z&details=A+maior+resenha+alvinegra+do+ano!+Traga+sua+brisa+e+sua+sede.&location=Espa%C3%A7o+Resenha+Alvinegra`;
    window.open(url, '_blank');
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Background Gradients & Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-neutral-800/30 via-emerald-500/10 to-neutral-800/30 blur-[130px] rounded-full pointer-events-none" />

      {/* Floating Badge Top */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-700/80 text-xs font-bold text-neutral-200 mb-6 shadow-2xl backdrop-blur-md"
      >
        <BotafogoShield size={20} />
        <span className="text-emerald-400">EDIÇÃO ESPECIAL 420</span>
        <span className="w-1 h-1 rounded-full bg-neutral-600" />
        <span className="text-white">BOTAFOGO DE FUTEBOL E REGATAS</span>
        <CannabisLeaf size={16} className="text-emerald-400" />
      </motion.div>

      {/* Título Principal Monumental */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter uppercase max-w-5xl leading-none"
      >
        TRINTOU DO <span className="text-emerald-400">IGOR</span> <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400 drop-shadow-[0_0_35px_rgba(255,255,255,0.3)]">
          O GLORIOSO
        </span>{' '}
        <span className="text-emerald-400 font-mono tracking-normal">420</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto mt-6 leading-relaxed"
      >
        A contagem regressiva para a maior festa do ano começou. Separe o manto alvinegro, prepare a mente e venha fazer parte dessa história.
      </motion.p>

      {/* CONTADOR REGRESSIVO COM GLASSMORPHISM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="my-10 w-full max-w-2xl"
      >
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-300">
              <Clock size={16} className="text-emerald-400" />
              <span>SÁBADO, 24 DE OUTUBRO • 20:00H</span>
            </div>
            <button
              onClick={addToGoogleCalendar}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <Calendar size={14} />
              <span>Adicionar à Agenda</span>
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            <div className="p-3 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 shadow-inner">
              <span className="block text-3xl sm:text-5xl font-black text-white font-mono">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-neutral-400 tracking-wider">
                Dias
              </span>
            </div>
            <div className="p-3 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 shadow-inner">
              <span className="block text-3xl sm:text-5xl font-black text-white font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-neutral-400 tracking-wider">
                Horas
              </span>
            </div>
            <div className="p-3 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 shadow-inner">
              <span className="block text-3xl sm:text-5xl font-black text-emerald-400 font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-neutral-400 tracking-wider">
                Minutos
              </span>
            </div>
            <div className="p-3 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 shadow-inner relative overflow-hidden">
              <span className="block text-3xl sm:text-5xl font-black text-emerald-400 font-mono animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase font-bold text-neutral-400 tracking-wider">
                Segundos
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* BOTÕES DE CHAMADA PARA AÇÃO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => scrollTo('beckometro')}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-neutral-200 text-black font-black text-sm flex items-center justify-center gap-2 shadow-2xl transition-all"
        >
          <Sparkles size={18} className="text-emerald-600" />
          <span>Ver o Beckômetro & Fortalecer no Pix</span>
          <ArrowDown size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => scrollTo('rsvp')}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-sm border border-neutral-700 shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <span>Confirmar Presença (RSVP)</span>
        </motion.button>
      </motion.div>
    </section>
  );
};
