import React from 'react';

// Estrela Solitária do Botafogo (5 pontas perfeita)
export const BotafogoStar: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-6 h-6", 
  size = 24 
}) => (
  <svg 
    viewBox="0 0 100 100" 
    width={size} 
    height={size} 
    className={`inline-block ${className}`}
    fill="currentColor"
  >
    <polygon points="50,5 64,36 98,36 71,57 81,91 50,70 19,91 29,57 2,36 36,36" />
  </svg>
);

// Escudo Oficial do Glorioso Botafogo
export const BotafogoShield: React.FC<{ className?: string; size?: number }> = ({
  className = "w-10 h-10",
  size = 40
}) => (
  <svg
    viewBox="0 0 100 120"
    width={size}
    height={size}
    className={`inline-block drop-shadow-lg ${className}`}
  >
    <defs>
      <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#e5e5e5" />
        <stop offset="100%" stopColor="#737373" />
      </linearGradient>
    </defs>
    {/* Escudo Externo Preto */}
    <path
      d="M50,4 C88,4 96,24 96,66 C96,96 70,113 50,118 C30,113 4,96 4,66 C4,24 12,4 50,4 Z"
      fill="#050505"
      stroke="url(#shieldBorder)"
      strokeWidth="5"
    />
    {/* Borda interna refinada */}
    <path
      d="M50,9 C83,9 90,26 90,64 C90,92 67,107 50,112 C33,107 10,92 10,64 C10,26 17,9 50,9 Z"
      fill="none"
      stroke="#262626"
      strokeWidth="1.5"
    />
    {/* A Estrela Solitária Branca no Centro */}
    <polygon
      points="50,26 59,49 84,49 64,64 71,88 50,73 29,88 36,64 16,49 41,49"
      fill="#ffffff"
      filter="drop-shadow(0 0 6px rgba(255,255,255,0.7))"
    />
  </svg>
);

// Folha de Cannabis Estilizada (420)
export const CannabisLeaf: React.FC<{ className?: string; size?: number }> = ({ 
  className = "w-6 h-6", 
  size = 24 
}) => (
  <svg 
    viewBox="0 0 100 100" 
    width={size} 
    height={size} 
    className={`inline-block ${className}`}
    fill="currentColor"
  >
    {/* Ponta Superior Central */}
    <path d="M50,8 C53,26 62,38 52,60 C48,60 47,38 50,8 Z" />
    {/* Pontas Laterais Superiores */}
    <path d="M50,42 C68,26 80,38 68,54 C60,54 56,47 50,42 Z" />
    <path d="M50,42 C32,26 20,38 32,54 C40,54 44,47 50,42 Z" />
    {/* Pontas Laterais Centrais */}
    <path d="M50,52 C76,46 88,60 70,70 C60,68 55,59 50,52 Z" />
    <path d="M50,52 C24,46 12,60 30,70 C40,68 45,59 50,52 Z" />
    {/* Pontas Laterais Inferiores */}
    <path d="M50,62 C68,68 76,82 60,86 C53,82 51,70 50,62 Z" />
    <path d="M50,62 C32,68 24,82 40,86 C47,82 49,70 50,62 Z" />
    {/* Caule */}
    <path d="M49,60 L49,94 L51,94 L51,60 Z" />
  </svg>
);
