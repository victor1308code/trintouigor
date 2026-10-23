import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Plus, X, MessageCircle, Send, Sparkles, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CannabisLeafIcon, leafPathD } from './CannabisLeafIcon';
import { safeGetJson, safeSetJson } from '../utils/storage';

export interface PartyPhoto {
  id: string;
  url: string;
  author: string;
  caption: string;
  createdAt: string;
}

export interface PartyComment {
  id: string;
  photoId: string;
  author: string;
  text: string;
  timestamp: string;
}

interface PartyPhotosSectionProps {
  onBackToMural?: () => void;
}

const ROTATIONS = [
  'rotate-[-1.5deg]',
  'rotate-[2deg]',
  'rotate-[-2deg]',
  'rotate-[1.5deg]',
  'rotate-[-1deg]',
  'rotate-[2.5deg]',
  'rotate-[-2.5deg]',
  'rotate-[1deg]',
];

function formatTime(dateStr?: string) {
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

// Comprime imagem no client-side para envio rápido em 4G/3G de celular
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        const MAX = 1600;
        if (width > height && width > MAX) {
          height = Math.round((height * MAX) / width);
          width = MAX;
        } else if (height > MAX) {
          width = Math.round((width * MAX) / height);
          height = MAX;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const PartyPhotosSection: React.FC<PartyPhotosSectionProps> = ({ onBackToMural }) => {
  const [photos, setPhotos] = useState<PartyPhoto[]>(() => {
    return safeGetJson<PartyPhoto[]>('trintou_party_photos_v1', []);
  });
  const [likesMap, setLikesMap] = useState<Record<string, number>>(() => {
    return safeGetJson<Record<string, number>>('trintou_party_likes_v1', {});
  });
  const [comments, setComments] = useState<PartyComment[]>(() => {
    return safeGetJson<PartyComment[]>('trintou_party_comments_v1', []);
  });

  // Modal de postar foto
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFilePreview, setSelectedFilePreview] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState(() => safeGetJson<string>('trintou_author_name', ''));
  const [caption, setCaption] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Modal lightbox para ampliar foto e comentar
  const [selectedPhoto, setSelectedPhoto] = useState<PartyPhoto | null>(null);
  const [newCommentAuthor, setNewCommentAuthor] = useState(() => safeGetJson<string>('trintou_author_name', ''));
  const [newCommentText, setNewCommentText] = useState('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Sincronização em tempo real (polling a cada 3.5 segundos)
  const fetchPartyData = async () => {
    try {
      const [resPhotos, resLikes, resComments] = await Promise.all([
        fetch('/api/party-photos').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/likes').then((r) => (r.ok ? r.json() : null)).catch(() => null),
        fetch('/api/comments').then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);

      if (Array.isArray(resPhotos)) {
        setPhotos(resPhotos);
        safeSetJson('trintou_party_photos_v1', resPhotos);
      }

      if (resLikes && typeof resLikes === 'object') {
        setLikesMap((prev) => {
          const updated = { ...prev, ...resLikes };
          safeSetJson('trintou_party_likes_v1', updated);
          return updated;
        });
      }

      if (Array.isArray(resComments)) {
        const formatted: PartyComment[] = resComments.map((c: any) => ({
          id: c.id,
          photoId: String(c.photoId),
          author: c.author,
          text: c.text,
          timestamp: formatTime(c.createdAt),
        }));
        setComments(formatted);
        safeSetJson('trintou_party_comments_v1', formatted);
      }
    } catch {
      // offline fallback
    }
  };

  useEffect(() => {
    fetchPartyData();
    const interval = setInterval(fetchPartyData, 3500);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
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
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#22c55e', '#eab308', '#dc2626'],
      });
    } catch {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#16a34a', '#eab308', '#dc2626'],
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError(null);
    try {
      const compressed = await compressImage(file);
      setSelectedFilePreview(compressed);
      setIsUploadOpen(true);
    } catch (err) {
      console.error('Erro ao ler imagem:', err);
      setUploadError('Não foi possível carregar a imagem. Tente novamente.');
    }
  };

  const handleSubmitPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFilePreview) {
      setUploadError('Escolha ou tire uma foto primeiro!');
      return;
    }
    if (!authorName.trim()) {
      setUploadError('Digite seu nome ou apelido!');
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);

    const cleanAuthor = authorName.trim();
    safeSetJson('trintou_author_name', cleanAuthor);

    try {
      const res = await fetch('/api/party-photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: cleanAuthor,
          caption: caption.trim(),
          imageBase64: selectedFilePreview,
        }),
      });

      if (!res.ok) {
        throw new Error('Falha no upload');
      }

      const newPhoto: PartyPhoto = await res.json();
      setPhotos((prev) => [newPhoto, ...prev.filter((p) => p.id !== newPhoto.id)]);
      safeSetJson('trintou_party_photos_v1', [newPhoto, ...photos]);

      setSelectedFilePreview(null);
      setCaption('');
      setIsUploadOpen(false);
      triggerConfetti();
    } catch (err) {
      console.error(err);
      setUploadError('Erro ao enviar a foto. Tente novamente!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async (photoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    // Atualização otimista
    setLikesMap((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1,
    }));

    // Confetti de folhinha
    if (e) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
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
          scalar: 2.5,
          particleCount: 20,
          spread: 45,
          origin: { x, y },
          colors: ['#16a34a', '#22c55e', '#eab308'],
        });
      } catch {
        // fallback
      }
    }

    try {
      await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId }),
      });
    } catch {
      // offline fallback
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPhoto || !newCommentText.trim() || !newCommentAuthor.trim()) return;

    const photoId = selectedPhoto.id;
    const cleanAuthor = newCommentAuthor.trim();
    const cleanText = newCommentText.trim();
    safeSetJson('trintou_author_name', cleanAuthor);

    const tempComment: PartyComment = {
      id: 'temp_' + Date.now(),
      photoId,
      author: cleanAuthor,
      text: cleanText,
      timestamp: 'Agora mesmo',
    };

    setComments((prev) => [tempComment, ...prev]);
    setNewCommentText('');

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photoId,
          author: cleanAuthor,
          text: cleanText,
        }),
      });
      if (res.ok) {
        const saved = await res.json();
        setComments((prev) =>
          prev.map((c) =>
            c.id === tempComment.id
              ? {
                  id: saved.id,
                  photoId: String(saved.photoId),
                  author: saved.author,
                  text: saved.text,
                  timestamp: formatTime(saved.createdAt),
                }
              : c
          )
        );
      }
    } catch {
      // offline fallback
    }
  };

  const getCommentsForPhoto = (photoId: string) => {
    return comments.filter((c) => c.photoId === photoId);
  };

  return (
    <div id="fotos-da-festa" className="relative max-w-6xl mx-auto">
      {/* Inputs ocultos para selecionar/tirar foto */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Fita de Papel Antigo Vintage no topo */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-7 bg-[#f0e3cc] border border-[#dfceb0] shadow-sm transform -rotate-1 z-20 pointer-events-none flex items-center justify-center">
        <span className="text-[10px] font-black uppercase font-serif-vintage tracking-widest text-[#78350f]">
          FOTOS DA FESTA
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-[#faf5eb] text-[#2c1810] p-5 sm:p-9 shadow-2xl border-2 border-[#dfceb0] relative overflow-hidden"
      >
        {/* Faixa decorativa tricolor no topo interno */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#16a34a] via-[#eab308] to-[#dc2626] rounded-full mb-6" />

        {/* Cabeçalho da Seção com Botão de Postar */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          {/* Badge de Liberado */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#065f46] text-xs font-serif-vintage font-bold uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a] animate-ping" />
            <Sparkles size={14} className="text-[#16a34a]" />
            <span>Mural Oficial Liberado • Poste Suas Fotos</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-vintage font-black text-[#26120c] tracking-tight uppercase leading-tight">
            Fotos da Festa
          </h2>

          <p className="text-xs sm:text-sm font-serif-vintage text-[#7c5a45] mt-2 max-w-lg mx-auto">
            Tire fotos no rolê ou envie da sua galeria para o mural ao vivo! Curta e deixe recados nas polaroids.
          </p>

          {/* Botões de Ação para Postar */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="py-3 px-6 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-[#faf5eb] border border-[#166534] text-xs sm:text-sm font-serif-vintage font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
            >
              <Camera size={18} className="text-[#fde047]" />
              <span>Tirar Foto Agora</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="py-3 px-6 rounded-full bg-[#26120c] hover:bg-[#3f1f14] text-[#faf5eb] border border-[#dfceb0] text-xs sm:text-sm font-serif-vintage font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
            >
              <ImageIcon size={18} className="text-[#eab308]" />
              <span>Escolher da Galeria</span>
            </button>
          </div>
        </div>

        {/* LISTA DE FOTOS DA FESTA (POLAROIDS) */}
        {photos.length === 0 ? (
          <div className="my-10 p-8 sm:p-12 rounded-3xl bg-[#f5ede0] border-2 border-dashed border-[#dfceb0] text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#faf5eb] border border-[#ded0b9] text-[#16a34a] mx-auto flex items-center justify-center mb-3 shadow-sm">
              <Camera size={30} />
            </div>
            <h3 className="font-serif-vintage font-black text-lg sm:text-xl uppercase text-[#26120c]">
              Nenhuma foto postada ainda!
            </h3>
            <p className="text-xs sm:text-sm font-serif-vintage text-[#7c5a45] mt-1 mb-5">
              A pista tá liberada! Seja o primeiro a registrar a resenha de 30 anos do Igor e subir aqui no mural.
            </p>
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="py-2.5 px-6 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-serif-vintage font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
            >
              <Plus size={16} />
              <span>Postar a Primeira Foto</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-6">
            {photos.map((photo, index) => {
              const photoComments = getCommentsForPhoto(photo.id);
              const latestComment = photoComments[0];
              const likesCount = likesMap[photo.id] || 0;
              const rotation = ROTATIONS[index % ROTATIONS.length];

              return (
                <motion.div
                  layout
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  transition={{ layout: { duration: 0.3 } }}
                  onClick={() => setSelectedPhoto(photo)}
                  className={`p-3 pb-4 rounded-2xl bg-[#faf5eb] border border-[#e5decb] shadow-xl hover:shadow-2xl transition-all cursor-pointer relative flex flex-col justify-between ${rotation}`}
                >
                  {/* Fita crepe no topo da polaroid */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#f0e3cc]/80 border border-[#dfceb0] shadow-xs transform rotate-1 pointer-events-none" />

                  <div>
                    {/* A Foto */}
                    <div className="aspect-[4/5] overflow-hidden rounded-xl bg-black border border-[#e5decb] relative">
                      <img
                        src={photo.url}
                        alt={`Foto da festa por ${photo.author}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center filter contrast-[1.03]"
                      />
                    </div>

                    {/* Autor e Legenda */}
                    <div className="mt-3 px-1">
                      <div className="flex items-center justify-between text-[11px] font-serif-vintage text-[#7c5a45]">
                        <span className="font-bold text-[#26120c] truncate">
                          📸 {photo.author}
                        </span>
                        <span className="italic flex-shrink-0 ml-1">
                          {formatTime(photo.createdAt)}
                        </span>
                      </div>
                      {photo.caption && (
                        <p className="text-xs font-serif-vintage text-[#422617] mt-1 italic line-clamp-2">
                          "{photo.caption}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Ações: Curtir + Comentar */}
                  <div className="mt-3 pt-2.5 border-t border-[#e8ded0] px-1">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => handleLike(photo.id, e)}
                        className="group py-1.5 px-3 rounded-full bg-[#f2e7d5] hover:bg-[#e3f2e5] hover:border-[#16a34a] border border-[#ded0b9] flex items-center gap-1.5 text-xs font-serif-vintage font-bold text-[#26120c] transition-all shadow-xs active:scale-90 cursor-pointer"
                        title="Curtir com folha de maconha"
                      >
                        <CannabisLeafIcon className="w-4 h-4 text-[#16a34a] group-hover:scale-125 transition-transform" />
                        <span>{likesCount}</span>
                      </button>

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
        )}

        {/* Rodapé com Navegação */}
        <div className="pt-6 border-t border-[#dfceb0] flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          {onBackToMural && (
            <button
              type="button"
              onClick={onBackToMural}
              className="w-full sm:w-auto py-2.5 px-5 rounded-full bg-[#26120c] hover:bg-[#3f1f14] text-[#faf5eb] border border-[#dfceb0] text-xs font-serif-vintage font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-95"
            >
              <ArrowLeft size={14} className="text-[#eab308]" />
              <span>Ver Fotos do Glorioso (Mural do Igor)</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={triggerConfetti}
              className="py-2 px-4 rounded-full bg-[#e8f5e9] hover:bg-[#c8e6c9] border border-[#a5d6a7] text-[#15803d] text-xs font-serif-vintage font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <CannabisLeafIcon className="w-4 h-4 text-[#16a34a]" />
              <span>Comemorar 30 Anos</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL PARA PUBLICAR FOTO */}
      <AnimatePresence>
        {isUploadOpen && (
          <div
            onClick={() => !isSubmitting && setIsUploadOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full rounded-3xl bg-[#faf5eb] border-2 border-[#dfceb0] shadow-2xl text-[#26120c] p-6 relative overflow-hidden my-auto"
            >
              <button
                type="button"
                onClick={() => !isSubmitting && setIsUploadOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#f2e7d5] hover:bg-[#e6d7be] text-[#26120c] transition-all cursor-pointer"
                title="Fechar"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <Camera size={22} className="text-[#16a34a]" />
                <h3 className="font-serif-vintage font-black text-xl uppercase tracking-tight">
                  Postar Foto da Festa
                </h3>
              </div>

              {selectedFilePreview ? (
                <div className="mb-4 relative rounded-2xl overflow-hidden border-2 border-[#dfceb0] aspect-[4/3] bg-black shadow-inner">
                  <img
                    src={selectedFilePreview}
                    alt="Prévia da foto"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedFilePreview(null)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-all cursor-pointer"
                    title="Trocar foto"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="mb-4 p-6 rounded-2xl border-2 border-dashed border-[#dfceb0] text-center bg-[#f5ede0]">
                  <p className="text-xs font-serif-vintage text-[#7c5a45] mb-3">
                    Nenhuma foto selecionada ainda.
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="py-2 px-4 rounded-full bg-[#16a34a] text-white text-xs font-bold font-serif-vintage"
                    >
                      Câmera
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="py-2 px-4 rounded-full bg-[#26120c] text-white text-xs font-bold font-serif-vintage"
                    >
                      Galeria
                    </button>
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="mb-3 p-2.5 rounded-xl bg-red-100 border border-red-200 text-xs text-red-700 font-bold font-serif-vintage text-center">
                  {uploadError}
                </div>
              )}

              <form onSubmit={handleSubmitPhoto} className="space-y-3">
                <div>
                  <label className="block text-xs font-serif-vintage font-bold uppercase text-[#5e4130] mb-1">
                    Seu Nome ou Apelido: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Guto, Bruna, Amigo do Igor..."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-serif-vintage font-bold uppercase text-[#5e4130] mb-1">
                    Legenda ou Recado (opcional):
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Que festa boa! Parabéns Igor!"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setIsUploadOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#c4b59f] text-xs font-serif-vintage font-bold text-[#26120c] hover:bg-[#ece0cc] transition-all cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !selectedFilePreview}
                    className="flex-1 py-2.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] disabled:opacity-50 text-white text-xs font-serif-vintage font-bold uppercase tracking-wider shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    {isSubmitting ? (
                      <span>Publicando...</span>
                    ) : (
                      <>
                        <Sparkles size={14} className="text-[#fde047]" />
                        <span>Publicar no Mural</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL LIGHTBOX COM FOTO AMPLIADA & COMENTÁRIOS */}
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

              <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto md:overflow-visible">
                {/* Coluna 1: Foto ampliada */}
                <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[#f5ece0] border-b md:border-b-0 md:border-r border-[#dfceb0]">
                  <div>
                    <div className="rounded-2xl overflow-hidden border-2 border-[#26120c] bg-black aspect-[4/5] max-h-[50vh] md:max-h-none shadow-md">
                      <img
                        src={selectedPhoto.url}
                        alt={`Foto por ${selectedPhoto.author}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="mt-3 px-1 text-xs font-serif-vintage">
                      <span className="font-bold text-[#26120c]">Postado por: {selectedPhoto.author}</span>
                      {selectedPhoto.caption && (
                        <p className="italic text-[#5e4130] mt-1">"{selectedPhoto.caption}"</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#dfceb0] flex items-center justify-between gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => handleLike(selectedPhoto.id)}
                      className="group py-1.5 px-3.5 rounded-full bg-[#faf5eb] hover:bg-[#e3f2e5] hover:border-[#16a34a] border border-[#ded0b9] flex items-center gap-2 text-xs font-serif-vintage font-bold text-[#26120c] shadow-xs active:scale-90 transition-all cursor-pointer"
                    >
                      <CannabisLeafIcon className="w-4 h-4 text-[#16a34a] group-hover:scale-125 transition-transform" />
                      <span>Curtir ({likesMap[selectedPhoto.id] || 0})</span>
                    </button>

                    <span className="text-[11px] font-serif-vintage text-[#7c5a45] italic">
                      Mural da Festa • Trintou Igor
                    </span>
                  </div>
                </div>

                {/* Coluna 2: Comentários */}
                <div className="md:col-span-6 p-5 sm:p-6 flex flex-col justify-between bg-[#faf5eb]">
                  <div>
                    <div className="flex items-center gap-2 pb-3 border-b border-[#dfceb0] mb-3">
                      <MessageCircle size={18} className="text-[#16a34a]" />
                      <h3 className="font-serif-vintage font-bold text-sm text-[#26120c] uppercase">
                        Recados & Comentários ({getCommentsForPhoto(selectedPhoto.id).length})
                      </h3>
                    </div>

                    <div className="space-y-2.5 max-h-[30vh] sm:max-h-[36vh] overflow-y-auto pr-1">
                      {getCommentsForPhoto(selectedPhoto.id).length === 0 ? (
                        <div className="text-center py-8 px-2">
                          <CannabisLeafIcon className="w-8 h-8 text-[#caa789] mx-auto mb-2 opacity-50" />
                          <p className="font-serif-vintage text-xs text-[#7c5a45] italic">
                            Nenhum recado ainda nesta foto. Seja o primeiro a comentar!
                          </p>
                        </div>
                      ) : (
                        getCommentsForPhoto(selectedPhoto.id).map((comment) => (
                          <div
                            key={comment.id}
                            className="p-2.5 rounded-xl bg-[#f5ede0] border border-[#e2d5c3] shadow-2xs text-xs font-serif-vintage"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-[#26120c]">{comment.author}</span>
                              <span className="text-[10px] text-[#8c6d58]">{comment.timestamp}</span>
                            </div>
                            <p className="text-[#422617] italic break-words">{comment.text}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Formulário de Comentário */}
                  <form onSubmit={handleAddComment} className="pt-3 border-t border-[#dfceb0] mt-3 space-y-2">
                    <input
                      type="text"
                      required
                      placeholder="Seu nome..."
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Deixe um recado nessa foto..."
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#ded0b9] text-xs text-[#26120c] placeholder-[#9c8272] focus:outline-none focus:border-[#16a34a]"
                      />
                      <button
                        type="submit"
                        className="py-2 px-3.5 rounded-xl bg-[#16a34a] hover:bg-[#15803d] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 flex items-center justify-center"
                        title="Enviar comentário"
                      >
                        <Send size={14} />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
