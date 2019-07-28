const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
  by defualt, the css as inline style build in js file.
  use ExtractTextWebpackPlugin in order to extract the css file.
  if use this plugin, there is no anymore the 'style-loader'
*/
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')


module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: 'scripts/[name].[hash].js'
  },
  module : {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/,
        include: path.resolve('src', 'styles'),
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use:[
            {loader: 'css-loader'},
            {loader: 'postcss-loader'},
            {loader: 'sass-loader'}
          ]
        })
      },
      {
         test: /\.(jpe?g|png|gif)$/,
         use: [
             {
                 loader: 'url-loader',
                 options: {
                     limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                     outputPath: 'images/'   // 图片打包后存放的目录
                 }
             }
         ]
     },
     {
          test: /\.(htm|html)$/,
          use: 'html-withimg-loader'
      },
      {
          test: /\.(eot|ttf|woff|svg)$/,
          use: 'file-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets:['@babel/preset-env','@babel/preset-react'],
              plugins: ['@babel/transform-runtime']
            }
          },
          {
            loader: 'eslint-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templage: './src/index.html',
      chunks:['vendors', 'index'],
      hash: true
    }),
    new ExtractTextWebpackPlugin("css/styles.css"),
    require('autoprefixer')({
            "browsers": [
                "defaults",
                "not ie < 11",
                "last 2 versions",
                "> 1%",
                "iOS 7",
                "last 3 iOS versions"
            ]
        })

  ],
  resolve:{
    alias: {

    },
    extensions: ['.js','.jsx','.json','.css','.scss','.sass','.ts','.coffee']
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
          vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
          },
          default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
          }
      }
    }
  }

};
