const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssnano = require('cssnano');

const PATHS = {
  src: path.resolve(__dirname, './src'),
  dist: path.resolve(__dirname, './dist'),
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    camelCase: true,
    ignore: '/node_modules/',
    url: false,
  },
};

const commonConfig = {
  entry: {
    src: PATHS.src,
  },
  resolve: {
    alias: {
      // react: 'preact-compat',
      // 'react-dom': 'preact-compat',
      Components: path.resolve(__dirname, 'src/components/'),
      Containers: path.resolve(__dirname, 'src/containers/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
      Config: path.resolve(__dirname, 'src/config/'),
      Actions: path.resolve(__dirname, 'src/redux/actions/'),
      Reducers: path.resolve(__dirname, 'src/redux/reducers/'),
      Assets: path.resolve(__dirname, 'src/assets/'),
      Store: path.resolve(__dirname, 'src/redux/store.js'),
      Globals: path.resolve(__dirname, 'src/globals/'),
    },
    extensions: ['.jsx', '.js', '.scss'],
  },
  output: {
    path: PATHS.dist,
    filename: '[name][hash:8].js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015', 'react'],
        },
      },
    }, {
      test: /\.(jpe?g|png)$/i,
      loaders: [
        'url-loader?limit=1000!?name=./[hash].[ext]',
        // 'webp-loader', // Still not supported by all browsers
      ],
      exclude: /(node_modules|bower_components)/,
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=1000&mimetype=application/font-woff',
    },
    {
      test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=1000&mimetype=application/font-woff',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      title: 'Webpack Project',
      appMountId: 'app',
      mobile: true,
      links: [
        'https://fonts.googleapis.com/css?family=Roboto+Condensed:300',
        {
          href: 'manifest',
          rel: '/manifest.json',
        },
      ],
      meta: [
        {
          name: 'description',
          content: 'Add Description.',
        }, {
          name: 'keywords',
          content: 'Add keywords here.',
        }, {
          name: 'theme-color',
          content: '#c50c3f',
        },
      ],
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};

const productionConfig = () => {
  const rules = [{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  }, {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [cssLoader, 'stylus-loader'],
    }),
  }, {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [cssLoader, 'sass-loader'],
    }),
  }];

  const productionPlugins = [
    new ExtractTextPlugin('styles.css'),
    new CleanWebpackPlugin(PATHS.dist),
    new BabiliPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
        safe: true,
      },
      canPrint: false,
    }),
  ];
  commonConfig.module.rules.push(...rules);
  commonConfig.plugins.push(...productionPlugins);
  return Object.assign(
    {},
    commonConfig);
};

const developmentConfig = () => {
  const rules = [{
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader',
    ],
  }, {
    test: /\.styl$/,
    use: [
      'style-loader',
      cssLoader,
      'stylus-loader',
    ],
  }, {
    test: /\.scss$/,
    use: [
      'style-loader',
      cssLoader,
      'sass-loader',
    ],
  }];
  commonConfig.module.rules.push(...rules);
  const config = {
    devServer: {
      historyApiFallback: true,
      quiet: true,
      disableHostCheck: true,
      host: process.env.HOST || '0.0.0.0', // Defaults to `localhost`
      port: process.env.DEV_PORT || 8080, // Defaults to 8080
    },
  };
  return Object.assign(
    {},
    commonConfig,
    config);
};


module.exports = (env) => {
  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
};
