'use client';

import Link from 'next/link';
import { useMobileMenu } from '@/hooks/use-mobile-menu';

export function Header() {
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-md bg-black/80 border-b-2 border-cyan-600 border-foreground/10">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold tracking-tighter z-50">
          <Link href="/" onClick={closeMenu}>
            Retrôvisionários
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-50 p-2"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-sm font-bold hover:text-foreground/80 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/agenda"
            className="text-sm font-bold hover:text-foreground/80 transition-colors"
          >
            Agenda
          </Link>
        </nav>

        {/* Mobile Overlay Navigation */}
        {isMenuOpen && (
          <nav className="fixed inset-0 backdrop-blur-md bg-black/90 flex flex-col items-center justify-center gap-8 md:hidden h-screen w-screen z-40">
            <Link
              href="/"
              onClick={closeMenu}
              className="text-2xl font-bold hover:text-foreground/80 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/agenda"
              onClick={closeMenu}
              className="text-2xl font-bold hover:text-foreground/80 transition-colors"
            >
              Agenda
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
