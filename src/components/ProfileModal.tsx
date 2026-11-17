import React from 'react';
import {
  X,
  User,
  ShieldCheck,
  ParkingCircle,
  CheckCircle2,
  Phone,
  Mail,
  Award,
  LogOut,
} from 'lucide-react';
import { UserAccount } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: 'SEEKER' | 'OWNER' | 'ADMIN';
  onRoleChange: (newRole: 'SEEKER' | 'OWNER' | 'ADMIN') => void;
  currentUser?: UserAccount | null;
  onSignOut?: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange,
  currentUser,
  onSignOut,
}) => {
  if (!isOpen) return null;

  const roles = [
    {
      id: 'SEEKER',
      title: 'Pilgrim / Citizen Seeker',
      desc: 'Find live parking bays, book temple passes, and ride free e-shuttles.',
      icon: User,
    },
    {
      id: 'OWNER',
      title: 'Private Lot Host / Owner',
      desc: 'List vacant plots, manage parking bays, and receive daily municipal payouts.',
      icon: ParkingCircle,
    },
    {
      id: 'ADMIN',
      title: 'KMC Municipal Officer',
      desc: 'City-wide sensor telemetry, aarti surge AI control, and edge node monitoring.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border border-[#C6A15B]/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#FFF9EF]">
        
        {/* Header */}
        <div className="p-5 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
              alt="Profile"
              className="w-11 h-11 rounded-2xl object-cover border-2 border-[#C6A15B]"
            />
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF] leading-tight">
                {currentUser?.name || 'Kolhapur Citizen'}
              </h3>
              <span className="text-xs text-[#C6A15B] font-semibold">
                {currentUser?.email || 'citizen@kolhapur.gov.in'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roles Selection */}
        <div className="p-5 space-y-4">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#C6A15B] block mb-2">
              Active Municipal Role
            </span>
            <div className="space-y-2">
              {roles.map((r) => {
                const Icon = r.icon;
                const isSelected = currentRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      onRoleChange(r.id as any);
                      onClose();
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#651E2B] border-[#C6A15B] shadow-lg shadow-[#651E2B]/40'
                        : 'bg-[#1A0A0F]/70 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[#22070E] border border-white/10 flex items-center justify-center flex-shrink-0 text-[#C6A15B]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#FFF9EF]">{r.title}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#10B981]" />}
                      </div>
                      <p className="text-[11px] text-[#B8ADA0] mt-0.5 leading-snug">
                        {r.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Citizen Helpline */}
          <div className="p-3.5 rounded-2xl bg-[#1A0A0F] border border-white/5 text-xs text-[#B8ADA0] space-y-1">
            <span className="font-bold text-[#FFF9EF] block">Kolhapur Municipal Corporation (KMC)</span>
            <p>Smart Mobility Office, Bhausingji Road</p>
            <p className="text-[#C6A15B] font-semibold">Toll-Free Helpline: 1800 233 1234</p>
          </div>
        </div>

        {/* Sign Out Button if logged in */}
        {onSignOut && (
          <div className="p-4 bg-[#22070E] border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-xs font-bold text-[#EF4444] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
