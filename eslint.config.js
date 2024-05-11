import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      'coverage',
      'node_modules',
      'dist',
      'jest.config.cjs',
      '**/*.test.*',
      '**/*.skip.*',
      '**/*.js',
    ]
  },
  {
    rules: {
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
      '@typescript-eslint/explicit-function-return-type': ['error', { 'allowExpressions': true }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  }
);
