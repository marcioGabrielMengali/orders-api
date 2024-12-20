export default [
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-unused-vars': [
        'error',
        { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
      ],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      'newline-per-chained-call': [
        'error',
        {
          ignoreChainWithDepth: 1,
        },
      ],
    },
    languageOptions: {
      parser: ESLint,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
]
