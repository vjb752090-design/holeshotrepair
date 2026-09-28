import React, { useState } from 'react';
import { EngineCategory, RfqItem } from '../types';
import { X, Send, Wrench, AlertCircle, CheckCircle2, Phone, MessageSquare, Upload } from 'lucide-react';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRfq: (rfqData: Omit<RfqItem, 'id' | 'createdAt' | 'status'>) => void;
  defaultService?: string;
  managerPhone: string;
}

export const RfqModal: React.FC<RfqModalProps> = ({
  isOpen,
  onClose,
  onSubmitRfq,
  defaultService,
  managerPhone
}) => {
  const [engineType, setEngineType] = useState<EngineCategory>('motorcycle');
  const [yearMakeModel, setYearMakeModel] = useState('');
  const [issueDescription, setIssueDescription] = useState(
    defaultService ? `Interested in: ${defaultService}. Symptoms: ` : ''
  );
  const [urgency, setUrgency] = useState<'standard' | 'rush' | 'flexible'>('standard');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState<'sms' | 'phone' | 'email'>('sms');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Convert to data URLs for storage
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos((prev) => [...prev, event.target!.result as string].slice(0, 3));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !yearMakeModel || !issueDescription) return;

    const newTicketId = `RFQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(newTicketId);

    onSubmitRfq({
      customerName,
      phone,
      email: email || `${customerName.toLowerCase().replace(/\s+/g, '')}@customer.local`,
      preferredContact,
      engineType,
      yearMakeModel,
      issueDescription,
      urgency,
      photos: uploadedPhotos
    });

    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative max-w-2xl w-full my-8 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors z-10"
          aria-label="Close RFQ modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                RFQ Submitted Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Zach &amp; the Crew Have Been Notified
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Ticket reference: <span className="font-mono font-bold text-white bg-neutral-950 px-2 py-1 rounded border border-neutral-700">{ticketId}</span>
              </p>
            </div>

            {/* Notification alert dispatch banner */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-amber-500/30 text-left text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-amber-400">
                <MessageSquare className="w-4 h-4" />
                <span>Live SMS Dispatch Triggered</span>
              </div>
              <p className="text-neutral-300">
                An instant SMS notification was dispatched to Hole Shot Repair manager phone: <strong className="text-white font-mono">{managerPhone}</strong>.
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={`sms:${managerPhone.replace(/[^0-9+]/g, '')}?&body=Hi Zach, I just submitted RFQ ${ticketId} for my ${yearMakeModel}. My name is ${customerName}.`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Open Direct Text with Zach</span>
                </a>
                <a
                  href="tel:+13015017802"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call (301) 501-7802</span>
                </a>
              </div>
            </div>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5" />
                <span>Fast Quote Request (RFQ)</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Tell Us About Your Machine
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Provide machine details and symptoms. Submitting triggers an immediate SMS alert to manager (<span className="text-neutral-300 font-mono">{managerPhone}</span>) for same-day review.
              </p>
            </div>

            {/* Equipment Category Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                1. Machine / Equipment Type *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'motorcycle', label: 'Trail / Motorcycle' },
                  { id: 'dirtbike', label: 'Motocross / Dirt Bike' },
                  { id: 'atv', label: 'ATV / Side-by-Side' },
                  { id: 'lawn_garden', label: 'Lawn Mower / Tractor' },
                  { id: 'generator', label: 'Generator / Power' },
                  { id: 'other', label: 'Other Small Engine' }
                ].map((cat) => (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setEngineType(cat.id as EngineCategory)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-all cursor-pointer ${
                      engineType === cat.id
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/60 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Year Make Model */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Year, Make &amp; Model *
                </label>
                <input
                  type="text"
                  required
                  value={yearMakeModel}
                  onChange={(e) => setYearMakeModel(e.target.value)}
                  placeholder="e.g., 1982 Honda CT110, 2018 Polaris 570"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Urgency / Timeline
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value as 'standard' | 'rush' | 'flexible')}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-sm focus:border-amber-500 focus:outline-none"
                >
                  <option value="standard">Standard (Next 2–3 Days)</option>
                  <option value="rush">Priority Rush (Need for upcoming weekend/job)</option>
                  <option value="flexible">Flexible / Project Rebuild</option>
                </select>
              </div>
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                2. Symptoms &amp; Desired Work *
              </label>
              <textarea
                required
                rows={3}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="What is the machine doing? Won't start after sitting, backfiring, leaking carb, bogging under load, needs valve check, etc."
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Optional: Upload Photos (Engine, Carb, VIN, Leaks)
              </label>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-700 hover:border-amber-500 text-xs font-medium text-neutral-300 hover:text-white cursor-pointer transition-colors">
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Select Image Files</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                {uploadedPhotos.length > 0 && (
                  <span className="text-xs text-amber-400 font-semibold font-mono">
                    {uploadedPhotos.length} photo(s) attached
                  </span>
                )}
              </div>
              {uploadedPhotos.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {uploadedPhotos.map((p, idx) => (
                    <img
                      key={idx}
                      src={p}
                      alt="Upload preview"
                      className="w-14 h-14 rounded-lg object-cover border border-neutral-700"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="pt-2 border-t border-neutral-800">
              <label className="block text-xs font-semibold text-neutral-300 mb-3">
                3. Your Contact Information
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g., Brad Kilbey"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Phone Number (For Quote SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g., (301) 555-0199"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Preferred Response Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['sms', 'phone', 'email'] as const).map((method) => (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPreferredContact(method)}
                        className={`py-2 text-xs font-semibold rounded-lg border capitalize transition-all cursor-pointer ${
                          preferredContact === method
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/60'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div className="text-[11px] text-neutral-500 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-neutral-400" />
                <span>Zero obligation · No hidden diagnostic fees</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md shadow-amber-500/10 flex items-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send RFQ &amp; Notify Zach</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
