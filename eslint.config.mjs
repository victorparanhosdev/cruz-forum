import { defineConfig } from 'eslint/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tailwindPlugin from 'eslint-plugin-tailwindcss'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  {
    extends: compat.extends('next/core-web-vitals', 'next/typescript'),
    plugins: {
      tailwindcss: tailwindPlugin,
    },
    ignores: ['.next/**/*'],
    rules: {
      'tailwindcss/classnames-order': 'warn',
    },
  },
  {
    files: ['**/types/**/*.ts', '**/types/**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
])
