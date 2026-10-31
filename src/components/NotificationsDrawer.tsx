import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0b1c30] border-t sm:border border-white/10 rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-200">
        <div className="p-4 bg-[#102034] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#ffb95f]" />
            <h3 className="text-[16px] font-bold text-[#d3e4fe]">
              KMC Transit & City Alerts
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1b2b3f] text-[#c6c6cd] hover:text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1 no-scrollbar">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl border transition-all ${
                n.unread
                  ? 'bg-[#1b2b3f]/70 border-[#ffb95f]/30'
                  : 'bg-[#102034] border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {n.type === 'alert' && (
                    <AlertTriangle className="w-4 h-4 text-[#ffb4ab] flex-shrink-0" />
                  )}
                  {n.type === 'info' && (
                    <Info className="w-4 h-4 text-[#ffb95f] flex-shrink-0" />
                  )}
                  {n.type === 'success' && (
                    <CheckCircle className="w-4 h-4 text-[#4edea3] flex-shrink-0" />
                  )}
                  <h4 className="text-[13px] font-bold text-[#d3e4fe]">
                    {n.title}
                  </h4>
                </div>
                <span className="text-[10px] text-[#8a9bb5] flex-shrink-0">
                  {n.time}
                </span>
              </div>
              <p className="text-[12px] text-[#c6c6cd] mt-1 leading-snug">
                {n.message}
              </p>
            </div>
          ))}
        </div>

        <div className="p-3 bg-[#102034] border-t border-white/5 flex gap-2">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="flex-1 h-10 rounded-xl bg-[#1b2b3f] text-[#c6c6cd] hover:text-white text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Mark All as Read
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-10 rounded-xl bg-[#ffb95f] text-[#472a00] text-[12px] font-bold shadow transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
