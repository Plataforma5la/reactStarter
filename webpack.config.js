const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
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
  ],
};

const productionConfig = () => commonConfig;

const developmentConfig = () => {
  const config = {
    devServer: {
      historyApiFallback: true,
      stats: 'errors-only',
      host: process.env.HOST || 'localhost', // Defaults to `localhost`
      port: process.env.PORT || 8080, // Defaults to 8080
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
