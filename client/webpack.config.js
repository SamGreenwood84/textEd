const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      title: 'J.A.T.E.',
    }),
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Just Another Text Editor',
      short_name: 'J.A.T.E.',
      description: 'Edit your text files with ease!',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      id: '/',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve(__dirname, 'src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: './src-sw.js', // Adjusted path to the service worker file
      swDest: 'src-sw.js',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
    ],
  },
};
