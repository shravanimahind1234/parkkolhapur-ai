import React from 'react';
import { X, Navigation, MapPin, Compass, ExternalLink, ShieldCheck } from 'lucide-react';
import { ParkingHub } from '../types';

interface DirectionsModalProps {
  hub: ParkingHub | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  hub,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !hub) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#0b1c30] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom duration-200">
        {/* Modal Header */}
        <div className="p-4 bg-[#102034] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#d3e4fe]">
                Turn-by-Turn Navigation
              </h3>
              <p className="text-[11px] text-[#c6c6cd]">
                Destination: {hub.name}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b2b3f] text-[#c6c6cd] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Visual Route Header Card */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-[#1b2b3f] to-[#102034] border border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#4edea3] tracking-wider">
                  FASTEST APPROACH
                </span>
                <h4 className="text-[20px] font-extrabold text-[#d3e4fe] mt-0.5">
                  {hub.walkingTimeMin} mins ({hub.distance})
                </h4>
              </div>
              <span className="text-[12px] font-bold text-[#ffb95f] px-2.5 py-1 rounded-full bg-[#ffb95f]/15 border border-[#ffb95f]/30">
                Low Congestion
              </span>
            </div>
            <p className="text-[12px] text-[#c6c6cd] mt-2">
              Route via Bhausingji Road & Bhavani Mandap Heritage Gate. KMC sensor lane active.
            </p>
          </div>

          {/* Turn Steps */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider block">
              Waypoint Guidance
            </span>

            <div className="flex items-start gap-3 text-[13px]">
              <div className="w-6 h-6 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                1
              </div>
              <div className="flex-1">
                <p className="text-[#d3e4fe] font-semibold">
                  Head toward Bhavani Mandap Road
                </p>
                <p className="text-[11px] text-[#8a9bb5]">Continue straight for 150m past historic arch</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[13px]">
              <div className="w-6 h-6 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                2
              </div>
              <div className="flex-1">
                <p className="text-[#d3e4fe] font-semibold">
                  Turn Right into Municipal Smart Lot Gate 2
                </p>
                <p className="text-[11px] text-[#8a9bb5]">
                  FastTag / ALPR camera will scan your license plate automatically
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-[13px]">
              <div className="w-6 h-6 rounded-full bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-[#4edea3] font-semibold">
                  Arrive at {hub.name}
                </p>
                <p className="text-[11px] text-[#8a9bb5]">
                  Overhead LED will guide you to your reserved bay
                </p>
              </div>
            </div>
          </div>

          {/* Barrier info */}
          <div className="p-3 rounded-xl bg-[#001c10] border border-[#4edea3]/30 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#4edea3] flex-shrink-0" />
            <p className="text-[11px] text-[#d3e4fe]">
              Equipped with KMC Edge automatic boom barrier. No physical ticket required.
            </p>
          </div>

          {/* External Map Action */}
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${hub.coordinates.lat},${hub.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-xl bg-[#1b2b3f] hover:bg-[#26364a] text-[#d3e4fe] text-[13px] font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#ffb95f]" />
            <span>Open in Google Maps / GPS</span>
          </a>
        </div>
      </div>
    </div>
  );
};
