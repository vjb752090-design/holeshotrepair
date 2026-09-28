import React, { useState } from 'react';
import { Star, X, CheckCircle, MessageSquare } from 'lucide-react';
import { ReviewItem, ReviewPlatform } from '../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<ReviewItem, 'id' | 'date'>) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('Local Customer');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [platform, setPlatform] = useState<ReviewPlatform>('google');
  const [equipment, setEquipment] = useState('');
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) return;

    onSubmitReview({
      author: author.trim(),
      role: role.trim() || 'Verified Customer',
      rating,
      platform,
      equipment: equipment.trim() || 'Small Engine Repair',
      text: text.trim(),
      verified: true
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      // Reset form
      setAuthor('');
      setEquipment('');
      setText('');
      setRating(5);
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="relative max-w-lg w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Thank You for Your Review!</h3>
            <p className="text-sm text-neutral-300">
              Your feedback helps Zach and the Hole Shot Repair crew continue providing honest, top-tier service to our Garrett County neighbors.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Customer Feedback</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Share Your Hole Shot Experience
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Tell us about the repair, turn-around speed, and how Zach &amp; the crew treated your equipment.
              </p>
            </div>

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Rating (1 – 5 Stars)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-neutral-600 hover:text-amber-400 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-neutral-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm font-bold text-white ml-2">
                  {rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Review Platform
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['google', 'yelp', 'facebook', 'direct'] as ReviewPlatform[]).map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setPlatform(p)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border capitalize transition-all cursor-pointer ${
                      platform === p
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/50 font-bold'
                        : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {p === 'direct' ? 'Website' : p}
                  </button>
                ))}
              </div>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Your Full Name or Handle *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g., Brad K., Thomas Kooken"
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Equipment Serviced */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Equipment / Engine Serviced
              </label>
              <input
                type="text"
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                placeholder="e.g., Honda CT110, Polaris ATV, Craftsman Mower"
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Your Review *
              </label>
              <textarea
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Describe the job, affordability, and your interaction with Zach & the crew..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-950 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
