import typescriptEslint from '@typescript-eslint/eslint-plugin'
import prettier from 'eslint-plugin-prettier'
import tailwindcss from 'eslint-plugin-tailwindcss'
import unusedImports from 'eslint-plugin-unused-imports'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:tailwindcss/recommended',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
      tailwindcss,
      'unused-imports': unusedImports,
    },

    rules: {
      'prettier/prettier': 'error',
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'import/no-anonymous-default-export': 'off',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
]
