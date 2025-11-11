'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image
              src="/images/logoklein.jpeg"
              alt="Praxis Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-[#2c5f7c]" style={{fontFamily: "'Playfair Display', serif"}}>
                Praxis für Gefäßmedizin
              </div>
              <div className="text-sm text-gray-600">
                Remscheid
              </div>
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/philosophie"
              className={`text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium ${
                isActive('/philosophie') ? 'text-[#2c5f7c] border-b-2 border-[#2c5f7c]' : ''
              }`}
            >
              Philosophie
            </Link>
            <Link
              href="/leistungen"
              className={`text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium ${
                isActive('/leistungen') ? 'text-[#2c5f7c] border-b-2 border-[#2c5f7c]' : ''
              }`}
            >
              Leistungen
            </Link>
            <Link
              href="/kontakt"
              className={`text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium ${
                isActive('/kontakt') ? 'text-[#2c5f7c] border-b-2 border-[#2c5f7c]' : ''
              }`}
            >
              Kontakt
            </Link>
            <Link
              href="/auth/login"
              className="text-gray-700 hover:text-[#2c5f7c] transition-colors font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
