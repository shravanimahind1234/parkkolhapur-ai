import React, { useState } from 'react';
import {
  X,
  MapPin,
  Navigation,
  Car,
  Bike,
  Zap,
  Sparkles,
  Compass,
  CheckCircle2,
  ChevronRight,
  Bus,
} from 'lucide-react';
import { ParkingHub, VehicleType } from '../types';

interface InteractiveMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  hubs: ParkingHub[];
  onSelectHubForSlot: (hub: ParkingHub) => void;
  onSelectHubForDirections: (hub: ParkingHub) => void;
  selectedVehicle: VehicleType;
}

export const InteractiveMapModal: React.FC<InteractiveMapModalProps> = ({
  isOpen,
  onClose,
  hubs,
  onSelectHubForSlot,
  onSelectHubForDirections,
  selectedVehicle,
}) => {
  const [activeHubId, setActiveHubId] = useState<string>('hub-mahalaxmi-south');
  const [filterType, setFilterType] = useState<VehicleType>(selectedVehicle);

  if (!isOpen) return null;

  const activeHub = hubs.find((h) => h.id === activeHubId) || hubs[0];

  // Visual layout coordinates for schematic Kolhapur Map
  const mapCoordinates: Record<string, { x: number; y: number; label: string }> = {
    'hub-new-palace-royal': { x: 50, y: 18, label: 'New Palace Grounds' },
    'hub-mahalaxmi-south': { x: 42, y: 52, label: 'Mahalaxmi South Gate' },
    'hub-bhavani-mandap': { x: 55, y: 48, label: 'Bhavani Mandap' },
    'hub-rankala-chowpatty': { x: 22, y: 65, label: 'Rankala Lake Promenade' },
    'hub-cbs-transit': { x: 75, y: 40, label: 'CBS Bus Stand Hub' },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-4xl bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border border-[#C6A15B]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] text-[#FFF9EF]">
        
        {/* Top Bar */}
        <div className="p-4 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl gold-gradient-bg flex items-center justify-center text-[#22070E]">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF] leading-tight">
                Kolhapur Heritage City Parking Map
              </h3>
              <p className="text-xs text-[#C6A15B]">
                Interactive Real-Time Sensor Telemetry & Bay Locator
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Filter Pills */}
            <div className="hidden sm:flex items-center gap-1 bg-[#1A0A0F] p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setFilterType('car')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'car' ? 'bg-[#651E2B] text-[#FFF9EF]' : 'text-[#B8ADA0]'
                }`}
              >
                Car
              </button>
              <button
                type="button"
                onClick={() => setFilterType('bike')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'bike' ? 'bg-[#651E2B] text-[#FFF9EF]' : 'text-[#B8ADA0]'
                }`}
              >
                Bike
              </button>
              <button
                type="button"
                onClick={() => setFilterType('ev')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterType === 'ev' ? 'bg-[#651E2B] text-[#FFF9EF]' : 'text-[#B8ADA0]'
                }`}
              >
                EV
              </button>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-[#FFF9EF] flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Map Canvas + Details Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Interactive Visual Map (7 Cols) */}
          <div className="md:col-span-7 relative bg-[#130509] p-4 flex flex-col justify-center items-center min-h-[340px] sm:min-h-[440px] border-b md:border-b-0 md:border-r border-white/10 overflow-hidden">
            
            {/* Watermark / Map Schematic Background */}
            <svg
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Panchganga River outline */}
              <path
                d="M 10 10 Q 30 25, 45 15 T 90 20"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
              <text x="60" y="16" fill="#38bdf8" fontSize="2.5" fontFamily="sans-serif">
                Panchganga River
              </text>

              {/* Rankala Lake circle representation */}
              <circle cx="22" cy="65" r="9" fill="#0284c7" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="0.8" />
              <text x="14" y="66" fill="#38bdf8" fontSize="2.8" fontWeight="bold">
                Rankala Lake
              </text>

              {/* Arterial Roads */}
              <path d="M 50 18 L 42 52" stroke="#651E2B" strokeWidth="1" strokeOpacity="0.6" />
              <path d="M 42 52 L 55 48" stroke="#651E2B" strokeWidth="1.2" strokeOpacity="0.6" />
              <path d="M 42 52 L 22 65" stroke="#651E2B" strokeWidth="1" strokeOpacity="0.6" />
              <path d="M 55 48 L 75 40" stroke="#651E2B" strokeWidth="1.2" strokeOpacity="0.6" />
            </svg>

            {/* City Landmarks Annotations */}
            <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-[#1A0A0F]/80 text-[10px] text-[#C6A15B] font-bold border border-white/5">
              Live Edge Network • Kolhapur Core Area
            </div>

            {/* Interactive Pins */}
            {hubs.map((hub) => {
              const coords = mapCoordinates[hub.id] || { x: 50, y: 50, label: hub.name };
              const isSelected = hub.id === activeHubId;
              const hasAvailable = hub.openBays > 0;
              const isUrgent = hub.openBays <= 5;

              return (
                <div
                  key={hub.id}
                  style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
                  onClick={() => setActiveHubId(hub.id)}
                >
                  <div className="relative group flex flex-col items-center">
                    
                    {/* Pulsing ring for selected pin */}
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-[#C6A15B]/30 animate-ping pointer-events-none" />
                    )}

                    {/* Pin button */}
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold shadow-xl border-2 transition-transform duration-200 ${
                        isSelected
                          ? 'bg-[#C6A15B] text-[#22070E] border-[#FFF9EF] scale-110'
                          : isUrgent
                          ? 'bg-[#F59E0B] text-white border-white/40'
                          : hasAvailable
                          ? 'bg-[#10B981] text-white border-white/40'
                          : 'bg-[#EF4444] text-white border-white/40'
                      }`}
                    >
                      <span className="text-xs font-black">{hub.openBays}</span>
                    </div>

                    {/* Pin label pill */}
                    <span
                      className={`mt-1 px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md border ${
                        isSelected
                          ? 'bg-[#651E2B] text-[#FFF9EF] border-[#C6A15B]'
                          : 'bg-[#1A0A0F]/90 text-[#E8DECE] border-white/10'
                      }`}
                    >
                      {coords.label}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Legend bottom strip */}
            <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-around bg-[#1A0A0F]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                <span>Available ({'>'}5 Bays)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                <span>Filling Fast (≤5 Bays)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <span>Full / Reserved</span>
              </div>
            </div>

          </div>

          {/* Selected Hub Details Panel (5 Cols) */}
          <div className="md:col-span-5 p-5 bg-[#22070E] flex flex-col justify-between overflow-y-auto">
            {activeHub ? (
              <div className="space-y-4">
                {/* Photo & Badge */}
                <div className="relative h-36 rounded-2xl overflow-hidden border border-[#C6A15B]/30">
                  <img
                    src={activeHub.imageUrl || 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80'}
                    alt={activeHub.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#22070E] via-transparent to-black/20" />
                  <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-extrabold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {activeHub.openBays} Bays Live Available
                  </span>
                </div>

                {/* Hub Meta */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#C6A15B] font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeHub.area}</span>
                  </div>
                  <h4 className="font-royal text-lg font-bold text-[#FFF9EF] mt-0.5">
                    {activeHub.name}
                  </h4>
                  <p className="text-xs text-[#B8ADA0] mt-1 leading-relaxed">
                    {activeHub.description}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#1A0A0F] border border-white/5">
                    <span className="text-[10px] text-[#B8ADA0] block">Walking to Landmark</span>
                    <span className="text-xs font-bold text-[#FFF9EF]">
                      {activeHub.walkingTimeMin} min ({activeHub.distance})
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#1A0A0F] border border-white/5">
                    <span className="text-[10px] text-[#B8ADA0] block">Current Rate ({filterType.toUpperCase()})</span>
                    <span className="text-xs font-bold text-[#C6A15B]">
                      ₹{activeHub.hourlyRate[filterType]} / hr
                    </span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {activeHub.hasEvCharger && (
                    <span className="px-2 py-0.5 rounded-md bg-[#10B981]/15 text-[#10B981] text-[10px] font-bold border border-[#10B981]/30 flex items-center gap-1">
                      <Zap className="w-3 h-3" /> EV Fast Charger
                    </span>
                  )}
                  {activeHub.hasCoveredShade && (
                    <span className="px-2 py-0.5 rounded-md bg-[#C6A15B]/15 text-[#C6A15B] text-[10px] font-bold border border-[#C6A15B]/30">
                      Covered Shade
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-md bg-white/5 text-[#E8DECE] text-[10px] font-bold">
                    CCTV 24/7
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectHubForSlot(activeHub);
                    }}
                    className="w-full py-3 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Reserve Bay at this Hub</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectHubForDirections(activeHub);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#651E2B] hover:bg-[#7E2837] text-[#FFF9EF] font-bold text-xs flex items-center justify-center gap-1.5 border border-[#C6A15B]/30 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#C6A15B]" />
                    <span>Get Navigation Route</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-xs text-[#B8ADA0] py-8">
                Select a parking hub on the map to view real-time availability.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
