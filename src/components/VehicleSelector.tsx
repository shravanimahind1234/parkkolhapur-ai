import React from 'react';
import { Bike, Car, Zap } from 'lucide-react';
import { VehicleType } from '../types';

interface VehicleSelectorProps {
  selectedVehicle: VehicleType;
  onSelectVehicle: (type: VehicleType) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicle,
  onSelectVehicle,
}) => {
  return (
    <section className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider">
          Select Vehicle Category
        </span>
        <span className="text-[10px] font-bold text-[#4edea3] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping"></span>
          Live Rates Active
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-1 rounded-xl bg-[#0b1c30] shadow-sm border border-white/5">
        {/* 2-Wheeler */}
        <button
          type="button"
          onClick={() => onSelectVehicle('bike')}
          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all cursor-pointer ${
            selectedVehicle === 'bike'
              ? 'bg-[#ffb95f] text-[#472a00] shadow-md font-bold'
              : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a]'
          }`}
        >
          <Bike
            className={`w-5 h-5 mb-1 ${
              selectedVehicle === 'bike' ? 'text-[#472a00]' : 'text-[#ffb95f]'
            }`}
          />
          <span className="text-[12px] font-bold">2-Wheeler</span>
          <span
            className={`text-[10px] ${
              selectedVehicle === 'bike'
                ? 'text-[#472a00]/80 font-medium'
                : 'text-[#c6c6cd]'
            }`}
          >
            Bike / Scooter
          </span>
        </button>

        {/* 4-Wheeler */}
        <button
          type="button"
          onClick={() => onSelectVehicle('car')}
          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all cursor-pointer ${
            selectedVehicle === 'car'
              ? 'bg-[#ffb95f] text-[#472a00] shadow-md font-bold'
              : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a]'
          }`}
        >
          <Car
            className={`w-5 h-5 mb-1 ${
              selectedVehicle === 'car' ? 'text-[#472a00]' : 'text-[#d3e4fe]'
            }`}
          />
          <span className="text-[12px] font-bold">4-Wheeler</span>
          <span
            className={`text-[10px] ${
              selectedVehicle === 'car'
                ? 'text-[#472a00]/80 font-medium'
                : 'text-[#c6c6cd]'
            }`}
          >
            Sedan / SUV
          </span>
        </button>

        {/* EV Station */}
        <button
          type="button"
          onClick={() => onSelectVehicle('ev')}
          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-lg transition-all cursor-pointer ${
            selectedVehicle === 'ev'
              ? 'bg-[#ffb95f] text-[#472a00] shadow-md font-bold'
              : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a]'
          }`}
        >
          <Zap
            className={`w-5 h-5 mb-1 ${
              selectedVehicle === 'ev' ? 'text-[#472a00]' : 'text-[#4edea3]'
            }`}
          />
          <span className="text-[12px] font-bold">EV Station</span>
          <span
            className={`text-[10px] ${
              selectedVehicle === 'ev'
                ? 'text-[#472a00]/80 font-medium'
                : 'text-[#c6c6cd]'
            }`}
          >
            With Charger
          </span>
        </button>
      </div>
    </section>
  );
};
