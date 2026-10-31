import React from 'react';
import { Bus, ArrowUpRight } from 'lucide-react';

interface ShuttleTeaserProps {
  onOpenShuttleDetails: () => void;
}

export const ShuttleTeaser: React.FC<ShuttleTeaserProps> = ({
  onOpenShuttleDetails,
}) => {
  return (
    <section
      onClick={onOpenShuttleDetails}
      className="rounded-2xl bg-[#0b1c30] p-4 flex items-center gap-3.5 shadow-md border border-white/5 overflow-hidden relative cursor-pointer hover:border-[#ffb95f]/40 transition-all group"
    >
      <div
        className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0 shadow-inner border border-white/10"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_Nm2xygXo62B4n4ddq5eF2rgwIhGhPe6iA4lfsqv-lZQl_zJhgDp10FPD6iZXS4NZ-cd1yBaqyDEAlxj1VniYFZ3JWNyw8B93ZI73RjTtVPWsvq9zyTaV2D4pH7k9QI5hD2sjOQqcvJUy2SKcRYsYD0PbatJV6y8NYqUpqmAuTizPf4AWHfEauLLtMT_9KSw6zYuLvJI66LC9AjUS4OvxHyfLD47tPTsP2AZeWUzqsP2MZfw73KDH1Q')`,
        }}
      />
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-[#ffb95f] uppercase tracking-wider flex items-center gap-1">
            <Bus className="w-3 h-3 text-[#ffb95f]" />
            Temple Corridor Transit
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#c6c6cd] group-hover:text-[#ffb95f] transition-colors" />
        </div>
        <h4 className="text-[15px] font-bold text-[#d3e4fe] truncate mt-0.5">
          Special Ambabai Darshan Shuttles
        </h4>
        <p className="text-[12px] text-[#c6c6cd] line-clamp-2 mt-0.5 leading-snug">
          Park at South Gate and hop on free battery e-rickshaws directly to the temple Mahadwar.
        </p>
      </div>
    </section>
  );
};
