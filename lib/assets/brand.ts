const BRAND_BASE = '/media/brand'
const LOGO_BASE = `${BRAND_BASE}/logos`

export const brandAssets = {
  logos: {
    darkSmall: `${LOGO_BASE}/logo-noir-petit.svg`,
    darkLarge: `${LOGO_BASE}/logo-noir-grand.svg`,
    lightSmall: `${LOGO_BASE}/logo-clair-petit.svg`,
    lightLarge: `${LOGO_BASE}/logo-clair-grand.svg`,
  },
  apple: {
    icon: `${BRAND_BASE}/apple/flo.png`,
  },
} as const
