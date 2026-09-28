import React, { useState, useEffect } from 'react';
import {
  GalleryPhoto,
  ManagerSettings,
  ReviewItem,
  RfqItem,
  ServiceItem,
  StaffAccess
} from './types';
import { StorageService, SmsDispatchLog } from './utils/storage';
import { playNotificationChime } from './utils/sound';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServicesPricing } from './components/ServicesPricing';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationHours } from './components/LocationHours';
import { PartnerSection } from './components/PartnerSection';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { WriteReviewModal } from './components/WriteReviewModal';
import { ManagerModal } from './components/Manager/ManagerModal';
import { NotificationBanner, ActiveNotification } from './components/NotificationBanner';

export default function App() {
  // Primary state loaded from storage
  const [services, setServices] = useState<ServiceItem[]>(StorageService.getServices);
  const [gallery, setGallery] = useState<GalleryPhoto[]>(StorageService.getGallery);
  const [reviews, setReviews] = useState<ReviewItem[]>(StorageService.getReviews);
  const [rfqs, setRfqs] = useState<RfqItem[]>(StorageService.getRfqs);
  const [staff, setStaff] = useState<StaffAccess[]>(StorageService.getStaff);
  const [settings, setSettings] = useState<ManagerSettings>(StorageService.getSettings);
  const [smsLogs, setSmsLogs] = useState<SmsDispatchLog[]>(StorageService.getSmsLogs);

  // Modals & Drawers state
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [selectedServiceForRfq, setSelectedServiceForRfq] = useState<string>('');
  const [activeNotification, setActiveNotification] = useState<ActiveNotification | null>(null);

  // Sync to storage on updates
  const handleUpdateServices = (newServices: ServiceItem[]) => {
    setServices(newServices);
    StorageService.saveServices(newServices);
  };

  const handleUpdateGallery = (newGallery: GalleryPhoto[]) => {
    setGallery(newGallery);
    StorageService.saveGallery(newGallery);
  };

  const handleUpdateReviews = (newReviews: ReviewItem[]) => {
    setReviews(newReviews);
    StorageService.saveReviews(newReviews);
  };

  const handleUpdateRfqs = (newRfqs: RfqItem[]) => {
    setRfqs(newRfqs);
    StorageService.saveRfqs(newRfqs);
  };

  const handleUpdateStaff = (newStaff: StaffAccess[]) => {
    setStaff(newStaff);
    StorageService.saveStaff(newStaff);
  };

  const handleUpdateSettings = (newSettings: ManagerSettings) => {
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  // Triggered when a customer submits an RFQ
  const handleCustomerSubmitRfq = (rfqData: Omit<RfqItem, 'id' | 'createdAt' | 'status'>) => {
    const newId = `rfq-${Date.now()}`;
    const newRfq: RfqItem = {
      ...rfqData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    const updated = [newRfq, ...rfqs];
    handleUpdateRfqs(updated);

    // Play workshop chime if enabled
    if (settings.soundAlertsEnabled) {
      playNotificationChime();
    }

    // Dispatch SMS notification to manager's phone
    const smsMessage = `NEW RFQ for Hole Shot Repair: ${rfqData.customerName} submitted ${rfqData.yearMakeModel} (${rfqData.phone}). Issue: ${rfqData.issueDescription.slice(0, 60)}...`;
    
    StorageService.addSmsLog({
      recipientPhone: settings.notificationPhone,
      customerName: rfqData.customerName,
      machine: rfqData.yearMakeModel,
      messageText: smsMessage,
      status: 'sent'
    });
    setSmsLogs(StorageService.getSmsLogs());

    // Show floating alert banner
    setActiveNotification({
      id: `alert-${Date.now()}`,
      title: 'Incoming Customer RFQ',
      recipientPhone: settings.notificationPhone,
      customerName: rfqData.customerName,
      machine: rfqData.yearMakeModel,
      issue: rfqData.issueDescription
    });
  };

  // Trigger test SMS alert from Manager control
  const handleTriggerTestSms = () => {
    if (settings.soundAlertsEnabled) {
      playNotificationChime();
    }

    const testMessage = `TEST ALERT: Hole Shot Repair dispatcher online. Notifications active for manager phone: ${settings.notificationPhone}.`;
    
    StorageService.addSmsLog({
      recipientPhone: settings.notificationPhone,
      customerName: 'System Test',
      machine: 'Workshop Dispatcher',
      messageText: testMessage,
      status: 'sent'
    });
    setSmsLogs(StorageService.getSmsLogs());

    setActiveNotification({
      id: `test-${Date.now()}`,
      title: 'Test Notification Dispatched',
      recipientPhone: settings.notificationPhone,
      customerName: 'Manager Verification',
      machine: 'System Test',
      issue: 'Verification of live phone dispatcher'
    });
  };

  // Triggered when customer writes a review
  const handleCustomerSubmitReview = (reviewData: Omit<ReviewItem, 'id' | 'date'>) => {
    const newReview: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };

    const updated = [newReview, ...reviews];
    handleUpdateReviews(updated);
  };

  const handleOpenRfqForService = (serviceTitle: string) => {
    setSelectedServiceForRfq(serviceTitle);
    setIsRfqOpen(true);
  };

  const unreadRfqs = rfqs.filter((r) => r.status === 'new').length;

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        onOpenRfq={() => {
          setSelectedServiceForRfq('');
          setIsRfqOpen(true);
        }}
        onOpenManager={() => setIsManagerOpen(true)}
        unreadRfqCount={unreadRfqs}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenRfq={() => {
            setSelectedServiceForRfq('');
            setIsRfqOpen(true);
          }}
        />

        {/* Services & Transparent Pricing */}
        <ServicesPricing
          services={services}
          onSelectServiceForRfq={handleOpenRfqForService}
        />

        {/* Interactive Before/After Restoration Slider */}
        <BeforeAfterSlider />

        {/* Live Photo Gallery */}
        <GallerySection
          photos={gallery}
          onOpenManagerUpload={() => setIsManagerOpen(true)}
        />

        {/* Cross-Platform Reviews & Customer Testimonials */}
        <ReviewsSection
          reviews={reviews}
          onOpenWriteReview={() => setIsWriteReviewOpen(true)}
        />

        {/* Location & Business Hours (Oakland MD) */}
        <LocationHours />

        {/* Trusted Local Network Partner: Kevin Shaffer's Auto Body */}
        <PartnerSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenManager={() => setIsManagerOpen(true)}
        onOpenRfq={() => {
          setSelectedServiceForRfq('');
          setIsRfqOpen(true);
        }}
      />

      {/* RFQ Request Modal */}
      <RfqModal
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        onSubmitRfq={handleCustomerSubmitRfq}
        defaultService={selectedServiceForRfq}
        managerPhone={settings.notificationPhone}
      />

      {/* Customer Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleCustomerSubmitReview}
      />

      {/* Manager Control Portal Modal */}
      <ManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        services={services}
        onUpdateServices={handleUpdateServices}
        gallery={gallery}
        onUpdateGallery={handleUpdateGallery}
        rfqs={rfqs}
        onUpdateRfqs={handleUpdateRfqs}
        staff={staff}
        onUpdateStaff={handleUpdateStaff}
        reviews={reviews}
        onUpdateReviews={handleUpdateReviews}
        smsLogs={smsLogs}
        onTriggerTestSms={handleTriggerTestSms}
      />

      {/* Live Dispatched Alert Toaster Banner */}
      <NotificationBanner
        notification={activeNotification}
        onDismiss={() => setActiveNotification(null)}
        onOpenManager={() => setIsManagerOpen(true)}
      />
    </div>
  );
}
