import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Sparkles,
  Zap,
  ShieldCheck,
  Clock,
  ArrowRight,
  Car,
  Bike,
  Search,
  CheckCircle2,
  Navigation,
  Bus,
  Activity,
  Layers,
  HeartHandshake,
  Award,
  ChevronRight,
  PhoneCall,
} from 'lucide-react';
import { ParkingHub, VehicleType } from '../types';
import { KOLHAPUR_STATS } from '../data/mockData';

interface LandingPageProps {
  hubs: ParkingHub[];
  onExploreHubs: () => void;
  onSelectHub: (hub: ParkingHub) => void;
  onOpenMap: () => void;
  onOpenShuttle: () => void;
  onOpenAuth: () => void;
  onSearchChange: (query: string) => void;
  onLandmarkSelect: (landmark: string) => void;
  onVehicleSelect: (type: VehicleType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  hubs,
  onExploreHubs,
  onSelectHub,
  onOpenMap,
  onOpenShuttle,
  onOpenAuth,
  onSearchChange,
  onLandmarkSelect,
  onVehicleSelect,
}) => {
  const [selectedHeroLandmark, setSelectedHeroLandmark] = useState('Mahalaxmi Temple');
  const [selectedHeroVehicle, setSelectedHeroVehicle] = useState<VehicleType>('car');
  const [heroSearchText, setHeroSearchText] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearchText) onSearchChange(heroSearchText);
    onLandmarkSelect(selectedHeroLandmark);
    onVehicleSelect(selectedHeroVehicle);
    onExploreHubs();
  };

  const heritageSpotlights = [
    {
      title: 'Shree Ambabai Mahalaxmi Temple',
      subtitle: '7th-Century Chalukyan Sacred Mandir',
      desc: 'Kolhapur’s spiritual crown. Guaranteed reserved parking at South Gate with direct access to the temple corridor and complimentary battery e-shuttles.',
      image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80',
      badge: 'Free E-Shuttle Available',
      openSlots: '18 bays free',
      hubId: 'hub-mahalaxmi-south',
      tag: 'Spiritual Heritage',
    },
    {
      title: 'New Palace (Chhatrapati Shahu Palace)',
      subtitle: 'Black Polished Stone Indo-Saracenic Marvel',
      desc: 'Built in 1884, the royal residence of the Chhatrapati rulers. Expansive avenue parking with EV charging and direct ticket access to the Royal Museum.',
      image: 'https://images.unsplash.com/photo-1599831104326-ed3f58721c5f?auto=format&fit=crop&w=800&q=80',
      badge: 'Royal Museum Grounds',
      openSlots: '54 bays free',
      hubId: 'hub-new-palace-royal',
      tag: 'Royal Residence',
    },
    {
      title: 'Rankala Lake & Shalini Palace',
      subtitle: 'Historic Waterbody & Sunset Promenade',
      desc: 'Constructed by Chhatrapati Shahu Maharaj. Enjoy the scenic lake promenade, Sandhya Math, and Kolhapuri food street with 60kW DC fast charging.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      badge: 'DC Fast EV Charging',
      openSlots: '34 bays free',
      hubId: 'hub-rankala-chowpatty',
      tag: 'Lakeside Leisure',
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#1A0A0F] text-[#FFF9EF] overflow-hidden">
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glow and subtle Maratha motif graphics */}
        <div className="absolute inset-0 z-0 opacity-25 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#651E2B] via-[#3D101C] to-[#1A0A0F]" />
        
        {/* Decorative ambient gold orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#C6A15B]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-[#651E2B]/25 blur-3xl pointer-events-none" />

        {/* Hero Content Wrapper */}
        <div className="relative z-10 max-w-6xl w-full mx-auto flex flex-col items-center text-center">
          
          {/* Top Royal Emblem Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D101C]/80 border border-[#C6A15B]/40 shadow-lg shadow-[#651E2B]/30 mb-6 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[12px] font-bold text-[#C6A15B] tracking-wider uppercase">
              Kolhapur Municipal Corporation • Smart Mobility Corridor
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 className="font-royal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#FFF9EF] leading-[1.1] max-w-4xl drop-shadow-md">
            Smart Parking for the <br />
            <span className="gold-shimmer font-black">Royal City of Kolhapur</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#E8DECE] max-w-2xl font-light leading-relaxed">
            Seamless real-time bay reservations at <span className="text-[#C6A15B] font-semibold">Mahalaxmi Temple</span>, <span className="text-[#C6A15B] font-semibold">New Palace</span>, and <span className="text-[#C6A15B] font-semibold">Rankala Lake</span>. Powered by AI occupancy forecasting & free temple e-shuttle transit.
          </p>

          {/* ========================================================
              QUICK PARKING SEARCH WIDGET
              ======================================================== */}
          <div className="w-full max-w-4xl mt-10 p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-[#3D101C]/90 to-[#22070E]/95 border border-[#C6A15B]/30 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleHeroSearch} className="flex flex-col gap-4">
              
              {/* Landmark selection pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-left">
                <span className="text-xs uppercase tracking-wider font-bold text-[#C6A15B] whitespace-nowrap pl-1">
                  Key Destination:
                </span>
                {[
                  { name: 'Mahalaxmi Temple', label: 'Ambabai Temple' },
                  { name: 'New Palace', label: 'New Palace' },
                  { name: 'Rankala Lake', label: 'Rankala Lake' },
                  { name: 'Bhavani Mandap', label: 'Bhavani Mandap' },
                  { name: 'Central Bus Stand (CBS)', label: 'CBS Bus Stand' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setSelectedHeroLandmark(item.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      selectedHeroLandmark === item.name
                        ? 'bg-[#C6A15B] text-[#3D101C] border-[#C6A15B] shadow-md font-bold'
                        : 'bg-[#292725]/60 text-[#E8DECE] border-white/10 hover:border-[#C6A15B]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Main Search Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                
                {/* Search Text Input */}
                <div className="md:col-span-5 relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-[#C6A15B]" />
                  </div>
                  <input
                    type="text"
                    value={heroSearchText}
                    onChange={(e) => setHeroSearchText(e.target.value)}
                    placeholder={`Search bay near ${selectedHeroLandmark}...`}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#1A0A0F]/80 border border-[#C6A15B]/25 text-[#FFF9EF] placeholder-[#B8ADA0] text-sm focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all"
                  />
                </div>

                {/* Vehicle Class Switcher */}
                <div className="md:col-span-4 flex items-center justify-between p-1 rounded-2xl bg-[#1A0A0F]/80 border border-[#C6A15B]/25">
                  {[
                    { id: 'car', label: 'Car', icon: Car },
                    { id: 'bike', label: '2-Wheeler', icon: Bike },
                    { id: 'ev', label: 'EV Station', icon: Zap },
                  ].map((v) => {
                    const Icon = v.icon;
                    const isActive = selectedHeroVehicle === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedHeroVehicle(v.id as VehicleType)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#651E2B] text-[#FFF9EF] shadow-sm border border-[#C6A15B]/40'
                            : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C6A15B]' : ''}`} />
                        <span>{v.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Submit Action Button */}
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-2xl gold-gradient-bg text-[#22070E] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#C6A15B]/25 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Find Available Bay</span>
                  </button>
                </div>
              </div>

              {/* Sub features bar inside widget */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs text-[#B8ADA0]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span>Real-time sensor telemetry via KMC edge nodes</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onOpenMap}
                    className="text-[#C6A15B] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>View Kolhapur Interactive Map</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreHubs}
              className="px-6 py-3 rounded-full bg-[#651E2B] hover:bg-[#7E2837] border border-[#C6A15B]/40 text-[#FFF9EF] font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#651E2B]/40 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#C6A15B]" />
              <span>Explore All Live Hubs</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenShuttle}
              className="px-6 py-3 rounded-full bg-[#292725]/80 hover:bg-[#3D3A37] border border-white/10 text-[#E8DECE] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Bus className="w-4 h-4 text-[#C6A15B]" />
              <span>Free Ambabai Darshan E-Shuttle</span>
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================
          LIVE MUNICIPAL STATS STRIP
          ======================================================== */}
      <section className="relative z-10 w-full bg-[#22070E] border-y border-[#C6A15B]/20 py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-[#3D101C]/50 border border-white/5">
            <div className="font-royal text-2xl sm:text-3xl font-black text-[#C6A15B]">
              {KOLHAPUR_STATS.totalBaysMonitored}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#B8ADA0] mt-1 font-bold">
              Smart Bays Monitored
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#3D101C]/50 border border-white/5">
            <div className="font-royal text-2xl sm:text-3xl font-black text-[#10B981]">
              {KOLHAPUR_STATS.pilgrimsServedDaily}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#B8ADA0] mt-1 font-bold">
              Daily Pilgrims Served
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#3D101C]/50 border border-white/5">
            <div className="font-royal text-2xl sm:text-3xl font-black text-[#C6A15B]">
              {KOLHAPUR_STATS.kmcEdgeNodes}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#B8ADA0] mt-1 font-bold">
              KMC Edge Nodes Active
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#3D101C]/50 border border-white/5">
            <div className="font-royal text-2xl sm:text-3xl font-black text-[#10B981]">
              {KOLHAPUR_STATS.averageParkingTimeSavedMin}
            </div>
            <div className="text-xs uppercase tracking-wider text-[#B8ADA0] mt-1 font-bold">
              Avg. Time Saved Per Visit
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          KOLHAPUR HERITAGE SPOTLIGHTS SECTION
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6A15B] px-3 py-1 rounded-full bg-[#3D101C] border border-[#C6A15B]/30">
            Heritage & Smart Mobility
          </span>
          <h2 className="font-royal text-3xl sm:text-4xl font-extrabold text-[#FFF9EF] mt-3">
            Iconic Destinations of Kolhapur
          </h2>
          <p className="text-[#E8DECE] text-sm sm:text-base mt-3 leading-relaxed">
            Experience Kolhapur’s sacred spirituality, Maratha royal architecture, and tranquil lakes without parking hassles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {heritageSpotlights.map((spot) => {
            const matchedHub = hubs.find((h) => h.id === spot.hubId);
            return (
              <div
                key={spot.title}
                className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/25 shadow-xl hover:border-[#C6A15B] transition-all duration-300 flex flex-col"
              >
                {/* Image Box */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#22070E] via-transparent to-black/30" />
                  
                  {/* Tag badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold bg-[#1A0A0F]/90 text-[#C6A15B] border border-[#C6A15B]/40 backdrop-blur-md">
                    {spot.tag}
                  </span>

                  {/* Availability pill */}
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#10B981]/90 text-white flex items-center gap-1 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    {spot.openSlots}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#C6A15B]">
                      {spot.subtitle}
                    </span>
                    <h3 className="font-royal text-xl font-bold text-[#FFF9EF] mt-1 leading-snug">
                      {spot.title}
                    </h3>
                    <p className="text-[#B8ADA0] text-xs leading-relaxed mt-2.5">
                      {spot.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#E8DECE]">
                      {spot.badge}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (matchedHub) onSelectHub(matchedHub);
                        else onExploreHubs();
                      }}
                      className="px-4 py-2 rounded-xl bg-[#651E2B] hover:bg-[#7E2837] text-xs font-bold text-[#FFF9EF] border border-[#C6A15B]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Reserve Bay</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS (4-STEP CORRIDOR GUIDE)
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#22070E] border-t border-[#C6A15B]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6A15B] px-3 py-1 rounded-full bg-[#3D101C] border border-[#C6A15B]/30">
              Pilgrim & Citizen Journey
            </span>
            <h2 className="font-royal text-3xl sm:text-4xl font-extrabold text-[#FFF9EF] mt-3">
              How Smart Parking Works
            </h2>
            <p className="text-[#E8DECE] text-sm sm:text-base mt-2">
              Four easy steps to a stress-free visit in Kolhapur City.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Search & Choose Bay',
                desc: 'Select your vehicle class (Car, 2-Wheeler, EV) and find live available parking bays near your destination.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Instant AI Reservation',
                desc: 'Reserve a guaranteed parking slot with real-time dynamic pricing, covered shade, or EV fast charging options.',
                icon: CheckCircle2,
              },
              {
                step: '03',
                title: 'Contactless QR Pass',
                desc: 'Scan your municipal QR pass at the automated KMC barrier gate for instant zero-contact entry.',
                icon: Layers,
              },
              {
                step: '04',
                title: 'Free Heritage E-Shuttle',
                desc: 'Board the free battery e-rickshaw shuttle directly to the Ambabai Temple Mahadwar gate with your pass.',
                icon: Bus,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="p-6 rounded-3xl bg-[#3D101C]/60 border border-[#C6A15B]/25 flex flex-col justify-between relative overflow-hidden"
                >
                  <span className="font-royal text-4xl font-black text-[#C6A15B]/20 absolute top-4 right-4">
                    {item.step}
                  </span>
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#651E2B] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] mb-5 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-royal text-lg font-bold text-[#FFF9EF] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#B8ADA0] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          TECHNOLOGY & SMART-CITY HIGHLIGHTS
          ======================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#C6A15B] px-3 py-1 rounded-full bg-[#3D101C] border border-[#C6A15B]/30">
              Modern Municipal Infrastructure
            </span>
            <h2 className="font-royal text-3xl sm:text-4xl font-extrabold text-[#FFF9EF] leading-tight">
              State-of-the-Art KMC Edge IoT & AI Forecasting
            </h2>
            <p className="text-[#E8DECE] text-sm leading-relaxed">
              ParkKolhapur AI integrates directly with Kolhapur Municipal Corporation's edge sensor nodes to give you live sub-second parking bay status, surge warnings, and clean sustainable temple transport.
            </p>

            <div className="space-y-4 pt-2">
              {[
                {
                  title: 'Edge Node Telemetry',
                  desc: 'Ultrasonic overhead bay sensors with 12ms live sync to prevent circling for parking.',
                  icon: Activity,
                },
                {
                  title: 'Aarti Rush Predictive AI',
                  desc: 'Machine learning algorithms predict temple surge rushes ahead of evening Ambabai aarti.',
                  icon: Sparkles,
                },
                {
                  title: 'Green Temple Corridor',
                  desc: 'Fleet of 16 zero-emission battery e-rickshaws dedicated to pilgrims and elderly citizens.',
                  icon: Bus,
                },
              ].map((feat) => {
                const Icon = feat.icon;
                return (
                  <div key={feat.title} className="flex items-start gap-4 p-3.5 rounded-2xl bg-[#3D101C]/40 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-[#651E2B] border border-[#C6A15B]/30 flex items-center justify-center flex-shrink-0 text-[#C6A15B]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#FFF9EF]">{feat.title}</h4>
                      <p className="text-xs text-[#B8ADA0] mt-0.5">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAuth}
                className="px-6 py-3 rounded-full gold-gradient-bg text-[#22070E] font-bold text-sm shadow-lg hover:brightness-105 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Create Citizen or Host Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-[#C6A15B]/30 bg-gradient-to-b from-[#3D101C] to-[#1A0A0F] p-6 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                  <span className="text-xs font-bold text-[#C6A15B] ml-2">KMC Edge Command Live Status</span>
                </div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30">
                  Online
                </span>
              </div>

              {/* Mock Edge Node Status Rows */}
              <div className="space-y-3 mt-5">
                {[
                  { name: 'Mahalaxmi South Gate Terminal', total: 40, free: 18, status: 'Active' },
                  { name: 'New Palace Heritage Grounds', total: 85, free: 54, status: 'Active' },
                  { name: 'Rankala Promenade DC Fast Hub', total: 60, free: 34, status: 'Active' },
                  { name: 'Bhavani Mandap Historic Lot', total: 25, free: 4, status: 'High Occupancy' },
                ].map((item) => (
                  <div key={item.name} className="p-3.5 rounded-2xl bg-[#1A0A0F]/80 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#FFF9EF]">{item.name}</div>
                      <div className="text-[11px] text-[#B8ADA0]">{item.free} bays available of {item.total}</div>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.free > 10 ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
                      }`}>
                        {item.free > 10 ? 'Available' : 'Filling Fast'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-[#651E2B]/40 border border-[#C6A15B]/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#C6A15B] uppercase block">Need Help in Kolhapur?</span>
                  <span className="text-xs text-[#FFF9EF]">KMC Smart Parking Pilgrim Helpline</span>
                </div>
                <a
                  href="tel:18002331234"
                  className="px-3.5 py-1.5 rounded-xl bg-[#C6A15B] text-[#22070E] font-bold text-xs flex items-center gap-1.5 shadow"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>1800-KMC-PARK</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          ROYAL KOLHAPUR FOOTER
          ======================================================== */}
      <footer className="bg-[#15060A] border-t border-[#C6A15B]/25 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Emblem */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-[#22070E] font-black font-royal text-lg shadow-md">
                K
              </div>
              <div>
                <span className="font-royal text-lg font-bold text-[#FFF9EF] block leading-none">
                  ParkKolhapur AI
                </span>
                <span className="text-[11px] text-[#C6A15B] font-semibold">
                  Kolhapur Municipal Corporation
                </span>
              </div>
            </div>
            <p className="text-xs text-[#B8ADA0] leading-relaxed">
              Official smart parking & transit corridor platform for the historic city of Kolhapur, Maharashtra. Preserving sacred heritage with cutting-edge technology.
            </p>
          </div>

          {/* Key Heritage Hubs */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#C6A15B] uppercase tracking-wider">
              Heritage Hubs
            </h4>
            <ul className="space-y-2 text-xs text-[#B8ADA0]">
              <li><button type="button" onClick={onExploreHubs} className="hover:text-[#FFF9EF] transition-colors">Mahalaxmi Temple South Gate</button></li>
              <li><button type="button" onClick={onExploreHubs} className="hover:text-[#FFF9EF] transition-colors">New Palace Royal Grounds</button></li>
              <li><button type="button" onClick={onExploreHubs} className="hover:text-[#FFF9EF] transition-colors">Rankala Lake Chowpatty</button></li>
              <li><button type="button" onClick={onExploreHubs} className="hover:text-[#FFF9EF] transition-colors">Bhavani Mandap Heritage Lot</button></li>
              <li><button type="button" onClick={onExploreHubs} className="hover:text-[#FFF9EF] transition-colors">Central Bus Stand (CBS) Hub</button></li>
            </ul>
          </div>

          {/* Quick Portals */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#C6A15B] uppercase tracking-wider">
              Citizen & Host Portals
            </h4>
            <ul className="space-y-2 text-xs text-[#B8ADA0]">
              <li><button type="button" onClick={onOpenAuth} className="hover:text-[#FFF9EF] transition-colors">Citizen Login & Passes</button></li>
              <li><button type="button" onClick={onOpenAuth} className="hover:text-[#FFF9EF] transition-colors">Private Plot Monetization</button></li>
              <li><button type="button" onClick={onOpenAuth} className="hover:text-[#FFF9EF] transition-colors">KMC Municipal Admin</button></li>
              <li><button type="button" onClick={onOpenShuttle} className="hover:text-[#FFF9EF] transition-colors">Ambabai Darshan E-Shuttle</button></li>
              <li><button type="button" onClick={onOpenMap} className="hover:text-[#FFF9EF] transition-colors">Interactive City Map</button></li>
            </ul>
          </div>

          {/* Helpline & Municipal Offices */}
          <div className="space-y-3">
            <h4 className="font-royal text-sm font-bold text-[#C6A15B] uppercase tracking-wider">
              KMC Smart City
            </h4>
            <div className="text-xs text-[#B8ADA0] space-y-1.5">
              <p>Main Municipal Building, Bhausingji Road, Kolhapur - 416002</p>
              <p className="text-[#C6A15B] font-semibold">Toll-Free Helpline: 1800 233 1234</p>
              <p>Email: smartmobility@kolhapurcorporation.gov.in</p>
              <div className="pt-2">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-[#651E2B] text-[#FFF9EF] font-bold">
                  Government of Maharashtra
                </span>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#B8ADA0] gap-4">
          <p>© 2026 Kolhapur Municipal Corporation (KMC). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Smart City Kolhapur</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
