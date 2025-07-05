"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import ServiceCard from "./ServiceCard";
import ServiceModal from "./ServiceModal";
import CategoryFilter from "./CategoryFilter";

const ITEMS_PER_LOAD = 6;

export interface Service {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceText?: string;
  image?: any;
  category?: string;
  priority?: number;
}

interface ServiceListProps {
  category?: string;
}

export default function ServiceList({ category }: ServiceListProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(true);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    category || null
  );

  const isFilteredMode = !!category;

  useEffect(() => {
    if (services.length > 0) return;

    const query = `*[_type == "service"] | order(priority desc, _createdAt asc){
    _id, title, description, priceText, price, image, category, priority
  }`;

    client
      .fetch(query)
      .then((all) => {
        setServices(all);
        if (category) setActiveCategory(category);
      })
      .finally(() => setIsLoading(false));
  }, [category, services.length]);

  const categories: string[] = Array.from(
    new Set(
      services
        .map((s) => s.category)
        .filter((c): c is string => typeof c === "string")
    )
  );
  const filteredServices = activeCategory
    ? services.filter((s) => s.category === activeCategory)
    : services;

  const visibleServices = filteredServices.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredServices.length;

  return (
    <section
      className={`${isFilteredMode ? "pt-4" : "pt-16"} pb-20 bg-[#ECE2D0]`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={`text-center font-bold mb-10 text-[#6F4D38] ${
            isFilteredMode ? "text-3xl" : "text-4xl"
          }`}
        >
          Diensten
        </h2>

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {visibleServices.map((s) => (
            <ServiceCard
              key={s._id}
              service={s}
              onClick={() => setActiveService(s)}
            />
          ))}
        </div>

        {!isLoading && visibleServices.length === 0 && (
          <div className="text-center text-[#A07856] mt-10 italic">
            Geen diensten gevonden.
          </div>
        )}

        {isLoading && (
          <div className="text-center text-[#CBB799] mt-10 font-medium">
            Laden...
          </div>
        )}

        {canLoadMore && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_LOAD)}
              className="px-6 py-3 bg-[#CBB799] text-[#3D211A] rounded-full font-medium border border-[#A07856] hover:bg-[#A07856] hover:text-white transition duration-300 ease-in-out hover:scale-[1.02]"
            >
              Laad Meer
            </button>
          </div>
        )}
      </div>

      {activeService && (
        <ServiceModal
          service={activeService}
          onClose={() => setActiveService(null)}
        />
      )}
    </section>
  );
}
