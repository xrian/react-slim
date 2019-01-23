const path = require('path');
const {
  override,
  addWebpackAlias,
  addLessLoader,
  addBabelPlugins,
  addBabelPresets,
} = require('customize-cra');
const babel = require('./babel.config');

module.exports = {
  webpack: override(
    ...addBabelPresets(...babel.presets),
    ...addBabelPlugins(...babel.plugins),
    addWebpackAlias({
      src: path.resolve(__dirname, 'src'),
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#1DA57A' },
    }),
  ),
};
