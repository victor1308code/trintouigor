import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, PlusCircle, Flame, Sparkles, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CannabisLeafIcon } from './CannabisLeafIcon';

export interface Donation {
  id: string;
  name: string;
  amount: number;
  message: string;
  timestamp: string;
}

interface ReggaeBeckometroProps {
  totalAmount: number;
  donations: Donation[];
  onAddDonation: (donation: Omit<Donation, 'id' | 'timestamp'>) => void;
  onPuff: () => void;
}

export const ReggaeBeckometro: React.FC<ReggaeBeckometroProps> = ({
  totalAmount,
  onAddDonation,
  onPuff,
}) => {
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isPuffing, setIsPuffing] = useState(false);

  const pixKey = '30.igor.glorioso@pix';

  // Cálculo da queima do beck conforme as contribuições entram
  // Inicia em 0% quando não há contribuições
  const burnPercentage = totalAmount === 0 
    ? 0 
    : Math.min(95, Math.max(8, Math.round((totalAmount / 1500) * 80) + 10));

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePuffClick = () => {
    setIsPuffing(true);
    onPuff();
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#16a34a', '#eab308', '#dc2626'],
    });
    setTimeout(() => setIsPuffing(false), 1600);
  };

  const handleConfirmDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = parseFloat(customAmount);
    if (!finalAmount || finalAmount <= 0) return;
    if (!donorName.trim()) return;

    onAddDonation({
      name: donorName.trim(),
      amount: finalAmount,
      message: donorMessage.trim() || 'Parabéns Igor, tamo junto nos 30 anos!',
    });

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#16a34a', '#eab308', '#dc2626', '#faf5eb'],
    });

    setDonorName('');
    setDonorMessage('');
    setCustomAmount('');
    setShowModal(false);
    onPuff();
  };

  return (
    <div id="beckometro" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-[#faf5eb] text-[#2c1810] p-6 sm:p-8 shadow-2xl border-2 border-[#e5decb] relative overflow-hidden"
      >
        {/* Faixa Superior Tricolor Reggae */}
        <div className="absolute top-0 left-0 right-0 h-2 flex">
          <div className="flex-1 bg-[#16a34a]" />
          <div className="flex-1 bg-[#eab308]" />
          <div className="flex-1 bg-[#dc2626]" />
        </div>

        {/* Header do Beckômetro */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e5decb] mt-1">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/15 text-[#16a34a] text-xs font-serif-vintage font-bold mb-1">
              <Flame size={14} className="text-[#dc2626] animate-bounce" />
              <span>VAQUINHA DO GLORIOSO</span>
            </div>
            <h3 className="font-serif-vintage font-black text-2xl sm:text-3xl tracking-tight text-[#26120c] uppercase">
              O BECKÔMETRO DO IGOR
            </h3>
            <p className="text-xs sm:text-sm font-serif-vintage italic text-[#7c5a45] mt-0.5">
              Fortaleça a resenha pelo Pix com qualquer valor
            </p>
          </div>

          {/* Placar de Total Fortalecido */}
          <div className="bg-[#f2e7d5] p-3 px-5 rounded-2xl border border-[#ded0b9] self-start sm:self-auto shadow-inner text-center sm:text-right">
            <span className="text-[10px] font-serif-vintage uppercase font-bold text-[#8c6d58] block">
              Total Arrecadado
            </span>
            <span className="text-2xl sm:text-3xl font-black font-serif-vintage text-[#26120c]">
              R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* ESTRUTURA VISUAL DO BASEADO REGGAE (QUEIMA INVERSA) */}
        <div className="my-7 relative py-4 px-1">
          {/* Fumaça animada subindo da posição da brasa */}
          {burnPercentage > 0 && (
            <div
              className="absolute -top-10 transition-all duration-700 ease-out pointer-events-none flex flex-col items-center z-30"
              style={{ left: `calc(${burnPercentage}% + 15px)` }}
            >
              <div className="w-5 h-5 rounded-full bg-neutral-400/40 blur-sm animate-smoke-curl" />
              <div className="w-6 h-6 rounded-full bg-amber-400/30 blur-md animate-smoke-curl -mt-2" style={{ animationDelay: '0.6s' }} />
              <div className="w-7 h-7 rounded-full bg-neutral-300/25 blur-md animate-smoke-curl -mt-3" style={{ animationDelay: '1.2s' }} />
            </div>
          )}

          {/* O BASEADO HORIZONTAL */}
          <div className="relative flex items-center h-16 sm:h-20 rounded-2xl bg-[#26120c] border-3 border-[#3d1d14] p-1.5 shadow-2xl overflow-visible">
            
            {/* 1. Piteira Reggae Tricolor (Verde, Amarela e Vermelha) */}
            <div className="w-20 sm:w-28 h-full rounded-l-xl flex items-center justify-center relative shadow-lg z-20 border-r-3 border-[#26120c] flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="w-1/3 h-full bg-[#16a34a]" />
                <div className="w-1/3 h-full bg-[#eab308]" />
                <div className="w-1/3 h-full bg-[#dc2626]" />
              </div>
              <div className="relative z-10 bg-black/80 px-2 py-1 rounded-md text-[10px] font-black font-serif-vintage text-white shadow-md border border-white/40 flex items-center gap-1">
                <CannabisLeafIcon className="w-3 h-3 text-[#16a34a]" />
                <span>IGOR 30</span>
              </div>
            </div>

            {/* 2. Seda & Queima Inversa Dinâmica */}
            <div className="relative flex-1 h-full rounded-r-xl overflow-hidden bg-gradient-to-r from-[#fdfaf5] via-[#f7f0e4] to-[#ede3d1] flex items-center">
              
              {/* Marcas d'água sutis na seda */}
              <div className="absolute inset-0 opacity-20 flex items-center justify-around pointer-events-none select-none text-xs">
                <span>🌿</span>
                <span>🦁</span>
                <span>🌿</span>
                <span>🦁</span>
                <span>🌿</span>
              </div>

              {/* Área queimada (cinza & brasa) que avança conforme as contribuições entram */}
              {burnPercentage > 0 && (
                <motion.div
                  initial={false}
                  animate={{ width: `${burnPercentage}%` }}
                  transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                  className="h-full flex items-center justify-end relative"
                  style={{
                    background: 'linear-gradient(to right, #1c1917 0%, #292524 50%, #78350f 80%, #b45309 92%, #ea580c 100%)'
                  }}
                >
                  {/* Textura de cinza */}
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#78716c_1px,transparent_1px)] [background-size:6px_6px]" />

                  {/* A BRASA VIVA INCANDESCENTE */}
                  <motion.div
                    animate={isPuffing ? { scale: [1, 1.45, 1.1] } : { scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="relative z-30 flex items-center justify-center -mr-3"
                  >
                    <div className="w-7 sm:w-8 h-12 sm:h-14 rounded-full bg-gradient-to-r from-orange-600 via-red-500 to-amber-300 shadow-[0_0_20px_#f97316,0_0_35px_#dc2626] flex items-center justify-center">
                      <div className="w-2 h-5 bg-white rounded-full blur-[1px] animate-pulse" />
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Seda que ainda falta queimar */}
              <div className="flex-1 h-full relative flex items-center justify-center">
                <span className="text-[11px] sm:text-xs font-serif-vintage tracking-widest uppercase font-bold text-[#7c5a45]/80 select-none px-3 text-center">
                  {burnPercentage === 0 ? 'Seda Pronta • Mande um Pix para acender a brasa!' : 'Queimando a Fumaça da Resenha!'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Interativo: Puxar Fumaça */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handlePuffClick}
            className="px-5 py-2.5 rounded-full bg-[#f2e7d5] hover:bg-[#ebdcc5] text-[#26120c] font-serif-vintage font-bold text-xs uppercase tracking-wider border border-[#ded0b9] shadow-md flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Wind size={15} className="text-[#16a34a]" />
            <span>Puxar uma Fumaça Comemorativa</span>
            <Sparkles size={14} className="text-[#eab308]" />
          </button>
        </div>

        {/* ÁREA DO PIX: QR CODE + CHAVE + REGISTRAR CONTRIBUIÇÃO */}
        <div className="pt-5 border-t border-[#e5decb]">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Lado Esquerdo: QR Code e Chave Pix */}
            <div className="sm:col-span-6 flex flex-col items-center text-center p-4 rounded-2xl bg-[#f5ede0] border border-[#e5d8c3]">
              <span className="text-xs font-serif-vintage font-bold text-[#26120c] uppercase block mb-1">
                CHAVE PIX DO ANIVERSARIANTE
              </span>

              {/* QR Code com Borda Rasta */}
              <div className="p-2.5 rounded-2xl bg-white border-2 border-[#26120c] shadow-md my-2 relative">
                <svg viewBox="0 0 140 140" className="w-32 h-32 mx-auto" fill="#26120c">
                  <rect x="5" y="5" width="35" height="35" fill="#26120c" />
                  <rect x="11" y="11" width="23" height="23" fill="#fff" />
                  <rect x="16" y="16" width="13" height="13" fill="#26120c" />

                  <rect x="100" y="5" width="35" height="35" fill="#26120c" />
                  <rect x="106" y="11" width="23" height="23" fill="#fff" />
                  <rect x="111" y="16" width="13" height="13" fill="#26120c" />

                  <rect x="5" y="100" width="35" height="35" fill="#26120c" />
                  <rect x="11" y="106" width="23" height="23" fill="#fff" />
                  <rect x="16" y="111" width="13" height="13" fill="#26120c" />

                  <rect x="50" y="10" width="10" height="10" />
                  <rect x="70" y="10" width="20" height="10" />
                  <rect x="50" y="30" width="15" height="15" />
                  <rect x="75" y="30" width="15" height="15" />

                  <rect x="10" y="50" width="20" height="10" />
                  <rect x="35" y="55" width="15" height="20" />
                  <rect x="10" y="75" width="25" height="10" />

                  <rect x="100" y="50" width="25" height="15" />
                  <rect x="105" y="75" width="20" height="15" />

                  <rect x="50" y="100" width="20" height="15" />
                  <rect x="75" y="100" width="15" height="20" />
                  <rect x="95" y="105" width="20" height="15" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#eab308] border-2 border-[#26120c] flex items-center justify-center text-xs shadow-md">
                    <CannabisLeafIcon className="w-5 h-5 text-[#26120c]" />
                  </div>
                </div>
              </div>

              <div className="w-full mt-1">
                <span className="font-mono text-xs text-[#593d31] block mb-2 font-bold">
                  {pixKey}
                </span>

                <button
                  onClick={handleCopyPix}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-serif-vintage font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                    copied
                      ? 'bg-[#16a34a] text-white'
                      : 'bg-[#26120c] hover:bg-[#402015] text-[#faf5eb]'
                  }`}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Chave Copiada!' : 'Copiar Chave Pix'}</span>
                </button>
              </div>
            </div>

            {/* Lado Direito: Botão para Registrar Pix */}
            <div className="sm:col-span-6 flex flex-col justify-center space-y-3 p-4 rounded-2xl bg-[#f5ede0] border border-[#e5d8c3] text-center sm:text-left">
              <div>
                <span className="text-xs font-serif-vintage font-bold text-[#26120c] uppercase block mb-1">
                  Fortalecimento Livre
                </span>
                <p className="text-xs font-serif-vintage text-[#7c5a45] leading-relaxed">
                  Não há valor mínimo nem meta estipulada. Cada contribuição acende a brasa e fortalece a celebração dos 30 anos do Glorioso!
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#16a34a] via-[#ca8a04] to-[#dc2626] text-white font-serif-vintage font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <PlusCircle size={16} />
                <span>Registrar Contribuição no Beckômetro</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* MODAL DE CONTRIBUIÇÃO */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-sm rounded-3xl bg-[#faf5eb] text-[#2c1810] border-2 border-[#ded0b9] p-6 shadow-2xl relative"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-[#8c6d58] hover:text-[#26120c] text-lg font-bold w-8 h-8 rounded-full bg-[#f2e7d5] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-3">
                <CannabisLeafIcon className="w-5 h-5 text-[#16a34a]" />
                <h4 className="font-serif-vintage font-black text-lg text-[#26120c] uppercase">
                  Registrar Contribuição
                </h4>
              </div>

              <p className="text-xs font-serif-vintage text-[#7c5a45] mb-4">
                Envie seu Pix de qualquer quantia para a chave <strong className="text-[#26120c] font-mono">{pixKey}</strong> e registre aqui para queimar o beck!
              </p>

              <form onSubmit={handleConfirmDonation} className="space-y-3">
                {/* Valor Livre */}
                <div>
                  <label className="text-[10px] font-serif-vintage uppercase font-bold text-[#7c5a45] block mb-1">
                    Valor do Pix (R$)
                  </label>
                  <input
                    type="number"
                    step="any"
                    required
                    placeholder="Digite o valor (ex: 20, 50, 100...)"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a]"
                  />
                </div>

                {/* Nome de quem doou */}
                <div>
                  <label className="text-[10px] font-serif-vintage uppercase font-bold text-[#7c5a45] block mb-1">
                    Seu Nome ou Apelido
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pedrinho, Carol..."
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a]"
                  />
                </div>

                {/* Recado pro Igor */}
                <div>
                  <label className="text-[10px] font-serif-vintage uppercase font-bold text-[#7c5a45] block mb-1">
                    Mensagem pro Igor
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: Parabéns meu irmão, o Glorioso é eterno!"
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#26120c] hover:bg-[#381a10] text-[#faf5eb] font-serif-vintage font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all mt-2 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Flame size={15} className="text-[#eab308]" />
                  <span>Confirmar & Acender o Beck</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
