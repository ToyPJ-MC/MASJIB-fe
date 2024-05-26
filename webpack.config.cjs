const { join, resolve: _resolve } = require('path');
const { config } = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { DefinePlugin } = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

config();

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: join(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/'
  },
  resolve: {
    plugins: [new TsConfigPathsPlugin()],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: ['@babel/plugin-transform-runtime']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      },
      // css loader 설정
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        exclude: /node_modules/
      },
      // image loader 설정
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: _resolve(__dirname, 'dist')
    },
    proxy: {
      '/v2/search/image': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true
      },
      '/v2/local/geo/coord2address.json': {
        target: 'https://dapi.kakao.com',
        changeOrigin: true
      }
    },
    port: 3000
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: _resolve(__dirname, './index.html'),
      env: process.env
    }),
    new ForkTsCheckerWebpackPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new TsConfigPathsPlugin({
      configFile: './tsconfig.json'
    }),
    new DefinePlugin({
      'process.env.KAKAO_KEY': JSON.stringify(process.env.KAKAO_KEY),
      'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
      'process.env.KAKAO_RESTAPI_KEY': JSON.stringify(
        process.env.KAKAO_RESTAPI_KEY
      ),
      'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL)
    })
  ]
};
