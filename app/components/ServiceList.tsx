'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { X } from 'lucide-react';

const ITEMS_PER_LOAD = 6;

export default function ServiceList() {
  const [allServices, setAllServices] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [activeService, setActiveService] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "service"] | order(priority desc, _createdAt asc) {
        _id, title, description, priceText, price, image, category, priority
      }`)
      .then(setAllServices);
  }, []);

  const categories = Array.from(
    new Set(allServices.map((s) => s.category).filter(Boolean))
  );

  const filteredServices = activeCategory
    ? allServices.filter((s) => s.category === activeCategory)
    : allServices;

  const visibleServices = filteredServices.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredServices.length;

  return (
    <section id="services" className="py-20 bg-[#fffaf9]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-pink-600">
          Diensten
        </h2>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => {
              setActiveCategory(null);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              !activeCategory
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-700 border-gray-300'
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
                  ? 'bg-pink-500 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              } hover:bg-pink-100 transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleServices.map((s) => (
            <div
              key={s._id}
              onClick={() => setActiveService(s)}
              className="cursor-pointer bg-white rounded-3xl shadow-md border border-pink-50 p-6 flex flex-col hover:shadow-xl transition duration-300"
            >
              {s.image && (
                <div className="rounded-xl overflow-hidden aspect-[4/3] mb-4">
                  <img
                    src={urlFor(s.image).width(400).height(300).fit('crop').url()}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-5">
                {s.description}
              </p>
              <p className="text-pink-600 font-bold mt-4 text-lg">
                {s.priceText || `${s.price} €`}
              </p>
            </div>
          ))}
        </div>

        {/* Load more */}
        {canLoadMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="px-6 py-3 bg-pink-500 text-white rounded-full font-medium hover:bg-pink-600 transition"
            >
              Laad Meer
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {activeService && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setActiveService(null)}
        >
          <div
            className="bg-white max-w-2xl w-full rounded-2xl p-6 relative shadow-xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>

            {activeService.image && (
              <img
                src={urlFor(activeService.image).width(600).url()}
                alt={activeService.title}
                className="w-full rounded-xl mb-4"
              />
            )}

            <h3 className="text-2xl font-bold text-pink-600 mb-2">
              {activeService.title}
            </h3>
            <p className="text-gray-700 mb-4 whitespace-pre-line">
              {activeService.description}
            </p>
            <p className="text-pink-600 font-bold text-lg">
              {activeService.priceText || `${activeService.price} €`}
            </p>
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
