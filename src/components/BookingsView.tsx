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
  X,
  CheckCircle2,
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
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 pb-20 pt-2 animate-in fade-in text-left">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#7B2638] font-serif tracking-tight">
            Active Municipal Passes
          </h2>
          <p className="text-[12px] text-[#5e5954]">
            Present at KMC Edge barrier scanners or shuttle pick-up points
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-[#edf8f2] text-[#26965B] text-[11px] font-bold border border-[#26965B]/30">
          {bookings.filter((b) => b.status === 'ACTIVE').length} Active
        </span>
      </div>

      {activeBooking ? (
        <div className="relative rounded-3xl bg-[#FFFFFF] p-5 sm:p-6 border-2 border-[#C6A15B]/40 shadow-xl overflow-hidden">
          {/* Subtle watermarked background seal */}
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#C6A15B]/5 pointer-events-none" />

          {/* Ticket Header */}
          <div className="flex items-start justify-between border-b border-[#EFECE4] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-[#7B2638] text-[#FFFDF8] px-2 py-0.5 rounded tracking-wider">
                  KMC PASS #{activeBooking.id}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-[#26965B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#26965B] animate-ping" />
                  ACTIVE
                </span>
              </div>
              <h3 className="text-[18px] font-bold text-[#7B2638] font-serif mt-1.5">
                {activeBooking.hubName}
              </h3>
              <p className="text-[12px] text-[#5e5954] flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#7B2638]" />
                {activeBooking.entryGate}
              </p>
            </div>

            {/* Bay Code Badge */}
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#F7F4EE] border border-[#C6A15B]/40 px-3.5 shadow-xs">
              <span className="text-[9px] text-[#5e5954] font-bold uppercase tracking-wider">Assigned Bay</span>
              <span className="text-[24px] font-black text-[#7B2638] leading-none mt-0.5">
                {activeBooking.slotCode}
              </span>
            </div>
          </div>

          {/* Vehicle & Time Grid */}
          <div className="grid grid-cols-2 gap-3 py-4 border-b border-[#EFECE4]">
            <div className="p-3 rounded-2xl bg-[#F7F4EE] border border-[#EFECE4]">
              <span className="text-[10px] text-[#5e5954] uppercase font-bold block">
                Vehicle Plate
              </span>
              <span className="text-[15px] font-extrabold text-[#292725] tracking-wide block mt-0.5 font-mono">
                {activeBooking.vehicleNumber}
              </span>
              <span className="text-[10px] text-[#26965B] uppercase font-bold">
                FASTTAG SYNCHRONIZED
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7F4EE] border border-[#EFECE4]">
              <span className="text-[10px] text-[#5e5954] uppercase font-bold block">
                Duration & Expiry
              </span>
              <span className="text-[15px] font-extrabold text-[#292725] block mt-0.5">
                {activeBooking.durationHours} Hours
              </span>
              <span className="text-[10px] text-[#7B2638] font-medium truncate block">
                {activeBooking.endTime}
              </span>
            </div>
          </div>

          {/* QR Code Pass Section */}
          <div className="py-4 flex flex-col items-center justify-center text-center">
            <div
              onClick={() => setShowQrEnlarged(true)}
              className="p-3 rounded-2xl bg-[#FFFFFF] border-2 border-dashed border-[#C6A15B] shadow-sm cursor-pointer hover:scale-105 transition-transform"
            >
              {/* SVG QR Code representation */}
              <div className="w-36 h-36 bg-[#292725] rounded-xl p-2.5 flex flex-col items-center justify-between text-white shadow-inner">
                <div className="w-full flex justify-between">
                  <div className="w-8 h-8 border-4 border-white bg-white/20 rounded" />
                  <div className="w-8 h-8 border-4 border-white bg-white/20 rounded" />
                </div>
                <div className="text-[9px] font-mono tracking-widest text-[#C6A15B]">
                  KMC•EDGE•PASS
                </div>
                <div className="w-full flex justify-between">
                  <div className="w-8 h-8 border-4 border-white bg-white/20 rounded" />
                  <div className="w-6 h-6 bg-[#C6A15B] rounded" />
                </div>
              </div>
            </div>
            <span className="text-[11px] text-[#5e5954] font-medium mt-2">
              Tap to enlarge QR for municipal boom barrier scanner
            </span>
          </div>

          {/* Temple E-Shuttle Free Pass Badge if enabled */}
          {activeBooking.includeShuttlePass && (
            <div
              onClick={onOpenShuttle}
              className="mb-4 p-3 rounded-2xl bg-[#fef7ec] border border-[#E6A23C]/40 flex items-center justify-between cursor-pointer hover:bg-[#fef7ec]/80 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#E6A23C] text-white flex items-center justify-center">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[12px] font-bold text-[#7B2638] block leading-tight">
                    Free Ambabai Temple E-Shuttle Pass
                  </span>
                  <span className="text-[10px] text-[#5e5954]">
                    Unlimited hops between South Gate and Temple Mahadwar
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold uppercase text-[#7B2638] bg-[#FFFDF8] px-2 py-1 rounded-lg border border-[#E6A23C]/30">
                View Stops ➔
              </span>
            </div>
          )}

          {/* Action CTAs: Extend, Directions, Cancel, Download */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#EFECE4]">
            <button
              type="button"
              onClick={() => onExtendBooking(activeBooking.id)}
              className="h-10 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#EFECE4]"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>Extend +1 Hr</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenDirectionsForBooking(activeBooking.hubId)}
              className="h-10 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#EFECE4]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#7B2638]" />
              <span>Navigate</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="h-10 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#EFECE4]"
            >
              <Download className="w-3.5 h-3.5 text-[#26965B]" />
              <span>{downloadSuccess ? 'Downloaded!' : 'Save PDF'}</span>
            </button>

            <button
              type="button"
              onClick={() => onCancelBooking(activeBooking.id)}
              className="h-10 rounded-xl bg-[#fdf0f0] hover:bg-[#fbdada] text-[#D94B4B] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#D94B4B]/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>End Pass</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] text-center space-y-3">
          <Ticket className="w-12 h-12 text-[#C6A15B] mx-auto" />
          <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
            No Active Municipal Parking Passes
          </h3>
          <p className="text-[13px] text-[#5e5954] max-w-sm mx-auto">
            Reserve a bay at Mahalaxmi Temple, Rankala Lake, or New Palace to get your digital gate pass.
          </p>
        </div>
      )}

      {/* Enlarged QR Modal */}
      {showQrEnlarged && activeBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-xs bg-[#FFFDF8] rounded-3xl p-6 text-center border-2 border-[#C6A15B] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE4] pb-2">
              <span className="text-[12px] font-extrabold text-[#7B2638]">
                KMC Edge Gate Scanner
              </span>
              <button
                onClick={() => setShowQrEnlarged(false)}
                className="w-7 h-7 rounded-full bg-[#F7F4EE] text-[#5e5954] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-56 h-56 mx-auto bg-[#292725] rounded-2xl p-4 flex flex-col items-center justify-between text-white shadow-md">
              <div className="w-full flex justify-between">
                <div className="w-12 h-12 border-4 border-white bg-white/20 rounded-md" />
                <div className="w-12 h-12 border-4 border-white bg-white/20 rounded-md" />
              </div>
              <div className="text-[11px] font-mono tracking-widest text-[#C6A15B]">
                {activeBooking.qrCodeValue}
              </div>
              <div className="w-full flex justify-between">
                <div className="w-12 h-12 border-4 border-white bg-white/20 rounded-md" />
                <div className="w-10 h-10 bg-[#C6A15B] rounded-md" />
              </div>
            </div>

            <div className="text-[12px] text-[#5e5954]">
              <span className="font-bold text-[#292725] block">{activeBooking.vehicleNumber}</span>
              <span>Bay: {activeBooking.slotCode} • Gate Barrier 1</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};