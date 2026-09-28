import React, { useState } from 'react';
import {
  GalleryPhoto,
  ManagerSettings,
  ReviewItem,
  RfqItem,
  ServiceItem,
  StaffAccess
} from '../../types';
import {
  Lock,
  X,
  KeyRound,
  DollarSign,
  Camera,
  FileText,
  Users,
  Bell,
  CheckCircle,
  Plus,
  Trash2,
  Edit2,
  Send,
  MessageSquare,
  Phone,
  Calculator,
  Printer,
  Sparkles,
  Shield,
  Star
} from 'lucide-react';
import { SmsDispatchLog } from '../../utils/storage';

interface ManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ManagerSettings;
  onUpdateSettings: (newSettings: ManagerSettings) => void;
  services: ServiceItem[];
  onUpdateServices: (services: ServiceItem[]) => void;
  gallery: GalleryPhoto[];
  onUpdateGallery: (gallery: GalleryPhoto[]) => void;
  rfqs: RfqItem[];
  onUpdateRfqs: (rfqs: RfqItem[]) => void;
  staff: StaffAccess[];
  onUpdateStaff: (staff: StaffAccess[]) => void;
  reviews: ReviewItem[];
  onUpdateReviews: (reviews: ReviewItem[]) => void;
  smsLogs: SmsDispatchLog[];
  onTriggerTestSms: () => void;
}

type ManagerTab = 'rfqs' | 'pricing' | 'photos' | 'reviews' | 'staff' | 'settings';

