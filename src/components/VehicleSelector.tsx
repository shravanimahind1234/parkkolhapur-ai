import React from 'react';
import { Car, Bike, Zap } from 'lucide-react';
import { VehicleType } from '../types';

interface VehicleSelectorProps {
  selectedVehicle: VehicleType;
  onSelectVehicle: (vehicle: VehicleType) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicle,
  onSelectVehicle,
}) => {
  const options: { id: VehicleType; label: string; desc: string; icon: React.ElementType }[] = [
    { id: 'car', label: 'Four Wheeler / Car', desc: 'Standard & SUV bays', icon: Car },
    { id: 'bike', label: 'Two Wheeler / Bike', desc: 'Covered scooter bays', icon: Bike },
    { id: 'ev', label: 'Electric EV Charging', desc: '60kW DC Fast Hubs', icon: Zap },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-2.5 p-1.5 rounded-2xl bg-[#22070E] border border-[#C6A15B]/30 shadow-md">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedVehicle === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelectVehicle(opt.id)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-gradient-to-b from-[#651E2B] to-[#3D101C] text-[#FFF9EF] border-[#C6A15B] shadow-lg shadow-[#651E2B]/40 scale-[1.02]'
                  : 'bg-[#1A0A0F]/60 text-[#B8ADA0] border-transparent hover:border-white/10 hover:text-[#FFF9EF]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-[#C6A15B]' : ''}`} />
              <span className="text-xs font-bold leading-tight">{opt.label}</span>
              <span className="hidden sm:inline text-[10px] text-[#C6A15B]/80 mt-0.5 font-medium">
                {opt.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
