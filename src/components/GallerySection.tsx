import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { Camera, Eye, X, Calendar, Tag } from 'lucide-react';

interface GallerySectionProps {
  photos: GalleryPhoto[];
  onOpenManagerUpload?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos, onOpenManagerUpload }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category)))];

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-500 uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Workshop &amp; Project Photos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Real Work from Our Oakland Bench
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base max-w-2xl">
              Inspect our current rebuilds, ultrasonic carburetor restorations, and machines rolling out of our bays.
            </p>
          </div>

          {onOpenManagerUpload && (
            <button
              onClick={onOpenManagerUpload}
              className="self-start md:self-auto text-xs font-medium text-amber-400 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
            >
              Manager PIN: Add New Photos &rarr;
            </button>
          )}
        </div>

        {/* Category Pills */}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider">
                  {photo.category}
                </span>
                <h3 className="text-sm font-bold text-white font-display leading-tight mt-0.5">
                  {photo.title}
                </h3>
                <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-300">
                  <span className="truncate max-w-[170px]">{photo.description}</span>
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Static title for mobile touch accessibility */}
              <div className="p-3 sm:hidden border-t border-neutral-800/80 bg-neutral-950">
                <div className="text-[10px] text-amber-500 font-semibold">{photo.category}</div>
                <div className="text-xs font-bold text-white truncate">{photo.title}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-950/80 text-white hover:text-amber-400 border border-neutral-700 transition-colors"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 bg-neutral-950 space-y-2">
                <div className="flex items-center gap-3 text-xs text-neutral-400">
                  <span className="flex items-center gap-1 text-amber-400">
                    <Tag className="w-3 h-3" />
                    {selectedPhoto.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {selectedPhoto.dateAdded}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-neutral-300">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
