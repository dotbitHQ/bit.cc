const isDev = process.env.NODE_ENV === 'development'
const isTestData = process.env.DATA_ENV === 'test' || isDev

module.exports = {
  port: process.env.PORT || 3000,
  isTestData,
  isDev,
}
