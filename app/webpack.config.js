const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const cssnano = require('cssnano');
const webpack = require('webpack');
const createMinifier = require("css-loader-minify-class");

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    localIdentName: '[path][name]__[local]--[hash:base64:5]',
    camelCase: true,
    ignore: '/node_modules/',
  },
};

const commonConfig = {
  entry: {
    src: './src/index.js',
  },
  resolve: {
    alias: {
      // react: 'preact-compat',
      // 'react-dom': 'preact-compat',
      // 'create-react-class': 'preact-compat/lib/create-react-class',
      Components: path.resolve(__dirname, './src/components/'),
      Containers: path.resolve(__dirname, './src/containers/'),
      Utils: path.resolve(__dirname, './src/utils/'),
      Paginas: path.resolve(__dirname, './src/paginas/'),
      Assets: path.resolve(__dirname, './assets/'),
      Data: path.resolve(__dirname, './src/data/'),
    },
    extensions: ['.jsx', '.js', '.json', '.styl', '.css'],
  },
  output: {
    path: PATHS.dist,
    filename: 'bundle[hash].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.(jpe?g|png)$/i,
      loaders: [
        'url-loader?limit=10000!?name=./[hash].[ext]',
        //'webp-loader',
      ],
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&minetype=application/font-woff',
    },
    {
      test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    }],
  },
  plugins: [
  
  ],
};

const productionConfig = () => {
  // Adds ClassName Minifier
  cssLoader.options.minimize = true;
  cssLoader.options.getLocalIdent = createMinifier();
  const rules = [{
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: ['css-loader', 'style-loader'],
    }),
  }, {
    test: /\.styl$/,
    use: ExtractTextPlugin.extract({
      use: [cssLoader, 'stylus-loader'],
    }),
  }];
  const productionPlugins = [
    new webpack.DefinePlugin({ 
      'process.env': { NODE_ENV: "'production'" },
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
    }),
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
      'sass-loader',
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
  const developmentPlugins = [
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
  ];
  commonConfig.module.rules.push(...rules);
  commonConfig.plugins.push(...developmentPlugins);
  commonConfig.devtool = 'source-map';
  const config = {
    devServer: {
      historyApiFallback: true,
      quiet: true,
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
  console.log(env)
  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
};
