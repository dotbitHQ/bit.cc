module.exports = {
  scan: {
    input: [
      './src/**/*.{js,ts,vue}',
      '!./src/static/**',
    ],
    output: './src/locales/raw',
  },
  clean: {
    input: './src/locales/raw',
    output: './src/locales',
  },
  translate: {
    input: './src/locales/translation',
    output: './src/locales/raw',
    langs: ['en'],
  },
  diff: {
    input: './src/locales/raw',
    output: './src/locales/diff',
    langs: ['en'],
  },
}
