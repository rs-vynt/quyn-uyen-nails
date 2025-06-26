"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface AboutData {
  aboutText: string;
  aboutImage: any;
}

export default function About() {
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(
          `*[_type == "homepage"][0]{aboutText, aboutImage}`
        );
        setData(result);
      } catch (error) {
        console.error("Error fetching about data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section id="about" className="py-24 bg-[#fffaf9]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Image with preserved hover effect */}
        <div className="relative group">
          <img
            src={urlFor(data.aboutImage).width(800).url()}
            alt="About"
            className="rounded-3xl shadow-xl w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-3xl ring-2 ring-pink-200 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
        </div>

        {/* Text Card */}
        <div className="bg-white/80 backdrop-blur-md border border-pink-100 rounded-3xl shadow-md px-4 py-8 md:px-6 md:py-8 transition hover:shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4 font-serif">
            Over Ons
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line font-[Georgia,serif] md:font-[Satisfy,cursive]">
            {data.aboutText}
          </p>
          <div className="mt-6 w-20 h-1 bg-pink-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}
