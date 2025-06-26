'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import { X } from 'lucide-react'

interface Service {
  _id: string
  title: string
  description: string
  price: number
  priceText?: string
  image?: any
  priority?: number
}

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([])
  const [activeService, setActiveService] = useState<Service | null>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "service" && defined(priority)] | order(priority asc)[0...3]{
          _id,
          title,
          description,
          price,
          priceText,
          image
        }`
      )
      .then(setServices)
  }, [])

  if (!services.length) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-10">
          Populaire Diensten
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s._id}
              onClick={() => setActiveService(s)}
              className="cursor-pointer transition duration-300 hover:scale-[1.01]"
            >
              <div className="bg-gradient-to-br from-pink-100 to-rose-50 p-[1px] rounded-3xl shadow-md hover:shadow-pink-200 transition-shadow duration-300">
                <div className="bg-white rounded-3xl overflow-hidden">
                  {s.image && (
                    <div className="overflow-hidden aspect-[4/3] rounded-t-3xl">
                      <img
                        src={urlFor(s.image).width(600).fit('crop').url()}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-5 md:p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{s.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
                      {s.description}
                    </p>
                    <p className="text-pink-600 font-bold text-lg">
                      {s.priceText || `${s.price} €`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
          >
            Bekijk alle diensten
          </Link>
        </div>
      </div>

      {/* Popup Modal */}
      {activeService && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          onClick={() => setActiveService(null)}
        >
          {/* Spotlight background */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
          </div>

          <div
  className="relative max-w-2xl w-full max-h-[90vh] rounded-2xl animate-zoomFadeIn z-10"
  onClick={(e) => e.stopPropagation()}
>
  {/* Viền phát sáng gradient cố định ngoài nội dung cuộn */}
  <div className="absolute inset-0 rounded-2xl pointer-events-none z-[-1] animate-borderGlow bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 opacity-30" />

  {/* Nội dung cuộn riêng biệt */}
  <div className="bg-white rounded-2xl overflow-y-auto max-h-[90vh] p-6">
    <button
      onClick={() => setActiveService(null)}
      className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-20"
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

    <h3 className="text-2xl font-bold text-pink-600 mb-2">{activeService.title}</h3>
    <p className="text-gray-700 mb-4 whitespace-pre-line">{activeService.description}</p>
    <p className="text-pink-600 font-bold text-lg">
      {activeService.priceText || `${activeService.price} €`}
    </p>
  </div>
</div>

        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        @keyframes zoomFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes borderGlow {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }

        .animate-zoomFadeIn {
          animation: zoomFadeIn 0.4s ease-out forwards;
        }

        .animate-borderGlow {
          background-size: 200% 200%;
          animation: borderGlow 3s linear infinite;
        }
      `}</style>
    </section>
  )
}
