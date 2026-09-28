import React from 'react';
import { Lock, Phone, MapPin, Wrench } from 'lucide-react';

interface FooterProps {
  onOpenManager: () => void;
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenManager, onOpenRfq }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Wrench className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-base font-bold text-white font-display">
                HOLE SHOT <span className="text-amber-500">REPAIR</span>
              </span>
            </div>
            <p className="text-neutral-400 leading-relaxed text-xs">
              Garrett County&apos;s go-to motorcycle, vintage trail bike, and small engine service shop. Dedicated to honest diagnostics and limiting customer out-of-pocket expenses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Navigation
            </div>
            <ul className="space-y-1.5">
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Services &amp; Pricing</a></li>
              <li><a href="#restoration" className="hover:text-amber-400 transition-colors">Before &amp; After Comparison</a></li>
              <li><a href="#gallery" className="hover:text-amber-400 transition-colors">Workshop Photo Gallery</a></li>
              <li><a href="#reviews" className="hover:text-amber-400 transition-colors">Customer Reviews (4.9★)</a></li>
              <li><a href="#location" className="hover:text-amber-400 transition-colors">Location &amp; Hours</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Workshop Contact
            </div>
            <div className="space-y-1 text-neutral-300">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>7 E First Ave, Oakland, MD 21550 (in Noland Trans World Cycle)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="tel:+13015017802" className="text-white hover:text-amber-400 font-mono-numbers">
                  (301) 501-7802
                </a>
              </div>
              <div className="text-[11px] text-neutral-500">
                Plus Code: 9JWH+32 Oakland, Maryland
              </div>
            </div>
          </div>

          {/* Manager & Direct Actions */}
          <div className="space-y-3">
            <div className="font-semibold text-white uppercase text-[11px] tracking-wider">
              Shop Tools &amp; Portal
            </div>
            <button
              onClick={onOpenRfq}
              className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Submit Machine for Quote (RFQ)
            </button>
            <button
              onClick={onOpenManager}
              className="w-full py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Manager Access (PIN Protected)</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            &copy; {new Date().getFullYear()} Hole Shot Repair. All rights reserved. Oakland, Garrett County, Maryland.
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Specializing in Honda CT110, Dirt Bikes, ATVs &amp; Small Engines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
