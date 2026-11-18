import React from 'react';
import { X, SlidersHorizontal, ShieldCheck, Zap, Warehouse, RotateCcw } from 'lucide-react';

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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FFFDF8] border-t sm:border border-[#C6A15B]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#7B2638]" />
            <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
              Parking Filters
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Max Hourly Price Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4]">
          <div className="flex items-center justify-between text-[13px] font-bold text-[#292725]">
            <span>Max Hourly Rate</span>
            <span className="text-[#7B2638] text-[16px]">₹{filters.maxPrice}/hr</span>
          </div>
          <input
            type="range"
            min={10}
            max={60}
            step={5}
            value={filters.maxPrice}
            onChange={(e) =>
              onApplyFilters({ ...filters, maxPrice: Number(e.target.value) })
            }
            className="w-full accent-[#7B2638] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8a847e]">
            <span>₹10 (Budget)</span>
            <span>₹60 (Premium EV)</span>
          </div>
        </div>

        {/* Proximity / Distance Slider */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4]">
          <div className="flex items-center justify-between text-[13px] font-bold text-[#292725]">
            <span>Walking Distance</span>
            <span className="text-[#7B2638] text-[16px]">
              {(filters.maxDistanceMeters / 1000).toFixed(1)} km
            </span>
          </div>
          <input
            type="range"
            min={300}
            max={5000}
            step={100}
            value={filters.maxDistanceMeters}
            onChange={(e) =>
              onApplyFilters({ ...filters, maxDistanceMeters: Number(e.target.value) })
            }
            className="w-full accent-[#7B2638] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#8a847e]">
            <span>300m (Adjacent)</span>
            <span>5.0 km (Full City)</span>
          </div>
        </div>

        {/* Amenities Toggles */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-[#5e5954] block">
            Required Facilities
          </label>

          {/* EV Charger */}
          <label className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] flex items-center justify-between cursor-pointer hover:border-[#7B2638] transition-colors">
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-[#26965B]" />
              <span className="text-[13px] font-bold text-[#292725]">
                EV Fast Charging Required
              </span>
            </div>
            <input
              type="checkbox"
              checked={filters.evOnly}
              onChange={(e) =>
                onApplyFilters({ ...filters, evOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#7B2638] focus:ring-[#7B2638] cursor-pointer"
            />
          </label>

          {/* Covered Shade */}
          <label className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] flex items-center justify-between cursor-pointer hover:border-[#7B2638] transition-colors">
            <div className="flex items-center gap-2.5">
              <Warehouse className="w-4 h-4 text-[#C6A15B]" />
              <span className="text-[13px] font-bold text-[#292725]">
                Covered Canopy Shade
              </span>
            </div>
            <input
              type="checkbox"
              checked={filters.coveredOnly}
              onChange={(e) =>
                onApplyFilters({ ...filters, coveredOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#7B2638] focus:ring-[#7B2638] cursor-pointer"
            />
          </label>

          {/* Municipal Approved */}
          <label className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] flex items-center justify-between cursor-pointer hover:border-[#7B2638] transition-colors">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#26965B]" />
              <span className="text-[13px] font-bold text-[#292725]">
                Municipal Approved Only
              </span>
            </div>
            <input
              type="checkbox"
              checked={filters.municipalOnly}
              onChange={(e) =>
                onApplyFilters({ ...filters, municipalOnly: e.target.checked })
              }
              className="w-4 h-4 rounded text-[#7B2638] focus:ring-[#7B2638] cursor-pointer"
            />
          </label>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EFECE4]">
          <button
            type="button"
            onClick={onResetFilters}
            className="h-11 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] text-[13px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#EFECE4]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[13px] font-bold shadow-sm transition-all cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};