import React from 'react';
import { X, Bus, Clock, MapPin, CheckCircle2, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { SHUTTLE_INFO } from '../data/mockData';

interface ShuttleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShuttleModal: React.FC<ShuttleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border border-[#C6A15B]/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#FFF9EF]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-[#22070E]">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF]">
                {SHUTTLE_INFO.name}
              </h3>
              <p className="text-xs text-[#C6A15B]">
                Complimentary Eco-Transit for ParkKolhapur Ticket Holders
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-[#FFF9EF] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          
          {/* Banner */}
          <div className="p-4 rounded-2xl bg-[#651E2B]/50 border border-[#C6A15B]/30 space-y-1">
            <span className="text-[10px] uppercase font-black gold-gradient-bg text-[#22070E] px-2 py-0.5 rounded shadow">
              Zero Fare Temple Corridor
            </span>
            <h4 className="font-royal text-base font-bold text-[#FFF9EF] pt-1">
              Shree Ambabai Darshan E-Rickshaw Fleet
            </h4>
            <p className="text-[11px] text-[#E8DECE] leading-relaxed">
              Show any valid ParkKolhapur parking pass on your phone to board freely at South Gate or Bhavani Mandap. Dedicated green corridor for senior citizens, families, and pilgrims.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#1A0A0F] border border-white/5">
              <span className="text-[10px] uppercase font-bold text-[#B8ADA0] block">Departure Frequency</span>
              <span className="text-xs font-black text-[#10B981] mt-0.5 block">{SHUTTLE_INFO.frequency}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#1A0A0F] border border-white/5">
              <span className="text-[10px] uppercase font-bold text-[#B8ADA0] block">Fleet Size</span>
              <span className="text-xs font-black text-[#C6A15B] mt-0.5 block">{SHUTTLE_INFO.fleet}</span>
            </div>
          </div>

          {/* Transit Stops Route Timeline */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#C6A15B] block">
              Corridor Stops & Boarding Points
            </span>

            <div className="space-y-2.5">
              {SHUTTLE_INFO.stops.map((stop, idx) => (
                <div key={stop.name} className="p-3 rounded-2xl bg-[#1A0A0F] border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gold-gradient-bg text-[#22070E] font-black text-xs flex items-center justify-center flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <span className="font-bold text-[#FFF9EF] block">{stop.name}</span>
                      <span className="text-[10px] text-[#B8ADA0]">Boarding shelter with seating</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#C6A15B] block">{stop.walk}</span>
                    <span className="text-[10px] text-[#B8ADA0]">{stop.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operating Hours */}
          <div className="p-3.5 rounded-2xl bg-[#1A0A0F] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C6A15B]" />
              <span className="font-bold text-[#FFF9EF]">Daily Operating Hours</span>
            </div>
            <span className="font-bold text-[#C6A15B]">{SHUTTLE_INFO.timings}</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#22070E] border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-[#B8ADA0]">
            KMC Green Mobility Initiative
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
