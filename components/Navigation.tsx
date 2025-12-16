'use client'

import Link from 'next/link'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartSheet } from '@/components/CartSheet'
import { TransitionLink } from '@/components/TransitionLink'

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isMobileMenuOpen])

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

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  // Animation variants
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut' as const,
      },
    },
  }

  const containerVariants = {
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  }

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 30,
      transition: {
        duration: 0.2,
        ease: 'easeIn' as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  }

  const lineVariants = {
    closed: {
      scaleX: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut' as const,
      },
    },
    open: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: 'easeOut' as const,
      },
    },
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          alwaysVisible || isVisible ? 'top-0' : '-top-32'
        } ${hasBackground ? 'bg-neutral-900/85 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
          <div className="flex items-center justify-between">
            <TransitionLink href="/" className="group relative z-50">
              <div className="flex flex-col">
                <span className={`text-lg md:text-xl font-serif font-light tracking-wider transition-colors ${
                  isMobileMenuOpen ? 'text-white' : 'group-hover:text-primary'
                }`}>
                  FLO RD
                </span>
                <span className={`text-[9px] md:text-[10px] tracking-[0.3em] uppercase transition-colors ${
                  isMobileMenuOpen ? 'text-white/60' : 'text-muted-foreground'
                }`}>
                  Coutellerie
                </span>
              </div>
            </TransitionLink>

            {/* Desktop Navigation - Hidden by default, shown on md+ */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                </TransitionLink>
              ))}
              <CartSheet />
            </div>

            {/* Mobile Controls - Shown by default, hidden on md+ */}
            <div className="flex items-center gap-2 md:hidden relative z-50">
              <div className={isMobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}>
                <CartSheet />
              </div>
              <button
                onClick={toggleMenu}
                className="relative flex h-12 w-12 items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-controls={mobileMenuId}
                aria-expanded={isMobileMenuOpen}
                type="button"
              >
                <span className="sr-only">Menu</span>
                <div className="relative w-6 h-5 flex flex-col justify-center">
                  <span
                    className={`absolute block h-[2px] w-6 bg-current transition-all duration-300 ease-out ${
                      isMobileMenuOpen 
                        ? 'translate-y-0 rotate-45 bg-white' 
                        : '-translate-y-[6px]'
                    }`}
                  />
                  <span
                    className={`absolute block h-[2px] bg-current transition-all duration-200 ${
                      isMobileMenuOpen 
                        ? 'w-0 opacity-0' 
                        : 'w-4 opacity-100'
                    }`}
                  />
                  <span
                    className={`absolute block h-[2px] w-6 bg-current transition-all duration-300 ease-out ${
                      isMobileMenuOpen 
                        ? 'translate-y-0 -rotate-45 bg-white' 
                        : 'translate-y-[6px]'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id={mobileMenuId}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-30 md:hidden"
            aria-modal="true"
            role="dialog"
            aria-label="Menu de navigation"
          >
            {/* Backdrop with blur */}
            <motion.div 
              className="absolute inset-0 bg-neutral-950/98 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent pointer-events-none" />

            {/* Menu Content */}
            <div className="relative flex h-full flex-col justify-between px-6 pt-24 pb-10 overflow-y-auto">
              {/* Navigation Links */}
              <motion.nav
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col items-start gap-1"
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    variants={linkVariants}
                    className="w-full"
                  >
                    <TransitionLink
                      href={link.href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between py-4 w-full"
                    >
                      <span className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide transition-colors duration-200 group-hover:text-amber-400 group-active:text-amber-500">
                        {link.label}
                      </span>
                      <span className="text-sm text-white/30 font-mono transition-colors duration-200 group-hover:text-amber-400/50">
                        0{index + 1}
                      </span>
                    </TransitionLink>
                    {index < navLinks.length - 1 && (
                      <motion.div
                        variants={lineVariants}
                        className="h-[1px] w-full bg-white/10 origin-left"
                      />
                    )}
                  </motion.div>
                ))}
              </motion.nav>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="space-y-6"
              >
                {/* Separator */}
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Contact Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-white/50">
                  <a 
                    href="mailto:floribadeaudumas@gmail.com" 
                    className="text-sm hover:text-white transition-colors"
                  >
                    floribadeaudumas@gmail.com
                  </a>
                  <span className="text-xs uppercase tracking-[0.3em]">
                    Atelier sur-mesure
                  </span>
                </div>

                {/* Branding */}
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.4em] text-white/30">
                    Flo RD Coutellerie
                  </span>
                  <span className="text-xs text-white/30">
                    © {new Date().getFullYear()}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
