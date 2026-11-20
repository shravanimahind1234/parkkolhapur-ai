import React from 'react';
import { ParkNExploreLogo } from './ParkNExploreLogo';

interface PageLoaderProps {
  isLoading?: boolean;
  message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading = true,
  message = 'Loading Smart Municipal Transit & Parking...',
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFDF8] via-[#F7F4EE] to-[#EFECE4] transition-all duration-700 ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-98'
      }`}
      aria-label="Loading ParkNExplore"
    >
      {/* Ambient background glow */}
      <div className="absolute w-72 h-72 rounded-full bg-[#C6A15B]/15 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-[#7B2638]/10 blur-3xl pointer-events-none -bottom-10" />

      <div className="relative flex flex-col items-center gap-5 text-center px-4 max-w-sm">
        {/* Pulsing Outer Rings */}
        <div className="relative flex items-center justify-center">
          <div className="absolute w-24 h-24 rounded-2xl bg-[#C6A15B]/20 animate-ping opacity-75" />
          <div className="absolute w-20 h-20 rounded-2xl border-2 border-[#C6A15B]/40 animate-spin duration-1000" />
          
          {/* Logo Emblem */}
          <div className="relative z-10 p-1">
            <ParkNExploreLogo size="xl" variant="emblem" />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col items-center gap-1 mt-2">
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-black text-[#7B2638] font-serif tracking-tight">
              ParkN<span className="text-[#C6A15B]">Explore</span>
            </span>
            <span className="text-[10px] font-extrabold text-[#7B2638] px-2 py-0.5 rounded bg-[#C6A15B]/20 uppercase tracking-wider border border-[#C6A15B]/30">
              KMC
            </span>
          </div>
          <span className="text-[12px] font-medium text-[#5e5954]">
            कोल्हापूर स्मार्ट म्युनिसिपल मोबिलिटी
          </span>
        </div>

        {/* Shimmering Progress Bar */}
        <div className="w-48 h-1.5 bg-[#EFECE4] rounded-full overflow-hidden mt-3 shadow-inner border border-[#C6A15B]/20">
          <div className="h-full bg-gradient-to-r from-[#7B2638] via-[#C6A15B] to-[#7B2638] rounded-full animate-[progress_1.4s_ease-in-out_infinite] w-full" />
        </div>

        {/* Subtitle / status text */}
        <span className="text-[11px] font-semibold text-[#8C2B3E] tracking-wide animate-pulse">
          {message}
        </span>
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