export const ManagerModal: React.FC<ManagerModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  services,
  onUpdateServices,
  gallery,
  onUpdateGallery,
  rfqs,
  onUpdateRfqs,
  staff,
  onUpdateStaff,
  reviews,
  onUpdateReviews,
  smsLogs,
  onTriggerTestSms
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [authenticatedStaffName, setAuthenticatedStaffName] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<ManagerTab>('rfqs');

  // PIN Change state (on login or in settings)
  const [showPinChangePrompt, setShowPinChangePrompt] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  // RFQ Quoting state
  const [selectedRfq, setSelectedRfq] = useState<RfqItem | null>(null);
  const [laborHours, setLaborHours] = useState(2);
  const [laborRate, setLaborRate] = useState(85);
  const [partsCost, setPartsCost] = useState(120);
  const [shopSupplies, setShopSupplies] = useState(15);
  const [quoteNotes, setQuoteNotes] = useState('');
  const [estimatedDays, setEstimatedDays] = useState('2 Business Days');
  const [quoteSuccessMsg, setQuoteSuccessMsg] = useState('');

  // New Service state
  const [showNewServiceModal, setShowNewServiceModal] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({
    title: '',
    category: 'Motorcycles & Powersports',
    price: '$95 – $150',
    hourlyRate: '$85 / hr',
    estimatedTime: '1 – 2 Days',
    description: '',
    features: ['Diagnostic inspection', 'OEM quality parts'],
    popular: false
  });

  // Photo upload state
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoCategory, setPhotoCategory] = useState('Workshop');
  const [photoDescription, setPhotoDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoSuccessMsg, setPhotoSuccessMsg] = useState('');

  // New Staff member state
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPin, setNewStaffPin] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<StaffAccess['role']>('Lead Tech');

  // Review reply state
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  if (!isOpen) return null;

  // Handle PIN Login
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');

    // Check Master PIN
    if (pinInput === settings.masterPin) {
      setIsAuthenticated(true);
      setAuthenticatedStaffName('Zach (Owner / Master)');
      setPinInput('');
      return;
    }

    // Check Staff PINs
    const matchingStaff = staff.find((s) => s.pin === pinInput);
    if (matchingStaff) {
      setIsAuthenticated(true);
      setAuthenticatedStaffName(matchingStaff.name);
      setPinInput('');
      return;
    }

    setPinError('Invalid PIN code. Please re-enter.');
  };

  // Handle PIN Change
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinError('PIN must be at least 4 digits.');
      return;
    }
    if (newPin !== confirmPin) {
      setPinError('PINs do not match.');
      return;
    }

    onUpdateSettings({
      ...settings,
      masterPin: newPin,
      lastPinChangeDate: new Date().toISOString()
    });

    setPinSuccessMsg('PIN successfully updated!');
    setShowPinChangePrompt(false);
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => setPinSuccessMsg(''), 4000);
  };

  // Handle Quote Calculation
  const totalQuoteAmount = laborHours * laborRate + partsCost + shopSupplies;

  const handleSendQuote = (rfq: RfqItem) => {
    const updatedRfqs = rfqs.map((item) => {
      if (item.id === rfq.id) {
        return {
          ...item,
          status: 'quoted' as const,
          quote: {
            estimatedLaborHours: laborHours,
            hourlyLaborRate: laborRate,
            partsEstimate: partsCost,
            shopSupplies,
            totalAmount: totalQuoteAmount,
            estimatedDays,
            notes: quoteNotes || 'All work backed by Hole Shot workmanship warranty.',
            quotedAt: new Date().toISOString(),
            quotedBy: authenticatedStaffName || 'Zach (Owner)'
          }
        };
      }
      return item;
    });

    onUpdateRfqs(updatedRfqs);
    setSelectedRfq(null);
    setQuoteSuccessMsg(`Quote sent to ${rfq.customerName}! (${rfq.phone})`);
    setTimeout(() => setQuoteSuccessMsg(''), 4000);
  };

  // Add / Edit Service
  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.price) return;

    if (editingServiceId) {
      const updated = services.map((s) =>
        s.id === editingServiceId ? ({ ...s, ...serviceForm } as ServiceItem) : s
      );
      onUpdateServices(updated);
      setEditingServiceId(null);
    } else {
      const newService: ServiceItem = {
        id: `svc-${Date.now()}`,
        title: serviceForm.title || '',
        category: serviceForm.category || 'General Repair',
        price: serviceForm.price || '$95',
        hourlyRate: serviceForm.hourlyRate || '$85 / hr',
        estimatedTime: serviceForm.estimatedTime || '1 – 2 Days',
        description: serviceForm.description || '',
        features: serviceForm.features || ['Inspection and testing'],
        popular: !!serviceForm.popular
      };
      onUpdateServices([newService, ...services]);
    }

    setShowNewServiceModal(false);
    setServiceForm({
      title: '',
      category: 'Motorcycles & Powersports',
      price: '$95 – $150',
      hourlyRate: '$85 / hr',
      estimatedTime: '1 – 2 Days',
      description: '',
      features: ['Diagnostic check', 'OEM parts'],
      popular: false
    });
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to remove this service from the live website?')) {
      onUpdateServices(services.filter((s) => s.id !== id));
    }
  };

  // Add Photo to Live Gallery
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPhotoUrl(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl || !photoTitle) return;

    const newPhoto: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      title: photoTitle,
      category: photoCategory,
      description: photoDescription || 'Workshop repair by Hole Shot crew.',
      imageUrl: photoUrl,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    onUpdateGallery([newPhoto, ...gallery]);
    setPhotoSuccessMsg('Photo added to live customer gallery!');
    setPhotoTitle('');
    setPhotoDescription('');
    setPhotoUrl('');
    setTimeout(() => setPhotoSuccessMsg(''), 4000);
  };

  // Add Staff Member
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName || !newStaffPin) return;

    const newMember: StaffAccess = {
      id: `staff-${Date.now()}`,
      name: newStaffName,
      pin: newStaffPin,
      role: newStaffRole,
      permissions: {
        canEditPrices: newStaffRole === 'Owner / Manager',
        canAddPhotos: true,
        canManageRfqs: true,
        canModerateReviews: newStaffRole === 'Owner / Manager',
        canManageAccess: newStaffRole === 'Owner / Manager'
      },
      addedAt: new Date().toISOString().split('T')[0]
    };

    onUpdateStaff([...staff, newMember]);
    setShowAddStaffModal(false);
    setNewStaffName('');
    setNewStaffPin('');
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm('Revoke access PIN for this team member?')) {
      onUpdateStaff(staff.filter((s) => s.id !== id));
    }
  };

  // Review Reply
  const handleSaveReply = (reviewId: string) => {
    if (!replyText.trim()) return;

    const updated = reviews.map((r) => {
      if (r.id === reviewId) {
        return {
          ...r,
          ownerReply: {
            author: authenticatedStaffName || 'Zach (Owner)',
            text: replyText.trim(),
            date: 'Just now'
          }
        };
      }
      return r;
    });

    onUpdateReviews(updated);
    setReplyingReviewId(null);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div
        className="relative max-w-6xl w-full my-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-white font-display">
                  Manager &amp; Owner Control Portal
                </span>
                {isAuthenticated && (
                  <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-mono">
                    Authenticated: {authenticatedStaffName}
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-400">
                Hole Shot Repair · 7 E First Ave, Oakland MD
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setShowPinChangePrompt(true)}
                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 text-xs font-semibold border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Change PIN</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success toast inside modal */}
        {(pinSuccessMsg || quoteSuccessMsg || photoSuccessMsg) && (
          <div className="bg-emerald-500/15 border-b border-emerald-500/30 px-6 py-2.5 text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{pinSuccessMsg || quoteSuccessMsg || photoSuccessMsg}</span>
          </div>
        )}

        {/* PIN Authentication Screen if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-display">
                Enter Manager Access PIN
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Protected console for Zach &amp; shop staff to edit prices, post photos, quote customer RFQs, and manage team access codes.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  inputMode="numeric"
                  autoFocus
                  required
                  maxLength={8}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter 4-digit PIN"
                  className="w-full text-center tracking-widest text-2xl font-mono py-3 rounded-xl bg-neutral-950 border border-neutral-700 text-white focus:border-amber-500 focus:outline-none"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 mt-2 font-medium">{pinError}</p>
                )}
              </div>

              {/* Helpful Default PIN Indicator */}
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 text-left text-xs space-y-1">
                <div className="text-neutral-300 font-semibold flex items-center justify-between">
                  <span>First-Time Default PIN:</span>
                  <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {settings.masterPin}
                  </span>
                </div>
                <div className="text-neutral-500 text-[11px]">
                  (You can change your PIN immediately after logging in)
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPinInput(settings.masterPin)}
                  className="w-1/2 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Fill Default PIN
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Authenticate
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Logged In Manager Control Portal */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-neutral-800 bg-neutral-950/60 p-4 space-y-1 overflow-x-auto md:overflow-y-auto shrink-0 flex md:flex-col gap-1 md:gap-0">
              {[
                { id: 'rfqs', label: 'RFQs & Customer Quotes', icon: FileText, badge: rfqs.filter(r => r.status === 'new').length },
                { id: 'pricing', label: 'Edit Services & Pricing', icon: DollarSign },
                { id: 'photos', label: 'Live Photo Gallery', icon: Camera },
                { id: 'reviews', label: 'Reviews & Replies', icon: Star },
                { id: 'staff', label: 'Staff PINs & Access', icon: Users },
                { id: 'settings', label: 'SMS Alert Settings', icon: Bell }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as ManagerTab)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-neutral-950 shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>
                    {Boolean(tab.badge && tab.badge > 0) && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? 'bg-neutral-950 text-amber-400' : 'bg-amber-500 text-neutral-950'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="pt-4 mt-auto hidden md:block border-t border-neutral-800/80">
                <div className="text-[11px] text-neutral-500">
                  Manager SMS alerts routed to:
                </div>
                <div className="text-xs font-mono font-semibold text-amber-400 mt-0.5 truncate">
                  {settings.notificationPhone}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6 bg-neutral-900/60">
              
              {/* TAB 1: RFQs & Quoting */}
              {activeTab === 'rfqs' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white font-display">
                        Customer RFQ Inbox &amp; Formal Quoting
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Incoming requests notify manager phone ({settings.notificationPhone}). Calculate parts &amp; labor, generate itemized estimates, and send to customers.
                      </p>
                    </div>

                    <button
                      onClick={onTriggerTestSms}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 flex items-center gap-1.5 self-start cursor-pointer"
                    >
                      <Bell className="w-3.5 h-3.5 text-amber-400" />
                      <span>Test Phone SMS Alert</span>
                    </button>
                  </div>

                  {/* RFQs List */}
                  <div className="space-y-4">
                    {rfqs.length === 0 ? (
                      <div className="p-8 text-center text-xs text-neutral-500">
                        No customer RFQs received yet.
                      </div>
                    ) : (
                      rfqs.map((rfq) => (
                        <div
                          key={rfq.id}
                          className={`p-5 rounded-xl border transition-all ${
                            rfq.status === 'new'
                              ? 'bg-neutral-950 border-amber-500/50 shadow-lg'
                              : 'bg-neutral-950/70 border-neutral-800'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                            <div className="flex items-center gap-3">
                              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase ${
                                rfq.status === 'new'
                                  ? 'bg-amber-500 text-neutral-950'
                                  : rfq.status === 'quoted'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : 'bg-neutral-800 text-neutral-400'
                              }`}>
                                {rfq.status}
                              </span>
                              <span className="text-sm font-bold text-white">
                                {rfq.yearMakeModel}
                              </span>
                              <span className="text-xs text-neutral-400">({rfq.engineType})</span>
                            </div>

                            <span className="text-xs text-neutral-400 font-mono-numbers">
                              {new Date(rfq.createdAt).toLocaleString()}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-3 text-xs">
                            <div>
                              <span className="text-neutral-500 block">Customer:</span>
                              <strong className="text-white">{rfq.customerName}</strong>
                            </div>
                            <div>
                              <span className="text-neutral-500 block">Phone / Contact:</span>
                              <a href={`tel:${rfq.phone}`} className="text-amber-400 hover:underline font-mono">
                                {rfq.phone}
                              </a>{' '}
                              <span className="text-neutral-400">({rfq.preferredContact})</span>
                            </div>
                            <div>
                              <span className="text-neutral-500 block">Urgency:</span>
                              <span className="capitalize text-neutral-300">{rfq.urgency}</span>
                            </div>
                          </div>

                          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800/80 text-xs text-neutral-300">
                            <span className="text-neutral-400 font-medium block mb-0.5">Symptoms / Description:</span>
                            {rfq.issueDescription}
                          </div>

                          {/* Photos if attached */}
                          {rfq.photos && rfq.photos.length > 0 && (
                            <div className="mt-3 flex gap-2">
                              {rfq.photos.map((p, idx) => (
                                <img
                                  key={idx}
                                  src={p}
                                  alt="Customer machine upload"
                                  className="w-16 h-16 rounded-lg object-cover border border-neutral-700"
                                />
                              ))}
                            </div>
                          )}

                          {/* Existing Quote details if already quoted */}
                          {rfq.quote && (
                            <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-emerald-500/30 text-xs space-y-2">
                              <div className="flex items-center justify-between text-emerald-400 font-semibold">
                                <span className="flex items-center gap-1.5">
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Quote Provided by {rfq.quote.quotedBy}: ${rfq.quote.totalAmount.toFixed(2)}</span>
                                </span>
                                <span className="text-neutral-400 font-normal">
                                  Turnaround: {rfq.quote.estimatedDays}
                                </span>
                              </div>
                              <div className="text-neutral-300">
                                Labor: {rfq.quote.estimatedLaborHours} hrs @ ${rfq.quote.hourlyLaborRate}/hr · Parts: ${rfq.quote.partsEstimate} · Supplies: ${rfq.quote.shopSupplies}
                              </div>
                              <div className="text-neutral-400 italic">
                                Notes: {rfq.quote.notes}
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <a
                                href={`sms:${rfq.phone.replace(/[^0-9+]/g, '')}?&body=Hi ${rfq.customerName}, this is Zach from Hole Shot Repair regarding your ${rfq.yearMakeModel}.`}
                                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                                <span>Direct SMS Customer</span>
                              </a>

                              <a
                                href={`tel:${rfq.phone}`}
                                className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Phone className="w-3.5 h-3.5 text-amber-400" />
                                <span>Call</span>
                              </a>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedRfq(rfq);
                                setQuoteNotes(`Quote for ${rfq.yearMakeModel}: `);
                              }}
                              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                            >
                              <Calculator className="w-3.5 h-3.5" />
                              <span>{rfq.quote ? 'Revise Quote' : 'Build & Send Quote'}</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Quoting Modal Drawer if an RFQ is selected */}
                  {selectedRfq && (
                    <div className="p-6 rounded-2xl bg-neutral-950 border-2 border-amber-500/50 shadow-2xl space-y-5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                        <div>
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                            Interactive Quoting Calculator
                          </span>
                          <h5 className="text-lg font-bold text-white font-display">
                            Quote for {selectedRfq.customerName} ({selectedRfq.yearMakeModel})
                          </h5>
                        </div>
                        <button
                          onClick={() => setSelectedRfq(null)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Labor Hours</label>
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            value={laborHours}
                            onChange={(e) => setLaborHours(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Hourly Labor Rate ($)</label>
                          <input
                            type="number"
                            value={laborRate}
                            onChange={(e) => setLaborRate(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Estimated Parts ($)</label>
                          <input
                            type="number"
                            value={partsCost}
                            onChange={(e) => setPartsCost(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Shop Supplies &amp; EPA ($)</label>
                          <input
                            type="number"
                            value={shopSupplies}
                            onChange={(e) => setShopSupplies(parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Estimated Completion Days</label>
                          <input
                            type="text"
                            value={estimatedDays}
                            onChange={(e) => setEstimatedDays(e.target.value)}
                            placeholder="e.g., 2 Business Days"
                            className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Total Calculated Quote</label>
                          <div className="px-4 py-2 rounded-lg bg-neutral-900 border border-amber-500/40 text-amber-400 font-mono text-xl font-bold flex items-center justify-between">
                            <span>Total:</span>
                            <span>${totalQuoteAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">Itemized Mechanic Notes to Customer</label>
                        <textarea
                          rows={2}
                          value={quoteNotes}
                          onChange={(e) => setQuoteNotes(e.target.value)}
                          placeholder="Break down what's included: e.g., Carb ultrasonic clean, new viton float needle, valve lash calibration, test run."
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setSelectedRfq(null)}
                          className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSendQuote(selectedRfq)}
                          className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-neutral-950 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Finalize &amp; Dispatch Quote</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Pricing & Services Editor */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white font-display">
                        Live Pricing &amp; Service Packages Editor
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Update standard labor rates, package costs, and descriptions directly reflected on the public website.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingServiceId(null);
                        setServiceForm({
                          title: '',
                          category: 'Motorcycles & Powersports',
                          price: '$95 – $150',
                          hourlyRate: '$85 / hr',
                          estimatedTime: '1 – 2 Days',
                          description: '',
                          features: ['Diagnostic testing', 'Cleaned & calibrated'],
                          popular: false
                        });
                        setShowNewServiceModal(true);
                      }}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Service Package</span>
                    </button>
                  </div>

                  {/* Services List Table / Cards */}
                  <div className="space-y-4">
                    {services.map((svc) => (
                      <div
                        key={svc.id}
                        className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-amber-500 font-semibold">{svc.category}</span>
                            {svc.popular && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                                Most Requested
                              </span>
                            )}
                          </div>
                          <h5 className="text-base font-bold text-white">{svc.title}</h5>
                          <p className="text-xs text-neutral-400 max-w-xl">{svc.description}</p>
                          <div className="flex items-center gap-4 text-xs text-neutral-300 pt-1 font-mono-numbers">
                            <span>Price: <strong className="text-amber-400">{svc.price}</strong></span>
                            <span>Labor: {svc.hourlyRate}</span>
                            <span>Time: {svc.estimatedTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingServiceId(svc.id);
                              setServiceForm(svc);
                              setShowNewServiceModal(true);
                            }}
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-xs font-medium flex items-center gap-1 cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteService(svc.id)}
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 border border-neutral-700 text-xs font-medium cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add / Edit Service Modal */}
                  {showNewServiceModal && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-lg w-full p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                          <h5 className="text-lg font-bold text-white font-display">
                            {editingServiceId ? 'Edit Service Package' : 'Add Service Package'}
                          </h5>
                          <button
                            onClick={() => setShowNewServiceModal(false)}
                            className="p-1 text-neutral-400 hover:text-white"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form onSubmit={handleSaveService} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">Service Title *</label>
                            <input
                              type="text"
                              required
                              value={serviceForm.title}
                              onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                              placeholder="e.g., Valve Lash Inspection &amp; Adjustment"
                              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">Category</label>
                              <select
                                value={serviceForm.category}
                                onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                              >
                                <option value="Motorcycles & Powersports">Motorcycles &amp; Powersports</option>
                                <option value="Carburetors & Fuel">Carburetors &amp; Fuel</option>
                                <option value="Engine Overhauls">Engine Overhauls</option>
                                <option value="ATVs & Side-by-Sides">ATVs &amp; Side-by-Sides</option>
                                <option value="Diagnostics">Diagnostics</option>
                                <option value="Lawn & Power Equipment">Lawn &amp; Power Equipment</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">Price Range / Fee *</label>
                              <input
                                type="text"
                                required
                                value={serviceForm.price}
                                onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                                placeholder="e.g., $95 – $145"
                                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">Hourly Labor Basis</label>
                              <input
                                type="text"
                                value={serviceForm.hourlyRate}
                                onChange={(e) => setServiceForm({ ...serviceForm, hourlyRate: e.target.value })}
                                placeholder="$85 / hr"
                                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">Estimated Turnaround</label>
                              <input
                                type="text"
                                value={serviceForm.estimatedTime}
                                onChange={(e) => setServiceForm({ ...serviceForm, estimatedTime: e.target.value })}
                                placeholder="e.g., 1 – 2 Days"
                                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">Short Description</label>
                            <textarea
                              rows={2}
                              value={serviceForm.description}
                              onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                              placeholder="Explanation of what the technician performs..."
                              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="popularCheck"
                              checked={serviceForm.popular}
                              onChange={(e) => setServiceForm({ ...serviceForm, popular: e.target.checked })}
                              className="rounded border-neutral-700 text-amber-500"
                            />
                            <label htmlFor="popularCheck" className="text-xs text-neutral-300">
                              Highlight as &ldquo;Most Requested&rdquo; on homepage
                            </label>
                          </div>

                          <div className="pt-2 flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setShowNewServiceModal(false)}
                              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold cursor-pointer"
                            >
                              Save to Website
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Live Photo Gallery Manager */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  <div className="border-b border-neutral-800 pb-4">
                    <h4 className="text-xl font-bold text-white font-display">
                      Add &amp; Manage Live Customer Photos
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Upload project photos, rebuild highlights, or shop pictures that appear instantly on the public website.
                    </p>
                  </div>

                  {/* Photo Upload Form */}
                  <form onSubmit={handleSavePhoto} className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Photo Title *</label>
                        <input
                          type="text"
                          required
                          value={photoTitle}
                          onChange={(e) => setPhotoTitle(e.target.value)}
                          placeholder="e.g., Yamaha YZ250 Cylinder Hone &amp; New Piston"
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">Category</label>
                        <select
                          value={photoCategory}
                          onChange={(e) => setPhotoCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                        >
                          <option value="Shop Bays">Shop Bays</option>
                          <option value="Carburetors">Carburetors</option>
                          <option value="Vintage Trail">Vintage Trail</option>
                          <option value="Dirt Bikes">Dirt Bikes</option>
                          <option value="ATVs &amp; UTVs">ATVs &amp; UTVs</option>
                          <option value="Location">Location</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">Description / Mechanic Notes</label>
                      <input
                        type="text"
                        value={photoDescription}
                        onChange={(e) => setPhotoDescription(e.target.value)}
                        placeholder="Details about the work performed..."
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-300 mb-1">
                          Select Image File or Paste URL *
                        </label>
                        <div className="flex gap-2">
                          <label className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold border border-neutral-700 cursor-pointer shrink-0">
                            Upload File
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                          </label>
                          <input
                            type="text"
                            value={photoUrl}
                            onChange={(e) => setPhotoUrl(e.target.value)}
                            placeholder="or paste image URL..."
                            className="flex-1 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      {photoUrl && (
                        <div className="flex items-center gap-3">
                          <img
                            src={photoUrl}
                            alt="Preview"
                            className="w-14 h-14 rounded-lg object-cover border border-amber-500"
                          />
                          <span className="text-xs text-emerald-400 font-semibold">Image ready to publish</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md cursor-pointer"
                      >
                        Publish Photo to Website
                      </button>
                    </div>
                  </form>

                  {/* Current Photos Grid with Delete */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {gallery.map((p) => (
                      <div key={p.id} className="relative rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 group">
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-full h-32 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-2.5">
                          <div className="text-[10px] text-amber-500 font-semibold">{p.category}</div>
                          <div className="text-xs font-bold text-white truncate">{p.title}</div>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm('Delete this photo from the live gallery?')) {
                              onUpdateGallery(gallery.filter((item) => item.id !== p.id));
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded bg-black/80 text-neutral-300 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Delete photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Reviews & Replies */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="border-b border-neutral-800 pb-4">
                    <h4 className="text-xl font-bold text-white font-display">
                      Customer Reviews &amp; Shop Owner Replies
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Respond as Zach &amp; the Hole Shot crew to public feedback across Google, Yelp, and direct submissions.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{rev.author}</span>
                            <span className="text-xs text-amber-400">({rev.platform})</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-400 text-xs">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-400" />
                            ))}
                            <span className="text-neutral-500 ml-1 font-mono-numbers">{rev.date}</span>
                          </div>
                        </div>

                        <p className="text-xs text-neutral-300 italic">&ldquo;{rev.text}&rdquo;</p>

                        {/* Existing reply */}
                        {rev.ownerReply ? (
                          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs space-y-1">
                            <div className="text-amber-400 font-semibold">{rev.ownerReply.author}:</div>
                            <div className="text-neutral-300">{rev.ownerReply.text}</div>
                          </div>
                        ) : (
                          <div>
                            {replyingReviewId === rev.id ? (
                              <div className="pt-2 space-y-2">
                                <textarea
                                  rows={2}
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Write response from Zach / Hole Shot Repair..."
                                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white text-xs focus:border-amber-500 focus:outline-none"
                                />
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => setReplyingReviewId(null)}
                                    className="px-3 py-1 text-xs text-neutral-400 hover:text-white"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSaveReply(rev.id)}
                                    className="px-4 py-1 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold cursor-pointer"
                                  >
                                    Post Public Reply
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setReplyingReviewId(rev.id);
                                  setReplyText('Thank you for the support! Always glad to keep your equipment running strong.');
                                }}
                                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer"
                              >
                                + Post Owner Reply as Zach
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Staff PINs & Access */}
              {activeTab === 'staff' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                    <div>
                      <h4 className="text-xl font-bold text-white font-display">
                        Staff PINs &amp; Access Management
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Add access codes for mechanics, advisors, or apprentices without sharing your master owner PIN.
                      </p>
                    </div>

                    <button
                      onClick={() => setShowAddStaffModal(true)}
                      className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer self-start"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Staff Access Code</span>
                    </button>
                  </div>

                  {/* Staff Table */}
                  <div className="space-y-3">
                    {/* Master Owner Entry */}
                    <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/40 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4 text-amber-400" />
                          <strong className="text-white text-sm">Zach (Master Owner)</strong>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400">
                            FULL CONTROL
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400">
                          Active Master PIN: <span className="font-mono text-amber-400">•••• ({settings.masterPin})</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPinChangePrompt(true)}
                        className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-amber-400 text-xs font-semibold border border-neutral-700"
                      >
                        Change Owner PIN
                      </button>
                    </div>

                    {/* Additional staff */}
                    {staff.map((member) => (
                      <div
                        key={member.id}
                        className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <strong className="text-white text-sm">{member.name}</strong>
                            <span className="text-xs text-neutral-400">({member.role})</span>
                          </div>
                          <div className="text-xs text-neutral-500 font-mono">
                            PIN: {member.pin} · Added: {member.addedAt}
                          </div>
                        </div>

                        {member.role !== 'Owner / Manager' && (
                          <button
                            onClick={() => handleDeleteStaff(member.id)}
                            className="p-2 rounded-lg bg-neutral-900 hover:bg-rose-950 text-neutral-400 hover:text-rose-400 border border-neutral-800 cursor-pointer"
                            title="Revoke PIN"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Staff Modal */}
                  {showAddStaffModal && (
                    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 space-y-4">
                        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                          <h5 className="text-lg font-bold text-white font-display">Add Staff Access PIN</h5>
                          <button onClick={() => setShowAddStaffModal(false)} className="p-1 text-neutral-400 hover:text-white">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <form onSubmit={handleAddStaff} className="space-y-4">
                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">Staff Member Name *</label>
                            <input
                              type="text"
                              required
                              value={newStaffName}
                              onChange={(e) => setNewStaffName(e.target.value)}
                              placeholder="e.g., Tyler (Junior Tech)"
                              className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">Role</label>
                              <select
                                value={newStaffRole}
                                onChange={(e) => setNewStaffRole(e.target.value as StaffAccess['role'])}
                                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                              >
                                <option value="Lead Tech">Lead Tech</option>
                                <option value="Service Advisor">Service Advisor</option>
                                <option value="Apprentice">Apprentice</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">Custom PIN *</label>
                              <input
                                type="text"
                                required
                                maxLength={6}
                                value={newStaffPin}
                                onChange={(e) => setNewStaffPin(e.target.value)}
                                placeholder="e.g., 2026"
                                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="pt-2 flex justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => setShowAddStaffModal(false)}
                              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold cursor-pointer"
                            >
                              Create Access Code
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: Notification Settings & Logs */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div className="border-b border-neutral-800 pb-4">
                    <h4 className="text-xl font-bold text-white font-display">
                      SMS Phone Notification Dispatcher
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Configure the phone number that receives automatic alerts whenever a customer submits an RFQ on the website.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        Manager Phone Number for SMS Alerts
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          value={settings.notificationPhone}
                          onChange={(e) =>
                            onUpdateSettings({ ...settings, notificationPhone: e.target.value })
                          }
                          className="max-w-xs px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white font-mono text-sm focus:border-amber-500 focus:outline-none"
                        />
                        <button
                          onClick={onTriggerTestSms}
                          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold cursor-pointer"
                        >
                          Send Test SMS Alert Now
                        </button>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1.5">
                        Default shop phone: <span className="font-mono text-neutral-400">+1 301-501-7802</span>. Alerts trigger browser notifications, synthetic chimes, and pre-formatted SMS links.
                      </p>
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="soundCheck"
                        checked={settings.soundAlertsEnabled}
                        onChange={(e) =>
                          onUpdateSettings({ ...settings, soundAlertsEnabled: e.target.checked })
                        }
                        className="rounded border-neutral-700 text-amber-500"
                      />
                      <label htmlFor="soundCheck" className="text-xs text-neutral-300">
                        Play workshop chime on incoming customer RFQs
                      </label>
                    </div>
                  </div>

                  {/* SMS Dispatch Log */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-white">Dispatched SMS Notification History</h5>
                    {smsLogs.length === 0 ? (
                      <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-500 text-center">
                        No SMS alerts dispatched in this session yet. Test by clicking &ldquo;Send Test SMS Alert Now&rdquo; or submitting an RFQ.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {smsLogs.map((log) => (
                          <div
                            key={log.id}
                            className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                  SMS DISPATCHED
                                </span>
                                <span className="text-white font-mono">{log.recipientPhone}</span>
                              </div>
                              <div className="text-neutral-300">{log.messageText}</div>
                            </div>
                            <span className="text-[11px] text-neutral-500 font-mono-numbers shrink-0">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Change PIN Modal Popup */}
        {showPinChangePrompt && (
          <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-sm w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h5 className="text-lg font-bold text-white font-display">Update Master Access PIN</h5>
                <button onClick={() => setShowPinChangePrompt(false)} className="p-1 text-neutral-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleChangePin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">New PIN (4+ Digits)</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    required
                    maxLength={8}
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Enter new PIN"
                    className="w-full text-center text-xl font-mono py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Confirm New PIN</label>
                  <input
                    type="password"
                    inputMode="numeric"
                    required
                    maxLength={8}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    placeholder="Re-enter new PIN"
                    className="w-full text-center text-xl font-mono py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>

                {pinError && <p className="text-xs text-rose-400">{pinError}</p>}

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPinChangePrompt(false)}
                    className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold cursor-pointer"
                  >
                    Save New PIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
