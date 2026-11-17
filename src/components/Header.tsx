import React from 'react';
import {
  Bell,
  Compass,
  MapPin,
  Car,
  Ticket,
  Bus,
  ShieldCheck,
  User,
  Sparkles,
  Menu,
  X,
  LogIn,
} from 'lucide-react';
import { UserAccount } from '../types';

interface HeaderProps {
  currentRole: 'SEEKER' | 'OWNER' | 'ADMIN';
  activeTab: string;
  onNavigateTab: (tab: any) => void;
  onRoleClick: () => void;
  onNotificationsClick: () => void;
  unreadNotificationsCount: number;
  onProfileClick: () => void;
  onOpenMap: () => void;
  onOpenShuttle: () => void;
  onOpenVehicles: () => void;
  onOpenAuth: () => void;
  currentUser: UserAccount | null;
  activeBookingsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  activeTab,
  onNavigateTab,
  onRoleClick,
  onNotificationsClick,
  unreadNotificationsCount,
  onProfileClick,
  onOpenMap,
  onOpenShuttle,
  onOpenVehicles,
  onOpenAuth,
  currentUser,
  activeBookingsCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#1A0A0F]/90 backdrop-blur-xl border-b border-[#C6A15B]/25 shadow-[0_4px_30px_rgba(34,7,14,0.6)]">
      <div className="max-w-7xl mx-auto h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Brand logo & KMC Royal Badge */}
        <div
          onClick={() => onNavigateTab('landing')}
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl gold-gradient-bg flex items-center justify-center text-[#22070E] font-black font-royal text-xl shadow-lg shadow-[#C6A15B]/25 group-hover:scale-105 transition-transform duration-300">
            K
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-royal font-bold text-lg sm:text-xl text-[#FFF9EF] tracking-tight truncate leading-none group-hover:text-[#C6A15B] transition-colors">
                ParkKolhapur AI
              </span>
              <span className="text-[10px] font-black text-[#22070E] px-2 py-0.5 rounded-full gold-gradient-bg uppercase tracking-wider shadow-sm">
                KMC
              </span>
            </div>
            <span className="text-[11px] text-[#C6A15B] font-semibold leading-tight truncate mt-0.5 flex items-center gap-1">
              <span>श्रीमंत छत्रपती शाहू नगरी</span>
              <span>•</span>
              <span>Smart Mobility</span>
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            type="button"
            onClick={() => onNavigateTab('landing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'landing'
                ? 'bg-[#651E2B] text-[#FFF9EF] border border-[#C6A15B]/40 shadow'
                : 'text-[#E8DECE] hover:text-[#FFF9EF] hover:bg-white/5'
            }`}
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('explore')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'explore'
                ? 'bg-[#651E2B] text-[#FFF9EF] border border-[#C6A15B]/40 shadow'
                : 'text-[#E8DECE] hover:text-[#FFF9EF] hover:bg-white/5'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Live Parking Hubs</span>
          </button>

          <button
            type="button"
            onClick={onOpenMap}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#E8DECE] hover:text-[#FFF9EF] hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Interactive Map</span>
          </button>

          <button
            type="button"
            onClick={onOpenShuttle}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#E8DECE] hover:text-[#FFF9EF] hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Bus className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Darshan E-Shuttle</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTab('bookings')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 relative ${
              activeTab === 'bookings'
                ? 'bg-[#651E2B] text-[#FFF9EF] border border-[#C6A15B]/40 shadow'
                : 'text-[#E8DECE] hover:text-[#FFF9EF] hover:bg-white/5'
            }`}
          >
            <Ticket className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>My Passes</span>
            {activeBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#10B981] text-[#1A0A0F] text-[9px] font-black flex items-center justify-center">
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenVehicles}
            className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#E8DECE] hover:text-[#FFF9EF] hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Car className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Garage</span>
          </button>

          {currentRole === 'OWNER' && (
            <button
              type="button"
              onClick={() => onNavigateTab('owner')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'owner' ? 'bg-[#651E2B] text-[#FFF9EF] border border-[#C6A15B]/40' : 'text-[#E8DECE]'
              }`}
            >
              Host Portal
            </button>
          )}

          {currentRole === 'ADMIN' && (
            <button
              type="button"
              onClick={() => onNavigateTab('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'admin' ? 'bg-[#651E2B] text-[#FFF9EF] border border-[#C6A15B]/40' : 'text-[#E8DECE]'
              }`}
            >
              KMC Admin
            </button>
          )}
        </nav>

        {/* Right: Actions, Role Switcher, Notification, Profile */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          
          {/* Role Indicator Button */}
          <button
            onClick={onRoleClick}
            type="button"
            title="Click to Switch Role"
            className="hidden sm:flex h-8 px-3 rounded-full bg-[#3D101C] border border-[#C6A15B]/40 items-center gap-1.5 hover:bg-[#651E2B] transition-colors cursor-pointer shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[10px] font-extrabold text-[#C6A15B] uppercase tracking-wider">
              {currentRole}
            </span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onNotificationsClick}
            type="button"
            aria-label="City Notifications"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#3D101C]/80 hover:bg-[#651E2B] text-[#FFF9EF] transition-all relative border border-[#C6A15B]/30 cursor-pointer shadow-sm"
          >
            <Bell className="w-4 h-4 text-[#C6A15B]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_8px_rgba(245,158,11,0.9)] animate-ping" />
            )}
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <button
              onClick={onProfileClick}
              type="button"
              className="flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-xl bg-[#3D101C] border border-[#C6A15B]/30 hover:border-[#C6A15B] transition-all cursor-pointer"
            >
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                alt={currentUser.name}
                className="w-7 h-7 rounded-lg object-cover border border-[#C6A15B]"
              />
              <span className="hidden sm:inline text-xs font-bold text-[#FFF9EF] max-w-[100px] truncate">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              type="button"
              className="h-10 px-4 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#3D101C] border border-[#C6A15B]/30 text-[#FFF9EF] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#22070E] border-b border-[#C6A15B]/30 px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            <button
              type="button"
              onClick={() => { onNavigateTab('landing'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#3D101C] text-left text-xs font-bold text-[#FFF9EF]"
            >
              Home (Landing)
            </button>
            <button
              type="button"
              onClick={() => { onNavigateTab('explore'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#3D101C] text-left text-xs font-bold text-[#FFF9EF]"
            >
              Live Parking Hubs
            </button>
            <button
              type="button"
              onClick={() => { onOpenMap(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#3D101C] text-left text-xs font-bold text-[#C6A15B]"
            >
              Interactive Map
            </button>
            <button
              type="button"
              onClick={() => { onOpenShuttle(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#3D101C] text-left text-xs font-bold text-[#C6A15B]"
            >
              Darshan Shuttle
            </button>
            <button
              type="button"
              onClick={() => { onNavigateTab('bookings'); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#3D101C] text-left text-xs font-bold text-[#FFF9EF]"
            >
              My Passes ({activeBookingsCount})
            </button>
            <button
              type="button"
              onClick={() => { onOpenVehicles(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-xl bg-[#3D101C] text-left text-xs font-bold text-[#FFF9EF]"
            >
              My Vehicles
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => { onRoleClick(); setMobileMenuOpen(false); }}
              className="text-xs font-bold text-[#C6A15B] flex items-center gap-1.5"
            >
              <span>Current Role: {currentRole}</span>
              <span className="text-[10px] text-white underline">(Change)</span>
            </button>
            {!currentUser && (
              <button
                type="button"
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="px-3 py-1.5 rounded-lg gold-gradient-bg text-[#22070E] font-bold text-xs"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
