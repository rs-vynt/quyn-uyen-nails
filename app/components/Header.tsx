"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  Menu,
  X,
  Image as ImageIcon,
  Phone,
  CalendarCheck,
  Hand,
  Footprints,
  Sparkles,
  Paintbrush2,
} from "lucide-react";

export default function Header() {
  const [data, setData] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    client
      .fetch(`*[_type == "settings"][0]{storeName, logo, bookingUrl}`)
      .then(setData);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  useEffect(() => {
    if (pathname !== "/") {
      setShowFloatingButton(true);
      return;
    }

    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  if (!data) return null;

  const navItems = [
    { label: "Diensten", href: "/services", icon: Sparkles },
    { label: "Galerij", href: "/gallery", icon: ImageIcon },
    { label: "Contact", href: "#contact", icon: Phone },
  ];

  const extraItems = [
    { label: "Handen", href: "/handen", icon: Hand },
    { label: "Voeten", href: "/voeten", icon: Footprints },
    { label: "Design", href: "/design", icon: Paintbrush2 },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#ECE2D0]/90 backdrop-blur-md shadow-sm border-b border-[#CBB799] transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            {data.logo ? (
              <img
                src={urlFor(data.logo).width(100).url()}
                alt={data.storeName}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-2xl font-serif font-semibold text-[#3D211A] tracking-wide hover:text-[#6F4D38] transition">
                {data.storeName}
              </span>
            )}
          </Link>

          <nav className="hidden md:flex items-center space-x-8 text-base font-semibold tracking-wide">
            <div className="flex space-x-6 pr-8 border-r border-[#CBB799] mr-4">
              {extraItems.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`group relative inline-block px-1 transition-colors duration-300 ease-in-out ${
                      isActive ? "text-[#A07856]" : "text-[#3D211A] hover:text-[#6F4D38]"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute left-1/3 -bottom-1 h-[2px] bg-[#A07856] rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                        isActive ? "w-[60%]" : "w-0 group-hover:w-[60%]"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex space-x-8">
              {navItems.map(({ label, href }) => {
                const isHash = href.startsWith("#");
                const isActive = isHash
                  ? pathname === "/" && currentHash === href
                  : pathname === href;

                return (
                  <Link
                    key={label}
                    href={href}
                    className={`group relative inline-block px-1 transition-colors duration-300 ease-in-out ${
                      isActive ? "text-[#A07856]" : "text-[#3D211A] hover:text-[#6F4D38]"
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute left-1/3 -bottom-1 h-[2px] bg-[#A07856] rounded-full transition-all duration-300 transform -translate-x-1/2 ${
                        isActive ? "w-[60%]" : "w-0 group-hover:w-[60%]"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#3D211A] p-2 -m-2 transition-transform duration-200 hover:scale-110"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4">
            <div className="mobile-menu animate-fadeInScale bg-[#ECE2D0]/90 backdrop-blur-xl border border-[#CBB799] rounded-2xl shadow-lg p-4 text-base font-semibold text-[#3D211A] tracking-wide space-y-1">
              {extraItems.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#CBB799]/20 hover:text-[#6F4D38] transition"
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{label}</span>
                </Link>
              ))}
              <div className="my-2 border-t border-[#CBB799]" />
              {navItems.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#CBB799]/20 hover:text-[#6F4D38] transition"
                >
                  <Icon size={18} className="shrink-0" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {data.bookingUrl && showFloatingButton && (
        <a
          href={data.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#ECE2D0]/90 backdrop-blur-sm text-[#3D211A] hover:text-[#6F4D38] hover:shadow-md border border-[#CBB799] text-sm px-4 py-2 rounded-full transition-all duration-300 animate-fadeIn"
        >
          <CalendarCheck size={16} />
          <span>Afspraak</span>
        </a>
      )}

      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fadeInScale {
          animation: fadeInScale 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
}
