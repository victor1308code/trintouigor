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
  // Geometria no viewBox 0 0 820 140
  // Piteira Longa de Papelão: x=40 até x=160 (largura 120px, altura 22px na boca e 26px na emenda)
  // Corpo do Baseado (Cone de Maconha): x=160 até x=700 (largura 540px, altura abre de 26px até 56px na ponta!)
  // Ponta torcida (quando novo): x=700 até x=745

  const filterStartX = 40;
  const filterEndX = 160;
  const paperFullEndX = 700;
  const totalPaperLength = paperFullEndX - filterEndX; // 540px

  const isLit = burnProgress > 0 || isPuffing;
  const progressClamped = Math.min(100, Math.max(0, burnProgress));

  // Quando é gasto, o baseado literalmente ENCURTA (a parte queimada SUMIU, sem barra cinza!)
  // Posição atual da ponta do baseado:
  const currentTipX = paperFullEndX - (progressClamped / 100) * totalPaperLength;

  // Altura do cone na posição atual da ponta (de 26px na piteira até 56px no final)
  const tipRatio = (currentTipX - filterEndX) / totalPaperLength;
  const tipHalfHeight = (26 + tipRatio * 30) / 2; // de 13 até 28 (altura 26px a 56px)
  const tipTopY = 70 - tipHalfHeight;
  const tipBottomY = 70 + tipHalfHeight;

  return (
    <div className="w-full relative select-none py-4">
      {/* Fumaça viva saindo da brasa na ponta */}
      {isLit && (
        <div
          className="absolute -top-14 transition-all duration-700 ease-out pointer-events-none z-30"
          style={{
            left: `${((currentTipX / 820) * 100).toFixed(1)}%`,
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

      {/* SVG DO BASEADO DE MACONHA REALISTA */}
      <svg
        viewBox="0 0 820 140"
        className="w-full h-auto drop-shadow-[0_14px_22px_rgba(0,0,0,0.5)] overflow-visible"
        style={{ maxHeight: '140px' }}
      >
        <defs>
          {/* 1. Sombra Cilíndrica e Brilho Térmico */}
          <filter id="weed-ember-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 2. Piteira Longa de Papelão Kraft Cru (Cardboard Crutch) */}
          <linearGradient id="crutch-cylinder" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7a4e23" />
            <stop offset="15%" stopColor="#b3824f" />
            <stop offset="35%" stopColor="#d8ab79" />
            <stop offset="60%" stopColor="#be8f5d" />
            <stop offset="85%" stopColor="#926233" />
            <stop offset="100%" stopColor="#5c3411" />
          </linearGradient>

          {/* 3. Recheio de Maconha Triturada (Flor verde visível sob a seda fina) */}
          <linearGradient id="weed-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2c3a16" />
            <stop offset="20%" stopColor="#4e6528" />
            <stop offset="50%" stopColor="#638034" />
            <stop offset="80%" stopColor="#435821" />
            <stop offset="100%" stopColor="#222e0f" />
          </linearGradient>

          {/* 4. Seda Ultrafina Translúcida de Cânhamo Natural (Estilo RAW Brown) */}
          <linearGradient id="raw-hemp-paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#947c5d" stopOpacity="0.82" />
            <stop offset="15%" stopColor="#cfbba0" stopOpacity="0.75" />
            <stop offset="35%" stopColor="#f3e8d6" stopOpacity="0.70" />
            <stop offset="65%" stopColor="#dfcbaf" stopOpacity="0.75" />
            <stop offset="88%" stopColor="#af987a" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#735d40" stopOpacity="0.92" />
          </linearGradient>

          {/* 5. Linha de Goma Orgânica da Seda */}
          <linearGradient id="gum-strip" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>

          {/* 6. Brasa Viva da Ponta (Incandescente) */}
          <radialGradient id="hot-ember-heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="20%" stopColor="#fff176" />
            <stop offset="45%" stopColor="#ff9800" />
            <stop offset="75%" stopColor="#e53935" />
            <stop offset="95%" stopColor="#b71c1c" />
            <stop offset="100%" stopColor="#2b0505" />
          </radialGradient>

          {/* 7. Pavio Torcido (Twisted Tip) */}
          <linearGradient id="weed-twist" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#baa081" />
            <stop offset="50%" stopColor="#9a7f60" />
            <stop offset="100%" stopColor="#675034" />
          </linearGradient>
        </defs>

        {/* ========================================================
            1. PITEIRA LONGA DE PAPELÃO KRAFT (CRUTCH BRASILEIRA)
            x=40 até x=160
            ======================================================== */}
        <g id="piteira-longa">
          {/* Corpo Cilíndrico da Piteira */}
          <polygon
            points={`${filterStartX},59 ${filterEndX},57 ${filterEndX},83 ${filterStartX},81`}
            fill="url(#crutch-cylinder)"
          />

          {/* Dobras verticais da piteira enrolada */}
          <line x1="70" y1="59" x2="70" y2="81" stroke="#4a2a0c" strokeWidth="0.8" opacity="0.4" />
          <line x1="100" y1="58" x2="100" y2="82" stroke="#4a2a0c" strokeWidth="0.8" opacity="0.35" />
          <line x1="130" y1="58" x2="130" y2="82" stroke="#4a2a0c" strokeWidth="0.8" opacity="0.35" />

          {/* Abertura na boca (espessura cilíndrica com dobra interna em 'S') */}
          <ellipse cx={filterStartX} cy="70" rx="3" ry="11" fill="#2d1706" />
          <path
            d={`M ${filterStartX - 1},62 Q ${filterStartX + 2},66 ${filterStartX - 1},70 Q ${filterStartX - 3},74 ${filterStartX - 1},78`}
            fill="none"
            stroke="#d8ab79"
            strokeWidth="1.2"
            opacity="0.9"
          />

          {/* Emenda da Seda sobre a Piteira */}
          <line x1={filterEndX - 1} y1="57" x2={filterEndX - 1} y2="83" stroke="#3d2008" strokeWidth="2" opacity="0.75" />
          <line x1={filterEndX + 1} y1="57" x2={filterEndX + 1} y2="83" stroke="#f5e6d0" strokeWidth="0.8" opacity="0.6" />
        </g>

        {/* ========================================================
            2. O CONE DE MACONHA (RECHEIO VERDE + SEDA RAW BROWN)
            Ele só existe de x=160 até currentTipX!
            (Quando queima, a parte gasta SOME COMPLETAMENTE!)
            ======================================================== */}
        {currentTipX > filterEndX && (
          <g id="cone-maconha">
            {/* 2.1 Recheio Interno de Erva Verde Triturada (Visível sob a seda translúcida) */}
            <polygon
              points={`${filterEndX},57 ${currentTipX},${tipTopY} ${currentTipX},${tipBottomY} ${filterEndX},83`}
              fill="url(#weed-fill)"
            />

            {/* Pedaços de flor triturada orgânica / pistilos dourados no recheio */}
            <g opacity="0.45">
              {/* Pontinhos e nuances de erva */}
              <circle cx="200" cy="68" r="4.5" fill="#38491f" />
              <circle cx="215" cy="73" r="3" fill="#859942" />
              <circle cx="250" cy="65" r="5" fill="#2c3a16" />
              <circle cx="280" cy="74" r="6" fill="#4d632b" />
              <ellipse cx="320" cy="67" rx="7" ry="4" fill="#6d8a39" />
              <circle cx="360" cy="76" r="6.5" fill="#38491f" />
              <circle cx="410" cy="64" r="7" fill="#5b7430" />
              <circle cx="460" cy="75" r="8" fill="#425520" />
              <ellipse cx="510" cy="66" rx="9" ry="5" fill="#6e8e3d" />
              <circle cx="570" cy="77" r="9" fill="#38491f" />
              <circle cx="630" cy="65" r="10" fill="#4e6528" />
              <circle cx="680" cy="76" r="11" fill="#5e7a32" />
              {/* Toques de pistilos âmbar/dourados de flor curada */}
              <circle cx="230" cy="71" r="2" fill="#c97f26" />
              <circle cx="340" cy="69" r="2.5" fill="#b8731f" />
              <circle cx="440" cy="72" r="3" fill="#d98c2b" />
              <circle cx="540" cy="68" r="3.5" fill="#c97f26" />
              <circle cx="650" cy="74" r="4" fill="#b8731f" />
            </g>

            {/* 2.2 Seda Unbleached de Cânhamo por cima (Translúcida com Iluminação Cilíndrica) */}
            <polygon
              points={`${filterEndX},57 ${currentTipX},${tipTopY} ${currentTipX},${tipBottomY} ${filterEndX},83`}
              fill="url(#raw-hemp-paper)"
            />

            {/* Linha da cola da seda (ao longo da borda superior) */}
            <path
              d={`M ${filterEndX},63 L ${currentTipX},${tipTopY + 7}`}
              stroke="#ffffff"
              strokeWidth="1.2"
              opacity="0.35"
            />

            {/* Marca d'água cruzada sutil de seda de qualidade (criss-cross) */}
            <g opacity="0.06" stroke="#222" strokeWidth="0.6">
              <line x1="200" y1="57" x2="230" y2="83" />
              <line x1="260" y1="56" x2="290" y2="84" />
              <line x1="320" y1="55" x2="350" y2="85" />
              <line x1="380" y1="54" x2="410" y2="86" />
              <line x1="440" y1="53" x2="470" y2="87" />
              <line x1="500" y1="52" x2="530" y2="88" />
              <line x1="560" y1="51" x2="590" y2="89" />
              <line x1="620" y1="50" x2="650" y2="90" />
            </g>

            {/* Brilho de volume superior */}
            <polygon
              points={`${filterEndX},60 ${currentTipX},${tipTopY + 3} ${currentTipX},${tipTopY + 12} ${filterEndX},67`}
              fill="#ffffff"
              opacity="0.14"
            />

            {/* Sombra de volume inferior */}
            <polygon
              points={`${filterEndX},79 ${currentTipX},${tipBottomY - 10} ${currentTipX},${tipBottomY} ${filterEndX},83`}
              fill="#2b1a0a"
              opacity="0.28"
            />
          </g>
        )}

        {/* ========================================================
            3. PONTA TORCIDA CLÁSSICA (QUANDO NOVO / APAGADO)
            Aparece apenas quando burnProgress === 0 e não está puxando
            ======================================================== */}
        {!isLit && (
          <g id="pavio-torcido-maconha">
            {/* O fechamento em torção de baseado */}
            <path
              d="M 700,42 Q 725,55 745,67 Q 725,82 700,98 Q 706,70 700,42 Z"
              fill="url(#weed-twist)"
            />
            {/* Vincos e torções do papel na ponta */}
            <path
              d="M 702,46 Q 722,60 742,67"
              fill="none"
              stroke="#543e26"
              strokeWidth="1.3"
              opacity="0.75"
            />
            <path
              d="M 702,94 Q 722,78 742,69"
              fill="none"
              stroke="#543e26"
              strokeWidth="1.3"
              opacity="0.75"
            />
            <path
              d="M 710,54 Q 728,68 745,68"
              fill="none"
              stroke="#382613"
              strokeWidth="1"
              opacity="0.8"
            />
            {/* Ponta amassadinha de fechar */}
            <circle cx="745" cy="67" r="3.5" fill="#4d351b" />
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
