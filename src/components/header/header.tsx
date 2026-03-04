'use client';

import { useMobileMenu } from '@/hooks/use-mobile-menu';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinkBase =
  'text-slate-700 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest';

export function Header() {
  const pathname = usePathname();
  const { isMenuOpen, toggleMenu, closeMenu } = useMobileMenu();

  function handleWhatsAppClick() {
    const phoneNumber = '5513988191545';
    const message =
      'Olá vim pelo site da banda retrovisionarios e queria saber mais sobre o trabalho de vocês';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    closeMenu();
    window.open(url, '_blank');
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-vintage-teal/10 px-6 md:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between whitespace-nowrap">
        <div className="flex w-full justify-between items-center gap-3">
          {/* Mobile Overlay Navigation */}
          {isMenuOpen && (
            <nav className="fixed inset-0 bg-cream/90 backdrop-blur-md border-b flex flex-col items-center justify-center gap-8 md:hidden h-screen w-screen z-40">
              <Link
                className={clsx(
                  navLinkBase,
                  pathname === '/' ? 'border-b-2 border-muted-orange' : ''
                )}
                href="/"
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                className={clsx(
                  navLinkBase,
                  pathname === '/agenda' ? 'border-b-2 border-muted-orange' : ''
                )}
                href="/agenda"
                onClick={closeMenu}
              >
                Agenda
              </Link>
              <Link
                className={clsx(
                  navLinkBase,
                  pathname === '/musicas'
                    ? 'border-b-2 border-muted-orange'
                    : ''
                )}
                href="/musicas"
                onClick={closeMenu}
              >
                Músicas
              </Link>
              <div className="flex items-center gap-4">
                <button
                  className="min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-muted-orange text-white text-sm font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-muted-orange/20"
                  onClick={handleWhatsAppClick}
                >
                  Contato
                </button>
              </div>
            </nav>
          )}

          <Link href="/">
            <h2 className="text-vintage-teal text-2xl font-bold tracking-tight uppercase">
              Retrovisionarios
            </h2>
          </Link>

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
        </div>

        <div className="flex flex-row gap-10">
          <nav className="hidden md:flex items-center gap-10">
            <Link
              className={clsx(
                navLinkBase,
                pathname === '/' ? 'border-b-2 border-muted-orange' : ''
              )}
              href="/"
            >
              Home
            </Link>
            <Link
              className={clsx(
                navLinkBase,
                pathname === '/agenda' ? 'border-b-2 border-muted-orange' : ''
              )}
              href="/agenda"
            >
              Agenda
            </Link>
            <Link
              className={clsx(
                navLinkBase,
                pathname === '/musicas' ? 'border-b-2 border-muted-orange' : ''
              )}
              href="/musicas"
            >
              Músicas
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button
              className="hidden sm:flex min-w-[120px] cursor-pointer items-center justify-center rounded-full h-10 px-5 bg-muted-orange text-white text-sm font-bold uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-muted-orange/20"
              onClick={handleWhatsAppClick}
            >
              Contato
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
