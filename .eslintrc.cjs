module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector:
          'MemberExpression[object.name="styles"][property.type="Literal"]',
        message: '请使用styles.propertyName而不是styles["property-name"]的写法',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off', // 使用TypeScript，不需要prop-types
    '@typescript-eslint/no-explicit-any': 'warn', // 降低any类型的严格程度
    'react/no-unescaped-entities': 'off', // 允许在JSX中使用引号
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // 允许以_开头的未使用变量
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
