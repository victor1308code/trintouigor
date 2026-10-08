import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Send, X, Sparkles, Trash2, RotateCcw, Copy, Check } from 'lucide-react';
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
  isQr?: boolean;
}

function formatCommentTime(dateStr?: string) {
  if (!dateStr) return 'Agora mesmo';
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (diffSec < 60) return 'Agora mesmo';
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `há ${diffMin} min`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `há ${diffHours}h`;
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  } catch {
    return 'Recente';
  }
}

// Rotações sutis de estilo Polaroid Vintage
const ALL_ROTATIONS = [
  'rotate-[-1.5deg]',
  'rotate-[2deg]',
  'rotate-[-2deg]',
  'rotate-[1.5deg]',
  'rotate-[-1deg]',
  'rotate-[2.5deg]',
  'rotate-[-2.5deg]',
  'rotate-[1deg]',
];

// O QR Code Oficial que veio na pasta + Todas as 39 Fotos da Festa e do Igor
const allPhotos: IgorPhoto[] = [
  {
    id: 'pix-oficial',
    src: '/pix-qrcode-oficial.jpg',
    rotation: 'rotate-[-1deg]',
    isQr: true,
  },
  ...Array.from({ length: 39 }, (_, i) => {
    const num = i + 1;
    return {
      id: String(num),
      src: `/photos/igor-${num}.jpg`,
      rotation: ALL_ROTATIONS[i % ALL_ROTATIONS.length],
    };
  }),
];

