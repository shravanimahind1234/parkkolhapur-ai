import React from 'react';
import { X, Bell, CheckCircle2, AlertTriangle, Info, Clock } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/75 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm h-full bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border-l border-[#C6A15B]/35 shadow-2xl flex flex-col text-[#FFF9EF]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C6A15B]" />
            <h3 className="font-royal text-base font-bold text-[#FFF9EF]">
              City Alerts & Feeds
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all text-xs ${
                item.unread
                  ? 'bg-[#651E2B]/40 border-[#C6A15B]/40 shadow-sm'
                  : 'bg-[#1A0A0F]/80 border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {item.type === 'alert' && <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />}
                  {item.type === 'info' && <Info className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />}
                  {item.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0" />}
                  <span className="font-bold text-[#FFF9EF]">{item.title}</span>
                </div>
                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#C6A15B] flex-shrink-0 mt-1" />
                )}
              </div>

              <p className="text-[11px] text-[#E8DECE] mt-1.5 leading-relaxed">
                {item.message}
              </p>

              <div className="flex items-center gap-1 text-[10px] text-[#B8ADA0] mt-2">
                <Clock className="w-3 h-3" />
                <span>{item.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#22070E] border-t border-white/10">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase tracking-wider"
          >
            Mark All as Read
          </button>
        </div>

      </div>
    </div>
  );
};
