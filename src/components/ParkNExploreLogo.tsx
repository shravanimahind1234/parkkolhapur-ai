import React from 'react';

interface ParkNExploreLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'emblem' | 'full' | 'compact';
  subtitle?: string;
  showKmcBadge?: boolean;
}

export const ParkNExploreLogo: React.FC<ParkNExploreLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  subtitle,
  showKmcBadge = true,
}) => {
  // Dimension presets for the emblem icon
  const iconSizes = {
    sm: { box: 'w-8 h-8', svg: 32 },
    md: { box: 'w-10 h-10', svg: 40 },
    lg: { box: 'w-12 h-12', svg: 48 },
    xl: { box: 'w-16 h-16', svg: 64 },
  };

  const textSizes = {
    sm: { main: 'text-[15px]', sub: 'text-[10px]' },
    md: { main: 'text-[18px]', sub: 'text-[11px]' },
    lg: { main: 'text-[22px]', sub: 'text-[12px]' },
    xl: { main: 'text-[28px]', sub: 'text-[14px]' },
  };

  const { box } = iconSizes[size];
  const { main, sub } = textSizes[size];

  // The core vector emblem SVG
  const Emblem = (
    <div
      className={`relative ${box} rounded-xl shadow-md border border-[#C6A15B]/35 flex-shrink-0 group-hover:scale-105 transition-all duration-300 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#8C2B3E] via-[#7B2638] to-[#4F131F]`}
      style={{
        boxShadow: '0 4px 14px -2px rgba(123, 38, 56, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
      }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1.5"
      >
        <defs>
          {/* Royal Gold Gradient */}
          <linearGradient id="pneGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="35%" stopColor="#E5C171" />
            <stop offset="70%" stopColor="#C6A15B" />
            <stop offset="100%" stopColor="#8A6726" />
          </linearGradient>

          {/* Soft Gold Glow Gradient */}
          <radialGradient id="compassGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#E5C171" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C6A15B" stopOpacity="0" />
          </radialGradient>

          {/* Road / Transit Route Gradient */}
          <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C6A15B" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#E5C171" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFDF8" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Subtle geometric background grid/rings */}
        <circle cx="50" cy="50" r="42" stroke="url(#pneGold)" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.3" />
        <circle cx="58" cy="38" r="22" stroke="url(#pneGold)" strokeWidth="0.75" opacity="0.25" />

        {/* Dynamic Road / Mobility Ribbon ascending into the destination */}
        <path
          d="M 20 82 C 28 82, 38 78, 48 70 C 60 60, 72 58, 82 62"
          stroke="url(#routeGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Road lane dashes */}
        <path
          d="M 23 82 C 30 82, 39 78, 48 70 C 58 61, 70 59, 79 62"
          stroke="#4F131F"
          strokeWidth="1"
          strokeDasharray="2 3"
          strokeLinecap="round"
        />

        {/* The Sculpted "P" Stem */}
        <path
          d="M 26 22 C 26 19.8 27.8 18 30 18 H 36 C 38.2 18 40 19.8 40 22 V 76 C 40 78.2 38.2 80 36 80 H 30 C 27.8 80 26 78.2 26 76 Z"
          fill="url(#pneGold)"
        />
        {/* Inner shadow/bevel highlight on stem */}
        <path
          d="M 29 20 H 33 V 78 H 29 Z"
          fill="#FFFDF8"
          opacity="0.25"
        />

        {/* The "P" Loop forming a Pin/Sanctum Arch */}
        <path
          d="M 38 18 C 54 18, 76 22, 76 40 C 76 56, 56 60, 38 60 Z"
          fill="url(#pneGold)"
        />
        {/* Inner cutout of the P forming a Location Pin Frame */}
        <path
          d="M 39 28 C 48 28, 62 30, 62 40 C 62 48, 50 50, 39 50 Z"
          fill="#7B2638"
        />

        {/* The Exploration Compass / Destination Star centered inside the Pin */}
        <g transform="translate(50, 39)">
          {/* Radial ambient glow */}
          <circle cx="0" cy="0" r="14" fill="url(#compassGlow)" />

          {/* North-South-East-West 4-point Diamond Star */}
          {/* North Ray */}
          <polygon points="0,-13 2.5,-3 0,0 -2.5,-3" fill="#FFF4D6" />
          {/* South Ray */}
          <polygon points="0,13 2.5,3 0,0 -2.5,3" fill="#E5C171" />
          {/* East Ray */}
          <polygon points="13,0 3,2.5 0,0 3,-2.5" fill="#FFF4D6" />
          {/* West Ray */}
          <polygon points="-13,0 -3,2.5 0,0 -3,-2.5" fill="#E5C171" />

          {/* Secondary 45-degree diamond micro rays */}
          <polygon points="6.5,-6.5 1.5,-1.5 0,0 1.5,-1.5" fill="#C6A15B" opacity="0.8" />
          <polygon points="-6.5,6.5 -1.5,1.5 0,0 -1.5,1.5" fill="#C6A15B" opacity="0.8" />
          <polygon points="6.5,6.5 1.5,1.5 0,0 1.5,1.5" fill="#C6A15B" opacity="0.8" />
          <polygon points="-6.5,-6.5 -1.5,-1.5 0,0 -1.5,-1.5" fill="#C6A15B" opacity="0.8" />

          {/* Star Core Jewel */}
          <circle cx="0" cy="0" r="2.2" fill="#7B2638" />
          <circle cx="0" cy="0" r="1.2" fill="#FFFDF8" />
        </g>

        {/* Heritage Crown / Swargamandapa Dome Crest at the very top of the P */}
        <path
          d="M 33 13 C 33 13, 40 10, 47 13 C 44 15, 36 15, 33 13 Z"
          fill="#FFF4D6"
          opacity="0.9"
        />
      </svg>
    </div>
  );

  if (variant === 'emblem') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {Emblem}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {Emblem}

      <div className="flex flex-col min-w-0 text-left">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`font-black ${main} text-[#7B2638] font-serif tracking-tight leading-none flex items-center`}
          >
            ParkN<span className="text-[#C6A15B] ml-0.5">Explore</span>
          </span>

          {showKmcBadge && (
            <span className="text-[9px] font-extrabold text-[#7B2638] px-1.5 py-0.5 rounded bg-[#C6A15B]/20 uppercase tracking-wider border border-[#C6A15B]/30 leading-none">
              KMC
            </span>
          )}
        </div>

        {subtitle && (
          <span className={`${sub} text-[#5e5954] leading-tight mt-0.5 font-medium truncate max-w-[210px] sm:max-w-none`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
