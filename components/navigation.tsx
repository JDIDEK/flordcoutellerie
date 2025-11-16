'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Toujours visible en haut de page (100px)
      if (currentScrollY < 100) {
        setIsVisible(true)
      } else {
        // Disparaît en scrollant vers le bas, apparaît en scrollant vers le haut
        if (currentScrollY > lastScrollY) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      }
      
      setLastScrollY(currentScrollY)
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
  }, [lastScrollY])

  const navLinks = [
    { href: '/pieces', label: 'Pièces' },
    { href: '/sur-mesure', label: 'Sur Mesure' },
    { href: '/works', label: 'Works' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/about', label: 'Atelier' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav 
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out bg-transparent ${
        isVisible ? 'top-0' : '-top-32'
      }`}
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="group">
            <div className="flex flex-col">
              <span className="text-xl font-serif font-light tracking-wider group-hover:text-primary transition-colors">
                FLO RD
              </span>
              <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                Coutellerie
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-6 pb-4 border-t border-border mt-6">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
