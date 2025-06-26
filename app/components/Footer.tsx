'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import {
  MapPin,
  Clock,
  Phone,
} from 'lucide-react'

export default function Footer() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    client.fetch(`*[_type == "settings"][0]`).then(setData)
  }, [])

  if (!data) return null

  return (
    <footer className="bg-[#fdf8f3] text-[#2c2c2c] pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-14">
        {/* Logo + Mô tả */}
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
          <h2 className="text-xl font-semibold text-pink-600">{data.storeName}</h2>
          <p className="text-sm leading-relaxed text-gray-700">{data.description}</p>
        </div>

        {/* Liên hệ */}
        <div id="contact" className="space-y-3 text-sm">
          <h3 className="text-lg font-bold text-pink-500 mb-3">Contact</h3>
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-pink-400 mt-1" />
            <span><strong>Adres:</strong> {data.address}</span>
          </p>
          <p className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-pink-400 mt-1" />
            <span><strong>Openingstijden:</strong> {data.openingHours}</span>
          </p>
          <p className="flex items-start gap-2">
            <Phone className="w-4 h-4 text-pink-400 mt-1" />
            <span><strong>Telefoon:</strong> {data.phone}</span>
          </p>
        </div>

        {/* Map */}
        <div className="overflow-hidden rounded-2xl shadow-lg w-full aspect-video border border-pink-100">
          <iframe
            src={data.mapEmbedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mt-12 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} {data.storeName}. Alle rechten voorbehouden.
      </div>
    </footer>
  )
}
