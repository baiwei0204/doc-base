const merge = require('webpack-merge')
const defaultConfig = rquire('./webpack.base.config')

module.exports = merge(defaultConfig,{
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot:true,
    port:3000
  }
})
