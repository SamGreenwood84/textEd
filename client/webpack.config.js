const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production', // Change mode to 'production'
  entry: {
    main: './client/src/js/index.js',
    install: './client/src/js/install.js',
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
          src: path.resolve(__dirname, 'client/src/images/logo.png'), // Corrected image path
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
    new InjectManifest({
      swSrc: './client/src/js/src-sw.js', 
      swDest: 'src-sw.js', // Update to the desired location
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
