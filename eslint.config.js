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
      'jest.config.cjs'
    ]
  },
  {
    rules: {
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    },
  }
);
