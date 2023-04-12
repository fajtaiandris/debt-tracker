// eslint-disable-next-line
module.exports = {
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 120,
  bracketSpacing: true,
  arrowParens: 'always',
  importOrder: ['^[@/(.*)|a-z|A-Z|0-9]$', '^@queries', '^@interfaces', '^@components', '^@hooks', '^[../]', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('prettier-plugin-tailwindcss')],
};
