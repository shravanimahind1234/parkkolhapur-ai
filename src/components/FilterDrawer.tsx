import React from 'react';
import { X, Check } from 'lucide-react';

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
  onApplyFilters: (filters: FilterOptions) => void;
  onResetFilters: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  if (!isOpen) return null;

  const [tempFilters, setTempFilters] = React.useState<FilterOptions>(filters);

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleReset = () => {
    onResetFilters();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0b1c30] border-t border-white/10 rounded-t-3xl shadow-2xl overflow-hidden p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-[17px] font-bold text-[#d3e4fe]">
            Filter Parking Hubs
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b2b3f] text-[#c6c6cd] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Max Distance */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider block">
            Max Walking Distance
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[300, 600, 1500, 5000].map((dist) => (
              <button
                key={dist}
                type="button"
                onClick={() =>
                  setTempFilters((prev) => ({ ...prev, maxDistanceMeters: dist }))
                }
                className={`h-10 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                  tempFilters.maxDistanceMeters === dist
                    ? 'bg-[#ffb95f] text-[#472a00]'
                    : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a]'
                }`}
              >
                {dist >= 1000 ? `${dist / 1000} km` : `${dist}m`}
              </button>
            ))}
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="space-y-2.5">
          <label className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider block">
            Amenities & Criteria
          </label>

          {/* EV Only */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#102034] border border-white/5 cursor-pointer">
            <span className="text-[13px] text-[#d3e4fe] font-medium">
              EV Fast Charger Available
            </span>
            <input
              type="checkbox"
              checked={tempFilters.evOnly}
              onChange={(e) =>
                setTempFilters((prev) => ({ ...prev, evOnly: e.target.checked }))
              }
              className="w-5 h-5 accent-[#4edea3] cursor-pointer"
            />
          </label>

          {/* Covered Shade */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#102034] border border-white/5 cursor-pointer">
            <span className="text-[13px] text-[#d3e4fe] font-medium">
              Covered / Shaded Roof
            </span>
            <input
              type="checkbox"
              checked={tempFilters.coveredOnly}
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  coveredOnly: e.target.checked,
                }))
              }
              className="w-5 h-5 accent-[#4edea3] cursor-pointer"
            />
          </label>

          {/* Municipal Approved */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#102034] border border-white/5 cursor-pointer">
            <span className="text-[13px] text-[#d3e4fe] font-medium">
              KMC Municipal Approved Only
            </span>
            <input
              type="checkbox"
              checked={tempFilters.municipalOnly}
              onChange={(e) =>
                setTempFilters((prev) => ({
                  ...prev,
                  municipalOnly: e.target.checked,
                }))
              }
              className="w-5 h-5 accent-[#ffb95f] cursor-pointer"
            />
          </label>
        </div>

        {/* Max Hourly Rate */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[12px]">
            <span className="font-bold text-[#c6c6cd] uppercase tracking-wider">
              Max Hourly Budget
            </span>
            <span className="font-bold text-[#ffb95f]">
              Up to ₹{tempFilters.maxPrice}/hr
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={tempFilters.maxPrice}
            onChange={(e) =>
              setTempFilters((prev) => ({
                ...prev,
                maxPrice: Number(e.target.value),
              }))
            }
            className="w-full accent-[#ffb95f] cursor-pointer"
          />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="h-11 rounded-xl bg-[#1b2b3f] text-[#c6c6cd] hover:text-white text-[13px] font-bold transition-colors cursor-pointer"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="h-11 rounded-xl bg-[#ffb95f] text-[#472a00] hover:bg-[#ee9800] text-[13px] font-bold shadow-md transition-all cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
