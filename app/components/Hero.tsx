"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

interface HeroData {
  heroImage: any;
  headline: string;
  subheadline: string;
  phone: string;
  bookingUrl: string;
  socials?: {
    platform: string;
    url: string;
  }[];
}

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF className="w-4 h-4" />,
  instagram: <FaInstagram className="w-4 h-4" />,
  youtube: <FaYoutube className="w-4 h-4" />,
  twitter: <FaTwitter className="w-4 h-4" />,
  tiktok: <FaTiktok className="w-4 h-4" />,
  whatsapp: <FaWhatsapp className="w-5 h-5" />,
  gmail: <FaEnvelope className="w-5 h-5" />,
};

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
          "bookingUrl": *[_type == "settings"][0].bookingUrl,
          "socials": *[_type == "settings"][0].socials[enabled == true]
        }`
      )
      .then(setData);
  }, []);

  useEffect(() => {
    if (!data?.subheadline || typeof data.subheadline !== "string") return;

    const chars = Array.from(data.subheadline);
    let isCancelled = false;

    async function typeText() {
      setTypedSubheadline("");
      for (let i = 0; i < chars.length; i++) {
        if (isCancelled) return;
        setTypedSubheadline((prev) => prev + chars[i]);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    typeText();

    return () => {
      isCancelled = true;
    };
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
        className="absolute inset-0 w-full h-full object-cover brightness-95 saturate-80"
      />

      {/* Overlay: pastel beige nhẹ, giảm độ hồng nền */}
      <div className="absolute inset-0 bg-[#ECE2D0]/80 mix-blend-multiply" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-xl text-[#3D211A]">
          {data.headline || "Welkom bij Quyn Uyen Nails"}
        </h1>

        <p className="text-lg md:text-2xl text-[#6F4D38] mb-8 leading-relaxed min-h-[3rem]">
          {typedSubheadline ||
            "Ervaar professionele nagelverzorging in een stijlvolle omgeving."}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={data.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block bg-[#6F4D38] hover:bg-[#A07856] text-[#ECE2D0] text-base sm:text-lg font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 overflow-hidden group animate-pulse-soft"
          >
            <span className="relative z-10">Afspraak maken</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-transform duration-1000 ease-out blur-md skew-x-12" />
          </a>

          <a
            href={`tel:${data.phone}`}
            className="relative inline-block py-3 px-8 rounded-full text-base sm:text-lg font-semibold text-[#3D211A] border border-[#CBB799] hover:bg-[#CBB799]/30 transition duration-300 ease-in-out"
          >
            <span className="relative z-10">Bel ons: {data.phone}</span>
          </a>
        </div>

        {/* Social icons mobile */}
        {data.socials && data.socials.length > 0 && (
          <div className="mt-6 flex justify-center gap-4 sm:hidden">
            {data.socials.map((item, index) => {
              const platform = item.platform.toLowerCase();
              const Icon = socialIconMap[platform];
              if (!Icon) return null;

              return (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-[#6F4D38] hover:bg-[#A07856] rounded-full flex items-center justify-center text-[#ECE2D0] transition hover:scale-110"
                >
                  {Icon}
                </a>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-soft {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(160, 120, 86, 0.6);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(160, 120, 86, 0);
          }
        }

        .animate-pulse-soft {
          animation: pulse-soft 2.5s infinite;
        }
      `}</style>
    </section>
  );
}
