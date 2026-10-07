import React from 'react';
import { motion } from 'motion/react';
import { leafPathD } from './CannabisLeafIcon';

interface RealisticJointProps {
  burnProgress: number; // 0 (inteiro/novo) a 100 (totalmente fumado até a piteira)
  isPuffing?: boolean;
}

export const RealisticJoint: React.FC<RealisticJointProps> = ({
  burnProgress = 0,
  isPuffing = false,
}) => {
  // Geometria no viewBox 0 0 840 140
  // Piteira: x=40 até x=160 (largura 120px)
  // Corpo do Cone Estampado com Folhas de Maconha: x=160 até x=700 (largura 540px, cônico de 26px a 56px de altura)
  // Ponta Torcida com Rabo de Peixe (Fishtail Tip): x=700 até x=760

  const filterStartX = 40;
  const filterEndX = 160;
  const paperFullEndX = 700;
  const totalPaperLength = paperFullEndX - filterEndX; // 540px

  const isLit = burnProgress > 0 || isPuffing;
  const progressClamped = Math.min(100, Math.max(0, burnProgress));

  // Quando é gasto, o baseado literalmente encurta (a parte gasta some no ar!)
  const currentTipX = paperFullEndX - (progressClamped / 100) * totalPaperLength;

  // Proporções do cone na ponta ativa
  const tipRatio = Math.max(0, (currentTipX - filterEndX) / totalPaperLength);
  const tipHalfHeight = (26 + tipRatio * 30) / 2; // de 13 até 28
  const tipTopY = 70 - tipHalfHeight;
  const tipBottomY = 70 + tipHalfHeight;

  // Posições das folhas estampadas ao longo do baseado (x, y, scale, rotation)
  const leafStamps = [
    { x: 180, y: 64, s: 0.16, r: 15 },
    { x: 215, y: 73, s: 0.18, r: -25 },
    { x: 235, y: 60, s: 0.17, r: 35 },
    { x: 265, y: 75, s: 0.20, r: -10 },
    { x: 285, y: 58, s: 0.19, r: 40 },
    { x: 315, y: 70, s: 0.22, r: 20 },
    { x: 345, y: 56, s: 0.21, r: -35 },
    { x: 370, y: 78, s: 0.23, r: 15 },
    { x: 395, y: 62, s: 0.24, r: -20 },
    { x: 425, y: 76, s: 0.25, r: 45 },
    { x: 455, y: 58, s: 0.26, r: -15 },
    { x: 485, y: 79, s: 0.27, r: 25 },
    { x: 515, y: 60, s: 0.27, r: -40 },
    { x: 545, y: 78, s: 0.29, r: 10 },
    { x: 575, y: 59, s: 0.28, r: -25 },
    { x: 605, y: 82, s: 0.31, r: 30 },
    { x: 635, y: 61, s: 0.30, r: -10 },
    { x: 665, y: 80, s: 0.32, r: 35 },
    { x: 685, y: 62, s: 0.31, r: -30 },
  ];

  return (
    <div className="w-full relative select-none py-4">
      {/* Fumaça viva saindo da brasa na ponta - Gigante e Volumétrica na Puxada */}
      {isLit && (
        <div
          className="absolute -top-16 transition-all duration-700 ease-out pointer-events-none z-30"
          style={{
            left: `${((currentTipX / 840) * 100).toFixed(1)}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Voluta 1: Nuvem central espessa de fumaça aromática */}
            <motion.div
              animate={
                isPuffing
                  ? { y: [-10, -95], scale: [0.9, 4.2], opacity: [0.9, 0], x: [0, -20, 20] }
                  : { y: [-5, -42], scale: [0.6, 2.2], opacity: [0.6, 0], x: [0, 6, -6] }
              }
              transition={{ repeat: Infinity, duration: isPuffing ? 1.2 : 2.0, ease: 'easeOut' }}
              className="w-10 h-10 rounded-full bg-stone-200/50 blur-lg -mb-4"
            />

            {/* Voluta 2: Nuvem creme ascendente que se expande lateralmente */}
            <motion.div
              animate={
                isPuffing
                  ? { y: [-5, -125], scale: [1, 5.0], opacity: [0.85, 0], x: [0, 26, -22] }
                  : { y: [0, -32], scale: [0.8, 1.8], opacity: [0.6, 0] }
              }
              transition={{ repeat: Infinity, duration: isPuffing ? 1.4 : 2.4, delay: 0.2, ease: 'easeOut' }}
              className="w-12 h-12 rounded-full bg-amber-100/45 blur-xl -mb-3"
            />

            {/* Voluta 3: Nuvem secundária densa para hotbox imediato no baseado */}
            {isPuffing && (
              <>
                <motion.div
                  animate={{ y: [-15, -150], scale: [0.8, 5.8], opacity: [0.8, 0], x: [-15, 30, -10] }}
                  transition={{ repeat: Infinity, duration: 1.6, delay: 0.4, ease: 'easeOut' }}
                  className="w-14 h-14 rounded-full bg-white/55 blur-2xl -mb-4"
                />
                {/* Nuvem com leve toque herbal verde/dourado */}
                <motion.div
                  animate={{ y: [-8, -80], scale: [0.6, 3.4], opacity: [0.75, 0], x: [10, -15] }}
                  transition={{ repeat: Infinity, duration: 1.3, delay: 0.15, ease: 'easeOut' }}
                  className="w-8 h-8 rounded-full bg-emerald-200/35 blur-md"
                />
                {/* Anel de fumaça (Rosca) subindo */}
                <motion.div
                  animate={{ y: [0, -85], scale: [0.5, 3.0], opacity: [0.85, 0], rotate: [0, 60] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                  className="w-10 h-10 rounded-full border-4 border-stone-100/50 blur-[2px] absolute -top-4"
                />
              </>
            )}
          </div>
        </div>
      )}

      {/* SVG DO BASEADO ESTAMPADO COM FOLHAS DE MACONHA */}
      <svg
        viewBox="0 0 840 140"
        className="w-full h-auto drop-shadow-[0_14px_22px_rgba(0,0,0,0.5)] overflow-visible"
        style={{ maxHeight: '140px' }}
      >
        <defs>
          {/* Definição da Folha de Maconha com preenchimento verde floresta */}
          <path id="weed-leaf-vector" d={leafPathD} fill="#236338" />

          {/* 1. Sombra Cilíndrica e Brilho Térmico */}
          <filter id="weed-ember-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 2. Piteira de Papelão Kraft Clara (Como no desenho de referência) */}
          <linearGradient id="crutch-cylinder" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bfa175" />
            <stop offset="20%" stopColor="#eedec7" />
            <stop offset="45%" stopColor="#fdf7ee" />
            <stop offset="70%" stopColor="#e7d2b5" />
            <stop offset="90%" stopColor="#c5a57a" />
            <stop offset="100%" stopColor="#8d6c42" />
          </linearGradient>

          {/* 3. Seda Estampada de Papel Arroz Off-White Creme */}
          <linearGradient id="printed-paper-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d5c8b2" />
            <stop offset="12%" stopColor="#f5efe4" />
            <stop offset="35%" stopColor="#fffdfa" />
            <stop offset="70%" stopColor="#f9f3e8" />
            <stop offset="90%" stopColor="#dfd1ba" />
            <stop offset="100%" stopColor="#ab997e" />
          </linearGradient>

          {/* 4. Brasa Viva na Ponta */}
          <radialGradient id="hot-ember-heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fff176" />
            <stop offset="45%" stopColor="#ff9800" />
            <stop offset="75%" stopColor="#e53935" />
            <stop offset="95%" stopColor="#b71c1c" />
            <stop offset="100%" stopColor="#2b0505" />
          </radialGradient>

          {/* 5. Pavio Torcido Creme */}
          <linearGradient id="weed-twist" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5ebd7" />
            <stop offset="50%" stopColor="#dfcfb5" />
            <stop offset="100%" stopColor="#beaa8a" />
          </linearGradient>
        </defs>

        {/* ========================================================
            1. PITEIRA CLARA LISA (COMO NO DESENHO)
            x=40 até x=160, com contorno escuro e reflexo de luz
            ======================================================== */}
        <g id="piteira-kraft">
          {/* Corpo Cilíndrico da Piteira */}
          <polygon
            points={`${filterStartX},59 ${filterEndX},57 ${filterEndX},83 ${filterStartX},81`}
            fill="url(#crutch-cylinder)"
            stroke="#26120c"
            strokeWidth="1.6"
          />

          {/* Brilho de luz branco suave na lateral da piteira (como no desenho de referência) */}
          <rect
            x="55"
            y="64"
            width="28"
            height="5"
            rx="2.5"
            fill="#ffffff"
            opacity="0.85"
          />

          {/* Abertura na boca (espessura com borda escura) */}
          <ellipse
            cx={filterStartX}
            cy="70"
            rx="3.2"
            ry="11"
            fill="#2d1706"
            stroke="#26120c"
            strokeWidth="1.4"
          />

          {/* Linha divisória preta entre a piteira e o início da seda */}
          <line
            x1={filterEndX}
            y1="57"
            x2={filterEndX}
            y2="83"
            stroke="#26120c"
            strokeWidth="2.4"
          />
        </g>

        {/* ========================================================
            2. O CONE ESTAMPADO COM FOLHAS DE MACONHA
            Ele só existe de x=160 até currentTipX!
            (Quando queima, a parte gasta SOME NO AR!)
            ======================================================== */}
        {currentTipX > filterEndX && (
          <g id="cone-estampado-maconha">
            {/* Máscara de recorte do cone para as folhinhas não vazarem para fora */}
            <clipPath id="cone-clip">
              <polygon
                points={`${filterEndX},57 ${currentTipX},${tipTopY} ${currentTipX},${tipBottomY} ${filterEndX},83`}
              />
            </clipPath>

            {/* Base da Seda de Papel Creme */}
            <polygon
              points={`${filterEndX},57 ${currentTipX},${tipTopY} ${currentTipX},${tipBottomY} ${filterEndX},83`}
              fill="url(#printed-paper-bg)"
              stroke="#26120c"
              strokeWidth="1.6"
            />

            {/* AS FOLHAS DE MACONHA ESTAMPADAS NO CORPO DO BASEADO (COMO NO DESENHO) */}
            <g clipPath="url(#cone-clip)">
              {leafStamps
                .filter((leaf) => leaf.x < currentTipX - 8)
                .map((leaf, index) => (
                  <g
                    key={index}
                    transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.r}) scale(${leaf.s}) translate(-50, -50)`}
                    opacity="0.9"
                  >
                    <use href="#weed-leaf-vector" />
                  </g>
                ))}
            </g>

            {/* Volume e relevo cilíndrico sobre o papel estampado */}
            <polygon
              points={`${filterEndX},59 ${currentTipX},${tipTopY + 3} ${currentTipX},${tipTopY + 10} ${filterEndX},65`}
              fill="#ffffff"
              opacity="0.25"
              pointerEvents="none"
            />
            <polygon
              points={`${filterEndX},79 ${currentTipX},${tipBottomY - 8} ${currentTipX},${tipBottomY} ${filterEndX},83`}
              fill="#2b1a0a"
              opacity="0.2"
              pointerEvents="none"
            />
          </g>
        )}

        {/* ========================================================
            3. PONTA TORCIDA COM RABO DE PEIXE (FISHTAIL TIP)
            Aparece quando burnProgress === 0 (quando novo)
            Com folhinhas estampadas na torção também!
            ======================================================== */}
        {!isLit && (
          <g id="pavio-torcido-fishtail">
            {/* Fechamento torcido que abre na ponta (formato do desenho) */}
            <path
              d="M 700,42 Q 722,54 730,62 Q 745,50 760,40 Q 752,65 760,95 Q 745,84 730,76 Q 722,86 700,98 Z"
              fill="url(#weed-twist)"
              stroke="#26120c"
              strokeWidth="1.6"
            />

            {/* Folhinhas de maconha na coroinha torcida */}
            <g
              transform="translate(744, 66) rotate(20) scale(0.18) translate(-50, -50)"
              opacity="0.85"
            >
              <use href="#weed-leaf-vector" />
            </g>
            <g
              transform="translate(718, 68) rotate(-35) scale(0.14) translate(-50, -50)"
              opacity="0.85"
            >
              <use href="#weed-leaf-vector" />
            </g>

            {/* Vinco do nó torcido no meio */}
            <path
              d="M 726,60 Q 732,69 726,78"
              fill="none"
              stroke="#26120c"
              strokeWidth="1.8"
            />
          </g>
        )}

        {/* ========================================================
            4. BRASA VIVA NA PONTA DA QUEIMA (SEM BARRA CINZA ATRÁS!)
            A parte queimada já sumiu! Aqui fica apenas a brasa viva!
            ======================================================== */}
        {isLit && currentTipX > filterEndX && (
          <g id="brasa-viva">
            {/* Anel de queima carvão irregular na borda da seda */}
            <path
              d={`M ${currentTipX - 2},${tipTopY + 1} Q ${currentTipX - 4},70 ${currentTipX - 2},${tipBottomY - 1}`}
              fill="none"
              stroke="#17110c"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d={`M ${currentTipX - 1},${tipTopY + 2} Q ${currentTipX - 3},70 ${currentTipX - 1},${tipBottomY - 2}`}
              fill="none"
              stroke="#541203"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* A Brasa Incandescente com Brilho Térmico */}
            <g filter="url(#weed-ember-glow)">
              {/* Auréola de fogo vermelho/laranja */}
              <ellipse
                cx={currentTipX}
                cy="70"
                rx={isPuffing ? 8.5 : 6}
                ry={tipHalfHeight + (isPuffing ? 3 : 1)}
                fill="url(#hot-ember-heat)"
                opacity={isPuffing ? 1 : 0.95}
              />

              {/* Núcleo Incandescente Amarelo e Branco Quente */}
              <ellipse
                cx={currentTipX + 1}
                cy="70"
                rx={isPuffing ? 4.5 : 3}
                ry={tipHalfHeight * 0.65}
                fill="#ffffff"
                opacity="0.95"
              />
            </g>

            {/* Faíscas sutis voando da brasa quando puxa */}
            {isPuffing && (
              <g fill="#ffea00">
                <circle cx={currentTipX + 8} cy="60" r="1.5" opacity="0.9" />
                <circle cx={currentTipX + 14} cy="76" r="1.2" opacity="0.8" />
                <circle cx={currentTipX + 10} cy="84" r="1.4" opacity="0.85" />
                <circle cx={currentTipX + 18} cy="66" r="1.0" opacity="0.75" />
              </g>
            )}
          </g>
        )}

        {/* Quando totalmente fumado até a piteira (100%) */}
        {currentTipX <= filterEndX && (
          <g id="ponta-final">
            <ellipse cx={filterEndX} cy="70" rx="4" ry="13" fill="#1c1917" />
            <circle cx={filterEndX} cy="70" r="3" fill="#ff5722" />
          </g>
        )}
      </svg>
    </div>
  );
};
