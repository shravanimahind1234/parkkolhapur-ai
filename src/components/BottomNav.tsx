import React from 'react';
import { Home, Compass, MapPin, Ticket, ParkingCircle, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { UserRole } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

export type TabType =
  | 'home'
  | 'explore'
  | 'map'
  | 'bookings'
  | 'owner'
  | 'admin'
  | 'customer-dashboard'
  | 'owner-dashboard'
  | 'admin-dashboard';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  activeBookingsCount: number;
  userRole?: UserRole;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  activeBookingsCount,
  userRole = 'CUSTOMER',
}) => {
  const { t } = useLanguage();

  const getDashboardTarget = (): TabType => {
    if (userRole === 'OWNER') return 'owner-dashboard';
    if (userRole === 'ADMIN') return 'admin-dashboard';
    return 'customer-dashboard';
  };

  const isDashboardActive =
    activeTab === 'customer-dashboard' ||
    activeTab === 'owner-dashboard' ||
    activeTab === 'admin-dashboard';

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#FFFDF8]/98 backdrop-blur-xl border-t border-[#EFECE4] shadow-[0_-4px_20px_rgba(41,39,37,0.06)]">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center h-16 px-1">
        {/* Home */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'home' ? 'text-[#7B2638]' : 'text-[#8a847e] hover:text-[#292725]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-tight leading-none truncate max-w-[65px]">
            {t.nav.home}
          </span>
          {activeTab === 'home' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
          )}
        </button>

        {/* Explore */}
        <button
          type="button"
          onClick={() => onTabChange('explore')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'explore' ? 'text-[#7B2638]' : 'text-[#8a847e] hover:text-[#292725]'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-tight leading-none truncate max-w-[65px]">
            {t.nav.findParking}
          </span>
          {activeTab === 'explore' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
          )}
        </button>

        {/* Live Map */}
        <button
          type="button"
          onClick={() => onTabChange('map')}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors cursor-pointer ${
            activeTab === 'map' ? 'text-[#7B2638]' : 'text-[#8a847e] hover:text-[#292725]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-tight leading-none truncate max-w-[65px]">
            {t.nav.liveMap}
          </span>
          {activeTab === 'map' && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
          )}
        </button>

        {/* Dynamic User Dashboard */}
        <button
          type="button"
          onClick={() => onTabChange(getDashboardTarget())}
          className={`flex flex-col items-center justify-center gap-1 h-full min-h-[44px] transition-colors relative cursor-pointer ${
            isDashboardActive ? 'text-[#7B2638]' : 'text-[#8a847e] hover:text-[#292725]'
          }`}
        >
          <div className="relative">
            <LayoutDashboard className="w-4 h-4" />
            {activeBookingsCount > 0 && userRole === 'CUSTOMER' && (
              <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#26965B]" />
            )}
          </div>
          <span className="text-[10px] font-bold tracking-tight leading-none truncate max-w-[65px]">
            {userRole === 'ADMIN' ? 'Admin' : userRole === 'OWNER' ? 'Owner' : 'Dashboard'}
          </span>
          {isDashboardActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#7B2638]" />
          )}
        </button>
      </div>
    </nav>
  );
};