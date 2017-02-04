if (process.NODE_ENV === 'development') {
  module.exports = require('./webpack/webpack.config.dev.js');
} else {
  module.exports = require('./webpack/webpack.config.prod.js');
}