export const VintagePhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<IgorPhoto | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<IgorPhoto | null>(null);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  const pixKeyPhone = '61982228996';
  const pixKeyDisplay = '(61) 98222-8996';
  const pixBeneficiary = 'Igor Henrique Anjos Marques';
  const pixCopiaCola = '00020126770014br.gov.bcb.pix0114+5561982228996023730tou_do_Igor_Nicolau_(casa_e_comida)5204000053039865802BR5925IGOR_HENRIQUE_ANJOS_MARQU6008BRASILIA62290525dHiNyE5D1npOPQCJHtctq0t786304639D';

  const handleCopyKey = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(pixKeyPhone);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const handleCopyPayload = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(pixCopiaCola);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2500);
  };

  // Fotos excluídas da galeria (persistidas localmente e sincronizadas)
  const [deletedPhotoIds, setDeletedPhotoIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('trintou_igor_deleted_photos_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Curtidas da maconha (inicia em 0 para todas as fotos)
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('trintou_igor_photo_cannabis_likes_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const initial: Record<string, number> = { 'pix-oficial': 0 };
    for (let i = 1; i <= 39; i++) {
      initial[String(i)] = 0;
    }
    return initial;
  });

  // Comentários dos visitantes
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

  // Sincronização central ao vivo (polling a cada 3.5 segundos)
  const fetchLiveData = async () => {
    try {
      const [resComments, resLikes, resDeleted] = await Promise.all([
        fetch('/api/comments').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/likes').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/deleted-photos').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);

      if (Array.isArray(resComments)) {
        const formatted: PhotoComment[] = resComments.map((c: any) => ({
          id: c.id,
          photoId: String(c.photoId),
          author: c.author,
          text: c.text,
          timestamp: formatCommentTime(c.createdAt),
        }));
        setComments(formatted);
        try {
          localStorage.setItem('trintou_igor_photo_comments_empty_v4', JSON.stringify(formatted));
        } catch {
          // ignore
        }
      }

      if (resLikes && typeof resLikes === 'object') {
        setLikesMap((prev) => {
          const updated = { ...prev, ...resLikes };
          try {
            localStorage.setItem('trintou_igor_photo_cannabis_likes_v1', JSON.stringify(updated));
          } catch {
            // ignore
          }
          return updated;
        });
      }

      if (Array.isArray(resDeleted)) {
        setDeletedPhotoIds((prev) => {
          const merged = Array.from(new Set([...prev, ...resDeleted.map(String)]));
          try {
            localStorage.setItem('trintou_igor_deleted_photos_v1', JSON.stringify(merged));
          } catch {
            // ignore
          }
          return merged;
        });
      }
    } catch {
      // Continua com estado local se offline
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 3500);
    return () => clearInterval(interval);
  }, []);

  // Fotos visíveis (excluindo as que foram removidas pelo botão de exclusão)
  const visiblePhotos = allPhotos.filter((p) => !deletedPhotoIds.includes(p.id));

  // Ação de Curtir com a Folha de Maconha
  const handleLike = async (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Atualização otimista
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

    // Persiste no backend central para todos verem
    try {
      const res = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId }),
      });
      if (res.ok) {
        const data = await res.json();
        setLikesMap((prev) => ({
          ...prev,
          [photoId]: data.count,
        }));
      }
    } catch {
      // offline fallback
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoto) return;
    if (!newAuthor.trim() || !newComment.trim()) return;

    const author = newAuthor.trim();
    const text = newComment.trim();
    const photoId = selectedPhoto.id;

    // Adiciona otimista
    const optimisticItem: PhotoComment = {
      id: String(Date.now()),
      photoId,
      author,
      text,
      timestamp: 'Agora mesmo',
    };

    setComments((prev) => [optimisticItem, ...prev]);
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

    // Envia pro backend central
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId, author, text }),
      });
      if (res.ok) {
        fetchLiveData();
      }
    } catch {
      // offline fallback
    }
  };

  // Excluir foto
  const handleConfirmDelete = async () => {
    if (!photoToDelete) return;
    const idToDelete = photoToDelete.id;

    setDeletedPhotoIds((prev) => {
      const updated = Array.from(new Set([...prev, idToDelete]));
      try {
        localStorage.setItem('trintou_igor_deleted_photos_v1', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    if (selectedPhoto?.id === idToDelete) {
      setSelectedPhoto(null);
    }
    setPhotoToDelete(null);

    try {
      await fetch('/api/deleted-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId: idToDelete }),
      });
    } catch {
      // ignore
    }
  };

  // Restaurar todas as fotos excluídas
  const handleRestoreAllPhotos = async () => {
    setDeletedPhotoIds([]);
    try {
      localStorage.removeItem('trintou_igor_deleted_photos_v1');
      await fetch('/api/deleted-photos/restore-all', { method: 'POST' });
    } catch {
      // ignore
    }
  };

  // Fotos ordenadas da mais curtida para a menos curtida (baseado no número de maconhas / curtidas)
  const sortedPhotos = [...visiblePhotos].sort((a, b) => {
    const likesA = likesMap[a.id] || 0;
    const likesB = likesMap[b.id] || 0;
    if (likesB !== likesA) {
      return likesB - likesA;
    }
    if (a.isQr) return -1;
    if (b.isQr) return 1;
    return Number(a.id) - Number(b.id);
  });

  const getCommentsForPhoto = (photoId: string) => {
    return comments.filter((c) => c.photoId === photoId);
  };

  return (
    <section id="galeria" className="relative py-12 px-4 max-w-6xl mx-auto">
      {/* Título da Galeria / Mural */}
      <div className="text-center mb-10">
        <span className="text-xs font-serif-vintage tracking-widest text-[#e8c89b] uppercase block mb-1">
          O MURAL DO GLORIOSO ({visiblePhotos.length} REGISTROS)
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif-vintage font-bold text-[#faf3e3] uppercase tracking-tight">
          Momentos & Registros do Igor
        </h2>
        <p className="text-xs sm:text-sm font-serif-vintage italic text-[#e6d5c1] mt-1 max-w-md mx-auto">
          Curta com a folhinha e deixe seu comentário pro aniversariante nas fotos polaroid.
        </p>
      </div>

      {/* Grid de Polaroids (Fotos ordenadas da mais curtida para a menos curtida) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {sortedPhotos.map((photo, index) => {
          const photoComments = getCommentsForPhoto(photo.id);
          const latestComment = photoComments[0];
          const likesCount = likesMap[photo.id] || 0;
          const isTop1 = index === 0 && likesCount > 0;

          return (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.025, rotate: 0 }}
              transition={{
                layout: { duration: 0.45, ease: 'easeInOut' },
              }}
              onClick={() => setSelectedPhoto(photo)}
              className={`p-3 pb-4 rounded-2xl bg-[#faf5eb] border border-[#e5decb] shadow-xl hover:shadow-2xl transition-all cursor-pointer relative flex flex-col justify-between ${photo.rotation}`}
            >
              {/* Botão de Excluir Foto na Polaroid */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPhotoToDelete(photo);
                }}
                className="absolute top-3 left-3 z-20 w-7 h-7 rounded-full bg-white/90 hover:bg-red-600 text-[#8c6d58] hover:text-white flex items-center justify-center transition-all shadow-md border border-[#dfceb0] hover:border-red-600 cursor-pointer active:scale-90"
                title={photo.isQr ? "Ocultar QR Code" : "Excluir esta foto"}
              >
                <Trash2 size={13} />
              </button>

              {/* Selo #1 Mais Chapada OU Selo PIX Oficial */}
              {photo.isQr ? (
                <div className="absolute top-3 right-3 z-10 bg-[#eab308] text-[#26120c] text-[10px] font-black uppercase font-serif-vintage px-2 py-0.5 rounded-full shadow-md border border-[#ca8a04] flex items-center gap-1 pointer-events-none">
                  <span>★ PIX OFICIAL DO IGOR</span>
                </div>
              ) : isTop1 ? (
                <div className="absolute top-3 right-3 z-10 bg-[#16a34a] text-[#faf5eb] text-[10px] font-black uppercase font-serif-vintage px-2 py-0.5 rounded-full shadow-md border border-[#15803d] flex items-center gap-1 pointer-events-none">
                  <CannabisLeafIcon className="w-3 h-3 text-[#fde047]" />
                  <span>#1 Mais Chapada</span>
                </div>
              ) : null}

              {/* Fita crepe no topo da polaroid */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#f0e3cc]/80 border border-[#dfceb0] shadow-xs transform rotate-1 pointer-events-none" />

              <div>
                {/* A Foto ou QR Code com moldura clássica de Polaroid limpa */}
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900 border border-[#e5decb] relative">
                  <img
                    src={photo.src}
                    alt={photo.isQr ? "QR Code Oficial Pix do Igor" : "Foto do Igor"}
                    loading="lazy"
                    className={`w-full h-full ${photo.isQr ? 'object-contain bg-white p-3' : 'object-cover object-top'} filter contrast-[1.05] hover:scale-105 transition-transform duration-500`}
                  />
                </div>
              </div>

              {/* Área de Ações: Curtir da Maconha + Botão Comentar / Copiar Pix */}
              <div className="mt-3.5 pt-2.5 border-t border-[#e8ded0] px-1">
                {photo.isQr ? (
                  <div className="flex items-center justify-between gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="flex-1 py-1.5 px-2 rounded-full bg-[#26120c] hover:bg-[#3f1f14] text-[#faf5eb] flex items-center justify-center gap-1 text-[11px] font-serif-vintage font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      {copiedKey ? <Check size={12} className="text-[#16a34a]" /> : <Copy size={12} className="text-[#eab308]" />}
                      <span>{copiedKey ? 'Chave Copiada!' : 'Copiar Chave'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyPayload}
                      className="flex-1 py-1.5 px-2 rounded-full bg-[#f2e7d5] hover:bg-[#e4d6c2] text-[#26120c] flex items-center justify-center gap-1 text-[11px] font-serif-vintage font-bold transition-all border border-[#ded0b9] shadow-xs active:scale-95 cursor-pointer"
                    >
                      {copiedPayload ? <Check size={12} className="text-[#16a34a]" /> : <Copy size={12} className="text-[#16a34a]" />}
                      <span>{copiedPayload ? 'Código Copiado!' : 'Copia e Cola'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-2">
                    {/* BOTÃO DE CURTIR DA MACONHA */}
                    <button
                      type="button"
                      onClick={(e) => handleLike(photo.id, e)}
                      className="group py-1.5 px-3 rounded-full bg-[#f2e7d5] hover:bg-[#e3f2e5] hover:border-[#16a34a] border border-[#ded0b9] flex items-center gap-1.5 text-xs font-serif-vintage font-bold text-[#26120c] transition-all shadow-xs active:scale-90 cursor-pointer"
                      title="Dar uma curtida de maconha nessa foto"
                    >
                      <CannabisLeafIcon className="w-4 h-4 text-[#16a34a] group-hover:scale-125 transition-transform" />
                      <span>{likesCount}</span>
                    </button>

                    {/* BOTÃO COMENTAR */}
                    <button
                      type="button"
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
                )}

                {/* Exibição do Último Comentário (se algum visitante comentou) */}
                {!photo.isQr && latestComment && (
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

      {/* Botão de Restaurar Fotos Excluídas (se houver alguma) */}
      {deletedPhotoIds.length > 0 && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={handleRestoreAllPhotos}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#f2e7d5]/90 hover:bg-[#e6d7be] border border-[#dfceb0] text-xs font-serif-vintage text-[#5e4130] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <RotateCcw size={13} className="text-[#16a34a]" />
            <span>Restaurar {deletedPhotoIds.length} foto{deletedPhotoIds.length > 1 ? 's' : ''} excluída{deletedPhotoIds.length > 1 ? 's' : ''}</span>
          </button>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO DE FOTO */}
      <AnimatePresence>
        {photoToDelete && (
          <div
            onClick={() => setPhotoToDelete(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full rounded-3xl bg-[#faf5eb] border-2 border-[#dfceb0] p-6 shadow-2xl text-[#26120c] text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center mb-3">
                <Trash2 size={24} />
              </div>
              <h3 className="font-serif-vintage font-black text-lg uppercase mb-2">
                {photoToDelete.isQr ? "Ocultar QR Code do Mural?" : "Excluir Foto do Mural?"}
              </h3>
              <p className="text-xs font-serif-vintage text-[#7c5a45] mb-5 leading-relaxed">
                {photoToDelete.isQr 
                  ? "O card do QR Code será removido da galeria (continuará visível na seção do Beckômetro)."
                  : "Esta foto será removida da galeria e não aparecerá mais para os convidados."}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPhotoToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-[#c4b59f] text-xs font-serif-vintage font-bold text-[#26120c] hover:bg-[#ece0cc] transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-serif-vintage font-bold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  Sim, Excluir
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL LIGHTBOX COM FOTO LIMPA OU QR CODE */}
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
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#f2e7d5] hover:bg-[#e6d7be] text-[#26120c] transition-all cursor-pointer shadow-sm"
                title="Fechar"
              >
                <X size={18} />
              </button>

              {selectedPhoto.isQr ? (
                /* MODAL ESPECÍFICO DO QR CODE PIX OFICIAL */
                <div className="p-6 sm:p-8 text-center max-w-md mx-auto">
                  <span className="text-xs font-serif-vintage font-bold text-[#b45309] uppercase block mb-1">
                    FORTALECIMENTO DO GLORIOSO 30 ANOS
                  </span>
                  <h3 className="font-serif-vintage font-black text-2xl uppercase text-[#26120c] mb-2">
                    QR Code Oficial Pix
                  </h3>
                  <p className="text-xs font-serif-vintage text-[#7c5a45] mb-4">
                    Aponte a câmera do celular no QR Code abaixo ou copie a chave:
                  </p>

                  <div className="p-3 rounded-2xl bg-white border-2 border-[#26120c] shadow-lg max-w-[240px] mx-auto mb-4">
                    <img
                      src={selectedPhoto.src}
                      alt="QR Code Oficial Pix do Igor"
                      className="w-full aspect-square object-contain rounded-xl"
                    />
                  </div>

                  <div className="mb-4">
                    <span className="font-mono text-sm text-[#26120c] block font-bold">
                      {pixKeyDisplay}
                    </span>
                    <span className="text-xs text-[#7c5a45] font-serif-vintage block">
                      {pixBeneficiary}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCopyKey}
                      className="py-2.5 px-4 rounded-xl bg-[#26120c] hover:bg-[#3f1f14] text-[#faf5eb] font-serif-vintage font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      {copiedKey ? <Check size={14} className="text-[#16a34a]" /> : <Copy size={14} className="text-[#eab308]" />}
                      <span>{copiedKey ? 'Copiada!' : 'Copiar Chave'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyPayload}
                      className="py-2.5 px-4 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white font-serif-vintage font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      {copiedPayload ? <Check size={14} /> : <Copy size={14} />}
                      <span>{copiedPayload ? 'Copiado!' : 'Copia e Cola'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* MODAL PADRÃO DAS FOTOS COM COMENTÁRIOS E CURTIR */
                <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto md:overflow-visible">
                  {/* Coluna 1: A Foto Ampliada (Limpa) com Botão de Curtir da Maconha e Excluir */}
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

                    <div className="mt-4 pt-3 border-t border-[#dfceb0] flex items-center justify-between gap-2 flex-wrap">
                      {/* Botão Curtir da Maconha no Modal */}
                      <button
                        type="button"
                        onClick={() => handleLike(selectedPhoto.id)}
                        className="group py-1.5 px-3.5 rounded-full bg-[#faf5eb] hover:bg-[#e3f2e5] hover:border-[#16a34a] border border-[#ded0b9] flex items-center gap-2 text-xs font-serif-vintage font-bold text-[#26120c] shadow-xs active:scale-90 transition-all cursor-pointer"
                      >
                        <CannabisLeafIcon className="w-4 h-4 text-[#16a34a] group-hover:scale-125 transition-transform" />
                        <span>Curtir ({likesMap[selectedPhoto.id] || 0})</span>
                      </button>

                      {/* Botão Excluir no Modal */}
                      <button
                        type="button"
                        onClick={() => setPhotoToDelete(selectedPhoto)}
                        className="py-1.5 px-3 rounded-full bg-[#fae8e8] hover:bg-red-600 text-red-700 hover:text-white border border-red-200 hover:border-red-600 flex items-center gap-1.5 text-xs font-serif-vintage font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                        title="Excluir foto"
                      >
                        <Trash2 size={13} />
                        <span>Excluir Foto</span>
                      </button>
                    </div>
                  </div>

                  {/* Coluna 2: Lista de Comentários & Formulário para Comentar */}
                  <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[#faf5eb]">
                    <div>
                      {/* Header dos Comentários */}
                      <div className="flex items-center gap-2 pb-3 border-b border-[#dfceb0] mb-3">
                        <MessageCircle size={18} className="text-[#16a34a]" />
                        <h3 className="font-serif-vintage font-bold text-sm text-[#26120c] uppercase">
                          Recados & Comentários ({getCommentsForPhoto(selectedPhoto.id).length})
                        </h3>
                      </div>

                      {/* Lista com Rolagem */}
                      <div className="space-y-2.5 max-h-[30vh] sm:max-h-[36vh] overflow-y-auto pr-1">
                        {getCommentsForPhoto(selectedPhoto.id).length === 0 ? (
                          <div className="text-center py-8 px-2">
                            <CannabisLeafIcon className="w-8 h-8 text-[#caa789] mx-auto mb-2 opacity-50" />
                            <p className="font-serif-vintage text-xs text-[#7c5a45] italic">
                              Nenhum recado ainda nesta foto. Seja o primeiro a mandar uma mensagem pro Igor!
                            </p>
                          </div>
                        ) : (
                          getCommentsForPhoto(selectedPhoto.id).map((comment) => (
                            <div
                              key={comment.id}
                              className="p-3 rounded-2xl bg-white border border-[#ded0b9] shadow-xs text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-serif-vintage font-black text-[#26120c] flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-[#16a34a]" />
                                  {comment.author}
                                </span>
                                <span className="text-[10px] text-[#8c6d58] font-mono">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="font-serif-vintage text-[#422217] leading-relaxed pl-3.5">
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
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
