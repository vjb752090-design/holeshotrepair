import {
  GalleryPhoto,
  ManagerSettings,
  ReviewItem,
  RfqItem,
  ServiceItem,
  StaffAccess
} from '../types';
import {
  INITIAL_GALLERY,
  INITIAL_REVIEWS,
  INITIAL_RFQS,
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_STAFF
} from '../data/initialData';

const STORAGE_KEYS = {
  SERVICES: 'holeshot_services_v1',
  GALLERY: 'holeshot_gallery_v1',
  REVIEWS: 'holeshot_reviews_v1',
  RFQS: 'holeshot_rfqs_v1',
  STAFF: 'holeshot_staff_v1',
  SETTINGS: 'holeshot_settings_v1',
  SMS_LOGS: 'holeshot_sms_logs_v1'
};

export interface SmsDispatchLog {
  id: string;
  timestamp: string;
  recipientPhone: string;
  customerName: string;
  machine: string;
  messageText: string;
  status: 'sent' | 'simulated';
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Failed to load ${key} from storage:`, err);
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save ${key} to storage:`, err);
  }
}

export const StorageService = {
  getServices: (): ServiceItem[] => loadFromStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES),
  saveServices: (services: ServiceItem[]) => saveToStorage(STORAGE_KEYS.SERVICES, services),

  getGallery: (): GalleryPhoto[] => loadFromStorage(STORAGE_KEYS.GALLERY, INITIAL_GALLERY),
  saveGallery: (gallery: GalleryPhoto[]) => saveToStorage(STORAGE_KEYS.GALLERY, gallery),

  getReviews: (): ReviewItem[] => loadFromStorage(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS),
  saveReviews: (reviews: ReviewItem[]) => saveToStorage(STORAGE_KEYS.REVIEWS, reviews),

  getRfqs: (): RfqItem[] => loadFromStorage(STORAGE_KEYS.RFQS, INITIAL_RFQS),
  saveRfqs: (rfqs: RfqItem[]) => saveToStorage(STORAGE_KEYS.RFQS, rfqs),

  getStaff: (): StaffAccess[] => loadFromStorage(STORAGE_KEYS.STAFF, INITIAL_STAFF),
  saveStaff: (staff: StaffAccess[]) => saveToStorage(STORAGE_KEYS.STAFF, staff),

  getSettings: (): ManagerSettings => loadFromStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS),
  saveSettings: (settings: ManagerSettings) => saveToStorage(STORAGE_KEYS.SETTINGS, settings),

  getSmsLogs: (): SmsDispatchLog[] => loadFromStorage(STORAGE_KEYS.SMS_LOGS, []),
  saveSmsLogs: (logs: SmsDispatchLog[]) => saveToStorage(STORAGE_KEYS.SMS_LOGS, logs),

  addSmsLog: (log: Omit<SmsDispatchLog, 'id' | 'timestamp'>) => {
    const logs = StorageService.getSmsLogs();
    const newLog: SmsDispatchLog = {
      ...log,
      id: `sms-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    const updated = [newLog, ...logs].slice(0, 50);
    StorageService.saveSmsLogs(updated);
    return newLog;
  }
};
