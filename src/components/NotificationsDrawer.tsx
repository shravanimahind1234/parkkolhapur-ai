import React from 'react';
import { X, Bell, AlertTriangle, Info, CheckCircle2, CheckCheck } from 'lucide-react';
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

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-[#D94B4B]" />;
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-[#26965B]" />;
      case 'info':
      default:
        return <Info className="w-4 h-4 text-[#7B2638]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FFFDF8] border-t sm:border border-[#C6A15B]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 space-y-4 max-h-[85vh] overflow-y-auto no-scrollbar text-left">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#7B2638]" />
            <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
              Kolhapur City Alerts
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-2.5">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                notif.unread
                  ? 'bg-[#FFFFFF] border-[#C6A15B]/50 shadow-xs'
                  : 'bg-[#F7F4EE] border-[#EFECE4] opacity-80'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-2 rounded-xl flex-shrink-0 ${
                    notif.type === 'alert'
                      ? 'bg-[#fdf0f0]'
                      : notif.type === 'success'
                      ? 'bg-[#edf8f2]'
                      : 'bg-[#C6A15B]/15'
                  }`}
                >
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-[13px] font-bold text-[#292725] leading-snug truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] text-[#8a847e] flex-shrink-0">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#5e5954] mt-1 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-[#EFECE4] flex items-center justify-between">
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="text-[12px] font-bold text-[#7B2638] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="h-9 px-4 rounded-xl bg-[#7B2638] text-[#FFFDF8] text-[12px] font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};