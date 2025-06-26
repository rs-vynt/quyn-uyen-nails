"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import Header from "./Header";

interface AuthWrapperProps {
  children: ReactNode;
}

export default function Wrapper({ children }: AuthWrapperProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <main className="bg-[#fffaf9] text-gray-800">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
