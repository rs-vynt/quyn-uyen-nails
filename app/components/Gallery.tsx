"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { X } from "lucide-react";
import CategoryFilter from "./CategoryFilter";

const ITEMS_PER_LOAD = 9;

interface Props {
  category?: string;
}

export default function Gallery({ category }: Props) {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category || null
  );

  const isFilteredMode = !!category;

  useEffect(() => {
    if (allImages.length > 0) return;

    client
      .fetch(
        `*[_type == "gallery"] | order(priority desc, _createdAt asc) {
          _id, image, category, caption
        }`
      )
      .then((imgs) => {
        setAllImages(imgs);
        if (category) setActiveCategory(category);
      })
      .finally(() => setIsLoading(false));
  }, [category, allImages.length]);

  const categories: string[] = Array.from(
    new Set(
      allImages
        .map((img) => img.category)
        .filter((c): c is string => typeof c === "string")
    )
  );

  const filteredImages = activeCategory
    ? allImages.filter((img) => img.category === activeCategory)
    : allImages;

  const visibleImages = filteredImages.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredImages.length;

  return (
    <section
      className={`${isFilteredMode ? "pt-4" : "pt-16"} pb-20 bg-[#ECE2D0]`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h1
          className={`${
            isFilteredMode ? "text-3xl" : "text-4xl"
          } font-bold text-center text-[#3D211A] mb-10`}
        >
          Galerij
        </h1>

        {!isFilteredMode && (
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelect={(cat) => {
              setActiveCategory(cat);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleImages.map((img) => {
            const thumbUrl = urlFor(img.image)
              .width(500)
              .height(400)
              .fit("crop")
              .url();
            const fullUrl = urlFor(img.image).width(1000).url();

            return (
              <div
                key={img._id}
                onClick={() => setSelectedImage(img)}
                className="relative cursor-pointer rounded-2xl overflow-hidden shadow-md border border-[#CBB799] transition hover:shadow-xl bg-white"
              >
                <img
                  loading="lazy"
                  src={thumbUrl}
                  alt={img.caption || ""}
                  className="w-full h-full object-cover aspect-[4/3]"
                />
                <link rel="preload" as="image" href={fullUrl} />
              </div>
            );
          })}
        </div>

        {!isLoading && visibleImages.length === 0 && (
          <div className="text-center text-[#A07856] mt-10">
            Geen afbeeldingen beschikbaar.
          </div>
        )}

        {isLoading && (
          <div className="text-center text-[#6F4D38] mt-10 font-medium">
            Laden...
          </div>
        )}

        {canLoadMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="px-6 py-3 bg-[#A07856] text-white rounded-full font-medium hover:bg-[#6F4D38] transition"
            >
              Meer laden
            </button>
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-[#fffaf9] max-w-3xl w-full rounded-2xl p-4 relative shadow-xl animate-fadeIn border border-[#CBB799]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-[#6F4D38] hover:text-[#3D211A] transition p-2 cursor-pointer"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="max-h-[80vh] overflow-y-auto rounded-xl scroll-hide">
              <img
                src={urlFor(selectedImage.image).width(1000).url()}
                alt={selectedImage.caption || ""}
                className="w-full rounded-xl mb-4"
              />
              {selectedImage.caption && (
                <p className="text-center text-[#6F4D38] px-2">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeInScale 0.3s ease-out;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
