import React from 'react';
import { ArrowRight, Phone, Star, ShieldCheck, Clock, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenRfq: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRfq }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-8 pb-16 lg:py-20 border-b border-neutral-800">
      {/* Subtle radial ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Zero-Pill Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-neutral-400">
              <span className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-white">4.9</span>
              </span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>7 Verified Google Reviews</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span className="flex items-center gap-1 text-neutral-300">
                <MapPin className="w-3 h-3 text-amber-400" />
                Oakland, MD (Noland Trans World Cycle)
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display text-balance">
              Small Engine &amp; Powersports Repair with Honest Pricing.
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed">
              From vintage Honda CT110s and competition dirt bikes to ATVs, lawn tractors, and commercial generators. Zach and his crew diagnose with precision, limit your out-of-pocket expenses, and get you back up and running.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRfq}
                className="px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-lg shadow-amber-500/10 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Request Equipment Quote (RFQ)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+13015017802"
                className="px-5 py-3.5 text-sm font-medium text-white hover:text-amber-400 bg-neutral-900 hover:bg-neutral-850 rounded-lg border border-neutral-700/80 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="font-mono-numbers">(301) 501-7802</span>
              </a>
            </div>

            {/* Quick Proof Metrics adjacent to claim */}
            <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-neutral-300">
              <div>
                <div className="text-2xl font-bold text-white font-mono-numbers">4.9 / 5.0</div>
                <div className="text-xs text-neutral-400 mt-0.5">Top-Rated in Garrett Co.</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-400 font-mono-numbers">100%</div>
                <div className="text-xs text-neutral-400 mt-0.5">Diagnosed Before Billing</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white font-mono-numbers">1–2 Days</div>
                <div className="text-xs text-neutral-400 mt-0.5">Carb &amp; Tune Turnaround</div>
              </div>
            </div>

            {/* Real quote banner from prompt */}
            <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 italic">
                &ldquo;The guys at Hole Shot Repair are amazing... they do great work, advocate for their customers &amp; look for ways to limit out-of-pocket expenses!&rdquo;
                <span className="block not-italic text-xs font-semibold text-neutral-400 mt-1">
                  — Brad Kilbey (Google Review)
                </span>
              </p>
            </div>
          </div>

          {/* Right Column: Workshop Image with Subtle Overlay and Status Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/hero_engine_workshop_1790566895597.jpg"
                alt="Hole Shot Repair small engine and powersports workshop station"
                className="w-full h-[380px] sm:h-[440px] object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              
              {/* Bottom Card Inside Hero Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-900/90 backdrop-blur-md border border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-semibold text-neutral-200">Active Service Bays</span>
                  </div>
                  <span className="text-[11px] font-mono-numbers text-neutral-400">Oakland, MD 21550</span>
                </div>
                <div className="mt-2 text-xs text-neutral-300">
                  Located inside <strong className="text-white">Noland Trans World Cycle</strong> at 7 E First Ave. Drop-offs &amp; pickups welcome.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
