import React from 'react';
import {
  ShieldCheck,
  Navigation,
  ArrowRight,
  Zap,
  Video,
  Warehouse,
  TrendingUp,
  AlertTriangle,
  Clock,
  CircleAlert,
  Accessibility,
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
  const currentHourlyRate = hub.hourlyRate[vehicleType];
  const currentDayRate = hub.dayPassRate[vehicleType];
  const isUrgent = hub.openBays <= 5;

  return (
    <article className="flex flex-col rounded-2xl bg-[#102034] p-4 shadow-lg border border-white/5 transition-all hover:border-white/10">
      {/* Top Details & Pricing */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col min-w-0">
          <h4 className="text-[17px] font-bold text-[#d3e4fe] truncate tracking-tight">
            {hub.name}
          </h4>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {hub.isMunicipalApproved && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#0f172a] text-[#ffb95f] text-[11px] font-semibold border border-[#ffb95f]/20">
                <ShieldCheck className="w-3 h-3 text-[#ffb95f]" />
                <span>Municipal Approved</span>
              </span>
            )}
            <span className="text-[12px] text-[#c6c6cd] flex items-center gap-1">
              <Navigation className="w-3 h-3 text-[#38bdf8]" />
              {hub.distance}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end flex-shrink-0">
          <div className="flex items-baseline">
            <span className="text-[26px] font-extrabold text-[#ffb95f] tracking-tight">
              ₹{currentHourlyRate}
            </span>
            <span className="text-[12px] text-[#c6c6cd] font-medium">/hr</span>
          </div>
          <span className="text-[10px] text-[#c6c6cd]">
            ₹{currentDayRate}/day pass
          </span>
        </div>
      </div>

      {/* Real-time Slot Counter Box */}
      <div
        className={`mt-3 p-3 rounded-xl flex items-center justify-between border ${
          isUrgent
            ? 'bg-[#93000a]/20 border-[#ffb4ab]/30'
            : 'bg-[#0b1c30] border-white/5'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg flex-shrink-0 ${
              isUrgent
                ? 'bg-[#93000a]/40 text-[#ffb4ab]'
                : 'bg-[#26364a] text-[#4edea3]'
            }`}
          >
            {isUrgent ? (
              <CircleAlert className="w-5 h-5 text-[#ffb4ab]" />
            ) : (
              <span>P</span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`w-2 h-2 rounded-full ${
                  isUrgent
                    ? 'bg-[#ffb4ab] animate-ping'
                    : 'bg-[#4edea3] animate-pulse'
                }`}
              />
              <span
                className={`text-[15px] font-bold leading-tight ${
                  isUrgent ? 'text-[#ffb4ab]' : 'text-[#4edea3]'
                }`}
              >
                {isUrgent
                  ? `Only ${hub.openBays} Slots Left!`
                  : `${hub.openBays} Bays Open`}
              </span>
              {!isUrgent && (
                <span className="text-[12px] text-[#c6c6cd]">
                  / {hub.totalBays} Total
                </span>
              )}
            </div>
            <span
              className={`text-[11px] truncate mt-0.5 ${
                isUrgent ? 'text-[#c6c6cd]' : 'text-[#8a9bb5]'
              }`}
            >
              {hub.syncTime}
            </span>
          </div>
        </div>

        {/* Feature Icons or Fast Fill Badge */}
        <div className="flex items-center gap-1.5 text-[#c6c6cd] flex-shrink-0">
          {isUrgent ? (
            <span className="text-[10px] font-extrabold uppercase bg-[#ffb4ab]/20 text-[#ffb4ab] px-2 py-1 rounded border border-[#ffb4ab]/30 tracking-wider">
              FAST FILL
            </span>
          ) : (
            <>
              {hub.hasEvCharger && (
                <span title="EV Fast Charger" className="p-1 rounded bg-white/5">
                  <Zap className="w-4 h-4 text-[#4edea3]" />
                </span>
              )}
              {hub.hasCctv && (
                <span title="CCTV 24x7 Surveillance" className="p-1 rounded bg-white/5">
                  <Video className="w-4 h-4 text-[#c6c6cd]" />
                </span>
              )}
              {hub.hasCoveredShade && (
                <span title="Covered Roofing" className="p-1 rounded bg-white/5">
                  <Warehouse className="w-4 h-4 text-[#c6c6cd]" />
                </span>
              )}
              {hub.id === 'hub-rankala-chowpatty' && (
                <span title="Handicap Accessible" className="p-1 rounded bg-white/5">
                  <Accessibility className="w-4 h-4 text-[#c6c6cd]" />
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {/* AI Advisory Box */}
      <div
        className={`mt-2.5 p-2.5 rounded-xl flex items-start gap-2.5 border ${
          hub.aiAdvisory.type === 'warning'
            ? 'bg-[#ee9800]/10 border-[#ee9800]/30'
            : hub.aiAdvisory.type === 'urgent'
            ? 'bg-[#0b1c30] border-[#ffb4ab]/20'
            : 'bg-[#001c10]/40 border-[#4edea3]/20'
        }`}
      >
        <div className="mt-0.5 flex-shrink-0">
          {hub.aiAdvisory.type === 'warning' && (
            <TrendingUp className="w-4 h-4 text-[#ffb95f]" />
          )}
          {hub.aiAdvisory.type === 'urgent' && (
            <Clock className="w-4 h-4 text-[#ffb95f]" />
          )}
          {hub.aiAdvisory.type === 'neutral' && (
            <AlertTriangle className="w-4 h-4 text-[#4edea3]" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                hub.aiAdvisory.type === 'neutral'
                  ? 'text-[#4edea3]'
                  : 'text-[#ffb95f]'
              }`}
            >
              {hub.aiAdvisory.badge}
            </span>
            {hub.aiAdvisory.probability && (
              <span
                className={`text-[10px] font-semibold ${
                  hub.aiAdvisory.type === 'urgent'
                    ? 'text-[#ffb4ab]'
                    : hub.aiAdvisory.type === 'neutral'
                    ? 'text-[#4edea3]'
                    : 'text-[#ffb95f]'
                }`}
              >
                • {hub.aiAdvisory.probability}
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#d3e4fe] mt-0.5 leading-snug">
            {hub.aiAdvisory.message}
          </p>
        </div>
      </div>

      {/* Action CTAs */}
      <div className="grid grid-cols-4 gap-2 mt-3 pt-1">
        <button
          type="button"
          onClick={() => onDirections(hub)}
          aria-label="Get Directions"
          className="col-span-1 h-12 rounded-xl bg-[#1b2b3f] hover:bg-[#26364a] text-[#d3e4fe] flex items-center justify-center transition-colors border border-white/5 cursor-pointer"
        >
          <Navigation className="w-5 h-5 text-[#ffb95f]" />
        </button>
        <button
          type="button"
          onClick={() => onSelectSlot(hub)}
          className="col-span-3 h-12 rounded-xl bg-[#ffb95f] hover:bg-[#ee9800] text-[#472a00] text-[15px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Select Slot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
};
