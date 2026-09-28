import React, { useState } from 'react';
import { Lock, Phone, Wrench, Menu, X, Bell } from 'lucide-react';

interface NavbarProps {
  onOpenRfq: () => void;
  onOpenManager: () => void;
  unreadRfqCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRfq,
  onOpenManager,
  unreadRfqCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark adhering to Top Bar Contract */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/20 transition-colors">
              <Wrench className="w-4 h-4 text-amber-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              HOLE SHOT <span className="text-amber-500">REPAIR</span>
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a href="#services" className="hover:text-amber-400 transition-colors">Services & Pricing</a>
            <a href="#restoration" className="hover:text-amber-400 transition-colors">Before & After</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Work Gallery</a>
            <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews (4.9★)</a>
            <a href="#location" className="hover:text-amber-400 transition-colors">Shop & Hours</a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+13015017802"
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white rounded-lg hover:bg-neutral-900 border border-neutral-800 transition-colors whitespace-nowrap"
              title="Call Hole Shot Repair"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-mono-numbers">(301) 501-7802</span>
            </a>

            <button
              onClick={onOpenRfq}
              className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
            >
              Request Quote (RFQ)
            </button>

            <button
              onClick={onOpenManager}
              className="relative p-2 text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 rounded-lg border border-neutral-800 transition-colors cursor-pointer"
              title="Manager Control Portal (PIN Access)"
              aria-label="Manager Access"
            >
              <Lock className="w-4 h-4" />
              {unreadRfqCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-neutral-950">
                  {unreadRfqCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenManager}
              className="p-2 text-neutral-400 hover:text-amber-400 rounded-lg border border-neutral-800"
              aria-label="Manager Access"
            >
              <Lock className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="sm:hidden py-4 border-t border-neutral-800 space-y-3">
            <nav className="flex flex-col gap-2 text-sm font-medium text-neutral-300">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
              >
                Services & Pricing
              </a>
              <a
                href="#restoration"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
              >
                Before & After
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
              >
                Work Gallery
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
              >
                Customer Reviews (4.9★)
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-neutral-900 hover:text-amber-400"
              >
                Shop & Hours
              </a>
            </nav>
            <div className="pt-2 flex flex-col gap-2 border-t border-neutral-800">
              <a
                href="tel:+13015017802"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-neutral-200 bg-neutral-900 rounded-lg border border-neutral-700"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                Call (301) 501-7802
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRfq();
                }}
                className="w-full py-2.5 text-xs font-semibold text-neutral-950 bg-amber-500 rounded-lg text-center"
              >
                Request Quote (RFQ)
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
