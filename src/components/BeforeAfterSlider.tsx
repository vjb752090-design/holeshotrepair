import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Sparkles, AlertCircle } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="restoration" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Workshop Craftsmanship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Slide to Compare: The Hole Shot Difference
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Drag the slider to see how Zach and the crew bring neglected equipment back from dead storage to factory-fresh peak performance.
          </p>
        </div>

        {/* Comparison Showcase Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[360px] sm:h-[460px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-neutral-800 shadow-2xl bg-neutral-900"
          >
            {/* After Image (Right / Base) */}
            <div className="absolute inset-0">
              <img
                src="/src/assets/images/service_motorcycle_trail_1790566922661.jpg"
                alt="After: Clean rebuilt Honda CT110 and tuned engine running smooth"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AFTER: Precision Rebuilt &amp; Tuned</span>
              </div>
            </div>

            {/* Before Image (Left / Clipped Overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <img
                  src="/src/assets/images/service_carburetor_rebuild_1790566910493.jpg"
                  alt="Before: Disassembled gummed-up carburetor and seized cylinder"
                  className="absolute inset-0 w-full h-full object-cover filter contrast-110 brightness-90 grayscale-[35%]"
                  style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 px-3.5 py-1.5 rounded-lg bg-neutral-950/80 backdrop-blur-md border border-amber-500/40 text-amber-400 text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>BEFORE: Gummed Carb &amp; Non-Starting</span>
                </div>
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Handle Knob */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-neutral-950 border-2 border-amber-500 text-amber-400 flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform">
                <SlidersHorizontal className="w-4 h-4 rotate-90" />
              </div>
            </div>

            {/* Top Prompt pill */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-950/75 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[11px] pointer-events-none">
              Slide left or right to inspect
            </div>
          </div>

          {/* Customer Quote reference */}
          <div className="mt-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
            <div>
              <strong className="text-white font-medium">Real Job Highlight:</strong> Honda CT110 Trail Bike brought back from non-running state with custom carburetor rebuild, fresh ignition timing, and valve lash check.
            </div>
            <div className="shrink-0 text-amber-400 font-semibold">
              &ldquo;Quickly did a great job fixing it&rdquo; — Thomas K.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
