import React from 'react';
import { Sparkles, Zap, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
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
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3D101C] via-[#4A141F] to-[#22070E] p-5 sm:p-6 shadow-2xl border border-[#C6A15B]/40">
      {/* Decorative ambient gold glow */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#C6A15B]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-10 -top-10 w-44 h-44 rounded-full bg-[#651E2B]/30 blur-3xl pointer-events-none" />

      {/* Header Pill & Score */}
      <div className="flex items-center justify-between gap-2 relative z-10 mb-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A0A0F]/80 border border-[#C6A15B]/50 shadow-sm backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-[11px] font-extrabold text-[#C6A15B] uppercase tracking-wider">
            AI Smart Pick • 96% Match
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          Optimal Flow
        </span>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-royal text-xl sm:text-2xl font-bold text-[#FFF9EF] tracking-tight">
            {hub.name}
          </h2>
          <p className="text-xs text-[#E8DECE] mt-1 flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>{hub.heritageDistance || `${hub.distance} • ${hub.area}`}</span>
          </p>
          <p className="text-xs text-[#B8ADA0] mt-1 max-w-xl leading-relaxed">
            Optimal trade-off: 250m walking corridor, lowest price surge index, and guaranteed immediate slot with complimentary temple e-shuttle pass.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => onInstantReserve(hub)}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Instant Reserve</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3-metric summary */}
      <div className="grid grid-cols-3 gap-3 mt-4 pt-3 bg-[#1A0A0F]/70 rounded-2xl px-4 py-3 border border-white/5 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-[#B8ADA0]">Availability</span>
          <span className="text-sm font-black text-[#10B981]">
            {hub.openBays} Bays Free
          </span>
        </div>
        <div className="flex flex-col border-x border-white/10 px-2 sm:px-4">
          <span className="text-[10px] uppercase font-bold text-[#B8ADA0]">Temple Corridor</span>
          <span className="text-sm font-black text-[#C6A15B]">
            {hub.walkingTimeMin} min walk
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold text-[#B8ADA0]">Rate ({vehicleType.toUpperCase()})</span>
          <span className="text-sm font-black text-[#FFF9EF]">
            ₹{currentRate} / hr
          </span>
        </div>
      </div>
    </section>
  );
};
