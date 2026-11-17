import React, { useState } from 'react';
import {
  X,
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Bus,
  Sparkles,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { ParkingHub, ParkingSlot, VehicleType, Booking } from '../types';

interface SlotPickerModalProps {
  hub: ParkingHub;
  vehicleType: VehicleType;
  isOpen: boolean;
  onClose: () => void;
  onBookSlot: (booking: Booking) => void;
}

export const SlotPickerModal: React.FC<SlotPickerModalProps> = ({
  hub,
  vehicleType,
  isOpen,
  onClose,
  onBookSlot,
}) => {
  if (!isOpen) return null;

  // Filter slots suitable for this vehicle type or generic
  const availableSlots = hub.slots;
  const initialSelected = availableSlots.find((s) => s.status === 'AVAILABLE');
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(initialSelected || null);
  const [durationHours, setDurationHours] = useState<number>(2);
  const [isDayPass, setIsDayPass] = useState<boolean>(false);
  const [vehicleNumber, setVehicleNumber] = useState<string>('MH 09 DX 4521');
  const [includeShuttle, setIncludeShuttle] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const hourlyRate = hub.hourlyRate[vehicleType];
  const dayRate = hub.dayPassRate[vehicleType];
  const baseCost = isDayPass ? dayRate : hourlyRate * durationHours;
  const kmcCess = 5;
  const totalAmount = baseCost + kmcCess;

  const handleConfirm = () => {
    if (!selectedSlot) return;

    const newBooking: Booking = {
      id: `BK-KMC-${Math.floor(1000 + Math.random() * 9000)}`,
      hubId: hub.id,
      hubName: hub.name,
      slotCode: selectedSlot.code,
      vehicleType: vehicleType,
      vehicleNumber: vehicleNumber.toUpperCase().trim() || 'MH 09 DX 4521',
      startTime: 'Today, Just Now',
      endTime: isDayPass ? 'Today, 11:59 PM' : `Today, In ${durationHours} hours`,
      durationHours: isDayPass ? 24 : durationHours,
      totalAmount: totalAmount,
      status: 'ACTIVE',
      qrCodeValue: `KMC-${hub.name.slice(0, 4).toUpperCase()}-${selectedSlot.code}-${vehicleNumber.replace(/\s+/g, '')}`,
      includeShuttlePass: includeShuttle,
      entryGate: 'KMC Municipal Barrier Gate 1 (Bhavani Mandap Road)',
    };

    setIsSuccess(true);
    setTimeout(() => {
      onBookSlot(newBooking);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border-t sm:border border-[#C6A15B]/35 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col text-[#FFF9EF]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF]">
                Select Parking Bay
              </h3>
              <span className="text-[10px] font-extrabold text-[#10B981] bg-[#10B981]/15 border border-[#10B981]/30 px-2 py-0.5 rounded-full">
                LIVE MATRIX
              </span>
            </div>
            <p className="text-xs text-[#C6A15B] mt-0.5 font-medium">
              {hub.name} • {hub.distance}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Status Color Legend */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-[#1A0A0F]/80 border border-white/10 text-[11px] font-bold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#10B981]" />
              <span className="text-[#10B981]">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#F59E0B]" />
              <span className="text-[#F59E0B]">Reserved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-md bg-[#EF4444]" />
              <span className="text-[#EF4444]">Occupied</span>
            </div>
          </div>

          {/* Parking Floor Plan Grid */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-[#C6A15B] uppercase mb-2">
              <span>Ground Floor Bay Layout</span>
              <span className="text-[10px] text-[#B8ADA0]">Tap an available bay</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-[#1A0A0F] border border-[#C6A15B]/25">
              {hub.slots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                const isAvailable = slot.status === 'AVAILABLE';
                const isReserved = slot.status === 'RESERVED';
                const isOccupied = slot.status === 'OCCUPIED';

                // Status styling according to design requirements:
                // green for available, red for occupied, amber for reserved
                let slotBg = 'bg-[#10B981]/20 border-[#10B981] text-[#10B981] hover:bg-[#10B981]/30';
                if (isReserved) {
                  slotBg = 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#F59E0B] cursor-not-allowed opacity-80';
                } else if (isOccupied) {
                  slotBg = 'bg-[#EF4444]/20 border-[#EF4444] text-[#EF4444] cursor-not-allowed opacity-60';
                }

                if (isSelected) {
                  slotBg = 'bg-[#C6A15B] border-[#FFF9EF] text-[#22070E] font-black scale-105 shadow-lg';
                }

                return (
                  <button
                    key={slot.id}
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-xl border-2 flex flex-col items-center justify-center transition-all cursor-pointer relative ${slotBg}`}
                  >
                    <span className="text-xs font-black tracking-wider leading-none">
                      {slot.code}
                    </span>

                    <div className="flex items-center gap-1 mt-1">
                      {slot.hasCharger && (
                        <Zap className={`w-3 h-3 ${isSelected ? 'text-[#22070E]' : 'text-[#10B981]'}`} />
                      )}
                      {slot.isCovered && (
                        <span className="text-[8px] uppercase tracking-tighter opacity-80">
                          Shade
                        </span>
                      )}
                    </div>

                    {isOccupied && (
                      <Lock className="w-3 h-3 text-[#EF4444] absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vehicle Plate Selection */}
          <div>
            <label className="text-xs font-bold text-[#E8DECE] block mb-1.5">
              Vehicle Plate Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              placeholder="e.g. MH 09 DX 4521"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0A0F] border border-[#C6A15B]/30 text-xs font-bold text-[#FFF9EF] uppercase tracking-wider focus:outline-none focus:border-[#C6A15B]"
            />
          </div>

          {/* Duration Selector */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-[#E8DECE]">Parking Duration</span>
              <button
                type="button"
                onClick={() => setIsDayPass(!isDayPass)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                  isDayPass
                    ? 'bg-[#10B981] text-[#1A0A0F]'
                    : 'bg-[#292725] text-[#C6A15B] border border-[#C6A15B]/30'
                }`}
              >
                {isDayPass ? '✓ Day Pass Enabled' : 'Switch to Day Pass'}
              </button>
            </div>

            {!isDayPass ? (
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 5].map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => setDurationHours(hr)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      durationHours === hr
                        ? 'bg-[#651E2B] border-[#C6A15B] text-[#FFF9EF] shadow'
                        : 'bg-[#1A0A0F] border-white/5 text-[#B8ADA0] hover:border-white/20'
                    }`}
                  >
                    {hr} {hr === 1 ? 'Hour' : 'Hours'}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-[#10B981]/15 border border-[#10B981]/30 text-xs text-[#10B981] font-semibold">
                Full-Day Unlimited Parking Pass valid until 11:59 PM tonight at this hub.
              </div>
            )}
          </div>

          {/* Free Ambabai Temple E-Shuttle Option */}
          <label className="flex items-start gap-3 p-3 rounded-2xl bg-[#651E2B]/40 border border-[#C6A15B]/30 cursor-pointer">
            <input
              type="checkbox"
              checked={includeShuttle}
              onChange={(e) => setIncludeShuttle(e.target.checked)}
              className="mt-0.5 accent-[#C6A15B] w-4 h-4 rounded"
            />
            <div className="text-xs">
              <span className="font-bold text-[#FFF9EF] flex items-center gap-1.5">
                <Bus className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>Include Free Shree Ambabai Darshan E-Shuttle Pass</span>
              </span>
              <span className="text-[11px] text-[#B8ADA0] block mt-0.5">
                Complimentary battery e-rickshaw transit between South Gate and Temple Mahadwar.
              </span>
            </div>
          </label>

          {/* Pricing Breakdown Summary */}
          <div className="p-3.5 rounded-2xl bg-[#1A0A0F] border border-white/10 space-y-1.5 text-xs">
            <div className="flex justify-between text-[#B8ADA0]">
              <span>Base Parking Charge ({isDayPass ? 'Day Pass' : `${durationHours} hrs × ₹${hourlyRate}`})</span>
              <span className="text-[#FFF9EF]">₹{baseCost}</span>
            </div>
            <div className="flex justify-between text-[#B8ADA0]">
              <span>KMC Municipal Corridor Cess</span>
              <span className="text-[#FFF9EF]">₹{kmcCess}</span>
            </div>
            <div className="flex justify-between text-[#B8ADA0]">
              <span>Temple E-Shuttle Transit Pass</span>
              <span className="text-[#10B981] font-bold">FREE (₹0)</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-black">
              <span className="text-[#C6A15B]">Total Payable</span>
              <span className="text-[#FFF9EF]">₹{totalAmount}</span>
            </div>
          </div>

        </div>

        {/* Modal Footer Confirm */}
        <div className="p-4 sm:p-5 bg-[#22070E] border-t border-white/10">
          <button
            type="button"
            disabled={!selectedSlot || isSuccess}
            onClick={handleConfirm}
            className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              isSuccess
                ? 'bg-[#10B981] text-white'
                : 'gold-gradient-bg text-[#22070E] hover:brightness-105 active:scale-95'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Bay Reserved! Generating Pass...</span>
              </>
            ) : (
              <>
                <span>Confirm Reservation & Generate QR Pass</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
