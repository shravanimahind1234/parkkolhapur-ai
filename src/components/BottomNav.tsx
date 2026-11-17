import React from 'react';
import { Home, Compass, Ticket, ParkingCircle, ShieldCheck } from 'lucide-react';

export type TabType = 'landing' | 'explore' | 'bookings' | 'owner' | 'admin';

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
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#1A0A0F]/95 backdrop-blur-2xl border-t border-[#C6A15B]/30 shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto grid grid-cols-5 items-center h-16 px-1">
        {/* Home */}
        <button
          type="button"
          onClick={() => onTabChange('landing')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'landing' ? 'text-[#C6A15B]' : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-extrabold tracking-wide leading-none">
            Home
          </span>
        </button>

        {/* Explore Hubs */}
        <button
          type="button"
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'explore' ? 'text-[#C6A15B]' : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[9px] font-extrabold tracking-wide leading-none">
            Hubs
          </span>
        </button>

        {/* Bookings Passes */}
        <button
          type="button"
          onClick={() => onTabChange('bookings')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors relative cursor-pointer ${
            activeTab === 'bookings' ? 'text-[#C6A15B]' : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
          }`}
        >
          <div className="relative">
            <Ticket className="w-4 h-4" />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.9)]" />
            )}
          </div>
          <span className="text-[9px] font-extrabold tracking-wide leading-none">
            Passes
          </span>
        </button>

        {/* Owner Hub */}
        <button
          type="button"
          onClick={() => onTabChange('owner')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'owner' ? 'text-[#C6A15B]' : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
          }`}
        >
          <ParkingCircle className="w-4 h-4" />
          <span className="text-[9px] font-extrabold tracking-wide leading-none">
            Host
          </span>
        </button>

        {/* Admin */}
        <button
          type="button"
          onClick={() => onTabChange('admin')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'admin' ? 'text-[#C6A15B]' : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span className="text-[9px] font-extrabold tracking-wide leading-none">
            Admin
          </span>
        </button>
      </div>
    </nav>
  );
};
