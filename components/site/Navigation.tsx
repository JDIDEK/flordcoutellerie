'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CartSheet } from '@/components/CartSheet'
import { brandAssets } from '@/lib/assets/brand'
import { ThemeToggle } from './ThemeToggle'
import { TransitionLink } from './TransitionLink'

interface NavigationProps {
  alwaysVisible?: boolean
}

export function Navigation({ alwaysVisible = false }: NavigationProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hasBackground, setHasBackground] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuId = 'primary-mobile-menu'
  const isHomePage = pathname === '/'
  const useHomeHeroPalette = isHomePage && !hasBackground
  const useMobileHeroPalette = useHomeHeroPalette && !isMobileMenuOpen

  const desktopLinkClassName = useHomeHeroPalette
    ? 'text-lg font-medium tracking-wide text-white hover:text-neutral-300 transition-colors relative group'
    : 'text-lg font-medium tracking-wide text-foreground hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors relative group'
  const desktopLinkUnderlineClassName = useHomeHeroPalette
    ? 'absolute -bottom-1 left-0 w-0 h-[1px] bg-neutral-400 group-hover:w-full transition-all duration-300'
    : 'absolute -bottom-1 left-0 w-0 h-[1px] bg-neutral-600 dark:bg-neutral-400 group-hover:w-full transition-all duration-300'
  const actionClassName = useHomeHeroPalette
    ? 'text-white hover:text-neutral-300'
    : 'text-foreground hover:text-neutral-600 dark:hover:text-neutral-300'
  const mobileActionClassName = useMobileHeroPalette
    ? 'text-white hover:text-neutral-300'
    : 'text-foreground hover:text-neutral-600 dark:hover:text-neutral-300'
  const cartTriggerClassName = useHomeHeroPalette
    ? '!text-white hover:!text-neutral-300'
    : ''
  const mobileCartTriggerClassName = isHomePage
    ? '!text-white hover:!text-neutral-300'
    : cartTriggerClassName
  const mobileMenuBackdropClassName = useMobileHeroPalette
    ? 'absolute inset-0 bg-neutral-950/96 backdrop-blur-xl'
    : 'absolute inset-0 bg-background/98 backdrop-blur-xl'
  const mobileMenuGradientClassName = useMobileHeroPalette
    ? 'absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent pointer-events-none'
    : 'absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none'
  const mobileMenuLinkClassName = useMobileHeroPalette
    ? 'text-3xl sm:text-4xl font-serif font-light text-white tracking-wide transition-colors duration-200 group-hover:text-neutral-300'
    : 'text-3xl sm:text-4xl font-serif font-light text-foreground tracking-wide transition-colors duration-200 group-hover:text-neutral-500 dark:group-hover:text-neutral-300'
  const mobileMenuSeparatorClassName = useMobileHeroPalette
    ? 'h-[1px] w-full bg-white/10 origin-left'
    : 'h-[1px] w-full bg-foreground/10 origin-left'
  const mobileMenuFooterSeparatorClassName = useMobileHeroPalette
    ? 'h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent'
    : 'h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/20 to-transparent'
  const mobileMenuFooterTextClassName = useMobileHeroPalette
    ? 'text-xs uppercase tracking-[0.4em] text-white/50'
    : 'text-xs uppercase tracking-[0.4em] text-muted-foreground/50'

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

  // Close  on escape key
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

    const mobileQuery = window.matchMedia('(max-width: 767px)')

    const setupScroll = () => {
      if (mobileQuery.matches) {
        setIsVisible(true)
        return () => {}
      }

      const handleScroll = () => {
        const currentScrollY = window.scrollY
        const lastScrollY = lastScrollYRef.current
        const delta = currentScrollY - lastScrollY
        const DIRECTION_THRESHOLD = 12

        if (currentScrollY < 100) {
          setIsVisible(true)
        } else if (Math.abs(delta) > DIRECTION_THRESHOLD) {
          setIsVisible(delta < 0)
        }

        lastScrollYRef.current = currentScrollY
      }

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
    }

    let cleanupScroll = setupScroll()

    const handleMediaChange = () => {
      cleanupScroll()
      cleanupScroll = setupScroll()
    }

    mobileQuery.addEventListener('change', handleMediaChange)

    return () => {
      cleanupScroll()
      mobileQuery.removeEventListener('change', handleMediaChange)
    }
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
    { href: '/pieces', label: 'Pièces Disponibles' },
    { href: '/sur-mesure', label: 'Sur Mesure' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/formation', label: 'Formation' },
    { href: '/atelier', label: "L'atelier" },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

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
        } ${hasBackground ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4 py-4 md:px-6 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <TransitionLink href="/" className="group relative z-50">
              <div className="flex items-center gap-3">
                <div className="md:hidden flex items-center">
                  <Image
                    src={brandAssets.logos.darkSmall}
                    alt="Flo RD Coutellerie"
                    width={140}
                    height={60}
                    className={`${useMobileHeroPalette ? 'hidden' : 'block dark:hidden'} h-12 w-auto transition-opacity ${
                      isMobileMenuOpen ? 'opacity-70' : 'opacity-100 group-hover:opacity-50'
                    }`}
                  />
                  <Image
                    src={brandAssets.logos.lightSmall}
                    alt="Flo RD Coutellerie"
                    width={140}
                    height={60}
                    className={`${useMobileHeroPalette ? 'block' : 'hidden dark:block'} h-12 w-auto transition-opacity ${
                      isMobileMenuOpen ? 'opacity-90' : 'opacity-100 group-hover:opacity-50'
                    }`}
                  />
                </div>

                <div className="hidden md:flex items-center">
                  <Image
                    src={brandAssets.logos.darkSmall}
                    alt="Flo RD Coutellerie"
                    width={550}
                    height={236}
                    className={`${useHomeHeroPalette ? 'hidden' : 'block dark:hidden'} h-20 w-auto transition-opacity ${
                      isMobileMenuOpen ? 'opacity-70' : 'opacity-100 group-hover:opacity-50'
                    }`}
                  />
                  <Image
                    src={brandAssets.logos.lightSmall}
                    alt="Flo RD Coutellerie"
                    width={550}
                    height={236}
                    className={`${useHomeHeroPalette ? 'block' : 'hidden dark:block'} h-20 w-auto transition-opacity ${
                      isMobileMenuOpen ? 'opacity-90' : 'opacity-100 group-hover:opacity-50'
                    }`}
                  />
                </div>
              </div>
            </TransitionLink>

            {/* Desktop Navigation - Hidden by default, shown on md+ */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-6">
              {navLinks.map((link) => (
                <TransitionLink
                  key={link.href}
                  href={link.href}
                  className={desktopLinkClassName}
                >
                  {link.label}
                  <span className={desktopLinkUnderlineClassName} />
                </TransitionLink>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-6">
              <CartSheet triggerClassName={cartTriggerClassName} />
              <ThemeToggle />
            </div>

            {/* Mobile Controls - Shown by default, hidden on md+ */}
            <div className="flex items-center gap-3 md:hidden relative z-50">
              <div className={`flex shrink-0 items-center justify-center w-8 h-8 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}>
                <ThemeToggle />
              </div>
              <div className={`flex shrink-0 items-center justify-center w-8 h-8 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0 pointer-events-none hidden' : 'opacity-100'}`}>
                <CartSheet triggerClassName={`!h-8 !w-8 ${mobileCartTriggerClassName}`} />
              </div>
              <div className={`flex shrink-0 items-center justify-center w-8 h-8 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none hidden'}`}>
                <ThemeToggle />
              </div>
              <button
                onClick={toggleMenu}
                className={`relative flex shrink-0 h-8 w-8 items-center justify-center transition-colors ${mobileActionClassName}`}
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
                        ? 'translate-y-0 rotate-45 bg-foreground' 
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
                        ? 'translate-y-0 -rotate-45 bg-foreground' 
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
              className={mobileMenuBackdropClassName}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Decorative gradient */}
            <div className={mobileMenuGradientClassName} />

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
                      <span className={mobileMenuLinkClassName}>
                        {link.label}
                      </span>
                    </TransitionLink>
                    {index < navLinks.length - 1 && (
                      <motion.div
                        variants={lineVariants}
                        className={mobileMenuSeparatorClassName}
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
                <div className={mobileMenuFooterSeparatorClassName} />
                
                {/* Branding */}
                <div className="flex items-center justify-between">
                  <span className={mobileMenuFooterTextClassName}>
                    © Flo RD Coutellerie
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
