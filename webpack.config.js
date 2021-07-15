// Just a dummy file to teach webstorm how to resolve "~/xxx/yyy"
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    }
  }
}
