import React, { useState } from 'react';
import { ReviewItem, ReviewPlatform } from '../types';
import { Star, ChevronLeft, ChevronRight, PenTool, CheckCircle, Quote, ThumbsUp, Share2 } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onOpenWriteReview: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenWriteReview
}) => {
  const [activePlatform, setActivePlatform] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredReviews =
    activePlatform === 'all'
      ? reviews
      : reviews.filter((r) => r.platform === activePlatform);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredReviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredReviews.length) % filteredReviews.length);
  };

  const currentReview = filteredReviews[currentIndex] || filteredReviews[0];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Scoreboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>Cross-Platform Reputation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Rated 4.9 Stars Across Garrett County
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
              Authentic customer testimonials from Google, Yelp, and local riders. Real mechanics, honest advice, and reasonable parts pricing.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono-numbers">
                  4.9
                </span>
                <span className="text-xs text-neutral-400 font-medium">out of 5.0</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-neutral-400 mt-2 font-mono-numbers">
                Based on 7 verified reviews
              </div>
            </div>

            <button
              onClick={onOpenWriteReview}
              className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'google', label: 'Google (4.9★)' },
              { id: 'yelp', label: 'Yelp' },
              { id: 'facebook', label: 'Facebook' },
              { id: 'direct', label: 'Verified Direct' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActivePlatform(tab.id);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activePlatform === tab.id
                    ? 'bg-white text-neutral-950'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel Arrows */}
          {filteredReviews.length > 1 && (
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrev}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-850 cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-850 cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Sliding Featured Review Card */}
        {currentReview && (
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl bg-neutral-900/90 border border-neutral-800 p-6 sm:p-10 shadow-2xl space-y-6">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-neutral-800/40 pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg font-display">
                    {currentReview.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white leading-tight">
                      {currentReview.author}
                    </h3>
                    <div className="text-xs text-neutral-400 flex items-center gap-2 mt-0.5">
                      <span>{currentReview.role || 'Verified Customer'}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize text-amber-400 font-medium">via {currentReview.platform}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: currentReview.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs text-neutral-400 ml-2 font-mono-numbers">
                    {currentReview.date}
                  </span>
                </div>
              </div>

              {/* Equipment tag */}
              {currentReview.equipment && (
                <div className="text-xs text-neutral-400">
                  Equipment Serviced: <strong className="text-neutral-200">{currentReview.equipment}</strong>
                </div>
              )}

              {/* Review Text */}
              <p className="text-base sm:text-lg text-neutral-200 leading-relaxed italic">
                &ldquo;{currentReview.text}&rdquo;
              </p>

              {/* Owner Reply if present */}
              {currentReview.ownerReply && (
                <div className="mt-4 pt-4 border-t border-neutral-800/80 pl-4 border-l-2 border-l-amber-500 bg-neutral-950/40 p-3 rounded-r-lg space-y-1">
                  <div className="text-xs font-semibold text-amber-400">
                    Response from {currentReview.ownerReply.author}
                  </div>
                  <p className="text-xs text-neutral-300">
                    {currentReview.ownerReply.text}
                  </p>
                </div>
              )}

              {/* Engagement row */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-neutral-400 hover:text-white cursor-pointer">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-400 hover:text-white cursor-pointer">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </span>
                </div>
                <div className="text-[11px] font-mono-numbers text-neutral-500">
                  Review {currentIndex + 1} of {filteredReviews.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3-Column Reviews Cards Preview */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="font-semibold text-white">{rev.author}</span>
                <span className="flex items-center gap-0.5 text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span>{rev.rating}.0</span>
                </span>
              </div>
              <p className="text-xs text-neutral-300 line-clamp-3 italic">
                &ldquo;{rev.text}&rdquo;
              </p>
              <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-2 border-t border-neutral-800">
                <span className="capitalize">{rev.platform}</span>
                <span>{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
