module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  // testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['js', 'vue', 'json', 'ts'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{vue,ts,js}',
  ],
  testEnvironment: 'jsdom',
}
