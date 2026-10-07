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
  title: string;
  caption: string;
  rotation: string;
}

export const VintagePhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<IgorPhoto | null>(null);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');

  // Comentários persistidos no localStorage
  const [comments, setComments] = useState<PhotoComment[]>(() => {
    try {
      const saved = localStorage.getItem('trintou_igor_photo_comments_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        id: 'c1',
        photoId: '4',
        author: 'Pedrinho',
        text: 'O homem mais elegante do Núcleo Bandeirante! 30 anos com classe pura!',
        timestamp: 'Hoje',
      },
      {
        id: 'c2',
        photoId: '2',
        author: 'Rafa',
        text: 'Aquele olhar 4:20 de quem sabe que a resenha vai ser histórica 🔥',
        timestamp: 'Ontem',
      },
      {
        id: 'c3',
        photoId: '5',
        author: 'Bruninho',
        text: 'Dormiu cedo porque 30 anos não perdoa ninguém kkkk',
        timestamp: '2 dias atrás',
      },
      {
        id: 'c4',
        photoId: '1',
        author: 'Carol',
        text: 'Focado conferindo quem já fortaleceu a resenha no Pix!',
        timestamp: 'Hoje',
      },
      {
        id: 'c5',
        photoId: '7',
        author: 'Matheus',
        text: 'Pose clássica de capa de disco de reggae. O Glorioso é eterno!',
        timestamp: 'Hoje',
      },
      {
        id: 'c6',
        photoId: '6',
        author: 'Gabi',
        text: 'Brisa pura matinal, descansando a mente pros 30 anos!',
        timestamp: '3 dias atrás',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('trintou_igor_photo_comments_v2', JSON.stringify(comments));
    } catch {
      // ignore
    }
  }, [comments]);

  const photos: IgorPhoto[] = [
    {
      id: '4',
      src: '/photos/igor-4.jpg',
      title: 'A Beca do Aniversariante',
      caption: 'Na elegância pura pronto pra comandar a noite.',
      rotation: 'rotate-[-1.5deg]',
    },
    {
      id: '2',
      src: '/photos/igor-2.jpg',
      title: 'Olhar do Glorioso',
      caption: 'O piercing e os óculos de quem sabe viver.',
      rotation: 'rotate-[2deg]',
    },
    {
      id: '1',
      src: '/photos/igor-1.jpg',
      title: 'O Foco da Lenda',
      caption: 'Analisando quem já fortaleceu a resenha no Pix.',
      rotation: 'rotate-[-2deg]',
    },
    {
      id: '5',
      src: '/photos/igor-5.jpg',
      title: 'Emotional Exhaustion',
      caption: 'O guerreiro descansando porque 30 anos pesam!',
      rotation: 'rotate-[1.5deg]',
    },
    {
      id: '7',
      src: '/photos/igor-7.jpg',
      title: 'A Pose Clássica',
      caption: 'Quando a resenha tá boa demais pra explicar.',
      rotation: 'rotate-[-1deg]',
    },
    {
      id: '6',
      src: '/photos/igor-6.jpg',
      title: 'Brisa Matinal',
      caption: 'Abraçado no travesseiro pensando na vida.',
      rotation: 'rotate-[2.5deg]',
    },
  ];

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

    // Dispara confetes comemorativos de maconha
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
          Clique nas fotos polaroid para ver os recados e deixar o seu comentário pro aniversariante!
        </p>
      </div>

      {/* Grid Scrapbook de Polaroids com Botão de Comentar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {photos.map((photo) => {
          const photoComments = getCommentsForPhoto(photo.id);
          const latestComment = photoComments[0];

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              onClick={() => setSelectedPhoto(photo)}
              className={`p-3.5 pb-5 rounded-2xl bg-[#faf5eb] border border-[#e5decb] shadow-xl hover:shadow-2xl transition-all cursor-pointer relative flex flex-col justify-between ${photo.rotation}`}
            >
              {/* Fita crepe colada no topo */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#f0e3cc]/80 border border-[#dfceb0] shadow-xs transform rotate-1 pointer-events-none" />

              <div>
                {/* A Foto com moldura clássica de Polaroid */}
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 border border-[#e5decb] relative">
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="w-full h-full object-cover object-top filter contrast-[1.05] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Legenda Estilo Manuscrita */}
                <div className="mt-3 px-1">
                  <h4 className="font-serif-vintage font-bold text-sm text-[#26120c] leading-tight">
                    {photo.title}
                  </h4>
                  <p className="font-handwriting text-base text-[#7c5a45] leading-tight mt-0.5">
                    "{photo.caption}"
                  </p>
                </div>
              </div>

              {/* Área do Botão Comentar e Último Recado */}
              <div className="mt-4 pt-3 border-t border-[#e8ded0] px-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-serif-vintage font-bold text-[#8c6d58]">
                    {photoComments.length > 0
                      ? `${photoComments.length} ${photoComments.length === 1 ? 'comentário' : 'comentários'}`
                      : 'Nenhum comentário ainda'}
                  </span>

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
                  </button>
                </div>

                {/* Prévia do Último Comentário (se houver) */}
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

      {/* MODAL LIGHTBOX COM COMENTÁRIOS E FORMULÁRIO */}
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
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#f2e7d5] hover:bg-[#e6d7be] text-[#26120c] transition-all cursor-pointer"
                title="Fechar"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto md:overflow-visible">
                {/* Coluna 1: A Foto Ampliada */}
                <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[#f5ece0] border-b md:border-b-0 md:border-r border-[#dfceb0]">
                  <div>
                    <div className="rounded-2xl overflow-hidden border-2 border-[#26120c] bg-black aspect-[4/5] max-h-[50vh] md:max-h-none shadow-md">
                      <img
                        src={selectedPhoto.src}
                        alt={selectedPhoto.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="mt-4 text-center">
                      <h3 className="font-serif-vintage font-bold text-lg sm:text-xl text-[#26120c]">
                        {selectedPhoto.title}
                      </h3>
                      <p className="font-handwriting text-xl text-[#7c5a45] mt-1">
                        "{selectedPhoto.caption}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#dfceb0] flex items-center justify-center gap-2 text-xs font-serif-vintage text-[#8c6d58]">
                    <CannabisLeafIcon className="w-4 h-4 text-[#16a34a]" />
                    <span>Mural do Glorioso • Trintou Igor</span>
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
