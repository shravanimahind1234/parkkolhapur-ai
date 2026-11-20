import React, { useState } from 'react';
import {
  X,
  Navigation,
  MapPin,
  Compass,
  ExternalLink,
  ShieldCheck,
  Hospital,
  Utensils,
  Hotel,
  Phone,
  Star,
  Zap,
  Video,
  Warehouse,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Share2,
  Calendar,
} from 'lucide-react';
import { ParkingHub, KolhapurDestination, VehicleType, NearbyPlace, PoiCategory } from '../types';
import { ImageWithLoader } from './ImageWithLoader';
import { useLanguage } from '../i18n/LanguageContext';

interface LocationDetailsModalProps {
  hub: ParkingHub | null;
  destination?: KolhapurDestination | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectSlot: (hub: ParkingHub) => void;
  onOpenDirections: (hub: ParkingHub) => void;
  selectedVehicle: VehicleType;
}

export const LocationDetailsModal: React.FC<LocationDetailsModalProps> = ({
  hub,
  destination,
  isOpen,
  onClose,
  onSelectSlot,
  onOpenDirections,
  selectedVehicle,
}) => {
  const { t, language } = useLanguage();
  if (!isOpen || !hub) return null;

  const [activePoiCategory, setActivePoiCategory] = useState<'all' | 'hospital' | 'food' | 'stay'>('all');
  const [copySuccess, setCopySuccess] = useState(false);

  const nearbyPlaces = hub.nearbyPlaces || [];
  const hospitals = nearbyPlaces.filter((p) => p.category === 'hospital');
  const foodSpots = nearbyPlaces.filter((p) => p.category === 'food');
  const stayHotels = nearbyPlaces.filter((p) => p.category === 'stay');

  const filteredPois =
    activePoiCategory === 'all'
      ? nearbyPlaces
      : nearbyPlaces.filter((p) => p.category === activePoiCategory);

  const occupancyPercent = Math.round(
    ((hub.totalBays - hub.openBays) / hub.totalBays) * 100
  );
  const isUrgent = hub.openBays <= 5;

  const googleMapsHubUrl = `https://www.google.com/maps/dir/?api=1&destination=${hub.coordinates.lat},${hub.coordinates.lng}`;

  const getPoiNavigationUrl = (poi: NearbyPlace) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      `${poi.name}, ${poi.address}, Kolhapur, Maharashtra`
    )}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${hub.name} - Smart Parking Kolhapur`,
        text: `Check live parking availability & nearby amenities at ${hub.name}, Kolhapur. Open Bays: ${hub.openBays}/${hub.totalBays}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${hub.name} (${hub.landmark}, Kolhapur) - ${hub.openBays} bays available.`
      );
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FFFDF8] border-t sm:border border-[#C6A15B]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-left max-h-[94vh]">
        
        {/* HERO IMAGE HEADER */}
        <div className="relative h-56 sm:h-64 w-full bg-[#292725] overflow-hidden flex-shrink-0">
          <ImageWithLoader
            src={destination?.imageUrl || hub.imageUrl || 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpg/1280px-Mahalaxmi_Temple%2C_Kolhapur.jpg'}
            alt={destination?.imageAlt || hub.name}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Authentic Light-Balanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#292725] via-[#292725]/40 to-transparent pointer-events-none" />

          {/* Top Controls */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#7B2638] text-[#FFFDF8] text-[11px] font-extrabold uppercase tracking-wider shadow-sm border border-[#C6A15B]/40">
                {hub.landmark}
              </span>
              {hub.isMunicipalApproved && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#edf8f2] text-[#26965B] text-[11px] font-bold border border-[#26965B]/30 shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>KMC Municipal</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                title="Share Location"
                className="w-9 h-9 rounded-full bg-[#FFFDF8]/90 hover:bg-[#FFFDF8] text-[#7B2638] flex items-center justify-center transition-colors shadow-md cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-[#FFFDF8]/90 hover:bg-[#FFFDF8] text-[#292725] flex items-center justify-center transition-colors shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Hero Bottom Titles */}
          <div className="absolute bottom-4 inset-x-4 text-left z-10">
            {destination?.marathiName && (
              <span className="text-[12px] font-bold text-[#C6A15B] drop-shadow-sm block">
                {destination.marathiName}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-black text-white font-serif leading-tight drop-shadow-md">
              {destination?.name || hub.name}
            </h2>
            <div className="flex items-center gap-2 text-white/90 text-[12px] mt-1 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                {hub.area}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-[#C6A15B]" />
                {hub.distance} ({hub.walkingTimeMin} min walk)
              </span>
            </div>
          </div>
        </div>

        {/* MODAL BODY (SCROLLABLE) */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {copySuccess && (
            <div className="p-2.5 rounded-xl bg-[#edf8f2] border border-[#26965B]/30 text-[12px] text-[#26965B] font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Location summary copied to clipboard!</span>
            </div>
          )}

          {/* 1. REAL-TIME PARKING AVAILABILITY MATRIX */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block">
                  {t.modal.liveParkingStatus}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className={`text-2xl font-black ${isUrgent ? 'text-[#D94B4B]' : 'text-[#26965B]'}`}>
                    {hub.openBays} {t.landing.baysFree}
                  </span>
                  <span className="text-[13px] text-[#5e5954] font-medium">
                    of {hub.totalBays} {t.hubCard.capacity}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block">
                  Rate ({selectedVehicle.toUpperCase()})
                </span>
                <span className="text-xl font-black text-[#7B2638]">
                  ₹{hub.hourlyRate[selectedVehicle]}
                  <span className="text-[11px] font-normal text-[#5e5954]">{t.hubCard.perHour}</span>
                </span>
              </div>
            </div>

            {/* Occupancy Progress Bar */}
            <div className="space-y-1">
              <div className="w-full h-2 rounded-full bg-[#EFECE4] overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    occupancyPercent > 85
                      ? 'bg-[#D94B4B]'
                      : occupancyPercent > 60
                      ? 'bg-[#E6A23C]'
                      : 'bg-[#26965B]'
                  }`}
                  style={{ width: `${occupancyPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[#8a847e] font-medium">
                <span>{occupancyPercent}% Occupancy</span>
                <span className="text-[#26965B] font-bold">● {hub.syncTime}</span>
              </div>
            </div>

            {/* Tariff Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#EFECE4] text-center">
              <div className={`p-2 rounded-xl border ${selectedVehicle === 'bike' ? 'bg-[#7B2638]/5 border-[#7B2638]/30 font-bold' : 'bg-[#F7F4EE] border-[#EFECE4]'}`}>
                <span className="text-[10px] text-[#5e5954] block">2-Wheeler</span>
                <span className="text-[13px] font-extrabold text-[#7B2638]">₹{hub.hourlyRate.bike}/hr</span>
                <span className="text-[9px] text-[#8a847e] block">₹{hub.dayPassRate.bike}/day</span>
              </div>
              <div className={`p-2 rounded-xl border ${selectedVehicle === 'car' ? 'bg-[#7B2638]/5 border-[#7B2638]/30 font-bold' : 'bg-[#F7F4EE] border-[#EFECE4]'}`}>
                <span className="text-[10px] text-[#5e5954] block">4-Wheeler Car</span>
                <span className="text-[13px] font-extrabold text-[#7B2638]">₹{hub.hourlyRate.car}/hr</span>
                <span className="text-[9px] text-[#8a847e] block">₹{hub.dayPassRate.car}/day</span>
              </div>
              <div className={`p-2 rounded-xl border ${selectedVehicle === 'ev' ? 'bg-[#7B2638]/5 border-[#7B2638]/30 font-bold' : 'bg-[#F7F4EE] border-[#EFECE4]'}`}>
                <span className="text-[10px] text-[#5e5954] block">EV Charging</span>
                <span className="text-[13px] font-extrabold text-[#26965B]">₹{hub.hourlyRate.ev}/hr</span>
                <span className="text-[9px] text-[#8a847e] block">₹{hub.dayPassRate.ev}/day</span>
              </div>
            </div>

            {/* Amenities Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {hub.hasEvCharger && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#edf8f2] text-[#26965B] text-[11px] font-bold border border-[#26965B]/20">
                  <Zap className="w-3.5 h-3.5" />
                  <span>60kW DC EV Fast Charger</span>
                </span>
              )}
              {hub.hasCctv && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F4EE] text-[#5e5954] text-[11px] font-semibold border border-[#EFECE4]">
                  <Video className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>24x7 CCTV Surveillance</span>
                </span>
              )}
              {hub.hasCoveredShade && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F4EE] text-[#5e5954] text-[11px] font-semibold border border-[#EFECE4]">
                  <Warehouse className="w-3.5 h-3.5 text-[#7B2638]" />
                  <span>Covered Canopy Roofing</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F4EE] text-[#5e5954] text-[11px] font-semibold border border-[#EFECE4]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#26965B]" />
                <span>Automatic FastTag Barrier</span>
              </span>
            </div>
          </div>

          {/* 2. AI SMART ADVISORY */}
          <div
            className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
              hub.aiAdvisory.type === 'warning'
                ? 'bg-[#fef7ec] border-[#E6A23C]/40 text-[#7B2638]'
                : hub.aiAdvisory.type === 'urgent'
                ? 'bg-[#fdf0f0] border-[#D94B4B]/30 text-[#D94B4B]'
                : 'bg-[#edf8f2] border-[#26965B]/30 text-[#26965B]'
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[11px] uppercase tracking-wider">
                  {hub.aiAdvisory.badge}
                </span>
                {hub.aiAdvisory.probability && (
                  <span className="text-[11px] font-semibold text-[#5e5954]">
                    • {hub.aiAdvisory.probability}
                  </span>
                )}
              </div>
              <p className="text-[12px] text-[#292725] mt-1 leading-snug">
                {hub.aiAdvisory.message}
              </p>
            </div>
          </div>

          {/* REALTIME LOCATION VISUAL PERSPECTIVES */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-[14px] font-bold text-[#7B2638] font-serif flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                  <span>Realtime Ground Perspectives</span>
                </h4>
                <p className="text-[11px] text-[#5e5954]">
                  Ground photographs of {destination?.name || hub.name} & smart parking concourse.
                </p>
              </div>
              <span className="text-[10px] font-bold text-[#26965B] bg-[#edf8f2] px-2.5 py-0.5 rounded-full border border-[#26965B]/20">
                Live Sensor Sync
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-[#EFECE4] border border-[#EFECE4]">
                <img
                  src={destination?.imageUrl || hub.imageUrl}
                  alt="Landmark Sanctum View"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (!el.dataset.tried) {
                      el.dataset.tried = 'true';
                      el.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white">
                  Landmark View
                </span>
              </div>

              <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-[#EFECE4] border border-[#EFECE4]">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Kolhapur_New_Palace.jpg/1280px-Kolhapur_New_Palace.jpg"
                  alt="Access Way & Concourse"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (!el.dataset.tried) {
                      el.dataset.tried = 'true';
                      el.src = 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=600&q=80';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white">
                  Concourse Entry
                </span>
              </div>

              <div className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-[#EFECE4] border border-[#EFECE4] col-span-2 sm:col-span-1">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Rankala_lake.jpg/1280px-Rankala_lake.jpg"
                  alt="Live Parking Bay & Sensor Gate"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const el = e.currentTarget;
                    if (!el.dataset.tried) {
                      el.dataset.tried = 'true';
                      el.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white">
                  Smart Bay Transit
                </span>
              </div>
            </div>
          </div>

          {/* 3. NEARBY REAL-TIME LOCATIONS (HOSPITALS, FOOD, STAY) WITH DIRECT NAVIGATION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                  {t.modal.nearbyLocations}
                </h3>
                <p className="text-[12px] text-[#5e5954]">
                  {language === 'mr'
                    ? 'रुग्णालये, अस्सल कोल्हापुरी जेवण आणि मुक्कामाची ठिकाणे.'
                    : language === 'hi'
                    ? 'अस्पताल, प्रामाणिक कोल्हापुरी खानपान और ठहरने के होटल।'
                    : 'Hospitals, iconic Kolhapuri dining, and verified stays within walking distance.'}
                </p>
              </div>
              <span className="text-[11px] font-extrabold text-[#7B2638] px-2.5 py-1 rounded-full bg-[#C6A15B]/20">
                {nearbyPlaces.length} {t.modal.pointsOfInterest}
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[12px]">
              <button
                type="button"
                onClick={() => setActivePoiCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activePoiCategory === 'all'
                    ? 'bg-[#7B2638] text-white shadow-sm'
                    : 'bg-[#FFFFFF] text-[#5e5954] border border-[#EFECE4] hover:bg-[#F7F4EE]'
                }`}
              >
                {t.hubCard.tabAll} ({nearbyPlaces.length})
              </button>
              <button
                type="button"
                onClick={() => setActivePoiCategory('hospital')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activePoiCategory === 'hospital'
                    ? 'bg-[#D94B4B] text-white shadow-sm'
                    : 'bg-[#FFFFFF] text-[#D94B4B] border border-[#D94B4B]/30 hover:bg-[#fdf0f0]'
                }`}
              >
                <Hospital className="w-3.5 h-3.5" />
                <span>{t.hubCard.tabHospitals} ({hospitals.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePoiCategory('food')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activePoiCategory === 'food'
                    ? 'bg-[#C6A15B] text-white shadow-sm'
                    : 'bg-[#FFFFFF] text-[#7B2638] border border-[#C6A15B]/30 hover:bg-[#fef7ec]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>{t.hubCard.tabFood} ({foodSpots.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePoiCategory('stay')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activePoiCategory === 'stay'
                    ? 'bg-[#7B2638] text-white shadow-sm'
                    : 'bg-[#FFFFFF] text-[#7B2638] border border-[#7B2638]/30 hover:bg-[#F7F4EE]'
                }`}
              >
                <Hotel className="w-3.5 h-3.5" />
                <span>{t.hubCard.tabStay} ({stayHotels.length})</span>
              </button>
            </div>

            {/* List of Detailed Nearby POI Cards */}
            <div className="space-y-2.5">
              {filteredPois.map((poi) => {
                const navUrl = getPoiNavigationUrl(poi);

                return (
                  <div
                    key={poi.id}
                    className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] hover:border-[#C6A15B]/50 shadow-xs hover:shadow-md transition-all flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            poi.category === 'hospital'
                              ? 'bg-[#fdf0f0] text-[#D94B4B]'
                              : poi.category === 'food'
                              ? 'bg-[#fef7ec] text-[#C6A15B]'
                              : 'bg-[#F7F4EE] text-[#7B2638]'
                          }`}
                        >
                          {poi.category === 'hospital' && <Hospital className="w-4 h-4" />}
                          {poi.category === 'food' && <Utensils className="w-4 h-4" />}
                          {poi.category === 'stay' && <Hotel className="w-4 h-4" />}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded tracking-wider ${
                                poi.category === 'hospital'
                                  ? 'bg-[#fdf0f0] text-[#D94B4B]'
                                  : poi.category === 'food'
                                  ? 'bg-[#fef7ec] text-[#C6A15B]'
                                  : 'bg-[#F7F4EE] text-[#7B2638]'
                              }`}
                            >
                              {poi.category === 'hospital'
                                ? '24/7 Healthcare'
                                : poi.category === 'food'
                                ? 'Dining & Misal'
                                : 'Hotel Lodging'}
                            </span>
                            {poi.rating && (
                              <span className="text-[11px] font-bold text-[#C6A15B] flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-current" />
                                {poi.rating}
                              </span>
                            )}
                          </div>

                          <h4 className="text-[14px] font-extrabold text-[#7B2638] truncate mt-0.5">
                            {poi.name}
                          </h4>
                          {poi.marathiName && (
                            <span className="text-[11px] text-[#8a847e] block">
                              {poi.marathiName}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Distance & Walking Badge */}
                      <div className="flex flex-col items-end flex-shrink-0 text-right">
                        <span className="text-[11px] font-extrabold text-[#26965B] bg-[#edf8f2] px-2 py-0.5 rounded-full border border-[#26965B]/20">
                          {poi.distance}
                        </span>
                        <span className="text-[10px] text-[#8a847e] mt-0.5">
                          {poi.walkingTimeMin} min walk
                        </span>
                      </div>
                    </div>

                    <p className="text-[12px] text-[#5e5954] leading-snug">
                      {poi.specialtyOrType}
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-[#8a847e]">
                      <MapPin className="w-3 h-3 text-[#7B2638] flex-shrink-0" />
                      <span className="truncate">{poi.address}</span>
                    </div>

                    {/* Action Bar for this POI */}
                    <div className="pt-2 border-t border-[#EFECE4] flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        {poi.priceLevel && (
                          <span className="text-[11px] font-bold text-[#292725] bg-[#F7F4EE] px-2 py-0.5 rounded-md border border-[#EFECE4]">
                            {poi.priceLevel}
                          </span>
                        )}
                        {poi.phone && (
                          <a
                            href={`tel:${poi.phone}`}
                            className="text-[11px] font-bold text-[#7B2638] flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{poi.phone}</span>
                          </a>
                        )}
                      </div>

                      {/* Live GPS Navigation to this specific spot */}
                      <a
                        href={navUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-3 rounded-lg bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[11px] font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ml-auto"
                      >
                        <Navigation className="w-3 h-3 text-[#C6A15B]" />
                        <span>{language === 'mr' ? 'दिशादर्शन मिळवा' : language === 'hi' ? 'नेविगेट करें' : 'Navigate to Spot'}</span>
                        <ExternalLink className="w-3 h-3 text-[#FFFDF8]/70" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM FIXED CTA FOOTER */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#EFECE4] grid grid-cols-2 gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDirections(hub);
            }}
            className="h-12 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[13px] font-bold flex items-center justify-center gap-2 transition-colors border border-[#EFECE4] cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>{t.modal.startGps}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSelectSlot(hub);
            }}
            className="h-12 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <span>{t.modal.reserveSlot}</span>
            <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
