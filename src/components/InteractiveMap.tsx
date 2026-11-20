import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Zap,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  Compass,
  Layers,
  Sparkles,
  Info,
  Hospital,
  Utensils,
  Hotel,
  Phone,
  Star,
  X,
  Satellite,
  Globe,
  ExternalLink,
  Radio,
} from 'lucide-react';
import { ParkingHub, VehicleType, NearbyPlace, PoiCategory } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface InteractiveMapProps {
  hubs: ParkingHub[];
  selectedHub: ParkingHub | null;
  onSelectHub: (hub: ParkingHub) => void;
  onBookHub: (hub: ParkingHub) => void;
  onDirectionsHub: (hub: ParkingHub) => void;
  selectedVehicle: VehicleType;
  onViewDetails?: (hub: ParkingHub) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  hubs,
  selectedHub,
  onSelectHub,
  onBookHub,
  onDirectionsHub,
  selectedVehicle,
  onViewDetails,
}) => {
  const { t, language } = useLanguage();
  const [activePin, setActivePin] = useState<ParkingHub | null>(selectedHub || hubs[0] || null);
  const [mapLayer, setMapLayer] = useState<'streets' | 'transit' | 'satellite'>('streets');
  const [satelliteMode, setSatelliteMode] = useState<'interactive' | 'radar'>('interactive');
  const [poiCategoryFilter, setPoiCategoryFilter] = useState<'all' | 'hospital' | 'food' | 'stay' | 'none'>('all');
  const [selectedPoi, setSelectedPoi] = useState<{ poi: NearbyPlace; parentHub: ParkingHub } | null>(null);

  // Normalized visual positions on our Kolhapur SVG schematic map
  const getMapPosition = (hubId: string) => {
    switch (hubId) {
      case 'hub-mahalaxmi-south':
        return { x: 42, y: 55 }; // South of Bhavani Mandap
      case 'hub-bhavani-mandap':
        return { x: 47, y: 48 }; // Historic Rajwada center
      case 'hub-rankala-chowpatty':
        return { x: 20, y: 64 }; // West near Rankala Lake
      case 'hub-cbs-transit':
        return { x: 74, y: 42 }; // East Station Road
      case 'hub-new-palace':
        return { x: 62, y: 22 }; // North Kasaba Bawada
      case 'hub-panhala-fort':
        return { x: 12, y: 15 }; // Northwest Hilltop
      case 'hub-jyotiba-hill':
        return { x: 22, y: 10 }; // Northwest Sahyadri Hilltop
      case 'hub-kaneri-math':
        return { x: 80, y: 76 }; // Southeast Highway NH48
      case 'hub-khidrapur-kopeshwar':
        return { x: 88, y: 35 }; // East Krishna Riverbank
      case 'hub-radhanagari-dajipur':
        return { x: 15, y: 84 }; // Southwest Wildlife Sanctuary
      case 'hub-town-hall':
        return { x: 50, y: 38 }; // City Heritage Core near CPR
      case 'hub-narsobachi-wadi':
        return { x: 86, y: 56 }; // East Krishna-Panchganga Confluence
      case 'hub-khasbag-maidan':
        return { x: 38, y: 46 }; // Central-South Mangalwar Peth
      case 'hub-gaganbawda-hill':
        return { x: 8, y: 70 }; // Western Ghats Pass
      default:
        return { x: 50, y: 50 };
    }
  };

  const getPoiOffset = (category: PoiCategory, index: number) => {
    switch (category) {
      case 'hospital':
        return { dx: -5 - (index * 2.5), dy: 5 + (index * 2) };
      case 'food':
        return { dx: 6 + (index * 2), dy: -4 - (index * 2) };
      case 'stay':
        return { dx: 6 + (index * 2), dy: 6 + (index * 2) };
      default:
        return { dx: 4, dy: 4 };
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#FFFDF8] border border-[#EFECE4] shadow-sm overflow-hidden flex flex-col relative">
      {/* Map Control Bar */}
      <div className="p-3 bg-[#FFFDF8] border-b border-[#EFECE4] flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center font-bold text-xs">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-[#7B2638] leading-tight">
              {language === 'mr' ? 'कोल्हापूर थेट पार्किंग नकाशा' : language === 'hi' ? 'कोल्हापुर लाइव पार्किंग मैप' : 'Kolhapur Live Parking Map'}
            </h3>
            <span className="text-[11px] text-[#5e5954]">
              {language === 'mr' ? '६ मनपा विभागांमधील थेट सेन्सर स्थिती' : language === 'hi' ? '6 नगर निगम क्षेत्रों में लाइव सेंसर डेटा' : 'Real-time bay sensors across 6 municipal zones'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md bg-[#edf8f2] text-[#26965B] border border-[#26965B]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#26965B] animate-ping" />
            <span>{language === 'mr' ? 'मनपा थेट' : language === 'hi' ? 'केएमसी लाइव' : 'KMC Live'}</span>
          </div>

          <div className="flex rounded-lg bg-[#F7F4EE] p-0.5 border border-[#EFECE4]">
            <button
              type="button"
              onClick={() => setMapLayer('streets')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                mapLayer === 'streets'
                  ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                  : 'text-[#5e5954] hover:text-[#292725]'
              }`}
            >
              {language === 'mr' ? 'सर्वसाधारण' : language === 'hi' ? 'अवलोकन' : 'Overview'}
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('transit')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                mapLayer === 'transit'
                  ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                  : 'text-[#5e5954] hover:text-[#292725]'
              }`}
            >
              {language === 'mr' ? 'प्रवासी कॉरिडॉर' : language === 'hi' ? 'ट्रांजिट कॉरिडोर' : 'Transit Corridor'}
            </button>
            <button
              type="button"
              onClick={() => setMapLayer('satellite')}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                mapLayer === 'satellite'
                  ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                  : 'text-[#5e5954] hover:text-[#292725]'
              }`}
            >
              <Satellite className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{language === 'mr' ? 'उपग्रह थेट दृश्य' : language === 'hi' ? 'सैटेलाइट लाइव' : 'Live Satellite'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time POI Layers Strip (Hospitals, Food, Stay) */}
      <div className="px-3 py-1.5 bg-[#FFFDF8] border-b border-[#EFECE4] flex items-center justify-between gap-2 overflow-x-auto text-[11px]">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="font-bold text-[#7B2638] text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#C6A15B]" />
            {language === 'mr' ? 'जवळपास:' : language === 'hi' ? 'आसपास:' : 'Nearby:'}
          </span>
          <button
            type="button"
            onClick={() => setPoiCategoryFilter(poiCategoryFilter === 'all' ? 'none' : 'all')}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer ${
              poiCategoryFilter === 'all'
                ? 'bg-[#7B2638] text-[#FFFDF8]'
                : 'bg-[#F7F4EE] text-[#5e5954] hover:text-[#292725]'
            }`}
          >
            {t.hubCard.allNearby}
          </button>
          <button
            type="button"
            onClick={() => setPoiCategoryFilter(poiCategoryFilter === 'hospital' ? 'none' : 'hospital')}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
              poiCategoryFilter === 'hospital'
                ? 'bg-[#D94B4B] text-[#FFFDF8]'
                : 'bg-[#F7F4EE] text-[#D94B4B] hover:bg-[#fdf0f0]'
            }`}
          >
            <Hospital className="w-3 h-3" />
            <span>{t.hubCard.hospitals}</span>
          </button>
          <button
            type="button"
            onClick={() => setPoiCategoryFilter(poiCategoryFilter === 'food' ? 'none' : 'food')}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
              poiCategoryFilter === 'food'
                ? 'bg-[#C6A15B] text-[#FFFDF8]'
                : 'bg-[#F7F4EE] text-[#7B2638] hover:bg-[#fef7ec]'
            }`}
          >
            <Utensils className="w-3 h-3" />
            <span>{t.hubCard.food}</span>
          </button>
          <button
            type="button"
            onClick={() => setPoiCategoryFilter(poiCategoryFilter === 'stay' ? 'none' : 'stay')}
            className={`px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer flex items-center gap-1 ${
              poiCategoryFilter === 'stay'
                ? 'bg-[#7B2638] text-[#FFFDF8]'
                : 'bg-[#F7F4EE] text-[#7B2638] hover:bg-[#F7F4EE]'
            }`}
          >
            <Hotel className="w-3 h-3" />
            <span>{t.hubCard.stay}</span>
          </button>
        </div>
        {poiCategoryFilter !== 'none' && (
          <span className="text-[10px] text-[#26965B] font-bold flex-shrink-0 hidden sm:inline">
            ● Click any icon on map to view details
          </span>
        )}
      </div>

      {/* Realtime Satellite Telemetry HUD Strip */}
      {mapLayer === 'satellite' && (
        <div className="px-3 py-2 bg-[#17211b] text-[#FFFDF8] flex items-center justify-between gap-2 text-[11px] flex-wrap border-b border-[#2d3a33]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#26965B] text-white tracking-wider shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              {language === 'mr' ? 'थेट उपग्रह लिंक' : language === 'hi' ? 'लाइव सैटेलाइट लिंक' : 'Live Satellite Stream'}
            </span>
            <span className="text-[11px] text-[#C6A15B] font-mono font-bold">
              {activePin ? `${activePin.coordinates.lat.toFixed(4)}°N, ${activePin.coordinates.lng.toFixed(4)}°E` : '16.6946°N, 74.2236°E'}
            </span>
            <span className="text-[10px] text-white/70 hidden md:inline">
              • {activePin?.landmark || 'Kolhapur Heritage Core'} • {language === 'mr' ? 'हाय-रेझोल्युशन ऑर्थोइमेजरी' : language === 'hi' ? 'हाई-रिजोल्यूशन ऑर्थोइमेजरी' : 'High-Res Optical Imagery'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-md bg-[#0d1410] p-0.5 border border-[#2d3a33] text-[10px]">
              <button
                type="button"
                onClick={() => setSatelliteMode('interactive')}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  satelliteMode === 'interactive'
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {language === 'mr' ? 'थेट नकाशा' : language === 'hi' ? 'लाइव मैप' : 'Live Pan/Zoom'}
              </button>
              <button
                type="button"
                onClick={() => setSatelliteMode('radar')}
                className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer ${
                  satelliteMode === 'radar'
                    ? 'bg-[#7B2638] text-white shadow-xs'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {language === 'mr' ? 'रडार ग्रिड' : language === 'hi' ? 'रडार ग्रिड' : 'Radar Grid'}
              </button>
            </div>

            {activePin && (
              <a
                href={`https://www.google.com/maps/@${activePin.coordinates.lat},${activePin.coordinates.lng},18z/data=!3m1!1e3`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-[#C6A15B] hover:text-white flex items-center gap-1 bg-[#0d1410] px-2 py-1 rounded border border-[#2d3a33] transition-colors cursor-pointer"
                title="Open 3D Satellite in Google Maps"
              >
                <Globe className="w-3 h-3 text-[#C6A15B]" />
                <span className="hidden sm:inline">3D Earth ↗</span>
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Canvas View: Interactive Satellite Iframe OR Schematics/Radar SVG */}
      {mapLayer === 'satellite' && satelliteMode === 'interactive' ? (
        <div className="relative w-full h-80 sm:h-[440px] bg-[#0c1410] overflow-hidden select-none">
          {/* Embedded Real Satellite View */}
          <iframe
            key={`${activePin?.id || 'hub'}-${activePin?.coordinates.lat}-${activePin?.coordinates.lng}`}
            src={`https://maps.google.com/maps?q=${activePin?.coordinates.lat || 16.6946},${activePin?.coordinates.lng || 74.2236}&t=k&z=17&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full border-0 filter contrast-[1.05]"
            allowFullScreen
            loading="lazy"
            title="Kolhapur Realtime Satellite View"
          />

          {/* Quick Hub Focus Selector Carousel on Top */}
          <div className="absolute top-2.5 inset-x-2 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar z-20">
            {hubs.map((hub) => {
              const isSelected = activePin?.id === hub.id;
              return (
                <button
                  key={hub.id}
                  type="button"
                  onClick={() => {
                    setActivePin(hub);
                    setSelectedPoi(null);
                    onSelectHub(hub);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer backdrop-blur-md flex items-center gap-1.5 shadow-md border ${
                    isSelected
                      ? 'bg-[#7B2638] text-white border-[#C6A15B] ring-2 ring-[#C6A15B]/50'
                      : 'bg-black/65 text-white/90 hover:bg-black/85 border-white/20'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      hub.openBays <= 5 ? 'bg-[#D94B4B] animate-ping' : 'bg-[#26965B]'
                    }`}
                  />
                  <span>{hub.landmark || hub.name}</span>
                  <span className="text-[10px] text-[#C6A15B] font-mono">({hub.openBays})</span>
                </button>
              );
            })}
          </div>

          {/* Floating Live Lot Status Card on Satellite */}
          {activePin && (
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-88 z-20 bg-[#FFFDF8]/95 backdrop-blur-md rounded-2xl border border-[#C6A15B]/50 shadow-2xl p-3 text-left">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#7B2638] text-white">
                      {activePin.landmark}
                    </span>
                    <span className="text-[10px] text-[#5e5954] font-mono">
                      {activePin.coordinates.lat.toFixed(4)}°N, {activePin.coordinates.lng.toFixed(4)}°E
                    </span>
                  </div>
                  <h4 className="text-[13px] font-bold text-[#7B2638] truncate mt-1">
                    {activePin.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#292725] mt-1">
                    <span className="font-extrabold text-[#26965B] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#26965B]" />
                      {activePin.openBays} Bays Free
                    </span>
                    <span className="text-[#5e5954]">•</span>
                    <span className="font-bold text-[#7B2638]">₹{activePin.hourlyRate[selectedVehicle]}/hr</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => onBookHub(activePin)}
                    className="h-8 px-3 rounded-lg bg-[#7B2638] hover:bg-[#5e1c2a] text-white text-[11px] font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.hubCard.selectSlot}</span>
                    <ArrowRight className="w-3 h-3 text-[#C6A15B]" />
                  </button>
                  {onViewDetails && (
                    <button
                      type="button"
                      onClick={() => onViewDetails(activePin)}
                      className="h-7 px-2 rounded-lg bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[10px] font-bold flex items-center justify-center transition-colors border border-[#EFECE4] cursor-pointer"
                    >
                      <span>{t.hubCard.fullDetails}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`relative w-full h-72 sm:h-96 ${mapLayer === 'satellite' ? 'bg-[#0a130e]' : 'bg-[#F7F4EE]'} overflow-hidden select-none`}>
          {/* Decorative Kolhapur Cartography Schematic */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Satellite Grid Lines if in satellite radar mode */}
            {mapLayer === 'satellite' && (
              <g opacity="0.15" stroke="#38bdf8" strokeWidth="0.25">
                <line x1="0" y1="20" x2="100" y2="20" />
                <line x1="0" y1="40" x2="100" y2="40" />
                <line x1="0" y1="60" x2="100" y2="60" />
                <line x1="0" y1="80" x2="100" y2="80" />
                <line x1="20" y1="0" x2="20" y2="100" />
                <line x1="40" y1="0" x2="40" y2="100" />
                <line x1="60" y1="0" x2="60" y2="100" />
                <line x1="80" y1="0" x2="80" y2="100" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#38bdf8" strokeDasharray="2,2" />
              </g>
            )}

            {/* Panchganga River Curve */}
            <path
              d="M 0,25 Q 35,32 55,10 Q 75,-5 100,8"
              fill="none"
              stroke={mapLayer === 'satellite' ? '#38bdf8' : '#bde3f7'}
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity={mapLayer === 'satellite' ? 0.95 : 0.8}
            />
            <text x="28" y="27" fill={mapLayer === 'satellite' ? '#7dd3fc' : '#6baed6'} fontSize="2.2" fontStyle="italic" fontWeight="bold">
              Panchganga River
            </text>

            {/* Rankala Lake Geometry */}
            <ellipse
              cx="22"
              cy="67"
              rx="11"
              ry="8"
              fill={mapLayer === 'satellite' ? '#075985' : '#d9f0fc'}
              stroke={mapLayer === 'satellite' ? '#38bdf8' : '#90cdf4'}
              strokeWidth={mapLayer === 'satellite' ? 1.5 : 0.8}
            />
            <text x="17" y="68" fill={mapLayer === 'satellite' ? '#e0f2fe' : '#3182ce'} fontSize="2.4" fontWeight="bold">
              Rankala Lake
            </text>

            {/* Major Kolhapur City Roads */}
            {/* Station Road (CBS to Rajwada) */}
            <path d="M 75,42 Q 60,45 47,48" fill="none" stroke={mapLayer === 'satellite' ? '#1e293b' : '#EFECE4'} strokeWidth="2.5" />
            <path d="M 75,42 Q 60,45 47,48" fill="none" stroke={mapLayer === 'satellite' ? '#38bdf8' : '#C6A15B'} strokeWidth="0.8" strokeDasharray="1.5,1" />

            {/* Mahadwar Road & Bhavani Mandap Road */}
            <path d="M 47,48 L 42,55 L 22,63" fill="none" stroke={mapLayer === 'satellite' ? '#1e293b' : '#EFECE4'} strokeWidth="2" />
            <path d="M 42,55 L 22,63" fill="none" stroke={mapLayer === 'satellite' ? '#f43f5e' : '#7B2638'} strokeWidth={mapLayer === 'satellite' ? 0.8 : 0.6} strokeDasharray="1,1" />

            {/* Highway to Panhala */}
            <path d="M 47,48 Q 30,35 12,15" fill="none" stroke={mapLayer === 'satellite' ? '#1e293b' : '#EFECE4'} strokeWidth="1.8" />

            {/* Kasaba Bawada Road to New Palace */}
            <path d="M 47,48 Q 55,35 62,22" fill="none" stroke={mapLayer === 'satellite' ? '#1e293b' : '#EFECE4'} strokeWidth="2" />

            {/* Temple Corridor Free Shuttle Route Line */}
            {mapLayer === 'transit' && (
              <path
                d="M 42,55 L 45,51 L 47,48"
                fill="none"
                stroke="#E6A23C"
                strokeWidth="1.8"
                strokeDasharray="2,1"
                className="animate-pulse"
              />
            )}
          </svg>

          {/* Landmark Landmarks Text Labels */}
          <div className="absolute top-4 left-3 text-[10px] font-bold text-[#7B2638]/70 bg-[#FFFDF8]/90 px-2 py-0.5 rounded border border-[#EFECE4] shadow-xs pointer-events-none">
            Panhala Range ↗
          </div>
          <div className="absolute top-4 right-3 text-[10px] font-bold text-[#7B2638]/70 bg-[#FFFDF8]/90 px-2 py-0.5 rounded border border-[#EFECE4] shadow-xs pointer-events-none">
            New Palace / Kasaba Bawada
          </div>
          <div className="absolute bottom-3 right-3 text-[10px] font-bold text-[#5e5954] bg-[#FFFDF8]/90 px-2 py-0.5 rounded border border-[#EFECE4] shadow-xs pointer-events-none">
            CBS Station Road Interchange ↘
          </div>

        {/* Interactive Hub Location Pins */}
        {hubs.map((hub) => {
          const pos = getMapPosition(hub.id);
          const isSelected = activePin?.id === hub.id;
          const isUrgent = hub.openBays <= 5;

          return (
            <div
              key={hub.id}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform hover:scale-110"
              onClick={() => {
                setActivePin(hub);
                setSelectedPoi(null);
                onSelectHub(hub);
              }}
            >
              {/* Pin Pill */}
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-extrabold shadow-md border transition-all ${
                  isSelected
                    ? 'bg-[#7B2638] text-[#FFFDF8] border-[#C6A15B] ring-3 ring-[#C6A15B]/30 scale-105'
                    : isUrgent
                    ? 'bg-[#FFFDF8] text-[#D94B4B] border-[#D94B4B]'
                    : 'bg-[#FFFDF8] text-[#26965B] border-[#26965B]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isUrgent ? 'bg-[#D94B4B] animate-ping' : 'bg-[#26965B]'
                  }`}
                />
                <span className="whitespace-nowrap">{hub.openBays} Bays</span>
                {hub.hasEvCharger && (
                  <Zap className="w-3 h-3 text-[#C6A15B] fill-current" />
                )}
              </div>

              {/* Pin Stem */}
              <div
                className={`w-1.5 h-2 mx-auto rounded-b ${
                  isSelected ? 'bg-[#7B2638]' : isUrgent ? 'bg-[#D94B4B]' : 'bg-[#26965B]'
                }`}
              />
            </div>
          );
        })}

        {/* Render POI Pins when filter is active */}
        {poiCategoryFilter !== 'none' &&
          hubs.map((hub) => {
            const hubPos = getMapPosition(hub.id);
            const poisToRender = (hub.nearbyPlaces || []).filter((poi) => {
              if (poiCategoryFilter === 'all') return true;
              return poi.category === poiCategoryFilter;
            });

            return poisToRender.map((poi, idx) => {
              const offset = getPoiOffset(poi.category, idx);
              const px = Math.min(94, Math.max(6, hubPos.x + offset.dx));
              const py = Math.min(92, Math.max(8, hubPos.y + offset.dy));
              const isSelectedPoi = selectedPoi?.poi.id === poi.id;

              return (
                <div
                  key={poi.id}
                  style={{ left: `${px}%`, top: `${py}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-25 cursor-pointer transition-transform hover:scale-125"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPoi({ poi, parentHub: hub });
                    setActivePin(hub);
                  }}
                  title={`${poi.name} (${poi.distance})`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md border transition-all ${
                      isSelectedPoi ? 'ring-3 ring-[#C6A15B] scale-125 z-30' : ''
                    } ${
                      poi.category === 'hospital'
                        ? 'bg-[#D94B4B] text-white border-white'
                        : poi.category === 'food'
                        ? 'bg-[#C6A15B] text-white border-white'
                        : 'bg-[#7B2638] text-white border-white'
                    }`}
                  >
                    {poi.category === 'hospital' && <Hospital className="w-3.5 h-3.5" />}
                    {poi.category === 'food' && <Utensils className="w-3.5 h-3.5" />}
                    {poi.category === 'stay' && <Hotel className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            });
          })}

        {/* Selected Hub Floating Preview Overlay */}
        {activePin && !selectedPoi && (
          <div className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:left-4 sm:w-88 z-30 bg-[#FFFDF8] rounded-2xl border border-[#C6A15B]/30 shadow-xl p-3.5 animate-in slide-in-from-bottom duration-150">
            {/* Realtime Location Photography Thumbnail */}
            {activePin.imageUrl && (
              <div
                onClick={() => onViewDetails && onViewDetails(activePin)}
                className={`relative w-full h-24 rounded-xl overflow-hidden mb-2.5 bg-[#EFECE4] group/mappin ${
                  onViewDetails ? 'cursor-pointer' : ''
                }`}
              >
                <img
                  src={activePin.imageUrl}
                  alt={activePin.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (!el.dataset.tried) {
                      el.dataset.tried = 'true';
                      el.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80';
                    }
                  }}
                  className="w-full h-full object-cover group-hover/mappin:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#7B2638] text-white shadow-xs">
                    {activePin.landmark}
                  </span>
                </div>
                <div className="absolute bottom-1.5 inset-x-2 flex items-center justify-between text-white text-[10px]">
                  <span className="font-bold drop-shadow-xs">Realtime Edge Node Active</span>
                  <span className="font-bold text-[#C6A15B] bg-black/40 px-1.5 py-0.5 rounded">View Info ↗</span>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#C6A15B]/20 text-[#7B2638]">
                    {activePin.landmark}
                  </span>
                  <span className="text-[11px] text-[#5e5954] flex items-center gap-1">
                    <Navigation className="w-3 h-3 text-[#7B2638]" />
                    {activePin.distance}
                  </span>
                </div>
                <h4 className="text-[14px] font-bold text-[#7B2638] truncate mt-1">
                  {activePin.name}
                </h4>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-[18px] font-black text-[#7B2638]">
                  ₹{activePin.hourlyRate[selectedVehicle]}
                </span>
                <span className="text-[10px] text-[#5e5954]">/hr</span>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between text-[11px] py-1.5 px-2 rounded-lg bg-[#F7F4EE] border border-[#EFECE4]">
              <span className="font-bold text-[#26965B] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#26965B]" />
                {activePin.openBays} Available of {activePin.totalBays}
              </span>
              <span className="text-[#5e5954] font-medium">
                {activePin.walkingTimeMin} min walk
              </span>
            </div>

            {/* Quick Nearby Spots Summary */}
            {activePin.nearbyPlaces && activePin.nearbyPlaces.length > 0 && (
              <div className="mt-2 text-[10px] text-[#5e5954] flex items-center justify-between bg-[#FFFDF8] p-1.5 rounded-md border border-[#EFECE4]">
                <span className="font-bold text-[#7B2638]">Nearby:</span>
                <span className="flex items-center gap-2">
                  <span className="flex items-center gap-0.5 text-[#D94B4B] font-bold">
                    <Hospital className="w-2.5 h-2.5" />
                    {activePin.nearbyPlaces.filter((p) => p.category === 'hospital').length} Hosp
                  </span>
                  <span className="flex items-center gap-0.5 text-[#C6A15B] font-bold">
                    <Utensils className="w-2.5 h-2.5" />
                    {activePin.nearbyPlaces.filter((p) => p.category === 'food').length} Food
                  </span>
                  <span className="flex items-center gap-0.5 text-[#7B2638] font-bold">
                    <Hotel className="w-2.5 h-2.5" />
                    {activePin.nearbyPlaces.filter((p) => p.category === 'stay').length} Stay
                  </span>
                </span>
              </div>
            )}

            <div className={`grid ${onViewDetails ? 'grid-cols-3' : 'grid-cols-2'} gap-1.5 mt-2.5`}>
              <button
                type="button"
                onClick={() => onDirectionsHub(activePin)}
                className="h-8 rounded-lg bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[10px] font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer border border-[#EFECE4]"
              >
                <Navigation className="w-3 h-3" />
                <span>{language === 'mr' ? 'मार्गदर्शन' : language === 'hi' ? 'रूट' : 'GPS Route'}</span>
              </button>
              {onViewDetails && (
                <button
                  type="button"
                  onClick={() => onViewDetails(activePin)}
                  className="h-8 rounded-lg bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[10px] font-bold flex items-center justify-center gap-1 transition-colors border border-[#C6A15B]/30 cursor-pointer"
                >
                  <Compass className="w-3 h-3 text-[#C6A15B]" />
                  <span>{t.hubCard.fullDetails}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onBookHub(activePin)}
                className="h-8 rounded-lg bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[10px] font-bold flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <span>{t.hubCard.selectSlot}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Selected POI Floating Card */}
        {selectedPoi && (
          <div className="absolute bottom-3 inset-x-3 sm:inset-x-auto sm:left-4 sm:w-84 z-30 bg-[#FFFDF8] rounded-2xl border border-[#C6A15B]/40 shadow-xl p-3.5 animate-in slide-in-from-bottom duration-150">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs ${
                    selectedPoi.poi.category === 'hospital'
                      ? 'bg-[#D94B4B]'
                      : selectedPoi.poi.category === 'food'
                      ? 'bg-[#C6A15B]'
                      : 'bg-[#7B2638]'
                  }`}
                >
                  {selectedPoi.poi.category === 'hospital' && <Hospital className="w-4 h-4" />}
                  {selectedPoi.poi.category === 'food' && <Utensils className="w-4 h-4" />}
                  {selectedPoi.poi.category === 'stay' && <Hotel className="w-4 h-4" />}
                </span>
                <div>
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded tracking-wider ${
                      selectedPoi.poi.category === 'hospital'
                        ? 'bg-[#fdf0f0] text-[#D94B4B]'
                        : selectedPoi.poi.category === 'food'
                        ? 'bg-[#fef7ec] text-[#C6A15B]'
                        : 'bg-[#F7F4EE] text-[#7B2638]'
                    }`}
                  >
                    {selectedPoi.poi.category === 'hospital'
                      ? 'Emergency Hospital'
                      : selectedPoi.poi.category === 'food'
                      ? 'Dining & Food Spot'
                      : 'Hotel for Stay'}
                  </span>
                  <h4 className="text-[13px] font-bold text-[#7B2638] truncate mt-0.5">
                    {selectedPoi.poi.name}
                  </h4>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPoi(null)}
                className="w-6 h-6 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[11px] text-[#5e5954] mt-1.5 leading-snug">
              {selectedPoi.poi.specialtyOrType}
            </p>

            <div className="mt-2 p-2 rounded-lg bg-[#F7F4EE] border border-[#EFECE4] flex items-center justify-between text-[11px]">
              <div>
                <span className="text-[#8a847e] text-[10px] block">Nearest Smart Parking:</span>
                <span className="font-extrabold text-[#7B2638]">
                  {selectedPoi.parentHub.name}
                </span>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-[#26965B]">
                  {selectedPoi.poi.distance}
                </span>
                <span className="text-[9px] text-[#8a847e] block">
                  {selectedPoi.poi.walkingTimeMin} min walk
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2.5">
              {selectedPoi.poi.phone ? (
                <a
                  href={`tel:${selectedPoi.poi.phone}`}
                  className="h-8 rounded-lg bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[11px] font-bold flex items-center justify-center gap-1 transition-colors border border-[#EFECE4]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Spot</span>
                </a>
              ) : (
                <div className="h-8 flex items-center text-[10px] text-[#8a847e] px-2 truncate">
                  <span>{selectedPoi.poi.priceLevel || selectedPoi.poi.timing || 'Verified'}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setActivePin(selectedPoi.parentHub);
                  onBookHub(selectedPoi.parentHub);
                }}
                className="h-8 rounded-lg bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[11px] font-bold flex items-center justify-center gap-1 shadow-sm transition-all cursor-pointer"
              >
                <span>Park Here</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C6A15B]" />
              </button>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Map Legend Footer */}
      <div className="p-2.5 bg-[#FFFDF8] border-t border-[#EFECE4] flex items-center justify-between text-[11px] text-[#5e5954] px-4 flex-wrap gap-2">
        <div className="flex items-center gap-3.5 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#26965B]" />
            <span>Available ({'>'} 5 bays)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D94B4B]" />
            <span>Fast Fill ({'≤'} 5 bays)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D94B4B] text-white flex items-center justify-center text-[8px] font-bold">+</span>
            <span>Hospitals</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6A15B] text-white flex items-center justify-center text-[8px] font-bold">🍽</span>
            <span>Food & Misal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7B2638] text-white flex items-center justify-center text-[8px] font-bold">🏨</span>
            <span>Hotels for Stay</span>
          </div>
        </div>
        <span className="hidden sm:inline font-medium text-[#C6A15B]">
          {mapLayer === 'satellite'
            ? (language === 'mr' ? '🛰️ थेट उपग्रह ऑर्थोइमेजरी • ISRO / Google Earth' : language === 'hi' ? '🛰️ लाइव सैटेलाइट ऑर्थोइमेजरी • ISRO / Google Earth' : '🛰️ Realtime Satellite Imagery • ISRO / Google Earth')
            : (language === 'mr' ? 'तपशील व बुकिंगसाठी पिनवर क्लिक करा' : language === 'hi' ? 'विवरण व बुकिंग के लिए पिन पर क्लिक करें' : 'Click pin to preview & book bay')}
        </span>
      </div>
    </div>
  );
};