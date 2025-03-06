module.exports = {
  parser: '@typescript-eslint/parser',
  // Define the environment for the code
  env: {
    node: true, // Node.js global variables and Node.js scoping
    jest: true, // Jest global variables
  },
  // Specify the parser options
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module', // Allow the use of imports
  },
  // Extend recommended configurations
  extends: [
    'eslint:recommended', // Use the recommended rules from eslint
    'plugin:@typescript-eslint/recommended', // Use the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // TypeScript 타입 검사를 위한 추가 규칙
    'plugin:prettier/recommended', // Enable eslint-plugin-prettier and display prettier errors as ESLint errors
  ],
  // Define the plugins
  plugins: ['@typescript-eslint', 'prettier', 'eslint-plugin-import'],
  // Define the rules
  rules: {
    'prettier/prettier': 'error', // Prettier rules as ESLint errors
    '@typescript-eslint/no-unused-vars': ['warn'], // Ignore unused variables that start with _
    '@typescript-eslint/explicit-function-return-type': 'off', // Turn off explicit return type for functions
    '@typescript-eslint/no-explicit-any': 'warn', // Allow the use of 'any' type
    '@typescript-eslint/no-floating-promises': 'error', // 처리되지 않은 프로미스 오류로 처리

    // Import 관련 규칙 (가독성 및 유지보수성을 위한 규칙)
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
        'newlines-between': 'always', // 그룹 사이에 빈 줄 추가
      },
    ],
  },
};
