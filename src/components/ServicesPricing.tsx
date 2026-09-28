import React, { useState } from 'react';
import { ServiceItem } from '../types';
import { Wrench, Check, ArrowRight, Calculator, Clock, DollarSign } from 'lucide-react';

interface ServicesPricingProps {
  services: ServiceItem[];
  onSelectServiceForRfq: (serviceTitle: string) => void;
}

export const ServicesPricing: React.FC<ServicesPricingProps> = ({
  services,
  onSelectServiceForRfq
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-16 sm:py-24 bg-neutral-900/50 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
              <DollarSign className="w-3.5 h-3.5" />
              <span>Transparent Rates &amp; Packages</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Repair Services &amp; Flat Pricing
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl">
              We believe in upfront estimates with zero surprise shop charges. All diagnostic inspection fees are credited directly toward approved repairs.
            </p>
          </div>

          {/* Rate Notice */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 max-w-sm">
            <div className="flex items-center gap-2 font-semibold text-amber-400 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Standard Labor Rate: $85 / Hour</span>
            </div>
            <div>Advocating for lower customer out-of-pocket costs with targeted component fixes rather than unnecessary full-unit replacements.</div>
          </div>
        </div>

        {/* Interactive Sliding Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl ${
                service.popular
                  ? 'bg-neutral-900/90 border-2 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-neutral-950/80 border border-neutral-800'
              }`}
            >
              {service.popular && (
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-amber-500 text-neutral-950 text-[11px] font-extrabold tracking-wide uppercase shadow-sm">
                  Most Requested
                </div>
              )}

              <div className="space-y-4">
                <div className="text-xs text-neutral-400 font-medium">{service.category}</div>
                <h3 className="text-lg font-bold text-white leading-snug font-display">
                  {service.title}
                </h3>
                
                {/* Price Lockup */}
                <div className="pt-2 pb-3 border-y border-neutral-800/80 flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-black text-amber-400 font-mono-numbers">
                      {service.price}
                    </span>
                    {service.hourlyRate && (
                      <span className="block text-[11px] text-neutral-400 font-mono-numbers">
                        Labor: {service.hourlyRate}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-neutral-300 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      {service.estimatedTime}
                    </span>
                    <span className="text-[10px] text-neutral-400">Typical Turnaround</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 pt-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-neutral-800/80">
                <button
                  onClick={() => onSelectServiceForRfq(service.title)}
                  className="w-full py-2.5 px-4 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-neutral-200 border border-neutral-700 hover:border-amber-500 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Book / Request Quote</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Free Advice & Diagnostic Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-white">Need honest advice before towing it in?</h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              As local Google reviewer David noted: <span className="text-neutral-200 italic">&ldquo;They gave me free advice when I had a flooded cylinder.&rdquo;</span> Call Zach directly.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:+13015017802"
              className="px-4 py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-semibold text-white border border-neutral-700"
            >
              (301) 501-7802
            </a>
            <button
              onClick={() => onSelectServiceForRfq('Custom Diagnostic')}
              className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-semibold text-neutral-950 cursor-pointer"
            >
              Submit Diagnostic RFQ
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
