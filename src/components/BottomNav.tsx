import React from 'react';
import { Compass, Ticket, ParkingCircle, ShieldCheck } from 'lucide-react';

export type TabType = 'explore' | 'bookings' | 'owner' | 'admin';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  activeBookingsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  activeBookingsCount,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#000f21]/95 backdrop-blur-2xl border-t border-white/10 shadow-[0_-8px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-2xl mx-auto grid grid-cols-4 items-center h-16 px-2">
        {/* Explore */}
        <button
          type="button"
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'explore' ? 'text-[#ffb95f]' : 'text-[#c6c6cd] hover:text-[#d3e4fe]'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] font-extrabold tracking-wide leading-none">
            Explore
          </span>
        </button>

        {/* Bookings */}
        <button
          type="button"
          onClick={() => onTabChange('bookings')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors relative cursor-pointer ${
            activeTab === 'bookings' ? 'text-[#ffb95f]' : 'text-[#c6c6cd] hover:text-[#d3e4fe]'
          }`}
        >
          <div className="relative">
            <Ticket className="w-5 h-5" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#4edea3] shadow-[0_0_6px_rgba(78,222,163,0.8)]" />
            )}
          </div>
          <span className="text-[10px] font-extrabold tracking-wide leading-none">
            Bookings
          </span>
        </button>

        {/* Owner Hub */}
        <button
          type="button"
          onClick={() => onTabChange('owner')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'owner' ? 'text-[#ffb95f]' : 'text-[#c6c6cd] hover:text-[#d3e4fe]'
          }`}
        >
          <ParkingCircle className="w-5 h-5" />
          <span className="text-[10px] font-extrabold tracking-wide leading-none">
            Owner Hub
          </span>
        </button>

        {/* Admin */}
        <button
          type="button"
          onClick={() => onTabChange('admin')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'admin' ? 'text-[#ffb95f]' : 'text-[#c6c6cd] hover:text-[#d3e4fe]'
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] font-extrabold tracking-wide leading-none">
            Admin
          </span>
        </button>
      </div>
    </nav>
  );
};
