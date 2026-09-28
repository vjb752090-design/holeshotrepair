export type EngineCategory = 
  | 'motorcycle'
  | 'dirtbike'
  | 'atv'
  | 'lawn_garden'
  | 'generator'
  | 'outboard'
  | 'other';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  price: string;
  hourlyRate?: string;
  estimatedTime: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  dateAdded: string;
  isBeforeAfter?: boolean;
  beforeImageUrl?: string;
}

export type ReviewPlatform = 'google' | 'yelp' | 'facebook' | 'direct';

export interface ReviewItem {
  id: string;
  author: string;
  role?: string;
  rating: number;
  date: string;
  platform: ReviewPlatform;
  text: string;
  equipment?: string;
  verified?: boolean;
  ownerReply?: {
    author: string;
    text: string;
    date: string;
  };
}

export type RfqStatus = 'new' | 'quoted' | 'in_progress' | 'completed' | 'declined';

export interface RfqItem {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  preferredContact: 'phone' | 'sms' | 'email';
  engineType: EngineCategory;
  yearMakeModel: string;
  issueDescription: string;
  urgency: 'flexible' | 'standard' | 'rush';
  photos?: string[];
  status: RfqStatus;
  quote?: {
    estimatedLaborHours: number;
    hourlyLaborRate: number;
    partsEstimate: number;
    shopSupplies: number;
    totalAmount: number;
    estimatedDays: string;
    notes: string;
    quotedAt: string;
    quotedBy: string;
  };
}

export interface StaffAccess {
  id: string;
  name: string;
  pin: string;
  role: 'Owner / Manager' | 'Lead Tech' | 'Service Advisor' | 'Apprentice';
  permissions: {
    canEditPrices: boolean;
    canAddPhotos: boolean;
    canManageRfqs: boolean;
    canModerateReviews: boolean;
    canManageAccess: boolean;
  };
  addedAt: string;
}

export interface ManagerSettings {
  masterPin: string;
  notificationPhone: string;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  notifyOnRfq: boolean;
  soundAlertsEnabled: boolean;
  lastPinChangeDate: string;
}
