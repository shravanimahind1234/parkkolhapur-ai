import React from 'react';
import { Cpu, Zap, ArrowRight, Sparkles } from 'lucide-react';
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
    <section className="relative overflow-hidden rounded-2xl bg-[#FFFDF8] p-4 shadow-sm border-2 border-[#C6A15B]/40 text-left">
      {/* Decorative ambient subtle glow */}
      <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-[#C6A15B]/10 blur-xl pointer-events-none" />

      {/* Header Pill & Score */}
      <div className="flex items-start justify-between gap-2 relative z-10 mb-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#7B2638] text-[#FFFDF8] shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C6A15B] animate-pulse" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">
            AI Smart Pick • 94% Match
          </span>
        </div>
        <span className="text-[11px] font-bold text-[#7B2638] bg-[#C6A15B]/15 px-2.5 py-0.5 rounded-full border border-[#C6A15B]/30">
          Score: 9.4/10
        </span>
      </div>

      {/* Realtime Photography Header for AI Smart Pick */}
      {hub.imageUrl && (
        <div className="relative w-full h-32 sm:h-36 rounded-xl overflow-hidden mb-3 bg-[#EFECE4]">
          <img
            src={hub.imageUrl}
            alt={hub.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const el = e.currentTarget;
              if (!el.dataset.tried) {
                el.dataset.tried = 'true';
                el.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80';
              }
            }}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
            <span className="font-extrabold text-[#C6A15B] drop-shadow-sm">{hub.landmark}</span>
            <span className="font-semibold text-white/90 drop-shadow-sm">{hub.distance} • {hub.walkingTimeMin} min walk</span>
          </div>
        </div>
      )}

      {/* Title & Description */}
      <div className="relative z-10">
        <h3 className="text-[18px] font-bold text-[#7B2638] font-serif tracking-tight">
          {hub.name.replace('Smart Lot', '')}
        </h3>
        <p className="text-[12px] text-[#5e5954] mt-0.5 leading-snug">
          Optimal trade-off: 250m walking corridor, lowest price spike index, immediate slot guarantee.
        </p>

        {/* 3-metric summary */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 bg-[#F7F4EE] rounded-xl px-3 py-2 border border-[#EFECE4]">
          <div className="flex flex-col">
            <span className="text-[10px] text-[#5e5954] font-medium">Availability</span>
            <span className="text-[12px] font-bold text-[#26965B]">High ({hub.openBays} Bays)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#5e5954] font-medium">Crowd Lag</span>
            <span className="text-[12px] font-bold text-[#C6A15B]">3 min queue</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-[#5e5954] font-medium">Best Rate</span>
            <span className="text-[12px] font-bold text-[#7B2638]">₹{currentRate} / hr</span>
          </div>
        </div>

        {/* Nearby Real-Time Highlights */}
        {hub.nearbyPlaces && hub.nearbyPlaces.length > 0 && (
          <div className="mt-2.5 flex items-center justify-between text-[11px] bg-[#F7F4EE] px-2.5 py-1.5 rounded-xl border border-[#EFECE4]">
            <span className="font-bold text-[#7B2638] text-[10px] uppercase tracking-wider flex-shrink-0">
              Nearby:
            </span>
            <div className="flex items-center gap-1.5 truncate text-[10px] text-[#5e5954] pl-2">
              <span className="truncate font-semibold text-[#D94B4B]">
                🏥 {hub.nearbyPlaces.find((p) => p.category === 'hospital')?.name.split(' ')[0]} ({hub.nearbyPlaces.find((p) => p.category === 'hospital')?.distance})
              </span>
              <span>•</span>
              <span className="truncate font-semibold text-[#C6A15B]">
                🍽️ {hub.nearbyPlaces.find((p) => p.category === 'food')?.name.split(' ')[0]} ({hub.nearbyPlaces.find((p) => p.category === 'food')?.distance})
              </span>
              <span>•</span>
              <span className="truncate font-semibold text-[#7B2638]">
                🏨 {hub.nearbyPlaces.find((p) => p.category === 'stay')?.name.split(' ')[0]} ({hub.nearbyPlaces.find((p) => p.category === 'stay')?.distance})
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={() => onInstantReserve(hub)}
          className="mt-3 w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[14px] font-bold shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 text-[#C6A15B] fill-current" />
          <span>Instant Reserve Best Match</span>
        </button>
      </div>
    </section>
  );
};