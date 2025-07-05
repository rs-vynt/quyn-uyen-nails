'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { Service } from './ServiceList'
import ServiceCard from './ServiceCard'
import ServiceModal from './ServiceModal'
import Link from 'next/link'

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>([])
  const [activeService, setActiveService] = useState<Service | null>(null)

  useEffect(() => {
    client
      .fetch(
        `*[_type == "service" && defined(priority)] | order(priority desc)[0...3]{
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
    <section className="py-16 bg-[#ECE2D0]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#3D211A] mb-10">
          Populaire Diensten
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} onClick={() => setActiveService(s)} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block bg-[#6F4D38] hover:bg-[#A07856] text-[#ECE2D0] font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
          >
            Bekijk alle diensten
          </Link>
        </div>
      </div>

      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </section>
  )
}
