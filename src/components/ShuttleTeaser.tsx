import React from 'react';
import { Bus, ArrowRight, Sparkles } from 'lucide-react';

interface ShuttleTeaserProps {
  onOpenShuttleDetails: () => void;
}

export const ShuttleTeaser: React.FC<ShuttleTeaserProps> = ({
  onOpenShuttleDetails,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3D101C] via-[#651E2B] to-[#3D101C] p-5 sm:p-6 shadow-xl border border-[#C6A15B]/35">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-[#22070E] flex-shrink-0 shadow-md">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase gold-gradient-bg text-[#22070E] px-2 py-0.5 rounded shadow-sm">
                FREE AMBABAI CORRIDOR
              </span>
              <span className="text-xs text-[#10B981] font-bold">Every 4-6 Mins</span>
            </div>
            <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF] mt-1">
              Shree Ambabai Darshan E-Rickshaw Shuttle
            </h3>
            <p className="text-xs text-[#E8DECE] mt-0.5 max-w-md">
              Complimentary battery transit from South Gate & Bhavani Mandap lots directly to the Temple Mahadwar gate.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenShuttleDetails}
          className="px-4 py-2.5 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap self-start sm:self-auto"
        >
          <span>View Schedule</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
