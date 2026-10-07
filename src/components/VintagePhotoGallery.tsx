import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CannabisLeafIcon, leafPathD } from './CannabisLeafIcon';

export interface PhotoComment {
  id: string;
  photoId: string;
  author: string;
  text: string;
  timestamp: string;
}

interface IgorPhoto {
  id: string;
  src: string;
  rotation: string;
}

export const VintagePhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<IgorPhoto | null>(null);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');

  // Curtidas da maconha (inicia em 0 para todas as fotos)
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('trintou_igor_photo_cannabis_likes_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      '4': 0,
      '2': 0,
      '1': 0,
      '5': 0,
      '7': 0,
      '6': 0,
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('trintou_igor_photo_cannabis_likes_v1', JSON.stringify(likesMap));
    } catch {
      // ignore
    }
  }, [likesMap]);

  // Comentários dos visitantes (inicia totalmente zerado, sem comentários padrões)
  const [comments, setComments] = useState<PhotoComment[]>(() => {
    try {
      localStorage.removeItem('trintou_igor_photo_comments_v2');
      localStorage.removeItem('trintou_igor_photo_comments_clean_v3');
      const saved = localStorage.getItem('trintou_igor_photo_comments_empty_v4');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('trintou_igor_photo_comments_empty_v4', JSON.stringify(comments));
    } catch {
      // ignore
    }
  }, [comments]);

  // Lista de Fotos do Igor sem nenhuma legenda
  const photos: IgorPhoto[] = [
    {
      id: '4',
      src: '/photos/igor-4.jpg',
      rotation: 'rotate-[-1.5deg]',
    },
    {
      id: '2',
      src: '/photos/igor-2.jpg',
      rotation: 'rotate-[2deg]',
    },
    {
      id: '1',
      src: '/photos/igor-1.jpg',
      rotation: 'rotate-[-2deg]',
    },
    {
      id: '5',
      src: '/photos/igor-5.jpg',
      rotation: 'rotate-[1.5deg]',
    },
    {
      id: '7',
      src: '/photos/igor-7.jpg',
      rotation: 'rotate-[-1deg]',
    },
    {
      id: '6',
      src: '/photos/igor-6.jpg',
      rotation: 'rotate-[2.5deg]',
    },
  ];

  // Ação de Curtir com a Folha de Maconha (inicia em 0)
  const handleLike = (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    setLikesMap((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));

    // Dispara confetes comemorativos em formato de folha de maconha
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
        scalar: 2.7,
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#16a34a', '#22c55e', '#15803d', '#eab308', '#dc2626'],
      });
    } catch {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#16a34a', '#22c55e', '#eab308'],
      });
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoto) return;
    if (!newAuthor.trim() || !newComment.trim()) return;

    const item: PhotoComment = {
      id: String(Date.now()),
      photoId: selectedPhoto.id,
      author: newAuthor.trim(),
      text: newComment.trim(),
      timestamp: 'Agora mesmo',
    };

    setComments((prev) => [item, ...prev]);
    setNewAuthor('');
    setNewComment('');

    // Dispara confetes comemorativos de folha de maconha
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
        particleCount: 50,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#eab308', '#dc2626'],
      });
    } catch {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const getCommentsForPhoto = (photoId: string) => {
    return comments.filter((c) => c.photoId === photoId);
  };

  const selectedPhotoComments = selectedPhoto ? getCommentsForPhoto(selectedPhoto.id) : [];

  return (
    <section id="galeria" className="relative py-12 px-4 max-w-6xl mx-auto">
      {/* Título da Galeria / Mural */}
      <div className="text-center mb-10">
        <span className="text-xs font-serif-vintage tracking-widest text-[#e8c89b] uppercase block mb-1">
          O MURAL DO GLORIOSO
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-vintage font-bold text-[#faf3e3] uppercase tracking-tight">
          Momentos & Registros do Igor
        </h2>
        <p className="text-xs sm:text-sm font-serif-vintage italic text-[#e6d5c1] mt-1 max-w-md mx-auto">
          Curta com a folhinha e deixe seu comentário pro aniversariante nas fotos polaroid.
        </p>
      </div>

      {/* Grid de Polaroids (Fotos limpas + Curtir da Maconha + Comentar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo) => {
          const photoComments = getCommentsForPhoto(photo.id);
          const latestComment = photoComments[0];
          const likesCount = likesMap[photo.id] || 0;

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`p-3 pb-4 rounded-2xl bg-[#faf5eb] border border-[#e5decb] shadow-xl hover:shadow-2xl transition-all cursor-pointer relative flex flex-col justify-between ${photo.rotation}`}
            >
              {/* Fita crepe no topo da polaroid */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#f0e3cc]/80 border border-[#dfceb0] shadow-xs transform rotate-1 pointer-events-none" />

              <div>
                {/* A Foto com moldura clássica de Polaroid limpa sem texto */}
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 border border-[#e5decb] relative">
                  <img
                    src={photo.src}
                    alt="Foto do Igor"
                    className="w-full h-full object-cover object-top filter contrast-[1.05] hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Área de Ações: Curtir da Maconha + Botão Comentar */}
              <div className="mt-3.5 pt-2.5 border-t border-[#e8ded0] px-1">
                <div className="flex items-center justify-between gap-2">
                  {/* BOTÃO DE CURTIR DA MACONHA (INICIA EM 0) */}
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="group py-1.5 px-3 rounded-full bg-[#f2e7d5] hover:bg-[#e3f2e5] hover:border-[#16a34a] border border-[#ded0b9] flex items-center gap-1.5 text-xs font-serif-vintage font-bold text-[#26120c] transition-all shadow-xs active:scale-90 cursor-pointer"
                    title="Dar uma curtida de maconha nessa foto"
                  >
                    <CannabisLeafIcon className="w-4 h-4 text-[#16a34a] group-hover:scale-125 transition-transform" />
                    <span>{likesCount}</span>
                  </button>

                  {/* BOTÃO COMENTAR */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPhoto(photo);
                    }}
                    className="py-1.5 px-3.5 rounded-full bg-[#26120c] hover:bg-[#3f1f14] text-[#faf5eb] flex items-center gap-1.5 text-xs font-serif-vintage font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <MessageCircle size={13} className="text-[#eab308]" />
                    <span>Comentar</span>
                    {photoComments.length > 0 && (
                      <span className="bg-[#eab308] text-[#26120c] text-[10px] font-black px-1.5 rounded-full">
                        {photoComments.length}
                      </span>
                    )}
                  </button>
                </div>

                {/* Exibição do Último Comentário (se algum visitante comentou) */}
                {latestComment && (
                  <div className="mt-2 p-2 rounded-xl bg-[#f4ebe0] border border-[#e2d5c3] text-[11px] text-[#5e4130] flex items-start gap-1.5 line-clamp-1">
                    <span className="font-bold text-[#26120c] flex-shrink-0">
                      {latestComment.author}:
                    </span>
                    <span className="italic truncate">"{latestComment.text}"</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* MODAL LIGHTBOX COM FOTO LIMPA, CURTIR DA MACONHA E FORMULÁRIO DE COMENTÁRIO */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full rounded-3xl bg-[#faf5eb] border-2 border-[#dfceb0] shadow-2xl text-[#2c1810] relative overflow-hidden my-auto"
            >
              {/* Botão Fechar */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#f2e7d5] hover:bg-[#e6d7be] text-[#26120c] transition-all cursor-pointer shadow-sm"
                title="Fechar"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto md:overflow-visible">
                {/* Coluna 1: A Foto Ampliada (Limpa) com Botão de Curtir da Maconha */}
                <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[#f5ece0] border-b md:border-b-0 md:border-r border-[#dfceb0]">
                  <div>
                    <div className="rounded-2xl overflow-hidden border-2 border-[#26120c] bg-black aspect-[4/5] max-h-[50vh] md:max-h-none shadow-md">
                      <img
                        src={selectedPhoto.src}
                        alt="Foto do Igor ampliada"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#dfceb0] flex items-center justify-between gap-2">
                    {/* Botão Curtir da Maconha no Modal */}
                    <button
                      onClick={() => handleLike(selectedPhoto.id)}
                      className="group py-1.5 px-3.5 rounded-full bg-[#faf5eb] hover:bg-[#e3f2e5] hover:border-[#16a34a] border border-[#ded0b9] flex items-center gap-2 text-xs font-serif-vintage font-bold text-[#26120c] shadow-xs active:scale-90 transition-all cursor-pointer"
                    >
                      <CannabisLeafIcon className="w-4 h-4 text-[#16a34a] group-hover:scale-125 transition-transform" />
                      <span>Curtir ({likesMap[selectedPhoto.id] || 0})</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-xs font-serif-vintage text-[#8c6d58]">
                      <CannabisLeafIcon className="w-3.5 h-3.5 text-[#16a34a]" />
                      <span>Mural do Glorioso</span>
                    </div>
                  </div>
                </div>

                {/* Coluna 2: Lista de Comentários & Formulário para Comentar */}
                <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[#faf5eb]">
                  <div>
                    {/* Header dos Comentários */}
                    <div className="flex items-center gap-2 pb-3 border-b border-[#dfceb0] mb-3">
                      <MessageCircle size={18} className="text-[#16a34a]" />
                      <h4 className="font-serif-vintage font-black text-base uppercase text-[#26120c]">
                        Comentários ({selectedPhotoComments.length})
                      </h4>
                    </div>

                    {/* Lista com Scroll de Comentários */}
                    <div className="space-y-2.5 max-h-[220px] sm:max-h-[260px] overflow-y-auto pr-1">
                      {selectedPhotoComments.length === 0 ? (
                        <div className="text-center py-8 text-[#8c6d58] font-serif-vintage text-xs italic">
                          Nenhum comentário nessa foto ainda.<br />
                          Seja o primeiro a deixar um recado pro Igor!
                        </div>
                      ) : (
                        selectedPhotoComments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3 rounded-2xl bg-[#f5ede0] border border-[#e5decb] shadow-xs text-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-serif-vintage font-bold text-[#26120c] flex items-center gap-1.5">
                                <span className="w-5 h-5 rounded-full bg-[#eab308] text-[#26120c] flex items-center justify-center text-[10px] font-sans font-black">
                                  {comment.author.charAt(0).toUpperCase()}
                                </span>
                                {comment.author}
                              </span>
                              <span className="text-[10px] font-serif-vintage text-[#8c6d58]">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="font-serif-vintage text-[#422217] leading-relaxed pl-6">
                              {comment.text}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* FORMULÁRIO: PEDE NOME E COMENTÁRIO */}
                  <form onSubmit={handleAddComment} className="mt-4 pt-4 border-t border-[#dfceb0] space-y-2.5">
                    <span className="text-[11px] font-serif-vintage font-bold uppercase text-[#7c5a45] block">
                      Deixe seu comentário nessa foto
                    </span>

                    {/* Campo: Nome ou Apelido */}
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Seu nome ou apelido (ex: Pedrinho)"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a]"
                      />
                    </div>

                    {/* Campo: Comentário */}
                    <div>
                      <textarea
                        rows={2}
                        required
                        placeholder="Escreva seu recado ou comentário..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a] resize-none"
                      />
                    </div>

                    {/* Botão de Enviar */}
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-[#26120c] hover:bg-[#3d1c12] text-[#faf5eb] font-serif-vintage font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={13} className="text-[#eab308]" />
                      <span>Publicar Comentário</span>
                      <Sparkles size={13} className="text-[#16a34a]" />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
