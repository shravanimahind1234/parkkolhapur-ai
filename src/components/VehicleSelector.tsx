import React from 'react';
import { Bike, Car, Zap } from 'lucide-react';
import { VehicleType } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface VehicleSelectorProps {
  selectedVehicle: VehicleType;
  onSelectVehicle: (type: VehicleType) => void;
}

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  selectedVehicle,
  onSelectVehicle,
}) => {
  const { t, language } = useLanguage();

  return (
    <section className="flex flex-col gap-1.5 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-[#5e5954] uppercase tracking-wider">
          {language === 'mr' ? 'वाहन प्रकार निवडा' : language === 'hi' ? 'वाहन प्रकार चुनें' : 'Select Vehicle Category'}
        </span>
        <span className="text-[10px] font-bold text-[#26965B] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#26965B] animate-ping"></span>
          {language === 'mr' ? 'थेट दर लागू' : language === 'hi' ? 'लाइव दर सक्रिय' : 'Live Rates Active'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-[#FFFFFF] shadow-xs border border-[#EFECE4]">
        {/* 2-Wheeler */}
        <button
          type="button"
          onClick={() => onSelectVehicle('bike')}
          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
            selectedVehicle === 'bike'
              ? 'bg-[#7B2638] text-[#FFFDF8] shadow-sm font-bold'
              : 'bg-[#F7F4EE] text-[#5e5954] hover:bg-[#EFECE4]'
          }`}
        >
          <Bike
            className={`w-5 h-5 mb-1 ${
              selectedVehicle === 'bike' ? 'text-[#C6A15B]' : 'text-[#7B2638]'
            }`}
          />
          <span className="text-[12px] font-bold">{t.vehicle.twoWheeler}</span>
          <span
            className={`text-[10px] ${
              selectedVehicle === 'bike'
                ? 'text-[#FFFDF8]/80 font-medium'
                : 'text-[#8a847e]'
            }`}
          >
            {t.vehicle.twoWheelerSub}
          </span>
        </button>

        {/* 4-Wheeler */}
        <button
          type="button"
          onClick={() => onSelectVehicle('car')}
          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
            selectedVehicle === 'car'
              ? 'bg-[#7B2638] text-[#FFFDF8] shadow-sm font-bold'
              : 'bg-[#F7F4EE] text-[#5e5954] hover:bg-[#EFECE4]'
          }`}
        >
          <Car
            className={`w-5 h-5 mb-1 ${
              selectedVehicle === 'car' ? 'text-[#C6A15B]' : 'text-[#7B2638]'
            }`}
          />
          <span className="text-[12px] font-bold">{t.vehicle.fourWheeler}</span>
          <span
            className={`text-[10px] ${
              selectedVehicle === 'car'
                ? 'text-[#FFFDF8]/80 font-medium'
                : 'text-[#8a847e]'
            }`}
          >
            {t.vehicle.fourWheelerSub}
          </span>
        </button>

        {/* EV Station */}
        <button
          type="button"
          onClick={() => onSelectVehicle('ev')}
          className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl transition-all cursor-pointer ${
            selectedVehicle === 'ev'
              ? 'bg-[#7B2638] text-[#FFFDF8] shadow-sm font-bold'
              : 'bg-[#F7F4EE] text-[#5e5954] hover:bg-[#EFECE4]'
          }`}
        >
          <Zap
            className={`w-5 h-5 mb-1 ${
              selectedVehicle === 'ev' ? 'text-[#C6A15B]' : 'text-[#26965B]'
            }`}
          />
          <span className="text-[12px] font-bold">{t.vehicle.ev}</span>
          <span
            className={`text-[10px] ${
              selectedVehicle === 'ev'
                ? 'text-[#FFFDF8]/80 font-medium'
                : 'text-[#8a847e]'
            }`}
          >
            {t.vehicle.evSub}
          </span>
        </button>
      </div>
    </section>
  );
};