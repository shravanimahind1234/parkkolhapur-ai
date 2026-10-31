import React from 'react';
import { Cpu, Zap } from 'lucide-react';
import { ParkingHub, VehicleType } from '../types';

interface AiSmartPickProps {
  hub: ParkingHub;
  vehicleType: VehicleType;
  onInstantReserve: (hub: ParkingHub) => void;
}

export const AiSmartPick: React.FC<AiSmartPickProps> = ({
  hub,
  vehicleType,
  onInstantReserve,
}) => {
  const currentRate = hub.hourlyRate[vehicleType];

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1b2b3f] via-[#102034] to-[#1b2b3f] p-4 shadow-xl border border-white/5">
      {/* Decorative ambient glow */}
      <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#ffb95f]/10 blur-2xl pointer-events-none" />

      {/* Header Pill & Score */}
      <div className="flex items-start justify-between gap-2 relative z-10 mb-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#001c10] border border-[#4edea3]/30 shadow-sm">
          <Cpu className="w-3.5 h-3.5 text-[#4edea3] animate-pulse" />
          <span className="text-[10px] font-extrabold text-[#4edea3] uppercase tracking-wider">
            AI Smart Pick • 94% Match
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#c6c6cd] bg-[#26364a] px-2 py-0.5 rounded border border-white/5">
          Score: 9.4/10
        </span>
      </div>

      {/* Title & Description */}
      <div className="relative z-10">
        <h2 className="text-[18px] font-bold text-[#d3e4fe] tracking-tight">
          {hub.name.replace('Smart Lot', '')}
        </h2>
        <p className="text-[12px] text-[#c6c6cd] mt-0.5 leading-snug">
          Optimal trade-off: 250m walking corridor, lowest price spike index, immediate slot guarantee.
        </p>

        {/* 3-metric summary */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 bg-[#000f21]/70 rounded-xl px-3 py-2 border border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#c6c6cd]">Availability</span>
            <span className="text-[12px] font-bold text-[#4edea3]">High (45%)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#c6c6cd]">Crowd Lag</span>
            <span className="text-[12px] font-bold text-[#ffb95f]">3 min queue</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#c6c6cd]">Best Rate</span>
            <span className="text-[12px] font-bold text-[#d3e4fe]">₹{currentRate} / hr</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onInstantReserve(hub)}
          className="mt-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#ffb95f] hover:bg-[#ee9800] text-[#472a00] text-[15px] font-bold shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Instant Reserve Best Match</span>
        </button>
      </div>
    </section>
  );
};
