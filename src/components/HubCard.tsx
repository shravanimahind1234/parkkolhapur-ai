import React, { useState } from 'react';
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
  Hospital,
  Utensils,
  Hotel,
  ChevronDown,
  ChevronUp,
  Phone,
  Star,
  MapPin,
  Compass,
  Info,
} from 'lucide-react';
import { ParkingHub, VehicleType, PoiCategory } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { ImageWithLoader } from './ImageWithLoader';

interface HubCardProps {
  hub: ParkingHub;
  vehicleType: VehicleType;
  onSelectSlot: (hub: ParkingHub) => void;
  onDirections: (hub: ParkingHub) => void;
  onViewDetails?: (hub: ParkingHub) => void;
}

export const HubCard: React.FC<HubCardProps> = ({
  hub,
  vehicleType,
  onSelectSlot,
  onDirections,
  onViewDetails,
}) => {
  const { t } = useLanguage();
  const [showNearby, setShowNearby] = useState(false);
  const [selectedPoiFilter, setSelectedPoiFilter] = useState<'all' | 'hospital' | 'food' | 'stay'>('all');

  const currentHourlyRate = hub.hourlyRate[vehicleType];
  const currentDayRate = hub.dayPassRate[vehicleType];
  const isUrgent = hub.openBays <= 5;

  const nearbyList = hub.nearbyPlaces || [];
  const hospitalCount = nearbyList.filter((p) => p.category === 'hospital').length;
  const foodCount = nearbyList.filter((p) => p.category === 'food').length;
  const stayCount = nearbyList.filter((p) => p.category === 'stay').length;

  const filteredPois = nearbyList.filter((p) => {
    if (selectedPoiFilter === 'all') return true;
    return p.category === selectedPoiFilter;
  });

  return (
    <article className="flex flex-col rounded-2xl bg-[#FFFFFF] p-4 shadow-sm border border-[#EFECE4] transition-all hover:border-[#C6A15B]/50 hover:shadow-md text-left overflow-hidden">
      {/* Realtime Location Photography Banner */}
      {hub.imageUrl && (
        <div
          onClick={() => onViewDetails && onViewDetails(hub)}
          className={`relative w-full h-36 sm:h-44 rounded-xl overflow-hidden mb-3.5 bg-[#EFECE4] group/img ${
            onViewDetails ? 'cursor-pointer' : ''
          }`}
        >
          <ImageWithLoader
            src={hub.imageUrl}
            alt={hub.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {/* Elegant Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/85 via-[#292725]/25 to-transparent pointer-events-none" />

          {/* Top Badges Overlaid on Real Photo */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 z-10">
            <span className="px-2.5 py-1 rounded-full bg-[#7B2638] text-[#FFFDF8] text-[10px] font-extrabold uppercase tracking-wider shadow-sm border border-[#C6A15B]/40">
              {hub.landmark}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm flex items-center gap-1.5 border backdrop-blur-xs ${
                isUrgent
                  ? 'bg-[#fdf0f0]/95 text-[#D94B4B] border-[#D94B4B]/30'
                  : 'bg-[#edf8f2]/95 text-[#26965B] border-[#26965B]/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isUrgent ? 'bg-[#D94B4B] animate-ping' : 'bg-[#26965B]'}`} />
              <span>{hub.openBays} Bays Free</span>
            </span>
          </div>

          {/* Bottom Prompt Overlaid on Real Photo */}
          <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between text-white z-10">
            <span className="text-[11px] font-bold text-white/95 flex items-center gap-1 drop-shadow-sm">
              <Navigation className="w-3.5 h-3.5 text-[#C6A15B]" />
              {hub.distance} • {hub.walkingTimeMin} min walk
            </span>
            <span className="text-[10px] font-bold text-[#C6A15B] bg-black/50 px-2.5 py-0.5 rounded-full border border-[#C6A15B]/30 opacity-90 group-hover/img:opacity-100 transition-opacity">
              View Realtime Details ↗
            </span>
          </div>
        </div>
      )}

      {/* Top Details & Pricing */}
      <div className="flex items-start justify-between gap-2">
        <div
          onClick={() => onViewDetails && onViewDetails(hub)}
          className={`flex flex-col min-w-0 ${onViewDetails ? 'cursor-pointer group' : ''}`}
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#C6A15B]/15 text-[#7B2638] tracking-wider">
              {hub.landmark}
            </span>
            {hub.isMunicipalApproved && (
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#edf8f2] text-[#26965B] text-[10px] font-bold border border-[#26965B]/20">
                <ShieldCheck className="w-3 h-3 text-[#26965B]" />
                <span>Municipal</span>
              </span>
            )}
          </div>
          <h4 className="text-[17px] font-bold text-[#7B2638] font-serif truncate mt-1 group-hover:text-[#5e1c2a] transition-colors flex items-center gap-1.5">
            <span>{hub.name}</span>
            {onViewDetails && (
              <span className="text-[10px] font-bold text-[#C6A15B] opacity-0 group-hover:opacity-100 transition-opacity">
                (View Details)
              </span>
            )}
          </h4>
          <span className="text-[12px] text-[#5e5954] flex items-center gap-1 mt-0.5">
            <Navigation className="w-3 h-3 text-[#7B2638]" />
            {hub.distance} • {hub.walkingTimeMin} min walk
          </span>
        </div>

        <div className="flex flex-col items-end flex-shrink-0">
          <div className="flex items-baseline">
            <span className="text-[26px] font-extrabold text-[#7B2638] tracking-tight">
              ₹{currentHourlyRate}
            </span>
            <span className="text-[12px] text-[#5e5954] font-medium">{t.hubCard.perHour}</span>
          </div>
          <span className="text-[10px] text-[#8a847e]">
            ₹{currentDayRate}{t.hubCard.dayPass}
          </span>
        </div>
      </div>

      {/* Real-time Slot Counter Box */}
      <div
        className={`mt-3 p-3 rounded-xl flex items-center justify-between border ${
          isUrgent
            ? 'bg-[#fdf0f0] border-[#D94B4B]/30'
            : 'bg-[#F7F4EE] border-[#EFECE4]'
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 ${
              isUrgent
                ? 'bg-[#D94B4B]/15 text-[#D94B4B]'
                : 'bg-[#edf8f2] text-[#26965B]'
            }`}
          >
            {isUrgent ? (
              <CircleAlert className="w-5 h-5 text-[#D94B4B]" />
            ) : (
              <span>P</span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span
                className={`w-2 h-2 rounded-full ${
                  isUrgent
                    ? 'bg-[#D94B4B] animate-ping'
                    : 'bg-[#26965B] animate-pulse'
                }`}
              />
              <span
                className={`text-[15px] font-extrabold leading-tight ${
                  isUrgent ? 'text-[#D94B4B]' : 'text-[#26965B]'
                }`}
              >
                {isUrgent
                  ? `Only ${hub.openBays} Slots Left!`
                  : `${hub.openBays} ${t.hubCard.freeBays}`}
              </span>
              {!isUrgent && (
                <span className="text-[12px] text-[#5e5954]">
                  / {hub.totalBays} {t.hubCard.capacity}
                </span>
              )}
            </div>
            <span
              className={`text-[11px] truncate mt-0.5 ${
                isUrgent ? 'text-[#D94B4B]' : 'text-[#5e5954]'
              }`}
            >
              {hub.syncTime}
            </span>
          </div>
        </div>

        {/* Feature Icons or Fast Fill Badge */}
        <div className="flex items-center gap-1 text-[#5e5954] flex-shrink-0">
          {isUrgent ? (
            <span className="text-[10px] font-extrabold uppercase bg-[#D94B4B] text-[#FFFDF8] px-2 py-0.5 rounded tracking-wider shadow-xs">
              {t.hubCard.fastFill}
            </span>
          ) : (
            <>
              {hub.hasEvCharger && (
                <span title="EV Fast Charger" className="p-1.5 rounded-lg bg-[#edf8f2] text-[#26965B] border border-[#26965B]/20">
                  <Zap className="w-3.5 h-3.5" />
                </span>
              )}
              {hub.hasCctv && (
                <span title="CCTV 24x7 Surveillance" className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#EFECE4]">
                  <Video className="w-3.5 h-3.5" />
                </span>
              )}
              {hub.hasCoveredShade && (
                <span title="Covered Roofing" className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#EFECE4]">
                  <Warehouse className="w-3.5 h-3.5" />
                </span>
              )}
              {hub.id === 'hub-rankala-chowpatty' && (
                <span title="Handicap Accessible" className="p-1.5 rounded-lg bg-[#FFFFFF] border border-[#EFECE4]">
                  <Accessibility className="w-3.5 h-3.5" />
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
            ? 'bg-[#fef7ec] border-[#E6A23C]/40'
            : hub.aiAdvisory.type === 'urgent'
            ? 'bg-[#fdf0f0] border-[#D94B4B]/30'
            : 'bg-[#edf8f2] border-[#26965B]/30'
        }`}
      >
        <div className="mt-0.5 flex-shrink-0">
          {hub.aiAdvisory.type === 'warning' && (
            <TrendingUp className="w-4 h-4 text-[#E6A23C]" />
          )}
          {hub.aiAdvisory.type === 'urgent' && (
            <Clock className="w-4 h-4 text-[#D94B4B]" />
          )}
          {hub.aiAdvisory.type === 'neutral' && (
            <AlertTriangle className="w-4 h-4 text-[#26965B]" />
          )}
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                hub.aiAdvisory.type === 'urgent'
                  ? 'text-[#D94B4B]'
                  : hub.aiAdvisory.type === 'neutral'
                  ? 'text-[#26965B]'
                  : 'text-[#E6A23C]'
              }`}
            >
              {hub.aiAdvisory.badge}
            </span>
            {hub.aiAdvisory.probability && (
              <span className="text-[10px] font-semibold text-[#5e5954]">
                • {hub.aiAdvisory.probability}
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#292725] mt-0.5 leading-snug">
            {hub.aiAdvisory.message}
          </p>
        </div>
      </div>

      {/* Nearby Real-Time Locations Bar (Hospitals • Food • Stay) */}
      {nearbyList.length > 0 && (
        <div className="mt-2.5 border-t border-[#EFECE4] pt-2">
          <button
            type="button"
            onClick={() => setShowNearby(!showNearby)}
            className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[12px] font-bold text-[#7B2638] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1">
                <Hospital className="w-3.5 h-3.5 text-[#D94B4B]" />
                <Utensils className="w-3.5 h-3.5 text-[#C6A15B]" />
                <Hotel className="w-3.5 h-3.5 text-[#7B2638]" />
              </span>
              <span>{t.hubCard.nearbySpots} ({nearbyList.length})</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-[#5e5954]">
              <span>{showNearby ? 'Hide' : `${t.hubCard.tabHospitals}, ${t.hubCard.tabFood}`}</span>
              {showNearby ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {showNearby && (
            <div className="mt-2 space-y-2 animate-in fade-in duration-200">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[10px]">
                <button
                  type="button"
                  onClick={() => setSelectedPoiFilter('all')}
                  className={`px-2 py-0.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedPoiFilter === 'all'
                      ? 'bg-[#7B2638] text-[#FFFDF8]'
                      : 'bg-[#FFFDF8] text-[#5e5954] border border-[#EFECE4] hover:bg-[#F7F4EE]'
                  }`}
                >
                  {t.hubCard.tabAll} ({nearbyList.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPoiFilter('hospital')}
                  className={`px-2 py-0.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    selectedPoiFilter === 'hospital'
                      ? 'bg-[#D94B4B] text-[#FFFDF8]'
                      : 'bg-[#FFFDF8] text-[#D94B4B] border border-[#D94B4B]/30 hover:bg-[#fdf0f0]'
                  }`}
                >
                  <Hospital className="w-2.5 h-2.5" />
                  <span>{t.hubCard.tabHospitals} ({hospitalCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPoiFilter('food')}
                  className={`px-2 py-0.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    selectedPoiFilter === 'food'
                      ? 'bg-[#C6A15B] text-[#FFFDF8]'
                      : 'bg-[#FFFDF8] text-[#7B2638] border border-[#C6A15B]/30 hover:bg-[#fef7ec]'
                  }`}
                >
                  <Utensils className="w-2.5 h-2.5" />
                  <span>{t.hubCard.tabFood} ({foodCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPoiFilter('stay')}
                  className={`px-2 py-0.5 rounded-lg font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    selectedPoiFilter === 'stay'
                      ? 'bg-[#7B2638] text-[#FFFDF8]'
                      : 'bg-[#FFFDF8] text-[#7B2638] border border-[#7B2638]/30 hover:bg-[#F7F4EE]'
                  }`}
                >
                  <Hotel className="w-2.5 h-2.5" />
                  <span>{t.hubCard.tabStay} ({stayCount})</span>
                </button>
              </div>

              {/* List of Filtered POIs */}
              <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                {filteredPois.map((poi) => (
                  <div
                    key={poi.id}
                    className="p-2 rounded-xl bg-[#FFFDF8] border border-[#EFECE4] hover:border-[#C6A15B]/40 transition-colors flex flex-col gap-1 text-[11px]"
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                            poi.category === 'hospital'
                              ? 'bg-[#fdf0f0] text-[#D94B4B]'
                              : poi.category === 'food'
                              ? 'bg-[#fef7ec] text-[#C6A15B]'
                              : 'bg-[#F7F4EE] text-[#7B2638]'
                          }`}
                        >
                          {poi.category === 'hospital' && <Hospital className="w-3 h-3" />}
                          {poi.category === 'food' && <Utensils className="w-3 h-3" />}
                          {poi.category === 'stay' && <Hotel className="w-3 h-3" />}
                        </span>
                        <div className="min-w-0">
                          <span className="font-extrabold text-[#7B2638] truncate block text-[11px]">
                            {poi.name}
                          </span>
                          {poi.marathiName && (
                            <span className="text-[9px] text-[#8a847e] truncate block">
                              {poi.marathiName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="font-bold text-[#26965B] text-[9px] bg-[#edf8f2] px-1.5 py-0.5 rounded border border-[#26965B]/20">
                          {poi.distance}
                        </span>
                        <span className="text-[9px] text-[#8a847e] mt-0.5">
                          {poi.walkingTimeMin} min walk
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-[#5e5954] leading-snug">
                      {poi.specialtyOrType}
                    </p>

                    <div className="flex items-center justify-between pt-1 border-t border-[#EFECE4]/60 text-[9px] text-[#8a847e]">
                      <div className="flex items-center gap-2">
                        {poi.rating && (
                          <span className="font-bold text-[#C6A15B] flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            {poi.rating}
                          </span>
                        )}
                        {poi.priceLevel && (
                          <span className="font-semibold text-[#292725]">
                            {poi.priceLevel}
                          </span>
                        )}
                      </div>

                      {poi.phone && (
                        <a
                          href={`tel:${poi.phone}`}
                          className="font-bold text-[#7B2638] flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Phone className="w-2.5 h-2.5" />
                          <span>{poi.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action CTAs */}
      <div className="grid grid-cols-5 gap-2 mt-3 pt-1">
        <button
          type="button"
          onClick={() => onDirections(hub)}
          title="Turn-by-turn Navigation"
          aria-label="Get Directions"
          className="col-span-1 h-11 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] flex items-center justify-center transition-colors border border-[#EFECE4] cursor-pointer"
        >
          <Navigation className="w-4 h-4" />
        </button>

        {onViewDetails && (
          <button
            type="button"
            onClick={() => onViewDetails(hub)}
            className="col-span-2 h-11 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#C6A15B]/30 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>{t.hubCard.fullDetailsBtn}</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => onSelectSlot(hub)}
          className={`${onViewDetails ? 'col-span-2' : 'col-span-4'} h-11 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all cursor-pointer`}
        >
          <span>{t.hubCard.bookSlotBtn}</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
        </button>
      </div>
    </article>
  );
};