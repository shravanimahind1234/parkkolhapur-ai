import React from 'react';
import { X, Car, Shield, Check, CreditCard, Sparkles, User, LogOut, LayoutDashboard, Building2, ShieldAlert } from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { DEMO_ACCOUNTS } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onSwitchUser: (user: UserAccount) => void;
  onOpenVehicles: () => void;
  onOpenDashboard: () => void;
  onSignOut: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
  onOpenVehicles,
  onOpenDashboard,
  onSignOut,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FFFDF8] border-t sm:border border-[#C6A15B]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden p-6 space-y-4 text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#7B2638] text-[#FFFDF8] font-serif font-black text-xl flex items-center justify-center shadow-md">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                  {currentUser.name}
                </h3>
                <span
                  className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                    currentUser.role === 'ADMIN'
                      ? 'bg-[#7B2638] text-white'
                      : currentUser.role === 'OWNER'
                      ? 'bg-[#C6A15B] text-black'
                      : 'bg-[#edf8f2] text-[#26965B]'
                  }`}
                >
                  {currentUser.role}
                </span>
              </div>
              <p className="text-[11px] text-[#5e5954] mt-0.5">
                {currentUser.citizenBadge} • UID: {currentUser.id.slice(0, 10)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action: Open Dashboard */}
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenDashboard();
          }}
          className="w-full h-11 rounded-2xl bg-[#7B2638] text-[#FFFDF8] font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#5e1c2a] transition-all cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4 text-[#C6A15B]" />
          <span>
            Open {currentUser.role === 'ADMIN' ? 'Admin Command' : currentUser.role === 'OWNER' ? 'Owner Hub' : 'Citizen Dashboard'}
          </span>
        </button>

        {/* Switch Persona / Account Selection for Multi-Account Testing */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-[#5e5954] uppercase tracking-wider block">
            Switch Test Persona (Strict Isolation)
          </label>
          <div className="space-y-1.5">
            {DEMO_ACCOUNTS.map((acc) => {
              const isCurrent = acc.id === currentUser.id;
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => {
                    onSwitchUser(acc);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#F7F4EE] border-[#7B2638] ring-1 ring-[#7B2638]'
                      : 'bg-white border-[#EFECE4] hover:bg-[#FFFDF8]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                        acc.role === 'ADMIN'
                          ? 'bg-[#7B2638] text-white'
                          : acc.role === 'OWNER'
                          ? 'bg-[#C6A15B] text-black'
                          : 'bg-[#edf8f2] text-[#26965B]'
                      }`}
                    >
                      {acc.role === 'ADMIN' ? <ShieldAlert className="w-4 h-4" /> : acc.role === 'OWNER' ? <Building2 className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-bold text-[#292725]">{acc.name}</span>
                        <span className="text-[9px] font-bold text-[#8a847e] uppercase">({acc.role})</span>
                      </div>
                      <span className="text-[10px] text-[#5e5954] block">{acc.email}</span>
                    </div>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] font-bold text-[#26965B] bg-[#edf8f2] px-2 py-0.5 rounded">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Registered Vehicles Summary */}
        {currentUser.role === 'CUSTOMER' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-[#5e5954] uppercase tracking-wider">
                Saved Vehicles ({currentUser.vehicles.length})
              </label>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenVehicles();
                }}
                className="text-[11px] font-bold text-[#7B2638] hover:underline cursor-pointer"
              >
                Manage
              </button>
            </div>

            <div className="space-y-1.5">
              {currentUser.vehicles.slice(0, 2).map((v) => (
                <div
                  key={v.id}
                  className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] flex items-center justify-between shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-[#7B2638]" />
                    <span className="text-[12px] font-mono font-bold text-[#292725]">
                      {v.plateNumber}
                    </span>
                  </div>
                  {v.isDefault && (
                    <span className="text-[8px] font-bold text-[#26965B] bg-[#edf8f2] px-1.5 py-0.2 rounded">
                      DEFAULT
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sign Out Button */}
        <div className="pt-2 border-t border-[#EFECE4] flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onSignOut}
            className="h-10 px-4 rounded-xl bg-[#fdf0f0] hover:bg-[#fbdada] text-[#D94B4B] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};