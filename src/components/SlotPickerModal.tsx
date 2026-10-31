import React, { useState } from 'react';
import {
  X,
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Bus,
  Sparkles,
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
      entryGate: 'KMC Municipal Barrier Gate 1',
    };

    setIsSuccess(true);
    setTimeout(() => {
      onBookSlot(newBooking);
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-lg bg-[#0b1c30] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-[#102034] border-b border-white/5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-bold text-[#d3e4fe]">
                Select Parking Bay
              </h3>
              <span className="text-[10px] font-extrabold text-[#4edea3] bg-[#001c10] border border-[#4edea3]/30 px-2 py-0.5 rounded-full">
                LIVE MATRIX
              </span>
            </div>
            <p className="text-[12px] text-[#c6c6cd] mt-0.5">
              {hub.name} • {hub.distance}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b2b3f] text-[#c6c6cd] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3] animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-[20px] font-bold text-[#d3e4fe]">
              Bay {selectedSlot?.code} Reserved!
            </h4>
            <p className="text-[13px] text-[#c6c6cd] max-w-xs">
              KMC Edge barrier auto-sync enabled. Dynamic QR code pass created in your Bookings tab.
            </p>
          </div>
        ) : (
          <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
            {/* Status Legend */}
            <div className="flex items-center justify-around py-2 px-3 rounded-xl bg-[#000f21] border border-white/5 text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]" />
                <span className="text-[#c6c6cd]">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]" />
                <span className="text-[#c6c6cd]">Reserved</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#EF4444]" />
                <span className="text-[#c6c6cd]">Occupied</span>
              </div>
            </div>

            {/* Visual Slot Matrix */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[#c6c6cd] uppercase tracking-wider">
                  Ground Floor Parking Grid
                </span>
                {selectedSlot && (
                  <span className="text-[12px] font-bold text-[#ffb95f]">
                    Selected: {selectedSlot.code}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {availableSlots.map((slot) => {
                  const isAvailable = slot.status === 'AVAILABLE';
                  const isSelected = selectedSlot?.id === slot.id;

                  let borderClass = 'border-[#EF4444]/40 bg-[#EF4444]/10 text-[#ffb4ab]';
                  if (slot.status === 'RESERVED') {
                    borderClass = 'border-[#F59E0B]/40 bg-[#F59E0B]/10 text-[#ffb95f]';
                  } else if (isAvailable) {
                    borderClass = isSelected
                      ? 'border-[#ffb95f] bg-[#ffb95f]/20 text-[#ffb95f] shadow-[0_0_12px_rgba(255,185,95,0.3)] ring-2 ring-[#ffb95f]'
                      : 'border-[#10B981]/50 bg-[#10B981]/10 text-[#4edea3] hover:border-[#10B981]';
                  }

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-16 rounded-xl border p-1.5 flex flex-col justify-between transition-all relative ${borderClass} ${
                        !isAvailable ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-95'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-[11px] font-bold tracking-tight">
                          {slot.code}
                        </span>
                        {slot.hasCharger && (
                          <Zap className="w-3 h-3 text-[#4edea3]" />
                        )}
                      </div>
                      <span className="text-[9px] font-medium tracking-wide">
                        {slot.status === 'AVAILABLE' ? 'OPEN' : slot.status}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vehicle Number Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider block">
                Vehicle Plate Number (Kolhapur RTO)
              </label>
              <div className="flex items-center rounded-xl bg-[#102034] border border-white/10 px-3 h-12">
                <span className="text-[12px] font-black text-[#ffb95f] mr-2 px-1.5 py-0.5 rounded bg-[#0f172a] border border-[#ffb95f]/30">
                  IND
                </span>
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  placeholder="MH 09 XX 0000"
                  className="w-full bg-transparent text-[14px] font-bold text-[#d3e4fe] uppercase tracking-wider focus:outline-none"
                />
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider">
                  Parking Duration
                </span>
                <span className="text-[11px] text-[#ffb95f] font-semibold">
                  Rate: ₹{hourlyRate}/hr
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3].map((hr) => (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => {
                      setDurationHours(hr);
                      setIsDayPass(false);
                    }}
                    className={`h-11 rounded-xl font-bold text-[13px] flex items-center justify-center transition-all cursor-pointer ${
                      !isDayPass && durationHours === hr
                        ? 'bg-[#ffb95f] text-[#472a00] shadow-md'
                        : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a]'
                    }`}
                  >
                    {hr} {hr === 1 ? 'Hour' : 'Hours'}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsDayPass(true)}
                  className={`h-11 rounded-xl font-bold text-[12px] flex items-center justify-center transition-all cursor-pointer ${
                    isDayPass
                      ? 'bg-[#ffb95f] text-[#472a00] shadow-md'
                      : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a]'
                  }`}
                >
                  Day Pass
                </button>
              </div>
            </div>

            {/* Temple Shuttle Add-on (Complimentary with ticket) */}
            <div className="p-3 rounded-xl bg-[#001c10] border border-[#4edea3]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 flex items-center justify-center text-[#4edea3]">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-bold text-[#d3e4fe]">
                      Ambabai Darshan E-Shuttle Pass
                    </span>
                    <span className="text-[9px] font-extrabold uppercase bg-[#4edea3] text-[#003824] px-1.5 py-0.2 rounded">
                      FREE
                    </span>
                  </div>
                  <span className="text-[11px] text-[#c6c6cd]">
                    Priority battery rickshaw to Mahadwar
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeShuttle}
                onChange={(e) => setIncludeShuttle(e.target.checked)}
                className="w-5 h-5 accent-[#4edea3] cursor-pointer"
              />
            </div>

            {/* Price breakdown */}
            <div className="p-3 rounded-xl bg-[#102034] border border-white/5 space-y-1.5 text-[12px]">
              <div className="flex justify-between text-[#c6c6cd]">
                <span>
                  Base Fee ({isDayPass ? 'Day Pass' : `${durationHours} hrs × ₹${hourlyRate}`})
                </span>
                <span className="font-semibold text-[#d3e4fe]">₹{baseCost}</span>
              </div>
              <div className="flex justify-between text-[#c6c6cd]">
                <span>KMC Municipal Infrastructure Cess</span>
                <span className="font-semibold text-[#d3e4fe]">₹{kmcCess}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-[15px] font-bold text-[#ffb95f]">
                <span>Total Amount Due</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              type="button"
              disabled={!selectedSlot}
              onClick={handleConfirm}
              className="w-full h-12 rounded-xl bg-[#ffb95f] hover:bg-[#ee9800] text-[#472a00] text-[15px] font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Confirm & Lock Bay {selectedSlot?.code || ''}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
