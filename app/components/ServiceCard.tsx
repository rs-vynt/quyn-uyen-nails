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
      className="group relative p-[2px] rounded-[2.5rem_2rem_2.25rem_1.75rem] bg-gradient-to-br from-[#CBB799] via-[#ECE2D0] to-[#ECE2D0] shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer"
    >
      <div className="absolute inset-0 rounded-[2.5rem_2rem_2.25rem_1.75rem] pointer-events-none animate-borderGlow opacity-10 group-hover:opacity-30" />

      <div className="relative bg-[#ECE2D0] rounded-[2.5rem_2rem_2.25rem_1.75rem] p-6 overflow-hidden border border-[#E6DCCB]">
        <div className="absolute top-3 right-4 z-10">
          <div className="text-[13px] font-semibold px-4 py-1 bg-[#ECE2D0] text-[#3D211A] shadow ring-1 ring-[#A07856] rounded-full backdrop-blur-sm transition-all duration-300 group-hover:scale-105 group-hover:bg-[#CBB799] group-hover:text-[#6F4D38]">
            {service.priceText || `${service.price} €`}
          </div>
        </div>

        {service.image && (
          <div className="overflow-hidden mb-4 rounded-[1.5rem]">
            <img
              src={urlFor(service.image).width(400).height(300).fit("crop").url()}
              alt={service.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        <div>
          <h3 className="text-xl font-bold text-[#3D211A] mb-2 leading-snug group-hover:text-[#6F4D38] transition">
            {service.title}
          </h3>
          <p className="text-[#6F4D38] text-sm leading-relaxed line-clamp-4 group-hover:text-[#A07856] transition min-h-[5.75rem]">
            {service.description}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes borderGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(160, 120, 86, 0.4);
          }
          50% {
            box-shadow: 0 0 25px 8px rgba(160, 120, 86, 0.3);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(160, 120, 86, 0.4);
          }
        }

        .animate-borderGlow {
          animation: borderGlow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
