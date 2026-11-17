import React from 'react';
import { Search, Mic, SlidersHorizontal, Sparkles } from 'lucide-react';
import { LANDMARKS } from '../data/mockData';

interface LandmarkFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLandmark: string;
  onSelectLandmark: (landmark: string) => void;
  onOpenFilterDrawer: () => void;
  onVoiceSearch: () => void;
  isListening: boolean;
}

export const LandmarkFilter: React.FC<LandmarkFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedLandmark,
  onSelectLandmark,
  onOpenFilterDrawer,
  onVoiceSearch,
  isListening,
}) => {
  return (
    <div className="w-full bg-[#22070E]/80 backdrop-blur-md border-b border-[#C6A15B]/20 py-3.5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-3">
        
        {/* Search Row */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#C6A15B]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by landmark, temple gate, or Kolhapur street..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#1A0A0F] border border-[#C6A15B]/30 text-xs sm:text-sm text-[#FFF9EF] placeholder-[#B8ADA0] focus:outline-none focus:border-[#C6A15B] focus:ring-1 focus:ring-[#C6A15B] transition-all shadow-inner"
            />
            {/* Voice Search Button */}
            <button
              type="button"
              onClick={onVoiceSearch}
              title="Voice Search"
              className={`absolute right-2 top-2 w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isListening
                  ? 'bg-[#EF4444] text-white animate-pulse'
                  : 'bg-[#3D101C] text-[#C6A15B] hover:bg-[#651E2B]'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Drawer Toggle */}
          <button
            type="button"
            onClick={onOpenFilterDrawer}
            title="Filter Criteria"
            className="h-11 px-3.5 rounded-2xl bg-[#3D101C] hover:bg-[#651E2B] border border-[#C6A15B]/30 text-[#FFF9EF] flex items-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-sm flex-shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#C6A15B]" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Horizontal Landmark Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#C6A15B] whitespace-nowrap pl-0.5">
            Destinations:
          </span>
          {LANDMARKS.map((lm) => {
            const isSelected = selectedLandmark === lm.name || (lm.id === 'all' && selectedLandmark === 'all');
            return (
              <button
                key={lm.id}
                type="button"
                onClick={() => onSelectLandmark(lm.name === 'All Kolhapur' ? 'all' : lm.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#C6A15B] text-[#22070E] border-[#C6A15B] shadow-md font-extrabold scale-[1.02]'
                    : 'bg-[#1A0A0F] text-[#E8DECE] border-white/10 hover:border-[#C6A15B]/40 hover:text-[#FFF9EF]'
                }`}
              >
                {lm.name}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
