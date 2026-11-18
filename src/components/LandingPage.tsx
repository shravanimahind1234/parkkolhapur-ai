import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Car,
  Bike,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Bus,
  Clock,
  Compass,
  CheckCircle2,
  PhoneCall,
  Navigation,
  ChevronRight,
  Building2,
  Calendar,
  Hospital,
  Utensils,
  Hotel,
} from 'lucide-react';
import { INITIAL_DESTINATIONS } from '../data/mockData';
import { ParkingHub, VehicleType, KolhapurDestination } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface LandingPageProps {
  onFindParkingClick: () => void;
  onGetStartedClick: () => void;
  onSelectDestination: (landmarkName: string) => void;
  hubs: ParkingHub[];
  onDirectBookHub: (hub: ParkingHub) => void;
  selectedVehicle: VehicleType;
  onSelectVehicle: (v: VehicleType) => void;
  onViewLocationDetails?: (hub: ParkingHub, destination?: KolhapurDestination) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onFindParkingClick,
  onGetStartedClick,
  onSelectDestination,
  hubs,
  onDirectBookHub,
  selectedVehicle,
  onSelectVehicle,
  onViewLocationDetails,
}) => {
  const { t, language } = useLanguage();
  const [heroSearchLandmark, setHeroSearchLandmark] = useState<string>('Mahalaxmi Temple');
  const [destCategory, setDestCategory] = useState<string>('all');

  const totalOpenBays = hubs.reduce((acc, h) => acc + h.openBays, 0);
  const totalBays = hubs.reduce((acc, h) => acc + h.totalBays, 0);

  const filteredDestinations = INITIAL_DESTINATIONS.filter((dest) => {
    if (destCategory === 'all') return true;
    if (destCategory === 'temple') return dest.category === 'temple';
    if (destCategory === 'heritage') return ['palace', 'fort', 'heritage', 'market'].includes(dest.category);
    if (destCategory === 'nature') return ['lake', 'nature'].includes(dest.category);
    if (destCategory === 'museum') return dest.category === 'museum';
    return true;
  });

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectDestination(heroSearchLandmark);
    onFindParkingClick();
  };

  return (
    <div className="w-full flex flex-col bg-[#F7F4EE] text-[#292725]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-[#EFECE4] bg-gradient-to-b from-[#FFFDF8] via-[#FFFDF8] to-[#F7F4EE]">
        {/* Subtle royal background emblem */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C6A15B]/5 blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#7B2638]/5 blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & Search Form */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left">
              {/* Kolhapur Municipal Seal & Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7B2638] text-[#FFFDF8] text-[11px] font-extrabold shadow-sm tracking-wide">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B]" />
                  <span>{t.landing.heroBadge}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C6A15B]/20 text-[#7B2638] text-[11px] font-bold border border-[#C6A15B]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#26965B] animate-pulse" />
                  <span>{totalOpenBays} {t.landing.baysFree}</span>
                </span>
              </div>

              {/* Exact Hero Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#7B2638] font-serif tracking-tight leading-[1.12]">
                {t.landing.heroHeadline} <br className="hidden sm:inline" />
                <span className="text-[#292725]">{t.landing.heroHeadlineAccent}</span>
              </h1>

              {/* Exact Subtitle */}
              <p className="text-base sm:text-lg text-[#5e5954] max-w-xl leading-relaxed">
                {t.landing.heroSubtitle}
              </p>

              {/* Find Parking and Get Started CTA buttons */}
              <div className="flex items-center gap-3 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={onFindParkingClick}
                  className="h-12 px-6 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all cursor-pointer border border-[#C6A15B]/30"
                >
                  <Search className="w-4 h-4 text-[#C6A15B]" />
                  <span>{t.landing.findParkingBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={onGetStartedClick}
                  className="h-12 px-6 rounded-xl bg-[#FFFDF8] hover:bg-[#EFECE4] text-[#7B2638] font-bold text-sm sm:text-base flex items-center gap-2 shadow-sm border border-[#C6A15B]/50 transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-[#C6A15B]" />
                  <span>{t.landing.getStartedBtn}</span>
                </button>
              </div>

              {/* Instant Quick-Search Widget Card */}
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#C6A15B]/30 shadow-md">
                <div className="flex items-center justify-between mb-3 border-b border-[#EFECE4] pb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7B2638] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                    {t.landing.instantSearchTitle}
                  </span>
                  <span className="text-[11px] font-semibold text-[#26965B]">
                    {t.landing.edgeActive}
                  </span>
                </div>

                <form onSubmit={handleHeroSearch} className="flex flex-col gap-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {/* Destination Select */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#5e5954] uppercase tracking-wider">
                        {t.landing.destinationLandmark}
                      </label>
                      <div className="flex items-center h-11 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] focus-within:border-[#7B2638]">
                        <MapPin className="w-4 h-4 text-[#7B2638] mr-2 flex-shrink-0" />
                        <select
                          value={heroSearchLandmark}
                          onChange={(e) => setHeroSearchLandmark(e.target.value)}
                          className="w-full bg-transparent text-[13px] font-medium text-[#292725] focus:outline-none cursor-pointer"
                        >
                          <option value="Mahalaxmi Temple">Mahalaxmi (Ambabai) Temple</option>
                          <option value="Jyotiba Temple">Jyotiba Temple (Wadi Ratnagiri)</option>
                          <option value="Rankala Lake">Rankala Lake & Chowpatty</option>
                          <option value="New Palace">New Palace (Shahu Chhatrapati)</option>
                          <option value="Panhala Fort">Panhala Fort (Teen Darwaja)</option>
                          <option value="Kaneri Math">Kaneri Math (Siddhagiri Museum)</option>
                          <option value="Kopeshwar Temple">Kopeshwar Temple (Khidrapur)</option>
                          <option value="Radhanagari Wildlife Sanctuary">Radhanagari & Dajipur Wildlife</option>
                          <option value="Town Hall Museum">Town Hall Museum & Gardens</option>
                          <option value="Narsobachi Wadi">Narsobachi Wadi (Datta Mandir)</option>
                          <option value="Khasbag Maidan">Khasbag Maidan (Wrestling Arena)</option>
                          <option value="Bhavani Mandap">Bhavani Mandap & Old Rajwada</option>
                          <option value="Central Bus Stand (CBS)">Central Bus Stand (CBS)</option>
                        </select>
                      </div>
                    </div>

                    {/* Vehicle Type Switcher */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-[#5e5954] uppercase tracking-wider">
                        {t.landing.vehicleType}
                      </label>
                      <div className="grid grid-cols-3 h-11 p-1 rounded-xl bg-[#F7F4EE] border border-[#EFECE4]">
                        <button
                          type="button"
                          onClick={() => onSelectVehicle('bike')}
                          className={`flex items-center justify-center gap-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedVehicle === 'bike'
                              ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                              : 'text-[#5e5954] hover:text-[#292725]'
                          }`}
                        >
                          <Bike className="w-3.5 h-3.5" />
                          <span>{t.vehicle.twoWheeler}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectVehicle('car')}
                          className={`flex items-center justify-center gap-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedVehicle === 'car'
                              ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                              : 'text-[#5e5954] hover:text-[#292725]'
                          }`}
                        >
                          <Car className="w-3.5 h-3.5" />
                          <span>{t.vehicle.fourWheeler}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onSelectVehicle('ev')}
                          className={`flex items-center justify-center gap-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedVehicle === 'ev'
                              ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                              : 'text-[#5e5954] hover:text-[#292725]'
                          }`}
                        >
                          <Zap className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>EV</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full h-11 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span>{t.landing.checkAvailabilityBtn}</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A15B]" />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column: Hero Visual Collage of Real Kolhapur Destinations */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Real Photo: Mahalaxmi Temple */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C6A15B]/30 aspect-[4/3] group">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpg/1280px-Mahalaxmi_Temple%2C_Kolhapur.jpg"
                    alt="Authentic photograph of Mahalaxmi Temple, Kolhapur"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.dataset.tried) {
                        el.dataset.tried = 'true';
                        el.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80';
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  {/* Elegant Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/80 via-transparent to-black/20" />

                  {/* Overlaid Badge & Title */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#7B2638] text-[#FFFDF8] text-[10px] font-extrabold tracking-wider uppercase inline-block mb-1">
                      Mahalaxmi Ambabai Temple
                    </span>
                    <p className="text-[#FFFDF8] font-bold text-sm leading-tight drop-shadow-sm">
                      South Gate Smart Lot • 18 Bays Open
                    </p>
                    <span className="text-[11px] text-[#C6A15B] font-medium">
                      Includes Free Battery E-Shuttle to Mahadwar
                    </span>
                  </div>
                </div>

                {/* Overlapping Secondary Card: Rankala Lake */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 w-48 sm:w-56 rounded-2xl overflow-hidden shadow-xl border-2 border-[#FFFDF8] bg-[#FFFDF8] group">
                  <div className="h-24 overflow-hidden relative">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Rankala_lake.jpg/1280px-Rankala_lake.jpg"
                      alt="Authentic scenic photograph of Rankala Lake, Kolhapur"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const el = e.currentTarget;
                        if (!el.dataset.tried) {
                          el.dataset.tried = 'true';
                          el.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white">
                      Rankala Promenade
                    </span>
                  </div>
                  <div className="p-2 text-left bg-[#FFFDF8]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-[#26965B]">
                        34 Bays Free
                      </span>
                      <span className="text-[10px] font-bold text-[#7B2638]">
                        60kW DC EV
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overlapping Floating Status Pill */}
                <div className="absolute -top-4 -right-2 sm:-right-4 px-3 py-2 rounded-2xl bg-[#FFFDF8] border border-[#C6A15B]/40 shadow-xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#edf8f2] text-[#26965B] flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-[#5e5954] block leading-tight">
                      KMC Barrier Telemetry
                    </span>
                    <span className="text-[12px] font-extrabold text-[#7B2638] leading-tight">
                      100% Sensors Online
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-[#EFECE4]">
            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5e5954]">
                {t.landing.totalCapacity}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#7B2638] font-serif mt-0.5">
                {totalBays}+
              </div>
              <span className="text-[11px] text-[#26965B] font-semibold">
                {t.landing.acrossZones}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5e5954]">
                {t.landing.liveOpenBays}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#26965B] font-serif mt-0.5">
                {totalOpenBays}
              </div>
              <span className="text-[11px] text-[#5e5954]">
                {t.landing.updatedRealtime}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5e5954]">
                {t.landing.freeShuttle}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C6A15B] font-serif mt-0.5">
                4-6 min
              </div>
              <span className="text-[11px] text-[#5e5954]">
                {t.landing.shuttleFreq}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5e5954]">
                {t.landing.bookingSpeed}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#7B2638] font-serif mt-0.5">
                &lt; 30s
              </div>
              <span className="text-[11px] text-[#26965B] font-semibold">
                {t.landing.instantEntry}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS SHOWCASE SECTION WITH REAL KOLHAPUR PHOTOGRAPHY */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C6A15B]/20 text-[#7B2638] text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A15B]" />
            {t.landing.destinationsTitle}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#7B2638] font-serif tracking-tight">
            {t.landing.destinationsHeading}
          </h2>
          <p className="text-sm sm:text-base text-[#5e5954] mt-2 leading-relaxed">
            {t.landing.destinationsDesc}
          </p>

          {/* Destination Category Filter Bar */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {[
              { id: 'all', label: `${t.landing.catAll} (${INITIAL_DESTINATIONS.length})` },
              { id: 'temple', label: t.landing.catTemple },
              { id: 'heritage', label: t.landing.catHeritage },
              { id: 'nature', label: t.landing.catNature },
              { id: 'museum', label: t.landing.catMuseum },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setDestCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  destCategory === cat.id
                    ? 'bg-[#7B2638] text-[#FFFDF8] border-[#7B2638] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#5e5954] border-[#EFECE4] hover:border-[#C6A15B]/50 hover:bg-[#F7F4EE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real Kolhapur Destinations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const linkedHub = hubs.find((h) => h.id === dest.associatedHubId) || hubs[0];
            const isUrgent = dest.openBays <= 5;

            return (
              <div
                key={dest.id}
                className="rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Real Landmark Photo */}
                <div
                  onClick={() => onViewLocationDetails && onViewLocationDetails(linkedHub, dest)}
                  className={`relative h-52 overflow-hidden bg-[#EFECE4] ${
                    onViewLocationDetails ? 'cursor-pointer' : ''
                  }`}
                >
                  <img
                    src={dest.imageUrl}
                    alt={dest.imageAlt}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const el = e.currentTarget;
                      if (!el.dataset.tried) {
                        el.dataset.tried = 'true';
                        el.src =
                          'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80';
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Attractive Light-Balanced Dark-Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/85 via-[#292725]/30 to-transparent" />

                  {/* Overlaid Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-[#FFFDF8]/90 text-[#7B2638] text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-xs shadow-xs border border-[#C6A15B]/30">
                      {dest.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Overlaid Live Bay Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow-sm flex items-center gap-1.5 border ${
                        isUrgent
                          ? 'bg-[#fdf0f0] text-[#D94B4B] border-[#D94B4B]/30'
                          : 'bg-[#edf8f2] text-[#26965B] border-[#26965B]/30'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isUrgent ? 'bg-[#D94B4B] animate-ping' : 'bg-[#26965B]'
                        }`}
                      />
                      <span>{dest.openBays} {t.landing.baysFree}</span>
                    </span>
                  </div>

                  {/* Destination Names */}
                  <div className="absolute bottom-3 left-4 right-4 text-left">
                    <span className="text-[11px] text-[#C6A15B] font-bold block drop-shadow-xs">
                      {dest.marathiName}
                    </span>
                    <h3 className="text-[18px] font-bold text-[#FFFDF8] font-serif leading-tight mt-0.5 group-hover:text-[#C6A15B] transition-colors flex items-center justify-between">
                      <span>{language === 'mr' ? dest.marathiName || dest.name : dest.name}</span>
                      <span className="text-[10px] font-sans font-bold text-[#C6A15B] opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-2 py-0.5 rounded-full">
                        {t.landing.viewDetailsPrompt}
                      </span>
                    </h3>
                  </div>
                </div>

                {/* Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4 text-left">
                  <div
                    onClick={() => onViewLocationDetails && onViewLocationDetails(linkedHub, dest)}
                    className={onViewLocationDetails ? 'cursor-pointer' : ''}
                  >
                    <p className="text-[12px] text-[#7B2638] font-bold">
                      {dest.tagline}
                    </p>
                    <p className="text-[13px] text-[#5e5954] mt-1 leading-snug">
                      {dest.description}
                    </p>

                    {/* Proximity Pill */}
                    <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#292725] bg-[#F7F4EE] px-2.5 py-1.5 rounded-xl border border-[#EFECE4]">
                      <Navigation className="w-3.5 h-3.5 text-[#7B2638] flex-shrink-0" />
                      <span className="font-semibold">{dest.walkingDistance}</span>
                    </div>

                    {/* Highlight Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {dest.highlights.map((h, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F7F4EE] text-[#5e5954] border border-[#EFECE4]"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    {/* Real-time Nearby Amenities Indicator */}
                    {linkedHub.nearbyPlaces && linkedHub.nearbyPlaces.length > 0 && (
                      <div className="mt-2.5 text-[10px] text-[#5e5954] flex items-center justify-between bg-[#F7F4EE] px-2.5 py-1.5 rounded-xl border border-[#EFECE4] hover:border-[#C6A15B]/50 transition-colors">
                        <span className="font-bold text-[#7B2638] uppercase tracking-wider text-[9px]">{t.landing.nearby}:</span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5 text-[#D94B4B] font-bold">
                            <Hospital className="w-2.5 h-2.5" />
                            {linkedHub.nearbyPlaces.filter((p) => p.category === 'hospital').length} {t.hubCard.tabHospitals}
                          </span>
                          <span className="flex items-center gap-0.5 text-[#C6A15B] font-bold">
                            <Utensils className="w-2.5 h-2.5" />
                            {linkedHub.nearbyPlaces.filter((p) => p.category === 'food').length} {t.hubCard.tabFood}
                          </span>
                          <span className="flex items-center gap-0.5 text-[#7B2638] font-bold">
                            <Hotel className="w-2.5 h-2.5" />
                            {linkedHub.nearbyPlaces.filter((p) => p.category === 'stay').length} {t.hubCard.tabStay}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Direct Action Button */}
                  <div className="pt-2 border-t border-[#EFECE4] flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#5e5954] block">Hourly Rate</span>
                      <span className="text-[17px] font-extrabold text-[#7B2638]">
                        ₹{linkedHub.hourlyRate[selectedVehicle]}
                        <span className="text-[10px] font-normal text-[#5e5954]">{t.hubCard.perHour}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {onViewLocationDetails && (
                        <button
                          type="button"
                          onClick={() => onViewLocationDetails(linkedHub, dest)}
                          className="h-10 px-3 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[11px] font-bold flex items-center gap-1 border border-[#C6A15B]/30 transition-colors cursor-pointer"
                        >
                          <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
                          <span>{t.landing.nearby}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onDirectBookHub(linkedHub)}
                        className="h-10 px-3.5 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[12px] font-bold flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                      >
                        <span>{t.landing.reserveBay}</span>
                        <ChevronRight className="w-4 h-4 text-[#C6A15B]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SMART MOBILITY HIGHLIGHTS (THE 4 PILLARS) */}
      <section className="py-14 sm:py-20 bg-[#FFFDF8] border-y border-[#EFECE4]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#C6A15B] bg-[#C6A15B]/15 px-3 py-1 rounded-full">
              KMC Smart Mobility Pillars
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#7B2638] font-serif tracking-tight mt-2">
              Engineered for Kolhapur's Civic Flow
            </h2>
            <p className="text-sm sm:text-base text-[#5e5954] mt-2">
              Combining advanced IoT sensor telemetry with cultural respect for the historic town center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#EFECE4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center mb-4 shadow-sm">
                  <Sparkles className="w-6 h-6 text-[#C6A15B]" />
                </div>
                <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                  AI Aarti Rush Forecast
                </h3>
                <p className="text-[13px] text-[#5e5954] mt-2 leading-relaxed">
                  Real-time neural network predicts crowd spikes during 6:30 PM Ambabai Aarti and temple festivals, guaranteeing your bay in advance.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-[#26965B]">
                • 88% Predictive Accuracy
              </span>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#EFECE4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center mb-4 shadow-sm">
                  <Bus className="w-6 h-6 text-[#C6A15B]" />
                </div>
                <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                  Free Temple E-Shuttle
                </h3>
                <p className="text-[13px] text-[#5e5954] mt-2 leading-relaxed">
                  Park at South Gate Smart Lot and enjoy 100% free eco-friendly battery e-rickshaws directly to the Ambabai Mahadwar gate.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-[#7B2638]">
                • Included in Every Ticket
              </span>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#EFECE4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center mb-4 shadow-sm">
                  <Zap className="w-6 h-6 text-[#C6A15B]" />
                </div>
                <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                  60kW DC Fast EV Hubs
                </h3>
                <p className="text-[13px] text-[#5e5954] mt-2 leading-relaxed">
                  Charge your electric vehicle in under 35 minutes while enjoying a lakeside walk along the scenic Rankala promenade.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-[#26965B]">
                • CCS2 & Type-2 Plugs
              </span>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#EFECE4] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center mb-4 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-[#C6A15B]" />
                </div>
                <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                  KMC FastTag & Dynamic QR
                </h3>
                <p className="text-[13px] text-[#5e5954] mt-2 leading-relaxed">
                  Zero wait-time entrance barrier. Seamless RFID sensor reads your plate or dynamic QR pass for auto boom-barrier lifting.
                </p>
              </div>
              <span className="mt-4 text-[11px] font-bold text-[#7B2638]">
                • Cashless & Paperless
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-5xl mx-auto w-full text-center">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7B2638]">
          Simple 3-Step Process
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#7B2638] font-serif mt-1">
          How to Park in Kolhapur
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-left">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col items-start">
            <span className="w-8 h-8 rounded-full bg-[#7B2638] text-[#FFFDF8] font-bold text-sm flex items-center justify-center mb-3">
              1
            </span>
            <h4 className="text-[16px] font-bold text-[#7B2638]">
              Select Destination
            </h4>
            <p className="text-[13px] text-[#5e5954] mt-1.5 leading-snug">
              Choose your destination (Mahalaxmi Temple, Rankala, New Palace) and pick 2-Wheeler, 4-Wheeler, or EV.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col items-start">
            <span className="w-8 h-8 rounded-full bg-[#C6A15B] text-[#FFFDF8] font-bold text-sm flex items-center justify-center mb-3">
              2
            </span>
            <h4 className="text-[16px] font-bold text-[#7B2638]">
              Reserve Your Bay
            </h4>
            <p className="text-[13px] text-[#5e5954] mt-1.5 leading-snug">
              Pick your preferred covered or EV slot on the live matrix and get an instant digital KMC municipal pass.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col items-start">
            <span className="w-8 h-8 rounded-full bg-[#26965B] text-[#FFFDF8] font-bold text-sm flex items-center justify-center mb-3">
              3
            </span>
            <h4 className="text-[16px] font-bold text-[#7B2638]">
              Scan & Glide In
            </h4>
            <p className="text-[13px] text-[#5e5954] mt-1.5 leading-snug">
              Boom barrier automatically opens via FastTag or QR scan. Hop onto the free temple shuttle to your darshan.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-[#7B2638] via-[#5e1c2a] to-[#7B2638] p-8 sm:p-12 text-[#FFFDF8] text-center relative overflow-hidden shadow-2xl border border-[#C6A15B]/40">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#C6A15B] bg-[#FFFDF8]/10 px-3 py-1 rounded-full">
              Kolhapur Municipal Corporation (KMC)
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif mt-3 leading-tight">
              Ready to Experience Stress-Free Parking in Kolhapur?
            </h2>
            <p className="text-sm sm:text-base text-[#FFFDF8]/80 mt-3">
              Join thousands of residents and tourists who reserve their parking spot ahead of time.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
              <button
                type="button"
                onClick={onFindParkingClick}
                className="h-12 px-6 rounded-xl bg-[#C6A15B] hover:bg-[#a9833e] text-[#292725] font-extrabold text-sm shadow-lg active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Find Parking Now</span>
                <ArrowRight className="w-4 h-4 text-[#292725]" />
              </button>
              <button
                type="button"
                onClick={onGetStartedClick}
                className="h-12 px-6 rounded-xl bg-transparent hover:bg-white/10 text-[#FFFDF8] font-bold text-sm border border-[#FFFDF8]/40 transition-colors cursor-pointer"
              >
                Citizen Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* OFFICIAL KMC FOOTER */}
      <footer className="bg-[#FFFDF8] border-t border-[#EFECE4] py-10 px-4 sm:px-6 text-left text-[12px] text-[#5e5954]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center font-serif font-black text-sm">
                क
              </div>
              <span className="font-extrabold text-[15px] text-[#7B2638] font-serif">
                ParkKolhapur AI
              </span>
            </div>
            <p className="text-[#5e5954] leading-relaxed">
              Official smart municipal parking platform authorized by Kolhapur Municipal Corporation (KMC) under the Smart City Mission.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-[#292725] uppercase tracking-wider text-[11px] mb-3">
              Key Destinations
            </h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => { onSelectDestination('Mahalaxmi Temple'); onFindParkingClick(); }} className="hover:text-[#7B2638] cursor-pointer">Mahalaxmi Temple Parking</button></li>
              <li><button onClick={() => { onSelectDestination('Rankala Lake'); onFindParkingClick(); }} className="hover:text-[#7B2638] cursor-pointer">Rankala Lake Promenade</button></li>
              <li><button onClick={() => { onSelectDestination('New Palace'); onFindParkingClick(); }} className="hover:text-[#7B2638] cursor-pointer">New Palace Tourist Hub</button></li>
              <li><button onClick={() => { onSelectDestination('Panhala Fort'); onFindParkingClick(); }} className="hover:text-[#7B2638] cursor-pointer">Panhala Fort Transit</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#292725] uppercase tracking-wider text-[11px] mb-3">
              Municipal Services
            </h4>
            <ul className="space-y-1.5">
              <li>Free Temple E-Shuttle Corridor</li>
              <li>FastTag Barrier Telemetry</li>
              <li>EV Charging Station Finder</li>
              <li>Host Private Land (Owner Hub)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#292725] uppercase tracking-wider text-[11px] mb-3">
              KMC Transit Control
            </h4>
            <p className="leading-relaxed">
              Bhavani Mandap Road, Municipal HQ, Kolhapur 416012.
            </p>
            <p className="mt-2 font-bold text-[#7B2638] flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-[#C6A15B]" />
              Helpline: 1800-233-0009
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[#EFECE4] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <span>© 2026 Kolhapur Municipal Corporation (KMC). All rights reserved.</span>
          <span className="text-[#C6A15B] font-medium">Smart Parking • Smarter Kolhapur</span>
        </div>
      </footer>
    </div>
  );
};