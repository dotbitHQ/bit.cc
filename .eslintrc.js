module.exports = {
  root: true,
  extends: [
    'blockabc/nuxt-ts'
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/prefer-nullish-coalescing': [0],
  },
}
