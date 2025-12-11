'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { CartSheet } from '@/components/cart-sheet'

interface NavigationProps {
  alwaysVisible?: boolean
}

export function Navigation({ alwaysVisible = false }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasBackground, setHasBackground] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuId = 'primary-mobile-menu'

  useEffect(() => {
    if (alwaysVisible) {
      return
    }

    const isMobile = window.innerWidth < 768

    // Sur mobile, toujours visible
    if (isMobile) {
      setIsVisible(true)
      return
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current
      const delta = currentScrollY - lastScrollY
      const DIRECTION_THRESHOLD = 12

      // Toujours visible proche du sommet
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else if (Math.abs(delta) > DIRECTION_THRESHOLD) {
        setIsVisible(delta < 0)
      }

      lastScrollYRef.current = currentScrollY
    }
    
    // Throttle pour optimiser les performances
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [alwaysVisible])

  useEffect(() => {
    const findTarget = () => document.querySelector<HTMLElement>('[data-nav-background-trigger]')
    let currentTarget = findTarget()
    if (!currentTarget) return

    const updateBackground = () => {
      if (!currentTarget || !currentTarget.isConnected) {
        currentTarget = findTarget()
      }
      if (!currentTarget) return

      const navHeight = navRef.current?.offsetHeight ?? 0
      const triggerTop = currentTarget.getBoundingClientRect().top + window.scrollY
      setHasBackground(window.scrollY + navHeight >= triggerTop)
    }

    updateBackground()
    window.addEventListener('scroll', updateBackground, { passive: true })
    window.addEventListener('resize', updateBackground)

    return () => {
      window.removeEventListener('scroll', updateBackground)
      window.removeEventListener('resize', updateBackground)
    }
  }, [])

  const navLinks = [
    { href: '/pieces', label: 'Pièces' },
    { href: '/sur-mesure', label: 'Sur Mesure' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/atelier', label: 'Atelier' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav
      ref={navRef}
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
        alwaysVisible || isVisible ? 'top-0' : '-top-32'
      } ${hasBackground ? 'bg-neutral-900/85 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}
      aria-label="Navigation principale"
    >
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-serif font-light tracking-wider group-hover:text-primary transition-colors">
                FLO RD
              </span>
              <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Coutellerie
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden by default, shown on md+ */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <CartSheet />
          </div>

          {/* Mobile Controls - Shown by default, hidden on md+ */}
          <div className="flex items-center gap-3 md:hidden">
            <CartSheet />
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="relative flex h-12 w-12 items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Basculer le menu"
              aria-controls={mobileMenuId}
              aria-expanded={isMobileMenuOpen}
              type="button"
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-2'
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-2'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          id={mobileMenuId}
          aria-hidden={!isMobileMenuOpen}
          className={`
            fixed inset-0 z-50 bg-black text-white transition-opacity duration-300 ease-out md:hidden
            ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
        >
          <div className="flex h-full flex-col px-6 py-8">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.35em] text-white/60">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative flex h-12 w-12 items-center justify-center"
                aria-label="Fermer le menu"
                type="button"
              >
                <span className="absolute block h-0.5 w-6 -rotate-45 bg-current" />
                <span className="absolute block h-0.5 w-6 rotate-45 bg-current" />
              </button>
            </div>

            <div className="mt-12 flex flex-1 flex-col items-center justify-center gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-light uppercase tracking-[0.4em] text-white transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-8 text-center text-xs uppercase tracking-[0.4em] text-white/60">
              Flo RD Coutellerie — Atelier sur-mesure
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
