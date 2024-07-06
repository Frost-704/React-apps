module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','*.json','*.css', '*.scss'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-compiler','prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    "react-compiler/react-compiler": "error",
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
  },
}
