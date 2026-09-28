import { GalleryPhoto, ManagerSettings, ReviewItem, RfqItem, ServiceItem, StaffAccess } from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'carb-clean-rebuild',
    title: 'Precision Carburetor Sonic Clean & Rebuild',
    category: 'Carburetors & Fuel',
    price: '$95 – $145',
    hourlyRate: '$85 / hr bench',
    estimatedTime: '1 – 2 Business Days',
    description: 'Complete teardown, industrial ultrasonic tank bath, float height calibration, brass jets inspection, and fresh bowl gaskets.',
    features: [
      'Multi-stage ultrasonic chemical cleaning',
      'OEM jet sizing and needle inspection',
      'Air-fuel mixture screw synchronization',
      'Ethanol fuel degradation inspection'
    ],
    popular: true
  },
  {
    id: 'trail-dirtbike-tuneup',
    title: 'Motorcycle & Trail Bike Full Tune-Up (Honda CT110, YZ, CRF)',
    category: 'Motorcycles & Powersports',
    price: '$140 – $220',
    hourlyRate: '$85 / hr',
    estimatedTime: '2 – 3 Days',
    description: 'Specialty service for vintage and modern trail bikes, dirt bikes, and dual-sports. Full valve clearance check, ignition timing, and oil flush.',
    features: [
      'Valve lash clearance check & adjustment',
      'NGK spark plug replacement & gap calibration',
      'Clutch cable free-play & brake inspection',
      'Compression test & road test verification'
    ],
    popular: true
  },
  {
    id: 'top-end-cylinder-rebuild',
    title: 'Top-End Engine Rebuild & Cylinder Hone',
    category: 'Engine Overhauls',
    price: '$350 – $650',
    hourlyRate: '$90 / hr',
    estimatedTime: '3 – 5 Days (parts dependent)',
    description: 'Piston, ring, pin, and gasket replacement. Cylinder bore deglazing, hone cross-hatching, and cylinder head torqueing to factory spec.',
    features: [
      'Micrometer cylinder bore tolerance measurement',
      'Cross-hatch flex-hone finish for rapid ring seating',
      'New OEM or Wiseco piston & ring assembly',
      'New wrist-pin circlips & high-temp base gaskets'
    ]
  },
  {
    id: 'atv-utv-drive-service',
    title: 'ATV & UTV Comprehensive Drivetrain & Engine Service',
    category: 'ATVs & Side-by-Sides',
    price: '$180 – $290',
    hourlyRate: '$85 / hr',
    estimatedTime: '2 – 3 Days',
    description: 'Complete inspection of 4x4 differentials, CVT drive belt tension, primary clutch sheaves, and full fluid replacement.',
    features: [
      'Front and rear hypoid gear oil drain & fill',
      'CVT belt wear measurement & clutch blowout',
      'A-arm bushing & ball joint grease purge',
      'Coolant freeze-point refractometer test'
    ]
  },
  {
    id: 'diagnostic-inspection',
    title: 'No-Start Diagnostic & Ignition Inspection',
    category: 'Diagnostics',
    price: '$65 flat fee',
    hourlyRate: 'Credited toward repair',
    estimatedTime: 'Same Day / 24 Hours',
    description: 'Thorough systematic diagnostic for equipment that will not start or runs rough. Fee is credited directly toward approved repairs.',
    features: [
      'Primary/secondary ignition spark gap test',
      'Cylinder compression & leak-down test',
      'Fuel delivery & pump vacuum check',
      'Limiting unnecessary out-of-pocket customer expense'
    ],
    popular: true
  },
  {
    id: 'seasonal-prep-power',
    title: 'Lawn Tractor & Generator Seasonal Recommission',
    category: 'Lawn & Power Equipment',
    price: '$85 – $135',
    hourlyRate: '$80 / hr',
    estimatedTime: '1 – 2 Days',
    description: 'Spring turn-on or winterization for commercial mowers, backup generators, and pressure washers.',
    features: [
      'Oil change + filter with premium high-zinc oil',
      'Air filter replace/clean & pre-filter wash',
      'Blade sharpening & precision dynamic balancing',
      'Fuel stabilizer flush & battery load test'
    ]
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Hole Shot Workshop Bays & Engine Stands',
    category: 'Shop Bays',
    imageUrl: '/images/hero_engine_workshop.jpg',
    description: 'Our organized mechanic stations inside Noland Trans World Cycle on E First Ave, Oakland MD.',
    dateAdded: '2026-09-15'
  },
  {
    id: 'gal-2',
    title: 'Keihin / Mikuni Precision Carburetor Rebuild',
    category: 'Carburetors',
    imageUrl: '/images/service_carburetor_rebuild.jpg',
    description: 'Disassembled carburetor components post-ultrasonic bath awaiting new Viton O-rings and OEM jetting.',
    dateAdded: '2026-09-18'
  },
  {
    id: 'gal-3',
    title: 'Restored Vintage Honda CT110 Trail Bike',
    category: 'Vintage Trail',
    imageUrl: '/images/service_motorcycle_trail.jpg',
    description: 'Full engine and transmission overhaul on a classic Honda CT110 post-diagnostic by Zach and crew.',
    dateAdded: '2026-09-20'
  },
  {
    id: 'gal-4',
    title: 'Shopfront at 7 E First Ave, Oakland MD',
    category: 'Location',
    imageUrl: '/images/exterior_oakland_shop.jpg',
    description: 'Convenient mountain town location in Oakland, MD. Easy drop-off and trailer parking available.',
    dateAdded: '2026-09-22'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Brad Kilbey',
    role: 'Local Customer',
    rating: 5,
    date: '3 months ago',
    platform: 'google',
    text: 'The guys at Hole Shot Repair are amazing... they do great work, advocate for their Cust\'s & look for ways to limit their Cust\'s out-of-pocket expenses! Highly recommend them!!',
    equipment: 'Powersports & Small Engine',
    verified: true,
    ownerReply: {
      author: 'Zach (Owner)',
      text: 'Thanks so much Brad! We treat every customer\'s machine like our own and make sure you never pay for unnecessary parts. Really appreciate the support!',
      date: '3 months ago'
    }
  },
  {
    id: 'rev-2',
    author: 'Michael Beard',
    role: 'Local Guide · 18 reviews',
    rating: 5,
    date: '3 months ago',
    platform: 'google',
    text: 'Great service at a fair price. My go-to for small engine repair.',
    equipment: 'Riding Mower & Generator',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'Thomas Kooken',
    role: 'Local Guide · 24 reviews · 94 photos',
    rating: 5,
    date: '2 years ago',
    platform: 'google',
    text: 'Just a shout out for Hole Shot Repair who worked on my Honda CT110 and quickly did a great job in fixing it and getting going again. Very satisfied with the job and the affordability of the price. Thanks to Zach and his crew.',
    equipment: 'Honda CT110 Trail Bike',
    verified: true,
    ownerReply: {
      author: 'Zach (Owner)',
      text: 'Those CT110s are legendary machines, Thomas! Glad we got her purring like new without breaking the bank.',
      date: '2 years ago'
    }
  },
  {
    id: 'rev-4',
    author: 'Garrett County Forestry Crew',
    role: 'Verified Commercial Account',
    rating: 5,
    date: '1 month ago',
    platform: 'direct',
    text: 'Zach saved our commercial chain saws and backup generator during peak autumn season. Honest diagnostic, fair parts billing, and done ahead of schedule.',
    equipment: 'Commercial Power Equipment',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'David',
    role: 'Local Resident',
    rating: 5,
    date: '4 months ago',
    platform: 'yelp',
    text: 'Super straightforward guys. They gave me free advice when I had a flooded cylinder rather than trying to bill an expensive diagnostic. When my ATV carb finally needed a rebuild, I brought it straight here.',
    equipment: 'Yamaha Big Bear 400',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'Luke M.',
    role: 'Oakland Dirt Rider',
    rating: 5,
    date: '5 months ago',
    platform: 'facebook',
    text: 'Fastest turnaround in Garrett County. Rebuilt the top-end on my CRF250 and jetting was dialed in on the first kick.',
    equipment: 'Honda CRF250R',
    verified: true
  },
  {
    id: 'rev-7',
    author: 'Jim Swauger',
    role: 'Local Resident',
    rating: 5,
    date: '6 months ago',
    platform: 'google',
    text: 'Fair prices, skilled mechanics, and no games. Zach and his crew are what local repair shops should be.',
    equipment: 'Toro Zero Turn Mower',
    verified: true
  }
];

