import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, PlusCircle, Flame, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CannabisLeafIcon, leafPathD } from './CannabisLeafIcon';
import { RealisticJoint } from './RealisticJoint';

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
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isPuffing, setIsPuffing] = useState(false);

  const pixKeyPhone = '61982228996';
  const pixKeyDisplay = '(61) 98222-8996';
  const pixBeneficiary = 'Igor Henrique Anjos Marques';
  const pixCopiaCola = '00020126770014br.gov.bcb.pix0114+5561982228996023730tou_do_Igor_Nicolau_(casa_e_comida)5204000053039865802BR5925IGOR_HENRIQUE_ANJOS_MARQU6008BRASILIA62290525dHiNyE5D1npOPQCJHtctq0t786304639D';

  // Cálculo da queima do beck conforme as contribuições entram
  // Inicia em 0% quando não há contribuições
  const burnPercentage = totalAmount === 0 
    ? 0 
    : Math.min(95, Math.max(8, Math.round((totalAmount / 1500) * 80) + 10));

  const handleCopyKey = () => {
    navigator.clipboard.writeText(pixKeyPhone);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(pixCopiaCola);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  // Disparo comemorativo de confetes com formato vetorial da FOLHA DE MACONHA
  const triggerCannabisConfetti = (isSuperBlast = false) => {
    try {
      let leafShape: any = 'circle';
      if (typeof (confetti as any).shapeFromPath === 'function') {
        leafShape = (confetti as any).shapeFromPath({
          path: leafPathD,
          matrix: [0.1, 0, 0, 0.1, -5, -5],
        });
      }

      const weedRastaColors = [
        '#16a34a', // Verde clássico
        '#22c55e', // Verde vibrante
        '#15803d', // Verde floresta
        '#4ade80', // Verde broto fresco
        '#84cc16', // Verde lima aromático
        '#eab308', // Ouro canábico
        '#ca8a04', // Âmbar resinoso
        '#dc2626', // Vermelho rasta
      ];

      // Chuva Central de Folhas de Maconha (escala aumentada para nitidez do formato)
      confetti({
        shapes: [leafShape],
        scalar: isSuperBlast ? 3.3 : 2.8,
        particleCount: isSuperBlast ? 90 : 65,
        spread: 90,
        origin: { y: 0.65 },
        colors: weedRastaColors,
        gravity: 0.75,
        decay: 0.93,
        ticks: 320,
      });

      // Tiros Laterais em leque para preencher a tela inteira com as folhinhas
      setTimeout(() => {
        confetti({
          shapes: [leafShape],
          scalar: isSuperBlast ? 2.9 : 2.4,
          particleCount: isSuperBlast ? 55 : 40,
          angle: 55,
          spread: 70,
          origin: { x: 0.15, y: 0.72 },
          colors: weedRastaColors,
          gravity: 0.72,
          decay: 0.93,
          ticks: 300,
        });

        confetti({
          shapes: [leafShape],
          scalar: isSuperBlast ? 2.9 : 2.4,
          particleCount: isSuperBlast ? 55 : 40,
          angle: 125,
          spread: 70,
          origin: { x: 0.85, y: 0.72 },
          colors: weedRastaColors,
          gravity: 0.72,
          decay: 0.93,
          ticks: 300,
        });
      }, 140);
    } catch (e) {
      console.warn('Erro ao disparar confetes da folha:', e);
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#16a34a', '#22c55e', '#eab308', '#dc2626'],
      });
    }
  };

  const handlePuffClick = () => {
    setIsPuffing(true);
    onPuff();
    triggerCannabisConfetti(false);
    setTimeout(() => setIsPuffing(false), 2700);
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

    triggerCannabisConfetti(true);

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

        {/* Header do Beckômetro (Sem símbolo no início e sem frase) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e5decb] mt-1">
          <div>
            <h3 className="font-serif-vintage font-black text-2xl sm:text-3xl tracking-tight text-[#26120c] uppercase">
              O BECKÔMETRO DO IGOR
            </h3>
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

        {/* O BASEADO HIPER-REALISTA */}
        <div className="my-5 relative px-1">
          <RealisticJoint burnProgress={burnPercentage} isPuffing={isPuffing} />
        </div>

        {/* Botão Interativo: Puxar Fumaça (com feedback animado e confetes de folha) */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handlePuffClick}
            disabled={isPuffing}
            className={`px-6 py-3 rounded-full font-serif-vintage font-bold text-xs uppercase tracking-wider border shadow-lg flex items-center gap-2.5 active:scale-95 transition-all cursor-pointer ${
              isPuffing
                ? 'bg-[#16a34a] text-white border-[#15803d] shadow-green-900/40 animate-pulse'
                : 'bg-[#f2e7d5] hover:bg-[#ebdcc5] text-[#26120c] border-[#ded0b9] shadow-md'
            }`}
          >
            {isPuffing ? (
              <>
                <Wind size={16} className="text-white animate-spin" />
                <span className="font-extrabold tracking-wider">Soltando Muita Fumaça... 💨</span>
                <CannabisLeafIcon className="w-4 h-4 text-white" />
              </>
            ) : (
              <>
                <Wind size={16} className="text-[#16a34a]" />
                <span>Puxar uma Fumaça Comemorativa</span>
                <CannabisLeafIcon className="w-4 h-4 text-[#16a34a]" />
              </>
            )}
          </button>
        </div>

        {/* ÁREA DO PIX: QR CODE + CHAVE + REGISTRAR CONTRIBUIÇÃO */}
        <div className="pt-5 border-t border-[#e5decb]">
          {/* Destino do Pix: aluguel da casa da festa */}
          <div className="mb-5 flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#16a34a]/10 border border-[#16a34a]/30 text-left">
            <span className="text-2xl sm:text-3xl shrink-0" aria-hidden="true">🏡</span>
            <div>
              <span className="block text-xs sm:text-sm font-serif-vintage font-black uppercase tracking-wide text-[#15803d]">
                O Pix é pra ajudar no aluguel da casa
              </span>
              <span className="block text-[11px] sm:text-xs font-serif-vintage text-[#593d31] leading-snug mt-0.5">
                Toda contribuição vai pro aluguel da casa onde vai rolar a festa. Qualquer valor ajuda!
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Lado Esquerdo: QR Code Oficial e Chave Pix */}
            <div className="sm:col-span-6 flex flex-col items-center text-center p-4 rounded-2xl bg-[#f5ede0] border border-[#e5d8c3]">
              <span className="text-xs font-serif-vintage font-bold text-[#26120c] uppercase block mb-1">
                QR CODE OFICIAL PIX DO IGOR
              </span>

              {/* QR Code Oficial em Alta Qualidade */}
              <div className="p-2 rounded-2xl bg-white border-2 border-[#26120c] shadow-md my-2 relative max-w-[180px] w-full">
                <img
                  src="/pix-qrcode-oficial.jpg"
                  alt="QR Code Oficial Pix do Igor"
                  className="w-full aspect-square object-contain rounded-xl mx-auto shadow-inner"
                />
              </div>

              <div className="w-full mt-1 space-y-2">
                <div>
                  <span className="font-mono text-xs text-[#26120c] block font-bold">
                    {pixKeyDisplay}
                  </span>
                  <span className="text-[10px] text-[#7c5a45] font-serif-vintage block">
                    {pixBeneficiary}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 pt-1">
                  <button
                    type="button"
                    onClick={handleCopyKey}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-serif-vintage font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                      copiedKey
                        ? 'bg-[#16a34a] text-white'
                        : 'bg-[#26120c] hover:bg-[#402015] text-[#faf5eb]'
                    }`}
                  >
                    {copiedKey ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedKey ? 'Chave Copiada!' : 'Copiar Chave (Telefone)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyPayload}
                    className={`w-full py-2 px-3 rounded-xl text-[11px] font-serif-vintage font-bold flex items-center justify-center gap-1.5 transition-all border border-[#c4b59f] cursor-pointer ${
                      copiedPayload
                        ? 'bg-[#16a34a] text-white border-[#16a34a]'
                        : 'bg-[#ece0cc] hover:bg-[#dfd0b9] text-[#26120c]'
                    }`}
                  >
                    {copiedPayload ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedPayload ? 'Código Copiado!' : 'Copiar Pix Copia e Cola'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Lado Direito: Botão para Registrar Pix */}
            <div className="sm:col-span-6 flex flex-col justify-center space-y-3 p-4 rounded-2xl bg-[#f5ede0] border border-[#e5d8c3] text-center sm:text-left">
              <div>
                <span className="text-xs font-serif-vintage font-bold text-[#26120c] uppercase block mb-1">
                  Fortalecimento Livre
                </span>
                <p className="text-xs font-serif-vintage text-[#7c5a45] leading-relaxed">
                  Não há valor mínimo nem meta estipulada. Cada contribuição ajuda no aluguel da casa, acende a brasa e fortalece a celebração dos 30 anos do Glorioso!
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
                Envie seu Pix de qualquer quantia para a chave <strong className="text-[#26120c] font-mono">{pixKeyDisplay}</strong> ({pixBeneficiary}) e registre aqui para queimar o beck! O valor vai pro aluguel da casa da festa.
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
