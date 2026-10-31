import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  currentRole: 'SEEKER' | 'OWNER' | 'ADMIN';
  onRoleClick: () => void;
  onNotificationsClick: () => void;
  unreadNotificationsCount: number;
  onProfileClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleClick,
  onNotificationsClick,
  unreadNotificationsCount,
  onProfileClick,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#031427]/90 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-2">
        {/* Left: Brand logo & KMC badges */}
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            alt="ParkKolhapur AI Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZ-z_sdPQiq8rXeKtXXk5jotWe812RkaczzMJMckqVa7KM4I2wabNHejrKoUmJIzVUAfW7NwNcwYEU1d4eUokEd54l5pr8G_gaS8paApXy-SAXVwi7-ZmSEH0JTspfhOTEA4pXfXS5FoWoMTY7wSsGXRcR1ZxilAMjzdBePrGOewRa2kvgQhGoOsCFTF2hXoJlq3SlQ9jz8TsvP_cwr4islPMPPNKFJHViYyQF7tFrORxGiFtG2VE1Gw"
          />
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[16px] text-[#d3e4fe] tracking-tight truncate leading-none">
                ParkKolhapur AI
              </span>
              <span className="text-[10px] font-extrabold text-[#ffb95f] px-1.5 py-0.5 rounded-full bg-[#ffb95f]/15 uppercase tracking-wider">
                KMC
              </span>
            </div>
            <span className="text-[12px] text-[#c6c6cd] leading-tight truncate mt-0.5">
              Kolhapur City
            </span>
          </div>
        </div>

        {/* Right: Role indicator, Bell, Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onRoleClick}
            title="Switch User Role"
            className="h-7 px-2.5 rounded-full bg-[#4edea3]/15 flex items-center gap-1.5 hover:bg-[#4edea3]/25 transition-colors cursor-pointer border border-[#4edea3]/20"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse"></span>
            <span className="text-[10px] font-extrabold text-[#4edea3] uppercase tracking-wider">
              {currentRole}
            </span>
          </button>

          <button
            onClick={onNotificationsClick}
            aria-label="Notifications"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1b2b3f]/70 text-[#d3e4fe] hover:bg-[#26364a] transition-colors relative border border-white/5 cursor-pointer"
          >
            <Bell className="w-4 h-4 text-[#d3e4fe]" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ffb95f] shadow-[0_0_8px_rgba(255,185,95,0.9)]" />
            )}
          </button>

          <button
            onClick={onProfileClick}
            aria-label="User Profile"
            className="w-10 h-10 flex items-center justify-center rounded-full ring-2 ring-transparent hover:ring-[#ffb95f]/50 transition-all cursor-pointer"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-[#45464d]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBri04i4z_Vm4ntLC4ltNi2wJUuVaD6azWdhw3VrDjxPBvb_F7FvJF11Z8jKCnx3m8z8j_HSV2z1vP7uBkZFmtIo0j2rZ6HCNE-5cz-Sy2WkpLnrikujWCamX6SUk-BkHZphjrAoz0btRPzPMEYbHF7J9qcwmV2y0_J7RxAld2wIJLKNk3LauBS-aiEt8SoJkbnkbWVa7YUOaakeEnF-1ix_6zqJfLWFLbVlTx_AopKdgLkZdjRnTodgg"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
