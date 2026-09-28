import React, { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Share2, Bookmark, Check, ExternalLink } from 'lucide-react';

export const LocationHours: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const address = '7 E First Ave, Oakland, MD 21550, United States';
  const directionsUrl = 'https://maps.google.com/?q=7+E+First+Ave,+Oakland,+MD+21550';

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Hole Shot Repair - Oakland MD',
        text: 'Small engine & powersports repair at 7 E First Ave, Oakland MD.',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Shop Details */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Oakland, Maryland Workshop</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display mt-1">
                Drop By or Send In Your Machine
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base mt-2">
                Hole Shot Repair is conveniently situated inside{' '}
                <strong className="text-white">Noland Trans World Cycle</strong> on East First Avenue in historic downtown Oakland.
              </p>
            </div>

            {/* Address & Plus Code Card */}
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-neutral-400">Street Address</div>
                  <div className="text-lg font-bold text-white leading-snug">
                    7 E First Ave, Oakland, MD 21550
                  </div>
                  <div className="text-xs text-amber-400 font-medium">
                    Located in: Noland Trans World Cycle
                  </div>
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-neutral-800 text-xs">
                <div>
                  <span className="text-neutral-400">Direct Phone:</span>{' '}
                  <a href="tel:+13015017802" className="text-white hover:text-amber-400 font-semibold font-mono-numbers">
                    +1 301-501-7802
                  </a>
                </div>
                <div>
                  <span className="text-neutral-400">Maps Plus Code:</span>{' '}
                  <span className="text-neutral-200 font-mono">9JWH+32 Oakland, MD</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-neutral-800">
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Address Copied!' : 'Share Location'}</span>
                </button>

                <button
                  onClick={() => setSaved(!saved)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                    saved
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                      : 'bg-neutral-950 text-neutral-300 border-neutral-800 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-amber-400' : ''}`} />
                  <span>{saved ? 'Saved to Favorites' : 'Save Shop'}</span>
                </button>
              </div>
            </div>

            {/* Shop Exterior Photo */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <img
                src="/src/assets/images/exterior_oakland_shop_1790566937041.jpg"
                alt="Exterior of Hole Shot Repair at 7 E First Ave Oakland MD"
                className="w-full h-52 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-neutral-950 text-xs text-neutral-400 flex items-center justify-between">
                <span>Trailer drop-off &amp; easy truck loading access in front</span>
                <span className="text-amber-400 font-medium">Hole Shot Repair</span>
              </div>
            </div>
          </div>

          {/* Business Hours & Drop-off Protocol */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <h3 className="text-lg font-bold text-white font-display">Workshop Hours</h3>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                  Opens 9 AM Mon
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                {[
                  { day: 'Monday', hours: '9:00 AM – 5:00 PM', current: true },
                  { day: 'Tuesday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Wednesday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Thursday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Friday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 1:00 PM (Drop-offs)' },
                  { day: 'Sunday', hours: 'Closed' }
                ].map((schedule, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${
                      schedule.current ? 'bg-amber-500/10 text-white font-bold' : 'text-neutral-300'
                    }`}
                  >
                    <span>{schedule.day}</span>
                    <span className="font-mono-numbers">{schedule.hours}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
                <div className="font-semibold text-white">Equipment Drop-Off Protocol:</div>
                <p className="text-neutral-400">
                  Please turn off fuel petcocks when transporting. If bringing equipment on an open trailer or truck bed, our crew can assist with unloading ramps.
                </p>
              </div>

              <a
                href="tel:+13015017802"
                className="w-full py-3 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-white font-semibold text-xs border border-neutral-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Direct Shop Line: (301) 501-7802</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
