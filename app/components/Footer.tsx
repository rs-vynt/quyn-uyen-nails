"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { MapPin, Clock, Phone } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaTiktok,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <FaFacebookF className="w-5 h-5" />,
  instagram: <FaInstagram className="w-5 h-5" />,
  youtube: <FaYoutube className="w-5 h-5" />,
  twitter: <FaTwitter className="w-5 h-5" />,
  tiktok: <FaTiktok className="w-5 h-5" />,
  whatsapp: <FaWhatsapp className="w-5 h-5" />,
  gmail: <FaEnvelope className="w-5 h-5" />,
};

export default function Footer() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "settings"][0]{
      storeName,
      logo,
      description,
      address,
      phone,
      bookingUrl,
      openingHours,
      mapEmbedUrl,
      "socials": socials[enabled == true]
    }`
      )
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <footer className="bg-[#ECE2D0] text-[#3D211A] pt-20 pb-18 md:pb-10 border-t border-[#CBB799]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-14">
        {/* Logo + Description */}
        <div className="space-y-4">
          {data.logo && (
            <div className="w-[160px] h-auto">
              <img
                src={urlFor(data.logo).width(300).url()}
                alt={data.storeName}
                className="w-full object-contain"
              />
            </div>
          )}
          <h2 className="text-xl font-semibold text-[#6F4D38]">
            {data.storeName}
          </h2>
          <p className="text-sm leading-relaxed text-[#6F4D38]">
            {data.description}
          </p>
        </div>

        {/* Contact Info */}
        <div id="contact" className="space-y-4 text-sm">
          <h3 className="text-lg font-bold text-[#A07856] mb-3">Contact</h3>

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 min-w-[16px] text-[#A07856] mt-1" />
            <span>
              <strong>Adres:</strong> {data.address}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 min-w-[16px] text-[#A07856] mt-1" />
            <span>
              <strong>Openingstijden:</strong> {data.openingHours}
            </span>
          </div>

          <div className="flex items-start gap-2">
            <Phone className="w-4 h-4 min-w-[16px] text-[#A07856] mt-1" />
            <span>
              <strong>Telefoon:</strong> {data.phone}
            </span>
          </div>
        </div>

        {/* Map Embed */}
        <div className="overflow-hidden rounded-2xl shadow-lg w-full aspect-video border border-[#CBB799]">
          <iframe
            src={data.mapEmbedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Social Icons */}
      {data.socials?.length > 0 && (
        <div className="mt-8 flex justify-center gap-4">
          {data.socials.map((item: any, index: number) => {
            const platform = item.platform.toLowerCase();
            const Icon = socialIconMap[platform];
            if (!Icon) return null;

            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#CBB799]/40 hover:bg-[#CBB799] rounded-full flex items-center justify-center transition transform hover:scale-110 text-[#3D211A]"
              >
                {Icon}
              </a>
            );
          })}
        </div>
      )}

      {/* Copyright */}
      <div className="mt-12 text-center text-xs text-[#6F4D38]">
        © {new Date().getFullYear()} {data.storeName}. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
