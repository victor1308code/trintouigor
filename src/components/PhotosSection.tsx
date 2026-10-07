import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Camera, Heart, Eye, Unlock } from 'lucide-react';
import { BotafogoStar, CannabisLeaf } from './Icons';
import confetti from 'canvas-confetti';

interface PhotoItem {
  id: string;
  url: string;
  author: string;
  caption: string;
  likes: number;
}

export const PhotosSection: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [likesMap, setLikesMap] = useState<Record<string, boolean>>({});

  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80',
      author: 'Lucas (Aniversariante)',
      caption: 'Só os escolhidos na resenha alvinegra! ⭐️',
      likes: 24,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80',
      author: 'Victor',
      caption: 'A fumaça tá cobrindo o Rio de Janeiro hoje! 🌿💨',
      likes: 19,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80',
      author: 'Gabriel Fogão',
      caption: 'O aniversariante não tá aguentando a pressão do Nilton Santos!',
      likes: 31,
    },
  ]);

  const handleLike = (id: string) => {
    setLikesMap((prev) => ({ ...prev, [id]: !prev[id] }));
    setPhotos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, likes: likesMap[id] ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const handleSimulatePhoto = () => {
    const newP: PhotoItem = {
      id: String(Date.now()),
      url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80',
      author: 'Você (Convidado)',
      caption: 'Foto teste enviada com sucesso pro telão da festa! 🔥',
      likes: 1,
    };
    setPhotos((prev) => [newP, ...prev]);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#10b981', '#34d399'],
    });
  };

  return (
    <section id="fotos" className="relative py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
          MEMÓRIAS DA RESENHA
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
          ÁLBUM DE FOTOS
        </h2>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mt-2">
          As fotos tiradas pelos convidados durante a festa serão exibidas ao vivo aqui.
        </p>
      </div>

      <div className="rounded-3xl bg-neutral-900/80 border border-neutral-800 p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* Background Icons */}
        <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
          <BotafogoStar size={240} className="text-white" />
        </div>
        <div className="absolute -bottom-10 -left-10 opacity-5 pointer-events-none">
          <CannabisLeaf size={240} className="text-emerald-500" />
        </div>

        <AnimatePresence mode="wait">
          {!isPreviewOpen ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto"
            >
              {/* Ícone de Cadeado Alvinegro */}
              <div className="w-20 h-20 rounded-3xl bg-neutral-950 border-2 border-neutral-700 flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
                <Lock size={36} className="text-emerald-400 animate-pulse" />
                <div className="absolute -top-2 -right-2 bg-black p-1 rounded-full border border-neutral-700">
                  <BotafogoStar size={16} className="text-white" />
                </div>
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
                Trancado para o Pré-Festa
              </span>
              <h3 className="text-2xl font-black text-white uppercase mb-3">
                Desbloqueio em 24 de Outubro
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                No dia da festa às 20h, o upload direto da câmera de todos os celulares será ativado para projetar as fotos no telão!
              </p>

              <button
                onClick={() => setIsPreviewOpen(true)}
                className="py-3 px-6 rounded-2xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto transition-all active:scale-95 shadow-md"
              >
                <Eye size={16} className="text-emerald-400" />
                <span>Espiar como será a Galeria (Modo Teste)</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="unlocked"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-2 uppercase">
                  <Unlock size={14} /> Modo Demonstração da Galeria
                </span>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-1 rounded-lg bg-neutral-800"
                >
                  Voltar a Trancar
                </button>
              </div>

              <button
                onClick={handleSimulatePhoto}
                className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20 active:scale-98 transition-all"
              >
                <Camera size={20} />
                <span>Simular Envio de Foto da Câmera</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {photos.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-xl flex flex-col justify-between"
                  >
                    <div className="aspect-square overflow-hidden bg-neutral-900">
                      <img
                        src={p.url}
                        alt={p.caption}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-white">
                          {p.author}
                        </span>
                        <button
                          onClick={() => handleLike(p.id)}
                          className="flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-red-400"
                        >
                          <Heart
                            size={14}
                            className={likesMap[p.id] ? 'fill-red-400 text-red-400' : ''}
                          />
                          <span>{p.likes}</span>
                        </button>
                      </div>
                      <p className="text-xs text-neutral-300">
                        {p.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
