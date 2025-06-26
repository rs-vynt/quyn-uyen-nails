"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

interface HeroData {
  heroImage: any;
  headline: string;
  subheadline: string;
  phone: string;
  bookingUrl: string;
}

export default function Hero() {
  const [data, setData] = useState<HeroData | null>(null);
  const [typedSubheadline, setTypedSubheadline] = useState("");

  useEffect(() => {
    client
      .fetch(
        `*[_type == "homepage"][0]{
          heroImage,
          headline,
          subheadline,
          "phone": *[_type == "settings"][0].phone,
          "bookingUrl": *[_type == "settings"][0].bookingUrl
        }`
      )
      .then(setData);
  }, []);

  useEffect(() => {
    if (data?.subheadline) {
      let index = 0;
      const text = data.subheadline;
      const interval = setInterval(() => {
        if (index < text.length) {
          setTypedSubheadline((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }
  }, [data?.subheadline]);

  if (!data) return null;

  return (
    <section
      id="home"
      className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={urlFor(data.heroImage).width(1920).url()}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover brightness-100 z-0"
      />

      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-pink-500/15 via-black/20 to-transparent pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl text-white">
          {data.headline || "Welkom bij Quyn Uyen Nails"}
        </h1>

        <p
          className="text-lg md:text-2xl text-white/90 mb-8 leading-relaxed min-h-[3rem]"
          aria-label={data.subheadline}
        >
          {typedSubheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={data.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block bg-pink-500/90 hover:bg-pink-600 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 overflow-hidden group animate-pulse-soft"
          >
            <span className="relative z-10">Afspraak maken</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-transform duration-1000 ease-out blur-md skew-x-12" />
          </a>

          <a
            href={`tel:${data.phone}`}
            className="relative inline-block py-3 px-8 rounded-full text-base sm:text-lg font-medium text-white/90 border border-white/40 hover:bg-white/10 transition duration-300 ease-in-out before:absolute before:inset-0 before:rounded-full before:blur before:opacity-0 hover:before:opacity-100 before:transition before:duration-500 before:bg-white/10"
          >
            <span className="relative z-10">Bel ons: {data.phone}</span>
          </a>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulse-soft {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.6);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(236, 72, 153, 0);
          }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2.5s infinite;
        }
      `}</style>
    </section>
  );
}
