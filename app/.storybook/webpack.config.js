// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
// load the default config generator.
const myConfig = require('../webpack.config.js')('development');
const path = require('path');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const webpack = require('webpack');

module.exports = (config) => {
  // Extend it as you need.
  config.resolve = myConfig.resolve;
  config.module.rules.push(...myConfig.module.rules);
  config.module.rules.push({
    test: /\.json$/,
    loader: 'json-loader',
  });
  config.devtool = 'source-map';
  config.module.rules.forEach((rule) => { rule.include = path.resolve(__dirname, '../'); });
  config.module.rules.forEach((rule) => { rule.exclude = path.resolve(__dirname, '../node_modules'); });
  config.resolve.extensions.push('.json');
  config.externals = {
    jsdom: 'window',
    // cheerio: 'window', https://github.com/producthunt/chai-enzyme/issues/46
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react/addons': true,
  };
  // this is used by our custome `rr.js` module
  config.resolve.alias['react-router-original'] = require.resolve('react-router');
  // this `rr.js` will replace the Link with a our own mock component.
  config.resolve.alias['react-router'] = require.resolve('./rr.js');
  // For example, add typescript loader:
  return config;
};

