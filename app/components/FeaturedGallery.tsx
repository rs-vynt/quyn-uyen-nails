"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default function FeaturedGallery() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "gallery"] | order(priority desc, _createdAt desc)[0...6] {
          _id, image, caption
        }`
      )
      .then(setImages);
  }, []);

  if (!images.length) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-pink-600">
          Uitgelichte Foto's
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img._id}
              className="overflow-hidden rounded-2xl shadow-md border border-pink-100 transition hover:shadow-lg"
            >
              <img
                src={urlFor(img.image).width(600).height(400).fit("crop").url()}
                alt={img.caption || ""}
                className="w-full h-full object-cover aspect-[4/3]"
              />
              {img.caption && (
                <p className="p-3 text-sm text-center text-gray-700">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
          >
            Bekijk alle foto's
          </Link>
        </div>
      </div>
    </section>
  );
}
