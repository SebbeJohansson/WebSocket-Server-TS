/* eslint-env node */
module.exports = {
  extends: [
    'plugin:@stylistic/recommended-extends',
  ],
  plugins: [
    '@typescript-eslint',
    '@stylistic',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@stylistic/semi': ['error', 'always'],
  },
  root: true,
};
