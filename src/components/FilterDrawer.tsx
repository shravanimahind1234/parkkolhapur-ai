import React, { useState } from 'react';
import { X, Sliders, RotateCcw, Check, Zap, Umbrella, ShieldCheck } from 'lucide-react';

export interface FilterOptions {
  maxDistanceMeters: number;
  evOnly: boolean;
  coveredOnly: boolean;
  municipalOnly: boolean;
  maxPrice: number;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (newFilters: FilterOptions) => void;
  onResetFilters: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  if (!isOpen) return null;

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border-t sm:border border-[#C6A15B]/35 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#FFF9EF]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#C6A15B]" />
            <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF]">
              Refine Parking Hubs
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs">
          
          {/* Max Distance Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-[#E8DECE]">Maximum Walking Distance</span>
              <span className="font-black text-[#C6A15B]">
                {localFilters.maxDistanceMeters >= 1000
                  ? `${(localFilters.maxDistanceMeters / 1000).toFixed(1)} km`
                  : `${localFilters.maxDistanceMeters}m`}
              </span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={localFilters.maxDistanceMeters}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  maxDistanceMeters: Number(e.target.value),
                }))
              }
              className="w-full accent-[#C6A15B] cursor-pointer"
            />
          </div>

          {/* Max Hourly Rate */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-bold text-[#E8DECE]">Maximum Hourly Rate</span>
              <span className="font-black text-[#C6A15B]">₹{localFilters.maxPrice} / hr</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={localFilters.maxPrice}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  maxPrice: Number(e.target.value),
                }))
              }
              className="w-full accent-[#C6A15B] cursor-pointer"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#C6A15B] block">
              Facility Preferences
            </span>

            {/* EV Charger */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#1A0A0F] border border-white/5 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#10B981]" />
                <div>
                  <span className="font-bold text-[#FFF9EF] block">EV Charging Station Only</span>
                  <span className="text-[10px] text-[#B8ADA0]">60kW DC Fast Chargers</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={localFilters.evOnly}
                onChange={(e) =>
                  setLocalFilters((prev) => ({ ...prev, evOnly: e.target.checked }))
                }
                className="w-4 h-4 accent-[#C6A15B] rounded cursor-pointer"
              />
            </label>

            {/* Covered Shade */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#1A0A0F] border border-white/5 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Umbrella className="w-4 h-4 text-[#C6A15B]" />
                <div>
                  <span className="font-bold text-[#FFF9EF] block">Covered Shade Bays Only</span>
                  <span className="text-[10px] text-[#B8ADA0]">Solar canopy or covered parkade</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={localFilters.coveredOnly}
                onChange={(e) =>
                  setLocalFilters((prev) => ({ ...prev, coveredOnly: e.target.checked }))
                }
                className="w-4 h-4 accent-[#C6A15B] rounded cursor-pointer"
              />
            </label>

            {/* Municipal Approved */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-[#1A0A0F] border border-white/5 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                <div>
                  <span className="font-bold text-[#FFF9EF] block">KMC Municipal Approved</span>
                  <span className="text-[10px] text-[#B8ADA0]">Official city-metered lots</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={localFilters.municipalOnly}
                onChange={(e) =>
                  setLocalFilters((prev) => ({ ...prev, municipalOnly: e.target.checked }))
                }
                className="w-4 h-4 accent-[#C6A15B] rounded cursor-pointer"
              />
            </label>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#22070E] border-t border-white/10 flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 py-2.5 rounded-xl bg-[#1A0A0F] hover:bg-[#2A0A12] text-xs font-bold text-[#B8ADA0] hover:text-[#FFF9EF] border border-white/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-2.5 rounded-xl gold-gradient-bg text-[#22070E] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply Filters</span>
          </button>
        </div>

      </div>
    </div>
  );
};
