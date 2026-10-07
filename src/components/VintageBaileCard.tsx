import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, PlusCircle, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface Donation {
  id: string;
  name: string;
  amount: number;
  message: string;
  timestamp: string;
}

interface VintageBaileCardProps {
  totalAmount: number;
  targetAmount: number;
  donations: Donation[];
  onAddDonation: (donation: Omit<Donation, 'id' | 'timestamp'>) => void;
  onPuff: () => void;
}

export const VintageBaileCard: React.FC<VintageBaileCardProps> = ({
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

  const percentage = Math.min(100, Math.max(0, Math.round((totalAmount / targetAmount) * 100)));
  const pixKey = '30.igor.glorioso@pix';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = selectedCota || parseFloat(customAmount);
    if (!finalAmount || finalAmount <= 0) return;
    if (!donorName.trim()) return;

    onAddDonation({
      name: donorName.trim(),
      amount: finalAmount,
      message: donorMessage.trim() || 'Fortalecendo o Glorioso Igor nos 30 anos!',
    });

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#16a34a', '#ca8a04', '#dc2626', '#faf5eb'],
    });

    setDonorName('');
    setDonorMessage('');
    setShowModal(false);
    onPuff();
  };

  return (
    <div id="baile" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl bg-[#faf5eb] text-[#2c1810] p-6 sm:p-7 shadow-2xl border border-[#e5decb] relative overflow-hidden"
      >
        {/* Título Superior */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e5decb] mb-4">
          <div>
            <h3 className="font-serif-vintage font-black text-xl sm:text-2xl tracking-tight text-[#26120c] uppercase">
              FORTALEÇA O BAILE!
            </h3>
            <span className="text-xs font-serif-vintage italic text-[#7c5a45] block">
              (Doações do Aniversário)
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-serif-vintage uppercase font-bold text-[#8c6d58] block">
              Total Arrecadado
            </span>
            <span className="text-xl sm:text-2xl font-black font-serif-vintage text-[#26120c]">
              R$ {totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        {/* ÁREA CENTRAL: A MÃO SEGURANDO O BASEADO (WOODCUT ILUSTRADO) + QR CODE */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center my-3">
          
          {/* Lado Esquerdo: A Ilustração Gravada da Mão com o Cigarro Fumegante */}
          <div className="md:col-span-7 flex flex-col items-center justify-center p-3 rounded-2xl bg-[#f5ede0] border border-[#e5d8c3] relative">
            
            {/* SVG Woodcut Engraved Hand with Cigarette / Joint */}
            <div className="relative w-full max-w-[260px] h-[130px] flex items-center justify-center">
              
              {/* Fumaça animada subindo da ponta do cigarro */}
              <div className="absolute top-2 right-12 pointer-events-none flex flex-col items-center z-20">
                <div className="w-5 h-5 rounded-full bg-neutral-400/30 blur-sm animate-smoke-curl" />
                <div className="w-6 h-6 rounded-full bg-amber-500/20 blur-md animate-smoke-curl -mt-3" style={{ animationDelay: '0.8s' }} />
                <div className="w-7 h-7 rounded-full bg-neutral-300/20 blur-md animate-smoke-curl -mt-4" style={{ animationDelay: '1.5s' }} />
              </div>

              {/* Brasa Incandescente na Ponta */}
              <div className="absolute top-[48px] right-[48px] z-10">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 animate-pulse shadow-[0_0_12px_#ea580c] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-200" />
                </div>
              </div>

              {/* Desenho da Mão Segurando o Cigarro (Arte em Linhas Xilogravura) */}
              <svg viewBox="0 0 300 150" className="w-full h-full text-[#2c1810]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                {/* Braço / Punho */}
                <path d="M10,130 C40,115 65,110 90,105" />
                <path d="M10,85 C45,75 75,75 100,80" />
                {/* Mão / Palma */}
                <path d="M90,105 C115,100 145,105 165,115 C175,120 185,115 190,105" />
                {/* Polegar */}
                <path d="M110,75 C135,60 160,58 180,68 C195,75 195,85 180,92 C165,98 150,96 130,95" />
                {/* Linhas de hachuras do polegar */}
                <path d="M130,73 L135,78 M145,68 L150,74 M160,67 L165,73 M175,70 L178,76" strokeWidth="1.2" opacity="0.6" />
                {/* Indicador segurando o cigarro */}
                <path d="M160,95 C185,92 205,88 220,93 C228,96 226,104 218,107 C200,112 180,110 165,108" />
                {/* Dedo Médio */}
                <path d="M155,110 C180,112 200,110 212,116 C218,119 216,126 208,128 C190,130 170,126 150,122" />
                {/* Dedo Anelar */}
                <path d="M140,123 C160,127 180,128 195,133 C200,135 198,141 190,142 C175,142 155,136 135,130" />
                {/* O CIGARRO / BASEADO */}
                {/* Piteira */}
                <rect x="175" y="80" width="18" height="10" rx="1" fill="#dfceb0" stroke="currentColor" strokeWidth="2" />
                {/* Corpo do cigarro */}
                <rect x="193" y="80" width="55" height="10" rx="1" fill="#fffdfa" stroke="currentColor" strokeWidth="2" />
                {/* Cinza na ponta */}
                <path d="M248,80 L254,80 C256,83 256,87 254,90 L248,90 Z" fill="#78716c" stroke="currentColor" strokeWidth="1.8" />
                {/* Linhas de fumaça desenhadas gravadas */}
                <path d="M255,83 C265,75 260,65 272,55 C280,48 275,35 285,25" strokeWidth="1.8" strokeDasharray="2 2" opacity="0.75" />
                <path d="M256,87 C270,82 272,70 282,62 C290,55 288,40 295,30" strokeWidth="1.5" opacity="0.6" />
                {/* Hachuras de textura vintage */}
                <path d="M50,90 L52,105 M60,88 L63,103 M70,86 L73,102" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>

            {/* BARRA DE METAS (GRADIENTE VERDE A VERMELHO) */}
            <div className="w-full mt-2">
              <div className="flex justify-between text-[11px] font-serif-vintage font-bold text-[#593d31] mb-1">
                <span>META: R$ {targetAmount} / ATINGIDO: R$ {totalAmount}</span>
                <span className="text-[#b45309] font-black">{percentage}%</span>
              </div>

              {/* Barra de Progresso com gradiente clássico verde-amarelo-vermelho */}
              <div className="w-full h-4 rounded-full bg-[#e5d8c3] p-0.5 border border-[#d4c3a7] overflow-hidden shadow-inner">
                <motion.div
                  initial={false}
                  animate={{ width: `${Math.max(6, percentage)}%` }}
                  transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#16a34a] via-[#eab308] to-[#dc2626] shadow-sm relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>

              <div className="flex justify-between text-[10px] font-serif-vintage text-[#7c5a45] mt-1">
                <span>Acendendo a brasa</span>
                <span className="font-bold">Queima Completa</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Chave Pix e QR Code */}
          <div className="md:col-span-5 flex flex-col items-center text-center p-3 rounded-2xl bg-[#f5ede0] border border-[#e5d8c3]">
            <span className="text-[11px] font-serif-vintage font-bold text-[#593d31] uppercase block">
              PIX: {pixKey}
            </span>
            <span className="text-[10px] font-serif-vintage italic text-[#7c5a45] block mb-2">
              (Doe e Participe)
            </span>

            {/* QR Code Vintage com Moldura */}
            <div className="p-2 rounded-xl bg-white border-2 border-[#26120c] shadow-md my-1 relative">
              <svg viewBox="0 0 140 140" className="w-28 h-28 mx-auto" fill="#26120c">
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
              {/* Mini coração/selo no centro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#faf5eb] border border-[#26120c] flex items-center justify-center text-[10px]">
                  🌿
                </div>
              </div>
            </div>

            {/* Botão Copiar Pix */}
            <button
              onClick={handleCopyPix}
              className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-serif-vintage font-bold flex items-center gap-1.5 transition-all shadow-sm ${
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

        {/* COTAS & BOTÃO REGISTRAR */}
        <div className="mt-4 pt-4 border-t border-[#e5decb] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {[20, 50, 100, 200].map((val) => (
              <button
                key={val}
                onClick={() => {
                  setSelectedCota(val);
                  setCustomAmount('');
                  setShowModal(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#f5ede0] hover:bg-[#efe3d0] border border-[#ded0b9] text-xs font-serif-vintage font-bold text-[#26120c] transition-all active:scale-95 shadow-sm"
              >
                + R$ {val}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] font-serif-vintage font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <PlusCircle size={16} />
            <span>Fortalecer o Baile (Pix)</span>
          </button>
        </div>

        {/* MURAL RÁPIDO DE RECADO DOS APOIADORES */}
        <div className="mt-4 pt-3 border-t border-[#e5decb]">
          <span className="text-[10px] font-serif-vintage uppercase font-bold text-[#7c5a45] block mb-2">
            Últimos Salves de Apoio ({donations.length}):
          </span>
          <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
            {donations.map((d) => (
              <div
                key={d.id}
                className="px-3 py-1.5 rounded-xl bg-[#f2e7d5] border border-[#e0d2bc] text-xs flex items-center gap-2 shadow-sm"
              >
                <span className="font-bold text-[#26120c] font-serif-vintage">
                  {d.name}:
                </span>
                <span className="text-[#593d31] italic">
                  "{d.message}"
                </span>
                <span className="text-[10px] font-bold text-[#16a34a] bg-white/60 px-1.5 py-0.2 rounded">
                  +R${d.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* MODAL PARA CONTRIBUIR */}
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
                className="absolute top-4 right-4 text-[#8c6d58] hover:text-[#26120c] text-lg font-bold w-8 h-8 rounded-full bg-[#f2e7d5] flex items-center justify-center"
              >
                ✕
              </button>

              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#efe3d0] border border-[#ded0b9] flex items-center justify-center mx-auto mb-2 text-[#b45309]">
                  <Heart size={24} className="animate-pulse" />
                </div>
                <h4 className="text-lg font-serif-vintage font-bold text-[#26120c] uppercase">
                  Fortalecer o Baile
                </h4>
                <p className="text-xs font-serif-vintage text-[#7c5a45]">
                  Seu apoio sobe o contador e acende a fumaça na hora!
                </p>
              </div>

              <form onSubmit={handleConfirmDonation} className="space-y-3">
                <div>
                  <label className="text-xs font-bold font-serif-vintage text-[#593d31] block mb-1">
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
                        className={`py-1.5 rounded-xl text-xs font-serif-vintage font-bold border transition-all ${
                          selectedCota === val
                            ? 'bg-[#26120c] text-[#faf5eb] border-[#26120c]'
                            : 'bg-[#f5ede0] text-[#593d31] border-[#ded0b9]'
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
                    className="w-full px-3 py-2 rounded-xl bg-[#fffdfa] border border-[#ded0b9] text-xs text-[#26120c] focus:outline-none focus:border-[#b45309]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold font-serif-vintage text-[#593d31] block mb-1">
                    Seu Nome ou Apelido
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Gabriel da Resenha"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#fffdfa] border border-[#ded0b9] text-xs text-[#26120c] focus:outline-none focus:border-[#b45309]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold font-serif-vintage text-[#593d31] block mb-1">
                    Recado pro Igor (O Glorioso)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mande um salve pro aniversariante..."
                    value={donorMessage}
                    onChange={(e) => setDonorMessage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#fffdfa] border border-[#ded0b9] text-xs text-[#26120c] focus:outline-none focus:border-[#b45309] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#26120c] hover:bg-[#402015] text-[#faf5eb] font-serif-vintage font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  Confirmar Salve 🔥
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
