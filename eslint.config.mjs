import next from 'eslint-config-next/core-web-vitals'
import prettierConfig from 'eslint-config-prettier'

const config = [
  {
    ignores: [
      '**/node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'public/assets/**',
      'pnpm-lock.yaml',
    ],
  },
  ...next,
  {
    rules: {
      'no-console': ['warn', { allow: ['info', 'warn', 'error'] }],
      'prefer-const': 'error',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
  prettierConfig,
]

export default config
