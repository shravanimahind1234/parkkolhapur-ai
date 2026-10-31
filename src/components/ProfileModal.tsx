import React, { useState } from 'react';
import { X, Car, Shield, Check, CreditCard, Sparkles } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: 'SEEKER' | 'OWNER' | 'ADMIN';
  onRoleChange: (role: 'SEEKER' | 'OWNER' | 'ADMIN') => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  onRoleChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md bg-[#0b1c30] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-3">
            <img
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#ffb95f]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBri04i4z_Vm4ntLC4ltNi2wJUuVaD6azWdhw3VrDjxPBvb_F7FvJF11Z8jKCnx3m8z8j_HSV2z1vP7uBkZFmtIo0j2rZ6HCNE-5cz-Sy2WkpLnrikujWCamX6SUk-BkHZphjrAoz0btRPzPMEYbHF7J9qcwmV2y0_J7RxAld2wIJLKNk3LauBS-aiEt8SoJkbnkbWVa7YUOaakeEnF-1ix_6zqJfLWFLbVlTx_AopKdgLkZdjRnTodgg"
            />
            <div>
              <h3 className="text-[16px] font-bold text-[#d3e4fe]">
                Kolhapur Resident Account
              </h3>
              <p className="text-[12px] text-[#c6c6cd]">
                Verified Citizen ID • KMC Transit
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b2b3f] text-[#c6c6cd] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Switch Role Selection */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider block">
            Switch Persona / View
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['SEEKER', 'OWNER', 'ADMIN'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => {
                  onRoleChange(role);
                }}
                className={`h-11 rounded-xl text-[12px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                  currentRole === role
                    ? 'bg-[#ffb95f] text-[#472a00] shadow-md'
                    : 'bg-[#1b2b3f] text-[#d3e4fe] hover:bg-[#26364a]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Registered Vehicles */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#c6c6cd] uppercase tracking-wider block">
            Saved Kolhapur Vehicles
          </label>
          <div className="p-3 rounded-xl bg-[#102034] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Car className="w-4 h-4 text-[#ffb95f]" />
              <div>
                <span className="text-[13px] font-extrabold text-[#d3e4fe] block">
                  MH 09 DX 4521
                </span>
                <span className="text-[11px] text-[#8a9bb5]">
                  Honda City • FastTag Active
                </span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-[#4edea3] bg-[#001c10] border border-[#4edea3]/30 px-2 py-0.5 rounded">
              DEFAULT
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#102034] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Car className="w-4 h-4 text-[#38bdf8]" />
              <div>
                <span className="text-[13px] font-extrabold text-[#d3e4fe] block">
                  MH 09 BE 1090
                </span>
                <span className="text-[11px] text-[#8a9bb5]">
                  Activa 6G • 2-Wheeler
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-[#1b2b3f] hover:bg-[#26364a] text-[#d3e4fe] font-bold text-[13px] transition-colors cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
