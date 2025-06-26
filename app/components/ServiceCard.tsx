import { Service } from "./ServiceList";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  service: Service;
  onClick: () => void;
}

export default function ServiceCard({ service, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group relative p-[2px] rounded-[2.5rem_2rem_2.25rem_1.75rem] bg-gradient-to-br from-pink-200 via-white to-rose-100 shadow-md hover:shadow-pink-200 transition-all duration-500 cursor-pointer"
    >
      {/* Glow border effect on hover */}
      <div className="absolute inset-0 rounded-[2.5rem_2rem_2.25rem_1.75rem] pointer-events-none animate-borderGlow opacity-10 group-hover:opacity-30" />

      <div className="relative bg-white rounded-[2.5rem_2rem_2.25rem_1.75rem] p-6 overflow-hidden">
        {/* Price Tag */}
        <div className="absolute top-3 right-4 z-10">
          <div className="text-[13px] font-semibold px-4 py-1 bg-white text-pink-600 shadow ring-1 ring-pink-200/50 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-pink-50 group-hover:text-pink-700">
            {service.priceText || `${service.price} €`}
          </div>
        </div>

        {/* Image */}
        {service.image && (
          <div className="overflow-hidden mb-4 rounded-[1.5rem]">
            <img
              src={urlFor(service.image).width(400).height(300).fit("crop").url()}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Text */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 leading-snug group-hover:text-pink-700 transition">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-700 transition min-h-[5.75rem]">
            {service.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes borderGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4);
          }
          50% {
            box-shadow: 0 0 25px 8px rgba(236, 72, 153, 0.3);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(236, 72, 153, 0.4);
          }
        }

        .animate-borderGlow {
          animation: borderGlow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
