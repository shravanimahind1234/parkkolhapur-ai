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
  CheckCircle2,
  Navigation,
  Sparkles,
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
  const pastBookings = bookings.filter((b) => b.status !== 'ACTIVE');
  const [showQrEnlarged, setShowQrEnlarged] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-20 pt-4 animate-in fade-in max-w-4xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#FFF9EF] tracking-tight">
            Active Municipal Passes
          </h2>
          <p className="text-xs sm:text-sm text-[#C6A15B] mt-0.5">
            Present QR pass at KMC Edge barrier scanners or temple e-shuttle pick-up points
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#10B981]/20 text-[#10B981] text-xs font-bold border border-[#10B981]/30">
          {bookings.filter((b) => b.status === 'ACTIVE').length} Active Pass
        </span>
      </div>

      {activeBooking ? (
        /* Royal Kolhapur Municipal Ticket Card */
        <div className="relative rounded-3xl bg-gradient-to-b from-[#3D101C] via-[#2A0D15] to-[#1A0A0F] p-6 sm:p-7 border border-[#C6A15B]/50 shadow-2xl overflow-hidden">
          
          {/* Subtle watermarked background seal */}
          <div className="absolute -right-12 -top-12 w-60 h-60 rounded-full bg-[#C6A15B]/10 blur-xl pointer-events-none" />

          {/* Ticket Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase gold-gradient-bg text-[#22070E] px-2.5 py-0.5 rounded tracking-wider shadow">
                  KMC MUNICIPAL PASS #{activeBooking.id}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-black text-[#10B981]">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  GATE ACTIVE
                </span>
              </div>
              <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#FFF9EF] mt-2">
                {activeBooking.hubName}
              </h3>
              <p className="text-xs text-[#E8DECE] flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>{activeBooking.entryGate}</span>
              </p>
            </div>

            {/* Bay Code Badge */}
            <div className="flex sm:flex-col items-center justify-between sm:justify-center p-3 rounded-2xl bg-[#1A0A0F] border border-[#C6A15B]/40 px-5 shadow-inner">
              <span className="text-[10px] text-[#C6A15B] font-bold uppercase tracking-wider">
                Assigned Bay
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#C6A15B] leading-none mt-0.5">
                {activeBooking.slotCode}
              </span>
            </div>
          </div>

          {/* Vehicle & Time Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-5 border-b border-white/10 relative z-10 text-xs">
            <div className="p-3 rounded-xl bg-[#1A0A0F]/80 border border-white/5">
              <span className="text-[10px] text-[#B8ADA0] uppercase font-bold block">Vehicle Plate</span>
              <span className="text-sm font-black text-[#FFF9EF] tracking-wider block mt-0.5">
                {activeBooking.vehicleNumber}
              </span>
              <span className="text-[10px] text-[#10B981] font-bold uppercase">
                {activeBooking.vehicleType.toUpperCase()} PASS
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#1A0A0F]/80 border border-white/5">
              <span className="text-[10px] text-[#B8ADA0] uppercase font-bold block">Start Time</span>
              <span className="text-xs font-bold text-[#FFF9EF] block mt-0.5">
                {activeBooking.startTime}
              </span>
              <span className="text-[10px] text-[#B8ADA0]">Checked In</span>
            </div>

            <div className="p-3 rounded-xl bg-[#1A0A0F]/80 border border-white/5">
              <span className="text-[10px] text-[#B8ADA0] uppercase font-bold block">Valid Until</span>
              <span className="text-xs font-bold text-[#C6A15B] block mt-0.5">
                {activeBooking.endTime}
              </span>
              <span className="text-[10px] text-[#C6A15B] font-bold">
                {activeBooking.durationHours} Hours Allocated
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#1A0A0F]/80 border border-white/5">
              <span className="text-[10px] text-[#B8ADA0] uppercase font-bold block">Amount Paid</span>
              <span className="text-sm font-black text-[#FFF9EF] block mt-0.5">
                ₹{activeBooking.totalAmount}
              </span>
              <span className="text-[10px] text-[#10B981] font-bold">Paid Online (KMC)</span>
            </div>
          </div>

          {/* QR Code & Scan Instructions */}
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-5 border-b border-white/10 relative z-10">
            <div className="flex items-center gap-4">
              <div
                onClick={() => setShowQrEnlarged(!showQrEnlarged)}
                className="w-24 h-24 p-2 rounded-2xl bg-white flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition-transform"
              >
                {/* Visual stylized QR code */}
                <div className="w-full h-full border-2 border-black p-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-5 h-5 bg-black" />
                    <div className="w-5 h-5 bg-black" />
                  </div>
                  <div className="text-center font-mono text-[7px] text-black font-black leading-tight">
                    KMC PASS<br />SCAN ME
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-5 h-5 bg-black" />
                    <div className="w-4 h-4 bg-black" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#FFF9EF] block">
                  Scan at Barrier Ingress / Egress
                </span>
                <span className="text-[11px] text-[#B8ADA0] block mt-0.5">
                  Point QR directly at the optical camera scanner at Gate Barrier 1.
                </span>
                <span className="text-[10px] text-[#C6A15B] font-mono font-bold mt-1 block">
                  REF: {activeBooking.qrCodeValue}
                </span>
              </div>
            </div>

            {/* Free Shuttle Pass Included */}
            {activeBooking.includeShuttlePass && (
              <div
                onClick={onOpenShuttle}
                className="p-3.5 rounded-2xl bg-[#651E2B]/50 border border-[#C6A15B]/40 flex items-center gap-3 cursor-pointer hover:bg-[#651E2B]/70 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-[#22070E] flex-shrink-0">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black text-[#FFF9EF] block">
                    Free Shree Ambabai Darshan Shuttle
                  </span>
                  <span className="text-[11px] text-[#C6A15B] block">
                    Valid for all passengers on this pass • Tap for schedule
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-5 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onExtendBooking(activeBooking.id)}
                className="px-4 py-2.5 rounded-xl bg-[#651E2B] hover:bg-[#7E2837] text-xs font-bold text-[#FFF9EF] border border-[#C6A15B]/30 flex items-center gap-1.5 transition-colors cursor-pointer shadow"
              >
                <PlusCircle className="w-4 h-4 text-[#C6A15B]" />
                <span>Extend +1 Hour</span>
              </button>

              <button
                type="button"
                onClick={() => onOpenDirectionsForBooking(activeBooking.hubId)}
                className="px-4 py-2.5 rounded-xl bg-[#1A0A0F] hover:bg-[#22070E] text-xs font-bold text-[#E8DECE] border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#C6A15B]" />
                <span>Navigate to Lot</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2.5 rounded-xl bg-[#1A0A0F] hover:bg-[#22070E] text-xs font-bold text-[#E8DECE] border border-white/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#C6A15B]" />
                <span>{downloadSuccess ? 'Downloaded!' : 'Pass Receipt'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onCancelBooking(activeBooking.id)}
              className="px-3.5 py-2 rounded-xl bg-transparent hover:bg-white/5 text-xs font-bold text-[#EF4444] transition-colors cursor-pointer"
            >
              Check Out / Complete Visit
            </button>
          </div>

        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-[#22070E] border border-white/10 text-center space-y-3">
          <Ticket className="w-12 h-12 text-[#C6A15B] mx-auto opacity-70" />
          <h3 className="font-royal text-lg font-bold text-[#FFF9EF]">
            No Active Municipal Parking Passes
          </h3>
          <p className="text-xs text-[#B8ADA0] max-w-sm mx-auto">
            Reserve a bay at Mahalaxmi Temple, New Palace, or Rankala Lake to get your instant QR barrier pass.
          </p>
        </div>
      )}

      {/* Booking History */}
      {pastBookings.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="font-royal text-lg font-bold text-[#C6A15B]">
            Past Parking Passes & Receipts
          </h3>
          <div className="space-y-2">
            {pastBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-2xl bg-[#22070E] border border-white/5 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-[#FFF9EF]">{b.hubName}</div>
                  <div className="text-[11px] text-[#B8ADA0]">
                    Bay {b.slotCode} • {b.vehicleNumber} • {b.startTime}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-[#FFF9EF]">₹{b.totalAmount}</div>
                  <span className="text-[10px] font-bold text-[#B8ADA0]">COMPLETED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
