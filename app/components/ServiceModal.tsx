import { Service } from "./ServiceList";
import { X } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface Props {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
      {/* Overlay click để đóng */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Modal content */}
      <div className="relative z-10 max-w-2xl w-full max-h-[90vh] rounded-[2rem_1.5rem_2.5rem_2rem] overflow-hidden shadow-xl bg-[#f5f5dc] animate-zoomFadeIn border border-[#cbb799]">
        {/* Glow border layer */}
        <div className="absolute inset-0 pointer-events-none animate-borderGlow opacity-10 rounded-[2rem_1.5rem_2.5rem_2rem] z-0" />

        {/* Close button */}
        <div className="absolute z-50 top-4 right-4 z-10">
          <button
            type="button"
            onClick={onClose}
            className="text-[#6f4d38] hover:text-[#3d211a] transition-transform transform hover:scale-110 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="relative z-10 p-6 overflow-y-auto max-h-[90vh] scroll-smooth scroll-hide">
          {service.image && (
            <div className="overflow-hidden rounded-[1.5rem] mb-4">
              <img
                loading="lazy"
                src={urlFor(service.image)
                  .width(700)
                  .auto("format")
                  .fit("crop")
                  .url()}
                alt={service.title}
                className="w-full object-cover transition-all duration-300 hover:brightness-105"
              />
            </div>
          )}

          <h3 className="text-2xl font-bold text-[#a07856] mb-3">
            {service.title}
          </h3>

          <p className="text-[#3d211a] whitespace-pre-line leading-relaxed mb-4">
            {service.description}
          </p>

          <p className="text-[#a07856] font-semibold text-lg">
            {service.priceText || `${service.price} €`}
          </p>
        </div>
      </div>

      <style jsx>{`
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        @keyframes zoomFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes borderGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(160, 120, 86, 0.2);
          }
          50% {
            box-shadow: 0 0 30px 5px rgba(160, 120, 86, 0.2);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(160, 120, 86, 0.2);
          }
        }

        .animate-zoomFadeIn {
          animation: zoomFadeIn 0.35s ease-out forwards;
        }

        .animate-borderGlow {
          animation: borderGlow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
