module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'settings': {
    'import/resolver': {
      alias: [
        ['src', './src'],
      ],
    },
  },
  'env': {
    'browser': true,
    'node': true,
  },
  'rules': {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'react/prop-types': [0],
  },
};
