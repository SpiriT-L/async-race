module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  'eslint.options': {
    ignorePattern: 'webpack.config.js',
  },
  plugins: ['@typescript-eslint'],
  rules: {},
};
