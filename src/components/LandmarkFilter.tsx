import React from 'react';
import { Search, Mic, SlidersHorizontal, Landmark, Waves, Bus, Shield, Castle, ShoppingBag } from 'lucide-react';
import { LANDMARKS } from '../data/mockData';

interface LandmarkFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedLandmark: string;
  onSelectLandmark: (landmark: string) => void;
  onOpenFilterDrawer: () => void;
  onVoiceSearch: () => void;
  isListening?: boolean;
}

export const LandmarkFilter: React.FC<LandmarkFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedLandmark,
  onSelectLandmark,
  onOpenFilterDrawer,
  onVoiceSearch,
  isListening = false,
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'Mahalaxmi Temple':
        return <Landmark className="w-3.5 h-3.5" />;
      case 'Rankala Lake':
        return <Waves className="w-3.5 h-3.5 text-[#4edea3]" />;
      case 'Central Bus Stand (CBS)':
        return <Bus className="w-3.5 h-3.5 text-[#ffb95f]" />;
      case 'Bhavani Mandap':
        return <Shield className="w-3.5 h-3.5 text-[#4edea3]" />;
      case 'New Palace':
        return <Castle className="w-3.5 h-3.5 text-[#ffb95f]" />;
      case 'Rajampuri Bazaar':
        return <ShoppingBag className="w-3.5 h-3.5 text-[#4edea3]" />;
      default:
        return <Landmark className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="px-4 pt-2 pb-3 bg-[#0b1c30]/70 backdrop-blur-md border-b border-white/5">
      {/* Search Bar */}
      <div className="relative w-full">
        <div className="flex items-center h-12 rounded-xl bg-[#102034] px-3 shadow-md border border-white/5 focus-within:border-[#38bdf8]/50 transition-colors">
          <Search className="w-5 h-5 text-[#ffb95f] mr-2 flex-shrink-0" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search temple gates, bazaars, CBS, lakes..."
            className="w-full bg-transparent text-[14px] text-[#d3e4fe] placeholder-[#8a9bb5] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-[#8a9bb5] hover:text-white px-1.5 py-0.5"
            >
              ✕
            </button>
          )}
          <button
            type="button"
            onClick={onVoiceSearch}
            aria-label="Voice Search"
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              isListening
                ? 'bg-[#ffb95f] text-[#472a00] animate-pulse'
                : 'text-[#c6c6cd] hover:text-[#ffb95f] hover:bg-[#26364a]'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onOpenFilterDrawer}
            aria-label="Open Filter Drawer"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#26364a] text-[#ffb95f] ml-1 hover:bg-[#ffb95f] hover:text-[#472a00] transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Landmark Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar text-nowrap">
        {LANDMARKS.filter((l) => l.id !== 'all').map((landmark) => {
          const isActive = selectedLandmark === landmark.id;
          return (
            <button
              key={landmark.id}
              type="button"
              onClick={() => onSelectLandmark(isActive ? 'all' : landmark.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#ffb95f] text-[#472a00] shadow-sm'
                  : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a] border border-white/5'
              }`}
            >
              {getIcon(landmark.id)}
              <span>{landmark.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
