import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleFileExtensions: [
    'js',
    'mjs',
    'cjs',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/components/ui/close-button.tsx',
    '<rootDir>/src/components/ui/dialog.tsx',
    '<rootDir>/src/components/ui/popover.tsx',
    '<rootDir>/src/components/index.ts',
    '<rootDir>/src/providers/chakra-ui.tsx',
  ],
  testEnvironment: 'jsdom',
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
}

export default createJestConfig(config)
