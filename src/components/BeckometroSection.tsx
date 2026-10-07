import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BotafogoStar, BotafogoShield, CannabisLeaf } from './Icons';
import { Flame, Sparkles, Copy, Check, PlusCircle, MessageSquare, Heart, QrCode, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface Donation {
  id: string;
  name: string;
  amount: number;
  message: string;
  timestamp: string;
}

interface BeckometroProps {
  totalAmount: number;
  targetAmount: number;
  donations: Donation[];
  onAddDonation: (donation: Omit<Donation, 'id' | 'timestamp'>) => void;
  onPuff: () => void;
}

export const BeckometroSection: React.FC<BeckometroProps> = ({
  totalAmount,
  targetAmount,
  donations,
  onAddDonation,
  onPuff,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedCota, setSelectedCota] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isPuffing, setIsPuffing] = useState(false);

  const percentage = Math.min(100, Math.max(0, Math.round((totalAmount / targetAmount) * 100)));

  // Chave Pix de Demonstração
  const pixKey = '30.fogao.420.trintou@banco-resenha.pix';

  const cotas = [
    { value: 15, label: 'Kit Sedinha & Piteira', icon: '🌿', desc: 'Pro esquenta começar com estilo' },
    { value: 30, label: 'Litrão no Nilton Santos', icon: '🍺', desc: 'Gelada trincando na arquibancada' },
    { value: 50, label: 'Cota da Brasa & Churrasco', icon: '🥩', desc: 'Picanha garantida pros amigos' },
    { value: 100, label: 'Camisa 7 Alvinegro VIP', icon: '⭐️', desc: 'Presença de gala no evento' },
    { value: 200, label: 'Patrocinador Master da Onda', icon: '👑', desc: 'Dono da resenha e da brisa' },
  ];

  const getStageMessage = (pct: number) => {
    if (pct === 0) return { title: 'Baseado Apagado', desc: 'Manda o primeiro Pix pra acender a brasa!' };
    if (pct < 25) return { title: '🔥 Primeiro Pega!', desc: 'A brasa acendeu e o cheirinho bom subiu.' };
    if (pct < 50) return { title: '💨 Fumaça Alvinegra', desc: 'O Nilton Santos tá fervendo de energia!' };
    if (pct < 75) return { title: '⭐️ Quase no Fim!', desc: 'A mente já tá na lua e o coração é Botafogo.' };
    if (pct < 100) return { title: '🚀 Ponta de Ouro!', desc: 'Falta um teco pra zerar a meta do rolê!' };
    return { title: '🏆 META ATINGIDA!', desc: 'A BRISA É TOTAL! NINGUÉM DORME HOJE!' };
  };

  const stage = getStageMessage(percentage);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTriggerPuff = () => {
    setIsPuffing(true);
    onPuff();
    setTimeout(() => setIsPuffing(false), 1800);
  };

  const handleConfirmDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedCota || parseFloat(customAmount);
    if (!finalAmount || finalAmount <= 0) return;
    if (!donorName.trim()) return;

    onAddDonation({
      name: donorName.trim(),
      amount: finalAmount,
      message: donorMessage.trim() || 'Fortalecendo o Glorioso e a brisa do irmão!',
    });

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ffffff', '#000000', '#10b981', '#34d399', '#f59e0b', '#ef4444'],
    });

    setDonorName('');
    setDonorMessage('');
    setShowModal(false);
  };

  return (
    <section id="beckometro" className="relative py-16 px-4 max-w-5xl mx-auto">
      {/* Glow de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Título da Seção */}
      <div className="text-center mb-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/80 text-xs font-bold text-emerald-400 mb-3 shadow-lg"
        >
          <Flame size={14} className="text-amber-400 animate-bounce" />
          <span>A ATRAÇÃO PRINCIPAL DO PRÉ-FESTA</span>
          <BotafogoStar size={12} className="text-white" />
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
          O <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-white to-emerald-300">BECKÔMETRO</span>
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto mt-2">
          O baseado queima de forma inversa conforme a vaquinha sobe. Ajude a queimar essa bomba alvinegra até o final!
        </p>
      </div>

      {/* O CARD GIGANTE DO BASEADO & PLACAR */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-gradient-to-b from-neutral-900/90 via-neutral-950/90 to-black p-6 sm:p-8 border border-neutral-800 shadow-2xl relative overflow-hidden backdrop-blur-xl"
      >
        {/* Estrelas e folhas d'água gigantes no fundo */}
        <div className="absolute -top-12 -right-12 opacity-5 pointer-events-none select-none">
          <BotafogoStar size={260} className="text-white" />
        </div>
        <div className="absolute -bottom-16 -left-16 opacity-5 pointer-events-none select-none">
          <CannabisLeaf size={280} className="text-emerald-500" />
        </div>

        {/* Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800/80 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-950 border border-neutral-700 flex items-center justify-center flex-shrink-0 shadow-inner">
              <BotafogoShield size={32} />
            </div>
            <div>
              <span className="text-xs uppercase font-bold text-neutral-400 tracking-wider block">
                Status da Queima
              </span>
              <h3 className="text-lg font-black text-white">
                {stage.title}
              </h3>
              <p className="text-xs text-emerald-400 font-medium">
                {stage.desc}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-neutral-950/80 p-3 sm:px-6 sm:py-3 rounded-2xl border border-neutral-800 self-start sm:self-auto">
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Arrecadado
              </span>
              <span className="text-xl sm:text-2xl font-black text-white">
                R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div>
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Meta do Rolê
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                R$ {targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-neutral-800" />
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                Progresso
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* ESTRUTURA VISUAL DO BASEADO (A QUEIMA INVERSA) */}
        <div className="my-10 relative px-2">
          {/* Fumaça animada na ponta da brasa */}
          <div 
            className="absolute -top-12 transition-all duration-700 ease-out pointer-events-none flex flex-col items-center z-30"
            style={{ left: `calc(${percentage}% + 20px)` }}
          >
            {percentage > 0 && (
              <>
                <motion.div 
                  animate={{ y: [-10, -45], scale: [1, 2.2], opacity: [0.8, 0], x: [0, -12] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                  className="w-5 h-5 rounded-full bg-white/30 blur-md"
                />
                <motion.div 
                  animate={{ y: [-5, -55], scale: [1, 2.8], opacity: [0.6, 0], x: [0, 15] }}
                  transition={{ repeat: Infinity, duration: 2.8, delay: 0.5, ease: 'easeOut' }}
                  className="w-7 h-7 rounded-full bg-emerald-400/30 blur-lg -mt-3"
                />
              </>
            )}
          </div>

          {/* O Baseado Horizontal Estilizado */}
          <div className="relative flex items-center h-16 sm:h-20 rounded-2xl bg-neutral-950 border-2 border-neutral-800 p-1.5 shadow-2xl overflow-visible">
            
            {/* 1. Piteira Alvinegra com Estrela do Botafogo */}
            <div className="w-20 sm:w-28 h-full rounded-l-xl bg-neutral-100 flex items-center justify-center relative shadow-lg z-20 border-r-4 border-neutral-900 flex-shrink-0 overflow-hidden">
              {/* Listras pretas e brancas alvinegras */}
              <div className="absolute inset-0 flex opacity-90">
                <div className="w-1/4 h-full bg-black" />
                <div className="w-1/4 h-full bg-white" />
                <div className="w-1/4 h-full bg-black" />
                <div className="w-1/4 h-full bg-white" />
              </div>
              {/* Emblema centralizado na piteira */}
              <div className="relative z-10 bg-black/90 p-2 rounded-full border border-white/60 shadow-lg">
                <BotafogoStar size={20} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
              </div>
            </div>

            {/* 2. Corpo do Beck e Queima Inversa */}
            <div className="relative flex-1 h-full rounded-r-xl overflow-hidden bg-gradient-to-r from-stone-200/20 via-neutral-200/10 to-stone-300/15 flex items-center">
              
              {/* Marcas d'água sutis na seda */}
              <div className="absolute inset-0 opacity-20 flex items-center justify-around pointer-events-none select-none">
                <CannabisLeaf size={24} className="text-emerald-300" />
                <BotafogoStar size={20} className="text-white" />
                <CannabisLeaf size={24} className="text-emerald-300" />
                <BotafogoStar size={20} className="text-white" />
                <CannabisLeaf size={24} className="text-emerald-300" />
              </div>

              {/* A ÁREA QUEIMADA (QUE AVANÇA CONFORME AS CONTRIBUIÇÕES SUBEM) */}
              <motion.div
                initial={false}
                animate={{ width: `${Math.max(5, percentage)}%` }}
                transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                className="h-full flex items-center justify-end relative"
                style={{
                  background: percentage === 0
                    ? 'linear-gradient(to right, #1f1f1f, #2e2e2e)'
                    : 'linear-gradient(to right, #0a0a0a 0%, #1c1917 40%, #78350f 75%, #c2410c 90%, #ea580c 100%)'
                }}
              >
                {/* Textura de cinza realista */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#737373_1px,transparent_1px)] [background-size:8px_8px]" />

                {/* A BRASA VIVA (Ponta Incandescente com Calor 3D) */}
                {percentage > 0 && (
                  <motion.div 
                    animate={isPuffing ? { scale: [1, 1.4, 1.1], filter: 'brightness(2)' } : { scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                    className="relative z-30 flex items-center justify-center -mr-3"
                  >
                    <div className="w-7 sm:w-9 h-12 sm:h-16 rounded-full bg-gradient-to-r from-orange-600 via-red-500 to-amber-300 shadow-[0_0_25px_#f97316,0_0_45px_#ef4444] flex items-center justify-center">
                      <div className="w-2.5 h-6 bg-white rounded-full blur-[1px] animate-pulse" />
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Seda que ainda falta queimar */}
              <div className="flex-1 h-full bg-gradient-to-r from-stone-100/20 via-stone-200/30 to-stone-300/40 relative flex items-center justify-center">
                <span className="text-[11px] sm:text-xs tracking-widest uppercase font-mono text-neutral-400 font-bold select-none px-4 text-center">
                  {percentage < 100 ? 'Seda Alvinegra 420 • Queima Lenta' : 'META BATIDA! FOGO EM TUDO!'}
                </span>
              </div>
            </div>
          </div>

          {/* Marcadores de progresso */}
          <div className="flex justify-between text-xs text-neutral-400 font-semibold mt-3 px-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-600" />
              0% (Apagado)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-neutral-500" />
              50% (Metade)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Sparkles size={14} className="text-amber-400 animate-spin" />
              100% (Brisado Completo)
            </span>
          </div>
        </div>

        {/* Botão Interativo "Dar um Trago / Puxar Fumaça" */}
        <div className="flex justify-center mb-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleTriggerPuff}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-800 hover:from-neutral-700 hover:to-neutral-800 text-neutral-200 hover:text-white text-xs sm:text-sm font-bold flex items-center gap-3 border border-neutral-700 shadow-xl transition-all"
          >
            <Wind size={18} className="text-emerald-400" />
            <span>Puxar uma Fumaça Alvinegra na Tela</span>
            <Sparkles size={16} className="text-amber-400" />
          </motion.button>
        </div>

        {/* SEÇÃO DO PIX: QR CODE + CHAVE + COTAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-neutral-800">
          
          {/* Lado Esquerdo: QR Code e Chave Pix */}
          <div className="lg:col-span-5 rounded-2xl bg-neutral-950 p-6 border border-neutral-800 text-center flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <QrCode size={20} className="text-emerald-400" />
                <h4 className="text-base font-bold text-white">
                  Chave Pix & QR Code
                </h4>
              </div>
              <p className="text-xs text-neutral-400 mb-4">
                Escaneie com o app do seu banco ou copie a chave:
              </p>

              {/* QR Code com o Escudo do Botafogo */}
              <div className="relative inline-block p-3 rounded-2xl bg-white shadow-2xl mx-auto mb-4 border-2 border-neutral-800">
                <svg viewBox="0 0 160 160" className="w-36 h-36 mx-auto" fill="#000">
                  <rect x="5" y="5" width="40" height="40" fill="#000" />
                  <rect x="12" y="12" width="26" height="26" fill="#fff" />
                  <rect x="18" y="18" width="14" height="14" fill="#000" />
                  <rect x="115" y="5" width="40" height="40" fill="#000" />
                  <rect x="122" y="12" width="26" height="26" fill="#fff" />
                  <rect x="128" y="18" width="14" height="14" fill="#000" />
                  <rect x="5" y="115" width="40" height="40" fill="#000" />
                  <rect x="12" y="122" width="26" height="26" fill="#fff" />
                  <rect x="18" y="128" width="14" height="14" fill="#000" />
                  {/* Padrões mock */}
                  <rect x="55" y="10" width="12" height="12" />
                  <rect x="75" y="10" width="25" height="12" />
                  <rect x="55" y="30" width="18" height="15" />
                  <rect x="80" y="30" width="15" height="15" />
                  <rect x="10" y="55" width="20" height="12" />
                  <rect x="35" y="60" width="15" height="20" />
                  <rect x="10" y="80" width="25" height="12" />
                  <rect x="115" y="55" width="25" height="15" />
                  <rect x="120" y="80" width="20" height="15" />
                  <rect x="55" y="115" width="20" height="15" />
                  <rect x="80" y="115" width="15" height="20" />
                  <rect x="105" y="120" width="20" height="15" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black p-1.5 rounded-full border-2 border-white shadow-xl">
                    <BotafogoShield size={32} />
                  </div>
                </div>
              </div>
            </div>

            {/* Botão Copiar Chave */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300">
                <span className="flex-1 truncate text-left px-2">
                  {pixKey}
                </span>
                <button
                  onClick={handleCopyPix}
                  className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 text-xs transition-all ${
                    copied
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white text-black hover:bg-neutral-200'
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                </button>
              </div>
              <span className="text-[10px] text-neutral-400 block">
                QR Code de teste (Mock ilustrativo)
              </span>
            </div>
          </div>

          {/* Lado Direito: Cotas Humoradas & Formulário de Apoio */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles size={16} className="text-amber-400" />
                  <span>Escolha uma Cota Alvinegra</span>
                </h4>
                <span className="text-xs text-neutral-400">
                  Ou digite seu valor
                </span>
              </div>

              {/* Grid das Cotas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {cotas.map((cota) => (
                  <button
                    key={cota.value}
                    onClick={() => {
                      setSelectedCota(cota.value);
                      setCustomAmount('');
                      setShowModal(true);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-emerald-500/60 hover:bg-neutral-900/80 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl p-1.5 rounded-xl bg-neutral-900 border border-neutral-800">
                        {cota.icon}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-emerald-400 block transition-colors">
                          {cota.label}
                        </span>
                        <span className="text-[10px] text-neutral-400">
                          {cota.desc}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      R$ {cota.value}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Registrar Minha Contribuição */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowModal(true)}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 transition-all"
            >
              <PlusCircle size={20} />
              <span>Confirmar / Registrar Contribuição no Beckômetro</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* MURAL DE APOIADORES & RECADO DOS AMIGOS */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-400" />
            <h3 className="text-lg font-bold text-white">
              Hall da Brisa & do Fogão
            </h3>
          </div>
          <span className="text-xs font-semibold text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full">
            {donations.length} contribuições
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {donations.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
                      <BotafogoStar size={12} className="text-white" />
                    </div>
                    <span className="text-xs font-bold text-white">
                      {d.name}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                    + R$ {d.amount.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 italic">
                  "{d.message}"
                </p>
              </div>
              <span className="text-[10px] text-neutral-400 mt-3 block">
                {d.timestamp}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL PARA CONTRIBUIR */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md rounded-3xl bg-neutral-950 border-2 border-neutral-800 p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 text-neutral-400 hover:text-white text-lg font-bold w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 text-emerald-400">
                  <Heart size={28} className="animate-pulse" />
                </div>
                <h3 className="text-xl font-black text-white uppercase">
                  Fortalecer no Pix
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  O valor avança o Beckômetro em tempo real para todos os convidados!
                </p>
              </div>

              <form onSubmit={handleConfirmDonation} className="space-y-4">
                {/* Seleção de Valor */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                    Valor da Contribuição (R$)
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {[20, 50, 100].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => {
                          setSelectedCota(val);
                          setCustomAmount('');
                        }}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedCota === val
                            ? 'bg-emerald-500 text-black border-emerald-400'
                            : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        R$ {val}
                      </button>
                    ))}
                  </div>

                  <input
                    type="number"
                    placeholder="Ou digite outro valor..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedCota(null);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Nome */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                    Seu Nome ou Apelido
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João do Fogão"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-all"
                  />
                </div>

                {/* Mensagem */}
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1.5">
                    Recado pro Aniversariante
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Escreva uma mensagem divertida..."
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-emerald-500 transition-all resize-none"
                  />
                </div>

                {/* Botão de Enviar */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm transition-all shadow-xl shadow-emerald-500/20 active:scale-98"
                >
                  Confirmar e Subir a Brasa! 🔥
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
