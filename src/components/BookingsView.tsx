import React, { useState } from 'react';
import {
  Ticket,
  Clock,
  QrCode,
  MapPin,
  Bus,
  ShieldCheck,
  PlusCircle,
  LogOut,
  Download,
  AlertCircle,
} from 'lucide-react';
import { Booking } from '../types';

interface BookingsViewProps {
  bookings: Booking[];
  onExtendBooking: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onOpenShuttle: () => void;
  onOpenDirectionsForBooking: (hubId: string) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onExtendBooking,
  onCancelBooking,
  onOpenShuttle,
  onOpenDirectionsForBooking,
}) => {
  const activeBooking = bookings.find((b) => b.status === 'ACTIVE');
  const [showQrEnlarged, setShowQrEnlarged] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-20 pt-2 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#d3e4fe] tracking-tight">
            Active Municipal Passes
          </h2>
          <p className="text-[12px] text-[#c6c6cd]">
            Present at KMC Edge barrier scanners or shuttle pick-up points
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#4edea3]/15 text-[#4edea3] text-[11px] font-bold border border-[#4edea3]/30">
          {bookings.filter((b) => b.status === 'ACTIVE').length} Active
        </span>
      </div>

      {activeBooking ? (
        <div className="relative rounded-2xl bg-gradient-to-b from-[#102034] to-[#0b1c30] p-5 border border-white/10 shadow-2xl overflow-hidden">
          {/* Subtle watermarked background seal */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#ffb95f]/5 pointer-events-none" />

          {/* Ticket Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-[#ffb95f] text-[#472a00] px-2 py-0.5 rounded tracking-wider">
                  KMC PASS #{activeBooking.id}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#4edea3]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-ping" />
                  LIVE
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-[#d3e4fe] mt-1.5">
                {activeBooking.hubName}
              </h3>
              <p className="text-[12px] text-[#c6c6cd] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#ffb95f]" />
                {activeBooking.entryGate}
              </p>
            </div>

            {/* Bay Code Badge */}
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#000f21] border border-[#ffb95f]/30 px-3.5">
              <span className="text-[10px] text-[#c6c6cd] font-bold">ASSIGNED BAY</span>
              <span className="text-[24px] font-black text-[#ffb95f] leading-none mt-0.5">
                {activeBooking.slotCode}
              </span>
            </div>
          </div>

          {/* Vehicle & Time Grid */}
          <div className="grid grid-cols-2 gap-3 py-4 border-b border-white/10">
            <div className="p-3 rounded-xl bg-[#000f21]/60 border border-white/5">
              <span className="text-[10px] text-[#c6c6cd] uppercase font-bold block">
                Vehicle Plate
              </span>
              <span className="text-[15px] font-extrabold text-[#d3e4fe] tracking-wide block mt-0.5">
                {activeBooking.vehicleNumber}
              </span>
              <span className="text-[10px] text-[#4edea3] uppercase font-bold">
                {activeBooking.vehicleType} • FASTTAG PAIRED
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#000f21]/60 border border-white/5">
              <span className="text-[10px] text-[#c6c6cd] uppercase font-bold block">
                Valid Until
              </span>
              <span className="text-[15px] font-extrabold text-[#ffb95f] block mt-0.5">
                {activeBooking.endTime}
              </span>
              <span className="text-[10px] text-[#c6c6cd]">
                Total: ₹{activeBooking.totalAmount} Paid
              </span>
            </div>
          </div>

          {/* Dynamic QR Code & Barcode */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div
              onClick={() => setShowQrEnlarged(!showQrEnlarged)}
              className="p-3 bg-white rounded-2xl shadow-xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center"
            >
              {/* Crisp SVG QR code representation */}
              <div className="w-36 h-36 bg-[#0b1c30] p-2 rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-1 bg-white rounded">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i * 7 + 3) % 3 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                          ? 'bg-[#031427]'
                          : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-[#ffb95f] flex items-center justify-center text-[#472a00] font-black text-xs shadow-md">
                    KMC
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-[#031427] mt-2 tracking-widest uppercase">
                {activeBooking.qrCodeValue}
              </span>
            </div>
            <span className="text-[11px] text-[#8a9bb5] mt-2">
              Tap QR code to show scanner at exit barrier
            </span>
          </div>

          {/* Complimentary Shuttle Ticket Card */}
          {activeBooking.includeShuttlePass && (
            <div
              onClick={onOpenShuttle}
              className="mt-2 p-3 rounded-xl bg-[#001c10] border border-[#4edea3]/40 flex items-center justify-between cursor-pointer hover:border-[#4edea3] transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-[#d3e4fe]">
                      Ambabai Darshan E-Rickshaw Pass
                    </span>
                    <span className="text-[9px] font-extrabold uppercase bg-[#4edea3] text-[#003824] px-1.5 py-0.5 rounded">
                      VALID
                    </span>
                  </div>
                  <span className="text-[11px] text-[#c6c6cd]">
                    Free shuttle from South Gate to Temple Mahadwar
                  </span>
                </div>
              </div>
              <span className="text-[12px] font-bold text-[#4edea3]">View Route ➔</span>
            </div>
          )}

          {/* Ticket Management Actions */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              type="button"
              onClick={() => onExtendBooking(activeBooking.id)}
              className="h-11 rounded-xl bg-[#1b2b3f] hover:bg-[#26364a] text-[#d3e4fe] text-[12px] font-bold flex items-center justify-center gap-1.5 border border-white/5 transition-colors cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#ffb95f]" />
              <span>Extend +1 Hr</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="h-11 rounded-xl bg-[#1b2b3f] hover:bg-[#26364a] text-[#d3e4fe] text-[12px] font-bold flex items-center justify-center gap-1.5 border border-white/5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#4edea3]" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Receipt'}</span>
            </button>

            <button
              type="button"
              onClick={() => onCancelBooking(activeBooking.id)}
              className="h-11 rounded-xl bg-[#93000a]/30 hover:bg-[#93000a]/50 text-[#ffb4ab] text-[12px] font-bold flex items-center justify-center gap-1.5 border border-[#ffb4ab]/20 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Bay</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-2xl bg-[#102034] border border-white/5 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#1b2b3f] flex items-center justify-center text-[#ffb95f]">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-[16px] font-bold text-[#d3e4fe]">
            No Active Parking Passes
          </h3>
          <p className="text-[13px] text-[#c6c6cd] max-w-xs">
            Reserve a smart slot at Mahalaxmi Temple, Rankala Lake or CBS in the Explore tab.
          </p>
        </div>
      )}

      {/* Historical Passes */}
      <div className="mt-2 space-y-2">
        <h3 className="text-[14px] font-bold text-[#c6c6cd] uppercase tracking-wider">
          Past Trip History
        </h3>
        <div className="p-3.5 rounded-xl bg-[#102034] border border-white/5 flex items-center justify-between">
          <div>
            <span className="text-[14px] font-bold text-[#d3e4fe] block">
              Rankala Chowpatty Parking Plaza
            </span>
            <span className="text-[11px] text-[#8a9bb5]">
              Yesterday • Bay R-04 • MH 09 DX 4521 • ₹40 Paid
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#4edea3] bg-[#001c10] border border-[#4edea3]/30 px-2 py-0.5 rounded">
            COMPLETED
          </span>
        </div>
      </div>
    </div>
  );
};
