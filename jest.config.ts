export default {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  globals: {
    extensionsToTreatAsEsm: ['.ts', '.js'],
    'ts-jest': {
      useESM: true,
    },
  },

  preset: 'ts-jest/presets/js-with-ts-esm',
};
