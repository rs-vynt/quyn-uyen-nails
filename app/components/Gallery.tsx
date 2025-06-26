"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { X } from "lucide-react";

const ITEMS_PER_LOAD = 9;

export default function Gallery() {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery"] | order(priority desc, _createdAt asc) {
        _id, image, category, caption
      }`
      )
      .then(setAllImages);
  }, []);

  const categories = Array.from(
    new Set(allImages.map((img) => img.category).filter(Boolean))
  );

  const filteredImages = activeCategory
    ? allImages.filter((img) => img.category === activeCategory)
    : allImages;

  const visibleImages = filteredImages.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredImages.length;

  return (
    <section className="py-20 bg-[#fffaf9]">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-pink-600 mb-10">
          Galerij
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => {
              setActiveCategory(null);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              !activeCategory
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-pink-100 transition`}
          >
            Alles
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(ITEMS_PER_LOAD);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                activeCategory === cat
                  ? "bg-pink-500 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-pink-100 transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleImages.map((img) => (
            <div
              key={img._id}
              onClick={() => setSelectedImage(img)}
              className="cursor-pointer rounded-2xl overflow-hidden shadow-md border border-pink-100 transition hover:shadow-xl"
            >
              <img
                src={urlFor(img.image).width(500).height(400).fit("crop").url()}
                alt={img.caption || ""}
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {canLoadMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition"
            >
              Meer laden
            </button>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white max-w-3xl w-full rounded-2xl p-4 relative shadow-xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>

            <img
              src={urlFor(selectedImage.image).width(1000).url()}
              alt={selectedImage.caption || ""}
              className="w-full rounded-xl mb-4"
            />
            {selectedImage.caption && (
              <p className="text-center text-gray-600">
                {selectedImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