export const INITIAL_STAFF: StaffAccess[] = [
  {
    id: 'staff-1',
    name: 'Zach (Shop Owner)',
    pin: '1984',
    role: 'Owner / Manager',
    permissions: {
      canEditPrices: true,
      canAddPhotos: true,
      canManageRfqs: true,
      canModerateReviews: true,
      canManageAccess: true
    },
    addedAt: '2026-01-01'
  },
  {
    id: 'staff-2',
    name: 'Lead Tech Crew',
    pin: '2155',
    role: 'Lead Tech',
    permissions: {
      canEditPrices: false,
      canAddPhotos: true,
      canManageRfqs: true,
      canModerateReviews: false,
      canManageAccess: false
    },
    addedAt: '2026-03-10'
  }
];

export const INITIAL_SETTINGS: ManagerSettings = {
  masterPin: '1984',
  notificationPhone: '+1 301-501-7802',
  shopName: 'Hole Shot Repair',
  shopAddress: '7 E First Ave, Oakland, MD 21550 (Located in Noland Trans World Cycle)',
  shopPhone: '+1 301-501-7802',
  notifyOnRfq: true,
  soundAlertsEnabled: true,
  lastPinChangeDate: '2026-01-01'
};

export const INITIAL_RFQS: RfqItem[] = [
  {
    id: 'rfq-101',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    customerName: 'Marcus Evans',
    phone: '301-555-0144',
    email: 'marcus.evans@example.com',
    preferredContact: 'sms',
    engineType: 'motorcycle',
    yearMakeModel: '1984 Honda CT110 Trail',
    issueDescription: 'Idle hangs high when warm, won\'t start without starting fluid after sitting for 2 weeks. Need carb overhaul and valve check.',
    urgency: 'standard',
    status: 'new'
  },
  {
    id: 'rfq-102',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    customerName: 'Sarah Jenkins',
    phone: '240-555-0812',
    email: 'sjenkins@garrettland.com',
    preferredContact: 'phone',
    engineType: 'atv',
    yearMakeModel: '2018 Polaris Sportsman 570',
    issueDescription: 'Clutch squeals in low gear, grinding noise from rear diff when backing up hill.',
    urgency: 'standard',
    status: 'quoted',
    quote: {
      estimatedLaborHours: 2.5,
      hourlyLaborRate: 85,
      partsEstimate: 140,
      shopSupplies: 20,
      totalAmount: 372.50,
      estimatedDays: '2 Business Days',
      notes: 'Estimate covers CVT belt replacement, secondary clutch deglaze, and differential fluid flush.',
      quotedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      quotedBy: 'Zach (Owner)'
    }
  }
];
