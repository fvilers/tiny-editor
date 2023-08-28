/** @type {import('ts-jest').JestConfigWithTsJest} */
const config = {
  testEnvironment: 'node',
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
