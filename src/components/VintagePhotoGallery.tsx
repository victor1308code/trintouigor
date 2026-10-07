import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface IgorPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  rotation: string;
  likes: number;
}

export const VintagePhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<IgorPhoto | null>(null);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({
    '1': 32,
    '2': 45,
    '3': 28,
    '4': 59,
    '5': 67,
    '6': 38,
    '7': 41,
  });

  const photos: IgorPhoto[] = [
    {
      id: '4',
      src: '/photos/igor-4.jpg',
      title: 'A Beca do Aniversariante',
      caption: 'Na elegância pura pronto pra comandar a noite.',
      rotation: 'rotate-[-1.5deg]',
      likes: likesMap['4'] || 59,
    },
    {
      id: '2',
      src: '/photos/igor-2.jpg',
      title: 'Olhar do Glorioso',
      caption: 'O piercing e os óculos de quem sabe viver.',
      rotation: 'rotate-[2deg]',
      likes: likesMap['2'] || 45,
    },
    {
      id: '1',
      src: '/photos/igor-1.jpg',
      title: 'O Foco da Lenda',
      caption: 'Analisando quem já mandou o Pix do baile.',
      rotation: 'rotate-[-2deg]',
      likes: likesMap['1'] || 32,
    },
    {
      id: '5',
      src: '/photos/igor-5.jpg',
      title: 'Emotional Exhaustion',
      caption: 'O guerreiro descansando porque 30 anos pesam!',
      rotation: 'rotate-[1.5deg]',
      likes: likesMap['5'] || 67,
    },
    {
      id: '7',
      src: '/photos/igor-7.jpg',
      title: 'A Pose Clássica',
      caption: 'Quando a resenha tá boa demais pra explicar.',
      rotation: 'rotate-[-1deg]',
      likes: likesMap['7'] || 41,
    },
    {
      id: '6',
      src: '/photos/igor-6.jpg',
      title: 'Brisa Matinal',
      caption: 'Abraçado no travesseiro pensando na vida.',
      rotation: 'rotate-[2.5deg]',
      likes: likesMap['6'] || 38,
    },
  ];

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#dc2626', '#f59e0b', '#16a34a'],
    });
  };

  return (
    <section id="galeria" className="relative py-12 px-4 max-w-6xl mx-auto">
      {/* Título da Galeria */}
      <div className="text-center mb-10">
        <span className="text-xs font-serif-vintage tracking-widest text-[#e8c89b] uppercase block mb-1">
          O MUSEU DO GLORIOSO
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-vintage font-bold text-[#faf3e3] uppercase tracking-tight">
          Momentos & Registros do Igor
        </h2>
        <p className="text-xs sm:text-sm font-serif-vintage italic text-[#e6d5c1] mt-1 max-w-md mx-auto">
          Clique nas fotos polaroid para ampliar as relíquias do nosso aniversariante.
        </p>
      </div>

      {/* Grid Scrapbook de Polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, rotate: 0 }}
            onClick={() => setSelectedPhoto(photo)}
            className={`p-3.5 pb-5 rounded-2xl bg-[#faf5eb] border border-[#e5decb] shadow-xl hover:shadow-2xl transition-all cursor-pointer relative ${photo.rotation}`}
          >
            {/* Fita crepe colada no topo */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#f0e3cc]/80 border border-[#dfceb0] shadow-xs transform rotate-1 pointer-events-none" />

            {/* A Foto com moldura clássica de Polaroid */}
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 border border-[#e5decb] relative">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover object-top filter contrast-[1.05] hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Legenda Estilo Manuscrita */}
            <div className="mt-3 px-1 flex items-start justify-between gap-2">
              <div>
                <h4 className="font-serif-vintage font-bold text-sm text-[#26120c] leading-tight">
                  {photo.title}
                </h4>
                <p className="font-handwriting text-base text-[#7c5a45] leading-tight mt-0.5">
                  "{photo.caption}"
                </p>
              </div>

              {/* Botão de Curtir Coração */}
              <button
                onClick={(e) => handleLike(photo.id, e)}
                className="p-1.5 rounded-full hover:bg-[#f2e7d5] text-[#b91c1c] flex items-center gap-1 text-xs font-bold transition-all flex-shrink-0"
              >
                <Heart size={15} className="fill-[#b91c1c]" />
                <span className="text-[11px] text-[#26120c] font-serif-vintage">
                  {likesMap[photo.id]}
                </span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL LIGHTBOX PARA VER A FOTO AMPLIADA */}
      <AnimatePresence>
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-md w-full rounded-3xl bg-[#faf5eb] p-4 sm:p-6 shadow-2xl border-2 border-[#dfceb0] text-[#2c1810] relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[#efe3d0] hover:bg-[#e0d2bc] text-[#26120c]"
              >
                <X size={18} />
              </button>

              <div className="rounded-2xl overflow-hidden border border-[#dfceb0] max-h-[60vh] bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-serif-vintage font-bold text-lg text-[#26120c]">
                  {selectedPhoto.title}
                </h3>
                <p className="font-handwriting text-xl text-[#7c5a45] mt-1">
                  "{selectedPhoto.caption}"
                </p>
                <div className="mt-3 flex justify-center items-center gap-2">
                  <span className="text-xs font-serif-vintage text-[#8c6d58] flex items-center gap-1">
                    <Sparkles size={14} className="text-[#b45309]" />
                    {likesMap[selectedPhoto.id]} amigos curtiram esse momento
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
