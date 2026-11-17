import React from 'react';
import { X, Navigation, MapPin, Compass, ArrowRight, ExternalLink } from 'lucide-react';
import { ParkingHub } from '../types';

interface DirectionsModalProps {
  hub: ParkingHub;
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  hub,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${hub.coordinates.lat},${hub.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border border-[#C6A15B]/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#FFF9EF]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl gold-gradient-bg flex items-center justify-center text-[#22070E]">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF]">
                Navigation Route
              </h3>
              <p className="text-xs text-[#C6A15B]">
                {hub.name} • {hub.distance}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-[#FFF9EF] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Route Steps */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <div className="p-3.5 rounded-2xl bg-[#651E2B]/40 border border-[#C6A15B]/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#C6A15B]">Corridor Target</span>
              <span className="font-bold text-sm text-[#FFF9EF] block">{hub.area}</span>
              <span className="text-[11px] text-[#B8ADA0]">{hub.heritageDistance}</span>
            </div>
            <button
              type="button"
              onClick={openGoogleMaps}
              className="px-3 py-1.5 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs flex items-center gap-1 shadow cursor-pointer whitespace-nowrap"
            >
              <span>Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#C6A15B] block">
              Turn-By-Turn Kolhapur Guidance
            </span>

            {[
              {
                step: '1',
                title: 'Proceed towards Bhausingji Road',
                instruction: 'Follow the illuminated municipal smart parking signage towards Bhavani Mandap archway.',
                dist: '450m',
              },
              {
                step: '2',
                title: 'Pass through KMC Edge Ingress Scanner',
                instruction: 'Maintain 10 km/h speed. Camera will recognize vehicle license plate MH 09 DX 4521 or scan your mobile QR.',
                dist: '100m',
              },
              {
                step: '3',
                title: 'Park at Assigned Bay',
                instruction: 'Follow floor LED arrows to your designated bay. E-shuttle stands immediately opposite the barrier gate.',
                dist: 'At Gate',
              },
            ].map((st) => (
              <div key={st.step} className="p-3.5 rounded-2xl bg-[#1A0A0F] border border-white/5 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#651E2B] text-[#C6A15B] font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {st.step}
                </div>
                <div>
                  <div className="font-bold text-[#FFF9EF] flex items-center justify-between">
                    <span>{st.title}</span>
                    <span className="text-[10px] text-[#C6A15B] font-mono">{st.dist}</span>
                  </div>
                  <p className="text-[11px] text-[#B8ADA0] mt-0.5 leading-snug">
                    {st.instruction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#22070E] border-t border-white/10 flex items-center justify-between">
          <span className="text-[11px] text-[#B8ADA0]">
            Emergency Helpline: 1800 233 1234
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs"
          >
            Got It
          </button>
        </div>

      </div>
    </div>
  );
};
