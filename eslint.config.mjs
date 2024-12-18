export default [
  {
    files: ['src/**/*.ts'],
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'never'],
      "newline-per-chained-call": [
        "error",
        {
          ignoreChainWithDepth: 1 
        }
      ]
    },
  },
]
