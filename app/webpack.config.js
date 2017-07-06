const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
};

const commonConfig = {
  entry: {
    src: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Project',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
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
  if (env === 'production') {
    return productionConfig();
  }
  return developmentConfig();
};
