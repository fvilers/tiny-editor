/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 3
    }
  },
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  moduleNameMapper: {
    '(.+)\\.js': '$1'
  },
  extensionsToTreatAsEsm: [
    '.ts', '.tsx'
  ],
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true
      }
    ]
  }
}
export default config
