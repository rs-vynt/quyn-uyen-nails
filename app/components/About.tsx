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
    <section id="about" className="py-24 bg-[#ECE2D0]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="relative group">
          <img
            src={urlFor(data.aboutImage).width(800).url()}
            alt="About"
            className="rounded-3xl shadow-xl w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 rounded-3xl ring-2 ring-[#CBB799] opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none" />
        </div>

        {/* Text */}
        <div className="bg-[#fffaf5]/80 backdrop-blur-md border border-[#CBB799] rounded-3xl shadow-md px-4 py-8 md:px-6 md:py-8 transition hover:shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-[#3D211A] mb-4 font-serif">
            Over Ons
          </h2>
          <p className="text-lg leading-relaxed text-[#6F4D38] whitespace-pre-line font-[Georgia,serif] md:font-[Satisfy,cursive]">
            {data.aboutText}
          </p>
          <div className="mt-6 w-20 h-1 bg-[#A07856] rounded-full" />
        </div>
      </div>
    </section>
  );
}
