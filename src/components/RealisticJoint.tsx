import React from 'react';
import { motion } from 'motion/react';

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

  // Path SVG da folha de maconha extraído com fidelidade do pacote vetorial
  const leafPathD =
    "M49.77,0.0 L48.84,6.34 L48.37,6.03 L48.22,9.89 L47.13,10.05 L47.13,14.06 L45.74,13.76 L46.2,17.16 L44.5,16.85 L44.65,19.01 L45.27,20.87 L45.12,21.02 L43.57,20.09 L43.1,20.4 L43.26,22.87 L44.03,25.19 L43.88,25.35 L42.17,24.42 L41.86,24.57 L42.17,27.82 L43.41,30.45 L43.1,30.6 L41.24,29.68 L40.62,29.83 L41.09,32.46 L43.1,36.01 L42.95,36.17 L40.16,34.78 L39.84,35.24 L40.16,38.02 L41.55,40.96 L41.09,41.11 L39.84,40.8 L39.53,41.11 L39.84,43.59 L41.24,46.83 L40.78,46.99 L39.53,46.52 L39.53,48.38 L40.16,50.7 L41.55,53.01 L41.24,53.17 L39.69,52.55 L39.22,52.55 L39.07,52.86 L39.69,55.33 L40.62,57.19 L43.26,60.59 L42.33,60.74 L42.17,61.36 L43.88,64.45 L43.72,64.61 L40.78,60.59 L40.16,61.21 L39.07,57.19 L38.6,56.57 L37.98,57.65 L37.67,55.49 L36.43,52.7 L35.97,52.4 L35.04,53.32 L34.57,51.0 L33.64,49.3 L32.87,48.53 L31.94,50.08 L31.16,47.76 L29.3,44.82 L28.68,45.13 L28.06,46.37 L26.51,43.59 L25.12,42.19 L24.5,42.66 L23.88,43.74 L22.48,41.42 L20.78,39.72 L20.16,39.72 L19.53,41.11 L16.28,38.18 L14.57,37.09 L14.11,37.25 L13.64,38.18 L9.61,35.39 L8.99,36.32 L4.81,33.54 L0.93,31.99 L6.2,38.49 L5.43,39.1 L7.29,41.11 L7.29,41.89 L9.61,44.2 L7.44,44.51 L7.29,44.82 L9.61,47.14 L12.09,48.69 L10.23,49.46 L10.08,50.08 L12.4,51.93 L15.04,53.17 L13.18,54.1 L13.02,54.56 L15.66,56.26 L19.07,57.19 L17.21,58.11 L16.59,58.73 L18.6,60.12 L22.02,61.05 L22.02,61.36 L20.31,62.29 L21.55,63.52 L22.48,63.99 L24.5,64.45 L25.89,64.45 L26.36,64.76 L24.5,66.15 L27.13,67.23 L30.23,67.7 L28.37,69.4 L31.94,70.48 L34.26,70.79 L34.57,71.1 L33.33,72.02 L36.74,73.57 L35.81,73.72 L33.49,72.95 L32.71,72.95 L32.56,73.88 L29.92,72.49 L28.53,72.18 L27.91,73.11 L26.2,72.02 L24.65,71.56 L23.88,71.72 L23.88,72.8 L21.24,71.41 L19.69,71.25 L19.53,72.95 L17.36,72.18 L15.19,71.87 L15.66,73.26 L15.35,73.57 L13.49,72.64 L11.32,72.33 L11.78,73.57 L11.63,74.19 L9.3,73.57 L7.13,73.42 L7.13,74.65 L4.34,74.19 L4.34,74.65 L3.88,75.12 L2.33,75.27 L0.0,76.04 L2.64,77.28 L6.36,78.05 L6.51,78.36 L5.58,79.75 L9.46,79.91 L9.61,80.06 L9.15,81.14 L11.63,81.14 L11.78,81.3 L11.01,82.38 L11.16,82.69 L15.5,82.53 L15.66,82.69 L14.73,83.93 L14.88,84.39 L17.67,84.54 L20.93,83.31 L21.09,83.62 L20.16,86.09 L22.33,85.63 L24.65,84.39 L24.81,84.85 L24.34,85.94 L24.5,86.24 L26.36,85.78 L28.68,84.54 L28.99,85.01 L28.53,86.24 L30.7,85.78 L33.02,84.39 L33.33,84.54 L33.18,85.47 L33.8,85.63 L35.81,84.85 L37.21,83.93 L37.52,84.08 L37.52,84.54 L37.98,84.54 L41.86,83.0 L42.33,83.31 L43.1,83.15 L43.1,83.46 L41.09,84.39 L41.55,84.7 L41.4,85.01 L39.84,85.47 L37.83,87.02 L38.76,87.64 L35.35,89.95 L36.59,90.57 L34.42,92.74 L32.25,95.67 L32.4,96.14 L33.49,96.29 L32.25,99.85 L34.73,98.45 L38.14,95.52 L38.6,96.45 L42.02,92.12 L42.17,93.82 L42.64,93.82 L45.58,89.34 L45.89,89.49 L46.05,90.88 L47.29,89.34 L48.37,87.02 L49.15,88.1 L49.92,85.63 L50.7,88.1 L51.47,87.02 L52.4,89.03 L53.8,90.88 L53.95,89.49 L54.26,89.34 L57.21,93.82 L57.83,93.66 L57.67,92.43 L57.98,92.27 L61.24,96.45 L61.86,95.52 L64.5,97.99 L67.6,99.85 L66.36,96.45 L66.51,96.14 L67.44,96.14 L67.6,95.67 L65.43,92.74 L63.26,90.57 L63.41,90.26 L64.5,89.95 L61.09,87.64 L62.02,87.02 L60.0,85.47 L58.45,85.01 L58.29,84.7 L58.76,84.23 L56.74,83.46 L56.74,83.15 L57.52,83.31 L57.98,83.0 L61.86,84.54 L62.33,84.54 L62.33,84.08 L62.64,83.93 L65.12,85.32 L66.2,85.63 L66.67,85.47 L66.51,84.54 L66.82,84.39 L69.15,85.78 L71.32,86.24 L70.85,85.01 L71.01,84.54 L73.49,85.78 L75.35,86.24 L75.5,85.94 L75.04,84.85 L75.19,84.39 L77.52,85.63 L79.69,86.09 L79.53,85.16 L78.76,83.77 L78.91,83.31 L82.17,84.54 L84.96,84.39 L85.12,83.93 L84.19,82.69 L84.34,82.53 L88.68,82.69 L88.84,82.38 L88.06,81.3 L88.22,81.14 L90.7,81.14 L90.23,80.06 L90.39,79.91 L94.26,79.75 L93.33,78.36 L93.49,78.05 L97.21,77.28 L99.84,76.04 L98.76,75.58 L96.12,75.12 L95.5,74.65 L95.5,74.19 L92.71,74.65 L92.71,73.42 L90.54,73.57 L88.22,74.19 L88.06,73.72 L88.53,72.33 L86.36,72.64 L84.5,73.57 L84.19,73.26 L84.65,71.87 L82.48,72.18 L80.31,72.95 L80.16,71.25 L78.14,71.56 L75.97,72.8 L75.97,71.72 L75.19,71.56 L73.64,72.02 L71.94,73.11 L71.16,72.18 L69.46,72.64 L67.29,73.88 L67.13,72.95 L63.88,73.72 L63.26,73.57 L66.51,72.02 L65.27,71.1 L65.58,70.79 L67.91,70.48 L71.47,69.4 L69.61,67.7 L70.23,67.39 L72.71,67.23 L75.35,66.15 L73.49,64.76 L73.95,64.45 L76.9,64.14 L78.29,63.52 L79.53,62.29 L77.83,61.36 L77.83,61.05 L81.24,60.12 L83.26,58.73 L82.64,58.11 L80.78,57.19 L84.19,56.26 L86.82,54.56 L86.67,54.1 L84.81,53.17 L87.44,51.93 L89.77,49.92 L89.61,49.46 L87.75,48.69 L91.01,46.52 L92.56,44.82 L92.4,44.51 L90.23,44.2 L92.56,41.89 L92.56,41.11 L94.42,39.1 L93.64,38.49 L98.91,31.99 L95.35,33.38 L90.85,36.32 L90.23,35.39 L86.2,38.18 L85.74,37.25 L85.27,37.09 L83.41,38.33 L80.31,41.11 L79.69,39.72 L78.91,39.88 L77.36,41.42 L75.97,43.74 L75.19,42.35 L74.73,42.19 L73.33,43.59 L71.78,46.37 L71.16,45.13 L70.54,44.82 L68.84,47.45 L67.91,50.08 L67.29,48.84 L66.82,48.69 L65.27,51.0 L64.96,52.24 L65.12,53.17 L64.81,53.32 L63.88,52.4 L63.57,52.55 L62.17,55.49 L61.86,57.65 L61.24,56.57 L60.93,56.88 L59.69,61.21 L59.07,60.59 L56.12,64.61 L55.97,64.3 L57.67,61.36 L57.52,60.74 L56.59,60.59 L59.22,57.19 L60.16,55.33 L60.78,53.01 L60.62,52.55 L58.6,53.17 L58.29,53.01 L59.69,50.7 L60.31,48.38 L60.31,46.52 L59.07,46.99 L58.6,46.83 L60.0,43.59 L60.31,41.11 L60.0,40.8 L58.91,41.11 L58.29,40.96 L59.69,38.02 L60.0,35.24 L59.69,34.78 L56.9,36.17 L56.74,36.01 L58.76,32.46 L59.22,29.98 L58.76,29.68 L56.74,30.6 L56.43,30.45 L57.52,28.44 L57.98,24.57 L57.67,24.42 L56.12,25.35 L55.81,25.19 L56.59,22.87 L56.74,20.4 L56.28,20.09 L54.73,21.02 L54.57,20.87 L55.19,19.01 L55.35,16.85 L53.64,17.16 L54.11,13.76 L53.18,14.06 L52.71,13.91 L52.71,10.05 L51.63,9.89 L51.47,6.03 L51.01,6.34 L50.85,6.18 L50.08,0.0 Z";

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
      {/* Fumaça viva saindo da brasa na ponta */}
      {isLit && (
        <div
          className="absolute -top-14 transition-all duration-700 ease-out pointer-events-none z-30"
          style={{
            left: `${((currentTipX / 840) * 100).toFixed(1)}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Volutas de fumaça aromática */}
            <motion.div
              animate={isPuffing ? { y: [-10, -50], scale: [0.8, 2.6], opacity: [0.8, 0], x: [0, -8, 8] } : { y: [-5, -38], scale: [0.6, 2], opacity: [0.55, 0], x: [0, 6, -6] }}
              transition={{ repeat: Infinity, duration: isPuffing ? 1.1 : 2.0, ease: 'easeOut' }}
              className="w-8 h-8 rounded-full bg-stone-300/40 blur-md -mb-3"
            />
            <motion.div
              animate={isPuffing ? { y: [0, -35], scale: [1, 2.2], opacity: [0.85, 0], x: [0, 10, -10] } : { y: [0, -28], scale: [0.8, 1.6], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: isPuffing ? 1.3 : 2.4, delay: 0.35, ease: 'easeOut' }}
              className="w-6 h-6 rounded-full bg-amber-100/35 blur-sm"
            />
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
