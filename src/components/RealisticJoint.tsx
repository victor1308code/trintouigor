import React from 'react';
import { motion } from 'motion/react';

interface RealisticJointProps {
  burnProgress: number; // 0 (inteiro/apagado) a 100 (totalmente queimado até a piteira)
  isPuffing?: boolean;
}

export const RealisticJoint: React.FC<RealisticJointProps> = ({
  burnProgress = 0,
  isPuffing = false,
}) => {
  // Coordenadas do baseado no viewBox 0 0 840 140
  // Piteira: x=40 até x=170 (altura 32px a 36px)
  // Seda: x=170 até x=730 (altura 36px até 50px)
  // Ponta torcida: x=730 até x=780

  const filterEndX = 170;
  const paperEndX = 730;
  const totalPaperLength = paperEndX - filterEndX; // 560px

  // Posição X da queima (da direita para a esquerda)
  const isLit = burnProgress > 0 || isPuffing;
  const currentBurnLength = (Math.min(100, Math.max(0, burnProgress)) / 100) * totalPaperLength;
  const emberX = paperEndX - currentBurnLength;

  return (
    <div className="w-full relative select-none py-4">
      {/* Sombra e Efeito de Fumaça Dinâmica subindo da brasa */}
      {isLit && (
        <div
          className="absolute -top-12 transition-all duration-700 ease-out pointer-events-none z-30"
          style={{
            left: `${((emberX / 840) * 100).toFixed(1)}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Volutas de Fumaça Realistas */}
            <motion.div
              animate={isPuffing ? { y: [-10, -45], scale: [0.8, 2.4], opacity: [0.7, 0] } : { y: [-5, -35], scale: [0.6, 1.8], opacity: [0.45, 0] }}
              transition={{ repeat: Infinity, duration: isPuffing ? 1.2 : 2.2, ease: 'easeOut' }}
              className="w-7 h-7 rounded-full bg-stone-300/40 blur-md -mb-3"
            />
            <motion.div
              animate={isPuffing ? { y: [0, -35], scale: [1, 2.2], opacity: [0.8, 0], x: [0, 8, -6] } : { y: [0, -25], scale: [0.8, 1.5], opacity: [0.5, 0], x: [0, 4, -4] }}
              transition={{ repeat: Infinity, duration: isPuffing ? 1.4 : 2.6, delay: 0.4, ease: 'easeOut' }}
              className="w-5 h-5 rounded-full bg-amber-200/35 blur-sm"
            />
          </div>
        </div>
      )}

      {/* SVG DO BASEADO REALISTA */}
      <svg
        viewBox="0 0 840 140"
        className="w-full h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)] overflow-visible"
        style={{ maxHeight: '130px' }}
      >
        <defs>
          {/* 1. Sombra de Contato Inferior Realista */}
          <filter id="joint-shadow" x="-5%" y="-20%" width="110%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feOffset dx="0" dy="14" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.45" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 2. Brilho Térmico da Brasa */}
          <filter id="ember-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* 3. Gradiente Cilíndrico da Piteira (Papel Kraft Natural / Cardboard) */}
          <linearGradient id="kraft-cylinder" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8c582f" />
            <stop offset="12%" stopColor="#cfa579" />
            <stop offset="35%" stopColor="#e5c59f" />
            <stop offset="60%" stopColor="#caa072" />
            <stop offset="85%" stopColor="#a37144" />
            <stop offset="100%" stopColor="#673c18" />
          </linearGradient>

          {/* 4. Gradiente da Seda (Papel translúcido ultrafino unbleached estilo RAW) */}
          <linearGradient id="paper-cylinder" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b5aa99" />
            <stop offset="8%" stopColor="#ded6c8" />
            <stop offset="25%" stopColor="#fbf9f4" />
            <stop offset="55%" stopColor="#f2eae0" />
            <stop offset="78%" stopColor="#ded4c3" />
            <stop offset="92%" stopColor="#baa993" />
            <stop offset="100%" stopColor="#8c7a64" />
          </linearGradient>

          {/* 5. Gradiente da Linha de Goma / Dobra */}
          <linearGradient id="gum-line" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
          </linearGradient>

          {/* 6. Textura Interna de Erva (Nuances através da seda fina) */}
          <linearGradient id="herb-nuance" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#556b2f" stopOpacity="0.15" />
            <stop offset="30%" stopColor="#8f9779" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#6b8e23" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4a5d23" stopOpacity="0.22" />
          </linearGradient>

          {/* 7. Gradiente de Cinza de Queima Realista */}
          <linearGradient id="ash-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2b2b2b" />
            <stop offset="15%" stopColor="#696969" />
            <stop offset="40%" stopColor="#a9a9a9" />
            <stop offset="70%" stopColor="#545454" />
            <stop offset="100%" stopColor="#1f1f1f" />
          </linearGradient>

          {/* 8. Brasa Incandescente */}
          <radialGradient id="ember-heat" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#ffea00" />
            <stop offset="55%" stopColor="#ff3d00" />
            <stop offset="85%" stopColor="#b71c1c" />
            <stop offset="100%" stopColor="#3e0707" />
          </radialGradient>

          {/* 9. Gradiente da Ponta Torcida (Twisted Tip) */}
          <linearGradient id="twist-tip" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ded4c3" />
            <stop offset="40%" stopColor="#c8bcab" />
            <stop offset="80%" stopColor="#ab9e8b" />
            <stop offset="100%" stopColor="#8a7c6a" />
          </linearGradient>
        </defs>

        {/* ========================================================
            CAMADA 1: A PITEIRA (KRAFT NATURAL ROLLED CRUTCH)
            x=40 a x=170, com formato cônico (32px a 36px de altura)
            ======================================================== */}
        <g id="filter-tip">
          {/* Corpo Cilíndrico da Piteira */}
          <polygon
            points="40,54 170,52 170,88 40,86"
            fill="url(#kraft-cylinder)"
          />

          {/* Textura de papelão: linhas verticais sutis de enrolamento */}
          <line x1="65" y1="54" x2="65" y2="86" stroke="#5c3818" strokeWidth="0.8" opacity="0.35" />
          <line x1="95" y1="53" x2="95" y2="87" stroke="#5c3818" strokeWidth="0.8" opacity="0.3" />
          <line x1="125" y1="53" x2="125" y2="87" stroke="#5c3818" strokeWidth="0.8" opacity="0.3" />
          <line x1="150" y1="52" x2="150" y2="88" stroke="#5c3818" strokeWidth="0.8" opacity="0.3" />

          {/* Abertura da Piteira na boca (elipse com dobra interna em 'S') */}
          <ellipse cx="40" cy="70" rx="3.5" ry="16" fill="#3a1f0a" />
          <path
            d="M 39,59 Q 41,65 39,70 Q 37,75 39,81"
            fill="none"
            stroke="#cfa579"
            strokeWidth="1.2"
            opacity="0.85"
          />

          {/* Sombra da sobreposição da seda sobre a piteira */}
          <line x1="169" y1="52" x2="169" y2="88" stroke="#4a2c10" strokeWidth="2" opacity="0.65" />
          <line x1="171" y1="52" x2="171" y2="88" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
        </g>

        {/* ========================================================
            CAMADA 2: O CORPO DA SEDA (CONICAL ROLLED BODY)
            x=170 a x=730, expande suavemente de 36px para 50px de altura
            ======================================================== */}
        <g id="paper-body">
          {/* Base da Seda com Iluminação Cilíndrica */}
          <polygon
            points="170,52 730,45 730,95 170,88"
            fill="url(#paper-cylinder)"
          />

          {/* Nuances de erva triturada translúcidas através da seda */}
          <polygon
            points="172,53 728,46 728,94 172,87"
            fill="url(#herb-nuance)"
          />

          {/* Pequenas nuances orgânicas naturais de erva sob a seda */}
          <ellipse cx="230" cy="68" rx="8" ry="4" fill="#556b2f" opacity="0.12" />
          <ellipse cx="310" cy="72" rx="12" ry="5" fill="#4a5d23" opacity="0.15" />
          <ellipse cx="390" cy="65" rx="10" ry="4" fill="#6b8e23" opacity="0.14" />
          <ellipse cx="480" cy="74" rx="14" ry="6" fill="#556b2f" opacity="0.12" />
          <ellipse cx="560" cy="67" rx="11" ry="5" fill="#4a5d23" opacity="0.16" />
          <ellipse cx="640" cy="73" rx="15" ry="6" fill="#6b8e23" opacity="0.13" />

          {/* Linha longitudinal da cola (sutil brilho da goma ao longo do topo) */}
          <path
            d="M 170,58 L 730,52"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.4"
          />

          {/* Marca d'água cruzada sutil de seda nobre (linhas transversais finas) */}
          <g opacity="0.08" stroke="#333" strokeWidth="0.5">
            <line x1="220" y1="52" x2="250" y2="88" />
            <line x1="280" y1="51" x2="310" y2="89" />
            <line x1="340" y1="50" x2="370" y2="90" />
            <line x1="400" y1="49" x2="430" y2="91" />
            <line x1="460" y1="48" x2="490" y2="92" />
            <line x1="520" y1="47" x2="550" y2="93" />
            <line x1="580" y1="46" x2="610" y2="94" />
            <line x1="640" y1="46" x2="670" y2="94" />
          </g>

          {/* Brilho especular de luz na parte superior do cone */}
          <polygon
            points="170,55 730,48 730,60 170,62"
            fill="#ffffff"
            opacity="0.18"
          />

          {/* Sombra de oclusão na parte inferior do cone */}
          <polygon
            points="170,83 730,89 730,95 170,88"
            fill="#3a2f20"
            opacity="0.25"
          />
        </g>

        {/* ========================================================
            CAMADA 3: PONTA TORCIDA (TWISTED TIP) - QUANDO APAGADO
            Quando burnProgress === 0 e não está puxando fumaça
            ======================================================== */}
        {!isLit && (
          <g id="twisted-tip">
            {/* Cone de fechamento torcido clássico */}
            <path
              d="M 730,45 Q 755,56 775,67 Q 755,79 730,95 Q 735,70 730,45 Z"
              fill="url(#twist-tip)"
            />
            {/* Linhas de torção do papel na ponta */}
            <path
              d="M 732,48 Q 750,62 770,68"
              fill="none"
              stroke="#8a7c6a"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <path
              d="M 732,92 Q 750,75 772,69"
              fill="none"
              stroke="#8a7c6a"
              strokeWidth="1.2"
              opacity="0.6"
            />
            <path
              d="M 740,55 Q 758,68 775,68"
              fill="none"
              stroke="#594d3f"
              strokeWidth="0.8"
              opacity="0.7"
            />
            {/* Pontinha amassada torcida */}
            <circle cx="775" cy="68" r="3.5" fill="#675846" />
          </g>
        )}

        {/* ========================================================
            CAMADA 4: QUEIMA REALISTA (CINZA, CARVÃO & BRASA VIVA)
            Quando burnProgress > 0 ou isPuffing === true
            ======================================================== */}
        {isLit && (
          <g id="burning-section">
            {/* 1. Cinza de Queima (Área já consumida à direita da brasa) */}
            {emberX < paperEndX && (
              <g id="ash-body">
                {/* Geometria da cinza cilíndrica */}
                <polygon
                  points={`${emberX},${45 + ((730 - emberX) / 560) * 0} 730,45 730,95 ${emberX},${95 - ((730 - emberX) / 560) * 0}`}
                  fill="url(#ash-gradient)"
                />
                
                {/* Textura irregular de cinza esfarelada / estalos de carvão */}
                <g opacity="0.6" stroke="#222" strokeWidth="0.7">
                  <path d={`M ${emberX + 15},52 Q ${emberX + 25},60 ${emberX + 20},72`} fill="none" />
                  <path d={`M ${emberX + 35},68 Q ${emberX + 45},78 ${emberX + 38},88`} fill="none" />
                  <path d={`M ${emberX + 60},56 Q ${emberX + 70},65 ${emberX + 65},80`} fill="none" />
                </g>

                {/* Manchas de cinza branca e flocos de queima */}
                <ellipse cx={emberX + 20} cy="66" rx="6" ry="3" fill="#e0e0e0" opacity="0.65" />
                <ellipse cx={emberX + 45} cy="74" rx="8" ry="4" fill="#cccccc" opacity="0.6" />
                <ellipse cx={emberX + 70} cy="62" rx="7" ry="3.5" fill="#f5f5f5" opacity="0.5" />
              </g>
            )}

            {/* 2. Anel de Queima Escuro (Charcoal Line na borda do papel) */}
            <path
              d={`M ${emberX - 3},${45 + ((730 - emberX) / 560) * 7} Q ${emberX - 6},70 ${emberX - 3},${95 - ((730 - emberX) / 560) * 7}`}
              fill="none"
              stroke="#141414"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d={`M ${emberX - 1},${46 + ((730 - emberX) / 560) * 7} Q ${emberX - 4},70 ${emberX - 1},${94 - ((730 - emberX) / 560) * 7}`}
              fill="none"
              stroke="#681500"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* 3. A Brasa Incandescente (Glowing Hot Ember) */}
            <g filter="url(#ember-glow)">
              {/* Auréola de calor alaranjada */}
              <ellipse
                cx={emberX}
                cy="70"
                rx={isPuffing ? 8 : 5.5}
                ry={20}
                fill="url(#ember-heat)"
                opacity={isPuffing ? 1 : 0.92}
              />

              {/* Núcleo Incandescente Amarelo/Branco pulsante */}
              <ellipse
                cx={emberX + 1}
                cy="70"
                rx={isPuffing ? 4.5 : 2.8}
                ry={13}
                fill="#ffffff"
                opacity="0.9"
              />
            </g>

            {/* Micro faíscas incandescentes saindo da brasa */}
            {isPuffing && (
              <g fill="#ffeb3b">
                <circle cx={emberX - 6} cy="62" r="1.2" opacity="0.9" />
                <circle cx={emberX - 9} cy="75" r="1" opacity="0.8" />
                <circle cx={emberX - 5} cy="82" r="1.3" opacity="0.85" />
                <circle cx={emberX - 12} cy="68" r="0.8" opacity="0.75" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
