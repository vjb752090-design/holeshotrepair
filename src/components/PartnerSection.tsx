import React from 'react';
import { Shield, Phone, MapPin, Star, ExternalLink, Car } from 'lucide-react';

export const PartnerSection: React.FC = () => {
  return (
    <section className="py-14 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Garrett County Trusted Automotive Network</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Need Full Automotive or Collision Work?
              </h3>
              
              <p className="text-sm text-neutral-300 leading-relaxed max-w-2xl">
                While Hole Shot Repair specializes in motorcycles, vintage trail bikes, ATVs, and small engines at 7 E First Ave, we proudly recommend our local colleague{' '}
                <strong className="text-white">Kevin Shaffer&apos;s Auto Body and Collision Repair</strong> for full-size vehicle body repair, frame alignment, and paint.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-400">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.7 Rating (6 Reviews)</span>
                </span>
                <span aria-hidden="true" className="text-neutral-700">·</span>
                <span className="flex items-center gap-1 text-neutral-300">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>2999 Hutton Rd, Oakland, MD 21550 (Plus Code: 9GQV+QV)</span>
                </span>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 italic">
                &ldquo;Very Good service. And the owner is very helpful.&rdquo; — David (Local Guide)
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              <a
                href="tel:+12403210939"
                className="w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-white font-semibold text-xs border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call Kevin Shaffer&apos;s: (240) 321-0939</span>
              </a>

              <a
                href="https://maps.google.com/?q=2999+Hutton+Rd,+Oakland,+MD+21550"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white text-xs font-medium border border-neutral-800 flex items-center justify-center gap-2 transition-colors"
              >
                <Car className="w-3.5 h-3.5" />
                <span>Directions to Hutton Rd Facility</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
