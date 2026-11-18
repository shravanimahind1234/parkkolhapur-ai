import React from 'react';
import {
  Bell,
  Compass,
  MapPin,
  Ticket,
  Car,
  ShieldCheck,
  Building2,
  Sparkles,
  User,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';
import { UserAccount } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  currentRole: 'SEEKER' | 'OWNER' | 'ADMIN';
  onRoleClick: () => void;
  onNotificationsClick: () => void;
  unreadNotificationsCount: number;
  onProfileClick: () => void;
  activeNavTab: string;
  onNavTabChange: (tab: string) => void;
  currentUser: UserAccount;
  onAuthClick: () => void;
  onOpenVehicles: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleClick,
  onNotificationsClick,
  unreadNotificationsCount,
  onProfileClick,
  activeNavTab,
  onNavTabChange,
  currentUser,
  onAuthClick,
  onOpenVehicles,
}) => {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 inset-x-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#EFECE4] shadow-xs">
      <div className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Left: Kolhapur Royal Brand logo */}
        <div
          onClick={() => onNavTabChange('home')}
          className="flex items-center gap-2.5 cursor-pointer flex-shrink-0 group"
        >
          {/* Royal Kolhapur 'क' monogram */}
          <div className="w-10 h-10 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center font-serif text-xl font-black shadow-md border border-[#C6A15B]/30 group-hover:scale-105 transition-transform">
            क
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[17px] text-[#7B2638] font-serif tracking-tight leading-none">
                ParkKolhapur<span className="text-[#C6A15B] ml-0.5 font-sans text-xs uppercase font-extrabold">AI</span>
              </span>
              <span className="text-[9px] font-extrabold text-[#7B2638] px-1.5 py-0.5 rounded bg-[#C6A15B]/20 uppercase tracking-wider border border-[#C6A15B]/30">
                KMC
              </span>
            </div>
            <span className="text-[11px] text-[#5e5954] leading-tight mt-0.5 font-medium truncate max-w-[200px] sm:max-w-none">
              {t.nav.municipalMobility}
            </span>
          </div>
        </div>

        {/* Center: Dynamic Role-Based Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            type="button"
            onClick={() => onNavTabChange('home')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeNavTab === 'home'
                ? 'bg-[#7B2638] text-[#FFFDF8]'
                : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE]'
            }`}
          >
            {t.nav.home}
          </button>

          <button
            type="button"
            onClick={() => onNavTabChange('explore')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeNavTab === 'explore'
                ? 'bg-[#7B2638] text-[#FFFDF8]'
                : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE]'
            }`}
          >
            {t.nav.findParking}
          </button>

          <button
            type="button"
            onClick={() => onNavTabChange('map')}
            className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer ${
              activeNavTab === 'map'
                ? 'bg-[#7B2638] text-[#FFFDF8]'
                : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE]'
            }`}
          >
            {t.nav.liveMap}
          </button>

          {/* DYNAMIC DASHBOARD LINK ACCORDING TO ROLE */}
          {currentUser.role === 'CUSTOMER' && (
            <button
              type="button"
              onClick={() => onNavTabChange('customer-dashboard')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeNavTab === 'customer-dashboard' || activeNavTab === 'bookings'
                  ? 'bg-[#7B2638] text-[#FFFDF8]'
                  : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{t.nav.citizenDashboard}</span>
            </button>
          )}

          {currentUser.role === 'OWNER' && (
            <button
              type="button"
              onClick={() => onNavTabChange('owner-dashboard')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeNavTab === 'owner-dashboard' || activeNavTab === 'owner'
                  ? 'bg-[#7B2638] text-[#FFFDF8]'
                  : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{t.nav.ownerHub}</span>
            </button>
          )}

          {currentUser.role === 'ADMIN' && (
            <button
              type="button"
              onClick={() => onNavTabChange('admin-dashboard')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeNavTab === 'admin-dashboard' || activeNavTab === 'admin'
                  ? 'bg-[#7B2638] text-[#FFFDF8]'
                  : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-[#C6A15B]" />
              <span>{t.nav.adminCommand}</span>
            </button>
          )}
        </nav>

        {/* Right: Language Switcher, Role indicator, Bell, Profile/Auth */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Multilingual Selector: English, Marathi, Hindi */}
          <LanguageSwitcher />

          {/* Active Persona Badge */}
          <button
            onClick={onRoleClick}
            type="button"
            title="Switch Persona / Account"
            className="h-8 px-2 sm:px-2.5 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] flex items-center gap-1.5 transition-colors cursor-pointer border border-[#EFECE4]"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                currentUser.role === 'ADMIN'
                  ? 'bg-[#7B2638]'
                  : currentUser.role === 'OWNER'
                  ? 'bg-[#C6A15B]'
                  : 'bg-[#26965B]'
              } animate-pulse`}
            />
            <span className="text-[10px] font-extrabold text-[#7B2638] uppercase tracking-wider">
              {currentUser.role}
            </span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onNotificationsClick}
            type="button"
            aria-label="City Alerts & Notifications"
            className="w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center rounded-xl bg-[#F7F4EE] text-[#5e5954] hover:bg-[#EFECE4] hover:text-[#7B2638] transition-colors relative border border-[#EFECE4] cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#7B2638] ring-2 ring-[#FFFDF8]" />
            )}
          </button>

          {/* User Profile / Auth Button */}
          {currentUser.isLoggedIn ? (
            <button
              onClick={onProfileClick}
              type="button"
              aria-label="Citizen Account"
              className="flex items-center gap-1.5 sm:gap-2 h-8 sm:h-9 pl-1.5 sm:pl-2 pr-2.5 sm:pr-3 rounded-full bg-[#FFFDF8] border border-[#C6A15B]/40 hover:border-[#7B2638] transition-all cursor-pointer shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-[#7B2638] text-[#FFFDF8] font-bold text-xs flex items-center justify-center">
                {currentUser.name.charAt(0)}
              </div>
              <span className="text-[12px] font-bold text-[#7B2638] hidden sm:inline max-w-[110px] truncate">
                {currentUser.name}
              </span>
            </button>
          ) : (
            <button
              onClick={onAuthClick}
              type="button"
              className="h-8 sm:h-9 px-3 sm:px-3.5 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-[11px] sm:text-[12px] flex items-center gap-1 shadow-sm hover:bg-[#5e1c2a] transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{t.nav.signIn}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};