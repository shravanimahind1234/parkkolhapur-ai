import React, { useState } from 'react';
import {
  X,
  Zap,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Bus,
  Sparkles,
  Car,
} from 'lucide-react';
import { ParkingHub, ParkingSlot, VehicleType, Booking } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface SlotPickerModalProps {
  hub: ParkingHub;
  vehicleType: VehicleType;
  isOpen: boolean;
  onClose: () => void;
  onBookSlot: (booking: Booking) => void;
  defaultVehicleNumber?: string;
}

export const SlotPickerModal: React.FC<SlotPickerModalProps> = ({
  hub,
  vehicleType,
  isOpen,
  onClose,
  onBookSlot,
  defaultVehicleNumber,
}) => {
  const { t, language } = useLanguage();
  if (!isOpen) return null;

  // Filter slots suitable for this vehicle type or generic
  const availableSlots = hub.slots;
  const initialSelected = availableSlots.find((s) => s.status === 'AVAILABLE');
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(initialSelected || null);
  const [durationHours, setDurationHours] = useState<number>(2);
  const [isDayPass, setIsDayPass] = useState<boolean>(false);
  const [vehicleNumber, setVehicleNumber] = useState<string>(
    defaultVehicleNumber || 'MH 09 DX 4521'
  );
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FFFDF8] border-t sm:border border-[#C6A15B]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 bg-[#FFFFFF] border-b border-[#EFECE4] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                {language === 'mr' ? 'पार्किंग स्लॉट निवडा' : language === 'hi' ? 'पार्किंग स्लॉट चुनें' : 'Select Parking Bay'}
              </h3>
              <span className="text-[10px] font-extrabold text-[#26965B] bg-[#edf8f2] border border-[#26965B]/30 px-2 py-0.5 rounded-full">
                LIVE MATRIX
              </span>
            </div>
            <p className="text-[12px] text-[#5e5954] mt-0.5">
              {hub.name} • {hub.distance}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#edf8f2] text-[#26965B] flex items-center justify-center animate-bounce shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-[20px] font-bold text-[#7B2638] font-serif">
              {language === 'mr' ? `जागा ${selectedSlot?.code} आरक्षित झाली!` : language === 'hi' ? `स्लॉट ${selectedSlot?.code} बुक हो गया!` : `Bay ${selectedSlot?.code} Reserved!`}
            </h4>
            <p className="text-[13px] text-[#5e5954] max-w-xs leading-relaxed">
              {language === 'mr'
                ? 'मनपा स्वयंचलित बॅरियर सिंक सक्रिय. आपल्या बुकिंग्ज विभागात QR पास तयार झाला आहे.'
                : language === 'hi'
                ? 'केएमसी बैरियर ऑटो-सिंक सक्रिय। आपकी बुकिंग टैब में क्यूआर पास तैयार है।'
                : 'KMC Edge barrier auto-sync enabled. Dynamic QR code pass created in your Bookings tab.'}
            </p>
          </div>
        ) : (
          <div className="p-4 overflow-y-auto space-y-4 no-scrollbar">
            {/* Status Legend */}
            <div className="flex items-center justify-around py-2 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#26965B]" />
                <span className="text-[#5e5954] font-medium">{language === 'mr' ? 'उपलब्ध' : language === 'hi' ? 'उपलब्ध' : 'Available'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#D94B4B]" />
                <span className="text-[#5e5954] font-medium">{language === 'mr' ? 'भरलेले' : language === 'hi' ? 'व्यस्त' : 'Occupied'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-[#E6A23C]" />
                <span className="text-[#5e5954] font-medium">{language === 'mr' ? 'आरक्षित' : language === 'hi' ? 'आरक्षित' : 'Reserved'}</span>
              </div>
            </div>

            {/* Parking Slot Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5e5954] block">
                {language === 'mr' ? 'तळमजला • मनपा बॅरियर नोड #१' : language === 'hi' ? 'भूतल • केएमसी बैरियर नोड #1' : 'Ground Floor • Municipal Barrier Node #1'}
              </span>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {hub.slots.map((slot) => {
                  const isAvailable = slot.status === 'AVAILABLE';
                  const isSelected = selectedSlot?.id === slot.id;
                  const isOccupied = slot.status === 'OCCUPIED';
                  const isReserved = slot.status === 'RESERVED';

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => setSelectedSlot(slot)}
                      className={`h-14 rounded-xl flex flex-col items-center justify-center p-1 transition-all cursor-pointer relative border ${
                        isSelected
                          ? 'bg-[#7B2638] text-[#FFFDF8] border-[#7B2638] shadow-md scale-105 ring-2 ring-[#C6A15B]'
                          : isAvailable
                          ? 'bg-[#edf8f2] text-[#26965B] border-[#26965B]/40 hover:border-[#26965B] hover:shadow-xs'
                          : isReserved
                          ? 'bg-[#fef7ec] text-[#E6A23C] border-[#E6A23C]/40 opacity-70 cursor-not-allowed'
                          : 'bg-[#fdf0f0] text-[#D94B4B] border-[#D94B4B]/30 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <span className="text-[12px] font-black">{slot.code}</span>
                      <span className="text-[9px] font-bold tracking-tight uppercase">
                        {isSelected
                          ? (language === 'mr' ? 'निवड' : language === 'hi' ? 'चयन' : 'SELECTED')
                          : isAvailable
                          ? (language === 'mr' ? 'मोकळा' : language === 'hi' ? 'खुला' : 'OPEN')
                          : isReserved
                          ? (language === 'mr' ? 'राखीव' : language === 'hi' ? 'आरक्षित' : 'HELD')
                          : (language === 'mr' ? 'पूर्ण' : language === 'hi' ? 'फुल' : 'BUSY')}
                      </span>
                      {slot.hasCharger && (
                        <Zap className="w-3 h-3 text-[#C6A15B] absolute top-1 right-1" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration Selector & Day Pass Toggle */}
            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#7B2638]">
                  {language === 'mr' ? 'पार्किंग कालावधी' : language === 'hi' ? 'पार्किंग अवधि' : 'Parking Duration'}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#5e5954]">{language === 'mr' ? 'दिवस पास' : language === 'hi' ? 'डे पास' : 'Day Pass'}</span>
                  <button
                    type="button"
                    onClick={() => setIsDayPass(!isDayPass)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                      isDayPass ? 'bg-[#7B2638]' : 'bg-[#EFECE4]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                        isDayPass ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {!isDayPass ? (
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 8].map((hrs) => (
                    <button
                      key={hrs}
                      type="button"
                      onClick={() => setDurationHours(hrs)}
                      className={`py-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
                        durationHours === hrs
                          ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                          : 'bg-[#F7F4EE] text-[#5e5954] hover:bg-[#EFECE4]'
                      }`}
                    >
                      {hrs} {language === 'mr' ? 'तास' : language === 'hi' ? 'घंटे' : hrs > 1 ? 'hrs' : 'hr'}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2.5 rounded-xl bg-[#fef7ec] border border-[#E6A23C]/30 text-[11px] text-[#292725]">
                  {language === 'mr' ? 'आज रात्री ११:५९ पर्यंत अमर्यादित प्रवेश व बाहेर पडणे वैध.' : language === 'hi' ? 'आज रात 11:59 तक असीमित प्रवेश व निकास मान्य।' : 'Full-day unlimited entry & exit valid until 11:59 PM today.'}
                </div>
              )}
            </div>

            {/* Vehicle Plate Input */}
            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#5e5954] block">
                {language === 'mr' ? 'वाहन क्रमांक' : language === 'hi' ? 'वाहन नंबर' : 'Vehicle Plate Number'}
              </label>
              <div className="flex items-center h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] focus-within:border-[#7B2638]">
                <Car className="w-4 h-4 text-[#7B2638] mr-2" />
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. MH 09 DX 4521"
                  className="w-full bg-transparent text-[13px] font-mono font-bold uppercase text-[#292725] focus:outline-none"
                />
              </div>
            </div>

            {/* Ambabai Shuttle Checkbox */}
            <label className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] flex items-center justify-between cursor-pointer hover:border-[#C6A15B]/50 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#C6A15B]/20 text-[#7B2638] flex items-center justify-center">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[12px] font-bold text-[#7B2638] block leading-tight">
                    {language === 'mr' ? 'मोफत मंदिर ई-शटल पास जोडा' : language === 'hi' ? 'मुफ्त मंदिर ई-शटल पास जोड़ें' : 'Include Free Temple E-Shuttle Pass'}
                  </span>
                  <span className="text-[10px] text-[#5e5954]">
                    {language === 'mr' ? 'दक्षिण दरवाजा ➔ महाद्वार मंदिर कमान (मोफत)' : language === 'hi' ? 'दक्षिण गेट ➔ महाद्वार मंदिर गेट (मुफ्त)' : 'South Gate ➔ Mahadwar Temple Gate (Free)'}
                  </span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeShuttle}
                onChange={(e) => setIncludeShuttle(e.target.checked)}
                className="w-4 h-4 rounded text-[#7B2638] focus:ring-[#7B2638] cursor-pointer"
              />
            </label>

            {/* Cost Breakdown & Instant Reserve */}
            <div className="pt-2 border-t border-[#EFECE4] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#5e5954] block">
                  {language === 'mr' ? 'एकूण रक्कम (मनपा करासह)' : language === 'hi' ? 'कुल राशि (केएमसी उपकर सहित)' : 'Total Amount (incl. KMC Cess)'}
                </span>
                <span className="text-[22px] font-black text-[#7B2638]">
                  ₹{totalAmount}
                </span>
              </div>

              <button
                type="button"
                disabled={!selectedSlot}
                onClick={handleConfirm}
                className="h-11 px-6 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] font-bold text-[13px] flex items-center gap-2 shadow-md disabled:opacity-50 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>{language === 'mr' ? 'पुष्टी करा व आरक्षित करा' : language === 'hi' ? 'पुष्टि करें और बुक करें' : 'Confirm & Reserve'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};