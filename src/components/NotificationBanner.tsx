import React from 'react';
import { Bell, MessageSquare, X, ArrowRight, Phone } from 'lucide-react';

export interface ActiveNotification {
  id: string;
  title: string;
  recipientPhone: string;
  customerName: string;
  machine: string;
  issue: string;
}

interface NotificationBannerProps {
  notification: ActiveNotification | null;
  onDismiss: () => void;
  onOpenManager: () => void;
}

export const NotificationBanner: React.FC<NotificationBannerProps> = ({
  notification,
  onDismiss,
  onOpenManager
}) => {
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-5 duration-300">
      <div className="rounded-2xl bg-neutral-900 border-2 border-amber-500 shadow-2xl p-5 text-neutral-100 space-y-3 relative overflow-hidden">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <Bell className="w-4 h-4" />
            <span>MANAGER SMS ALERT DISPATCHED</span>
          </div>

          <button
            onClick={onDismiss}
            className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1 text-xs">
          <div className="font-semibold text-white text-sm">
            {notification.title}
          </div>
          <div className="text-neutral-300">
            Machine: <strong className="text-white">{notification.machine}</strong>
          </div>
          <div className="text-neutral-400">
            Customer: {notification.customerName} · Alert sent to: <span className="font-mono text-amber-400">{notification.recipientPhone}</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between gap-2 border-t border-neutral-800 text-xs">
          <a
            href={`sms:${notification.recipientPhone.replace(/[^0-9+]/g, '')}?&body=New Hole Shot RFQ from ${notification.customerName} for ${notification.machine}: ${notification.issue}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-amber-400 border border-neutral-800 font-semibold"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Open Phone SMS</span>
          </a>

          <button
            onClick={() => {
              onDismiss();
              onOpenManager();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-all"
          >
            <span>Review RFQ</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
