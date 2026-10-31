import React from 'react';
import { X, Bus, Clock, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { SHUTTLE_INFO } from '../data/mockData';

interface ShuttleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShuttleModal: React.FC<ShuttleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#0b1c30] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header with image */}
        <div className="relative h-40 w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC_Nm2xygXo62B4n4ddq5eF2rgwIhGhPe6iA4lfsqv-lZQl_zJhgDp10FPD6iZXS4NZ-cd1yBaqyDEAlxj1VniYFZ3JWNyw8B93ZI73RjTtVPWsvq9zyTaV2D4pH7k9QI5hD2sjOQqcvJUy2SKcRYsYD0PbatJV6y8NYqUpqmAuTizPf4AWHfEauLLtMT_9KSw6zYuLvJI66LC9AjUS4OvxHyfLD47tPTsP2AZeWUzqsP2MZfw73KDH1Q')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1c30] via-[#0b1c30]/60 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <span className="text-[10px] font-extrabold uppercase bg-[#ffb95f] text-[#472a00] px-2 py-0.5 rounded tracking-wider">
              KMC TEMPLE CORRIDOR
            </span>
            <h3 className="text-[18px] font-bold text-white mt-1 leading-tight">
              {SHUTTLE_INFO.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <p className="text-[13px] text-[#c6c6cd] leading-snug">
            {SHUTTLE_INFO.tagline}. Park your vehicle at any approved smart lot and enjoy instant, priority zero-emission transit to the historic Mahadwar.
          </p>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-xl bg-[#102034] border border-white/5 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#ffb95f]" />
              <div>
                <span className="text-[10px] text-[#c6c6cd] block">Frequency</span>
                <span className="text-[12px] font-bold text-[#d3e4fe]">
                  {SHUTTLE_INFO.frequency}
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-[#102034] border border-white/5 flex items-center gap-2">
              <Bus className="w-4 h-4 text-[#4edea3]" />
              <div>
                <span className="text-[10px] text-[#c6c6cd] block">Fleet Size</span>
                <span className="text-[12px] font-bold text-[#d3e4fe]">
                  {SHUTTLE_INFO.fleet}
                </span>
              </div>
            </div>
          </div>

          {/* Route stops */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider block">
              Dedicated Transit Route
            </span>
            <div className="space-y-2">
              {SHUTTLE_INFO.stops.map((stop, i) => (
                <div
                  key={stop.name}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#102034] border border-white/5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#ffb95f]/20 text-[#ffb95f] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-[13px] font-medium text-[#d3e4fe]">
                      {stop.name}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#4edea3] font-semibold">
                    {stop.walk}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pass status */}
          <div className="p-3 rounded-xl bg-[#001c10] border border-[#4edea3]/30 flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-[#4edea3] flex-shrink-0" />
            <div className="text-[12px]">
              <span className="font-bold text-[#4edea3] block">
                Complimentary Boarding Pass
              </span>
              <span className="text-[#c6c6cd]">
                Show your ParkKolhapur QR ticket to any shuttle pilot for free boarding.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-[#ffb95f] text-[#472a00] font-bold text-[14px] hover:bg-[#ee9800] transition-colors cursor-pointer"
          >
            Got it, Return to Map
          </button>
        </div>
      </div>
    </div>
  );
};
