const isDev = process.env.NODE_ENV === 'development'
const isTestData = process.env.DATA_ENV === 'test' || isDev

module.exports = {
  port: process.env.PORT || 10000,
  isTestData,
  isDev,
}
