import React from 'react';
import {
  MapPin,
  Clock,
  Zap,
  ShieldCheck,
  Video,
  Umbrella,
  ArrowRight,
  Navigation,
  AlertTriangle,
  Info,
  CheckCircle,
} from 'lucide-react';
import { ParkingHub, VehicleType } from '../types';

interface HubCardProps {
  hub: ParkingHub;
  vehicleType: VehicleType;
  onSelectSlot: (hub: ParkingHub) => void;
  onDirections: (hub: ParkingHub) => void;
}

export const HubCard: React.FC<HubCardProps> = ({
  hub,
  vehicleType,
  onSelectSlot,
  onDirections,
}) => {
  const hourlyRate = hub.hourlyRate[vehicleType];
  const dayPassRate = hub.dayPassRate[vehicleType];
  const occupancyPercentage = Math.round(((hub.totalBays - hub.openBays) / hub.totalBays) * 100);

  // Status Color Logic: Green = Available, Amber = Reserved/Filling, Red = Full
  const isFull = hub.openBays === 0;
  const isUrgent = hub.openBays <= 5 && !isFull;
  
  const statusBadgeColor = isFull
    ? 'bg-[#EF4444] text-white border-[#EF4444]'
    : isUrgent
    ? 'bg-[#F59E0B] text-[#1A0A0F] border-[#F59E0B]'
    : 'bg-[#10B981] text-white border-[#10B981]';

  const progressColor = isFull
    ? 'bg-[#EF4444]'
    : isUrgent
    ? 'bg-[#F59E0B]'
    : 'bg-[#10B981]';

  return (
    <div className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#3D101C]/80 via-[#260B12]/90 to-[#1A0A0F] border border-[#C6A15B]/30 shadow-xl hover:border-[#C6A15B] transition-all duration-300 flex flex-col">
      
      {/* Top Media & Header Banner */}
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={hub.imageUrl || 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80'}
          alt={hub.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#260B12] via-black/40 to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#1A0A0F]/90 text-[#C6A15B] border border-[#C6A15B]/40 backdrop-blur-md">
            {hub.landmark}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-md flex items-center gap-1.5 backdrop-blur-md ${statusBadgeColor}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            {isFull ? 'Lot Full' : `${hub.openBays} Bays Free`}
          </span>
        </div>

        {/* Bottom overlay in image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="font-royal text-lg sm:text-xl font-bold text-[#FFF9EF] drop-shadow-md">
              {hub.name}
            </h3>
            <p className="text-xs text-[#E8DECE] flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{hub.area}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-5 flex flex-col gap-3.5 flex-1 justify-between">
        
        {/* Occupancy Bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-[#B8ADA0] font-medium">Real-Time Occupancy</span>
            <span className="text-[#FFF9EF] font-bold">
              {occupancyPercentage}% Full ({hub.totalBays - hub.openBays}/{hub.totalBays} Bays)
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-[#1A0A0F] overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>
        </div>

        {/* Corridor Distance & Rates Grid */}
        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-2xl bg-[#1A0A0F]/80 border border-white/5 text-center">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#B8ADA0]">Corridor Walk</span>
            <span className="text-xs font-black text-[#C6A15B] mt-0.5">
              {hub.walkingTimeMin} min ({hub.distance})
            </span>
          </div>

          <div className="flex flex-col border-x border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#B8ADA0]">Hourly Rate</span>
            <span className="text-xs font-black text-[#FFF9EF] mt-0.5">
              ₹{hourlyRate} / hr
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-[#B8ADA0]">Day Pass</span>
            <span className="text-xs font-black text-[#10B981] mt-0.5">
              ₹{dayPassRate} / day
            </span>
          </div>
        </div>

        {/* Amenities Icons */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
          {hub.hasEvCharger && (
            <span className="px-2.5 py-1 rounded-xl bg-[#10B981]/15 text-[#10B981] font-bold border border-[#10B981]/30 flex items-center gap-1">
              <Zap className="w-3 h-3" /> EV Fast Charger
            </span>
          )}
          {hub.hasCoveredShade && (
            <span className="px-2.5 py-1 rounded-xl bg-[#C6A15B]/15 text-[#C6A15B] font-bold border border-[#C6A15B]/30 flex items-center gap-1">
              <Umbrella className="w-3 h-3" /> Covered Shade
            </span>
          )}
          {hub.hasCctv && (
            <span className="px-2.5 py-1 rounded-xl bg-white/5 text-[#E8DECE] font-bold border border-white/10 flex items-center gap-1">
              <Video className="w-3 h-3" /> 24/7 CCTV
            </span>
          )}
          {hub.isMunicipalApproved && (
            <span className="px-2.5 py-1 rounded-xl bg-[#651E2B]/50 text-[#FFF9EF] font-bold border border-[#C6A15B]/20 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#C6A15B]" /> KMC Municipal
            </span>
          )}
        </div>

        {/* AI Advisory Note */}
        {hub.aiAdvisory && (
          <div
            className={`p-2.5 rounded-xl border flex items-start gap-2 text-xs ${
              hub.aiAdvisory.type === 'urgent'
                ? 'bg-[#EF4444]/15 border-[#EF4444]/40 text-[#EF4444]'
                : hub.aiAdvisory.type === 'warning'
                ? 'bg-[#F59E0B]/15 border-[#F59E0B]/40 text-[#F59E0B]'
                : 'bg-[#C6A15B]/15 border-[#C6A15B]/30 text-[#C6A15B]'
            }`}
          >
            {hub.aiAdvisory.type === 'urgent' ? (
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : hub.aiAdvisory.type === 'warning' ? (
              <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            )}
            <div className="leading-tight">
              <span className="font-bold mr-1">[{hub.aiAdvisory.badge}]</span>
              <span className="text-[#E8DECE]">{hub.aiAdvisory.message}</span>
            </div>
          </div>
        )}

        {/* Card Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectSlot(hub)}
            disabled={isFull}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              isFull
                ? 'bg-[#292725] text-[#B8ADA0] cursor-not-allowed'
                : 'gold-gradient-bg text-[#22070E] hover:brightness-105 active:scale-95'
            }`}
          >
            <span>{isFull ? 'Bay Full' : 'Select Bay Slot'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onDirections(hub)}
            title="Directions"
            className="p-3 rounded-xl bg-[#651E2B] hover:bg-[#7E2837] text-[#FFF9EF] border border-[#C6A15B]/30 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-[#C6A15B]" />
          </button>
        </div>

      </div>
    </div>
  );
};
